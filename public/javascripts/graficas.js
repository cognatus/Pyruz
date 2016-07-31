		
var chartHumedad;
var chartTemp;
var chartLuz;


//configuracion para la grafica de humedad
chartHumedad = new Highcharts.Chart({
	chart: {
		renderTo: 'chartHumedad', 
		type: 'spline',
		animation: Highcharts.svg, 
		marginRight: 10,
		events: {
			load: function () {
				var series = this.series[0];
				setInterval(function () {
					var x = (new Date()).getTime(), 
						y = Math.random();
					series.addPoint([x, y], true, true);
				}, 1000);
			}
		}
	},
	title: {
		text: 'Live random data'
	},
	xAxis: {
		type: 'Hora',
		tickPixelInterval: 150
	},
	yAxis: {
		title: {
			text: 'HR'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#808080'
		}]
	},
	tooltip: {
		formatter: function () {
			return '<b>' + this.series.name + '</b><br/>' +
				Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
				Highcharts.numberFormat(this.y, 2);
		}
	},
	legend: {
		enabled: false
	},
	exporting: {
		enabled: false
	},
	series: [{
		name: 'Grafica de Humedad',
		data: (function () {
			
			var data = [],
				time = (new Date()).getTime(),
				i
			for (i = -19; i <= 0; i += 1) {
				data.push({
					x: time + i * 1000,
					y: Math.random()
				});
			}
			return data;
		}())
	}]
});

//configuracion para la grafica de humedad
chartLuz = new Highcharts.Chart({
	chart: {
		renderTo: 'chartLuz', 
		type: 'spline',
		animation: Highcharts.svg, 
		marginRight: 10,
		events: {
			load: function () {
				var series = this.series[0];
				setInterval(function () {
					var x = (new Date()).getTime(), 
						y = Math.random();
					series.addPoint([x, y], true, true);
				}, 1000);
			}
		}
	},
	title: {
		text: 'Live random data'
	},
	xAxis: {
		type: 'Hora',
		tickPixelInterval: 150
	},
	yAxis: {
		title: {
			text: 'Lux'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#3498db'
		}]
	},
	tooltip: {
		formatter: function () {
			return '<b>' + this.series.name + '</b><br/>' +
				Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
				Highcharts.numberFormat(this.y, 2);
		}
	},
	legend: {
		enabled: false
	},
	exporting: {
		enabled: false
	},
	series: [{
		color: '#3498db',
		name: 'Grafica de Luz',
		data: (function () {
			
			var data = [],
				time = (new Date()).getTime(),
				i
			for (i = -19; i <= 0; i += 1) {
				data.push({
					x: time + i * 1000,
					y: Math.random()
				});
			}
			return data;
		}())
	}]
});

//configuracion para la grafica de Temperatura
chartTemperatura = new Highcharts.Chart({
	chart: {
		renderTo: 'chartTemp', 
		type: 'spline',
		animation: Highcharts.svg, 
		marginRight: 10,
		events: {
			load: function () {
				var series = this.series[0];
				setInterval(function () {
					var x = (new Date()).getTime(), 
						y = Math.random();
					series.addPoint([x, y], true, true);
				}, 1000);
			}
		}
	},
	title: {
		text: 'Live random data'
	},
	xAxis: {
		type: 'Hora',
		tickPixelInterval: 150
	},
	yAxis: {
		title: {
			text: '°C'
		},
		plotLines: [{
			value: 0,
			width: 1,
			color: '#3498db'
		}]
	},
	tooltip: {
		formatter: function () {
			return '<b>' + this.series.name + '</b><br/>' +
				Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
				Highcharts.numberFormat(this.y, 2);
		}
	},
	legend: {
		enabled: false
	},
	exporting: {
		enabled: false
	},
	series: [{
		name: 'Grafica de Temperatura',
		data: (function () {
			
			var data = [],
				time = (new Date()).getTime(),
				i
			for (i = -19; i <= 0; i += 1) {
				data.push({
					x: time + i * 1000,
					y: Math.random()
				});
			}
			return data;
		}())
	}]
});

//configuracion para la grafica de temperatura
/*chartTemp = new Highcharts.Chart({
	chart: {
		renderTo: 'chartTemp', 
		defaultSeriesType: 'spline',
		events: {
			load: function() {
					var series = this.series[0];
					setInterval(function () {
						var x = (new Date()).getTime(), // current time
							y = Math.random();
							series.addPoint([x, y], true, true);
					}, 1000);
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
		name: 'Random data',
		data: (function () {
			
			var data = [],
				time = (new Date()).getTime(),
				i;
			for (i = -19; i <= 0; i += 1) {
				data.push({
					x: time + i * 1000,
					y: Math.random()
				});
			}
			return data;
		}())
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
});*/