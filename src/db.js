// src/db.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    host: process.env.MYSQL_HOST,
    dialect: 'mysql',
  }
);
sequelize.authenticate()
  .then(() => console.log('✅ Connexió amb la base de dades establerta correctament.'))
  .catch((error) => console.error('❌ Error connectant amb la base de dades:', error));
module.exports = sequelize;


const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGO_URI; 

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Connexió amb MongoDB Atlas establerta!");
  } finally {
    await client.close();
  }
}

run().catch(console.error);
