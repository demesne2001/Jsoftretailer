import React, { useContext, useEffect, useState } from 'react'


import ReactApexChart from 'react-apexcharts';
import img from '../../Assets/icons8-person-48.png'

import salesmanwisepng from '../../Assets/image/saleman wise.png'
import BlackDots from '../../Assets/image/Dots.png'
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import contex from '../../contex/Contex';

export default function SalesManWise() {
	
  // const contexData = useContext(contex)

  // let seriesData = [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
  // let xaxiscategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // let imagearr =[]

  const [imagearr, setImageArr] = useState([])

  // const [postData, setPostData] = useState({
  //   "strBranch": "",
  //   "strState": "",
  //   "strCity": "",
  //   "strItem": "",
  //   "strSubItem": "",
  //   "strItemGroup": "",
  //   "strItemSubitem": "",
  //   "strPurchaseParty": "",
  //   "strSalesParty": "",
  //   "strSaleman": "",
  //   "strProduct": "",
  //   "strDesignCatalogue": "",
  //   "strSaleAging": "",
  //   "strModeofSale": "",
  //   "strTeamModeofSale": "",
  //   "FromDate": "",
  //   "ToDate": "",
  //   "strMetalType": "",
  //   "strDayBook": "",
  //   "PageNo": 0,
  //   "PageSize": 0,
  //   "Search": ""
  // })


  // useEffect(()=>{

	// 	setPostData(contexData.state)

	// },[contexData.state])

	// useEffect(()=>{
	// 	getdata()
	// },[postData])


  // function getdata() {

  //   let temp1 = []

  //   post(postData, API.GetPurchasePartywise, 'post')
  //     .then((res) => {

  //       for (let index = 0; index < res.data.lstResult.length; index++) {

  //         temp1.push({

  //         })

  //       }

  //     })
  // }

  const contexData = useContext(contex);
  const [name, setName] = useState([])
  const [weight, setweight] = useState([])
  let inputdata = contexData.state;

  useEffect(() => {
    getdata()
  
  }, [inputdata])

  
  useEffect(() => {
    imagepoint()
  
  }, [imagearr])

  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'h.SalesmanID,h.SalesmanNAme' }
    // console.log("branchwise data", inputdata);
    await post(inputdata, API.CommonChart, {}, 'post')
      .then((res) => {
        let name = [];
        let weight = [];
        // console.log(res.data.lstResult)
        for (let index = 0; index < res.data.lstResult.length; index++) {
          if (res.data.lstResult[index]['SalesmanNAme'] === null) {
            name.push("null")
          } else {
            name.push(res.data.lstResult[index]['SalesmanNAme'])
          }
          weight.push(res.data.lstResult[index]['FineWt'])
        }
        setName(name)
        setweight(weight)
        // console.log("itemgroup", weight);
        inputdata = { ...inputdata, ['Grouping']: '' }
      })
  }

  function imagepoint() {

    let temp = []

    for (let index = 0; index < weight.length; index++) {

      temp.push({

        x: name[index],
        y: weight[index],
        marker: {
          size: 15,
        },
        image: {
          path: img,
        }

      })
    }
    // setImageArr(temp)
  }

  // useEffect(() => {
    
  // }, [inputdata])

  const series = [{
    name: 'weight',
    data: weight
  }]

  const options = {
    chart: {
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
        },

      },
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return val;
      },
      offsetY: 20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },
   
    tooltip:{
      x: {
          show: true,
          formatter: function(val) {
            return val
          }
        },
        y: {
          show: true,
          formatter: function(val) {
            return val
          }
        },
  },
    xaxis: {
      categories: name,
      position: 'bottom',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: true
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
      }
    },
    yaxis: {
      axisBorder: {
        show: true
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        formatter: function (val) {
          return val;
        }
      }
    },

    annotations: {
      // points: imagearr,
      tooltip: {
        enabled: true,
      }
    },
    responsive: [{
      breakpoint: 593,
      options: {
          
          xaxis:{
              labels:{
                formatter: function (val) {
                  if (val.length > 3) {
                      return val.slice(0, 3) + "..."
                  } else {
                      return val
                  }
              }
              }
          },
          yaxis: {
              labels: {
                  show: true,
                  formatter: function(val) {
                      
                    return ((val/1000).toFixed(0)).toString() + "KG"
                  
                  }
                 
              }
          }
      },
  }]
  }


	

	// function handledropdownMenu() {
    //     document.getElementById("myDropdownSalesman").style.display === "block" ? document.getElementById("myDropdownSalesman").style.display = "none" : document.getElementById("myDropdownSalesman").style.display = "block";
    //   }

    //   function handleSelectedChart(num) {
    //     // setBranchWiseChart(num)
    //   }
  return (
    <div className="col-lg-4 col-md-6 col-12">
								<div className="graph-card">
									<div href="#" target="_self" className="card-title-graph">
										<p><i className="fas fa-users"></i>
											Salesmen Wise</p>
										<i className="fas fa-external-link-alt"></i>
										{/* <p class="geex-content__header__quickaction__link  geex-btn__customizer dots" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu} >
						<img src={BlackDots} className='dropbtn' />
					</p>
					<div id="myDropdownSalesman" class="dropdown-content" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu}>
						<a id='option1' onClick={() => handleSelectedChart(1)}>Tree Map</a><hr class="custom-hr" />
						<a id='option2' onClick={() => handleSelectedChart(2)}>Radial Bar</a><hr class="custom-hr" />
						<a id='option2' onClick={() => handleSelectedChart(3)}>Semi Doughnut</a><hr class="custom-hr" />
					</div> */}
									</div>
									<div className="crancy-progress-card card-contain-graph">
									<ReactApexChart options={options} series={series} type="bar" height={350} />
									</div>
								</div>
							</div>
  )
}
