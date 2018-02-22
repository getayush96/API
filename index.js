//Server Settings and Dependencies

express = require('express');
var app = express();
var http =  require('http');
var server = http.createServer(app);
server.listen(3000);

// Route Files Specification

var pull = require('./routes/pull')();					//API 1 Route
var fetch = require('./routes/fetch')();				//API 2 and 3 Route
var clear = require('./routes/clear')();				//Additional Route to Clear DB	
tweetdb = require('./api_config/db.js');				//DB COnfiguration

// Dependencies
				
csv = require('json2csv');						//JSON to CSV 
t = require('./api_config/twitter')();					//Twit Library
errorhandle = function (err,res){					//Global Error Handling and Response
	res.json({'error':err});
}

//routes
app.use('/pull',pull);
app.use('/fetch',fetch);
app.use('/clear',clear);

