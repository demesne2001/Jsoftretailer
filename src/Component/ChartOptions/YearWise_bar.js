export function YearWise_bar(name) {
    const option ={
        chart: {
            height: 350,
            type: 'bar'
        },
        plotOptions: {
            bar: {
                columnWidth: '60%'
            }
        },
        xaxis: {
            categories: name,
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
        colors: ['#00E396'],
        dataLabels: {
            enabled: false
        },
        legend: {
            show: false
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