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
import { Axios } from 'axios';


export default function BranchWise() {


	const contexData = useContext(contex)
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;
	const navigate = useNavigate()
	const [flag, setflag] = useState()

	const [optionId, setOptionId] = useState()

	const [sales, setSales] = useState([])
	const ChartType = "donut"


	const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()


	useEffect(() => {
		fetchOption()
		getdata()
	}, [inputdata])


	const series = handleSeriesData()
	const options_donut = BranchWise_donut(name)

	const options_radialbar = BranchWise_Radial(name)

	function handleclick(e) {

		// console.log('Event ID',e.target.id)

		if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconbranch' && e.target.id !== '') {
			// console.log('Updationg option')
			setflag(e.target.id)
		}
		else {
			// console.log("NOT UPDATING OPTIOJN")
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
		// console.log("INPUT ", inputdata);
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

	async function fetchOption() {
		await post({ "ID": 1, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

			.then((res) => {
				if (res.data.lstResult.length === 0) {
					setflag(ChartType)
					// console.log('FIRST TIME API CALLED')
					post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 1, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
						.then((res) => {
							post({ "ID": 1, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
								.then((res) => {
									setOptionId(res.data.lstResult[0].ChartOptionID)
								})

							alert(res.data.Message)
						})

				}
				else {

					setOptionId(res.data.lstResult[0].ChartOptionID)
					setflag(res.data.lstResult[0].ChartOption)
				}

			})
	}

	async function addEditOption() {

		await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 1, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
			.then((res) => {

				document.getElementById('myDropdowniconbranch').style.display = 'none'
				alert(res.data.Message)

			})
	}

	function handleonchangeCurrency() {

		document.getElementById("myDropdowniconbranch").style.display === "block" ? document.getElementById("myDropdowniconbranch").style.display = "none" : document.getElementById("myDropdowniconbranch").style.display = "block";
	}

	function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "a.BranchID,b.BranchName", columnID: 'BranchID', columnName: 'BranchName', componentName: "Branch Wise", filterKey: "strBranch", chartId: 1 } })
	}

	window.onclick = function (event) {

		// console.log('evennnn', event.target.className)
		if (event.target.className !== 'dropbtn') {
			document.getElementById("myDropdowniconbranch").style.display = "none"

		}
	}


	// console.log('LOCAL STORAGE ITEM JJ',localStorage.getItem('jj'))

	return (
		<div className="col-lg-4 col-md-6 col-12">

			<div className="graph-card">
				<div className='card-title-graph'>

					<div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation} >

						<p><i class="fas fa-chart-pie"></i>Branch Wise</p>

					</div>

					<div className="col-sm-2 col-md-2 col-2" >

						<img src={drop} className='dropbtn' onClick={handleonchangeCurrency} ></img>
						{/* <i class="fa-solid fa-retweet"  onClick={flip}/> */}
						<i class="fas fa-external-link-alt" />

						<div className='btnicons'>


							<div id="myDropdowniconbranch" className="dropdown-contenticon" onClick={handleclick}>

								{flag === 'donut' ? <><a id='donut'>Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut' >Donut</a><hr className='custom-hr' /></>}
								{flag === 'radialBar' ? <><a id='radialBar'>RadialBar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='radialBar' >RadialBar</a><hr className='custom-hr' /></>}
								{flag === 'heatmap' ? <><a id='heatmap'>Heat map&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='heatmap' >Heat map</a><hr className='custom-hr' /> </>}
								<button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>

							</div>

						</div>

					</div>


				</div>

				{weight.length !== 0 ?
					<div className="crancy-progress-card card-contain-graph" id='flipbranch'>

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
					</div> :
					<div className="crancy-progress-card card-contain-graph"  >
						<div class="dot-spinner"style={{margin:"auto", position:'inherit'}} >
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
							<div class="dot-spinner__dot"></div>
						</div>
					</div> 
				}
			</div>
		</div>
	)
}
