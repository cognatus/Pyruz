
/*
 * GET home page.
 */

exports.index = function(req, res){
	req.session.datos = [{_id: 'elchido@chido.com'}]
	console.log(req.session.datos[0])
	res.render('index', { title: 'Express' });
};