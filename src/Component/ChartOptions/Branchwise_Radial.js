
export function BranchWise_Radial(name){
const options = {
    dataLabels: {
        enabled: false,
        formatter: function (val, opts) {
            return (val.toFixed(2)) + '%'
        },
        style: {
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 200,
            colors: ['#fff']
        },
        background: {
            enabled: false,
        }
    },
    tooltip: {
        enabled: true,
        followCursor: true,
    },
    chart: {
        type: 'donut',
        animations: {
            enabled: true,
            easing: 'easein',
        },
    },

    stroke: {
        width: 0,
    },

    fill: {
        type: 'solid',
        opacity: 2
    },

    plotOptions: {
        radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
                size: '10%',
                // background: 'transparent',
                // image: undefined,
            },
            show: false,
            dataLabels: {
                name: {
                    show: false,
                },
                value: {
                    show: false,
                }
            }
        }
    },

    // colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e', '#f48024', '#69d2e7'],
    labels: name,
    legend: {
        show: true,
        floating: true,
        fontSize: '15px',
        position: 'left',
        offsetX: 110,
        offsetY: 7,
        labels: {
            useSeriesColors: true,
        },
        markers: {
            width: 0,
            height: 0
        },
        formatter: function (val) {
            if (val.length > 7) {
                return val.slice(0, 6) + "..."
            } else {
                return val
            }
        }
        
    },
    responsive: [
        {
            breakpoint: 1801,
            options: {
                legend: {
                    show: true,
                    floating: true,
                    fontSize: '15px',
                    position: 'left',
                    offsetX: 70,
                    offsetY: 7,
                    labels: {
                        useSeriesColors: true,
                    },
                    markers: {
                        width: 0,
                        height: 0
                    }
                },
            },
        },
        {
            breakpoint: 1706,
            options: {
                legend: {
                    show: true,
                    floating: true,
                    fontSize: '15px',
                    position: 'left',
                    offsetX: 20,
                    offsetY: 7,
                    labels: {
                        useSeriesColors: true,
                    },
                    markers: {
                        width: 0,
                        height: 0
                    }
                },
            },
        },
        {
            breakpoint: 768,
            options: {
                legend: {
                    show: true,
                    floating: true,
                    fontSize: '15px',
                    position: 'left',
                    offsetX: 200,
                    offsetY: 7,
                    labels: {
                        useSeriesColors: true,
                    },
                    markers: {
                        width: 0,
                        height: 0
                    }
                },
            },
        },
        {
            breakpoint: 732,
            options: {
                legend: {
                    show: true,
                    floating: true,
                    fontSize: '15px',
                    position: 'left',
                    offsetX: 150,
                    offsetY: 7,
                    labels: {
                        useSeriesColors: true,
                    },
                    markers: {
                        width: 0,
                        height: 0
                    }
                },
            },
        },
        {
            breakpoint: 593,
            options: {
                legend: {
                    show: true,
                    floating: true,
                    fontSize: '15px',
                    position: 'left',
                    offsetX: 100,
                    offsetY: 7,
                    labels: {
                        useSeriesColors: true,
                    },
                    markers: {
                        width: 0,
                        height: 0
                    }
                },
            },
        },
        {
            breakpoint: 529,
            options: {
                legend: {
                    show: true,
                    floating: true,
                    fontSize: '15px',
                    position: 'left',
                    offsetX: 50,
                    offsetY: 7,
                    labels: {
                        useSeriesColors: true,
                    },
                    markers: {
                        width: 0,
                        height: 0
                    }
                },
            },
        },
        {
            breakpoint: 402,
            options: {
                legend: {
                    show: true,
                    floating: true,
                    fontSize: '15px',
                    position: 'left',
                    offsetX: 0,
                    offsetY: 7,
                    labels: {
                        useSeriesColors: true,
                    },
                    markers: {
                        width: 0,
                        height: 0
                    }
                },
            },
        },
]

}
return options
}
