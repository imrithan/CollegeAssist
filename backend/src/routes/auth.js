const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db/database');
const { requireAuth, JWT_SECRET } = require('../middleware/auth');

// POST /api/auth/signup
router.post('/signup', (req, res) => {
  try {
    const { full_name, email, password } = req.body;

    if (!full_name || !email || !password) {
      return res.status(400).json({ error: 'Please enter all required fields: full name, email, and password.' });
    }

    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long.' });
    }

    const normalizedEmail = email.trim().toLowerCase();

    // Check if user already exists
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(normalizedEmail);
    if (existing) {
      return res.status(400).json({ error: 'An account with this email address already exists. Please log in.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const password_hash = bcrypt.hashSync(password, salt);

    const insertUser = db.prepare(`
      INSERT INTO users (full_name, email, password_hash)
      VALUES (?, ?, ?)
    `);
    const result = insertUser.run(full_name.trim(), normalizedEmail, password_hash);
    const userId = Number(result.lastInsertRowid);

    // Create default starter profile
    const insertProfile = db.prepare(`
      INSERT INTO profiles (user_id, name, dob, class_12_stream, preferred_location, interests, preferred_degree, academic_score)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    insertProfile.run(
      userId,
      full_name.trim(),
      '2006-05-12',
      'Computer Science',
      'Tamil Nadu',
      JSON.stringify(['Computer Science', 'Artificial Intelligence']),
      'B.Tech',
      92
    );

    const token = jwt.sign({ id: userId, email: normalizedEmail, name: full_name.trim() }, JWT_SECRET, {
      expiresIn: '7d'
    });

    return res.status(201).json({
      message: 'Account created successfully',
      token,
      user: {
        id: userId,
        full_name: full_name.trim(),
        email: normalizedEmail
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ error: 'Internal server error during registration.' });
  }
});

// POST /api/auth/login
router.post('/login', (req, res) => {
  try {
    const { email, password, remember_me } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Please provide both email and password.' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(normalizedEmail);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password. Please try again.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password. Please try again.' });
    }

    const expiresIn = remember_me ? '30d' : '24h';
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.full_name },
      JWT_SECRET,
      { expiresIn }
    );

    return res.json({
      message: 'Logged in successfully',
      token,
      user: {
        id: user.id,
        full_name: user.full_name,
        email: user.email
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: 'Internal server error during login.' });
  }
});

// GET /api/auth/me
router.get('/me', requireAuth, (req, res) => {
  try {
    const user = db.prepare('SELECT id, full_name, email, created_at FROM users WHERE id = ?').get(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    const profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(user.id);
    if (profile && typeof profile.interests === 'string') {
      try {
        profile.interests = JSON.parse(profile.interests);
      } catch (e) {
        profile.interests = [];
      }
    }

    return res.json({ user, profile });
  } catch (error) {
    console.error('Auth me error:', error);
    return res.status(500).json({ error: 'Failed to retrieve user data.' });
  }
});

module.exports = router;
