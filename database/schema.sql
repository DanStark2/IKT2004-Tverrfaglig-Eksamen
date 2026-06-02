-- Database schema example (SQLite / Postgres compatible SQL)

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description VARCHAR(150) UNIQUE NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  picture_url VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tips: Tilpass datatyper etter valgt database (SQLite bruker INTEGER AUTOINCREMENT).