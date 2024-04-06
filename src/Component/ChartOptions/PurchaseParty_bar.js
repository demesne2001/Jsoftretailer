export function PurchaseParty_bar(name) {
    const options = {
        chart: {
            height: 350,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: '50%',
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
          tooltip:{

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
        },
    
          xaxis: {
            labels: {
              type: 'numeric',
              stepSize: 0
            },
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
                yaxis: {
                    labels: {
                        show: true,
                        formatter: function(val) {
                            
                          return ((val/1000).toFixed(0)).toString() + "KG"
                        
                        }
                       
                    }
                }
            },
        }]
    }
    return options
}

