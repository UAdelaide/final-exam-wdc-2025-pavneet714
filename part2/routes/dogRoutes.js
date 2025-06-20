const express = require('express');
const router = express.Router();
const db = require('../models/db');

// For question 17: GET all dogs with their owner's name
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT
        d.dog_id,
        d.name,
        d.size,
        u.user_id AS owner_id,
        u.username AS owner_name
      FROM Dogs d
      JOIN Users u ON d.owner_id = u.user_id
    `);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch dogs' });
  }
});

module.exports = router;
