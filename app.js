var express = require('express');
var app = express();
//var db = require('./db');

//var UserController = require('./user/UserController');
//app.use('/users', UserController);

var HealthController = require('./user/Health');
app.use('/users', HealthController);

module.exports = app;