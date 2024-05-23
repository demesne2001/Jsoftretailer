import React from 'react'

export default function SecondSheduleScreenBar1(xAxis, yAxis, contextData, id, chartId) {
  const options = {
    chart: {
      height: 350,
      type: 'bar',
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
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    tooltip:{
      x: {
        show: true,
        formatter: function(val){
          return val
        }
    }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
    xaxis: {
      categories: xAxis,
      position: 'top',
      axisBorder: {
        show: false
      },
      labels: {
        formatter: function (val) {
          if (typeof (val) === 'string') {
            return val.slice(0, 5) + '...'
          }
        }
      },
      axisTicks: {
        show: false
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      },
      tooltip: {
        enabled: true,
      }
    },
    yaxis: {
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val) {
          return val;
        }
      }

    },

  };
  let series = []
  if (chartId === 16) {
    series = [{
      name: 'Bills',
      data: yAxis[0]
    }];
  } else {
    series = [{
      name: 'Days',
      data: yAxis[0]
    }];
  }
 
  return [options, series];
}

