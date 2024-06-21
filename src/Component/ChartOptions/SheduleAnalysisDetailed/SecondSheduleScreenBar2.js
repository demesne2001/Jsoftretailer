import React from 'react'

export default function SecondSheduleScreenBar2(xAxis, yAxis, contextData, id) {
    const options = {
        chart: {
            type: 'bar',
            height: 350,
            stacked: true,
            toolbar: {
                show: true
            },
            zoom: {
                enabled: true
            },
            events: {
                dataPointSelection: (event, chartContex, config) => {
                  if (id[config.dataPointIndex] === null) {
                    contextData.setbillState({ ...contextData.billstate, ['ScheduleID']: '-' })
                  }
                  else {
                    
                    contextData.setbillState({ ...contextData.billstate, ['ScheduleID']: id[config.dataPointIndex].toString() })
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
            }
        },
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        plotOptions: {
            bar: {
                horizontal: false,
                borderRadius: 10,
                borderRadiusApplication: 'end', // 'around', 'end'
                borderRadiusWhenStacked: 'last', // 'all', 'last'
                dataLabels: {
                    total: {
                        enabled: false,
                        style: {
                            fontSize: '13px',
                            fontWeight: 900
                        }
                    }
                }
            },
        },
        xaxis: {
            categories: xAxis,
            labels: {
                formatter: function (val) {
                    if (typeof (val) === 'string') {
                        return val.slice(0, 5) + '...'
                    }
                }
            }
        },
        legend: {
            position: 'right',
            offsetY: 40
        },
        fill: {
            opacity: 1
        }
    };
    const series = [{
        name: 'minutes',
        data: yAxis[0]
    }];
    return [options, series];
}

