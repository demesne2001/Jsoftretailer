export function StateWise_SemiDonut(name, state, column) {
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

        tooltip: {
            enabled: false,
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

        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 90,
                offsetY: 80,
                labels: {
                    show: false,
                },
                dataLabels: {
                    enabled: false,
                    format: 'scale'
                },

                donut: {
                    labels: {
                        show: true,

                        name: {

                        },
                        value: {
                            offsetY: -5,
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            formatter: function (val) {
                                if (column === 'Prc') {
                                    return val.toString() + "%"
                                } else {
                                    return val
                                }
                            },
                        }
                    }
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
                    width: 380
                },
                legend: {
                    position: 'bottom',
                    offsetX: -50,
                    itemMargin: {
                        horizontal: 5,
                        vertical: 3
                    },
                },
                plotOptions: {
                    pie: {
                        startAngle: -90,
                        endAngle: 90,
                        offsetY: 70,
                        offsetX: -15,
                        dataLabels: {
                            format: 'scale'
                        }

                    }

                }
            }
        },
        {
            breakpoint: 426,
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
                    position: 'bottom',
                    offsetX: 40,
                    itemMargin: {
                        horizontal: 5,
                        vertical: 3
                    },
                },
                plotOptions: {
                    pie: {
                        startAngle: -90,
                        endAngle: 90,
                        offsetY: 70,
                        offsetX: 30,
                        dataLabels: {
                            format: 'scale'
                        }

                    }

                }
            }
        },
        {
            breakpoint: 376,
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
                    position: 'bottom',
                    offsetX: 0,
                    itemMargin: {
                        horizontal: 5,
                        vertical: 3
                    },
                },
                plotOptions: {
                    pie: {
                        startAngle: -90,
                        endAngle: 90,
                        offsetY: 70,
                        offsetX: 10,
                        dataLabels: {
                            format: 'scale',


                        },
                        donut: {
                            labels: {
                                show: true,

                                name: {
                                    fontSize: '13px',
                                    // color:"black"
                                },
                                value: {
                                    offsetY: -5,
                                    fontSize: '12px',
                                    fontFamily: 'Helvetica, Arial, sans-serif',
                                    fontWeight: 600,
                                }
                            }
                        }

                    }

                }
            }
        }
        ]
    }
    return options
} 