//coleccion de usuario
var mongoose = require('mongoose')

var Garden = mongoose.Schema({

	nombre_huerto: {type: String, required: true},
	dueno: {type: String, required: true},
	filas: {type: String, required: true},
	columnas: {type: String, required: true},
	plantas: [{
				_id: {type: String, required: true},
				nombre_planta: {type: String, required: true},
				humedad: {type: String, required: true},
				temperatura: {type: String, required: true},
				luz: {type: String, required: true}
	}]

})

module.exports = mongoose.model('garden', Garden)
