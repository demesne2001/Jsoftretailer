import React from 'react'

export default function TotalNoOfBillsSeriesOptions(xAxis, Yaxis) {
  function FormatedSeriesData() {
    var tempseries = []
    for (let i = 0; i < xAxis.length; i++) {
      if (Yaxis[0][i] !== undefined) {
        tempseries.push({ x: xAxis[i], y: Yaxis[0][i] });
      }
    }
    console.log(tempseries,"asdsa");
    return tempseries
  }
  const options = {
    legend: {
      show: false
    },
    chart: {
      height: 350,
      type: 'treemap'
    },

    colors: [
      '#3B93A5',
      '#F7B844',
      '#ADD8C7',
      '#EC3C65',
      '#CDD7B6',
      '#C1F666',
      '#D43F97',
      '#1E5D8C',
      '#421243',
      '#7F94B0',
      '#EF6537',
      '#C0ADDB'
    ],
    plotOptions: {
      treemap: {
        distributed: true,
        enableShades: false
      }
    }
  }
  console.log(FormatedSeriesData() ,"qwertyuiop");
  const series = [{
    data: FormatedSeriesData() 
  }]

  return [options, series]
}
