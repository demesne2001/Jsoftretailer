export function YearWise_semiDonut(name, column) {
    const option = {
        dataLabels: {
            enabled: true,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    if (column === 'Prc') {
                        return val.toString() + "%"
                    } else {
                        return val
                    }
                }
            }
        },
        chart: {
            type: 'donut',
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 1000,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 1000
                }
            },
        },
        plotOptions: {
            pie: {
                startAngle: -90,
                endAngle: 90,
                offsetY: 80,
                dataLabels: {
                    format: 'scale'
                },
                donut: {
                    labels: {
                        show: true,

                     
                        name: {
                            fontSize: '20px',
                            // color:"black"
                        },
                        value: {
                            offsetY: -5,
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            formatter: function (val) {
                                if (column === 'Prc') {
                                    // console.log(column, "column");
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
        colors: ['#51bde4', '#265cb9', '#00e396'],

        legend: {
            show: false,
            floating: true,
            fontSize: '13px',
            position: 'left',
            offsetX: 140,
            offsetY: 3,
            labels: {
                useSeriesColors: true,
            },
            markers: {
                width: 0,
                height: 0
            },

        },

        labels: name,

    }
    return option
}