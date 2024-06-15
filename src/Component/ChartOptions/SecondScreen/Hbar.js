import { useContext } from "react"

export function secondScreen_hbar(name, contexData, id, filterKey) {
    function getMonthNumberFromName(monthName) {
        return new Date(`${monthName} 1, 2022`).getMonth() + 1;
    }
    const options = {
        chart: {
            type: 'bar',
            height: 350,
            events: {
                dataPointSelection: (event, chartContex, config) => {
                    console.log(config,"nameqwewe");
                    // contexData.setDefaultChart({...contexData.defaultchart,["strBranch"] : config.w.config.xaxis.categories[config.dataPointIndex] })
                    if (filterKey === 'strMonth') {
                        if (id[config.dataPointIndex] === null) {
                            // console.log(id[config.dataPointIndex], "idselect");

                            contexData.setDefaultChart({ ...contexData.defaultchart, [filterKey]: '-' })
                        }
                        else {
                            console.log( getMonthNumberFromName(id[config.dataPointIndex]),"ananana");
                            contexData.setDefaultChart({ ...contexData.defaultchart, [filterKey]: getMonthNumberFromName(id[config.dataPointIndex]).toString() })
                            contexData.setdefaultchartFilterName(name[config.dataPointIndex]);
                        }
                    } else {
                        if (id[config.dataPointIndex] === null) {
                            // console.log(id[config.dataPointIndex], "idselect");
                            contexData.setDefaultChart({ ...contexData.defaultchart, [filterKey]: '-' })
                        }
                        else {
                            console.log(config,"nameqwewe");
                            contexData.setDefaultChart({ ...contexData.defaultchart, [filterKey]: id[config.dataPointIndex].toString() })
                            contexData.setdefaultchartFilterName(name[config.dataPointIndex]);
                        }
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
                        labels: {
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