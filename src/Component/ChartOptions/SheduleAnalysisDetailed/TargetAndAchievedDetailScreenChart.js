import { color } from 'echarts';
import React from 'react'

export default function TargetAndAchievedDetailScreenChart(xAxis, yAxis, contextData, id, chartid) {
    console.log(xAxis, yAxis, id);
    const series = [{
        name: 'achievedWt',
        type: 'column',
        data: yAxis[0]
    }, {
        name: 'TargetWt',
        type: 'line',
        data: yAxis[1]
    }];

    const options = {
        chart: {
            height: 350,
            type: 'line',
            stacked: false,
            events: {
                dataPointSelection: (event, chartContex, config) => {
                    console.log(id, "idddd");
                    if (id[config.dataPointIndex] === null) {
                        contextData.setbillState({ ...contextData.billstate, ['ScheduleID']: '-' })
                    }
                    else {
                        setTimeout(() => {
                            contextData.setbillState({ ...contextData.billstate, ['ScheduleID']: id[config.dataPointIndex].toString() })
                        }, 10);
                    }
                }
            },
        },
        dataLabels: {
            enabled: false
        },
        stroke: {
            width: [1, 4]
        },

        xaxis: {
            categories: xAxis,
        },
        yaxis: [
            {
                min: 0,
                seriesName: 'achievedWt',
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
                    }
                },
                tooltip: {
                    enabled: true
                }
            },
            {
                seriesName: 'TargetWt',
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
                },
                tooltip: {
                    enabled: true
                }
            },
        ],
        tooltip: {
            fixed: {
                enabled: true,
                position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                offsetY: 30,
                offsetX: 60
            },
        },
        legend: {
            horizontalAlign: 'left',
            offsetX: 40
        }
    };


    return [options, series]
}
