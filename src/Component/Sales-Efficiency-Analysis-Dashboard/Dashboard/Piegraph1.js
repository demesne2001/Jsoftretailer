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

      inputdata = { ...inputdata, ['Grouping']: 's,r' }
      // console.log("branchwise data", inputdata);
      await post(inputdata, API.CommonCard, {}, 'post')
          .then((res) => {
             
              setweight(res.data.lstResult[0]['FineWt'])
              setname(res.data.lstResult[0]['SalesType'])
              setweight1(res.data.lstResult[1]['FineWt'])
              setname1(res.data.lstResult[1]['SalesType'])
              // console.log(res.data.lstResult[0]['FineWt'], "weright card");
              inputdata = { ...inputdata, ['Grouping']: '' }
          })
  }

    const series = [weight, weight1]
    
    const options = {
              
              chart: {
                type: 'donut',
              },
              dataLabels: {
                enabled: false
              },
              tooltip: {
                enabled: false
              },
              colors:['#8458b0','#da3e00'],
              labels: [name,name1],
              plotOptions: {
                pie: {
                  donut: {
                    labels: {
                      show: true,
                      
                      name: {
                        
                      },
                      value: {
                        offsetY: -5,
                        fontSize:'12px',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        fontWeight: 600,
                      }
                    }
                  }
                }
              },
              responsive: [{
                breakpoint: 2000,
              }]
            }
    return (


        <div className="col-xl-2 col-lg-4 col-md-4 col-12">
            <div className="graph-card">
                <div className="crancy-progress-card top-graph-card">
                    {/* <div className="text-center"> */}
                        
                    <ReactApexChart options={options} series={series} type="donut" />
                    
                    {/* </div> */}
                </div>

            </div>
        </div>
    )
}
