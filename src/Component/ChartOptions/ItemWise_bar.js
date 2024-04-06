export function ItemWise_bar(name) {
    const options = {
        chart: {
            offsetX: 10,
            height: 350,
            type: 'bar',
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
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 0,
                columnWidth: '50%',
            }
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: 2
        },

        grid: {
            row: {
                colors: ['#fff', '#f2f2f2']
            }
        },
        xaxis: {
            labels: {
                show: true,
                formatter: function (val) {
                    if (val.length > 7) {
                        return val.slice(0, 6) + "..."
                    } else {
                        return val
                    }
                }
            },
            categories: name,
            //   tickPlacement: 'on'
        },
        yaxis: {
            title: {
                text: '',
            },

        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                type: "horizontal",
                shadeIntensity: 0.25,
                gradientToColors: undefined,
                inverseColors: true,
                opacityFrom: 0.85,
                opacityTo: 0.85,
                stops: [50, 0, 100]
            },
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