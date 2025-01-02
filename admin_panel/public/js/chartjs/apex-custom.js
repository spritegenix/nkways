$(function () {
	"use strict";
	   
	 

    var datetimes=$('#chart7').data('datetimes');
	var sales_incomes=$('#chart7').data('sales_incomes');
	var purchase_expenses=$('#chart7').data('purchase_expenses');

	sales_incomes=sales_incomes.split(',').map(function(item) {return parseInt(item, 10);});
	purchase_expenses=purchase_expenses.split(',').map(function(item) {return parseInt(item, 10);});
	datetimes=datetimes.split(',').map(function(date) {return date.replace(/'/g, '');});

 
	// chart 7
	var options = {
		series: [{
			name: 'Sales/Income',
			type: 'area',
			data: sales_incomes
		}, {
			name: 'Purchase/Expenses',
			type: 'line',
			data: purchase_expenses
		}],
		chart: {
			foreColor: '#9ba7b2',
			height: 350,
			type: 'line',
			stacked: false,
			zoom: {
				enabled: false
			},
			toolbar: {
				show: true
			},
		},
		colors: ["#17a00e", "#f41127"],
		stroke: {
			width: [2, 5],
			curve: 'smooth'
		},
		plotOptions: {
			bar: {
				columnWidth: '50%'
			}
		},
		fill: {
			opacity: [ 0.25, 1],
			gradient: {
				inverseColors: false,
				shade: 'light',
				type: "vertical",
				opacityFrom: 0.85,
				opacityTo: 0.55,
				stops: [0, 100, 100, 100]
			}
		},
		labels: datetimes,
		markers: {
			size: 0
		},
		xaxis: {
			type: 'date'
		},
		yaxis: {
			title: {
				text: '',
			},
			min: 0
		},
		tooltip: {
			shared: true,
			intersect: false,
			y: {
				formatter: function (y) {
					if (typeof y !== "undefined") {
						return y.toFixed(0) + " ";
					}
					return y;
				}
			}
		}
	};
	var chart = new ApexCharts(document.querySelector("#chart7"), options);
	chart.render();
	
	 
	
	
});