# AI Logg

Logg over AI-assistanse brukt i prosjektet.

- Dato: 2026-06-01 — Opprettet malstruktur og grunnfiler.

Tips:
- Noter hvilke spørsmål og kommandoer du ga til AI, og hvilke endringer som ble gjort i repo.

## Utvikling
- Spørsmål om hvordan frontend skal kobles til SQL-database.
- Bruker ønsket admin-panel og inputfelter med egne `id`-er.
- Backend ble oppdatert til å lagre produktdata via `POST /api/products`.
- Frontend ble endret slik at `Main` har registreringsskjema og `Admin` viser produkter.
- Migrerte backend fra PostgreSQL/`pg` tilbake til SQLite-lignende lagring med `sql.js` fordi `sqlite3` ikke kunne installeres i dette miljøet.
- Fjernet `dotenv`-avhengigheten for å unngå unødvendig `.env`-innlasting.
- Rettet frontend `script.js` slik at DOM-elementene hentes med normale `const`-deklarasjoner i stedet for array-desktrukturering.
- Løst `EADDRINUSE`-feilen ved at port `3000` allerede var opptatt; backend kjører nå riktig igjen.
- Endret `server.js` til å bruke sql.js-posisjonelle parameterbind i `INSERT`-spørringen for å unngå databasefeil.

## Drift
Jeg brukte ChatGPT som hjelpemiddel under planleggingen av nettverksarkitekturen. KI-en ble brukt til å forklare begreper som DMZ, brannmur, subnett og Docker-containere, samt til å gi tilbakemeldinger på nettverksdiagrammet mitt.
## Brukerstøtte
Tilbakemelding på innhold