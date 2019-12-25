const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');

const port = process.env.PORT || 3001;

const dbConfig = require('./config/db');
const { Pool, Client } = require('pg');
const pool = new Pool(dbConfig);

const { OAuth2Client } = require('google-auth-library');

const fs = require('fs');

const http = require('http');
const url = require('url');
const open = require('open');
const destroyer = require('server-destroy');

const keys = require('./client_id.json');

function getAuthenticatedClient() {
  return new Promise((resolve, reject) => {
    // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
    // which should be downloaded from the Google Developers Console.
    const oAuth2Client = new OAuth2Client(
      keys.web.client_id,
      keys.web.client_secret,
      keys.web.redirect_uris[0]
    );

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/userinfo.profile',
    });

    // Open an http server to accept the oauth callback. In this simple example, the
    // only request to our webserver is to /oauth2callback?code=<code>
    const server = http
      .createServer(async (req, res) => {
        try {
          if (req.url.indexOf('/oauth2callback') > -1) {
            // acquire the code from the querystring, and close the web server.
            const qs = new url.URL(req.url, 'http://localhost:3000')
              .searchParams;
            const code = qs.get('code');
            console.log(`Code is ${code}`);
            res.end('Authentication successful! Please return to the console.');
            server.destroy();

            // Now that we have the code, use that to acquire tokens.
            const r = await oAuth2Client.getToken(code);
            // Make sure to set the credentials on the OAuth2 client.
            oAuth2Client.setCredentials(r.tokens);
            console.info('Tokens acquired.');
            resolve(oAuth2Client);
          }
        } catch (e) {
          reject(e);
        }
      })
      .listen(3000, () => {
        // open the browser to the authorize url to start the workflow
        open(authorizeUrl, { wait: false }).then(cp => cp.unref());
      });
    destroyer(server);
  });
}

getAuthenticatedClient();


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

app.get('/oauth2callbackxxx', async (request, res) => {
  try {
    if (req.url.indexOf('/oauth2callback') > -1) {
      // acquire the code from the querystring, and close the web server.
      const qs = new url.URL(req.url, 'http://localhost:3000')
        .searchParams;
      const code = qs.get('code');
      console.log(`Code is ${code}`);
      res.end('Authentication successful! Please return to the console.');
      server.destroy();

      // Now that we have the code, use that to acquire tokens.
      const r = await oAuth2Client.getToken(code);
      // Make sure to set the credentials on the OAuth2 client.
      oAuth2Client.setCredentials(r.tokens);
      console.info('Tokens acquired.');
      resolve(oAuth2Client);
    }
  } catch (e) {
    reject(e);
  }
})

app.post('/login', async (req, res) => {
  try {
    let body = req.body;
    let rawGoogleClientCredentials = fs.readFileSync(__dirname + '/credentials.json');
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
    res.statusCode = 200;
    res.json(payload);
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end(`Login Failed: ${e.message}`);
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