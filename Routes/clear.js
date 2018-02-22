var router = express.Router();
router.get('/',function(req,res,next){
	tweetdb.find({}).remove(function(err,users){
		if(err){
			errorhandle("couldn't clear databse",res);
		}
		else{
			res.json({'status':'database cleared'})
		}
	});
});
module.exports = function(){return router}
