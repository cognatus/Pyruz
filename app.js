
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var app = express();
var http = require('http').createServer(app);
var path = require('path');
var mongoose = require('mongoose');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.cookieParser('sabemos todo sobre ti'));
app.use(express.session());
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost/pyruz', function(error){
	if(error){
		throw error;
	}else{
		console.log('Estas super bato crazy party mirrey loco conectado a MongoDB');
	}
});

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//rutas
app.get('/', routes.index)

//Metodos GET
app.get('/inicia', user.inicia)

//Metodos POST
app.post('/registra', user.registra)

//start the server
http.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});