export function DesignCatalogueWise_donut(name) {
    const option = {
        legend: {
            show: true,
            position:'bottom'
          },
          chart: {
            animations: {
              enabled: true,
              easing: 'easeinout',
              speed: 800,
              animateGradually: {
                  enabled: true,
                  delay: 100
              },
              dynamicAnimation: {
                  enabled: true,
                  speed: 300
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
            width: 380,
            type: 'donut',
            // dropShadow: {
            //   enabled: true,
            //   color: '#111',
            //   top: -1,
            //   left: 3,
            //   blur: 3,
            //   opacity: 0.2
            // }
          },
          stroke: {
            width: 0,
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  total: {
                    showAlways: true,
                    show: true
                  }
                }
              }
            }
          },
          labels: name,
          dataLabels: {
            dropShadow: {
              blur: 3,
              opacity: 0.8
            }
          },
          fill: {
            type: 'pattern',
            opacity: 1,
            pattern: {
              enabled: true,
              style: ['slantedLines'],
            },
          },
          // states: {
          //   hover: {
          //     filter: 'none'
          //   }
          // },
          theme: {
            palette: 'palette2'
          },
          responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 300
                        },
                        legend: {
                            position: 'bottom'
    
                        }
                    }
                }]
    }
    return option;
}