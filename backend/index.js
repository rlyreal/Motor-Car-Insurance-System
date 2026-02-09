import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.js';
import policiesRouter from './src/routes/policies.js';
import healthRoutes from './src/routes/health.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS - Allow all IPs on local network (192.168.1.x)
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (Postman, curl, etc.)
    if (!origin) return callback(null, true);
    
    // Allow localhost
    if (origin.includes('localhost')) return callback(null, true);
    
    // Allow any IP on 192.168.1.x network on port 3000
    if (/^http:\/\/192\.168\.1\.\d+:3000$/.test(origin)) {
      return callback(null, true);
    }
    
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/policies', policiesRouter);
app.use('/api', healthRoutes);

app.get('/', (req, res) => res.json({ message: 'Motor Insurance API running' }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
  console.log(`Accessible on network at http://192.168.1.28:${PORT}`);
});