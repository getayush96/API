var router = express.Router();
router.get('/:type',function(req,res,next){
		if(req.params.type!= 'json' && req.params.type!='csv'){
			errorhandle("Only JSON/CSV allowed",res);
		}
		var t = [{}];
		if(req.query.q){
			if(req.query.match == "start"){	
				req.query.q = "^" + req.query.q;
			}
			else if(req.query.match == "end"){
				req.query.q =  req.query.q + "$";
			}
			else if(req.query.match == "exact"){
				req.query.q =  "^" + req.query.q + "$";
			}
			t[0] = {username : {'$regex' : req.query.q ,'$options' : 'i'}};
			t[1] = {text : {'$regex' : req.query.q,'$options' : 'i'}};
		}
		
		var d =[{}];
		if(req.query.sdate){
			d[0] = {created_at : {'$gt' : new Date(req.query.sdate)}};
		}
		if(req.query.edate){
			d[1] = {created_at : {'$lt' : new Date(req.query.edate)}};
		}
		
		var rtcount = [{}];
		if(req.query.rtcount && req.query.rtcount[1])
		{	
			if(req.query.rtcount[0]=='e')
				rtcount[0] = {rtcount : req.query.rtcount.substring(1)};
			
			else if(req.query.rtcount[0]=='l')
				rtcount[0] = {rtcount : { '$lt' : req.query.rtcount.substring(1)}};
			
			else if(req.query.rtcount[0]=='g')
				rtcount[0] = {rtcount : { '$gt' : req.query.rtcount.substring(1)}};
			
		}
		var favcount = [{}];
		if(req.query.favcount && req.query.favcount[1])
		{	
			if(req.query.favcount[0]=='e')
				favcount[0] = {favcount : req.query.favcount.substring(1)};
			
			else if(req.query.favcount[0]=='l')
				favcount[0] = {favcount : { '$lt' : req.query.favcount.substring(1)}};
			
			else if(req.query.favcount[0]=='g')
				favcount[0] = {favcount : { '$gt' : req.query.favcount.substring(1)}};
			
		}
		var lang= [{}];
		if(req.query.lang){
			lang[0] = {lang : req.query.lang};
		}
					tweetdb.find().or(t).and(d).and(rtcount).and(favcount).and(lang).exec(function(err, users) {
					if (err){
						errorhandle("Can't Fetch data. Databse Error",res);
					}
					else{	
						if(req.params.type=='csv'){	
							csv({ data: users ,fields: ['id', 'created_at', 'text','username','rtcount','favcount','lang'] }, function(err, csv) {
								if (err)
									errorhandle("Can't Create CSV",res);
								else{
									res.setHeader('Content-disposition', 'attachment; filename=data.csv');
									res.set('Content-Type', 'text/csv');
									res.send(csv);
								}
							});
						}
						else{
							res.json(users);
						}
					}
		});
})
module.exports = function(){return router;};