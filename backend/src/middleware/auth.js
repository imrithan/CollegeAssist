const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'collegeassist-secret-jwt-key-2026';

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization || req.headers['x-auth-token'];
  if (!authHeader) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
}

function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization || req.headers['x-auth-token'];
  if (!authHeader) {
    req.user = { id: 1, email: 'rithan@example.com' };
    return next();
  }

  const token = authHeader.startsWith('Bearer ')
    ? authHeader.slice(7).trim()
    : authHeader;

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
  } catch (err) {
    req.user = { id: 1, email: 'rithan@example.com' };
  }
  next();
}

module.exports = {
  requireAuth,
  optionalAuth,
  JWT_SECRET
};
