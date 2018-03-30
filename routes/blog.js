var path = require('path');
var moment = require('moment');
exports.blog = function(req, res){
	var userId = req.session.userId;
   message = '';
   //console.log(req.files);
   if(req.method == "POST"){
      var id;
	  var post  		= req.body;
	  var createdon		= req.app.locals.dt;
	  var insert_ip		= req.ip;
	  var modifiedon	= req.app.locals.dt;
	  var modified_ip	= req.ip;
	  //var submittedby	= req.userId;
   	  //console.log(post);
		 if(post.id){
		 	var sql = "UPDATE `blog_post` SET `category_id` = '" + post.category_id + "',`blog_title` = '" + post.blog_title + "',`blog_description` = '" + post.blog_description + "',`modifiedon` = '" + modifiedon + "',`modified_ip` = '" +modified_ip+ "',`modifiedby` = '"+userId+"' WHERE `id` = '"+post.id+"'";
	
		 }else{
			var sql = "INSERT INTO `blog_post`(`category_id`,`blog_title`,`blog_description`,`createdon`,`insert_ip`,`submittedby`) VALUES ('" + post.category_id + "','" + post.blog_title + "','" + post.blog_description + "','" + createdon + "','" +insert_ip+ "','"+userId+"')";
		 }
		 //console.log(sql);
      	var query = db.query(sql, function(err, result) {
		if(post.id){
			id = post.id;
		}else{
			id = result.insertId;
		}
		console.log(id);
		if(req.files){
			if (typeof req.files.blog_image != 'undefined'){
				var ext_blog_image = path.extname(req.files.blog_image.name)
				req.files.blog_image.mv('public/assets/blog/'+id+''+ext_blog_image, function(err) {
					if (!err){
						console.log("blog_image");
						var sql = "UPDATE `blog_post` SET `blog_image` = '"+id+ext_blog_image+"' WHERE `id` = '"+id+"'";
						var query = db.query(sql, function(err, result) {
						})
					}
				});
			}
		}
         message = "valid";
         res.send(message);
      });
   }
};
exports.delete_blog_post = function(req,res){
	var userId = req.session.userId;
	var id = req.params.id;
	var insert_ip		= req.ip;
	  var modifiedon	= req.app.locals.dt;
	  var modified_ip	= req.ip;
	var sql = "UPDATE `blog_post` SET `status` = '0',`deletedon` = '" + modifiedon + "',`deleted_ip` = '" +insert_ip+ "',`deletedby` = '"+userId+"'  WHERE `id` = '"+id+"'";
	//console.log(sql);
	var query = db.query(sql, function(err, result) {
		console.log(id);
		res.send("valid");
	})
	
}
//Category
exports.blog_category = function(req, res){
	var userId = req.session.userId;
   	message = '';
   //console.log(req.files);
   if(req.method == "POST"){
      var id;
	  var post  		= req.body;
	  var createdon		= req.app.locals.dt;
	  var insert_ip		= req.ip;
	  var modifiedon	= req.app.locals.dt;
	  var modified_ip	= req.ip;
	  //var submittedby	= req.userId;
   	  //console.log(post);
		 if(post.id){
		 	var sql = "UPDATE `blog_category` SET `parent_id` = '" + post.parent_id + "',`category` = '" + post.category + "',`modifiedon` = '" + modifiedon + "',`modified_ip` = '" +modified_ip+ "',`modifiedby` = '"+userId+"' WHERE `id` = '"+post.id+"'";
	
		 }else{
		 var sql = "INSERT INTO `blog_category`(`parent_id`,`category`,`createdon`,`insert_ip`,`submittedby`) VALUES ('" + post.parent_id + "','" + post.category + "','" + createdon + "','" +insert_ip+ "','"+userId+"')";
		 }
		 //console.log(sql);
      var query = db.query(sql, function(err, result) {
		if(post.id){
			id = post.id;
		}else{
			id = result.insertId;
		}
		console.log(id);
		message = "valid";
        res.send(message);
      });
   }
};
exports.blog_delete_category = function(req,res){
	var userId = req.session.userId;
	var id = req.params.id;
	  var insert_ip		= req.ip;
	  var modifiedon	= req.app.locals.dt;
	  var modified_ip	= req.ip;
	var sql = "UPDATE `blog_category` SET `status` = '0',`deletedon` = '" + modifiedon + "',`deleted_ip` = '" +insert_ip+ "',`deletedby` = '"+userId+"' WHERE `id` = '"+id+"'";
	var query = db.query(sql, function(err, result) {
		console.log(id);
		res.send("valid");
	})
	
}

