const http = require('http');
const port = process.env.PORT || 3000;

const db = require('./db_connect');

const server = http.createServer((req, res) => {
  try {
    db.getAll('todo')
      .then(ressult => {
        res.statusCode = 200;
        res.end(`Hello Node! from PORT ${port}\n data: ${JSON.stringify(ressult || {})}`);
      })
      .catch(e => {
        console.log(e);
        res.statusCode = 200;
        res.end(`Hello Node! from PORT ${port}\n Error: ${e.message}`);
      })

  } catch (e) {
    console.log(e);
    res.statusCode = 200;
    res.end(`Hello Node! from PORT ${port}\n Error: ${e.message}`);
  }
});

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}/`);
});
