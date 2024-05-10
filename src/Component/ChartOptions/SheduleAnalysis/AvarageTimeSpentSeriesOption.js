import React from 'react'

export default function AvarageTimeSpentSeriesOption(xAxis, yAxis) {
    const option = {
        chart: {
            type: 'bar',
            height: 350
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
            categories: xAxis
        }
    }

    const series = [{
        data: yAxis[0]
    }]



    return [option, series]
}
