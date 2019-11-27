var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// RETURNS ALL THE USERS IN THE DATABASE
router.get('/health', function (req, res) {
    res.status(200).send('Status -> OK');
});

module.exports = router;