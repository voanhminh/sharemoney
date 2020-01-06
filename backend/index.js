const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser');

const port = process.env.PORT || 3001;

const dbConfig = require('./config/db');
const { Pool, Client } = require('pg');
const pool = new Pool(dbConfig);

const { OAuth2Client } = require('google-auth-library');
const request = require('request');
const fs = require('fs');

let access_token_minhvo;


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  //res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());

let rawApiKeys = fs.readFileSync(__dirname + '/client_api_key.json');
let rawServiceAccount = fs.readFileSync(__dirname + '/ShareMoneyServiceAccount-a9e206dc0d67.json');
let apiKeys = JSON.parse(rawApiKeys);
let serviceAccount = JSON.parse(rawServiceAccount);

function getToken() {

  var jwt = require('jsonwebtoken');
  var privateKey = `-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC5En0I6yIC8dPo\n64lzp3ccNB0fPtTx8OnwQQ3xdsQxJQma0POGfIpFNmaE6aSTSu8bbGxR5Z6x7kcj\nkf4VRuu5iE+xVHkN0Hulw9VUbheBOR75CvjNNjmCXQc13YLm5Nl7UBP7I1PmBsSM\npV3Ww3KhF/rWLvk6TWg3TlycMugxE975fG7luW2IP8wMldoA78GGtjlwr8gv0Kl2\nAClCPBTagY4lDSy9hk7Vr6dedYn3wi4kyLrKYBhk1XpG8/igz55iiGLII02fuJs4\ncw18qz4oOKciNkgmv0V7uWkjG6ykKB2uAeeFwSsrBBlSbrMmZ7wrUbqPaB0ZEQcq\nCKw01zkVAgMBAAECggEAB0+J0o8zQJQxRPCqSoAcLj2IGaK07Q+8C1UOihzLwuM4\nfhNF+L3fr7yROoEzkpacW7l3N+75oK64bwPGhSxQMHvde171CeIpQug5pkRTt7OR\ncSYJTlXs2fpMcsjFcdMqx3pnfP1YGZc9LrnI5gHCJpyYuIWSK8brWHqcduvIjJ5a\nn2HTvMclt66ssRXSf3/FvK4OixVJ7zRSDyzx2V/QG93/GWvBNcV4L6rsA8hQ7EMz\nrTY/eONrFAT2E4Q32r6JmN8KBYfPfNONewKzxwf/saWr4Aj4oDKAtWQ9kwJC/QBv\nOMvrxP6S89H/L08eoCTDObEuqSFTAJJVTRLA4f4CMQKBgQDhSKDdi/2yFFnAhc26\nyEOew+/D/5KWiYFwXqzHFsPXTJC9TV9/epG9jFFKQL3tpvwrt+NA6qi+K/FOtHF0\nW+ZdT+xqTz90e2K3aW7ZpHwY5XNIX9La4I0CNxQsJ60QLIOiTMkO4TvRnpgbSlK0\nJHw5L2ULDCX8/bKECY2Ry25dWQKBgQDSTk5YraZS5bozkPL7HNNeyhz6h2WC0ccY\ntM05sZv9T15FCsBJlOXWcadwaWHGBXFaNkCyaCg3yHQn1VPrylHCeW/+SHw/ISrL\naRRf+V27TmdHFrAIA7cxESnp+bfBHJNvV52v7SbehyteoTiY4aUJAys6rkJCujaX\nW73F+LkWHQKBgAXHSCEGozY7IWY3yGQfGOTsn6zGVGs6EbDhLMtagSF3nErOvkFV\n0oErJTajXHvJCbTRXanfmv5twB3FsRdL+CeykhzT9Yu2Unzj3m0EtA4rbH6RvqXQ\nlq1U3laXme/NRH8YOxv/mPoyeDJTALYQLYOF/LCA2kSX+Uk7uX7g2e7ZAoGAHEpM\nX8F8Tkp48dbd2MnX5ThrDYiJLz/o+HnZ4Zjy0vCKTd9UXpGZGW/Qhl6muGyjAu+p\nZFZ+koJ0nack0uM0fGS5nAtEK3nat+I6y25QHZI+cmGq7GkTi5YzfTYKcf/WFXRD\n0hak0+p6+w/U/TvdZ4j1l785SqCiF1pP/QGoZEECgYEAmAdxnrq+2zNGjoVj0beB\nxqskUMPez96ZAJVE31gewo1fk2d4EKXlle1NuGDebP6j20B3IyzRnh27z4Qj5Ugy\ny35OzT5HriZ5nL1br8N7QK8qdIKUCZJVDMbUb+1gpXx7/D/Il3zDWxufTjINEYuM\n6/epzEiOUN3rNiTPXD1c1zE=\n-----END PRIVATE KEY-----\n`;

  try {
    var nowInSeconds = Number(new Date().getTime() / 1000);
    nowInSeconds = Math.round(nowInSeconds);
    var fiftyNineMinutesFromNowInSeconds = nowInSeconds + (59 * 60);

    var claimSet = {};
    claimSet.iss = "sharemoneyserviceacount@share-money.iam.gserviceaccount.com";
    claimSet.sub = "sharemoneyserviceacount@share-money.iam.gserviceaccount.com";
    claimSet.scope = "https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtubepartner-channel-audit"; //https://developers.google.com/identity/protocols/googlescopes
    claimSet.aud = "https://www.googleapis.com/oauth2/v4/token";
    claimSet.iat = nowInSeconds;
    claimSet.exp = fiftyNineMinutesFromNowInSeconds;

    var jwtToken = jwt.sign(claimSet, privateKey, { algorithm: 'RS256' });
    var VIDEOS_ID = '1025230540862919';


    console.log("jwtToken: " + jwtToken);

    // request.post({
    //   headers: { 'content-type': 'application/x-www-form-urlencoded' },
    //   url: 'https://www.googleapis.com/oauth2/v4/token',
    //   body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwtToken}`
    // }, function (error, response, body) {
    //   //console.log(error && error.message);
    //   var access_token = (JSON.parse(body)).access_token;

    //   request.get({
    //     headers: { 'Authorization': `Bearer ${access_token}`, 'Accept': 'application/json' },
    //     url: `https://www.googleapis.com/youtube/v3/subscriptions?part=contentDetails&id=${VIDEOS_ID}&key=${apiKeys.API_KEY_1}`
    //   }, function (error, response, body) {
    //     console.log(error && error.message);
    //     console.log(body);
    //   });
    // });

  }
  catch (e) {
    Logger.error("The error with the OAuth Token Generator is --> " + e);
  }
}


