var path = require('path');
exports.product = function(req, res){
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
		 	var sql = "UPDATE `product` SET `category_id` = '" + post.category_id + "',`category_range_id` = '" + post.category_range_id + "',`product_name` = '" + post.product_name + "',`product_detail` = '" + post.product_detail + "',`product_price` = '" + post.product_price + "',`all_price` = '" + post.all_price + "',`product_price_yellow` = '" + post.product_price_yellow + "',`product_price_warm` = '" + post.product_price_warm + "',`product_price_white` = '" + post.product_price_white + "',`award_image` = '" + post.award_image + "',`how_to_install` = '" + post.how_to_install + "',`amazon_link` = '" + post.amazon_link + "',`lumens` = '" + post.lumens + "',`watts` = '" + post.watts + "',`modifiedon` = '" + modifiedon + "',`modified_ip` = '" +modified_ip+ "',`modifiedby` = '"+userId+"' WHERE `id` = '"+post.id+"'";
	
		 }else{
		 var sql = "INSERT INTO `product`(`category_id`,`category_range_id`,`product_name`,`product_detail`, `product_price`,`all_price`,`product_price_yellow`,`product_price_warm`,`product_price_white`,`award_image`,`how_to_install`,`amazon_link`,`lumens`,`watts`,`createdon`,`insert_ip`,`submittedby`) VALUES ('" + post.category_id + "','" + post.category_range_id + "','" + post.product_name + "','" + post.product_detail + "','" + post.product_price + "','" + post.all_price + "','" + post.product_price_yellow + "','" + post.product_price_warm + "','" + post.product_price_white + "','" + post.award_image + "','" + post.how_to_install + "','" + post.amazon_link + "','" + post.lumens + "','" + post.watts + "','" + createdon + "','" +insert_ip+ "','"+userId+"')";
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
			if (typeof req.files.feature_images != 'undefined'){
				var ext_feature_images = path.extname(req.files.feature_images.name)
				req.files.feature_images.mv('public/assets/products/feature_images/'+id+''+ext_feature_images, function(err) {
					if (!err){
						console.log("feature_images");
						var sql = "UPDATE `product` SET `feature_images` = '"+id+ext_feature_images+"' WHERE `id` = '"+id+"'";
						var query = db.query(sql, function(err, result) {
						})
					}
				});
			}
			if (typeof req.files.instruction_manual != 'undefined'){
				var ext_instruction_manual = path.extname(req.files.instruction_manual.name)
				req.files.instruction_manual.mv('public/assets/products/instruction_manual/'+id+''+ext_instruction_manual, function(err) {
				if (!err){
					console.log("instruction_manual");
					var sql = "UPDATE `product` SET `instruction_manual` = '"+id+ext_instruction_manual+"' WHERE `id` = '"+id+"'";
					var query = db.query(sql, function(err, result) {
					})
				}
				});
			}	
			if (typeof req.files.ies_profile != 'undefined'){
				var ext_ies_profile = path.extname(req.files.ies_profile.name)
				req.files.ies_profile.mv('public/assets/products/ies_profile/'+id+''+ext_ies_profile, function(err) {
				if (!err){
					console.log("ies_profile");
					var sql = "UPDATE `product` SET `ies_profile` = '"+id+ext_ies_profile+"' WHERE `id` = '"+id+"'";
					var query = db.query(sql, function(err, result) {
					})
				}
				});
			}	
			if (typeof req.files.lm79  != 'undefined'){
				var ext_lm79 = path.extname(req.files.lm79.name)
				req.files.lm79.mv('public/assets/products/lm79/'+id+''+ext_lm79, function(err) {
				if (!err){
					console.log("lm79");
					var sql = "UPDATE `product` SET `lm79` = '"+id+ext_lm79+"' WHERE `id` = '"+id+"'";
					var query = db.query(sql, function(err, result) {
					})
				}
				});
			}
			if (typeof req.files.video_link != 'undefined'){
				var ext_video_link = path.extname(req.files.video_link.name)
				req.files.video_link.mv('public/assets/products/video_link/'+id+''+ext_video_link, function(err) {
				if (!err){
					console.log("video_link");
					var sql = "UPDATE `product` SET `video_link` = '"+id+ext_video_link+"' WHERE `id` = '"+id+"'";
					var query = db.query(sql, function(err, result) {
					})
				}
				});
			}
			if (typeof req.files.video_preview != 'undefined'){
				var ext_video_preview = path.extname(req.files.video_preview.name)
				req.files.video_preview.mv('public/assets/products/video_preview/'+id+''+ext_video_preview, function(err) {
				if (!err){
					console.log("video_preview");
					var sql = "UPDATE `product` SET `video_preview` = '"+id+ext_video_preview+"' WHERE `id` = '"+id+"'";
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
exports.delete_product = function(req,res){
	var userId = req.session.userId;
	var id = req.params.id;
	var insert_ip		= req.ip;
	  var modifiedon	= req.app.locals.dt;
	  var modified_ip	= req.ip;
	var sql = "UPDATE `product` SET `status` = '0',`deletedon` = '" + modifiedon + "',`deleted_ip` = '" +insert_ip+ "',`deletedby` = '"+userId+"'  WHERE `id` = '"+id+"'";
	//console.log(sql);
	var query = db.query(sql, function(err, result) {
		console.log(id);
		res.send("valid");
	})
	
}
//Category
exports.category = function(req, res){
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
		 	var sql = "UPDATE `product_category` SET `parent_id` = '" + post.parent_id + "',`category` = '" + post.category + "',`min_watt` = '" + post.min_watt + "',`max_watt` = '" + post.max_watt + "',`modifiedon` = '" + modifiedon + "',`modified_ip` = '" +modified_ip+ "',`modifiedby` = '"+userId+"' WHERE `id` = '"+post.id+"'";
	
		 }else{
		 var sql = "INSERT INTO `product_category`(`parent_id`,`category`,`min_watt`,`max_watt`,`createdon`,`insert_ip`,`submittedby`) VALUES ('" + post.parent_id + "','" + post.category + "','" + post.min_watt + "','" + post.max_watt + "','" + createdon + "','" +insert_ip+ "','"+userId+"')";
		 }
		console.log(sql);
      var query = db.query(sql, function(err, result) {
		if(post.id){
			id = post.id;
		}else{
			id = result.insertId;
		}
		console.log(id);
		if(req.files){
			console.log("category_images:"+req.files.category_image.name);
			if (typeof req.files.category_image != 'undefined'){
				var ext_category_image = path.extname(req.files.category_image.name)
				req.files.category_image.mv('public/assets/products/category_images/'+id+''+ext_category_image, function(err) {
					if (!err){
						
						var sql = "UPDATE `product_category` SET `category_image` = '"+id+ext_category_image+"' WHERE `id` = '"+id+"'";
						var query = db.query(sql, function(err, result) {
						})
					}
				});
			}
		}
		if(req.files){
			if (typeof req.files.category_warm_image != 'undefined'){
				var ext_category_image = path.extname(req.files.category_warm_image.name)
				req.files.category_warm_image.mv('public/assets/products/category_warm_image/'+id+''+ext_category_image, function(err) {
					if (!err){
						console.log("category_warm_image");
						var sql = "UPDATE `product_category` SET `category_warm_image` = '"+id+ext_category_image+"' WHERE `id` = '"+id+"'";
						var query = db.query(sql, function(err, result) {
						})
					}
				});
			}
		}
		if(req.files){
			if (typeof req.files.category_yellow_image != 'undefined'){
				var ext_category_image = path.extname(req.files.category_yellow_image.name)
				req.files.category_yellow_image.mv('public/assets/products/category_yellow_image/'+id+''+ext_category_image, function(err) {
					if (!err){
						console.log("category_images");
						var sql = "UPDATE `product_category` SET `category_yellow_image` = '"+id+ext_category_image+"' WHERE `id` = '"+id+"'";
						var query = db.query(sql, function(err, result) {
						})
					}
				});
			}
		}
		if(req.files){
			if (typeof req.files.category_white_image != 'undefined'){
				var ext_category_image = path.extname(req.files.category_white_image.name)
				req.files.category_white_image.mv('public/assets/products/category_white_image/'+id+''+ext_category_image, function(err) {
					if (!err){
						console.log("category_images");
						var sql = "UPDATE `product_category` SET `category_white_image` = '"+id+ext_category_image+"' WHERE `id` = '"+id+"'";
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
exports.delete_category = function(req,res){
	var userId = req.session.userId;
	var id = req.params.id;
	  var insert_ip		= req.ip;
	  var modifiedon	= req.app.locals.dt;
	  var modified_ip	= req.ip;
	var sql = "UPDATE `product_category` SET `status` = '0',`deletedon` = '" + modifiedon + "',`delete_ip` = '" +insert_ip+ "',`deletedby` = '"+userId+"' WHERE `id` = '"+id+"'";
	var query = db.query(sql, function(err, result) {
		console.log(id);
		res.send("valid");
	})
	
}
//Award
exports.award = function(req, res){
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
		 	var sql = "UPDATE `award` SET `award_name` = '" + post.award_name + "',`award_detail` = '"+ post.award_detail +"',`modifiedon` = '" + modifiedon + "',`modified_ip` = '" +modified_ip+ "',`modifiedby` = '"+userId+"' WHERE `id` = '"+post.id+"'";
	
		 }else{
		 var sql = "INSERT INTO `award`(`award_name`,`award_detail`,`createdon`,`insert_ip`,`submittedby`) VALUES ('" + post.award_name + "','"+ post.award_detail +"','" + createdon + "','" +insert_ip+ "','"+userId+"')";
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
			if (typeof req.files.award_image != 'undefined'){
				var ext_award_image = path.extname(req.files.award_image.name)
				req.files.award_image.mv('public/assets/products/award_images/'+id+''+ext_award_image, function(err) {
					if (!err){
						console.log("award_image");
						var sql = "UPDATE `award` SET `award_image` = '"+id+ext_award_image+"' WHERE `id` = '"+id+"'";
						var query = db.query(sql, function(err, result) {
						})
					}
				});
			}
			if (typeof req.files.award_image_1 != 'undefined'){
				var ext_award_image_1 = path.extname(req.files.award_image_1.name)
				req.files.award_image_1.mv('public/assets/products/award_image_1/'+id+''+ext_award_image_1, function(err) {
					if (!err){
						console.log("award_image_1");
						var sql = "UPDATE `award` SET `award_image_1` = '"+id+ext_award_image_1+"' WHERE `id` = '"+id+"'";
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
exports.delete_award = function(req,res){
	var userId = req.session.userId;
	var id = req.params.id;
	  var insert_ip		= req.ip;
	  var modifiedon	= req.app.locals.dt;
	  var modified_ip	= req.ip;
	var sql = "UPDATE `award` SET `status` = '0',`deletedon` = '" + modifiedon + "',`delete_ip` = '" +insert_ip+ "',`deletedby` = '"+userId+"' WHERE `id` = '"+id+"'";
	console.log(sql);
	var query = db.query(sql, function(err, result) {
		console.log(id);
		res.send("valid");
	})
	
}
exports.award_list = function(req,res){
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
		})}
	], function(err) {
	 if (err) return next(err);
	  res.render('award',locals);
	});
}
exports.contact_us = function(req,res){
	res.render('contact-us');
}
exports.delete_product_image = function(req,res){
	var userId = req.session.userId;
	var id = req.params.id;
	  var insert_ip		= req.ip;
	  var modifiedon	= req.app.locals.dt;
	  var modified_ip	= req.ip;
	var sql = "UPDATE `product_images` SET `status` = '0',`deletedon` = '" + modifiedon + "',`deleted_ip` = '" +insert_ip+ "',`deletedby` = '"+userId+"' WHERE `id` = '"+id+"'";
	var query = db.query(sql, function(err, result) {
		console.log(id);
		res.send("valid");
	})
	
}
var async = require('async');
exports.product_list = function(req,res){
	var userId = req.session.userId;
	var locals = {};
	var id = req.params.id;
	locals.userId =  req.session.userId;
	locals.role = req.session.role;
	async.parallel([
	function(callback) { 
		var sql="SELECT * FROM `product_category` WHERE id = '"+id+"' AND `status`='1'";          
		db.query(sql, function(err, results){
			if (err) return callback(err);
			var category = results;
			locals.category = category;
			callback();	
		})},  
	function(callback) { 
		var sql="SELECT * FROM `product` WHERE category_id = '"+id+"' AND `status`='1'";          
		db.query(sql, function(err, results){
			if (err) return callback(err);
			var products = results;
			locals.products = products;
			callback();	
		})}
	], function(err) {
	 if (err) return next(err);
	  res.render('product_list',locals);
	});
}
exports.product_detail= function(req,res){
	var userId = req.session.userId;
	var locals = {};
	var id = req.params.id;
	var category_id = req.params.category_id;
	locals.userId =  req.session.userId;
	locals.role = req.session.role;
	async.parallel([
	function(callback) { 
		var sql="SELECT * FROM `product_category` WHERE id = '"+category_id+"' AND `status`='1'";          
		db.query(sql, function(err, results){
			if (err) return callback(err);
			var category = results;
			locals.category = category;
			callback();	
		})},  
	function(callback) { 
		var sql="SELECT * FROM `product` WHERE id = '"+id+"' AND `status`='1'";          
		db.query(sql, function(err, results){
			if (err) return callback(err);
			var product = results;
			locals.product = product;
			callback();	
		})},
	function(callback) { 
		var sql="SELECT * FROM `product_images` WHERE product_id = '"+id+"' AND `status`='1'";          
		db.query(sql, function(err, results){
			if (err) return callback(err);
			var product_images = results;
			locals.product_images = product_images;
			callback();	
		})}
	], function(err) {
	 if (err) return next(err);
	  res.render('product_detail',locals);
	});
}
exports.upload_image = function(req,res){
	var userId = req.session.userId;
	var post  		= req.body;
	var createdon		= req.app.locals.dt;
	var insert_ip		= req.ip;
	if(req.files){
		if (typeof req.files.upload != 'undefined'){
			var sql="SELECT * FROM `product_images` ORDER BY id DESC LIMIT 1";          
			db.query(sql, function(err, result){
				if(result.length > 0){
					var id = result[0]['id']+1;
				}else{
					var id = 1;
				}
				var ext_upload = path.extname(req.files.upload.name);
				req.files.upload.mv('public/assets/products/upload/'+id+''+ext_upload, function(err) {
					if (!err){
						//console.log("upload_image");
						var sql = "INSERT INTO `product_images` (`product_id`,`image`,`createdon`,`insert_ip`,`submittedby`) VALUES('"+post.id+"','"+id+ext_upload+"','" + createdon + "','" +insert_ip+ "','"+userId+"')";
						//console.log(sql);
						var query = db.query(sql, function(err, result) {
							res.send("valid");
						})
					}
				});
			})
		}
	}
}