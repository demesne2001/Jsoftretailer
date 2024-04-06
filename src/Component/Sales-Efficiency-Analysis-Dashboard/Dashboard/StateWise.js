import React, { useContext, useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import Form from 'react-bootstrap/Form';

import BlackDots from '../../Assets/image/Dots.png'

import { StateWise_SemiDonut } from '../../ChartOptions/StateWise_SemiDonut';
import { StateWise_Treemap } from '../../ChartOptions/StateWise_Treemap';

import contex from '../../contex/Contex';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'


export default function StateWise() {

	const contexData = useContext(contex)
	const [state, setState] = useState([]);
	let inputdata = contexData.state;
	const [flag, setflag] = useState("treemap")
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	const options_semidonut = StateWise_SemiDonut(name, state)
	const options_Treemap = StateWise_Treemap(name)
	const series_treemap =  [
		{
			data: state
		}
	]
	const series_semidonut = weight;

	function handleclick(e) {
		// console.log('aaaaaa', e.target.id)
		setflag(e.target.id)
	}


	useEffect(() => {
		getdata()
	}, [inputdata])

	async function getdata() {
		inputdata = { ...inputdata, ['Grouping']: 'k.stateID,k.Statename' }
		// console.log(inputdata, "stat");
		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = []
				let name1 = [];
				let weight = [];
				// console.log("response", res.data.lstResult[0]['Statename'])
				for (let index = 0; index < res.data.lstResult.length; index++) {
					if (res.data.lstResult[index]['Statename'] != null) {
						// name.push({ x: res.data.lstResult[index]['Statename'] + "\n" +"(" +res.data.lstResult[index]['FineWt']+")", y: res.data.lstResult[index]['FineWt'] })
						name.push({ x: res.data.lstResult[index]['Statename'], y: res.data.lstResult[index]['FineWt'] })
						name1.push(res.data.lstResult[index]['Statename'])
					}
					weight.push(res.data.lstResult[index]['FineWt'])

				}
				// setweight(weight)
				setState(name)
				setName(name1)
				setweight(weight)
				// console.log("statewise", name)
				// console.log("statewise Service", series);
				inputdata = { ...inputdata, ['Grouping']: '' }
			})
	}
	// function handleSelectedChart(num) {
	// 	setStateWiseChart(num)
	// }


	// function returnSelectedChart() {
	// 	if (stateWiseChart === 1) { 

	// 		return (<ReactApexChart options={treeOption} series={series} type="treemap" height={380} />)
	// 	}
	// 	else if(stateWiseChart === 2){

	// 		return (<ReactApexChart options={radialOption} series={series1} type="bar" height={380} />)
	// 	}
	// 	else if(stateWiseChart === 3){
	// 		console.log(semiDoughnutOption)
	// 		return(<ReactApexChart options={semiDoughnutOption} series={series2} type="donut" height={380} />)
	// 	}
	// }

	// function handledropdownMenu() {
	// 	document.getElementById("myDropdownState").style.display === "block" ? document.getElementById("myDropdownState").style.display = "none" : document.getElementById("myDropdownState").style.display = "block";
	// }

	// console.log('statewsie',state)

	// console.log('flaggggg', flag)


	

	// if (flag === 'radialBar') {
	// 	// console.log(datax)


	// 	let percarray = []

	// 	let sum = 0;

	// 	for (let i = 0; i < datay.length; i++) {
	// 		sum += datay[i];
	// 	}

	// 	for (let index = 0; index < datay.length; index++) {
	// 		percarray.push((datay[index] / sum) * 100)
	// 	}


	// 	var series = percarray

	// 	console.log("datax", datax)
	// 	var options = {
	// 		dataLabels: {
	// 			enabled: true,
	// 		},
	// 		chart: {
	// 			type: 'radialBar',
	// 		},
	// 		plotOptions: {
	// 			radialBar: {
	// 				offsetY: 0,
	// 				startAngle: 0,
	// 				endAngle: 270,
	// 				hollow: {
	// 					margin: 5,
	//                 	size: '15%',
	// 					background: 'transparent',
	// 					// image: undefined,
	// 				},
	// 				dataLabels: {
	// 					name: {
	// 						show: false,
	// 					},
	// 					value: {
	// 						show: false,
	// 					}
	// 				}
	// 			}
	// 		},
	// 		labels: datax,

	// 		legend: {
	// 			show: true,
	// 			floating: true,
	// 			fontSize: '13px',
	// 			position: 'left',
	// 			offsetX: 140,
	// 			offsetY: 3,
	// 			labels: {
	// 				useSeriesColors: true,
	// 			},
	// 			markers: {
	// 				width: 0,
	// 				height: 0
	// 			},

	// 		},

	// 	}
	// }

	


	function handleonchangeCurrency() {
		// console.log("innn")
		document.getElementById("myDropdowniconstate").style.display === "block" ? document.getElementById("myDropdowniconstate").style.display = "none" : document.getElementById("myDropdowniconstate").style.display = "block";
	}

	window.onclick = function (event) {

		// console.log("eeeeeeeeevent",event.target.matches('#iconidstate'))

		if (!event.target.matches('#iconidstate')) {
			// console.log("hii");

			// console.log('stateeeeeeeeeeeeeeeeeeeeeeee', document.getElementsByClassName("dropdown-contenticon")[1])
			if (document.getElementsByClassName("dropdown-contenticon")[1] !== undefined) {
				document.getElementsByClassName("dropdown-contenticon")[1].style.display = "none";
			}
		}
	}




	return (
		<div className="col-lg-4 col-md-6 col-12">
			<div className="graph-card">
				<div className="card-title-graph">
					<p><i className="fas fa-map-marker-alt"></i>
						State Wise</p>

					<div className='btnicons'>
						<img src={drop} className='dropbtn' onClick={handleonchangeCurrency} id='iconidstate'></img>
						<div id="myDropdowniconstate" className="dropdown-contenticon" onClick={handleclick}>
							<a id='treemap'>Tree map</a><hr className='custom-hr' />
							{/* <a id='radialBar'>radialBar</a><hr className='custom-hr' /> */}
							<a id='donut'>Semi donut </a><hr className='custom-hr' />
						</div>
						<i class="fas fa-external-link-alt"></i>
					</div>
					{/* <i class="fas fa-external-link-alt"></i> */}
				</div>

				{/* <p class="geex-content__header__quickaction__link  geex-btn__customizer dots" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu} >
						<img src={BlackDots} className='dropbtn' />
					</p>
					<div id="myDropdownState" class="dropdown-content" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu}>
						<a id='option1' onClick={() => handleSelectedChart(1)}>Tree Map</a><hr class="custom-hr" />
						<a id='option2' onClick={() => handleSelectedChart(2)}>Radial Bar</a><hr class="custom-hr" />
						<a id='option2' onClick={() => handleSelectedChart(3)}>Semi Doughnut</a><hr class="custom-hr" />
					</div> */}








				<div className="crancy-progress-card card-contain-graph">
					
					{flag === 'donut' ? <ReactApexChart options={options_semidonut} type={flag} series={series_semidonut} height={350} />:null}
					{flag === 'treemap' ? <ReactApexChart options={options_Treemap} type={flag} series={series_treemap} height={350} />:null}
				</div>
				<div id="html-dist"></div>
			</div>
		</div>
	)
}
