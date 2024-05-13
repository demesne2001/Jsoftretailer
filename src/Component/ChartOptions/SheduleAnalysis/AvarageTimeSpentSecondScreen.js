
import React from 'react'

export default function AvarageTimeSpentSecondScreen(xAxis, yAxis, contextData, id) {
  console.log("caledddddd");
  const option = {
    chart: {
      type: 'bar',
      height: 350,
      events: {
        dataPointSelection: (event, chartContex, config) => {
          console.log("clicked");
          if (id[config.dataPointIndex] === null) {
            contextData.SetdetailedState({ ...contextData.detailedstate, ['TravellingTeamID']: '-' })
          }
          else {
            contextData.SetdetailedState({ ...contextData.detailedstate, ['TravellingTeamID']: id[config.dataPointIndex].toString() })
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
