import React, { useEffect } from 'react'

export default function TargetAndAchievedSeriesOptions(xAxis, yAxis, unit) {
    let unitofTooltip = unit
    useEffect(()=>{

    },[unitofTooltip]);
  
    function formateSeriesData(xAxis, yAxis) {
        var tempseries = []
        for (let i = 0; i < xAxis.length; i++) {
            tempseries.push({ x: xAxis[i], y: yAxis[0][i], goals: [{ name: 'TargetWt', value: yAxis[1][i], strokeHeight: 5, strokeColor: '#775DD0' }] });
        }
        return tempseries
    }

    const option = {
        chart: {
            height: 350,
            type: 'bar'
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
