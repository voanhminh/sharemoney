const http = require('http');
const port = process.env.PORT || 3000;

const db = require('./db_connect');
const dbConfig = require('./config/db');

const { Pool, Client } = require('pg');
const pool = new Pool(dbConfig);

pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})

const server = http.createServer((req, res) => {
  try {
    pool.query('SELECT NOW()', (err, res) => {
      console.log(err, res)
      res.statusCode = 200;
      res.end(`Hello Node! from PORT ${port}\n data: ${JSON.stringify(ressult || {})}`);
    })

    // db.getAll('todo')
    //   .then(ressult => {
    //     res.statusCode = 200;
    //     res.end(`Hello Node! from PORT ${port}\n data: ${JSON.stringify(ressult || {})}`);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //     res.statusCode = 200;
    //     res.end(`Hello Node! from PORT ${port}\n Error: ${e.message}`);
    //   })

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
