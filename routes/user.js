//usamos el modelo User
var user = require('../moduls/User')

//metodo para iniciar sesion
exports.inicia = function(req, res){
	
	//buscamos que email y contra coincidan
	user.find({$and: [{_id: req.body.email}, {password: req.body.password}]}, function(error, documento){
		//en caso de error
		if( error || documento[0] == undefined ){
			req.session.error = true
			res.redirect('/error')
		}else{
			//si todo sale bien
			req.session.datos = documento

			res.redirect('/principal')
			
		}
	})
}

//metodo para registrar usuario
exports.registra = function(req, res){
	
	var new_user = new user({
			_id: req.body.email,
			user: req.body.user,
			nombre: req.body.nombre,
			apellido: req.body.apellido,
			password: req.body.password
		})
	new_user.save(function(error, documento){
		if( error || documento[0] == undefined ){
			req.session.error = true
			res.redirect('/error')
		}else{
			//si todo sale bien
			req.session.datos = documento

			res.redirect('/principal')
			
		}
	})
}