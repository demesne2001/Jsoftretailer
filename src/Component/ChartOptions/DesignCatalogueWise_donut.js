export function DesignCatalogueWise_donut(name) {

  const option ={
    dataLabels: {
        enabled: true,
    },
    tooltip: {
        enabled: false,
        followCursor: true,
    },
    colors: ['#51bde4','#265cb9','#00e396'],

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
    // const option = {
    //     legend: {
    //         show: true,
    //         position:'bottom'
    //       },
    //       chart: {
    //         animations: {
    //           enabled: true,
    //           easing: 'easeinout',
    //           speed: 800,
    //           animateGradually: {
    //               enabled: true,
    //               delay: 100
    //           },
    //           dynamicAnimation: {
    //               enabled: true,
    //               speed: 300
    //           }
    //       },
    //         toolbar: {
    //           show: true,
    //           offsetX: 0,
    //           offsetY: 0,
    //           tools: {
    //             download: true,
    //           },
    
    //         },
    //         width: 380,
    //         type: 'donut',
    //         // dropShadow: {
    //         //   enabled: true,
    //         //   color: '#111',
    //         //   top: -1,
    //         //   left: 3,
    //         //   blur: 3,
    //         //   opacity: 0.2
    //         // }
    //       },
    //       stroke: {
    //         width: 0,
    //       },
    //       plotOptions: {
    //         pie: {
    //           donut: {
    //             labels: {
    //               show: true,
    //               total: {
    //                 showAlways: true,
    //                 show: true
    //               }
    //             }
    //           }
    //         }
    //       },
    //       labels: name,
    //       dataLabels: {
    //         dropShadow: {
    //           blur: 3,
    //           opacity: 0.8
    //         }
    //       },
    //       fill: {
    //         type: 'pattern',
    //         opacity: 1,
    //         pattern: {
    //           enabled: true,
    //           style: ['slantedLines'],
    //         },
    //       },

    //       total: {
    //         show: false,
    //         label: 'Total',
    //         formatter: function (val) {
    //           console.log('VALUE',val)
    //           return val 
    //         }
    //       },
    //       // states: {
    //       //   hover: {
    //       //     filter: 'none'
    //       //   }
    //       // },
    //       theme: {
    //         palette: 'palette2'
    //       },
          
    //       responsive: [{
    //                 breakpoint: 480,
    //                 options: {
    //                     chart: {
    //                         width: 300
    //                     },
    //                     legend: {
    //                         position: 'bottom'
    
    //                     }
    //                 }
    //             }],
         
    // }
    // return option;
}