import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.js';
import policiesRouter from './src/routes/policies.js';
import healthRoutes from './src/routes/health.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5000', 'http://192.168.1.42:5000'],
  methods: ['GET','POST','PUT','DELETE'],
  credentials: true
}));

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/policies', policiesRouter);
app.use('/api', healthRoutes);

app.get('/', (req, res) => res.json({ message: 'Motor Insurance API running' }));

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
