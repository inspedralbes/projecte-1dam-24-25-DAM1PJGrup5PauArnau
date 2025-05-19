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

## 🧠 Conclusions

Aquest sistema ofereix una base robusta i modular per a la gestió d’incidències dins d’una entitat educativa. Amb una arquitectura clara, una configuració senzilla i eines de manteniment i diagnòstic integrades, està pensat per facilitar tant el desenvolupament com l’administració a llarg termini.

Aquest document serveix com a guia integral per qualsevol persona que hagi de desplegar, mantenir o ampliar el sistema
