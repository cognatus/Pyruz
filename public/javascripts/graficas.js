var socket = io('http://localhost:6000/datos');
			
var chartHumedad;
var chartTemp;
var chartLuz;

//configuracion para la grafica de humedad
chartHumedad = new Highcharts.Chart({
	chart: {
		renderTo: 'chartHumedad', 
		defaultSeriesType: 'spline',
		events: {
			load: function() {
					// Cada vez que reciba un valor desde el socket, lo meto en la gráfica
					socket.on('hum', function (data) {
						var dato = parseInt(data)
						var tiempo = (new Date()).getTime();
						var series = chartHumedad.series[0];
						series.addPoint([tiempo, dato]);
						$('#humd').text(dato +' HR');
						$('#humm').text(dato +' HR');
						if(series.data.length > 7){
							series.data[0].remove(true);
						}
					});
				}
		}
	},
	rangeSelector : {
		selected : 100
	},
	title: {
		text: 'Humedad'
	},
	xAxis: {
		type: 'datetime',
		tickPixelInterval: 150,
		maxZoom: 20 * 1000
	},
	yAxis: {
		minPadding: 0.2,
		maxPadding: 0.2,
		title: {
			text: 'HR'
		}
	},
	series: [{
		color: '#3498db',
		name: 'Lote 1',
		data: []
	}]
});

//configuracion para la grafica de temperatura
chartTemp = new Highcharts.Chart({
	chart: {
		renderTo: 'chartTemp', 
		defaultSeriesType: 'spline',
		events: {
			load: function() {
					// Cada vez que reciba un valor desde el socket, lo meto en la gráfica
					socket.on('temp', function (data) {
						var dato = parseInt(data)
						var tiempo = (new Date()).getTime();
						var series = chartTemp.series[0];
						series.addPoint([tiempo, dato]);
						$('#temp').text(dato +' °C');
						$('#temp').text(dato +' °C');
						if(series.data.length > 7){
							series.data[0].remove(true);
						}
					});
				}
		}
	},
	rangeSelector : {
		selected : 100
	},
	title: {
		text: 'Temperatura'
	},
	xAxis: {
		type: 'datetime',
		tickPixelInterval: 150,
		maxZoom: 20 * 1000
	},
	yAxis: {
		minPadding: 0.2,
		maxPadding: 0.2,
		title: {
			text: '°C'
		}
	},
	series: [{
		color: '#3498db',
		name: 'Lote 1',
		data: []
	}]
});

//configuracion para la grafica de temperatura
chartLuz = new Highcharts.Chart({
	chart: {
		renderTo: 'chartLuz', 
		defaultSeriesType: 'spline',
		events: {
			load: function() {
					// Cada vez que reciba un valor desde el socket, lo meto en la gráfica
					socket.on('temp', function (data) {
						var dato = parseInt(data)
						var tiempo = (new Date()).getTime();
						var series = chartLuz.series[0];
						series.addPoint([tiempo, dato]);
						$('#temp').text(dato +' Lux');
						$('#temp').text(dato +' Lux');
						if(series.data.length > 7){
							series.data[0].remove(true);
						}
					});
				}
		}
	},
	rangeSelector : {
		selected : 100
	},
	title: {
		text: 'Luz'
	},
	xAxis: {
		type: 'datetime',
		tickPixelInterval: 150,
		maxZoom: 20 * 1000
	},
	yAxis: {
		minPadding: 0.2,
		maxPadding: 0.2,
		title: {
			text: 'Lux'
		}
	},
	series: [{
		color: '#3498db',
		name: 'Lote 1',
		data: []
	}]
});