
import React from 'react'

export default function AvarageTimeSpentSecondScreen(xAxis, yAxis, contextData, id, chartid) {

  const option = {
    chart: {
      type: 'bar',
      height: 350,
      events: {
        dataPointSelection: (event, chartContex, config) => {
          console.log("confifff",config);
          if (id[config.dataPointIndex] === null) {
            contextData.SetdetailedState({ ...contextData.detailedstate, ['TravellingTeamID']: '-' })
          }
          else {
            contextData.SetdetailedState({ ...contextData.detailedstate, ['TravellingTeamID']: id[config.dataPointIndex].toString() })
            contextData.setfiltername(xAxis[config.dataPointIndex])
            contextData.setfilterValue(yAxis[0][config.dataPointIndex])
          }
        }
      },
    },

    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: 'end',
        horizontal: true,
      }
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
      x: {
        formatter: function (val) {
          return val
        }
      },
      y: {
        title: {
          formatter: (seriesName) => seriesName + " :",
        },
        formatter: function (val) {
          return val
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: xAxis
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
