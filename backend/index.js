import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './src/routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware - UPDATED CORS
app.use(cors({
  origin: ['http://localhost:5000', 'http://192.168.1.42:5000', 'http://localhost:3000'], 
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Backend API' });
});

// Auth routes
app.use('/api/auth', authRoutes);

// Start Server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://localhost:${PORT}`);
});