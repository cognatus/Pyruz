
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var garden = require('./routes/garden');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var path = require('path');
var mongoose = require('mongoose');

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.cookieParser('sabemos todo sobre ti'));
app.use(express.session());
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + '/public' }));
//app.use(express.favicon());
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
app.get('/principal', routes.principal)

//Metodos GET
app.get('/cerrar', user.cerrar)
app.get('/tomar_huerto', garden.tomar_huerto)
app.get('/tomar_huerto2', garden.tomar_huerto2)
app.get('/tomar_planta', garden.tomar_planta)
app.get('/cerrar', user.cerrar)

//Metodos POST
app.post('/inicia', user.inicia)
app.post('/registra', user.registra)
app.post('/modificaInfo', user.modificaInfo)
app.post('/agregar_planta', garden.agregar_planta)
app.post('/crear_huerto', garden.crear_huerto)


/*
* Cosas arduino
*/

 
/*var SerialPort = require("serialport");
var serialPortWrite = new SerialPort("COM5", {
  baudRate: 9600
});*/

 	var j5 = require("johnny-five"),
    board = new j5.Board(),
    boardReady = false;

	board.on("ready",function(){
		boardReady = true;
	});

 io.of('/arduino').on('connection', function (socket) {
	
	  /*serialPortWrite.on('open', function(err, results){
		if(err){
			console.log('Error');
			console.log(err);
		}else{
			console.log('SerialPort 5000 to Write is open in COM5');
		}
	 })*/

	 	console.log('conecto')

	 	socket.on('apagarPiso', function (piso){
			/*serialPortWrite.write('d' + piso, function() {
				console.log('apagar '+piso);
			});*/
		 });



		socket.on('disconnect', function() {
				// leave the room
				console.log('adios')
			});
		

	 	socket.on('write', function (cosa, piso, condicion){
			if (boardReady) {
				var led = new j5.Led(53);
				var venti = new j5.Led(51);
				var foco = new j5.Led(52);
				switch(cosa){
					case 'b':
						if (condicion == 0) {
							led.off()
						}else{
							led.on()
						}
						
					break;
					case 'v':
						if (condicion == 0) {
							venti.off()
						}else{
							venti.on()
						}
					break;
					case 'l':
						if (condicion == 0) {
							foco.off()
						}else{
							foco.on()
						}
					break;
				}
			}
			
			/*serialPortWrite.write(cosa + piso + condicion +'\r', function() {
				console.log(cosa+' '+piso+' '+condicion+' ')
			});*/
		});
 })


//start the server
http.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
	console.log('de momento en la galleta hay un mail definido')
});