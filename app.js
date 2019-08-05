const express = require('express');
const app = express();
var contacts = [];
const cors = require('cors');
const { Pool, Client } = require('pg');
const client = new Client({
  user: 'postgres',
  password: '1234',
  host: '',
  port: 5432,
  database: 'mercado'
});

const pool = new Pool({
  user: 'postgres',
  password: '1234',
  host: '',
  port: 5432,
  database: 'mercado'
});

executeSelect();

async function executeSelect() {
  try {
    await client.connect();
    console.log('Cliente conectado!');
    const results = await client.query('select * from categoria');
    contacts = results.rows;
    console.log(contacts);
  } catch (ex) {
    console.log('Aconteceu um erro :( --> ' + ex);
  } finally {
    await client.end();
    console.log('Cliete desconectado!');
  }
}

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.json(contacts);
});

app.post('/', (req, res) => {
  var results = [];
  var sql = "insert into categoria (descricao) values ('" + req.body.descricao + "')";
  pool.query(sql, err => { });
  executeSelect();
  res.json(req.body);
});

app.listen(3000, () => {
  console.log('Servidor rodando!');
});
