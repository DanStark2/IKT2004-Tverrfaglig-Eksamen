-- Database schema example (SQLite / Postgres compatible SQL)

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tips: Tilpass datatyper etter valgt database (SQLite bruker INTEGER AUTOINCREMENT).