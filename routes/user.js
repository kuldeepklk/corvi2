var async = require('async');
var sha1 = require('js-sha1');
//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var email= post.email;

      var sql = "INSERT INTO `admin_user`(`fname`,`lname`,`email`,`username`, `password`) VALUES ('" + fname + "','" + lname + "','" + email + "','" + name + "','" + sha1(pass) + "')";

      var query = db.query(sql, function(err, result) {

         message = "Succesfully! Your account has been created.";
         res.render('signup.ejs',{message: message});
      });

   } else {
      res.render('signup');
   }
};
 
//-----------------------------------------------login page call------------------------------------------------------//
exports.checkemail = function(req, res){
	var post  = req.body;
	if(req.method == "POST"){
		var sql="SELECT email FROM `admin_user` WHERE `email`='"+post.email+"' AND status = '1'"; 
	  console.log(sql);                       
      db.query(sql, function(err, results){ 
	  	if(results.length){
			res.render('checkemail.ejs',{message: "false"});
		}else{
			res.render('checkemail.ejs',{message: "true"});
		}
	  })
	}
}
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
     
      var sql="SELECT * FROM `admin_user` WHERE `email`='"+name+"' and password = '"+sha1(pass)+"'"; 
	  //console.log(sql);                       
      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
			req.session.role = results[0].role;
            req.session.user = results[0];
			
            console.log(results[0].id);
            res.redirect('/');
         }
         else{
            message = 'Wrong Credentials.';
            res.render('login.ejs',{message: message});
         }
                 
      });
   } else {
      res.render('login.ejs',{message: message});
   }
           
};
//-----------------------------------------------dashboard page functionality----------------------------------------------
           
exports.dashboard = function(req, res, next){
           
   var user =  req.session.user,
   userId = req.session.userId;
   console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `admin_user` WHERE `id`='"+userId+"'";

   db.query(sql, function(err, results){
      res.render('dashboard.ejs', {user:user});    
   });       
};
//------------------------------------logout functionality----------------------------------------------
exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/");
   })
};
//--------------------------------render user details after login--------------------------------
exports.profile = function(req, res){

   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `admin_user` WHERE `id`='"+userId+"'";          
   db.query(sql, function(err, result){  
      res.render('profile.ejs',{data:result});
   });
};
//---------------------------------edit users details after login----------------------------------
exports.editprofile=function(req,res){
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   var sql="SELECT * FROM `admin_user` WHERE `id`='"+userId+"'";
   db.query(sql, function(err, results){
      res.render('edit_profile.ejs',{data:results});
   });
};
exports.userList = function(req,res){
	var userId = req.session.userId;
    if(userId == null){
      res.redirect("/login");
      return;
   }
	var locals = {};
	var id = req.params.id;
	locals.userId =  req.session.userId;
	async.parallel([
	function(callback) { 
		var sql="SELECT * FROM `admin_user` WHERE `status`='1'";          
		db.query(sql, function(err, results){
			if (err) return callback(err);
			var users = results;
			locals.users = users;
			callback();	
		})},
	], function(err) {
	 if (err) return next(err);
	  res.render('users',locals);
	});
}
exports.user = function(req, res){
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
			 if(post.password){
		 		var sql = "UPDATE `admin_user` SET `fname` = '" + post.fname + "',`lname` = '" + post.lname + "',`email` = '" + post.email + "',`password` = '" + sha1(post.password) + "',`role` = '" + post.role + "',`modifiedon` = '" + modifiedon + "',`modified_ip` = '" +modified_ip+ "',`modifiedby` = '1' WHERE `id` = '"+post.id+"'";
			}else{
				var sql = "UPDATE `admin_user` SET `fname` = '" + post.fname + "',`lname` = '" + post.lname + "',`email` = '" + post.email + "',`role` = '" + post.role + "',`modifiedon` = '" + modifiedon + "',`modified_ip` = '" +modified_ip+ "',`submittedby` = '"+userId+"' WHERE `id` = '"+post.id+"'";	
			}
	
		 }else{
		 var sql = "INSERT INTO `admin_user`(`fname`,`lname`,`email`,`password`,`role`,`createdon`,`insert_ip`,`submittedby`) VALUES ('" + post.fname + "','" + post.lname + "','" + post.email + "','" + sha1(post.password) + "','" + post.role + "','" + createdon + "','" +insert_ip+ "','"+userId+"')";
		 }
		 console.log(sql);
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
exports.delete_user = function(req,res){
	var userId = req.session.userId;
	var id = req.params.id;
	  var insert_ip		= req.ip;
	  var modifiedon	= req.app.locals.dt;
	  var modified_ip	= req.ip;
	var sql = "UPDATE `admin_user` SET `status` = '0',`deletedon` = '" + modifiedon + "',`delete_ip` = '" +insert_ip+ "',`deletedby` = '"+userId+"' WHERE `id` = '"+id+"'";
	var query = db.query(sql, function(err, result) {
		console.log(id);
		res.send("valid");
	})
	
}
