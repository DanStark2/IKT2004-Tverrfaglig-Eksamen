// Enkel Express-server som serverer frontend og et lite API-endepunkt
const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve statiske filer fra frontend-mappen
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Eksempel-API
app.get('/api/ping', (req, res) => {
  res.json({message: 'pong', time: new Date().toISOString()});
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

// Tips: Kjør `npm install` i denne mappen for å installere avhengigheter før `npm start`.