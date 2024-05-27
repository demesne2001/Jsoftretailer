import { color } from 'echarts';
import React from 'react'

export default function TargetAndAchievedDetailScreenChart(xAxis, yAxis, contextData, id, chartid, unit) {

    const series = [
        {
            name: 'TargetWt',
            type: 'column',
            data: yAxis[1]
        },
        {
            name: 'achievedWt',
            type: 'line',
            data: yAxis[0]
        },
        {
            name: 'Prc',
            type: '',
            data: yAxis[2]
        }
    ];

    const options = {
        chart: {
            height: 350,
            type: 'line',
            events: {
                dataPointSelection: (event, chartContex, config) => {

                    if (id[config.dataPointIndex] === null) {
                        contextData.setbillState({ ...contextData.billstate, ['ScheduleID']: '-' })
                    }
                    else {
                        setTimeout(() => {
                            contextData.setbillState({ ...contextData.billstate, ['ScheduleID']: id[config.dataPointIndex].toString() })
                        }, 1);
                    }
                }
            },
        },
        stroke: {
            width: [4, 4, 0]
        },

        xaxis: {
            categories: xAxis,
            labels: {
                formatter: function (val) {
                    if (typeof (val) === 'string') {
                        return val.slice(0, 5) + '...';
                    }
                }
            }
        },
        yaxis: [
            {
                seriesName: 'TargetWt',
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#008FFB'
                },
                labels: {
                    style: {
                        colors: '#008FFB',
                    },
                    formatter: function (val, config) {
                        return val.toFixed(0)
                    }
                },

            },
            {
                seriesName: 'achievedWt',
                opposite: true,
                axisTicks: {
                    show: true,
                },
                axisBorder: {
                    show: true,
                    color: '#04d8a5'
                },
                labels: {
                    style: {
                        colors: '#04d8a5',
                    },
                    formatter: function (val, config) {
                        return val.toFixed(0)
                    }
                },

            },
        ],
        legend: {
            horizontalAlign: 'center',
            offsetX: 40
        },
        tooltip: {
            x: {
                formatter: function (val, config) {
                    return xAxis[config['dataPointIndex']]
                }
            },
            y: {
                formatter: function (val, config) {
                    if (config['seriesIndex'] === 2) {
                        console.log(val);
                        return (val.toFixed(0)).toString() + "%"
                    } else {
                        return (val).toString() + " " + unit
                    }

                }
            }
        },
    };


    return [options, series]
}
