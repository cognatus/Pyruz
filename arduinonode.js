
/**
 * Esta clase esta más muerta que algo muy muerto que ni se usa .-.
 */

var express = require('express');
var app = express();
var http = require('http').createServer(app);
var path = require('path');
var io = require('socket.io')(http);

// all environments
app.set('port', process.env.PORT || 6000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

/**
 * Arduino Stuff
 */

var SerialPort = require('serialport');
var serialPortWrite = new SerialPort('COM5');
/*port.on('open', function() {
	console.log('conecto')
});*/

 io.of('/arduino').on('connection', function (socket) {
	 
	 serialPortWrite.open(function (err, results){
		if(err){
			console.log('Error');
			console.log(err);
		}else{
			console.log('SerialPort 5000 to Write is open in COM5');
		}
	 })

	 	console.log('conecto')

	 	socket.on('apagarPiso', function (piso){
			serialPortWrite.write('d' + piso, function() {
				console.log('apagar '+piso);
			});
		 });

		socket.on('write', function (cosa, piso, condicion){
			serialPortWrite.write(cosa + piso + condicion +'\r', function() {
				console.log(cosa+' '+piso+' '+condicion+' ')
			});
		});

		socket.on('disconnect', function() {
				// leave the room
				console.log('adios')
			});

 })

//start the server
http.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
