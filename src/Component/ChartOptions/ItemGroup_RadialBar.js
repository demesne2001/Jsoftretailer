export function ItemGroup_RadialBar(name) {
    const options = {
        chart: {
            height: 350,
            type: 'radialBar',
            toolbar: {
              show: true,
              offsetX: 0,
              offsetY: 0,
              tools: {
                download: true,
              },
            },
    
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
          colors: [
                    '#3B93A5',
                    '#F7B844',
                ],
    
    
          plotOptions: {
            radialBar: {
              startAngle: 0,
              endAngle: 270,
              dataLabels: {
                name: {
                  fontSize: '22px',
                },
    
                value: {
                  formatter: function (val) {
                    return parseInt(val) + ('%');
                  },
                  colors: ['#111'],
                  fontSize: '16px',
                  show: true
                },
                total: {
                  show: true,
                  label: 'Total',
                  // formatter: function (w) {
                  //   return 249  
                  // }
                }
              }
            }
          },
          labels: name,
    }
    return options
}