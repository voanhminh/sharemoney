const http = require('http');
const port = process.env.PORT || 3000;

const db = require('./db_connect');
const dbConfig = require('./config/db');

const { Pool, Client } = require('pg');
const pool = new Pool(dbConfig);

const server = http.createServer((req, res) => {
  try {
    pool.query('SELECT * FROM public.users', (err, result) => {
      console.log(err, res)
      res.statusCode = 200;
      res.end(`Hello NodeJs! from PORT ${port}\n data: ${JSON.stringify(result || {})}`);
    })
  } catch (e) {
    console.log(e);
    res.statusCode = 200;
    res.end(`Hello Node! from PORT ${port}\n Error: ${e.message}`);
  } finally {
    pool.end();
  }
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
