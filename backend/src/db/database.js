const { DatabaseSync } = require('node:sqlite');
const path = require('path');
const fs = require('fs');

const dataDir = path.join(__dirname, '..', '..', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, 'collegeassist.db');
const db = new DatabaseSync(dbPath);

// Enable WAL mode and foreign keys
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

// Initialize tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS profiles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER UNIQUE,
    name TEXT NOT NULL,
    dob TEXT NOT NULL,
    class_12_stream TEXT NOT NULL,
    preferred_location TEXT NOT NULL,
    interests TEXT NOT NULL,
    preferred_degree TEXT NOT NULL,
    academic_score REAL NOT NULL,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS colleges (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    programme TEXT NOT NULL,
    degree TEXT NOT NULL,
    stream TEXT NOT NULL,
    location TEXT NOT NULL,
    state TEXT NOT NULL,
    duration TEXT NOT NULL,
    cutoff TEXT NOT NULL,
    min_cutoff REAL NOT NULL,
    nirf_rank INTEGER,
    fees TEXT,
    placements TEXT,
    website TEXT,
    logo_type TEXT,
    description TEXT
  );

  CREATE TABLE IF NOT EXISTS counseling_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    date_time TEXT NOT NULL,
    query TEXT NOT NULL,
    response_summary TEXT NOT NULL,
    full_response TEXT,
    source TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE SET NULL
  );
`);

module.exports = db;
