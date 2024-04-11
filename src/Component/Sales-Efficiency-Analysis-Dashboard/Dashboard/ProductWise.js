import React, { useContext } from 'react'
import contex from '../../contex/Contex';
import ReactApexChart from 'react-apexcharts';
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import Radialbar from '../../Radialbar/Radialbar'
import BlackDots from '../../Assets/image/Dots.png'
import { ProductWise_Bar } from '../../ChartOptions/ProductWise_Bar';
import API from '../../Utility/API';
import { useEffect, useState } from 'react';
import post from '../../Utility/APIHandle'
import Gradient from "javascript-color-gradient";
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import { useNavigate } from 'react-router-dom';

export default function ProductWise() {


	const contexData = useContext(contex);
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	const navigate = useNavigate()
	let inputdata = contexData.state;

	const options_Bar = ProductWise_Bar(name)
	const series = [{
		name: 'weight',
		data: weight
	}]

	const [flag, setflag] = useState("bar")

	const [sales, setSales] = useState([])

	const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()


	function handleclick(e) {
		if (e.target.className !== 'custom-hr') {
			setflag(e.target.id)
		}
	}


	useEffect(() => {
		getdata()
	}, [inputdata])

	async function getdata() {

		inputdata = { ...inputdata, ['Grouping']: 'i.ProductId,i.ProductName' }
		// console.log(inputdata);
		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				let sale = [];
				var js = {};
				// console.log(res.data.lstResult)
				for (let index = 0; index < res.data.lstResult.length; index++) {
					if (res.data.lstResult[index]['ProductName'] === null) {
						name.push("null")
					} else {
						name.push(res.data.lstResult[index]['ProductName'])
					}
					weight.push(res.data.lstResult[index]['FineWt'])
					js = { 'product': '', 'thisYearProfit': 0 }
					if (res.data.lstResult[index]['ProductName'] === null) {
						js['product'] = 'null'
					} else {
						js['product'] = res.data.lstResult[index]['ProductName']
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
				// console.log("product name",name)
				// console.log("product weight", weight);
			})
	}

	// function handledropdownMenu() {
	// 	document.getElementById("myDropdownCity").style.display === "block" ? document.getElementById("myDropdownCity").style.display = "none" : document.getElementById("myDropdownCity").style.display = "block";
	// }



	// function handleSelectedChart(num) {
	// 	// setBranchWiseChart(num)
	// }

	function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "i.ProductId,i.ProductName", columnName: "ProductName", columnID: "ProductId", componentName: "Product Wise" } })
	}



	function handleonchangeCurrency() {
		// console.log("innn")
		document.getElementById("myDropdowniconproduct").style.display === "block" ? document.getElementById("myDropdowniconproduct").style.display = "none" : document.getElementById("myDropdowniconproduct").style.display = "block";
	}

	window.onclick = function (event) {
		// console.log('evennnn', event.target.className)

		if (!event.target.matches('.dropbtn')) {
			// console.log("hii");
			// console.log('branchhh', document.getElementsByClassName("dropdown-contenticon")[7])
			if (document.getElementsByClassName("dropdown-contenticon")[10] !== undefined) {
				document.getElementsByClassName("dropdown-contenticon")[10].style.display = "none";
			}
		}
	}

	function setMargin() {
		if (weight.length < 7) {
			return 80
		} else {
			return 30
		}
	}



	return (
		<div class="col-lg-4 col-md-6 col-12">
			<div class="graph-card">
				<div class="card-title-graph">
					<div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
						<p><i class="fas fa-boxes"></i>
							Product Wise </p>
					</div>

					<div className="col-sm-2 col-md-2 col-2">
						<div className='btnicons'>
							<img src={drop} className='dropbtn' onClick={handleonchangeCurrency}></img>

							<div id="myDropdowniconproduct" className="dropdown-contenticon" onClick={handleclick}>

								{flag === 'bar' ? <><a id='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' >Bar</a><hr className='custom-hr' /></>}
								{flag === 'heatmap' ? <><a id='heatmap' >Heat map &nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='heatmap' >Heat map </a><hr className='custom-hr' /></>}

								{/* <a id='heatmap' >Heat map</a><hr className='custom-hr' /> */}
							</div>
							<i class="fas fa-external-link-alt"></i>
						</div>
					</div>

					{/* <i class="fas fa-external-link-alt"></i> */}
					{/* <p class="geex-content__header__quickaction__link  geex-btn__customizer dots" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu} >
						<img src={BlackDots} className='dropbtn' />
					</p>
					<div id="myDropdownProduct" class="dropdown-content" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu}>
						<a id='option1' onClick={() => handleSelectedChart(1)}>Tree Map</a><hr class="custom-hr" />
						<a id='option2' onClick={() => handleSelectedChart(2)}>Radial Bar</a><hr class="custom-hr" />
						<a id='option2' onClick={() => handleSelectedChart(3)}>Semi Doughnut</a><hr class="custom-hr" />
					</div> */}
				</div>
				<div class="crancy-progress-card card-contain-graph">

					{/* <ParentSize>{({ width, height }) => <Radialbar width={width} height={350} />}</ParentSize> */}


					{flag === 'bar' ?
						<ReactApexChart options={options_Bar} series={series} type={flag} height={390} />
						: null}

					{flag === 'heatmap' ?
						<table align='center' rules='rows' border='white' style={{ border: 'white', marginTop: setMargin() }}>
							<tr>
								<th>ProductWise</th>
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

						</table>

						: null}
				</div>
			</div>
		</div>
	)
}
