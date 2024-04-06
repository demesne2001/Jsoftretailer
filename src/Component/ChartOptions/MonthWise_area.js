export function MonthWise_area(name) {
    const option = {
        chart: {
            type: 'area',
            height: 350,
            zoom: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          plotOptions: {
            area: {
              fillTo: 'end',
            },
          },
          tooltip:{
            x: {
                show: true,
               
              },
              y: {
                show: true,
                formatter: function(val) {
                  return val
                }
              },
        },
          stroke: {
            curve: 'smooth',
            show: true,
            width: 2,
            colors: ['transparent']
          },
    
          fill: {
            opacity: 0.1,
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: "vertical",
              shadeIntensity: 0.2,
              // gradientToColors: undefined,
              inverseColors: true,
              opacityFrom: 1.5,
              opacityTo: 0.6,
              // stops: [0, 50, 100],
              // colorStops: []
            },
          },
          xaxis:{
            categories:name,
            labels:{
               
            }
        },
    
          labels: name,
    
          grid: {
            yaxis: {
              lines: {
                offsetX: -30
              }
            },
            padding: {
              left: 20
            }
          },
    
          yaxis: {
            tickAmount: 4,
            floating: false,
    
            labels: {
              style: {
                colors: '#8e8da4',
              },
              offsetY: -7,
              offsetX: 0,
            },
    
            // axisBorder: {
            //   show: false,
            // },
            // axisTicks: {
            //   show: false
            // }
          },
    
          legend: {
            show: false,
            horizontalAlign: 'left'
          },
          
          responsive: [{
            breakpoint: 593,
            options: {
                
                xaxis:{
                    labels:{
                        formatter: function (val) {
                            if (val !== undefined) {
                                if (val.length > 3) {
                                    return val.slice(0, 3) + "..."
                                } else {
                                    return val
                                }
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
    return option
}