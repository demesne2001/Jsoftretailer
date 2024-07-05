import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import contex from '../../contex/Contex';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import '../../Assets/css/Custom.css'
import Notify from '../Notification/Notify';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'
import DataError from '../../Assets/image/Error.gif'

export default function StateWise() {
	const [loader, setLoader] = useState(true)
	const [dataloader, setdataLoader] = useState(true)
	const contexData = useContext(contex)
	const [state, setState] = useState([]);
	const navigate = useNavigate()
	let inputdata = contexData.state;
	const [flag, setflag] = useState()
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	const [optionId, setOptionId] = useState()
	const [flagSort, setflagSort] = useState('');
	const [data, setdata] = useState([]);
	const [Map, setMap] = useState([]);
	const [prc, setprc] = useState([]);

	let semiDonut = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'semi-donut',
		height: '380px',
		width: '100%',
		chartId: 'StateWise',
		propdata: data,
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
	let map = {
		themeId: localStorage.getItem("ThemeIndex"),
		propdata: Map,
		charttype: 'map',
		height: '100%',
		width: '100%',
		chartId: 'StateWise',
		tooltip: {
			formatter: `{b} <br> ${inputdata.column} - {c}${inputdata.column === 'Prc' ? '%' : ""}`,
			confine: true
		}
	}
	let treemap = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'treemap',
		height: '100%',
		width: '100%',
		seriesdata: [
			{
				data: state
			}
		],
		column: inputdata.column
	}
	var optionbar = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'bar',
		height: '400%',
		width: '100%',
		chartId: 'StateWise',
		Xaxis: name,
		Yaxis: weight,
		prclst: prc,
		tooltip: {
			formatter: `{b} <br> ${inputdata.column} - {c}${inputdata.column === 'Prc' ? '%' : ""}`,
			confine: true
		}
	}
	var barHorizontal = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'round-horizontal-bar',
		height: '100%',
		width: '100%',
		chartId: 'StateWise',
		Xaxis: name,
		Yaxis: weight,
		divname: 'crancy-progress-card card-contain-graph',
		prclst: prc,
		tooltip: {
			formatter: `{b} <br> ${inputdata.column} - {c}${inputdata.column === 'Prc' ? '%' : ""}`,
			confine: true
		}
	}
	const ChartType = "treemap"
	function handleclick(e) {

		if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconstate' && e.target.id !== '') {

			setflag(e.target.id)
		}
		else {

		}

	}

	useEffect(() => {
		if (flagSort !== '') {
			fetchSortData()
		}
	}, [flagSort])

	useEffect(() => {
		fetchOption()

		getdata()

	}, [inputdata])

	async function getdata() {
		inputdata = { ...inputdata, ['Grouping']: 'k.stateID,k.Statename', ['SortByLabel']: 'Statename' }

		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = []
				let name1 = [];
				let weight = [];
				let data = [];
				let map = [];
				let tempprc = [];
				if (res.data !== undefined) {
					for (let index = 0; index < res.data.lstResult.length; index++) {
						if (res.data.lstResult[index]['Statename'] != null) {
							name.push({ x: res.data.lstResult[index]['Statename'], y: res.data.lstResult[index][inputdata['column']] })
							name1.push(res.data.lstResult[index]['Statename'])
							data.push({ value: res.data.lstResult[index]['NetWeight'], name: res.data.lstResult[index]['Statename'] })
							map.push({ name: res.data.lstResult[index]['Statename'], value: res.data.lstResult[index]['NetWeight'] })
						}
						weight.push(res.data.lstResult[index][inputdata['column']])
						tempprc.push(res.data.lstResult[index]['Prc']);
					}

					setdata(data)
					setState(name)
					setName(name1)
					setweight(weight)
					setprc(tempprc);
					setMap(map)
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

		document.getElementById("myDropdowniconstate").style.display === "block" ? document.getElementById("myDropdowniconstate").style.display = "none" : document.getElementById("myDropdowniconstate").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')
		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {

				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconstate') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}

	}
	document.getElementById("root").addEventListener("click", function (event) {

		if (event.target.id !== 'icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
			if (document.getElementById("myDropdowniconstate") !== null) {
				document.getElementById("myDropdowniconstate").style.display = "none"
				document.getElementById("sorticonState").style.display = "none"
			}
		}

	});
	function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "k.stateID,k.Statename", columnName: "Statename", columnID: "stateID", componentName: "State Wise", filterKey: "strState", chartId: 2, FromDate: inputdata.FromDate, ToDate: inputdata.ToDate }, replace: true })
	}

	async function fetchOption() {
		await post({ "ID": 2, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

			.then((res) => {
				if (res.data !== undefined) {
					if (res.data.lstResult.length === 0) {


						setflag(ChartType)
						post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 2, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
							.then((res) => {
								post({ "ID": 2, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
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

		await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 2, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
			.then((res) => {
				document.getElementById('myDropdowniconstate').style.display = 'none'
				Notify()

			})
	}

	function handleSorting() {
		document.getElementById("sorticonState").style.display === "block" ? document.getElementById("sorticonState").style.display = "none" : document.getElementById("sorticonState").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')

		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {
				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonState') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	function handleclickSort(e) {
		if (e.target.id !== 'sorticonState' && e.target.id !== '') {
			setflagSort(e.target.id)
		}
	}

	async function fetchSortData() {
		var inputForSort = { ...inputdata, 'SortByLabel': 'Statename', 'SortBy': flagSort, ['Grouping']: 'k.stateID,k.Statename' }

		await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
			let name = []
			let name1 = [];
			let weight = [];
			let data = [];
			let map = [];
			let tempprc = [];
			if (res.data !== undefined) {
				for (let index = 0; index < res.data.lstResult.length; index++) {
					if (res.data.lstResult[index]['Statename'] != null) {
						name.push({ x: res.data.lstResult[index]['Statename'], y: res.data.lstResult[index][inputdata['column']] })
						name1.push(res.data.lstResult[index]['Statename'])
						data.push({ value: res.data.lstResult[index]['NetWeight'], name: res.data.lstResult[index]['Statename'] })
						map.push({ name: res.data.lstResult[index]['Statename'], value: res.data.lstResult[index]['NetWeight'] })
					}
					weight.push(res.data.lstResult[index][inputdata['column']])
					tempprc.push(res.data.lstResult[index]['Prc']);
				}
				setdata(data)
				setState(name)
				setName(name1)
				setweight(weight)
				setprc(tempprc);
				setMap(map)
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

						<p><i className="fas fa-map-marker-alt"></i> State Wise</p>

					</div>

					<div className="col-sm-2 col-md-2 col-2" >
						<div className='d-flex '>
							<div className='dropbtngraph'>
								<i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} />
							</div>
							<div className='dropbtngraph'>
								<i class="fa-solid fa-ellipsis-vertical" id='icon_drop' onClick={handleonchangeCurrency} />
							</div>
						</div>
						<div id="sorticonState" className="dropdown-contenticon" onClick={handleclickSort}>
							{flagSort === 'Label' ? <><a id='Label'>Sort by State ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by State ASC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by State DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by State DESC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
							{flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
						</div>
						<div className='btnicons'>

							<div id="myDropdowniconstate" className="dropdown-contenticon" onClick={handleclick}>
								{flag === 'map' ? <><a id='map'>Map &nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='map'>Map</a><hr className='custom-hr' /></>}
								{flag === 'treemap' ? <><a id='treemap'>Tree map &nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='treemap'>Tree map</a><hr className='custom-hr' /></>}
								{flag === 'donut' ? <><a id='donut'>Semi donut &nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut'>Semi donut </a><hr className='custom-hr' /></>}
								{flag === 'bar' ? <><a id='bar'>Bar &nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar'>Bar</a><hr className='custom-hr' /></>}
								{flag === 'hbar' ? <><a id='hbar'>Horizantal Bar &nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='hbar'>Horizantal Bar</a><hr className='custom-hr' /></>}
								<button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
							</div>
						</div>

					</div>
				</div>
				{dataloader !== true ?
					loader !== true ?
						<>

							<div className="crancy-progress-card card-contain-graph">
								{flag === 'map' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(map))} /> : null}
								{flag === 'donut' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(semiDonut))} /> : null}
								{flag === 'treemap' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(treemap))} /> : null}
								{flag === 'bar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionbar))} /> : null}
								{flag === 'hbar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(barHorizontal))} /> : null}
							</div>
							<div id="html-dist"></div></> :
						<div className="crancy-progress-card card-contain-graph"  >
							<img src={DataError} style={{ height: '80%', width: '80%' }} />
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
