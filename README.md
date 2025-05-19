# 🛠️ Grup 5 - Gestor d’Incidències Informàtiques

## 👥 Integrants

- Pau
- Arnau

## 🎯 Objectiu del projecte

Aquest projecte té com a objectiu principal el desenvolupament d'una aplicació web que permeti registrar, gestionar, consultar i fer seguiment de les incidències tècniques que tenen lloc dins dels diversos departaments d’una organització educativa. L’aplicació busca oferir una solució centralitzada i accessible que optimitzi el flux de resolució d’incidències, permetent al personal tècnic i administratiu mantenir un registre clar, actualitzat i eficient de totes les activitats relacionades amb el suport informàtic.

## 🚧 Estat actual

- 🔧 En desenvolupament – Actualment ens trobem implementant models de dades, el sistema de rutes i la connexió amb la base de dades MongoDB. També estem estructurant les vistes EJS i el middleware de registre de logs d'accés.

## 🌐 Enllaços útils

- 📄 Documentació PHPDoc (pendent d’enllaçar)
- 🌍 Projecte desplegat (pendent de desplegament públic)
- 🎨 Prototipat / Wireframes: [Enllaç a Figma o Adobe XD](#)

## 📁 Estructura del projecte

```
├── app.js                      # Punt d'entrada principal
├── db.js                       # Connexió amb MongoDB
├── middlewares/               # Middleware per gestió de logs i autenticació
│   └── logMiddleware.js
├── models/                    # Models de dades (Mongoose)
│   ├── Actuacio.js
│   ├── Departament.js
│   ├── Incidencia.js
│   ├── Log.js
│   └── Tecnic.js
├── routes/                    # Rutes Express per modularitat
│   ├── actuacionsEJS.routes.js
│   ├── adminEJS.routes.js
│   ├── departamentsEJS.routes.js
│   ├── incidentsEJS.routes.js
│   ├── logs.js
│   └── tecnicsEJS.routes.js
└── views/                     # Vistes EJS per l'interfície web
    ├── actuacions/
    ├── admin/                 # Inclou dashboard i logs
    ├── departaments/
    ├── incidencies/
    ├── tecnics/
    └── partials/             # Header i footer reutilitzables
```

## 📚 Documentació Tècnica Extensa

### Visió General

El sistema ha estat dissenyat seguint el patró d’arquitectura MVC (Model-Vista-Controlador), garantint una separació clara entre la lògica de negoci, la gestió de dades i la presentació visual. Aquesta estructura facilita el manteniment, escalabilitat i entesa per part de futurs desenvolupadors.

### Entorn d'Execució

Per posar en marxa el projecte és necessari disposar d’un entorn amb Node.js (preferiblement versió 18 o superior), NPM, i MongoDB (local o remot, com per exemple MongoDB Atlas). També és recomanable un sistema Unix-based (Linux/macOS) per facilitar el desplegament i scripts bash, tot i que és completament funcional també a Windows.

### Guia d'Instal·lació

1. **Instal·la Node.js i MongoDB**: 
   - Descarrega Node.js des de [https://nodejs.org](https://nodejs.org) i segueix les instruccions.
   - MongoDB pot ser instal·lat localment o pots crear un compte a MongoDB Atlas per a una base de dades al núvol.

2. **Clona el repositori del projecte**:
```bash
git clone https://github.com/usuari/gestor-incidencies.git
cd gestor-incidencies
```

3. **Instal·la les dependències**:
```bash
npm install
```

4. **Configura les variables d'entorn**: Crea un fitxer `.env` amb el següent contingut:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/incidenciesDB
```

5. **Executa el projecte**:
```bash
npm run dev
```

### Connexió amb MongoDB

La connexió es realitza a través del fitxer `db.js`, que utilitza `mongoose.connect()` per establir l’enllaç amb la base de dades. Aquesta connexió és totalment asíncrona i està dissenyada per detectar errors de manera elegant.

### Logs i Seguiment

El middleware `logMiddleware.js` registra automàticament informació crítica sobre cada petició:

- URL visitada
- Agent d’usuari (navegador)
- Timestamp exacte
- Usuari (si ha iniciat sessió)

Aquesta informació es desa a MongoDB i es pot consultar visualment a través de la vista `admin/logs.ejs`.

### Procediments de Còpies de Seguretat

Per protegir la integritat de les dades, es recomana implementar una política de backups regulars:

```bash
mongodump --db incidenciesDB --out ./backups/incidencies-$(date +%F)
```

La restauració es pot fer amb:
```bash
mongorestore --db incidenciesDB ./backups/incidencies-YYYY-MM-DD/incidenciesDB
```

### Resolució de Problemes

- Si apareix l'error `Failed to lookup view`, comprova que no utilitzes `/` davant del nom de la vista a `res.render()`.
- Si no es mostren les dades correctament, assegura’t que els models estan exportats correctament i que la base de dades conté documents vàlids.
- Si els logs no s'enregistren, comprova que el middleware estigui muntat abans de les rutes.

## 🧠 Conclusions

Aquest sistema ofereix una base robusta i modular per a la gestió d’incidències dins d’una entitat educativa. Amb una arquitectura clara, una configuració senzilla i eines de manteniment i diagnòstic integrades, està pensat per facilitar tant el desenvolupament com l’administració a llarg termini.

Aquest document serveix com a guia integral per qualsevol persona que hagi de desplegar, mantenir o ampliar el sistema.

Vols una versió `.pdf` o `.docx` d’aquest document? Et puc ajudar a generar-la fàcilment!
