export function MonthWise_Bar(name) {
    const option = {
         // colors:['#00b150','#002060'],
      chart: {
        toolbar: {
          show: true,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: true,
          },

        },
        type: 'bar',
        height: 350,

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

      plotOptions: {
        bar: {
          distributed: true,
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded'
        },
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: name,
      },
      yaxis: {
        title: {
          text: 'Thousands'
        }
      },
      fill: {
        opacity: 1,
        type: 'solid',
      },

      legend: {
        show: true,
        horizontalAlign: 'center'
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