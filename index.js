const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;

const dbConfig = require('./config/db');
const { Pool, Client } = require('pg');
const pool = new Pool(dbConfig);

const { OAuth2Client } = require('google-auth-library');

const fs = require('fs');


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/login', async (req, res) => {
  try {
    let body = req.body;
    //body = JSON.parse(body);
    let rawGoogleClientCredentials = fs.readFileSync('credentials.json');
    let googleClientCredentials = JSON.parse(rawGoogleClientCredentials);
    let CLIENT_ID = googleClientCredentials.web.client_id;
    let ID_TOKEN = body.id_token;

    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: ID_TOKEN,
      audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];
    verify().catch(console.error);
    res.statusCode = 200;
    res.json({ rows: result.rows || [], fields: result.fields || [] });
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end(`Hello Node! from PORT ${port}\n Error: ${e.message}`);
  }
})

app.get('/', (request, res) => {
  //res.send('Hello from Express!');
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/users', (req, res) => {
  try {
    pool.query('SELECT * FROM public.users', (err, result) => {
      console.log(err, res)
      res.statusCode = 200;
      res.json({ rows: result.rows || [], fields: result.fields || [] });
    })
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end(`Hello Node! from PORT ${port}\n Error: ${e.message}`);
  } finally {
    //pool.end();
  }
})

app.get('/users/:userId', (req, res) => {
  try {
    pool.query(`SELECT * FROM public.users where id::VARCHAR = '${req.params.userId}'`, (err, result) => {
      console.log(err, res)
      res.statusCode = 200;
      res.json({ rows: result.rows || [], fields: result.fields || [] });
    })
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end(`Hello Node! from PORT ${port}\n Error: ${e.message}`);
  } finally {
    //pool.end();
  }
})

app.get('/users/:userId/overview', (req, res) => {
  try {
    pool.query(`select users_income_monthly_overview.*, users.firstname, users.lastname from 
    users_income_monthly_overview, users 
    where users_income_monthly_overview.user_id::VARCHAR = users.id::VARCHAR and users.id::VARCHAR = '${req.params.userId}'`, (err, result) => {
      console.log(err, res)
      res.statusCode = 200;
      res.json({ rows: result.rows || [], fields: result.fields || [] });
    })
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end(`Hello Node! from PORT ${port}\n Error: ${e.message}`);
  } finally {
    //pool.end();
  }
})

app.get('/contents', (request, res) => {
  try {
    pool.query('SELECT * FROM public.contents', (err, result) => {
      console.log(err, res)
      res.statusCode = 200;
      res.json({ rows: result.rows || [], fields: result.fields || [] });
    })
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end(`Hello Node! from PORT ${port}\n Error: ${e.message}`);
  } finally {
    //pool.end();
  }
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})