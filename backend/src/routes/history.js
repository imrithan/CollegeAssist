const express = require('express');
const router = express.Router();
const db = require('../db/database');
const { optionalAuth } = require('../middleware/auth');

// GET /api/history
router.get('/', optionalAuth, (req, res) => {
  try {
    const userId = req.user ? req.user.id : 1;
    let records = db.prepare(`
      SELECT * FROM counseling_history
      WHERE user_id = ? OR user_id = 1
      ORDER BY id DESC
    `).all(userId);

    // If records are empty, fetch all seeded records
    if (!records || records.length === 0) {
      records = db.prepare('SELECT * FROM counseling_history ORDER BY id DESC').all();
    }

    return res.json(records);
  } catch (error) {
    console.error('History fetch error:', error);
    return res.status(500).json({ error: 'Failed to retrieve counseling history.' });
  }
});

// GET /api/history/:id
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const item = db.prepare('SELECT * FROM counseling_history WHERE id = ?').get(id);
    if (!item) {
      return res.status(404).json({ error: 'Counseling history record not found.' });
    }
    return res.json(item);
  } catch (error) {
    console.error('History record detail error:', error);
    return res.status(500).json({ error: 'Failed to retrieve record detail.' });
  }
});

// DELETE /api/history/:id
router.delete('/:id', optionalAuth, (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const del = db.prepare('DELETE FROM counseling_history WHERE id = ?');
    del.run(id);
    return res.json({ message: 'Counseling history record deleted successfully.' });
  } catch (error) {
    console.error('History delete error:', error);
    return res.status(500).json({ error: 'Failed to delete record.' });
  }
});

module.exports = router;
