
/*
 * Rutas
 */

exports.index = function(req, res){
	res.render('index', { title: 'Pyruz' })
}

exports.control = function(req, res){
	res.render('control', { title: 'Pyruz' })
}

exports.registro = function(req, res){
	res.render('registro', { title: 'Express' })
}

exports.inicio = function(req, res){
	res.render('inicio', { title: 'Express' })
}