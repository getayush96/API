
var router = express.Router();
router.get('/tweets',function(req,res,next){
		if(req.query.type && req.query.q){
			if(req.query.type=="hash"){
				var s = '#'+req.query.q;
			}
			else if(req.query.type=="all"){
				var s = req.query.q;
			}
			else{
				errorhandle("not a valid type of pull request (only hash/all allowed)",res);
			}
		}
		else
			errorhandle("Search String Missing",res);
		var stream = t.stream('statuses/filter', { track: [s] });
		var limit = 0;
		stream.on('tweet', function (tweet) {
			if(limit<20){
				var tweetn = new tweetdb({ 
					text : tweet.text,
					created_at: tweet.created_at,
					id: tweet.id,
					geo : tweet.geo,
					username: tweet.user.name,
					rtcount : tweet.retweet_count,
					favcount : tweet.favorite_count,
					lang : tweet.lang});
				tweetn.save(function(err){
					if(err)
						console.log("tweet save error");
					else
						console.log("tweet saved");
				});
			}
			else{
				stream.stop();
				console.log("Stream Finished");
			}
			limit++;	
		});
		stream.on('connected', function (tweet) {
			res.json({'status':"Connected To Twitter. You may now fetch your results"});
		});
	});
module.exports = function(){return router};
	

