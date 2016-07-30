/*
* Metodos relacionados con el huerto
*/

//usamos el modelo User
var garden = require('../moduls/Garden')

//metodo para obtener info de un huerto
exports.tomar_huerto = function(req, res){
	
	console.log(req.session.datos[0]._id)
	//buscamos que email y contra coincidan
	garden.find({dueno: req.session.datos[0]._id}, function(error, documento){
		//en caso de error
		if( error || documento[0] == undefined ){
			console.log(error)
		}else{
			console.log(documento)
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
			res.redirect('/principal')
		}
	})
}

//metodo para agregar una planta
exports.agregar_planta = function(req, res){

	console.log(req.body.idHuerto)

	//especificamos el huerto en el cual se agregara la planta y la guardamos
	garden.update(
		{ _id: req.body.idHuerto },
		{ $addToSet: { plantas: {
				nombre_planta: req.body.nombre_planta,
				humedad: req.body.humedad,
				temperatura: req.body.temperatura,
				luz: req.body.luz,
				lugar: req.body.posPlanta
				} 
			} 
		}, function(error, documento){
			if(error){
				console.log(error)
			}else{
				console.log(documento)
				res.redirect('/principal')
			}
	});
}
