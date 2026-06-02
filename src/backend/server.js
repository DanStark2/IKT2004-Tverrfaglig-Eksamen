const express = require('express');
const path = require('path');
const fs = require('fs');
const initSqlJs = require('sql.js');

const app = express();
const PORT = process.env.PORT || 3000;
const dbFile = path.join(__dirname, '..', '..', 'database', 'database.sqlite');
let db;

const saveDb = () => fs.writeFileSync(dbFile, Buffer.from(db.export()));

const rowsFromResults = (results) => {
  if (!results.length) return [];
  const { columns, values } = results[0];
  return values.map(row => Object.fromEntries(columns.map((col, i) => [col, row[i]])));
};

initSqlJs().then((SQL) => {
  db = fs.existsSync(dbFile)
    ? new SQL.Database(fs.readFileSync(dbFile))
    : new SQL.Database();

  if (!fs.existsSync(dbFile)) {
    db.run(`CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT UNIQUE NOT NULL,
      price REAL NOT NULL,
      picture_url TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
    saveDb();
  }

  app.use(express.json());
  app.use(express.static(path.join(__dirname, '..', 'frontend')));

  app.get('/api/products', (req, res) => {
    try {
      res.json(rowsFromResults(db.exec('SELECT * FROM products ORDER BY id DESC')));
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  app.post('/api/products', (req, res) => {
    const { name, description, price, pictureUrl } = req.body;
    if (!name || !description || !price || !pictureUrl) {
      return res.status(400).json({ error: 'All fields required' });
    }
    try {
      const stmt = db.prepare('INSERT INTO products (name, description, price, picture_url) VALUES (?, ?, ?, ?)');
      stmt.bind([name, description, price, pictureUrl]);
      stmt.step();
      stmt.free();
      saveDb();
      const id = rowsFromResults(db.exec('SELECT last_insert_rowid() AS id'))[0].id;
      res.json({ id, name, description, price, pictureUrl });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Database error' });
    }
  });

  app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
}).catch(err => {
  console.error('DB init failed:', err);
  process.exit(1);
});