//coleccion de usuario
var mongoose = require('mongoose');

var User = mongoose.Schema({

	_id: {type: String, required: true},//email
	user: {type: String, required: true},
	nombre: {type: String, required: true},
	apellido: {type: String, required: true},
	password: {type: String, required: true}

});

module.exports = mongoose.model('user', User);
