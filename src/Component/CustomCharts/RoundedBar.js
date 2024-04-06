import React from 'react'

import ReactApexChart from 'react-apexcharts';

export default function RoundedBar() {
    const series = [{
        name: 'Inflation',
        data: [20, 30, 42, 12, 41, 36, 32, 23, 14, 8]
      }]
    const options = {
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius:'15',
            borderRadiusApplication: 'end',
            dataLabels: {
              position: 'top', // top, center, bottom
            },
        
        },
    },
        // colors: ['#b55dc4', '#d4d4d4', '#e86867', '#78c37b', '#ffd142'],
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val;
          },
          offsetY: -35,
          style: {
            fontSize: '14px',
            colors: ["#87CEEB"],
            // colors: ['#b55dc4', '#d4d4d4', '#e86867', '#78c37b', '#ffd142']
          },
          background: {
            enabled: true,
            foreColor: '#304758',
            borderRadius: 10,
            padding: 6,
            opacity: 1,
            borderWidth: 0,
            borderColor: ''
          }
        },
        
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
          position: 'bottom',
          axisBorder: {
            show: false
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
                return val + "%";
              }
            }
          },
      }
  return (
    <div>
       <ReactApexChart options={options} series={series} type="bar" height={350} />
    </div>
  )
}
