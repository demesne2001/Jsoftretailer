import React, { useContext } from 'react'
import post from '../../Utility/APIHandle'
import { useEffect, useState } from 'react';
import API from '../../Utility/API';
import contex from '../../contex/Contex';
import '../../Assets/css/Custom.css'
import { useNavigate } from 'react-router-dom';
import Notify from '../Notification/Notify';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'
import DataError from '../../Assets/image/Error.gif'

export default function SalesAgingWise() {
	const [data, setdata] = useState([])
	const [loader, setLoader] = useState(true)
	const [dataloader, setdataLoader] = useState(true)
	const contexData = useContext(contex);
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;
	const navigate = useNavigate()
	const [optionId, setOptionId] = useState()
	const [flagSort, setflagSort] = useState('')
	const [flag, setflag] = useState("line")
	const ChartType = "line"
	const [prc, setprc] = useState([]);
	let optionline = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'line',
		height: '400px',
		width: '100%',
		chartId: 'SalesAgingWise',
		Xaxis: name,
		Yaxis: weight,
		tooltip: {
			formatter: `{b} <br> ${inputdata.column} - {c}${inputdata.column === 'Prc' ? '%' : ""}`,
			confine: true
		}
	}

	let optionarea = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'area',
		height: '400px',
		width: '100%',
		chartId: 'SalesAgingWise',
		Xaxis: name,
		Yaxis: weight,
		tooltip: {
			formatter: `{b} <br> ${inputdata.column} - {c}${inputdata.column === 'Prc' ? '%' : ""}`,
			confine: true
		}
	}

	let optionbar = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'bar',
		height: '400%',
		width: '100%',
		chartId: 'SalesAgingWise',
		Xaxis: name,
		Yaxis: weight,
		prclst: prc,
		tooltip: {
			formatter: `{b} <br> ${inputdata.column} - {c}${inputdata.column === 'Prc' ? '%' : ""}`,
			confine: true
		}
	}
	let radialdata = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'polar-radialbar',
		height: '100%',
		width: '100%',
		chartId: 'SalesAgingWise',
		radiusAxis: name,
		seriesdata: weight,
		tooltip: {
			formatter: `{b} <br> ${inputdata.column} - {c}${inputdata.column === 'Prc' ? '%' : ""}`,
			confine: true
		}
	}
	let optiondonut = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'donut',
		height: '100%',
		width: '100%',
		chartId: 'SalesAgingWise',
		propdata: data,
		radius: [10, 150],
		label: {
			show: false,
			position: 'center'
		},
		emphasis: {
			label: {
				show: true,
				fontSize: 20,
				fontWeight: 'bold'
			}
		},
		tooltip: {
			formatter: `{b} <br> ${inputdata.column} - {c}${inputdata.column === 'Prc' ? '%' : ""}`,
			confine: true
		}

	}

	let optionpie = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'simplepie',
		height: '100%',
		width: '100%',
		propdata: data,
		chartId: 'SalesAgingWise',
		label: {
			position: 'inside',
			formatter: '{d}%',
			color: 'white',
			fontWeight: 'bold',
		},
		tooltip: {
			formatter: `{b} <br> ${inputdata.column} - {c}${inputdata.column === 'Prc' ? '%' : ""}`,
			confine: true
		}
	}
	let optradialbar = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'semi-donut',
		height: '100%',
		width: '100%',
		chartId: 'SalesAgingWise',
		propdata: data,
		position: 'center',
		fontsize: 20,
		label: {
			show: false,
			position: 'center'
		},
		emphasis: {
			label: {
				show: true,
				fontSize: 20,
				fontWeight: 'bold'
			}
		},
		tooltip: {
			formatter: `{b} <br> ${inputdata.column} - {c}${inputdata.column === 'Prc' ? '%' : ""}`,
			confine: true
		}
	}
	let optionPolar = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'pie',
		height: '100%',
		width: '100%',
		chartId: 'SalesAgingWise',
		propdata: data,
		radius: [10, 110],
		tooltip: {
			formatter: `{b} <br> ${inputdata.column} - {c}${inputdata.column === 'Prc' ? '%' : ""}`,
			confine: true
		}
	}

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

		inputdata = { ...inputdata, ['Grouping']: 'a.[rd.caption]', ['SortByLabel']: '[rd.caption]' }

		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				let data = [];
				let tempprc = [];
				if (res.data !== undefined) {
					for (let index = 0; index < res.data.lstResult.length; index++) {
						if (res.data.lstResult[index]['rd.caption'] === null) {
							name.push("null")
							data.push({ name: "null", value: res.data.lstResult[index][inputdata['column']] })
						} else {
							name.push(res.data.lstResult[index]['rd.caption'])
							data.push({ name: res.data.lstResult[index]['rd.caption'], value: res.data.lstResult[index][inputdata['column']] })
						}
						weight.push(res.data.lstResult[index][inputdata['column']])
						tempprc.push(res.data.lstResult[index]['Prc']);
					}
					setprc(tempprc);
					setdata(data)
					setName(name)
					setweight(weight)
					setdataLoader(false)
					if (weight.length !== 0) {
						setLoader(false)
					} else {
						setLoader(true)
					}
					inputdata = { ...inputdata, ['Grouping']: '' }
				} else {
					alert(res['Error']);;
				}
			})
	}

	function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "a.[rd.caption]", columnName: "rd.caption", columnID: "rd.caption", componentName: "Sales Aging Wise", filterKey: "strSaleAging", chartId: 16, FromDate: inputdata.FromDate, ToDate: inputdata.ToDate }, replace: true })
	}


	function handleonchangeCurrency() {

		document.getElementById("myDropdowniconSalesAging").style.display === "block" ? document.getElementById("myDropdowniconSalesAging").style.display = "none" : document.getElementById("myDropdowniconSalesAging").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')
		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {

				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconSalesAging') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	document.getElementById("root").addEventListener("click", function (event) {

		if (event.target.id !== 'icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
			if (document.getElementById("myDropdowniconSalesAging") !== null) {
				document.getElementById("myDropdowniconSalesAging").style.display = "none"
				document.getElementById("sorticonSalesAging").style.display = "none"
			}
		}

	});

	async function fetchOption() {
		await post({ "ID": 16, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

			.then((res) => {
				if (res.data !== undefined) {
					if (res.data.lstResult.length === 0) {
						setflag(ChartType)
						post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 16, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
							.then((res) => {

								post({ "ID": 16, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
									.then((res) => {
										if (res.data !== undefined) {
											if (res.data.lstResult.length !== 0) {
												setOptionId(res.data.lstResult[0].ChartOptionID)
											}
										} else {
											alert(res['Error']);
										}
									})
								Notify()
							})

					}
					else {
						if (res.data.lstResult.length !== 0) {
							setOptionId(res.data.lstResult[0].ChartOptionID)
							setflag(res.data.lstResult[0].ChartOption)
						}
					}
				} else {
					alert(res['Error']);
				}

			})
	}

	async function addEditOption() {

		await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 16, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
			.then((res) => {
				document.getElementById('myDropdowniconSalesAging').style.display = 'none'
				Notify()

			})
	}

	function handleSorting() {
		document.getElementById("sorticonSalesAging").style.display === "block" ? document.getElementById("sorticonSalesAging").style.display = "none" : document.getElementById("sorticonSalesAging").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')

		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {
				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonSalesAging') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	function handleclickSort(e) {
		if (e.target.id !== 'sorticonSalesAging' && e.target.id !== '') {
			setflagSort(e.target.id)
		}
	}

	async function fetchSortData() {
		var inputForSort = { ...inputdata, 'SortByLabel': '[rd.caption]', 'SortBy': flagSort, ['Grouping']: 'a.[rd.caption]' }

		await post(inputForSort, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				let data = [];
				let tempprc = [];
				if (res.data !== undefined) {
					for (let index = 0; index < res.data.lstResult.length; index++) {
						if (res.data.lstResult[index]['rd.caption'] === null) {
							name.push("null")
							data.push({ name: "null", value: res.data.lstResult[index][inputdata['column']] })
						} else {
							name.push(res.data.lstResult[index]['rd.caption'])
							data.push({ name: res.data.lstResult[index]['rd.caption'], value: res.data.lstResult[index][inputdata['column']] })
						}
						weight.push(res.data.lstResult[index][inputdata['column']])
						tempprc.push(res.data.lstResult[index]['Prc']);
					}
					setprc(tempprc);
					setdata(data)
					setName(name)
					setweight(weight)
					setdataLoader(false)
					if (weight.length !== 0) {
						setLoader(false)
					} else {
						setLoader(true)
					}
					inputdata = { ...inputdata, ['Grouping']: '' }
				} else {
					alert(res['Error']);
				}
			})
	}



	return (
		<div class="col-lg-12 col-md-6 col-12">
			<div class="graph-card">
				<div class="card-title-graph">
					<div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
						<p><i class="fas fa-chart-line"></i> Sales Aging Wise</p>
					</div>
					<div className="col-sm-2 col-md-2 col-2">
						<div className='d-flex '>
							<div className='dropbtngraph'>
								<i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} />
							</div>
							<div className='dropbtngraph'>
								<i class="fa-solid fa-ellipsis-vertical" id='icon_drop' onClick={handleonchangeCurrency} />
							</div>
						</div>
						<div id="sorticonSalesAging" className="dropdown-contenticon" onClick={handleclickSort} >
							{flagSort === 'Label' ? <><a id='Label'>Sort by SalesAging ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by SalesAging ASC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by SalesAging DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by SalesAging DESC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
							{flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
						</div>
						<div className='btnicons'>
							<div id="myDropdowniconSalesAging" className="dropdown-contenticon" onClick={handleclick}>
								{flag === 'line' ? <><a id='line' className='line' >line&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='line' className='line' >line </a><hr className='custom-hr' /></>}
								{flag === 'area' ? <><a id='area' className='area'>area chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='area' className='area'>area chart</a><hr className='custom-hr' /></>}
								{flag === 'polarArea' ? <><a id='polarArea' >Polar Area&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='polarArea' >Polar Area</a><hr className='custom-hr' /></>}
								{flag === 'bar' ? <><a id='bar' className='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' className='bar' >Bar</a><hr className='custom-hr' /></>}
								{flag === 'donut' ? <><a id='donut' className='donut'>Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut' className='donut'>Donut</a><hr className='custom-hr' /></>}
								{flag === 'radialBar' ? <><a id='radialBar' className='radialBar'>Radial Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='radialBar' className='radialBar'>Radial Bar</a><hr className='custom-hr' /></>}
								{flag === 'pie' ? <><a id='pie' className='pie'>Pie Chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='pie' className='pie'>Pie chart </a><hr className='custom-hr' /></>}
								{flag === 'semidonut' ? <><a id='semidonut' className='semidonut'>Semi Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='semidonut' className='semidonut'>Semi Donut </a><hr className='custom-hr' /></>}
								<button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
							</div>
						</div>
					</div>
				</div>

				{dataloader !== true ?
					loader !== true ?
						<div class="crancy-progress-card card-contain-graph">

							{flag === 'line' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionline))} /> : null}
							{flag === 'area' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionarea))} /> : null}
							{flag === 'polarArea' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionPolar))} /> : null}
							{flag === 'bar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionbar))} /> : null}
							{flag === 'donut' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optiondonut))} /> : null}
							{flag === 'radialBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(radialdata))} /> : null}
							{flag === 'pie' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionpie))} /> : null}
							{flag === 'semidonut' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optradialbar))} /> : null}
						</div> :
						<div className="crancy-progress-card card-contain-graph"  >
							<img id='errorImg' src={DataError} />
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
