/**
* Module dependencies.
*/
var express = require('express')
  , routes = require('./routes')
  , open_popup = require('./routes/open_popup')
  , product = require('./routes/product')
  , blog = require('./routes/blog')
  , user = require('./routes/user')
  , http = require('http')
  ,fileUpload = require('express-fileupload')
  ,dateTime  = require('node-datetime')
  ,async = require('async')
  , path = require('path');
  

//var methodOverride = require('method-override');
var session = require('express-session');
var app = express();

var mysql      = require('mysql');
var bodyParser=require("body-parser");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'corvi'
});
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});
 
global.db = connection;

var dt = dateTime.create();
var formatted = dt.format('Y-m-d H:M:S');
app.locals.dt = formatted;
 
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
              secret: 'keyboard cat',
              resave: false,
              saveUninitialized: true,
              cookie: { maxAge: 3600000 }
            }))
 
// development only
var port = 3000;
app.get('/', routes.index);//call for main index page
app.get('/product_list/:id',product.product_list);
app.get('/product_detail/:category_id/:id',product.product_detail);

app.get('/signup', user.signup);//call for signup page
app.post('/signup', user.signup);//call for signup post 
app.get('/login', user.login);//call for login page
app.post('/login', user.login);//call for login post
app.get('/logout', user.logout);//call for login post
app.get('/home/dashboard', user.dashboard);//call for dashboard page after login
app.get('/home/logout', user.logout);//call for logout
app.get('/home/profile',user.profile);//to render users profile
app.get('/open_popup/:id',open_popup.open_popup);//to render users profile
app.get('/add_product/:category_id',open_popup.add_product);//to render users profile

app.get('/delete_product/:id',product.delete_product);
app.post('/product',product.product);
app.post('/category',product.category);

app.get('/add_category',open_popup.add_category);
app.get('/edit_category/:id',open_popup.edit_category);
app.post('/category',product.category);
app.get('/delete_category/:id',product.delete_category);

app.get('/add_award',open_popup.add_award);
app.get('/edit_award/:id',open_popup.edit_award);
app.post('/award',product.award);
app.get('/delete_award/:id',product.delete_award);
app.get('/add_image/:id',open_popup.add_image);
app.post('/upload_image',product.upload_image);
app.get('/delete_product_image/:id',product.delete_product_image);

app.get('/add_blog_post',open_popup.add_blog_post);
app.get('/edit_blog_post/:id',open_popup.edit_blog_post);

app.post('/blog',blog.blog);

app.get('/blog',blog.blog_list);

app.get('/blog_detail/:id',blog.blog_detail);

app.get('/users', user.userList);//call for signup page
app.get('/add_user',open_popup.add_user);
app.get('/edit_user/:id',open_popup.edit_user);
app.get('/delete_user/:id',user.delete_user);
app.post('/user',user.user);

app.get('/award',product.award_list);
app.get('/contact_us',product.contact_us);

app.post('/checkemail',user.checkemail);

//Middleware
app.listen(3000);
console.log('Express server listening on port ' + app.get('port'));
