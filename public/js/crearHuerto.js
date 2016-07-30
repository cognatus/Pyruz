$.noConflict();

jQuery(document).ready(function(){
	
	jQuery.ajax({
		method: 'GET',
		url: 'tomar_huerto',
		cache: true,
		success: function(data) {
			var variableChida = '';
			for (var i = 0; i < data.length; i++) {
				var aux = data[i]
				var contador = 0;
				variableChida +='<div class="block_container bg_white">'
										  +'<div class="colhh1">'
										    +'<div class="pd_24 title">Huerto '+aux.nombre_huerto+'</div>'
										  +'</div>'
										  +'<div style="padding-bottom: 24px;" class="colhh1">'
										    +'<div class="orc_container bg_brown" data-id="'+aux._id+'" data-name="'+aux.nombre_huerto+'">'
										    	for (var j = 0; j < parseInt(aux.filas); j++) {
										    	variableChida += '<div class="row">'
										    			for (var k = 0; k < parseInt(aux.columnas); k++) {
										    				variableChida += '<div class="col">'
										    					if (aux.plantas[contador] == undefined || aux.plantas.length == 0) {
										    						variableChida += '<div class="block bg_darkgray" data-pos="'+(contador+1)+'">'
										    					}else{
										    						
										    							if (aux.plantas[n].lugar == (contador+1)) {
											    							variableChida += '<div class="block bg_darkgray icon" data-pos="'+(contador+1)+'">'
											    						}else{
											    							variableChida += '<div class="block bg_darkgray" data-pos="'+(contador+1)+'">'
											    						}
											    					
										    					}
										    					variableChida += '</div>'
										    				+'</div>'
										    				contador++
										    			}
										    		variableChida += '</div>'
										    		contador++;
										    	}
										    variableChida += '</div>'
										    +'<div class="controls_right">'
										      +'<div class="colhh1">'
										        +'<div style="margin-left: 4px;" class="title">Controlar</div>'
										      +'</div>'
										      +'<div class="block_container bg_amber white_text">'
										        +'<div class="pd_18">'
										          +'<div class="colhh1">'
										            +'<div class="control_opc">Iluminar'
										              +'<div class="switch r_f">'
										                +'<input id="switch1" type="checkbox" class="cmn-toggle cmn-toggle-round"/>'
										                +'<label for="switch1"></label>'
										              +'</div>'
										            +'</div>'
										          +'</div>'
										        +'</div>'
										      +'</div>'
										      +'<div class="block_container bg_green white_text">'
										        +'<div class="pd_18">'
										          +'<div class="colhh1">'
										            +'<div class="control_opc">Acondicionar'
										              +'<div class="switch r_f">'
										                +'<input id="switch2" type="checkbox" class="cmn-toggle cmn-toggle-round"/>'
										                +'<label for="switch2"></label>'
										              +'</div>'
										            +'</div>'
										          +'</div>'
										        +'</div>'
										      +'</div>'
										      +'<div class="block_container bg_blue white_text">'
										        +'<div class="pd_18">'
										          +'<div class="colhh1">'
										            +'<div class="control_opc">Regar'
										              +'<div class="switch r_f">'
										                +'<input id="switch3" type="checkbox" class="cmn-toggle cmn-toggle-round"/>'
										                +'<label for="switch3"></label>'
										              +'</div>'
										            +'</div>'
										          +'</div>'
										        +'</div>'
										      +'</div>'
										    +'</div>'
										  +'</div>'
										+'</div>';
			}
			jQuery('.magia_container').append(variableChida);
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error ' + textStatus + " " + errorThrown);
		}
	});

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

	jQuery(document).ajaxComplete(function(){
		jQuery('.orc_container').each(function(){
			jQuery(this).find('.col').css('width' , jQuery(this).width()/jQuery(this).find('.row').eq(0).find('.col').length);
			jQuery(this).find('.block').css('height' , jQuery(this).find('.block').width());
		});

		jQuery('.orc_container .block').click(function(){
			var dataHuerto = jQuery(this).parents('.orc_container').attr('data-id');
			console.log(dataHuerto)
			var dataNombre = jQuery(this).parents('.orc_container').attr('data-name');
			var pos = jQuery(this).attr('data-pos');
			jQuery('#hiddenEditarLote').fadeIn();
			jQuery('#nombreHuerto').text(dataNombre);
			jQuery('#hiddenInput').val(dataHuerto);
			jQuery('#hiddenPos').val(pos);
		});

		jQuery('#contHuertos').text(jQuery('.orc_container').length);
		jQuery('#contPlantas').text(jQuery('.orc_container .block').length);

		jQuery('.close_popup').click(function(){
			jQuery('.hidden_popup').fadeOut();
		});
			
	})


});