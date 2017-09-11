require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./api/routes'); //zoekt alle files in deze folder

// Define the port to run on
app.set('port', process.env.PORT || 8080);

// Add middleware to console log every request
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next(); 
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, '/public')));
//app.use(express.static(path.join(__dirname, 'node_modules')));
// application -------------------------------------------------------------
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));
/*app.get('*', function (req,res) {
    res.render('./public/index.html');
    // load the single view file (angular will handle the page changes on the front-end)
});*/
// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add some routing
app.use('/api', routes);

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});
