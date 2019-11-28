var app = require('./app');
var port = process.env.PORT || 3000;
var test = 1;//test
var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});
