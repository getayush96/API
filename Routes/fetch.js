// This route returns the required API2 & API3 ( API 3 Proceeds same as API2, the only difference is the way data is returned to user)

var router = express.Router();
router.get('/:type',function(req,res,next){
		if(req.params.type!= 'json' && req.params.type!='csv'){
			errorhandle("Only JSON/CSV allowed",res);				// only CSV and JSON paths allowed
		}
		var t = [{}];												//Building DB Query
		if(req.query.q){
			if(req.query.match == "start"){							//If match == Start altering the Query
				req.query.q = "^" + req.query.q;
			}
			else if(req.query.match == "end"){						//if match ==end
				req.query.q =  req.query.q + "$";
			}
			else if(req.query.match == "exact"){
				req.query.q =  "^" + req.query.q + "$";
			}
			t[0] = {username : {'$regex' : req.query.q ,'$options' : 'i'}};	//Putting the Query in variable T 
			t[1] = {text : {'$regex' : req.query.q,'$options' : 'i'}};
		}
		
		var d =[{}];														
		if(req.query.sdate){
			d[0] = {created_at : {'$gt' : new Date(req.query.sdate)}};		//Check if the sdate(start) is given and building query 
		}
		if(req.query.edate){
			d[1] = {created_at : {'$lt' : new Date(req.query.edate)}};		//Check if the edate(end) is given and building query 
		}
		
		var rtcount = [{}];
		if(req.query.rtcount && req.query.rtcount[1])
		{	
			if(req.query.rtcount[0]=='e')												
				rtcount[0] = {rtcount : req.query.rtcount.substring(1)};				//if retweets equal to 
			
			else if(req.query.rtcount[0]=='l')
				rtcount[0] = {rtcount : { '$lt' : req.query.rtcount.substring(1)}};		// if retweets less than 
			
			else if(req.query.rtcount[0]=='g')
				rtcount[0] = {rtcount : { '$gt' : req.query.rtcount.substring(1)}};		// if retweets greater than
			
		}
		var favcount = [{}];	
		if(req.query.favcount && req.query.favcount[1])									// for favourite count, similar to retweet count
		{		
			if(req.query.favcount[0]=='e')
				favcount[0] = {favcount : req.query.favcount.substring(1)};
			
			else if(req.query.favcount[0]=='l')
				favcount[0] = {favcount : { '$lt' : req.query.favcount.substring(1)}};
			
			else if(req.query.favcount[0]=='g')
				favcount[0] = {favcount : { '$gt' : req.query.favcount.substring(1)}};
			
		}
		var lang= [{}];																	
		if(req.query.lang){															 // Matching Language
			lang[0] = {lang : req.query.lang};
		}

					
					tweetdb.find().or(t).and(d).and(rtcount).and(favcount).and(lang).exec(function(err, users) { //This is the final DB query which is executed
					if (err){
						errorhandle("Can't Fetch data. Databse Error",res);
					}
					else{	
						if(req.params.type=='csv'){																									//if requested data is CSV or JSON
							csv({ data: users ,fields: ['id', 'created_at', 'text','username','rtcount','favcount','lang'] }, function(err, csv) {
								if (err)
									errorhandle("Can't Create CSV",res);
								else{
									res.setHeader('Content-disposition', 'attachment; filename=data.csv');
									res.set('Content-Type', 'text/csv');										//specifying headers
									res.send(csv);
								}
							});
						}
						else{
							res.json(users);																	//Sending back JSON if it was requested
						}
					}
		});
})
module.exports = function(){return router;};