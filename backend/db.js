const { Client } = require('mysql2');
require('dotenv').config();

const client = new Client({
  host: process.env.PGHOST,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: process.env.PGPORT || 5432,
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