const express = require('express');
const path = require('path');
const session = require('express-session');
require('dotenv').config();

const app = express();

//express session
app.use(session({
  secret: 'dogwalk-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // secure: true if using HTTPS
}));

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, '/public')));

// Routes
const walkRoutes = require('./routes/walkRoutes');
const userRoutes = require('./routes/userRoutes');

app.use('/api/walks', walkRoutes);
app.use('/api/users', userRoutes);
app.use('/api/dogs', dogRoutes);






// Export the app instead of listening here
module.exports = app;