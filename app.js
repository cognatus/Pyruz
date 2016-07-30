
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var garden = require('./routes/garden');
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

//variable global para los directorios
global.__base = __dirname

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
app.get('/control', routes.control)
app.get('/registro', routes.registro)

//Metodos GET
app.get('/inicia', user.inicia)
app.get('/cerrar', user.cerrar)
app.get('/tomar_huerto', garden.tomar_huerto)

//Metodos POST
app.post('/registra', user.registra)
app.post('/modificaFotos', user.modificaFotos)
app.post('/modificaInfo', user.modificaInfo)
app.post('/agregar_planta', garden.agregar_planta)
app.post('/crear_huerto', garden.crear_huerto)



//start the server
http.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
	console.log('de momento en la galleta hay un mail definido')
});