
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
				  errorhandle("nto valid type");
			}
		}
		else
			res.send();
		
		var stream = t.stream('statuses/filter', { track: [s] });
		var limit = 0;
		stream.on('connected', function (tweet) {
			console.log("connected");
		});
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
						console.log("Stream forcefully stopped");
					}
					limit++;
				
		});
		
		stream.on('disconnect',function(message){
			console.log(message);
		});
		res.send();
	});
module.exports = function(){return router};
	

