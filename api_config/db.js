
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/chromeuser';
mongoose.connect(mongoDB, {
});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', function(){console.log("DB error")});
db.on('open',function(){console.log("DB open");});

var Schema = mongoose.Schema;

module.exports = mongoose.model('tweets', new Schema({ 
    text: 'String', 
    created_at: 'date', 
    id: 'number',
    geo: { type: 'string', default: "none" },
	username :'String',
	rtcount :'number',
	favcount :'number',
	lang: 'String',
}));