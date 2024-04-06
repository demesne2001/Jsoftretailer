import React, { useEffect, useState, useRef, useContext } from 'react';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'react-apexcharts';
import BlackDots from '../../Assets/image/Dots.png'
import Gradient from "javascript-color-gradient";
import { BranchWise_donut } from "./../../ChartOptions/BranchWise_donut";
import { BranchWise_Radial } from "./../../ChartOptions/Branchwise_Radial";
import { render } from '@testing-library/react';
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import { useNavigate } from 'react-router-dom';


export default function BranchWise() {

	const contexData = useContext(contex)
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;
	const navigate = useNavigate()
	const [flag, setflag] = useState("donut")
	const [sales, setSales] = useState([])

	const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()


	useEffect(() => {
		getdata()
	}, [inputdata])



	const series = handleSeriesData()
	const options_donut = BranchWise_donut(name)

	const options_radialbar = BranchWise_Radial(name)

	function handleclick(e) {
		if (e.target.className !== 'custom-hr') {
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


	async function getdata() {
		inputdata = { ...inputdata, ['Grouping']: 'a.BranchID,b.BranchName' }
		// console.log("branchwise data", inputdata);
		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				let sale = [];
				var js = {};
				// console.log(res.data.lstResult)
				for (let index = 0; index < res.data.lstResult.length; index++) {
					name.push(res.data.lstResult[index]['BranchName'])
					weight.push(res.data.lstResult[index]['FineWt'])

					js = { 'product': '', 'thisYearProfit': 0 }
					if (res.data.lstResult[index]['BranchName'] === null) {
						js['product'] = 'null'
					} else {
						js['product'] = res.data.lstResult[index]['BranchName']
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
				inputdata = { ...inputdata, ['Grouping']: '' }
			})
	}



	// function handleThousand(n) {
	// 	localStorage.setItem("value", n)
	// 	contexData.setcurrency(n)
	// }

	function handleonchangeCurrency() {
		// console.log("innn")
		document.getElementById("myDropdowniconbranch").style.display === "block" ? document.getElementById("myDropdowniconbranch").style.display = "none" : document.getElementById("myDropdowniconbranch").style.display = "block";
	}

	function handleNavigation() {
		navigate('/graph-detail', { state: "a.BranchID,b.BranchName" })
	}

	window.onclick = function (event) {

		// console.log('evennnn', event.target.className)
		if (event.target.className !== 'dropbtn') {
			if (document.getElementsByClassName("dropdown-contenticon")[0] !== undefined) {
				document.getElementsByClassName("dropdown-contenticon")[0].style.display = "none";
			}
		}
	}

	// console.log("optionss", options)

	return (
		<div className="col-lg-4 col-md-6 col-12">

			<div className="graph-card">
				<div className='card-title-graph' onClick={handleNavigation}>

					<p><i class="fas fa-chart-pie">

					</i> Branch Wise </p>
					<i className="fas fa-external-link-alt"></i>
					{/* <img src={drop} className='dropbtnicon'></img> */}


				</div>



				<div className="crancy-progress-card card-contain-graph">
					<div className='btnicons'>
						<img src={drop} className='dropbtn' onClick={handleonchangeCurrency}></img>

						<div id="myDropdowniconbranch" className="dropdown-contenticon" onClick={handleclick}>
							<a id='donut' >donut</a><hr className='custom-hr' />
							<a id='radialBar' >radialBar</a><hr className='custom-hr' />
							<a id='heatmap' >Heat map</a><hr className='custom-hr' />
							{/* <a id='bubble' >Bubble</a><hr className='custom-hr' /> */}
						</div>

					</div>
					{flag === 'donut' ? <ReactApexChart options={options_donut} series={series} height={380} type={flag} /> : null}
					{flag === 'radialBar' ? <ReactApexChart options={options_radialbar} series={series} height={380} type={flag} /> : null}
					{flag === 'heatmap' ?
						<div>
							<table align='center' rules='rows' border='white' style={{ border: 'white', marginTop: setMargin() }}>
								<tr>
									<th>Branchwise</th>
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

							</table></div> : null}
					{/* </div> */}
					<div id="html-dist"></div>
				</div>
			</div>
		</div>
	)
}
