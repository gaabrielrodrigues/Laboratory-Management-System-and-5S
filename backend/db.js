const { Pool } = require('pg')
require('dotenv').config();

const client = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  port: process.env.PORT || 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados PostgreSQL:', err.stack);
  } else {
    console.log('Conectado ao banco de dados PostgreSQL (Neon).');
  }
});

module.exports = client;