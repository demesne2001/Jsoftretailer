import { useContext } from "react"


export function secondScreen_hbar(name , contexData , id , filterKey){
    
    


    const options = {
        chart: {
            type: 'bar',
            height: 350,
            events:{
                dataPointSelection:(event,chartContex,config)=>{
                   
                    
                    // contexData.setDefaultChart({...contexData.defaultchart,["strBranch"] : config.w.config.xaxis.categories[config.dataPointIndex] })
                //   console.log(id[config.dataPointIndex])
                  if(id[config.dataPointIndex] === null){
                    // console.log('INSIDE NULL')
                    contexData.setDefaultChart({...contexData.defaultchart,[filterKey] : '-' })
                  }
                  else{
                    contexData.setDefaultChart({...contexData.defaultchart,[filterKey] : id[config.dataPointIndex].toString() })
                  }

                   
                   
                    
                    // console.log(config.w.config.xaxis.categories[config.dataPointIndex])
                    // console.log('CONTEX DATA',contexData.setDefaultChart)

                    // console.log(config.w.config.series[0].data[config.dataPointIndex],config.w.config.xaxis.categories[config.dataPointIndex])
    
                }
              }
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: name,
        },
        
        responsive: [
            {
                breakpoint: 850,
                options: {
                    legend: {
                        position: "bottom"
                    }
                }
            }
        ],
    }
    return options
}