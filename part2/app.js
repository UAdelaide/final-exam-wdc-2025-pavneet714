const express = require('express');
const path = require('path');
const session = require('express-session');
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

//express session


app.use(session({
  secret: 'dogwalk-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // secure: true if using HTTPS
}));




// Export the app instead of listening here
module.exports = app;