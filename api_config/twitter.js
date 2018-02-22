var Twit = require('twit');
var t = new Twit({
	consumer_key:         'aTMVoUes845sPb62PXkAVf9yA',
	consumer_secret:      'MM8adawzqjyxNBW8bMRQTYumL95nrPnR7X7g0h1xUOHw1UMOKz',
	access_token:         '256006992-ekFn2F6kbF4ZqUsk1G6L6AHT41HfIApW8KXlmF3R',
	access_token_secret:  'kOCDeMaFu8rqCD0PTmcRdnMGLvU4CRS4fkSiDrqD30Nfz',
});
module.exports = function(){return t};