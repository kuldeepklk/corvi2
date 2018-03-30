/*
* GET home page.
*/
var async = require('async');

exports.open_popup = function(req, res){
   var id = req.params.id;
   var locals = {};
  async.parallel([
	  function(callback) { 
	  	var sql="SELECT * FROM `product` WHERE `id`='"+id+"'";        
 		db.query(sql, function(err, results){
			if (err) return callback(err);
			locals.product = results;
			callback();
		})},
	  function(callback) { 
	  	var sql="SELECT * FROM `award` WHERE `status`='1' ORDER BY `award_name` ASC";          
 		db.query(sql, function(err, results){
			if (err) return callback(err);
			var awards = results;
			locals.awards = awards;
			callback();	
		})},
	  
	], function(err) {
	 if (err) return next(err);
	 //console.log(locals);
	  res.render('open',locals);
	});
	
};
exports.add_product = function(req, res){
	var locals = {};
	locals.category_id = req.params.category_id;
  async.parallel([
	  
	  function(callback) { 
	  	var sql="SELECT * FROM `award` WHERE `status`='1' ORDER BY `award_name` ASC";          
 		db.query(sql, function(err, results){
			if (err) return callback(err);
			var awards = results;
			locals.awards = awards;
			callback();	
		})},
	  
	], function(err) {
	 if (err) return next(err);
	 //console.log(locals);
	  res.render('add_product',locals);
	});
};
exports.edit_category = function(req, res){
	var locals = {};
	var id = req.params.id;
    async.parallel([
	  function(callback) { 
	  	var sql="SELECT * FROM `product_category` WHERE `id`='"+id+"'";        
 		db.query(sql, function(err, results){
			if (err) return callback(err);
			locals.category = results;
			callback();
		})}
	], function(err) {
	 if (err) return next(err);
	 //console.log(locals);
	  res.render('edit_category',locals);
	});
};
exports.add_category = function(req, res){
	var locals = {};
	res.render('add_category',locals);	
}
//Award
exports.edit_award = function(req, res){
	var locals = {};
	var id = req.params.id;
    async.parallel([
	  function(callback) { 
	  	var sql="SELECT * FROM `award` WHERE `id`='"+id+"'";        
 		db.query(sql, function(err, results){
			if (err) return callback(err);
			locals.award = results;
			callback();
		})}
	], function(err) {
	 if (err) return next(err);
	 //console.log(locals);
	  res.render('edit_award',locals);
	});
};
exports.add_award = function(req, res){
	var locals = {};
	res.render('add_award',locals);	
}
exports.add_image = function(req, res){
	var locals = {};
	locals.id = req.params.id;
	res.render('add_image',locals);	
}
exports.add_blog_post = function(req,res){
	var locals = {};
	res.render('add_blog_post',locals);
}
exports.edit_blog_post = function(req,res){
	var locals = {};
	var id = req.params.id;
    async.parallel([
	  function(callback) { 
	  	var sql="SELECT * FROM `blog_post` WHERE `id`='"+id+"'";        
 		db.query(sql, function(err, results){
			if (err) return callback(err);
			locals.blog_post = results;
			callback();
		})}
	], function(err) {
	 if (err) return next(err);
	 //console.log(locals);
	  res.render('edit_blog_post',locals);
	});
}
exports.add_user = function(req,res){
	var locals = {};
	res.render('add_user',locals);
}
exports.edit_user = function(req,res){
	var locals = {};
	var id = req.params.id;
    async.parallel([
	  function(callback) { 
	  	var sql="SELECT * FROM `admin_user` WHERE `id`='"+id+"'";        
 		db.query(sql, function(err, results){
			if (err) return callback(err);
			locals.user = results;
			console.log(locals.user);
			callback();
		})}
	], function(err) {
	 if (err) return next(err);
	 //console.log(locals);
	  res.render('edit_user',locals);
	});
}