const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const db = require('./db_connect');
const dbConfig = require('./config/db');
const { Pool, Client } = require('pg');
const pool = new Pool(dbConfig);

app.get('/', (request, response) => {
  response.send('Hello from Express!')
})

app.get('/users', (request, response) => {
  response.send('Users!');
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})