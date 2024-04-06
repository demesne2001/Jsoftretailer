export function CityWise_LoliMap(name) {
	
    const options = {
        chart: {
            name:'weight',
            height: 350,
            type: 'bar',
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
                    speed: 350
                }
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '5%',
                borderRadius: 1,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
            }
        },
        dataLabels: {
            enabled: true,
            formatter: function (val) {
                return val;
            },
            offsetY: -18,
            style: {
                fontSize: '14px',
                colors: ["#25e1fa"],
            },
            background: {
                enabled: true,
                foreColor: '#000000',
                padding: 10,
                borderRadius: 50,
                borderWidth: 2,
                borderColor: '#26a0fc',
                opacity: 1,

            }
        },
        tooltip: {
            x: {
                formatter: function (val) {
                    return val
                }
            },
            y: {
                formatter: function (val) {
                    return val
                }
            }
        },

        xaxis: {
            categories: name,
            position: 'bottom',
           
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false
            },
            crosshairs: {
                fill: {
                    type: 'gradient',
                    gradient: {
                        colorFrom: '#D8E3F0',
                        colorTo: '#BED1E6',
                        stops: [0, 100],
                        opacityFrom: 0.4,
                        opacityTo: 0.5,
                    }
                }
            },
        },
        yaxis: {
            axisBorder: {
                show: false
            },
            axisTicks: {
                show: false,
            },
            labels: {
                show: false,
                formatter: function (val) {
                    return val;
                }
            }

        },
        responsive: [{
            breakpoint: 593,
            options: {
                xaxis:{
                    labels:{
                        formatter:function(val) {
                            if (val.length > 3) {
                                return val.slice(0, 3) + "..."
                            } else {
                                return val
                            }
                        }
                    },
                },
                    
                dataLabels: {
                    enabled: true,
                    formatter: function (val) {
                        return ((val/1000).toFixed(1)).toString() + "KG"
                    },
                    offsetY: -18,
                    style: {
                        fontSize: '14px',
                        colors: ["#25e1fa"],
                    },
                    background: {
                        enabled: true,
                        foreColor: '#000000',
                        padding: 10,
                        borderRadius: 50,
                        borderWidth: 2,
                        borderColor: '#26a0fc',
                        opacity: 1,
        
                    }
                },
                yaxis: {
                    labels: {
                        show: true,
                        formatter: function (val) {
                            return ((val/1000).toFixed(1)).toString() + "KG"
                        }
                    }
                }
            }
        }]
    }
    return options
}