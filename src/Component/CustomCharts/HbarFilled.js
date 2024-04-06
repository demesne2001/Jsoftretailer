import React, { useEffect, useState } from 'react'

import ReactApexChart from 'react-apexcharts';
import img from '../Assets/img/svg/whiteCircle.svg'

export default function HbarFilled() {

    const seriesdata = [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
    const labels = ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
    'United States', 'China', 'Germany'
  ]
  
    const [imageArr,setImageArr] = useState([])

    function makeImageArr(){
      let temp = []

      for (let index = 0; index < seriesdata.length; index++) {
        
        let calcX = seriesdata[index] - (seriesdata[index]/6)

        temp.push({
          x: calcX,
          y: labels[index],
          marker: { size: 8 },
          image: { path: img },
        })
      }
      setImageArr(temp)
    }

    useEffect(()=>{
        makeImageArr()
    },[])
    
    const series = [{
        data: seriesdata
      }]

    const options = {
        chart: {
          type: 'bar',
          height: 350,

        },
        plotOptions: {
          bar: {
            horizontal: true,
            borderRadius:'12',
            borderRadiusApplication: 'end',
            columnWidth: '50%',
            
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: labels,
        },
        grid: {
            position: 'back',
            column: {
              colors: ['#f2f2f2'],
          }
        },
      //   annotations: {
      //     points:[
      // {
      //   x: 1116,
      //   y: 'China',
      //   marker: { size: 8 },
      //   image: { path: img },

      // },
      // ]
      annotations: {
        points:imageArr
  }
      }
      
  return (
    <>
      <ReactApexChart options={options} series={series} type="bar" height={410} />
    </>
  )
}
