import React, { useContext } from 'react'

import ReactApexChart from 'react-apexcharts';
import BlackDots from '../../Assets/image/Dots.png'
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import { useEffect, useState } from 'react';
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import { YearWise_Donut } from '../../ChartOptions/YearWise_Donut';
import { YearWise_bar } from '../../ChartOptions/YearWise_bar';
import { YearWise_semiDonut } from '../../ChartOptions/YearWise_semiDonut';




export default function YearWise() {

	// const contexData = useContext(contex)

	// const series = [
	// 	{
	// 		name: 'Actual',
	// 		data: [
	// 			{
	// 				x: '2011',
	// 				y: 1292,
	// 				goals: [
	// 					{
	// 						name: 'Expected',
	// 						value: 1400,
	// 						strokeHeight: 5,
	// 						strokeColor: '#775DD0'
	// 					}
	// 				]
	// 			},
	// 			{
	// 				x: '2012',
	// 				y: 4432,
	// 				goals: [
	// 					{
	// 						name: 'Expected',
	// 						value: 5400,
	// 						strokeHeight: 5,
	// 						strokeColor: '#775DD0'
	// 					}
	// 				]
	// 			},
	// 			{
	// 				x: '2013',
	// 				y: 5423,
	// 				goals: [
	// 					{
	// 						name: 'Expected',
	// 						value: 5200,
	// 						strokeHeight: 5,
	// 						strokeColor: '#775DD0'
	// 					}
	// 				]
	// 			},
	// 			{
	// 				x: '2014',
	// 				y: 6653,
	// 				goals: [
	// 					{
	// 						name: 'Expected',
	// 						value: 6500,
	// 						strokeHeight: 5,
	// 						strokeColor: '#775DD0'
	// 					}
	// 				]
	// 			},
	// 			{
	// 				x: '2015',
	// 				y: 8133,
	// 				goals: [
	// 					{
	// 						name: 'Expected',
	// 						value: 6600,
	// 						strokeHeight: 13,
	// 						strokeWidth: 0,
	// 						strokeLineCap: 'round',
	// 						strokeColor: '#775DD0'
	// 					}
	// 				]
	// 			},
	// 			{
	// 				x: '2016',
	// 				y: 7132,
	// 				goals: [
	// 					{
	// 						name: 'Expected',
	// 						value: 7500,
	// 						strokeHeight: 5,
	// 						strokeColor: '#775DD0'
	// 					}
	// 				]
	// 			},
	// 			{
	// 				x: '2017',
	// 				y: 7332,
	// 				goals: [
	// 					{
	// 						name: 'Expected',
	// 						value: 8700,
	// 						strokeHeight: 5,
	// 						strokeColor: '#775DD0'
	// 					}
	// 				]
	// 			},
	// 			{
	// 				x: '2018',
	// 				y: 6553,
	// 				goals: [
	// 					{
	// 						name: 'Expected',
	// 						value: 7300,
	// 						strokeHeight: 2,
	// 						strokeDashArray: 2,
	// 						strokeColor: '#775DD0'
	// 					}
	// 				]
	// 			}
	// 		]
	// 	}
	// ]
	// const option = barMarkerOptions()

	// const [postData, setPostData] = useState({
	// 	"strBranch": "",
	// 	"strState": "",
	// 	"strCity": "",
	// 	"strItem": "",
	// 	"strSubItem": "",
	// 	"strItemGroup": "",
	// 	"strItemSubitem": "",
	// 	"strPurchaseParty": "",
	// 	"strSalesParty": "",
	// 	"strSaleman": "",
	// 	"strProduct": "",
	// 	"strDesignCatalogue": "",
	// 	"strSaleAging": "",
	// 	"strModeofSale": "",
	// 	"strTeamModeofSale": "",
	// 	"FromDate": "",
	// 	"ToDate": "",
	// 	"strMetalType": "",
	// 	"strDayBook": "",
	// 	"PageNo": 0,
	// 	"PageSize": 0,
	// 	"Search": ""
	// })


	// useEffect(()=>{

	// 	setPostData(contexData.state)

	// },[contexData.state])

	// useEffect(()=>{

	// 	getdata()

	// },[postData])


	// function getdata() {

	// 	let temp1 = []

	// 	post(postData, API.GetYearWise, 'post')
	// 		.then((res) => {

	// 			for (let index = 0; index < res.data.lstResult.length; index++) {

	// 				temp1.push({

	// 				})

	// 			}

	// 		})
	// }

	// function handledropdownMenu() {
	// 	document.getElementById("myDropdownYear").style.display === "block" ? document.getElementById("myDropdownYear").style.display = "none" : document.getElementById("myDropdownYear").style.display = "block";
	// }


	// function handleSelectedChart(num) {
	// 	// setBranchWiseChart(num)
	// }


	const contexData = useContext(contex);
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;

	const [flag, setflag] = useState("kpi")
	const [demo, setdemo] = useState("donut")

	function handleclick(e) {
		setdemo(e.target.className)
		setflag(e.target.id)
	}
	const options_bar = YearWise_bar(name)
	const options_donut = YearWise_Donut(name)
	const options_semidonut = YearWise_semiDonut(name)
	const series1 = [{
		name: 'weight',
		data: weight
	}]
	const series2 = weight

	useEffect(() => {
		getdata()
	}, [inputdata])

	async function getdata() {

		inputdata = { ...inputdata, ['Grouping']: 'M.FinYearID,m.YearCode' }
		// console.log("branchwise data", inputdata);
		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				// console.log(res.data.lstResult)
				for (let index = 0; index < res.data.lstResult.length; index++) {
					if (res.data.lstResult[index]['YearCode'] === null) {
						name.push("null")
					} else {
						name.push(res.data.lstResult[index]['YearCode'])
					}
					weight.push(res.data.lstResult[index]['FineWt'])
				}
				setName(name)
				setweight(weight)

				inputdata = { ...inputdata, ['Grouping']: '' }
			})
	}






	if (flag === 'bar') {
		var series = [{
			data: weight
		}]
	
		var options = {
			chart: {
				height: 350,
				type: 'bar'
			},
			plotOptions: {
				bar: {
					columnWidth: '60%'
				}
			},
			xaxis: {
				categories: name,
			},
			colors: ['#00E396'],
			dataLabels: {
				enabled: false
			},
			legend: {
				show: false
			}
		}
	}

	else if(flag === 'donut'){
		var series = weight

		var options = {
			dataLabels: {
				enabled: false,
			},
			chart: {
			  type: 'donut',
			  animations: {
					enabled: true,
					easing: 'easeinout',
					speed: 1000,
					animateGradually: {
						enabled: true,
						delay: 150
					},
					dynamicAnimation: {
						enabled: true,
						speed: 1000
					}
				},
			},
			plotOptions: {
			  pie: {
				startAngle: -90,
				endAngle: 90,
				offsetY: 80,
				dataLabels: {
					format: 'scale'
				}
			  }
			},
			colors: ['#58a3b2'],

			legend: {
				show: false,
				floating: true,
				fontSize: '13px',
				position: 'left',
				offsetX: 140,
				offsetY: 3,
				labels: {
					useSeriesColors: true,
				},
				markers: {
					width: 0,
					height: 0
				},
				
			},
			
			labels: name,
			// tooltip: {
			// 	theme: 'dark',
			// 	x: {
			// 		show: true
			// 	},
			// 	y: {
			// 		show: true
			// 	}
			// },
			// responsive: [{
			//   breakpoint: 480,
			//   options: {
			// 	chart: {
			// 	  width: 200
			// 	},
			// 	legend: {
			// 	  position: 'bottom'
				  
			// 	}
			//   }
			// }]
		  }
		}

		else if(flag === 'kpi'){
			var series = weight

		var options = {
			dataLabels: {
				enabled: true,
			},
			tooltip: {
				enabled: true,
				followCursor: true,
			},
			colors: ['#51bde4'],
		
			chart: {
				animations: {
					enabled: true,
					easing: 'easeinout',
					speed: 1000,
					animateGradually: {
						enabled: true,
						delay: 150
					},
					dynamicAnimation: {
						enabled: true,
						speed: 1000
					}
				},
				toolbar: {
					show: true,
					offsetX: 0,
					offsetY: 0,
					tools: {
					  download: true,
					},
			
				  },
				type: 'donut',
			},
			legend: {
				show: true,
				floating: false,
				fontSize: '13px',
				position: 'bottom',
				offsetX: 0,
				offsetY: 0,
				labels: {
					useSeriesColors: true,
				},
				markers: {
					width: 12,
					height: 12
				}
			},

			labels: name,

			plotOptions: {
				pie: {
					startAngle: 0,
					endAngle: 360,
					customScale: 0.9,
					offsetY: 20,
					donut: {
						labels: {
							offsetY: 0,
							startAngle: 0,
							endAngle: 360,
							hollow: {
								size: '10%',
							},
							show: true,
							name: {

							},
							value: {

							}
						}
					}
				}
			}
		}
		}
	

		function handleonchangeCurrency() {
			// console.log("innn")
			document.getElementById("myDropdowniconyear").style.display === "block" ? document.getElementById("myDropdowniconyear").style.display = "none" : document.getElementById("myDropdowniconyear").style.display = "block";
		}
	
		window.onclick = function (event) {
	
			if (!event.target.matches('.dropbtn') ) {
				// console.log("hii");
				if (document.getElementsByClassName("dropdown-contenticon")[13] !== undefined) {
					document.getElementsByClassName("dropdown-contenticon")[13].style.display = "none";
				}
	
			}
		}
	

	

	return (
		<div className="col-lg-4 col-md-6 col-12">
			<div className="graph-card">
				<div href="#" target="_self" className="card-title-graph">
					<p><i className="fas fa-calendar-alt"></i>
						Year Wise</p>

					<div className='btnicons'>
						<img src={drop} className='dropbtn' onClick={handleonchangeCurrency} id='iconidcity'></img>

						<div id="myDropdowniconyear" className="dropdown-contenticon" onClick={handleclick}>
							<a id='kpi' className='donut'>KPI chart</a><hr className='custom-hr' />
							<a id='bar' className='bar' >Bar</a><hr className='custom-hr' />
							<a id='donut' className='donut'>Semi Donut</a><hr className='custom-hr' />
							{/* <a id='pie' >Pie chart </a><hr className='custom-hr' /> */}
						</div>
						<i class="fas fa-external-link-alt"></i>
					</div>
					{/* <i className="fas fa-external-link-alt"></i> */}
					{/* <p class="geex-content__header__quickaction__link  geex-btn__customizer dots" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu} >
						<img src={BlackDots} className='dropbtn' />
					</p>
					<div id="myDropdownYear" class="dropdown-content" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu}>
						<a id='option1' onClick={() => handleSelectedChart(1)}>Radial Bar</a><hr class="custom-hr" />
						<a id='option2' onClick={() => handleSelectedChart(2)}>Pie</a><hr class="custom-hr" />
					</div> */}
				</div>
				<div className="crancy-progress-card card-contain-graph">
				{flag === 'kpi'?<ReactApexChart options={options_donut} series={series2} type='donut' height={350} />:null}
				{flag === 'bar'?<ReactApexChart options={options_bar} series={series1} type={flag} height={350} />:null}
				{flag === 'donut'?<ReactApexChart options={options_semidonut} series={series2} type={flag} height={350} />:null}
				</div>
			</div>
		</div>
	)
}
