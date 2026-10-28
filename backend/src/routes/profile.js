const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { optionalAuth } = require('../middleware/auth');

// GET /api/profile
router.get('/', optionalAuth, (req, res) => {
  try {
    const userId = req.user ? req.user.id : 1;
    let profile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(userId);

    if (!profile) {
      // Fallback to demo profile (Figure 12)
      profile = {
        name: 'Rithan V',
        dob: '2006-05-12',
        class_12_stream: 'Computer Science',
        preferred_location: 'Tamil Nadu',
        interests: ['Computer Science', 'Artificial Intelligence'],
        preferred_degree: 'B.Tech',
        academic_score: 92
      };
    } else {
      try {
        profile.interests = JSON.parse(profile.interests);
      } catch (e) {
        profile.interests = ['Computer Science', 'Artificial Intelligence'];
      }
    }

    return res.json(profile);
  } catch (error) {
    console.error('Get profile error:', error);
    return res.status(500).json({ error: 'Failed to fetch student profile.' });
  }
});

// POST /api/profile
router.post('/', optionalAuth, (req, res) => {
  try {
    const userId = req.user ? req.user.id : 1;
    const {
      name,
      dob,
      class_12_stream,
      preferred_location,
      interests,
      preferred_degree,
      academic_score
    } = req.body;

    if (!name || !dob || !class_12_stream || !preferred_location || !preferred_degree || academic_score === undefined) {
      return res.status(400).json({ error: 'All fields marked with an asterisk are required.' });
    }

    const interestsJson = JSON.stringify(Array.isArray(interests) ? interests : [interests]);
    const scoreNum = parseFloat(academic_score);

    const existing = db.prepare('SELECT id FROM profiles WHERE user_id = ?').get(userId);

    if (existing) {
      const update = db.prepare(`
        UPDATE profiles
        SET name = ?, dob = ?, class_12_stream = ?, preferred_location = ?, interests = ?, preferred_degree = ?, academic_score = ?, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ?
      `);
      update.run(
        name.trim(),
        dob,
        class_12_stream,
        preferred_location,
        interestsJson,
        preferred_degree,
        scoreNum,
        userId
      );
    } else {
      const insert = db.prepare(`
        INSERT INTO profiles (user_id, name, dob, class_12_stream, preferred_location, interests, preferred_degree, academic_score)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);
      insert.run(
        userId,
        name.trim(),
        dob,
        class_12_stream,
        preferred_location,
        interestsJson,
        preferred_degree,
        scoreNum
      );
    }

    const updatedProfile = db.prepare('SELECT * FROM profiles WHERE user_id = ?').get(userId);
    updatedProfile.interests = JSON.parse(updatedProfile.interests);

    return res.json({
      message: 'Student profile updated successfully',
      profile: updatedProfile
    });
  } catch (error) {
    console.error('Save profile error:', error);
    return res.status(500).json({ error: 'Failed to save student profile.' });
  }
});

module.exports = router;
