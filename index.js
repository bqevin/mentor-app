var express = require('express');

var app =express();

app.get('/', function(req, res){
  res.render('Random test');
});

//Declaring the listening port 
var port = process.env.PORT || '2000';

app.listen(port, function(){
	console.log('listening on port: '+port);
})

