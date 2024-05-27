import React from 'react'

export default function SheduleClientDetailsSecondScreen(xAxis, yAxis, contextData, id, chartid) {
  let option = {
    chart: {
      type: 'bar',
      height: 350,
      stacked: true,
      events: {
        dataPointSelection: (event, chartContex, config) => {

          if (id[config.dataPointIndex] === null) {
            contextData.SetdetailedState({ ...contextData.detailedstate, ['TravellingTeamID']: '-' })
          }
          else {
            if (chartid === 14) {
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
      dropShadow: {
        enabled: true,
        blur: 1,
        opacity: 0.25
      }
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '60%',
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2,
    },
    xaxis: {
      categories: xAxis,
    },
    yaxis: {
      title: {
        text: undefined
      },

      labels: {
        formatter: function (val) {
          if (typeof (val) === 'string') {
            return val.slice(0, 6) + '...'
          }
        }
      },
    },
    tooltip: {
      shared: false,
      x: {
        formatter: function (val) {
          return val
        }
      },
      y: {
        marker: {
          show: true,
        },
        formatter: function (val, config) {
          
          return "TotalParty : " + yAxis[0][config['dataPointIndex']].toString() + "<br/>VistedParty : " + yAxis[1][config['dataPointIndex']].toString() + "<br/>Prc : " + yAxis[2][config['dataPointIndex']].toString() + "%"
        },
        title: {
          formatter: (seriesName) => "",
        },
      }
    },
    fill: {
      type: 'pattern',
      opacity: 1,
      pattern: {
        style: ['circles', 'slantedLines', 'verticalLines', 'horizontalLines'], // string or array of strings

      }
    },
    states: {
      hover: {
        filter: 'none'
      }
    },
    legend: {
      position: 'bottom',
      offsetY: 40
    }
  }
  const series = [{
    name: 'TotalParty',
    data: yAxis[0]
  }, {
    name: 'VisitedParty',
    data: yAxis[1]
  }];
  if (chartid === 14) {
    option = { ...option, plotOptions: { bar: { ['horizontal']: false } } }
  }
  return [option, series]
}
