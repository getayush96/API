// This is the Route Which implements API 1.

var router = express.Router();
router.get('/tweets',function(req,res,next){						
		if(req.query.type && req.query.q){
			if(req.query.type=="hash"){										//check if to search for hashtags or the tweets
				var s = '#'+req.query.q;									//append the query if hashtag is searched
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
		var stream = t.stream('statuses/filter', { track: [s] });			// Stream Creation and tracking the string demanded
		var limit = 0;														// Variable storing the no of tweets received
		stream.on('tweet', function (tweet) {								// Event Listener for reading the real time tweet
			if(limit<20){													// Number of tweets for which event listener will be active
				var tweetn = new tweetdb({ 
					text : tweet.text,										//text of tweet received
					created_at: tweet.created_at,							//created at of tweet
					id: tweet.id,
					geo : tweet.geo,
					username: tweet.user.name,								// some more parameters
					rtcount : tweet.retweet_count,
					favcount : tweet.favorite_count,
					lang : tweet.lang});
				tweetn.save(function(err){									//saving the received tweet to database
					if(err)
						console.log("tweet save error");				
					else
						console.log("tweet saved");
				});
			}
			else{															//stop streaming if desired number of tweets received
				stream.stop();
				console.log("Stream Finished");
			}
			limit++;	
		});
		stream.on('connected', function (tweet) {							//checking if connected to twitter
			res.json({'status':"Connected To Twitter. You may now fetch your results"});
		});
	});
module.exports = function(){return router};
	

