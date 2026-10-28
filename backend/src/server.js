require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Ensure database and tables exist on start
require('./db/database');

const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const recommendationsRoutes = require('./routes/recommendations');
const chatRoutes = require('./routes/chat');
const historyRoutes = require('./routes/history');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/recommendations', recommendationsRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/history', historyRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'CollegeAssist API',
    time: new Date().toISOString()
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'An unexpected internal server error occurred.' });
});

// Start listening
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 CollegeAssist Backend API Server Running!`);
  console.log(`📡 Local URL: http://localhost:${PORT}`);
  console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
  console.log(`===============================================`);
});

module.exports = app;
