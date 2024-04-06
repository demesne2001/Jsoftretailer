export function YearWise_semiDonut(name) {
    const option ={
        dataLabels: {
            enabled: false,
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
            }
          }
        },
        colors: ['#58a3b2'],

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