export function DesignCatalogueWise_bar(name) {
    console.log(name,"hii");
    const option = {
        legend: {
            show: false
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
            height: 350,
            type: 'bar',
            dropShadow: {
              enabled: false,
              color: '#111',
              top: 0,
              left: 0,
              blur: 0,
              opacity: 0
            }
          },
          plotOptions: {
            bar: {
              horizontal: true,
              borderRadius: 10,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          dataLabels: {
            enabled: false,
            formatter: function (val) {
              return val;
            },
            offsetY: 20,
            style: {
              fontSize: '12px',
              colors: ["#304758"]
            }
          },
          fill: {
            type: 'none',
            opacity: 1,
            pattern: {
              enabled: false,
            },
          },
    
          xaxis: {
            categories: name,
            position: 'bottom',
            axisBorder: {
              show: false
            },
            axisTicks: {
              show: true
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
            }
          },
          yaxis: {
            axisBorder: {
              show: true
            },
            axisTicks: {
              show: false,
            },
            labels: {
              show: true,
              formatter: function (val) {
                return val;
              }
            }
          },
    
          theme: {
            palette: 'none'
          },
    
          annotations: {
            // points: imagearr,
            tooltip: {
              enabled: true,
            }
          },
          responsive: [{
            breakpoint: 593,
            options: {
                
                xaxis:{
                  labels: {
                    show: true,
                    formatter: function(val) {
                        
                      return ((val/1000).toFixed(0)).toString()
                    
                    }
                   
                },
                  
                yaxis: {
                  labels:{
                    formatter: function (val) {
                      if (val.length > 3) {
                          return val.slice(0, 3) + "..."
                      } else {
                          return val
                      }
                  }
                  }
              },
                }
            },
        }]
    }   
    return option;
}