// This contains the initialization of the Twit Library and setting up connection to the Twitter API 

var Twit = require('twit');

// Specifying the parameteres for the connection establishment 
var t = new Twit({
	consumer_key:         'MVoUes845sPb62PXkAVf9yA',								 
	consumer_secret:      'adawzqjyxNBW8bMRQTYumL95nrPnR7X7g0h1xUOHw1UMOKz',		// A false key is given Here. Original key has been mailed
	access_token:         '256006992-ekFn2F6kbF4ZqUsk1G6L6AHT41HfIApW8KXlmF3R',
	access_token_secret:  'DeMaFu8rqCD0PTmcRdnMGLvU4CRS4fkSiDrqD30Nfz',			// A false key is given Here. Original key has been mailed
});
module.exports = function(){return t};