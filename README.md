# IKT2004-Tverrfaglig-Eksamen

Kort beskrivelse

Dette repository er et eksamensprosjekt for IKT2004. Inneholder en enkel frontend (vanilla JS), en Express-backend og en lokal SQLite-lignende database med `sql.js`.

Struktur

- `src/` - kildekode for frontend og backend
- `src/frontend` - statisk HTML/CSS/JS
- `src/backend` - Express API (bruker `sql.js` og lagrer data i `database/database.sqlite`)
- `docs/` - teknisk dokumentasjon og arkitektur
- `database/` - SQL-skjema og seed-data
- `config/` - eksempelfil for miljøvariabler

Hurtigstart

1. Åpne en terminal i `src/backend`.
2. Installer avhengigheter (kun første gang):

```powershell
npm install
```

3. Start serveren:

```powershell
npm start
```

4. Åpne frontend i nettleser:

http://localhost:3000

Notater og feilsøking

- Backend bruker `sql.js` og oppretter `database/database.sqlite` automatisk ved første kjøring.
- Hvis du får `EADDRINUSE` betyr det at port 3000 allerede er i bruk. Avslutt prosessen som bruker porten eller start serveren på en annen port: `PORT=3001 npm start` (Windows PowerShell: `$env:PORT=3001; npm start`).
- `sqlite3` er fjernet fordi native kompileringsfeil oppsto i miljøet; `sql.js` brukes for enkel lokal persistens.

API-endepunkter

- `GET /api/products` - Henter alle produkter
- `POST /api/products` - Oppretter et nytt produkt. Body JSON: `{ name, description, price, pictureUrl }`

Se også `ai-logg.md` for mer informasjon.
