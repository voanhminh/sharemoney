var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


var http = require('http'),
    fs = require('fs');

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/health', function (req, res) {
    fs.readFile('./index.html', function (err, html) {
        if (err) {
            throw err; 
        }       
        res.writeHeader(200, {"Content-Type": "text/html"});  
        res.write(html);  
        res.end(); 
    });
});

module.exports = router;