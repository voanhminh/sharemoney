// var app = require('./app');
// var port = process.env.PORT || 3000;

// var server = app.listen(port, function() {
//   console.log('Express server listening on port ' + port);
// });

var http = require('http'),
    fs = require('fs');

var port = process.env.PORT || 3000;

fs.readFile('./index.html', function (err, html) {
    if (err) {
        throw err; 
    }       
    http.createServer(function(request, response) {  
        response.writeHeader(200, {"Content-Type": "text/html"});  
        response.write(html);  
        response.end();  
    }).listen(port);
});