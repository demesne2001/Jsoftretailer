import React from 'react'

export default function TargetAndArchievedSecondScreen(xAxis, yAxis, contextData, id, chartid) {


    function formateSeriesData(xAxis, yAxis) {
        var tempseries = []
        for (let i = 0; i < xAxis.length; i++) {
            tempseries.push({ x: xAxis[i], y: yAxis[0][i], goals: [{ name: 'TargetWt', value: yAxis[1][i], strokeHeight: 5, strokeColor: '#775DD0' }] });
        }
        return tempseries
    }
    let option = {}
    option = {
        chart: {
            height: 350,
            type: 'bar',
            events: {
                dataPointSelection: (event, chartContex, config) => {
                    if (id[config.dataPointIndex] === null) {
                        contextData.SetdetailedState({ ...contextData.detailedstate, ['TravellingTeamID']: '-' })
                    }
                    else {
                        if (chartid === 11) {
                            if (id[config.dataPointIndex] === null) {
                                contextData.setbillState({ ...contextData.billstate, ['ScheduleID']: '-' })
                            }
                            else {
                                contextData.setbillState({ ...contextData.billstate, ['ScheduleID']: id[config.dataPointIndex].toString() })
                            }
                        } else {
                            contextData.SetdetailedState({ ...contextData.detailedstate, ['TravellingTeamID']: id[config.dataPointIndex].toString() })
                        }
                    }
                }
            },
        },

        tooltip: {
            x: {
                show: true,
                formatter: function (val) {
                    return val
                }
            },
            y:{
                show: true,
                formatter: function (val) {
                    return val
                }
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '60%'
            }
        },
        colors: ['#00E396'],
        dataLabels: {
            enabled: false
        },

        legend: {
            show: true,
            showForSingleSeries: true,
            customLegendItems: ['Actual', 'Expected'],
            markers: {
                fillColors: ['#00E396', '#775DD0']
            }
        },
        xaxis: {
            labels: {
                formatter: function (val) {
                    if (typeof (val) === 'string') {
                        return val.slice(0, 6) + '...'
                    }
                }
            }
        }
    }


    const series = [
        {
            name: 'achievedWt',
            data: formateSeriesData(xAxis, yAxis)
        }
    ]
    return [option, series]
}
