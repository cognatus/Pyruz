$.noConflict();
var socket = io('http://localhost:3000/arduino');

function elimHuerto(idHuerto){
	jQuery.ajax({
		method: 'POST',
		url: '/eliminar_huerto',
		data: {
			idHuertoDel: idHuerto
		},
		success: function(data) {
			alert('¡Huerto eliminado correctamente!');
			location.reload();
		}, error: function(jqXHR, textStatus, errorThrown) {
			console.log('error Eliminar' + textStatus + " " + errorThrown);
		}
	});
}

jQuery(document).ready(function(){

	jQuery('#elimPlanta').click(function(){
		var idPlanta = jQuery(this).attr('data-id');
		var idHuertElim = jQuery(this).attr('data-huert');
		//console.log("Planta: " + idPlanta + "  Huerto: " + idHuertElim)
		jQuery.ajax({
			method: 'POST',
			url: '/eliminar_planta',
			data: {
				plantaElim: idPlanta,
				idHuertoElim: idHuertElim
			},
			success: function(data) {
				alert('¡Planta eliminada correctamente!')
			}, error: function(jqXHR, textStatus, errorThrown) {
				console.log('error Eliminar' + textStatus + " " + errorThrown);
			}
		});
	});

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
				var contador = 0;
				variableChida +='<div class="block_container bg_white">'
										  +'<div class="colhh1">'
										    +'<div class="pd_24 title">'+aux.nombre_huerto+'</div>'
										  +'</div>'
										  +'<div class="colhh1">'
										    +'<div class="orc_container bg_brown" data-id="'+aux._id+'" data-name="'+aux.nombre_huerto+'">'
										    	for (var j = 0; j < parseInt(aux.filas); j++) {
										    	variableChida += '<div class="row">'
										    			for (var k = 0; k < parseInt(aux.columnas); k++) {
										    				variableChida += '<div class="col">'
										    					variableChida += '<div class="block bg_darkgray" data-pos="'+(contador+1)+'"></div>'
										    				variableChida += '</div>'
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
										    +'<div class="pd_24" style="height: 48px;"><div class="circle_icon r_f" style="background-image: url(&quot;images/delete.png&quot;)" onclick ="elimHuerto(&quot;' + aux._id+ '&quot;)" title="Eliminar"></div></div>'
										  +'</div>'
										+'</div>';
			}
			jQuery('.magia_container').append(variableChida);

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
				var elem = jQuery(this);
				var dataHuerto = jQuery(this).attr('data-id');

				jQuery.ajax({
					method: 'GET',
					url: 'tomar_huerto2',
					cache: true,
					data: {huerto2: dataHuerto},
					success: function(data) {
						for(var j = 0; j < elem.find('.block').length; j++){
							for (var n = 0; n < data.length; n++) {
								if(elem.find('.block').eq(j).attr('data-pos') == data[n]._id){
									elem.find('.block[data-pos="' + data[n]._id + '"]').addClass('icon')
								}
							}

						}
						
						
					}, error: function(jqXHR, textStatus, errorThrown) {
						console.log('error Tomar huerto 2' + textStatus + " " + errorThrown);
					}
				});
			});
		},
		error: function(jqXHR, textStatus, errorThrown) {
			console.log('error ' + textStatus + " " + errorThrown);
		}
	});

	jQuery('#plantaHidden').hide();

	jQuery('#editPlanta').click(function(){
		jQuery('#plantaHidden').slideDown();
		if(jQuery('#plantaNombre').text() != ''){
			jQuery('form#plantaHidden').attr('action', 'cambia_planta')
		}
		else{
			jQuery('form#plantaHidden').attr('action', 'agregar_planta')
		}
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

	jQuery('#validPlant').hide();

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
			jQuery('html, body').css('overflow', 'hidden');

			if(jQuery(this).hasClass('icon') ){
				jQuery('#elimPlanta').attr('data-id', pos).attr('data-huert', dataHuerto);
				jQuery('#validPlant').show();
			}
			else{
				jQuery('#info_planta').hide();
				jQuery('#editPlanta').trigger('click');
			}
			
			jQuery.ajax({
				method: 'GET',
				url: 'tomar_planta',
				cache: true,
				data: {huerto: dataHuerto,
						posc: pos},
				success: function(data) {
					console.log(data[0].plantas.length)
					for(var i = 0; i < data[0].plantas.length; i++){
						console.log(data[0].plantas[i]._id == pos)
						if (data[0].plantas[i]._id == pos) {
							jQuery('#plantaNombre').text(data[0].plantas[i].nombre_planta)
							jQuery('#plantaLuz').text(data[0].plantas[i].luz)
							jQuery('#plantaHum').text(data[0].plantas[i].humedad)
							jQuery('#plantaTemp').text(data[0].plantas[i].temperatura)
							jQuery('#plantaLugar').text(pos)	
						}
					}
					
				}, error: function(jqXHR, textStatus, errorThrown) {
					console.log('error ' + textStatus + " " + errorThrown);
				}
			});

		});

		jQuery('#contHuertos').text(jQuery('.orc_container').length);
		jQuery('#contPlantas').text(jQuery('.orc_container .block').length);

		jQuery('.close_popup').click(function(){
			jQuery('.hidden_popup').fadeOut();
		});

		
			
	});
});