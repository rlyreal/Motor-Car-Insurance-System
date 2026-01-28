import express from 'express';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Database connection configuration
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10
});


// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password are required' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT admin_id, username FROM admin_accounts WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length > 0) {
      const admin = rows[0];
      res.json({
        success: true,
        message: 'Login successful',
        adminId: admin.admin_id,
        username: admin.username
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
});


export default router;