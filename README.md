# Recipe Club

Recipe Club er en web-applikasjon hvor man kan dele sine egne mat oppskrifter og finne inspirasjon til sin neste middag. Applikasjonen ble laget som et gruppeprosjekt i forbindelse med faget TDT4140 - Programvareutvikling våren 2022.

![Home page](demo_pics/home_page.png)
![Recipe page](demo_pics/recipe_page.png)
![User page](demo_pics/user_page.png)


Teknologiene som brukes:
- PostgreSQL
- Express
- React
- Node.js
- Next.js
- ChakraUI

## Hvordan sette opp prosjekt?
### Installasjoner
Først må du installere `node`, og det gjør du [her](https://nodejs.org/en/download/). Deretter må du sette opp postgreSQL, og det gjør du [her](https://www.postgresql.org/download/) (hvor det er anbefalt å **bare** installere med standard valg). 

### Forklaring av `.env` filene
Vi har `.env` filer som du må fylle ut selv ut ifra `.env.example`. Vi bruker disse filene fordi da slipper man å stadig oppdatere filene i kodebasen (som egentlig ikke skal endres) og da unngår vi mindre "feil".

I server har vi følgende struktur:
```
DATABASE_URL=
PORT=
CORS_ORIGIN_URL=
SESSION_SECRET=
```
som skal ha følgende struktur for eksempel:
```
DATABASE_URL=postgresql://bruker:passord@localhost:5432/databasenavn
PORT=4000
CORS_ORIGIN_URL=http://localhost:3000
SESSION_SECRET=rytDW1b9AQnNHjnKVV4ej4JZQ0cmQEqRCH3Ltn4jtUWhM2sYY3oTyMluFYGa
```
(Her må du finne ut av database brukeren din, og du bør ha en bruker `postgres` som har tilgang til alle databaser du har med et passord du valgte når du installerte). Porten kan du velge selv, men standard valg er `PORT=4000`. Cors origin skal være hvor clienten kjører. Session secret trenger bare være en tilfeldig streng, og trenger ikke være like komplisert som den gitt for at det skal fungere.

Vi har en `test.env` og en `dev.env` som kan settes til å være like, men dersom du ikke ønsker å slette dataen i databasen og fortsatt ønsker å teste koden din, vil det være smart å sette `test.env` til en ny database, e.g. `recipeclub-test` (i samme format som tidligere URL). 

I client har vi
```
NEXT_PUBLIC_API_URL=
```
som skal peke på hvor serveren kjører. For eksempel, om du har valgt `PORT=4000` i server, så kjører serveren på http://localhost:4000, og da får vi
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

Merk at `.env` filen kun leses en gang i starten når du kjører client, altså om du oppdaterer filen, må du gjøre en "hard-reset" av client for at endringen skal leses.

### Kjøre prosjektet
Deretter må du i hver av mappene (server og client) kjøre
```
npm run dev
```
Ved å kjøre `dev` i stedet for `build` vil man kunne lagre filer og se endringene med en gang. 
