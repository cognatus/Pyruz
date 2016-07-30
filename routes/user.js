/*
* Metodos relacionados con el usuario
*/

//usamos el modelo User
var user = require('../moduls/User')


//metodo para iniciar sesion
exports.inicia = function(req, res){
	
	//buscamos que email y contra coincidan
	user.find({$and: [{_id: req.body.email}, {password: req.body.password}]}, function(error, documento){
		//en caso de error
		if( error || documento[0] == undefined ){
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
			res.redirect('/error')
		}else{
			//si todo sale bien
			var readableStream = fs.createReadStream(__base + '/public/images/profilephoto.png')
			var writableStream = fs.createWriteStream(__base + '/public/profile_photos/' + documento[0]._id + '.png')

			readableStream.pipe(writableStream, {end: false})

			var readableStream2 = fs.createReadStream(__base + '/public/images/profilebackground.jpg')
			var writableStream2 = fs.createWriteStream(__base + '/public/profile_backgrounds/' + documento[0]._id + '.png')

			readableStream2.pipe(writableStream, {end: false})

			req.session.datos = documento

			res.redirect('/principal')
			
		}
	})
}

//metodo para cambiar fotos
exports.modificaFotos = function(req, res){

	//definimos las fotos a cambiar
	var backImage = req.files.updateProfileBack
	var profileImage = req.files.updateProfilePhoto
	var nameImage = req.session.datos[0]._id

	//comprobamos si vamos a modificar la de portada
	if( backImage.originalFilename != '' ){

		var readableStream = fs.createReadStream(backImage.path)
		var writableStream = fs.createWriteStream(__base + "/public/profile_backgrounds/" + nameImage + ".png")

		readableStream.pipe(writableStream, {end: false})

		res.redirect('/profile')
	}

	//comprobamos si vamos a modificar la de perfil
	if( profileImage.originalFilename != '' ){

		var readableStream = fs.createReadStream(profileImage.path)
		var writableStream = fs.createWriteStream(__base + "/public/profile_photos/" + nameImage + ".png")

		readableStream.pipe(writableStream, {end: false})

		res.redirect('/profile')
	}
 }

 exports.modificaInfo = function(req, res){

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
					if( error2 || documento[0] == undefined ){
						res.redirect('/error')
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