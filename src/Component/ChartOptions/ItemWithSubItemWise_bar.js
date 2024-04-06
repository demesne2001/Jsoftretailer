export function ItemWithSubItemWise_bar(name) {
    const options = {
        chart: {
            type: 'bar',
            height: 380
        },
        legend: {
            position: 'bottom'
        },
        plotOptions: {
            bar: {
                barHeight: '100%',
                distributed: true,
                horizontal: true,
                dataLabels: {
                    position: 'bottom'
                },
            }
        },
        colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e', '#f48024', '#69d2e7'],
        dataLabels: {
            enabled: true,
            textAnchor: 'start',
            style: {
                colors: ['black']
            },
            formatter: function (val, opt) {
                return opt.w.globals.labels[opt.dataPointIndex] + ":" + val
            },
            // offsetX: 0,
            // offsetY: 0,
            dropShadow: {
                enabled: true
            }
        },
        stroke: {
            width: 1,
            // colors: ['#fff']
        },
        xaxis: {
            categories: name,
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
            labels: {
                show: false
            }
        },
        tooltip: {
            theme: 'dark',
            x: {
                show: false
            },
            y: {
                title: {
                    formatter: function () {
                        return ''
                    }
                }
            }
        },
        responsive: [{
            breakpoint: 593,
            options: {
                
                xaxis:{
                    labels:{
                        formatter: function(val) {
                            
                          return ((val/1000).toFixed(0)).toString()
                        
                        }
                    }
                },
                dataLabels: {
                    enabled: true,
                    textAnchor: 'start',
                    style: {
                        colors: ['black']
                    },
                    formatter: function (val, opt) {
                        return opt.w.globals.labels[opt.dataPointIndex] + ":" +  ((val/1000).toFixed(0)).toString() + "KG"
                    },
                    // offsetX: 0,
                    // offsetY: 0,
                    dropShadow: {
                        enabled: true
                    }
                },
                yaxis: {
                    labels: {
                        show: true,
                        formatter: function (val) {
                            if (val.length > 3) {
                                return val.slice(0, 3) + "..."
                            } else {
                                return val
                            }
                        }
                    }
                }
            },
        }]
    }
    return options
}