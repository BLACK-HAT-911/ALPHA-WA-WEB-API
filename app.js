const express = require('express');
const cors = require('cors');
const generateUserId = require('./utils/userIdGenerator');
const pairingRoutes = require('./routes/pairing.routes');

const app = express();

app.use(cors());
app.use(express.json());

// Auto-generate userId middleware
app.use((req, res, next) => {
  if (!req.body.userId) {
    req.body.userId = generateUserId();
  }
  next();
});

app.use('/api/pairing', pairingRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Server error' });
});

module.exports = app;