function getActivitiesYoutube(access_token, req, res) {

  try {
    console.log("***********Access Token MinhVo**********************");
    console.log(access_token);
    access_token_minhvo = access_token;
    console.log("***********End Access Token MinhVo**********************");
    request.get({
      headers: { 'Authorization': `Bearer ${access_token}`, 'Accept': 'application/json' },
      url: `https://www.googleapis.com/youtube/v3/activities?part=contentDetails&mine=true&key=${apiKeys.API_KEY_1}`
    }, function (error, resYoutube, body) {
      console.log(error && error.message);
      console.log(body);
      res.statusCode = 200;
      res.json(error || body || {});
    });
  }
  catch (e) {
    Logger.error("The error with the OAuth Token Generator is --> " + e);
  }
}

app.post('/login', async (req, res) => {
  try {
    let body = req.body;
    let rawGoogleClientCredentials = fs.readFileSync(__dirname + '/client_id.json');
    let googleClientCredentials = JSON.parse(rawGoogleClientCredentials);
    let CLIENT_ID = googleClientCredentials.web.client_id;
    let ID_TOKEN = body.id_token;
    console.log("++++++++++++++++++++++++++++++++++++++++++++++");
    console.log(ID_TOKEN);
    console.log("end ++++++++++++++++++++++++++++++++++++++++++++++");
    const client = new OAuth2Client(CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: ID_TOKEN,
      audience: CLIENT_ID
    });
    const payload = ticket.getPayload();
    const userid = payload['sub'];

    //test here
    getActivitiesYoutube(body.access_token, req, res);


    // res.statusCode = 200;
    // res.json(payload);


  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.end(`Login Failed: ${e.message}`);
  }
})

app.get('/', (req, res) => {
  //res.send('Hello from Express!');
  res.sendFile(path.join(__dirname + '/index.html'));
})

app.get('/accessToken', (req, res) => {
  res.statusCode = 200;
  res.end(`${access_token_minhvo}`);
})

app.get('/youtube/videos/:id', (req, res) => {
  request(`https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${req.params.id}&key=${apiKeys.API_KEY_1}`, { json: true }, (err, googleRes, body) => {
    if (err) {
      res.statusCode = 500;
      res.end(`Hello Node! from PORT ${port}\n Error: ${err.message}`);
      return console.log(err);
    }
    res.statusCode = 200;
    res.json(body);
  });
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
  getToken();
  if (err) {
    return console.log('something bad happened', err)
  }
  console.log(`server is listening on ${port}`)
})