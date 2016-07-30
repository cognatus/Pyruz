/*
* Metodos relacionados con el usuario
*/

//usamos el modelo User
var user = require('../moduls/User')
var fs = require('fs')


//metodo para iniciar sesion
exports.inicia = function(req, res){
	
	//buscamos que email y contra coincidan
	user.find({_id: req.body.email, password: req.body.password}, function(error, documento){
		//en caso de error
		if( error || documento[0] == undefined ){
			res.json(error)
		}else{
			//si todo sale bien
			req.session.datos = documento

			res.redirect('/principal')
			
		}
	})
}

//metodo para registrar usuario
exports.registra = function(req, res){
	
	//preparamos lo que vamos a guardar
	var new_user = new user({
			_id: req.body.email,
			user: req.body.user,
			nombre: req.body.nombre,
			apellido: req.body.apellido,
			password: req.body.password
		})

	//guardamos al nuevo usuario
	new_user.save(function(error, documento){
		if( error ){
			res.json(error)
		}else{

			user.find({_id: req.body.email}, function(error2, documento2){
					//en caso de error
					if( error2 || documento2[0] == undefined ){
						res.json(error2)
					}else{
						//si todo sale bien
						var readableStream = fs.createReadStream(__base + '/public/images/profilephoto.png')
						var writableStream = fs.createWriteStream(__base + '/public/profile_photos/' + documento2[0]._id + '.png')

						readableStream.pipe(writableStream, {end: false})

						var readableStream2 = fs.createReadStream(__base + '/public/images/profile_background.jpg')
						var writableStream2 = fs.createWriteStream(__base + '/public/profile_backgrounds/' + documento2[0]._id + '.png')

						readableStream2.pipe(writableStream, {end: false})

						req.session.datos = documento2

						res.redirect('/principal')
						
					}
				})
		}
	})
}

exports.modificaInfo = function(req, res){

	var profileImage = req.files.p_photo
	var nameImage = req.session.datos[0]._id

	//comprobamos si vamos a modificar la de perfil
	if( profileImage.originalFilename != '' ){

		var readableStream = fs.createReadStream(profileImage.path)
		var writableStream = fs.createWriteStream(__base + "/public/profile_photos/" + nameImage + ".png")

		readableStream.pipe(writableStream, {end: false})

		res.redirect('/profile')
	}

 	user.update({_id: req.session.datos[0]._id},{
		$set:{
			_id: req.body.email,
			user: req.body.user,
			nombre: req.body.nombre,
			apellido: req.body.apellido,
			password: req.body.password
			
				
			}
		}, function(error, documento){
			if(error){
				res.send('Error.');
			}else{
				user.find({_id: req.body.email}, function(error2, documento2){
					//en caso de error
					if( error2 || documento2[0] == undefined ){
						res.json(error2)
					}else{
						//si todo sale bien
						req.session.datos = documento2

						res.redirect('/principal')
						
					}
				})
			}	
	});

 }

 exports.cerrar = function(req, res){

	req.session.datos = null

	res.redirect('/')
}