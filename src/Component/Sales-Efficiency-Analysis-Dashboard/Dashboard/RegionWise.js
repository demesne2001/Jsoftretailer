import React, { useContext } from 'react'

import ReactApexChart from 'react-apexcharts';
import { RegionWise_lolipop } from '../../ChartOptions/RegionWise_lolipop';
import { RegionWise_Polar } from '../../ChartOptions/RegionWise_Polar';
import BlackDots from '../../Assets/image/Dots.png'
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import { useEffect, useState } from 'react';
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import { useNavigate } from 'react-router-dom';
import { BranchWise_donut } from '../../ChartOptions/BranchWise_donut';
import Notify from '../Notification/Notify';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'



export default function RegionWise() {
	const [data, setdata] = useState([])
	const contexData = useContext(contex);
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;
	const [loader, setLoader] = useState(true)
	const [dataloader, setdataLoader] = useState(true)
	const [flag, setflag] = useState()
	const [optionId, setOptionId] = useState()
	const ChartType = "bar"
	const [flagSort, setflagSort] = useState('')
	let localloader = localStorage.getItem('load')
	const options_lolipop = RegionWise_lolipop(name, inputdata['column'])
	const options_polar = RegionWise_Polar(name, inputdata['column'])
	const options_donut = BranchWise_donut(name, inputdata['column'])
	const [prc, setprc] = useState([]);
	let optionDonut = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'donut',
		height: '100%',
		width: '100%',
		chartId: 'RegionWise',
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
		}
	}
	let optionPolar = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'pie',
		height: '100%',
		width: '100%',
		chartId: 'RegionWise',
		propdata: data,
		radius: [10, 110],
	}
	let gradientbar = {
		themeId: localStorage.getItem("ThemeIndex"),
		height: '400px',
		width: '100%',
		labelcolor: '#000',
		chartId: 'RegionWisegradient',
		charttype: 'gradient-bar',
		Xaxis: name,
		Yaxis: weight
	}
	let radialdata = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'polar-radialbar',
		height: '100%',
		width: '100%',
		chartId: 'RegionWise',
		radiusAxis: name,
		seriesdata: weight,
	}
	let optionpie = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'simplepie',
		height: '100%',
		width: '100%',
		propdata: data,
		chartId: 'PieChartRegionWise',
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
		chartId: 'RadialBarchartRegionWise',
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
		}
	}
	let roundedBarHorizontal = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'round-horizontal-bar',
		height: '100%',
		width: '100%',
		chartId: 'RegionWise',
		Xaxis: name,
		color: ['#0073b0', '#caf77d', '#8bd9e8', '#c4e8f0'],
		Yaxis: weight,
		divname: 'crancy-progress-card card-contain-graph',
		prclst:prc
	}
	const series_lolipop = [{
		name: 'Weight',
		data: weight
	}]
	const series_polar = weight

	const navigate = useNavigate()

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

		inputdata = { ...inputdata, ['Grouping']: 'l.RegionID,l.RegionName', ['SortByLabel']: 'RegionName' }

		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				let data = [];
				let tempprc = [];
				if (res.data !== undefined) {
					for (let index = 0; index < res.data.lstResult.length; index++) {
						if (res.data.lstResult[index]['RegionName'] === null) {
							name.push("null")
							data.push({ value: res.data.lstResult[index]['NetWeight'], name: 'null' })
						} else {
							name.push(res.data.lstResult[index]['RegionName'])
							data.push({ value: res.data.lstResult[index]['NetWeight'], name: res.data.lstResult[index]['RegionName'] })
						}
						tempprc.push(res.data.lstResult[index]['Prc']);
						weight.push(res.data.lstResult[index][inputdata['column']])
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
	function handleonchangeCurrency() {

		document.getElementById("myDropdowniconregion").style.display === "block" ? document.getElementById("myDropdowniconregion").style.display = "none" : document.getElementById("myDropdowniconregion").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')
		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {

				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconregion') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	document.getElementById("root").addEventListener("click", function (event) {

		if (event.target.id !== 'icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
			if (document.getElementById("myDropdowniconregion") !== null) {
				document.getElementById("myDropdowniconregion").style.display = "none"
				document.getElementById("sorticonRegion").style.display = "none"
			}
		}

	});
	function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "l.RegionID,l.RegionName", columnName: "RegionName", columnID: "RegionID", componentName: "Region Wise", filterKey: "strRegionID", chartId: 4 , FromDate: inputdata.FromDate, ToDate : inputdata.ToDate}, replace: true })
	}

	async function fetchOption() {
		await post({ "ID": 4, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

			.then((res) => {
				if (res.data !== undefined) {
					if (res.data.lstResult.length === 0) {
						setflag(ChartType)

						setflag(ChartType)
						post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 4, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
							.then((res) => {
								post({ "ID": 4, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
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

		await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 4, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
			.then((res) => {
				document.getElementById('myDropdowniconregion').style.display = 'none'
				Notify()

			})
	}

	function handleSorting() {
		document.getElementById("sorticonRegion").style.display === "block" ? document.getElementById("sorticonRegion").style.display = "none" : document.getElementById("sorticonRegion").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')

		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {
				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonRegion') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	function handleclickSort(e) {
		if (e.target.id !== 'sorticonRegion' && e.target.id !== '') {
			setflagSort(e.target.id)
		}
	}

	async function fetchSortData() {
		var inputForSort = { ...inputdata, 'SortByLabel': 'RegionName', 'SortBy': flagSort, ['Grouping']: 'l.RegionID,l.RegionName' }

		await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
			let name = [];
			let weight = [];
			let data = [];
			let tempprc = [];
			if (res.data !== undefined) {
				for (let index = 0; index < res.data.lstResult.length; index++) {
					if (res.data.lstResult[index]['RegionName'] === null) {
						name.push("null")
						data.push({ value: res.data.lstResult[index]['NetWeight'], name: 'null' })
					} else {
						name.push(res.data.lstResult[index]['RegionName'])
						data.push({ value: res.data.lstResult[index]['NetWeight'], name: res.data.lstResult[index]['RegionName'] })
					}
					tempprc.push(res.data.lstResult[index]['Prc']);
					weight.push(res.data.lstResult[index][inputdata['column']])
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
		<div className="col-lg-4 col-md-6 col-12">
			<div className="graph-card">
				<div className="card-title-graph">
					<div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation} >
						<p><i className="fas fa-globe"></i> Region Wise</p>
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
						<div id="sorticonRegion" className="dropdown-contenticon" onClick={handleclickSort}>
							{flagSort === 'Label' ? <><a id='Label'>Sort by Region ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by Region ASC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by Region DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by Region DESC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
							{flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
						</div>
						{/* <img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img> */}
						<div className='btnicons'>
							<div id="myDropdowniconregion" className="dropdown-contenticon" onClick={handleclick}>
								{flag === 'polarArea' ? <><a id='polarArea' >Polar Area&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='polarArea' >Polar Area</a><hr className='custom-hr' /></>}
								{flag === 'donut' ? <><a id='donut' >donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut' >donut</a><hr className='custom-hr' /></>}
								{flag === 'radialBar' ? <><a id='radialBar' >Radial Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='radialBar' >Radial Bar</a><hr className='custom-hr' /></>}
								{flag === 'pie' ? <><a id='pie' >Pie&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='pie' >Pie</a><hr className='custom-hr' /></>}
								{flag === 'semidonut' ? <><a id='semidonut' >Semi Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='semidonut' >Semi Donut</a><hr className='custom-hr' /></>}
								{flag === 'bar' ? <><a id='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' >Bar</a><hr className='custom-hr' /></>}
								<button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
							</div>
						</div>

					</div>

					{/* <i class="fas fa-external-link-alt"></i> */}
				</div>

				{dataloader !== true ?
					loader !== true ?
						<div className="crancy-progress-card card-contain-graph">
							{flag === 'polarArea' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionPolar))} /> : null}
							{flag === 'donut' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionDonut))} /> : null}
							{flag === 'polarbar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(gradientbar))} /> : null}
							{flag === 'radialBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(radialdata))} /> : null}
							{flag === 'pie' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionpie))} /> : null}
							{flag === 'semidonut' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optradialbar))} /> : null}
							{flag === 'bar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(roundedBarHorizontal))} /> : null}

							{/* <Cylinder/> */}
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
