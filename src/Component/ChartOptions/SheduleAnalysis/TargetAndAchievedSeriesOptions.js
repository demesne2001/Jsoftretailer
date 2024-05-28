import { List } from 'echarts';
import React, { useEffect } from 'react'
import { useNavigationType } from 'react-router-dom';

export default function TargetAndAchievedSeriesOptions(xAxis, yAxis, unit) {
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
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1],
            formatter:function(val) { 
                let temp = ""
                for (let i = 0; i  < window.innerWidth/15; i++) {
                    temp += '-'
                    
                }         
                return temp
            },
            style: {
                fontSize: '2px',
                fontWeight: 'bold',
            },
            background: {
                enabled: true,
                foreColor: '#775dd0',
                padding: 7,
                borderRadius: 0,
                borderWidth: 1,
                borderColor: '#775dd0',
                opacity: 0.9,
                dropShadow: {
                  enabled: false,
                  top: 1,
                  left: 1,
                  blur: 1,
                  color: '#000',
                  opacity: 0.45
                }
              },
        },
        colors:['#26e7a6','#775dd0'],
        stroke: {
            width: [4, 0, 0]
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
                    show: false,
                },
                axisBorder: {
                    show: false,
                    color: '#26e7a6'
                },
                labels: {
                    style: {
                        colors: '#000',
                    }, 
                    formatter:function(val) {
                        return val.toFixed(0)
                    }
                   
                },

            },
           
        ],
        legend: {
            horizontalAlign: 'center',
            offsetX: 40,
            markers: {
                width: [10,10,10], // hides first marker
              }
        },
        tooltip: {
            x: {
                formatter: function (val, config) {
                    return xAxis[config['dataPointIndex']]
                }
            },
            y: {
                formatter: function(val,config) {
                    if (config['seriesIndex'] === 2 && val!== undefined) {
                        console.log(val);
                        return (val.toFixed(0)).toString() + "%"
                    } else {
                        if (val !== undefined) {
                            return (val).toString()+ " " + unit
                        }
                    }
                    
                }
            }
        },
      
    };
    return [options, series]
}
