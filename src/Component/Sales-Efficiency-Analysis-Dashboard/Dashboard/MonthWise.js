import React from 'react'
import { useEffect, useState, useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import BlackDots from '../../Assets/image/Dots.png'
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import { MonthWise_Bar } from '../../ChartOptions/MonthWise_Bar';
import { MonthWise_area } from '../../ChartOptions/MonthWise_area';




export default function MonthWise() {

  
  // const series = [{
  // 	name: 'Net Profit',
  // 	data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  // }]

  // const labels = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']

  // const options = GroupBarOptions(labels)

  // const [postData, setPostData] = useState({
  //     "strBranch": "",
  //     "strState": "",
  //     "strCity": "",
  //     "strItem": "",
  //     "strSubItem": "",
  //     "strItemGroup": "",
  //     "strItemSubitem": "",
  //     "strPurchaseParty": "",
  //     "strSalesParty": "",
  //     "strSaleman": "",
  //     "strProduct": "",
  //     "strDesignCatalogue": "",
  //     "strSaleAging": "",
  //     "strModeofSale": "",
  //     "strTeamModeofSale": "",
  //     "FromDate": "",
  //     "ToDate": "",
  //     "strMetalType": "",
  //     "strDayBook": "",
  //     "PageNo": 0,
  //     "PageSize": 0,
  //     "Search": ""
  // })


  // useEffect(()=>{
  //     getdata()
  // },[])

  // function getdata() {

  // 	let temp1 = []

  //     post(postData,API.GetMonthWise,'post')
  //     .then((res)=>{

  // 		for (let index = 0; index < res.data.lstResult.length; index++) {

  // 			temp1.push({

  // 			})

  // 		}

  //     })
  // }

  // function handledropdownMenu() {
  // 	document.getElementById("myDropdownMonth").style.display === "block" ? document.getElementById("myDropdownMonth").style.display = "none" : document.getElementById("myDropdownMonth").style.display = "block";
  // }


  // function handleSelectedChart(num) {
  // 	// setBranchWiseChart(num)
  // }

  const contexData = useContext(contex);
  const [name, setName] = useState([])
  const [weight, setweight] = useState([])
  let inputdata = contexData.state;


  const [flag, setflag] = useState("bar")
  const [demo, setdemo] = useState("bar")
  const options_bar = MonthWise_Bar(name)
  const options_area = MonthWise_area(name)
  var series = [{
    name: 'weight',
    data: weight
  }]
  function handleclick(e) {
    // console.log('aaaaaa', e.target.id)
    setdemo(e.target.className)
    setflag(e.target.id)
  }

  useEffect(() => {
    getdata()
  }, [inputdata])

  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'datename(month,voucherDate)' }
    await post(inputdata, API.CommonChart, {}, 'post')
    .then((res) => {
        // console.log("apiiiiiiiiiiiiiiii", res.data.lstResult);
        let name = [];
        let weight = [];
        // console.log(res.data.lstResult)
        for (let index = 0; index < res.data.lstResult.length; index++) {
          if (res.data.lstResult[index]['MonthName'] === null) {
            name.push("null")
          } else {
            name.push(res.data.lstResult[index]['MonthName'])
          }
          weight.push(res.data.lstResult[index]['FineWt'])
        }
        setName(name)
        setweight(weight)
        inputdata = { ...inputdata, ['Grouping']: '' }
      })
  }




  // if (flag === 'bar') {
  //   var series = [{
  //     name: '',
  //     data: weight
  //   }]
  //   var options = {
  //     // colors:['#00b150','#002060'],
  //     chart: {
  //       toolbar: {
  //         show: true,
  //         offsetX: 0,
  //         offsetY: 0,
  //         tools: {
  //           download: true,
  //         },

  //       },
  //       type: 'bar',
  //       height: 350,

  //     },
  //     plotOptions: {
  //       bar: {
  //         distributed: true,
  //         horizontal: false,
  //         columnWidth: '55%',
  //         endingShape: 'rounded'
  //       },
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     stroke: {
  //       show: true,
  //       width: 2,
  //       colors: ['transparent']
  //     },
  //     xaxis: {
  //       categories: name,
  //     },
  //     yaxis: {
  //       title: {
  //         text: 'Thousands'
  //       }
  //     },
  //     fill: {
  //       opacity: 1,
  //       type: 'solid',
  //     },

  //     legend: {
  //       show: true,
  //       horizontalAlign: 'center'
  //     },
  //     // tooltip: {
  //     //   y: {
  //     //     formatter: function (val) {
  //     //       return val + " Thousand"
  //     //     }
  //     //   }
  //     // }
  //   }
  // }


  // else if (flag === 'area') {
  //   var series = [{
  //     // name: "STOCK ABC",
  //     data: weight
  //   }]

  //   var options = {
  //     chart: {
  //       type: 'area',
  //       height: 350,
  //       zoom: {
  //         enabled: true
  //       }
  //     },
  //     dataLabels: {
  //       enabled: false
  //     },
  //     plotOptions: {
  //       area: {
  //         fillTo: 'end',
  //       },
  //     },
  //     stroke: {
  //       curve: 'smooth',
  //       show: true,
  //       width: 2,
  //       colors: ['transparent']
  //     },

  //     fill: {
  //       opacity: 0.1,
  //       type: 'gradient',
  //       gradient: {
  //         shade: 'dark',
  //         type: "vertical",
  //         shadeIntensity: 0.2,
  //         // gradientToColors: undefined,
  //         inverseColors: true,
  //         opacityFrom: 1.5,
  //         opacityTo: 0.6,
  //         // stops: [0, 50, 100],
  //         // colorStops: []
  //       },
  //     },

  //     labels: name,

  //     grid: {
  //       yaxis: {
  //         lines: {
  //           offsetX: -30
  //         }
  //       },
  //       padding: {
  //         left: 20
  //       }
  //     },

  //     yaxis: {
  //       tickAmount: 4,
  //       floating: false,

  //       labels: {
  //         style: {
  //           colors: '#8e8da4',
  //         },
  //         offsetY: -7,
  //         offsetX: 0,
  //       },

  //       // axisBorder: {
  //       //   show: false,
  //       // },
  //       // axisTicks: {
  //       //   show: false
  //       // }
  //     },

  //     legend: {
  //       show: false,
  //       horizontalAlign: 'left'
  //     },
  //     tooltip: {
  //       enabled: true,
  //     },
  //   }
  // }





  function handleonchangeCurrency() {
    // console.log("innn")
    document.getElementById("myDropdowniconmonth").style.display === "block" ? document.getElementById("myDropdowniconmonth").style.display = "none" : document.getElementById("myDropdowniconmonth").style.display = "block";
  }

  window.onclick = function (event) {

    if (!event.target.matches('.dropbtn') ) {
      // console.log("hii");
      if (document.getElementsByClassName("dropdown-contenticon")[12] !== undefined) {
        document.getElementsByClassName("dropdown-contenticon")[12].style.display = "none";
      }

    }
  }




  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="graph-card">
        <div href="#" target="_self" className="card-title-graph">
          <p><i className="fas fa-calendar-week"></i>
            Month Wise</p>

          <div className='btnicons'>
            <img src={drop} className='dropbtn' onClick={handleonchangeCurrency} id='iconidcity'></img>

            <div id="myDropdowniconmonth" className="dropdown-contenticon" onClick={handleclick}>
              <a id='bar' className='bar' >Bar</a><hr className='custom-hr' />
              <a id='area' className='area'>Area chart</a><hr className='custom-hr' />
              {/* <a id='pie' >Pie chart </a><hr className='custom-hr' /> */}
            </div>
            <i class="fas fa-external-link-alt"></i>
          </div>


          {/* <i className="fas fa-external-link-alt"></i> */}
          {/* <p class="geex-content__header__quickaction__link  geex-btn__customizer dots" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu} >
						<img src={BlackDots} className='dropbtn' />
					</p>
					<div id="myDropdownMonth" class="dropdown-content" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu}>
						<a id='option1' onClick={() => handleSelectedChart(1)}>Radial Bar</a><hr class="custom-hr" />
						<a id='option2' onClick={() => handleSelectedChart(2)}>Pie</a><hr class="custom-hr" />
					</div> */}

        </div>
        <div className="crancy-progress-card card-contain-graph">
          
          {flag === 'bar'
            ?
            <ReactApexChart options={options_bar} series={series} type={demo} height={390} />
            :null}
            {flag === 'area'
            ?
            <ReactApexChart options={options_area} series={series} type={demo} height={390} />
            :null}
        </div>
      </div>
    </div>
  )
}
