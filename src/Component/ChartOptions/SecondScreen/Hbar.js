import { useContext } from "react"


export function secondScreen_hbar(name, contexData, id, filterKey) {


    const options = {
        chart: {
            type: 'bar',
            height: 350,
            events: {
                dataPointSelection: (event, chartContex, config) => {


                    // contexData.setDefaultChart({...contexData.defaultchart,["strBranch"] : config.w.config.xaxis.categories[config.dataPointIndex] })

                    if (id[config.dataPointIndex] === null) {

                        contexData.setDefaultChart({ ...contexData.defaultchart, [filterKey]: '-' })
                    }
                    else {

                        contexData.setDefaultChart({ ...contexData.defaultchart, [filterKey]: id[config.dataPointIndex].toString() })
                    }









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
        yaxis: {
            labels: {
                show: true,
                formatter: function (val) {
                    if (val.length > 7) {
                        return val.slice(0, 6) + "..."
                    } else {
                        return val
                    }
                }
            }
        },
        tooltip: {
            x: {
                formatter: function (val) {
                    return val
                }
            },
            y: {
                formatter: function (val) {
                    return val
                }
            }
        },

        responsive: [
            {
                breakpoint: 850,
                options: {
                    legend: {
                        position: "bottom"
                    }
                },
                breakpoint: 415,
                options: {
                    
                    xaxis: {
                        categories: name,
                        labels:{
                            style: {
                                fontSize: "8px",
    
                            }
                        
                        }
                        

                    },
                }
            },
        ],
    }
    return options
}