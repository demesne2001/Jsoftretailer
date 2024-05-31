export function YearWise_Donut(name, column) {
    const option = {
        dataLabels: {
            enabled: true,


        },
        tooltip: {
            enabled: false,
            followCursor: true,
        },
        colors: ['#51bde4', '#265cb9', '#00e396'],

        chart: {
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
            toolbar: {
                show: true,
                offsetX: 0,
                offsetY: 0,
                tools: {
                    download: true,
                },

            },
            type: 'donut',
        },
        legend: {
            show: true,
            floating: false,
            fontSize: '13px',
            position: 'bottom',
            offsetX: 0,
            offsetY: 0,
            labels: {
                useSeriesColors: true,
            },
            markers: {
                width: 12,
                height: 12
            }
        },

        labels: name,

        plotOptions: {
            pie: {
                startAngle: 0,
                endAngle: 360,
                customScale: 0.9,
                offsetY: 20,
                donut: {
                    labels: {
                        offsetY: 0,
                        startAngle: 0,
                        endAngle: 360,
                        hollow: {
                            size: '10%',
                        },
                        show: true,
                        name: {

                        },
                        value: {
                            formatter: function (val) {
                                if (column === 'Prc') {

                                    return val.toString() + "%"
                                } else {
                                    return val
                                }
                            },
                        }
                    },
                    total: {
                        show: true,
                        label: 'Total',
                        formatter: function (w) {
                            if (column === 'Prc') {

                                return (w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0)).toString() + "%"
                            } else {
                                return w.globals.seriesTotals.reduce((a, b) => {
                                    return a + b
                                }, 0)
                            }

                        }
                    }
                }
            }
        }
    }

    return option
}