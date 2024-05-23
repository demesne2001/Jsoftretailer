import React, { useEffect, useState, useContext } from 'react'
import contex from '../../contex/Contex';

import API from '../../Utility/API'
import post from '../../Utility/APIHandle'
import ReactApexChart from 'react-apexcharts';



export default function Piegraph1() {
  const contexData = useContext(contex);
  const [weight, setweight] = useState([])
  const [name, setname] = useState([])
  const [weight1, setweight1] = useState([])
  const [name1, setname1] = useState([])
  let inputdata = contexData.state;

  useEffect(() => {
    getdata()
  }, [inputdata])

  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 's,sr' }

    await post(inputdata, API.CommonCard, {}, 'post')
      .then((res) => {
        
        

        if (res.data.lstResult.length > 0) {

          setweight(res.data.lstResult[0]['NetWeight'])
          setname(res.data.lstResult[0]['SalesType'])
          setweight1(res.data.lstResult[1] ? res.data.lstResult[1]['NetWeight'] : 0 )
          setname1(res.data.lstResult[1] ? res.data.lstResult[1]['SalesType'] : "Return" )

          inputdata = { ...inputdata, ['Grouping']: '' }
        }
      })
  }

  const series = [weight, weight1]

  const options = {
    
    chart: {
      type: 'donut',
      height: '100%'
  },
  legend:{
    show:true,
    position:'bottom',
    
  },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      enabled: false
    },
    colors: ['#8458b0', '#da3e00'],
    labels: [name, name1],
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,

            name: {

            },
            value: {
              offsetY: -5,
              fontSize: '12px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              fontWeight: 600,
            },
            total: {
              show: true,
              label: 'Total',
              formatter: function (w) {
                return w.globals.seriesTotals.reduce((a, b) => {

                  var ans = parseFloat(a)+parseFloat(b);
                  return (parseFloat(ans).toFixed(2))
                }, 0)
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        
          breakpoint: 850,
          options: {
            chart: {
              type: 'donut',
              height: '150'
           },
           legend:{
            show:true,
            position:'right',
          }

          }
      }
  ],
  //   responsive: [{
  //     breakpoint: 480,
  //     options: {
  //         chart: {
  //             type: 'donut',
  //             animations: {
  //                 enabled: true,
  //                 easing: 'easeinout',
  //                 speed: 800,
  //                 animateGradually: {
  //                     enabled: true,
  //                     delay: 150
  //                 },
  //                 dynamicAnimation: {
  //                     enabled: true,
  //                     speed: 700
  //                 }
  //             },
  //             width: 300
  //         },
  //         legend: {
  //             position: 'bottom'
  //         },
  //         plotOptions: {
  //             pie: {
  //                 startAngle: -90,
  //                 endAngle: 90,
  //                 offsetY: 0,
  //                 dataLabels: {
  //                     format: 'scale'
  //                 }
                  
  //             }
              
  //         }
  //     }
  // }]
  }
  return (


    <div className="col-xl-2 col-lg-4 col-md-4 col-12">
      <div className="graph-card">
      {weight.length !== 0 ?
        <div className="crancy-progress-card top-graph-card">
          {/* <div className="text-center"> */}

          {/* <ReactApexChart options={options} series={series} type="donut" /> */}
          <ReactApexChart options={options} series={series} type='donut' height={200} />
          {/* </div> */}
        </div>:
        <div className="crancy-progress-card top-graph-card">
				<div class="dot-spinner"style={{margin:"auto", position:'inherit'}} >
					<div class="dot-spinner__dot" style={{top:"7px"}}></div>
					<div class="dot-spinner__dot" style={{top:"7px"}}></div>
					<div class="dot-spinner__dot" style={{top:"7px"}}></div>
					<div class="dot-spinner__dot" style={{top:"7px"}}></div>
					<div class="dot-spinner__dot" style={{top:"7px"}}></div>
					<div class="dot-spinner__dot" style={{top:"7px"}}></div>
					<div class="dot-spinner__dot" style={{top:"7px"}}></div>
					<div class="dot-spinner__dot" style={{top:"7px"}}></div>
				</div>
			</div>}

      </div>
    </div>
  )
}
