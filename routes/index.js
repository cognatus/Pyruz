
/*
 * Rutas
 */

exports.index = function(req, res){
	req.session.datos = [{_id: 'elchido@chido.com'}]
	res.render('index', { title: 'Pyruz' })
}

exports.control = function(req, res){
	res.render('control', { title: 'Pyruz' })
}