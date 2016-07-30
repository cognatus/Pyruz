/*
* Metodos relacionados con el huerto
*/

//usamos el modelo User
var garden = require('../moduls/Garden')

//metodo para obtener info de un huerto
exports.tomar_huerto = function(req, res){
	
	//buscamos que email y contra coincidan
	garden.find({dueno: req.session.datos[0]._id}, function(error, documento){
		//en caso de error
		if( error || documento[0] == undefined ){
			res.redirect('/error')
		}else{
			//si todo sale bien
			res.send(documento)
			
		}
	})
}

//metodo para registrar un huerto
exports.crear_huerto = function(req, res){
	
	//preparamos lo que vamos a guardar
	var new_garden = new garden({
			nombre_huerto: req.body.nombre_huerto,
			dueno: req.session.datos[0]._id,
			filas: req.body.filas,
			columnas: req.body.columnas
		})

	//guardamos el nuevo huerto
	new_garden.save(function(error, documento){
		if( error ){
			res.redirect('/error')
		}else{
			//si todo sale bien
			res.redirect('/garden')
		}
	})
}

//metodo para agregar una planta
exports.agregar_planta = function(req, res){

	//especificamos el huerto en el cual se agregara la planta y la guardamos
	garden.update(
		{ $and: [{dueno: req.session.datos[0]._id}, {nombre_huerto: req.query.nombre_huerto}] },
		{ $addToSet: { plantas: {
				nombre_planta: req.query.emisor,
				humedad: req.query.humedad,
				temperatura: req.query.temperatura,
				luz: req.query.luz,
				lugar: req.query.lugar
				} 
			} 
		}, function(error, documento){
			if(error){
				console.log('error dude!!!! D:')
			}else{
				res.redirect('/garden')
			}
	});
}
