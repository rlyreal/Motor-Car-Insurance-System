import express from 'express';
import pool from '../config/database.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username and password required' });
  }

  try {
    const [rows] = await pool.execute(
      'SELECT admin_id, username FROM admin_accounts WHERE username = ? AND password = ?',
      [username, password]
    );

    if (rows.length > 0) {
      const admin = rows[0];
      res.json({ success: true, message: 'Login successful', adminId: admin.admin_id, username: admin.username });
    } else {
      res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
