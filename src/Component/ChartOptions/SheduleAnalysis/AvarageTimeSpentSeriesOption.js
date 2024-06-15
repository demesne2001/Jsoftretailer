import React from 'react'

export default function AvarageTimeSpentSeriesOption(xAxis, yAxis, contextData,chartid) {
    const option = {
        chart: {
            type: 'bar',
            height: 350,
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                borderRadiusApplication: 'end',
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: xAxis,
            
        },
        yaxis: {
            labels: {
                formatter: function (val) {
                    if (typeof (val) === 'string') {
                        return val.slice(0, 6) + '...'
                    }
                }
            }
        },
        tooltip: {
            x:{
                formatter: function(val){
                    return val
                }
            },
            y: {
                title: {
                    formatter: (seriesName) => seriesName + " :",
                },
                formatter: function(val){
                    return val
                }
            }
        }
    }
    let series;
    if (chartid === 2) {
        series = [{
            name: 'minutes',
            data: yAxis[0]
        }]
    } else {
        series = [{
            name: 'Avg days',
            data: yAxis[0]
        }]
    }



    return [option, series]
}
