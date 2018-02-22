//Server Settings and Dependencies
express = require('express');
var app = express();
var http =  require('http');
var server = http.createServer(app);
server.listen(3000);

var pull = require('./routes/pull')();
var fetch = require('./routes/fetch')();
var clear = require('./routes/clear')();

tweetdb = require('./api_config/db.js');
csv = require('json2csv');
t = require('./api_config/twitter')();
errorhandle = function (err,res){
	res.json({'error':err});
}

//routes
app.use('/pull',pull);
app.use('/fetch',fetch);
app.use('/clear',clear);

app.use('/',function(req,res){
	errorhandle("not a valid endpoint",res);
});

