
/**
 * Module dependencies.
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
app.set('charts', __dirname + '/public/charts');
app.use(express.favicon());
app.use(express.bodyParser({ keepExtensions: true, uploadDir: __dirname + "/public/charts" }));
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

 var SerialPort = require("serialport").SerialPort
 var serialPort = new SerialPort("COM3", {baudrate:9600}, false);
 io.of('/datos').on('connection', function (socket) {
	 serialPort.open(function (err, results) {

		var piso = 1;

	 	if(err){
			console.log('err ' + err)
	 	}else{
	 		console.log('SerialPort 9600 to Read is open in COM3')
	 	}

		serialPort.on('data', function(data) {
			var test=data.toString()
			var info=test.split(",")

			console.log('data received: ' + data + ' floor: '+ piso)
			console.log('dat0 received: ' + info[0])
			console.log('dat1 received: ' + info[1])
			console.log('dat2 received: ' + info[2])
			socket.emit('hum', info[0])
			socket.emit('temp', info[1])
			socket.emit('luz', info[2])

		})
	 })
 })

//start the server
http.listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
