import React, { useContext } from 'react'
import API from '../../Utility/API';
import { useEffect, useState } from 'react';
import post from '../../Utility/APIHandle'


import ReactApexChart from 'react-apexcharts';
import { ItemGroup_RadialBar } from '../../ChartOptions/ItemGroup_RadialBar';
import { ItemGroup_treemap } from '../../ChartOptions/ItemGroup_treemap';

import BlackDots from '../../Assets/image/Dots.png'
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'



export default function ItemGroupWise() {
  const contexData = useContext(contex);
  const [name, setName] = useState([])
  const [weight, setweight] = useState([])
  const [finalarr, setarr] = useState([])

  let inputdata = contexData.state;

  const [flag, setflag] = useState("radialBar")

  const options_radial = ItemGroup_RadialBar(name)
  const options_treemap = ItemGroup_treemap(name)
  const series_treemap =  [
    {
      data: finalarr
    }
  ]
  const series_radial = handleSeriesData()
  function handleSeriesData() {
		let percarray = []
		let sum = 0;

		for (let i = 0; i < weight.length; i++) {
			sum += weight[i];
		}

		for (let index = 0; index < weight.length; index++) {
			percarray.push((weight[index] / sum) * 100)
		}
		return percarray

	}

  function handleclick(e) {
    setflag(e.target.id)
    // console.log("effect", e.target.className)
  }

  const [seri, setseries] = useState([])
  const [opt, setopt] = useState([])

  useEffect(() => {
    getdata()
  }, [inputdata])

  // useEffect(() => {
  //   setseries(select_series(flag))
  //   setopt(select_option(flag))
  // }, [flag])


  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'o.ItemGroupId,o.GroupName' }
    // console.log("branchwise data", inputdata);
    await post(inputdata, API.CommonChart, {}, 'post')
      .then((res) => {
        let name = [];
        let weight = [];
        let finalarr = [];

        // console.log(res.data.lstResult)
        for (let index = 0; index < res.data.lstResult.length; index++) {
          if (res.data.lstResult[index]['GroupName'] === null) {
            name.push("null")
          } else {
            name.push(res.data.lstResult[index]['GroupName'])
          }
          finalarr.push({ x: res.data.lstResult[index]['GroupName'], y: res.data.lstResult[index]['FineWt'] })
          weight.push(res.data.lstResult[index]['FineWt'])
        }
        setName(name)
        setweight(weight)
        setarr(finalarr)
        // console.log("itemgroup", weight);
        inputdata = { ...inputdata, ['Grouping']: '' }
      })
  }



  // function select_series(flag) {
  //   if (flag === 'radialBar') {
  //     let percarray = []

  //     let sum = 0;
  //     for (let i = 0; i < weight.length; i++) {
  //       sum += weight[i];
  //     }

  //     for (let index = 0; index < weight.length; index++) {
  //       percarray.push((weight[index] / sum) * 100)
  //     }

  //     var series = percarray

  //     return series
  //   }
  //   else if(flag === 'treemap'){
  //     var series = [
  //       {
  //         data: finalarr
  //       }
  //     ]

  //     return series
  //   }
  // }

  // function select_option(flag){
  //   if (flag === 'radialBar') {
  //     var options = {
  //       chart: {
  //         height: 350,
  //         type: 'radialBar',
  //         toolbar: {
  //           show: true,
  //           offsetX: 0,
  //           offsetY: 0,
  //           tools: {
  //             download: true,
  //           },
  //         },
  //       },
  //       plotOptions: {
  //         radialBar: {
  //           startAngle: 0,
  //           endAngle: 270,
  //           dataLabels: {
  //             name: {
  //               fontSize: '22px',
  //             },

  //             value: {
  //               formatter: function (val) {
  //                 return parseInt(val) + ('%');
  //               },
  //               color: '#111',
  //               fontSize: '16px',
  //               show: true
  //             },
  //             total: {
  //               show: true,
  //               label: 'Total',
  //               // formatter: function (w) {
  //               //   return 249  
  //               // }
  //             }
  //           }
  //         }
  //       },
  //       labels: name,
  //     }

  //     return options
  //   }


  //   else if(flag === 'treemap'){
  //     var options = {
  //       dataLabels: {
  //         style: {
  //           colors: '#ffffff'
  //         },
  //         enabled: true
  //       },
  //       legend: {
  //         show: false
  //       },
  //       chart: {
  //         height: 350,
  //         type: 'treemap',
  //         toolbar: {
  //           show: true,
  //         },
  //       },
  //       title: {
  //         text: '',
  //         align: 'center'
  //       },
  //       colors: [
  //         '#3B93A5',
  //         '#F7B844',

  //       ],
  //       plotOptions: {
  //         treemap: {
  //           distributed: true,
  //           enableShades: false,
  //           dataLabels: {
  //             format: 'scale'
  //           }
  //         }
  //       }
  //     }
  //     return options
  //   }
  // }

  // let percarray = []
  // let sum = 0;
  // for (let i = 0; i < weight.length; i++) {
  //   sum += weight[i];
  // }

  // for (let index = 0; index < weight.length; index++) {
  //   percarray.push((weight[index] / sum) * 100)
  // }


  // const rad_srs = percarray

  // const tree_srs = [
  //   {
  //     data: finalarr
  //   }
  // ]

  // const tree_opt = {
  //   dataLabels: {
  //     style: {
  //       colors: ['#ffffff']
  //     },
  //     enabled: true
  //   },
  //   stroke: {
  //     width: 0
  //   },
  //   legend: {
  //     show: false
  //   },
  //   chart: {
  //     height: 350,
  //     type: 'treemap',
  //     toolbar: {
  //       show: true,
  //     },
  //     animations: {
  //       enabled: false,
  //       easing: 'easeinout',
  //       speed: 800,
  //       animateGradually: {
  //         enabled: true,
  //         delay: 150
  //       },
  //       dynamicAnimation: {
  //         enabled: true,
  //         speed: 700
  //       }
  //     }
  //   },
  //   title: {
  //     text: '',
  //     align: 'center'
  //   },
  //   plotOptions: {
  //     treemap: {
  //       distributed: true,
  //       enableShades: false,
  //       dataLabels: {
  //         format: 'scale'
  //       }
  //     }
  //   }
  // }

  // const rad_options = {
  //   chart: {
  //     height: 350,
  //     type: 'radialBar',
  //     toolbar: {
  //       show: true,
  //       offsetX: 0,
  //       offsetY: 0,
  //       tools: {
  //         download: true,
  //       },
  //     },

  //     // animations: {
  //     //   enabled: true,
  //     //   easing: 'easeinout',
  //     //   speed: 800,
  //     //   animateGradually: {
  //     //     enabled: true,
  //     //     delay: 150
  //     //   },
  //     //   dynamicAnimation: {
  //     //     enabled: true,
  //     //     speed: 800
  //     //   }
  //     // }
  //   },


  //   plotOptions: {
  //     radialBar: {
  //       startAngle: 0,
  //       endAngle: 270,
  //       dataLabels: {
  //         name: {
  //           fontSize: '22px',
  //         },

  //         value: {
  //           formatter: function (val) {
  //             return parseInt(val) + ('%');
  //           },
  //           colors: ['#111'],
  //           fontSize: '16px',
  //           show: true
  //         },
  //         total: {
  //           show: true,
  //           label: 'Total',
  //           // formatter: function (w) {
  //           //   return 249  
  //           // }
  //         }
  //       }
  //     }
  //   },
  //   labels: name,
  // }


  // useEffect(() => {
  //   if (flag === 'radialBar') {
  //     setopt(rad_options)
  //     setseries(rad_srs)
  // }

  // else if(flag === 'treemap'){
  //     setopt(tree_opt)
  //     setseries(tree_srs)
  // }

  // }, [flag])




  function handleonchangeCurrency() {
    // console.log("innn")
    document.getElementById("myDropdowniconigroup").style.display === "block" ? document.getElementById("myDropdowniconigroup").style.display = "none" : document.getElementById("myDropdowniconigroup").style.display = "block";
  }

  window.onclick = function (event) {
    // console.log('matchhhh', event.target.matches('.dropbtn'))
    if (!event.target.matches('.dropbtn') ) {
      // console.log("hii");
      // console.log('stateee', document.getElementsByClassName("dropdown-contenticon")[6])
      if (document.getElementsByClassName("dropdown-contenticon")[6] !== undefined) {
        document.getElementsByClassName("dropdown-contenticon")[6].style.display = "none";
      }
    }
  }




  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="graph-card">
        <div href="#" target="_self" className="card-title-graph">
          <p><i className="fas fa-chart-area"></i> Item Group Wise</p>

          <div className='btnicons'>
            <img src={drop} className='dropbtn' onClick={handleonchangeCurrency} id='iconidstate'></img>
            <div id="myDropdowniconigroup" className="dropdown-contenticon" onClick={handleclick}>
              <a id='radialBar'>radial Bar</a><hr className='custom-hr' />
              <a id='treemap'>treemap</a><hr className='custom-hr' />
            </div>
            <i class="fas fa-external-link-alt"></i>
          </div>

          {/* <i class="fas fa-external-link-alt"></i> */}
        </div>
        <div className="crancy-progress-card card-contain-graph">
          {/* {flag === 'treemap' ? series[0].x : series} */}
          {flag === 'radialBar'? <ReactApexChart options={options_radial} series={series_radial} height={390} type={flag} />: null}
          {flag === 'treemap'? <ReactApexChart options={options_treemap} series={series_treemap} height={390} type={flag} />: null}
        </div>
      </div>
    </div>
  )
}
