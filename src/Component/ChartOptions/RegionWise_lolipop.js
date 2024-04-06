export function RegionWise_lolipop(name) {
    const options = {
        chart: {
            height: 350,
            type: 'bar',
        },
        plotOptions: {
            bar: {
                columnWidth: '5%',
                borderRadius: 1,
                dataLabels: {
                    position: 'top', // top, center, bottom
                },
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
        colors: '#0099ff',

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
            tooltip: {
                enabled: true,
            }
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
               
            }
        }]
    }
    return options
}