# Recipe Club

Recipe Club er en web-applikasjon hvor man kan dele sine egne mat oppskrifter og finne inspirasjon til sin neste middag.

Teknologiene som brukes:
- PostgreSQL
- Express
- React
- Node.js
- Next.js
- ChakraUI
- Jest
- Cypress

## Hvordan sette opp gitlab?
For ssh bruk må man huske å være på NTNU sin VPN. Ved http bruk må man generere en personal access token (og bruke den som passord i git).
Se mer: 
- [ssh](https://docs.gitlab.com/ee/ssh/index.html)
  - [vpn](https://i.ntnu.no/wiki/-/wiki/Norsk/Installere+VPN)
- [http og personal access token](https://docs.gitlab.com/ee/user/profile/personal_access_tokens.html)

## Hvordan bruke gitlab
Brukerhistoriene er satt opp som "issues," og de har merkelapper som "vekter" issuet (og kanskje andre merkelapper). Vi velger selvfølgelig å fullføre de som er vektest høyest først, men her vil det selvfølgelig være mulig å bruke skjønn i samsvar med resten av teamet.

Om man skal samarbeide på et issue skal man som hovedregel befinne seg på separate grener med unntak om det er enkle commits begge parter ser seg enige i. Når en av partene ser seg ferdig legger man til en merge request av den ene grenen og den andre. Husk å bruke `coauthor` ved parprogrammering eller andre type sammarbeid på enkelt commits.

Når hele issuet er ferdig gjør man en merge request til main. Hovedregelen er at main alltid skal være deployerbar, og derfor vil vi være stringent på kravene til en merge request. Da unngår vi større bugs, og hastigheten vår vil ikke synke av "dumme grunner". (Heller bruke litt mer tid på at det er riktig, enn veldig mye mer tid på å rette opp i feil som kunne vært unngått).

Om man finner en bug (i hvilken som helst gren) oppfordres det til å opprette et issue om det. 

Om man ønsker at noen "utforsker" mer om en implementasjon, og etterspør en tydelig konklusjon kan dette også opprettes som issue. 

Vi oppfordrer til å bruke kommentarer så mye som mulig fordi vi ønsker å lage "grå"-dokumentasjon for oss selv, noe som vil hjelpe oss dersom man møter samme type problemer i fremtiden eller ønsker begrunnelser på valg som er tatt.

Filen `.gitignore` velger bort hvilke filer man skal laste opp til kodebasen. Gjøre deg kjent med hvilke filer vi velger å ikke laste opp slik at man unngår at kodebasen blir unnødvendig stor.

## Hvordan sette opp prosjekt?
### Installasjoner
Først må du installere `node`, og det gjør du [her](https://nodejs.org/en/download/). Deretter må du sette opp postgreSQL, og det gjør du [her](https://www.postgresql.org/download/) (hvor det er anbefalt å **bare** installere med standard valg). 

Før du går videre bør du sjekke at node og npm fungerer slik de skal ved å kjøre følgende i terminalen:
```
node -v
```
og
```
npm -v
```

Deretter er det mulig å installere `yarn` (som gjør det _litt_ enklere å bruke terminalen), men vi ser det som likegyldig, og om du foretrekker det så antar vi at du også greier å bruke det. Resterende vil alltid bruke `npm` for å gjøre dokumentasjonen kortere.

Det er et tomt prosjekt i `main` som utgangspunkt. For å initialisere prosjektet må du kjøre 
```
npm i
```
i hver av hovedmappene (server og client for å installere alle `npm` pakkene som trengs. 

### Forklaring av `.env` filene
Vi har `.env` filer som du må fylle ut selv ut ifra `.env.example`. Vi bruker disse filene fordi da slipper man å stadig oppdatere filene i kodebasen (som egentlig ikke skal endres) og da unngår vi mindre "feil".

I server har vi følgende struktur:
```
DATABASE_URL=
PORT=
CORS_ORIGIN_URL=
```
som skal ha følgende struktur for eksempel:
```
DATABASE_URL=postgresql://bruker:passord@localhost:5432/databasenavn
PORT=4000
CORS_ORIGIN_URL=http://localhost:3000
```
(Her må du finne ut av database brukeren din, og du bør ha en bruker `postgres` som har tilgang til alle databaser du har med et passord du valgte når du installerte). Porten kan du velge selv, men standard valg er `PORT=4000`. Cors origin skal være hvor clienten kjører. 

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

Det er anbefalt å sette seg inn i VSC terminalen: hvordan man kjører flere terminaler samtidig, hvordan man "dreper" en terminal, o.l.

### VSCode
Det anbefales å installere et par VSCode extensions:
- ESLint
- Prettier

Videre sørg for at VSCode sammarbeider med git.

## Hvordan utvikle?
### Hvordan finne løsninger?
For å løse ett problem er det som regel tre metoder for å løse det, man googler, ser på dokumentasjonen til teknologien, eller så spør man en annen om hjelp.

Det er per nå ikke noen spesielle krav før man kan bevege seg mellom server og client.

### Introdusere `npm`-pakker 
Om du introduserer mindre `npm`-pakker anser vi det som ok å gjøre, e.g. en express pakke vil på en måte falle under express, en å introdusere større pakker som endrer større deler av prosjektet må dette tas opp i plenum med hele teamet. Alltid sørg for at det ikke med fører noen konflikter i pakkene våre før du velger å gå videre med pakken.

Husk å bruke `-D` når du installerer en "dev-pakke" (en pakke som kun vil brukes i implementasjon, e.g. er jest en dev-pakke). 

### Testskriving
Det vil kreves i pipelinen vår at du har testet koden. For dette vil vi bruke jest og cypress.

Man behøver ikke nødvendigvis å skrive testen før, men før en merge request må man ha testet alt av koden.

Se mer informasjon om testskriving i jest [her](https://www.google.com/search?q=jest+testing), og i cypress [her](https://www.google.com/search?q=cypress+testing).

(Pipelinen settes opp på torsdag, så arbeid i egne grener frem til da).

### Om User tabllen i Postgres
Tabellen i User i Postgres er for *database* brukerene (e.g. postgres superbrukeren din). Dersom du ønsker å opprette en User tabell for brukere til applikasjonen, må du definere en ny tabell (e.g. user, eller Bruker). 