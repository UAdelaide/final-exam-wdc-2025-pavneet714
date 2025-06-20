const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);




// POST /api/login
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const [users] = await db.execute('SELECT * FROM Users WHERE username = ? AND password_hash = ?', [username, password]);
    const user = users[0];

    if (user) {
      req.session.user = { id: user.user_id, username: user.username, role: user.role };
      res.json({ role: user.role });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Export the app instead of listening here
module.exports = app;