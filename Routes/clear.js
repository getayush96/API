// This is the route to clear the database completely (for testing purposes)

var router = express.Router();
router.get('/',function(req,res,next){								//for the path x/
	tweetdb.find({}).remove(function(err,users){					//get all data from the database and delete it 
		if(err){
			errorhandle("couldn't clear databse",res);				//call to error handle function in case of error
		}
		else{
			res.json({'status':'database cleared'})					//success result 	
		}
	});
});
module.exports = function(){return router}
