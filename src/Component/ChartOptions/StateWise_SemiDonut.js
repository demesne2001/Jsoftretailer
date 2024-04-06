export function StateWise_SemiDonut(name, state) {
    let datax = []
    
	let datay = []

	for (let index = 0; index < state.length; index++) {
		datay.push(state[index].y)
	}

	for (let index = 0; index < state.length; index++) {
		datax.push(state[index].x)

	}
    const options = {
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                return (val.toFixed(2)) + '%'
            },
            style: {
                fontSize: '11px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                colors: ['#000']
            },
            background: {
                enabled: false,
            }
        },
        chart: {
            type: 'donut',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 700
                }
            }
        },
        
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 90,
                offsetY: 80,
                dataLabels: {
                    format: 'scale'
                }
            }
        },
        legend: {
            show: true,
            // floating: false,
            // fontSize: '0px',
            position: 'bottom',
            offsetX: 0,
            offsetY: -90,
            // labels: {
            //     useSeriesColors: true,
            // },
            // markers: {
            //     width: 0,
            //     height: 0
            // },
        },

        labels: name,

        tooltip: {
            show: true,
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: (seriesName) => '',
                },
                formatter: function (val, name) {
                    return datax[name.dataPointIndex] + ' : ' + val
                }
            },
        },

        responsive: [{
            breakpoint: 480,
            options: {
                chart: {
                    type: 'donut',
                    animations: {
                        enabled: true,
                        easing: 'easeinout',
                        speed: 800,
                        animateGradually: {
                            enabled: true,
                            delay: 150
                        },
                        dynamicAnimation: {
                            enabled: true,
                            speed: 700
                        }
                    },
                    width: 300
                },
                legend: {
                    position: 'bottom'
                },
                plotOptions: {
                    pie: {
                        startAngle: -90,
                        endAngle: 90,
                        offsetY: 0,
                        dataLabels: {
                            format: 'scale'
                        }
                    }
                }
            }
        }]
    }
    return options
} 