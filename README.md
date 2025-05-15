# Music Library Angular

## Beskrivning  
Det här är en frontend-applikation byggd med Angular som hanterar en musikbibliotek med CRUD-funktionalitet (lägga till, visa, redigera och ta bort låtar). Applikationen kommunicerar med ett REST-API för att spara data.

## Funktioner  
- Visa lista över låtar  
- Lägga till ny låt  
- Redigera befintlig låt  
- Ta bort låt  
- Responsiv design för både desktop och mobil

## Teknologier  
- Angular  
- TypeScript  
- RxJS
- Netlify (för hosting)
- REST API anslutet via `SongService`
- Deployment på Netlify: https://u08musiclibrary.netlify.app

## Installation och körning lokalt
1. Klona repo: 
```bash
git clone <repo-url>
cd music-library-angular
```

2. Installera beroenden:
```bash
npm install
```
3. Starta utvecklingsserver:
```bash
npm start
```
4. Öppna webbläsaren på http://localhost:4200

## Bygga för produktion
För att bygga projektet för produktion:
```bash
npm run build
```
Bygget hamnar i mappen dist/music-library-angular.

## Deployment på Netlify
- Base directory: (lämna tomt eller skriv music-library-angular beroende på din struktur)
- Build command:
```bash
npm run build
```
- Publish directory:
```bash
dist/music-library-angular
```

### Viktigt
- För att Netlify ska hantera Angular-routing korrekt och undvika 404-fel vid direktlänkar behöver du en _redirects-fil i dist-mappen med följande innehåll:
```bash
/*    /index.html   200
```

##  Tester

Några grundläggande enhetstester finns för komponenter och tjänster.
Kör tester med:
```bash
ng test
```