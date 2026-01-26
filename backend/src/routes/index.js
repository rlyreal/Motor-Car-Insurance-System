
import express from 'express';

const router = express.Router();

// Add your routes here
router.get('/api/health', (req, res) => {
  res.json({ status: 'OK' });
});

export default router;