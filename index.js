const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const db = require('./db_connect');
const dbConfig = require('./config/db');
const { Pool, Client } = require('pg');
const pool = new Pool(dbConfig);

app.get('/', (request, res) => {
  //res.send('Hello from Express!');
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/users', (request, res) => {
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
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})