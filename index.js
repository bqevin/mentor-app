//Require all files
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var path = require("path");
var passport = require('passport'); 
require('./config/passport')(passport); // pass passport for configuration
var flash    = require('connect-flash');
var morgan       = require('morgan');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var session      = require('express-session');



//Init app
var app =express();

// DB config files
var db = require('./config/db');
// configuration ===============================================================
mongoose.connect(db.url); // connect to our database


// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

//For caching of content
var oneDay = 86400000;

//ALL CONFIGURATIONS
// view engine setup
app.set('views', path.join(__dirname, '/public'));
app.set('view engine', 'ejs');
//Serve the static files
app.use(express.static(__dirname + '/public', { maxAge: oneDay }));





//app.set('view engine', 'html');

//Have the HTML in the view source
app.locals.pretty = true;

//set body parser
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 


// required for passport
app.use(session({ secret: 'notateacherbutanawakener' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session


// routes ==================================================
require('./app/routes')(app, passport); // load our routes and pass in our app and fully configured passport




// start app ===============================================
// startup our app at http://localhost:2000

//Declaring the listening port 
var port = process.env.PORT || '2000';

app.listen(port, function(){
	console.log('listening on port: '+port);
})


// expose app           
exports = module.exports = app;   

