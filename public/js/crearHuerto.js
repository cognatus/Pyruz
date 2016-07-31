$.noConflict();
var socket = io('http://localhost:3000/arduino');

jQuery(document).ready(function(){

	var firstPhoto = jQuery('img#profilePhoto').attr('src');

	jQuery('#changePhoto').click(function(){
		jQuery('input#filePhoto').trigger('click');
	});

	jQuery('#filePhoto').change(function(){
		if (jQuery(this).val() != '' && jQuery(this).val() != null) {
        	previewProfilePhoto(this);
		}
		else{
        	jQuery('img#profilePhoto').attr('src', firstPhoto);
		}
    });

	function previewProfilePhoto(input) {
	    if (input.files.length > 0) {
	        var reader = new FileReader();

	        reader.onload = function (e) {
	            jQuery('img#profilePhoto').attr('src', e.target.result);
	        }  
	        reader.readAsDataURL(input.files[0]);
	    }
	}
	
	jQuery.ajax({
		method: 'GET',
		url: 'tomar_huerto',
		cache: true,
		success: function(data) {
			var variableChida = '';
			for (var i = 0; i < data.length; i++) {
				var aux = data[i]
				var array = aux.plantas
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
										    					if(array.length != 0){
											    					for (var n=0; n < array.length; n++) {
											    						if(parseInt(array[n].lugar) == (contador+1)){
											    							variableChida += '<div class="block bg_darkgray icon" data-pos="'+(contador+1)+'">'	
											    						}else{
											    							variableChida += '<div class="block bg_darkgray" data-pos="'+(contador+1)+'">'	
											    						}
											    					}
											    				}else{
											    					variableChida += '<div class="block bg_darkgray" data-pos="'+(contador+1)+'">'	
											    				}
										    				variableChida += '</div>'

										    				+'</div>'
										    				contador++
										    			}
										    		variableChida += '</div>'
										    	}
										    variableChida += '</div>'
										    +'<div class="controls_right switchs_cont" data-id="'+aux._id+'">'
										      +'<div class="colhh1">'
										        +'<div style="margin-left: 4px;" class="title">Controlar</div>'
										      +'</div>'
										      +'<div class="block_container bg_amber white_text">'
										        +'<div class="pd_18">'
										          +'<div class="colhh1">'
										            +'<div class="control_opc">Iluminar'
										              +'<div class="switch r_f" >'
										                +'<input id="switch1_'+ i +'" type="checkbox" data-type="luz" data-value="0" class="cmn-toggle cmn-toggle-round"/>'
										                +'<label for="switch1_'+ i +'"></label>'
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
										                +'<input id="switch2_'+ i +'" type="checkbox" data-type="vent" data-value="0" class="cmn-toggle cmn-toggle-round"/>'
										                +'<label for="switch2_'+ i +'"></label>'
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
										                +'<input id="switch3_' + i + '" type="checkbox" data-type="agua" data-value="0" class="cmn-toggle cmn-toggle-round"/>'
										                +'<label for="switch3_' + i + '"></label>'
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

	jQuery('#plantaHidden').hide();

	jQuery('#editPlanta').click(function(){
		jQuery('#plantaHidden').slideDown();
	});

	jQuery('#crearHuerto').click(function(){
		jQuery('#hiddenAddHuerto').fadeIn();
		jQuery('html, body').css('overflow', 'hidden');
	});

	jQuery('#editarPerfil').click(function(){
		jQuery('#hiddenProfilePhoto').fadeIn();
		jQuery('html, body').css('overflow', 'hidden');
	});

	jQuery('.p_hidelem').hover(function(){
		jQuery(this).find('span').show();
	}, function(){
		jQuery(this).find('span').hide();
	});

/*	jQuery('.orc_container .block').click(function(){
		var dataHuerto = jQuery(this).parents('.orc_container').attr('data-num');
		var dataLote = jQuery(this).attr('data-lote');
		jQuery('#hiddenEditarLote').fadeIn();
	});*/

	jQuery('.close_popup').click(function(){
		jQuery('.hidden_popup').fadeOut();
		location.reload();
	});

	jQuery(document).ajaxComplete(function(){

		jQuery('.switch input').on('change',function(){
			var type = jQuery(this).attr('data-type');
			var huerto = jQuery(this).parents('.switchs_cont').attr('data-id');
			var data = jQuery(this).attr('data-value');
			if( data == '0'){
				jQuery(this).attr('data-value' , '1');
				if(type == 'luz'){
					socket.emit('write', 'l', 0, 1)	
				}
				else if(type == 'vent') {
					socket.emit('write', 'v', 0, 1)	
				}
				else if(type == 'agua'){
					socket.emit('write', 'b', 0, 1)	
				}
			}
			else{
				jQuery(this).attr('data-value' , '0');
				if(type == 'luz'){
					socket.emit('write', 'l', 0, 0)	
				}
				else if(type == 'vent') {
					socket.emit('write', 'v', 0, 0)	
				}
				else if(type == 'agua'){
					socket.emit('write', 'b', 0, 0)	
				}
			}

		});

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
			jQuery('html, body').css('overflow', 'hidden');
		});

		jQuery('#contHuertos').text(jQuery('.orc_container').length);
		jQuery('#contPlantas').text(jQuery('.orc_container .block').length);

		jQuery('.close_popup').click(function(){
			jQuery('.hidden_popup').fadeOut();
		});

		jQuery
			
	});
});