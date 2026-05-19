const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.post('/login', (req, res) => {
  const { email, password } = req.body;

  // Check against env variables
  const adminEmail    = process.env.ADMIN_EMAIL    || 'admin@kabadikart.com';
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (email !== adminEmail || password !== adminPassword) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign(
    { email, role: 'admin' },
    process.env.JWT_SECRET || 'kabadikart_secret',
    { expiresIn: '8h' }
  );

  res.json({ token });
});

module.exports = router;