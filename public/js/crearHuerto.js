$.noConflict();

jQuery(document).ready(function(){
	
	jQuery('#crearHuerto').click(function(){
		jQuery('#hiddenAddHuerto').fadeIn();
	});

	jQuery('.orc_container .block').click(function(){
		var dataHuerto = jQuery(this).parents('.orc_container').attr('data-num');
		var dataLote = jQuery(this).attr('data-lote');
		jQuery('#hiddenEditarLote').fadeIn();
	});

	jQuery('.close_popup').click(function(){
		jQuery('.hidden_popup').fadeOut();
	});

	jQuery('.orc_container .block').css('height' , jQuery('.orc_container .block').width());


});