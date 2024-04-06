import React, { useContext } from 'react'

import ReactApexChart from 'react-apexcharts';
import BlackDots from '../../Assets/image/Dots.png'
import post from '../../Utility/APIHandle'
import { useEffect, useState } from 'react';
import API from '../../Utility/API';
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'


export default function SalesAgingWise() {

	// const contexData = useContext(contex)

	// const series = [
	//   {
	//     name: "High - 2013",
	//     data: [28, 29, 33, 36, 32, 32, 33]
	//   }
	// ]

	// const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul']

	// const options = lineOption(labels)

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

	//   post(postData, API.GetSalesAgingWise, 'post')
	//     .then((res) => {

	//       for (let index = 0; index < res.data.lstResult.length; index++) {

	//         temp1.push({

	//         })

	//       }

	//     })
	// }

	// function handledropdownMenu() {
	//   document.getElementById("myDropdownSalesaging").style.display === "block" ? document.getElementById("myDropdownSalesaging").style.display = "none" : document.getElementById("myDropdownSalesaging").style.display = "block";
	// }


	// function handleSelectedChart(num) {
	//   // setBranchWiseChart(num)
	// }


	const contexData = useContext(contex);
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;

	const [flag, setflag] = useState("line")
	const [demo, setdemo] = useState("line")

	function handleclick(e) {
		setdemo(e.target.className)
		setflag(e.target.id)
	}


	useEffect(() => {
		getdata()
	}, [inputdata])

	async function getdata() {

		inputdata = { ...inputdata, ['Grouping']: 'a.[rd.caption]' }
		// console.log("branchwise data", inputdata);
		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				console.log(res.data.lstResult)
				for (let index = 0; index < res.data.lstResult.length; index++) {
					if (res.data.lstResult[index]['rd.caption'] === null) {
						name.push("null")
					} else {
						name.push(res.data.lstResult[index]['rd.caption'])
					}
					weight.push(res.data.lstResult[index]['FineWt'])
				}
				setName(name)
				setweight(weight)

				inputdata = { ...inputdata, ['Grouping']: '' }
			})
	}




	if (flag === 'line') {
		var series = [{
			type: 'line',
			data: weight,
			name:'weight'
		}]

		var options = {
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
				type: 'line',

				dropShadow: {
					enabled: true,
					color: '#000',
					top: 18,
					left: 7,
					blur: 10,
					opacity: 0.2
				}
			},
			// colors: ['#77B6EA', '#545454'],
			dataLabels: {
				enabled: false,
			},
			stroke: {
				show: true,
				colors: '#008ae6',
				curve: 'straight',
				width: 6
			},
			fill: {
				opacity: 1,
				type: 'solid',
				gradient: {
					show: false,
					shade: 'dark',
					//   type: "vertical",
					shadeIntensity: 0.2,
					// gradientToColors: undefined,
					inverseColors: true,
					opacityFrom: 2,
					opacityTo: 2,
					// stops: [0, 50, 100],
					// colorStops: []
				},
			},
			title: {
				text: '',
				align: 'left'
			},
			grid: {
				borderColor: '#e7e7e7',
				row: {
					colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
					opacity: 0.5
				},
			},
			markers: {
				size: 1
			},
			xaxis: {
				categories: name,
				title: {
					text: 'Month'
				}
			},
			yaxis: {
				title: {
					text: ''
				},

			},
			legend: {
				position: 'top',
				horizontalAlign: 'right',
				floating: true,
				offsetY: -25,
				offsetX: -5
			},
			tooltip:{
				
				  y: {
					show: true,
					formatter: function(val) {
					  return val
					}
				  },
			},
			responsive: [{
				breakpoint: 593,
				options: {
					
					xaxis:{
						labels:{
							// formatter: function (val) {
							// 	if (val !== undefined) {
							// 		if (val.length > 3) {
							// 			return val.slice(0, 3) + "..."
							// 		} else {
							// 			return val
							// 		}
							// 	}
								
							// }
							
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
	}


	else if (flag === 'area') {
		var series = [{
			type: 'area',
			data: weight,
			name:'weight'
		}]


		var options = {
			chart: {
				type: 'area',
				height: 350,
				zoom: {
					enabled: true
				}
			},
			dataLabels: {
				enabled: false
			},
			plotOptions: {
				area: {
					fillTo: 'end',
				},
			},
			stroke: {
				curve: 'smooth',
				show: true,
				width: 2,
				colors: ['#008ae6']
			},

			fill: {
				opacity: 0.1,
				type: 'gradient',
				gradient: {
					shade: 'dark',
					type: "vertical",
					shadeIntensity: 0.2,
					// gradientToColors: undefined,
					inverseColors: true,
					opacityFrom: 1.5,
					opacityTo: 0.6,
					// stops: [0, 50, 100],
					// colorStops: []
				},
			},

			labels: name,

			grid: {
				yaxis: {
					lines: {
						offsetX: -30
					}
				},
				padding: {
					left: 20
				}
			},

			yaxis: {
				tickAmount: 4,
				floating: false,

				labels: {
					style: {
						colors: '#8e8da4',
					},
					offsetY: -7,
					offsetX: 0,
				},

				// axisBorder: {
				//   show: false,
				// },
				// axisTicks: {
				//   show: false
				// }
			},
			// colors: ['#008ae6'],

			legend: {
				show: false,
				horizontalAlign: 'left'
			},
			// tooltip: {
			//   x: {
			//     format: "yyyy",
			//   },
			//   fixed: {
			//     enabled: false,
			//     position: 'topRight'
			//   }
			// },
		}
	}


	else if (flag === 'linebar') {
		var series = [{
			type: 'column',
			data: weight,
			name:'weight'
		}, {
			type: 'line',
			data: weight,
			name:'weight'
		}]



		var options = {
			chart: {
				height: 350,
				type: 'line',
				dropShadow: {
					enabled: true,
					color: '#fff',
					top: 0,
					left: 0,
					blur: 3,
					opacity: 0.1
				}
			},
			fill: {
				opacity: 2,
				type: 'solid',
			},
			dataLabels: {
				enabled: false,
			},
			stroke: {
				curve: 'smooth',
				show: true,
				width: 4,
				colors: [0, '#4dff4d']
			},	

			grid: {
				yaxis: {
					lines: {
						offsetX: -30
					}
				},
				padding: {
					left: 20
				}
			},
			labels: name,
			xaxis: {
				type: ''
			},
			yaxis: [{
				title: {
					text: '',
				},
			}]
		}
	}





	function handleonchangeCurrency() {
		// console.log("innn")
		document.getElementById("myDropdowniconSalesAging").style.display === "block" ? document.getElementById("myDropdowniconSalesAging").style.display = "none" : document.getElementById("myDropdowniconSalesAging").style.display = "block";
	}

	window.onclick = function (event) {

		if (!event.target.matches('.dropbtn') ) {
			// console.log("hii");
			if (document.getElementsByClassName("dropdown-contenticon")[14] !== undefined) {
				document.getElementsByClassName("dropdown-contenticon")[14].style.display = "none";
			}

		}
	}



	return (
		<div class="col-lg-6 col-md-6 col-12">
			<div class="graph-card">
				<div href="#" target="_self" class="card-title-graph">
					<p><i class="fas fa-chart-line"></i>
						Sales Aging Wise</p>
					<div className='btnicons'>
						<img src={drop} className='dropbtn' onClick={handleonchangeCurrency} id='iconidcity'></img>

						<div id="myDropdowniconSalesAging" className="dropdown-contenticon" onClick={handleclick}>
							<a id='line' className='line' >line </a><hr className='custom-hr' />
							<a id='area' className='area'>area chart</a><hr className='custom-hr' />
							<a id='linebar' className='line'>Combo chart</a><hr className='custom-hr' />
						</div>
						<i class="fas fa-external-link-alt"></i>
					</div>

					{/* <i class="fas fa-external-link-alt"></i> */}

					{/* <p class="geex-content__header__quickaction__link  geex-btn__customizer dots" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu} >
            <img src={BlackDots} className='dropbtn' />
          </p>
          <div id="myDropdownSalesaging" class="dropdown-content" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu}>
            <a id='option1' onClick={() => handleSelectedChart(1)}>Radial Bar</a><hr class="custom-hr" />
            <a id='option2' onClick={() => handleSelectedChart(2)}>Pie</a><hr class="custom-hr" />
          </div> */}
				</div>
				<div class="crancy-progress-card card-contain-graph">

					<ReactApexChart options={options} series={series} type={demo} height={390} />
				</div>
			</div>
		</div>
	)
}