var async = require('async');
exports.blog_list = function(req,res){
	var totalEmployee = 0;
	var pageSize = 3;
	var pageCount = 0;
	var start = 0;
	var currentPage = 1;
	if (typeof req.query.page !== 'undefined') {
      currentPage = req.query.page;
    }
	if (parseInt(currentPage)>1) {
      start = (currentPage - 1) * pageSize;
    }
	var userId = req.session.userId;
	var locals = {};
	var id = req.params.id;
	locals.userId =  req.session.userId;
	locals.role = req.session.role;
	async.parallel([
	function(callback) { 
		var sql="SELECT * FROM `blog_category` WHERE id = '1' AND `status`='1'";          
		db.query(sql, function(err, results){
			if (err) return callback(err);
			var blog_category = results;
			locals.blog_category = blog_category;
			callback();	
		})}, 
		function(callback) { 
		var sql="SELECT count(id) as count FROM `blog_post` WHERE category_id = '1' AND `status`='1'";          
		db.query(sql, function(err, results){
			if (err) return callback(err);
			locals.totalPost = results[0]['count'];
			callback();	
		})}, 
	function(callback) { 
		var sql="SELECT * FROM `blog_post` WHERE category_id = '1' AND `status`='1' LIMIT "+start+" ,"+pageSize;          
		db.query(sql, function(err, results){
			if (err) return callback(err);
			var blog_posts = results;
			pageCount = Math.ceil(locals.totalPost/pageSize);
			locals.blog_posts = blog_posts;
			callback();	
		})}, 
	function(callback) { 
		var sql="SELECT * FROM `blog_post` WHERE category_id = '1' AND `status`='1' AND blog_image != '' LIMIT 4";          
		db.query(sql, function(err, results){
			if (err) return callback(err);
			var blog_all_posts = results;
			locals.blog_all_posts = blog_all_posts;
			callback();	
		})}
	], function(err) {
	 if (err) return next(err);
	  res.render('blog',{locals:locals,pageCount: pageCount, pageSize: pageSize, currentPage: currentPage});
	});
}
exports.blog_detail= function(req,res){
	var userId = req.session.userId;
	var locals = {};
	var id = req.params.id;
	locals.userId =  req.session.userId;
	locals.role = req.session.role;
	locals.moment = moment;
	async.parallel([
	function(callback) { 
		var sql="SELECT blog_post.*,admin_user.fname FROM `blog_post` INNER JOIN admin_user ON admin_user.id = blog_post.submittedby  WHERE blog_post.id = '"+id+"' AND blog_post.`status`='1'";          
		db.query(sql, function(err, results){
			if (err) return callback(err);
			var blog_post = results;
			locals.blog_post = blog_post;
			callback();	
		})}
		,function(callback) { 
		var sql="SELECT * FROM `blog_post` WHERE category_id = '1' AND `status`='1' AND blog_image != '' LIMIT 4";          
		db.query(sql, function(err, results){
			if (err) return callback(err);
			var blog_all_posts = results;
			locals.blog_all_posts = blog_all_posts;
			callback();	
		})}
	], function(err) {
	 if (err) return next(err);
	  res.render('blog_detail',locals);
	});
}
