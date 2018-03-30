/*
* GET home page.
*/
var async = require('async');
exports.index = function(req, res){
  var message = '';
  var locals = {};
  if(req.session.userId)
  locals.role = req.session.role;
  locals.userId =  req.session.userId;
  async.parallel([
	  function(callback) { 
	  	var sql="SELECT * FROM `award` WHERE `status`='1'";          
 		db.query(sql, function(err, results){
			if (err) return callback(err);
			locals.awards = results;
			callback();
		})},
	  function(callback) { 
	  	var sql="SELECT * FROM `product_category` WHERE `status`='1'";          
 		db.query(sql, function(err, results){
			if (err) return callback(err);
			var category = results;
			locals.category = category;
			callback();	
		})},
	  function(callback) { 
	  	var sql="SELECT * FROM `product` WHERE `status`='1'";          
 		db.query(sql, function(err, results){
			if (err) return callback(err);
			var product = results;
			locals.product = product;
			callback();	
		})}
	], function(err) {
	 if (err) return next(err);
	  res.render('index',locals);
	});
	
};

