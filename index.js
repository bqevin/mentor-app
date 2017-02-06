//Require all files
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//Declaring Database Schema
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var User = mongoose.model('User', new Schema(
		// {
		// 	id:ObjectId,
		// 	name: String,
		// 	age : Number,
		// 	gender : String
		// }
));

//Connecting the mongoose database
mongoose.connect('mongodb://localhost/rest_api');


//Init app
var app =express();

//ALL CONFIGURATIONS
app.use(express.static(__dirname + '/public'));
//Set the view engine
app.set('view engine', 'html');

//Have the HTML in the view source
app.locals.pretty = true;

//set body parser
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());



app.get('/', function(req, res){
  res.render('Random test');
});

//Declaring the listening port 
var port = process.env.PORT || '2000';

app.listen(port, function(){
	console.log('listening on port: '+port);
})

