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
import Notify from '../Notification/Notify';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'

export default function ProductWise() {
	const [loader, setLoader] = useState(true)
	const [dataloader, setdataLoader] = useState(true)
	const contexData = useContext(contex);
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	const [optionId, setOptionId] = useState()
	const navigate = useNavigate()
	const [flagSort, setflagSort] = useState('')
	let inputdata = contexData.state;
	const [data, setdata] = useState([]);
	const [prc, setprc] = useState([]);
	let optionbar = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'bar',
		height: '400%',
		width: '100%',
		chartId: 'ProductWise',
		Xaxis: name,
		Yaxis: weight,
		prclst:prc
	}

	let radialdata = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'polar-radialbar',
		height: '100%',
		width: '100%',
		chartId: 'ProductWise',
		radiusAxis: name,
		seriesdata: weight,
	}
	let optiondonut = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'donut',
		height: '100%',
		width: '100%',
		chartId: 'ProductWise',
		propdata: data,
		radius: [10, 150],
		label: {
			position: 'inside',
			formatter: '{d}%',
			color: 'white',
			fontWeight: 'bold',
		},

	}

	let optionpie = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'simplepie',
		height: '100%',
		width: '100%',
		propdata: data,
		chartId: 'PieChartProductWise',
		label: {
			position: 'inside',
			formatter: '{d}%',
			color: 'white',
			fontWeight: 'bold',
		},
	}
	let optradialbar = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'semi-donut',
		height: '100%',
		width: '100%',
		chartId: 'RadialBarcharProductWise',
		propdata: data,
		position: 'center',
		fontsize: 20,
		label: {
			position: 'inside',
			formatter: '{d}%',
			color: 'white',
			fontWeight: 'bold',
		},
	}
	const options_Bar = ProductWise_Bar(name, inputdata['column'])
	const series = [{
		name: 'weight',
		data: weight
	}]

	const [flag, setflag] = useState()
	const ChartType = "bar"

	const [sales, setSales] = useState([])

	const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()

	function handleclick(e) {

		if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconbranch' && e.target.id !== '') {

			setflag(e.target.id)
		}
		else {

		}

	}


	useEffect(() => {
		fetchOption()
		getdata()
	}, [inputdata])

	useEffect(() => {
		if (flagSort !== '') {
			fetchSortData()
		}
	}, [flagSort])

	async function getdata() {

		inputdata = { ...inputdata, ['Grouping']: 'i.ProductId,i.ProductName', ['SortByLabel']: 'ProductName' }

		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				let sale = [];
				var js = {};
				let data = [];
				let tempprc = [];
				if (res.data !== undefined) {
					for (let index = 0; index < res.data.lstResult.length; index++) {
						data.push({ value: res.data.lstResult[index][inputdata['column']], name: res.data.lstResult[index]['ProductName'] })
						if (res.data.lstResult[index]['ProductName'] === null) {
							name.push("null")
						} else {
							name.push(res.data.lstResult[index]['ProductName'])
						}
						weight.push(res.data.lstResult[index][inputdata['column']])
						js = { 'product': '', 'thisYearProfit': 0 }
						if (res.data.lstResult[index]['ProductName'] === null) {
							js['product'] = 'null'
						} else {
							js['product'] = res.data.lstResult[index]['ProductName']
						}
						js['thisYearProfit'] = res.data.lstResult[index][inputdata['column']]

						sale.push(js)
						tempprc.push(res.data.lstResult[index]['Prc']);

					}
					setprc(tempprc);
					setName(name)
					setdata(data);
					setweight(weight)
					setdataLoader(false)
					if (weight.length !== 0) {
						setLoader(false)
					} else {
						setLoader(true)
					}
					var j = []
					for (let index = 0; index < sale.length; index++) {
						j.push({ ...sale[index], ['color']: gradientArray[index] })
					}
					setSales(j)
				} else {
					alert(res['Error']);
				}

			})
	}

	// function handledropdownMenu() {
	// 	document.getElementById("myDropdownCity").style.display === "block" ? document.getElementById("myDropdownCity").style.display = "none" : document.getElementById("myDropdownCity").style.display = "block";
	// }



	// function handleSelectedChart(num) {
	// 	// setBranchWiseChart(num)
	// }

	function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "i.ProductId,i.ProductName", columnName: "ProductName", columnID: "ProductId", componentName: "Product Wise", filterKey: "strProduct", chartId: 12, FromDate: inputdata.FromDate, ToDate : inputdata.ToDate }, replace: true })
	}



	function handleonchangeCurrency() {

		document.getElementById("myDropdowniconproduct").style.display === "block" ? document.getElementById("myDropdowniconproduct").style.display = "none" : document.getElementById("myDropdowniconproduct").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')
		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {

				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconproduct') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	document.getElementById("root").addEventListener("click", function (event) {

		if (event.target.id !== 'icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
			if (document.getElementById("myDropdowniconproduct") !== null) {
				document.getElementById("myDropdowniconproduct").style.display = "none"
				document.getElementById("sorticonProduct").style.display = "none"
			}
		}

	});

	function setMargin() {
		if (weight.length < 7) {
			return 80
		} else {
			return 30
		}
	}

	async function fetchOption() {
		await post({ "ID": 12, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

			.then((res) => {
				if (res.data !== undefined) {
					if (res.data.lstResult.length === 0) {
						setflag(ChartType)

						post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 12, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
							.then((res) => {

								post({ "ID": 12, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
									.then((res) => {
										if (res.data !== undefined) {
											setOptionId(res.data.lstResult[0].ChartOptionID)
										} else {
											alert(res['Error']);
										}
									})
								Notify()
							})

					}
					else {
						setOptionId(res.data.lstResult[0].ChartOptionID)
						setflag(res.data.lstResult[0].ChartOption)
					}
				} else {
					alert(res['Error']);
				}

			})
	}

	async function addEditOption() {

		await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 12, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
			.then((res) => {
				document.getElementById('myDropdowniconproduct').style.display = 'none'
				Notify()

			})
	}

	function handleSorting() {
		document.getElementById("sorticonProduct").style.display === "block" ? document.getElementById("sorticonProduct").style.display = "none" : document.getElementById("sorticonProduct").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')

		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {
				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonProduct') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	function handleclickSort(e) {
		if (e.target.id !== 'sorticonProduct' && e.target.id !== '') {
			setflagSort(e.target.id)
		}
	}

	async function fetchSortData() {
		var inputForSort = { ...inputdata, 'SortByLabel': 'ProductName', 'SortBy': flagSort, ['Grouping']: 'i.ProductId,i.ProductName' }

		await post(inputForSort, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				let sale = [];
				var js = {};
				let data = [];
				let tempprc = [];
				if (res.data !== undefined) {
					for (let index = 0; index < res.data.lstResult.length; index++) {
						data.push({ value: res.data.lstResult[index][inputdata['column']], name: res.data.lstResult[index]['ProductName'] })
						if (res.data.lstResult[index]['ProductName'] === null) {
							name.push("null")
						} else {
							name.push(res.data.lstResult[index]['ProductName'])
						}
						weight.push(res.data.lstResult[index][inputdata['column']])
						js = { 'product': '', 'thisYearProfit': 0 }
						if (res.data.lstResult[index]['ProductName'] === null) {
							js['product'] = 'null'
						} else {
							js['product'] = res.data.lstResult[index]['ProductName']
						}
						js['thisYearProfit'] = res.data.lstResult[index][inputdata['column']]
						tempprc.push(res.data.lstResult[index]['Prc']);
						sale.push(js)

					}
					setprc(tempprc);
					setName(name)
					setdata(data);
					setweight(weight)
					setdataLoader(false)
					if (weight.length !== 0) {
						setLoader(false)
					} else {
						setLoader(true)
					}
					var j = []
					for (let index = 0; index < sale.length; index++) {
						j.push({ ...sale[index], ['color']: gradientArray[index] })
					}
					setSales(j)
				} else {
					alert(res['Error']);
				}

			})
	}




	return (
		<div class="col-lg-4 col-md-6 col-12">
			<div class="graph-card">
				<div class="card-title-graph">
					<div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
						<p><i class="fas fa-boxes"></i> Product Wise </p>
					</div>

					<div className="col-sm-2 col-md-2 col-2">
						{/* <i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} ></i> */}
						<div className='d-flex '>
							<div className='dropbtngraph'>
								<i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} />
							</div>
							<div className='dropbtngraph'>
								<i class="fa-solid fa-ellipsis-vertical" id='icon_drop' onClick={handleonchangeCurrency} />
							</div>
						</div>
						<div id="sorticonProduct" className="dropdown-contenticon" onClick={handleclickSort}>
							{flagSort === 'Label' ? <><a id='Label'>Sort by Product ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by Product ASC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by Product DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by Product DESC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
							{flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
						</div>
						{/* <img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img> */}
						<div className='btnicons'>
							<div id="myDropdowniconproduct" className="dropdown-contenticon" onClick={handleclick}>
								{flag === 'bar' ? <><a id='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' >Bar</a><hr className='custom-hr' /></>}
								{flag === 'donut' ? <><a id='donut' className='donut'>Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut' className='donut'>Donut</a><hr className='custom-hr' /></>}
								{flag === 'radialBar' ? <><a id='radialBar' className='radialBar'>Radial Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='radialBar' className='radialBar'>Radial Bar</a><hr className='custom-hr' /></>}
								{flag === 'pie' ? <><a id='pie' className='pie'>Pie Chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='pie' className='pie'>Pie chart </a><hr className='custom-hr' /></>}
								{flag === 'semidonut' ? <><a id='semidonut' className='semidonut'>Semi Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='semidonut' className='semidonut'>Semi Donut </a><hr className='custom-hr' /></>}
								<button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
								{/* <a id='heatmap' >Heat map</a><hr className='custom-hr' /> */}
							</div>
						</div>
					</div>


				</div>

				{dataloader !== true ?
					loader !== true ?
						<div class="crancy-progress-card card-contain-graph">

							{/* <ParentSize>{({ width, height }) => <Radialbar width={width} height={350} />}</ParentSize> */}

							{flag === 'bar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionbar))} /> : null}
							{flag === 'donut' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optiondonut))} /> : null}
							{flag === 'radialBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(radialdata))} /> : null}
							{flag === 'pie' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionpie))} /> : null}
							{flag === 'semidonut' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optradialbar))} /> : null}
						</div> :
						<div className="crancy-progress-card card-contain-graph"  >
							Not Found
						</div>
					:
					<div className="crancy-progress-card card-contain-graph">
						<div class="dot-spinner" style={{ margin: "auto", position: 'inherit' }} >
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
