
/*
 * Rutas
 */

exports.index = function(req, res){
	if (!req.session.datos) {
		res.render('index', { 
			title: 'Pyruz'
		});
	}else{
		res.render('principal', { title: 'Pyruz', datos: req.session.datos  })
	}
	
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
	res.render('principal', { title: 'Pyruz', datos: req.session.datos  })
}

exports.error = function(req, res){
	res.render('error', { title: 'Pyruz', datos: req.session.datos  })
}