export function YearWise_Donut(name) {
    const option ={
        dataLabels: {
            enabled: true,
        },
        tooltip: {
            enabled: true,
            followCursor: true,
        },
        colors: ['#51bde4'],
    
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

                        }
                    }
                }
            }
        }
      }

    return option
}