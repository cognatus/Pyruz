
/*
 * Rutas
 */

exports.index = function(req, res){
	res.render('index', { 
		title: 'Pyruz',
		datos: req.session.datos 
	});
}

exports.control = function(req, res){
	res.render('control', { 
		title: 'Pyruz',
		datos: req.session.datos
	});
}

exports.registro = function(req, res){
	res.render('registro', { title: 'Pyruz' })
}

exports.principal = function(req, res){
	res.render('principal', { title: 'Pyruz' })
}