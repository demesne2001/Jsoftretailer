import React, { useContext } from 'react'
import ReactApexChart from 'react-apexcharts';
import API from '../../Utility/API';
import { useEffect, useState } from 'react';
import post from '../../Utility/APIHandle'
import Gradient from "javascript-color-gradient";
import { CityWise_Bar } from '../../ChartOptions/CityWise_Bar';
import { CityWise_LoliMap } from '../../ChartOptions/CityWise_LoliMap';
import BlackDots from '../../Assets/image/Dots.png'
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'


export default function CityWise() {

	const contexData = useContext(contex);
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;
	
	const options_lolipop = CityWise_LoliMap(name)
	const options_bar = CityWise_Bar(name);
	const series_lolipop = [{
		name: 'Weight',
		data: weight
	}]
	const series_bar = [{
		data: weight
	}]

	useEffect(() => {
		getdata()
	}, [inputdata])

	const [sales, setSales] = useState([])

	const [flag, setflag] = useState("bar")

	const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()

	function handleclick(e) {
		if (e.target.className !== 'custom-hr'){
			setflag(e.target.id)
		}
	}

	function setMargin() {
		if (weight.length < 7) {
			return 80
		} else {
			return 30
		}
	}



	async function getdata() {

		inputdata = { ...inputdata, ['Grouping']: 'c.cityname' }
		// console.log(inputdata);
		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				let sale = [];
				var js = {};

				// console.log(res.data.lstResult)
				for (let index = 0; index < res.data.lstResult.length; index++) {
					name.push(res.data.lstResult[index]['cityname'])
					weight.push(res.data.lstResult[index]['FineWt'])
					js = {'product':'','thisYearProfit' : 0}
					if (res.data.lstResult[index]['cityname'] === null) {
						js['product'] = 'null'
					} else {
						js['product'] = res.data.lstResult[index]['cityname']
					}
					js['thisYearProfit'] = res.data.lstResult[index]['FineWt']

					sale.push(js)
				}
				setName(name)
				setweight(weight)

				var j = []
				for (let index = 0; index < sale.length; index++) {
					j.push({ ...sale[index], ['color']: gradientArray[index] })
				}
				setSales(j)
				// console.log("name", name)
				// console.log("weight", weight);
			})
	}

	// function handledropdownMenu() {
	// 	document.getElementById("myDropdownCity").style.display === "block" ? document.getElementById("myDropdownCity").style.display = "none" : document.getElementById("myDropdownCity").style.display = "block";
	// }



	// function handleSelectedChart(num) {
	// 	// setBranchWiseChart(num)
	// }


	function handleonchangeCurrency() {
		// console.log("innn")
		document.getElementById("myDropdowniconcity").style.display === "block" ? document.getElementById("myDropdowniconcity").style.display = "none" : document.getElementById("myDropdowniconcity").style.display = "block";
	}

	window.onclick = function (event) {
		if (!event.target.matches('.dropbtn')) {
			// console.log("hii");
			// console.log("cityyyyyyyyyyy", document.getElementsByClassName("dropdown-contenticon")[2])
			if (document.getElementsByClassName("dropdown-contenticon")[2] !== undefined) {
				document.getElementsByClassName("dropdown-contenticon")[2].style.display = "none";
			}
		}
	}




	return (
		<div className="col-lg-4 col-md-6 col-12">
			<div className="graph-card">
				<div className="card-title-graph">
					<p><i className="fas fa-city"></i>
						City Wise</p>
					<div className='btnicons'>
						<img src={drop} className='dropbtn' onClick={handleonchangeCurrency} id='iconidcity'></img>

						<div id="myDropdowniconcity" className="dropdown-contenticon" onClick={handleclick}>
							<a id='bar' >bar </a><hr className='custom-hr' />
							<a id='heatmap' >Heatmap</a><hr className='custom-hr' />
							<a id='barl' >lollipop chart</a><hr className='custom-hr' />
							{/* <a id='bar' >chart</a><hr className='custom-hr' /> */}
						</div>
						<i class="fas fa-external-link-alt"></i>
					</div>

					{/* <i class="fas fa-external-link-alt"></i> */}
				</div>

				{/* <p class="geex-content__header__quickaction__link  geex-btn__customizer dots" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu} >
						<img src={BlackDots} className='dropbtn' />
					</p>
					<div id="myDropdownCity" class="dropdown-content" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu}>
						<a id='option1' onClick={() => handleSelectedChart(1)}>Radial Bar</a><hr class="custom-hr" />
						<a id='option2' onClick={() => handleSelectedChart(2)}>Pie</a><hr class="custom-hr" />
					</div> */}

				<div className="crancy-progress-card card-contain-graph">

					{flag === 'bar'  ?
					<ReactApexChart options={options_bar} series={series_bar} type="bar" height={390} />
					:null}
					{flag === 'barl'  ?
					<ReactApexChart options={options_lolipop} series={series_lolipop} type="bar" height={390} />
					:null}
					
					{flag === 'heatmap'  ?
					<table align='center' rules='rows' border='white' style={{ border: 'white', marginTop:setMargin() }}>
						<tr>
							<th>Citywise</th>
							<th>FineWt</th>
						</tr>


						{sales.map((data) => {
							return (
								<tr >
									<td style={{ backgroundColor: data.color, width: 250, color: 'white' }}>{data.product} </td>
									<td style={{ backgroundColor: data.color, width: 250, color: 'white' }}>{data.thisYearProfit}</td>
								</tr>
							)
						})}

					</table>:null}
					
				</div>
			</div>
		</div>

	)
}
