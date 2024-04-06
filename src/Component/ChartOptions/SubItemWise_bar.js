export function SubItemWise_bar(name) {
    const options = {
        chart: {
            height: 350,
            type: 'bar',
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
              },
              sparkline: {
                enabled: true
              },
            }
          },
          plotOptions: {
            bar: {
              distributed: true,
              borderRadius: '15',
              borderRadiusApplication: 'end',
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            },
          },
    
          colors: [
            '#3B93A5',
            '#F7B844',
            '#ADD8C7',
            '#EC3C65',
            '#CDD7B6',
            '#C1F666',
            '#D43F97',
            '#1E5D8C',
            '#421243',
            '#7F94B0',
          ],
          // colors: ['#07b1f7'],
          dataLabels: {
            enabled: false,
            formatter: function (val) {
              return val;
            },
            offsetY: -35,
            style: {
              fontSize: '14px',
              colors: ["#87CEEB"],
              // colors: ['#b55dc4', '#d4d4d4', '#e86867', '#78c37b', '#ffd142']
            },
            background: {
              enabled: true,
              foreColor: '#304758',
              borderRadius: 10,
              padding: 6,
              opacity: 1,
              borderWidth: 0,
              borderColor: ''
            }
          },
          tooltip: {
            x: {
              show: true,
              formatter: function(val) {
                return val
              }
            },
            y: {
              show: true,
              formatter: function(val) {
                return val
              }
            },
            enabled: true,
          },
    
          xaxis: {
            categories: name,
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
    
          },
          yaxis: {
            axisBorder: {
              show: false
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