import React, { useContext, useEffect, useState } from 'react'
import Gradient from "javascript-color-gradient";
import ReactApexChart from 'react-apexcharts';
import BlackDots from '../../Assets/image/Dots.png'
import post from '../../Utility/APIHandle'
import API from '../../Utility/API';
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import { SalesPartyWiseLolipop } from '../../ChartOptions/SalesPartyWiseLolipop';
import { SalesPartyWise_bar } from '../../ChartOptions/SalesPartyWise_bar';
import { useNavigate } from 'react-router-dom';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'
import '../../Assets/css/Custom.css'
import Notify from '../Notification/Notify';

export default function SalesPartyWise() {
	const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()


	const contexData = useContext(contex);
	const [sales, setSales] = useState([])
	let inputdata = contexData.state;
	const [loader, setLoader] = useState(true)
	const [dataloader, setdataLoader] = useState(true)
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	const [data, setdata] = useState([])
	const [flag, setflag] = useState()
	const ChartType = "bar"
	const [demo, setdemo] = useState("bar")
	const [optionId, setOptionId] = useState()
	const [flagSort, setflagSort] = useState('')
	const navigate = useNavigate()
	let optionbar = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'bar',
		height: '400%',
		width: '100%',
		chartId: 'Sales Party Wise',
		Xaxis: name,
		Yaxis: weight,
	}
	let radialdata = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'polar-radialbar',
		height: '100%',
		width: '100%',
		chartId: 'Sales Party Wise',
		radiusAxis: name,
		seriesdata: weight,
	}
	let optiondonut = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'donut',
		height: '100%',
		width: '100%',
		chartId: 'Sales Party Wise',
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

	let optionpie = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'simplepie',
		height: '100%',
		width: '100%',
		propdata: data,
		chartId: 'PieChartSales Party Wise',
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
		chartId: 'RadialBarchartSales Party Wise',
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
	let optionPolar = {
		themeId: localStorage.getItem("ThemeIndex"),
		charttype: 'pie',
		height: '100%',
		width: '100%',
		chartId: 'Sales Party Wise',
		propdata: data,
		radius: [10, 110],
	}
	const options_lolipop = SalesPartyWiseLolipop(name, inputdata['column'])
	const options_bar = SalesPartyWise_bar(name, inputdata['column'])
	const series = [{
		name: 'Weight',
		data: weight
	}]

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
	// useEffect(() => {
	// 	gradientdata()
	// }, [sales])

	async function getdata() {

		inputdata = { ...inputdata, ['Grouping']: 'a.accountID,c.AccountName', ['SortByLabel']: 'AccountName' }

		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let sale = [];
				var js = {};
				let name = [];
				let weight = [];
				let data = []
				if (res.data !== undefined) {
					for (let index = 0; index < res.data.lstResult.length; index++) {
						data.push({ value: res.data.lstResult[index][inputdata['column']], name: res.data.lstResult[index]['AccountName'] })

						if (res.data.lstResult[index]['AccountName'] === null) {
							name.push("null")
						} else {
							name.push(res.data.lstResult[index]['AccountName'])
						}
						weight.push(res.data.lstResult[index][inputdata['column']])


						js = { 'product': '', 'thisYearProfit': 0 }
						if (res.data.lstResult[index]['AccountName'] === null) {
							js['product'] = 'null'
						} else {
							js['product'] = res.data.lstResult[index]['AccountName']
						}
						js['thisYearProfit'] = res.data.lstResult[index][inputdata['column']]

						sale.push(js)

					}
					// setSales(sale)
					var j = []
					for (let index = 0; index < sale.length; index++) {
						j.push({ ...sale[index], ['color']: gradientArray[index] })
					}
					setdata(data)
					setName(name)
					setweight(weight)
					setSales(j)
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



	// function gradientdata() {
	// 	var j = []
	// 	for (let index = 0; index < sales.length; index++) {
	// 		j.push({ ...sales[index], ['color']: gradientArray[index] })
	// 	}
	// 	setSales(j)
	// }



	function handleonchangeCurrency() {

		document.getElementById("myDropdowniconSalesparty").style.display === "block" ? document.getElementById("myDropdowniconSalesparty").style.display = "none" : document.getElementById("myDropdowniconSalesparty").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')
		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {

				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconSalesparty') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	document.getElementById("root").addEventListener("click", function (event) {

		if (event.target.id !== 'icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
			if (document.getElementById("myDropdowniconSalesparty") !== null) {
				document.getElementById("myDropdowniconSalesparty").style.display = "none"
				document.getElementById("sorticonSalesParty").style.display = "none"
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

	function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "a.accountID,c.AccountName", columnName: "AccountName", columnID: "accountID", componentName: "Sales Party Wise", filterKey: "strSalesParty", chartId: 10, FromDate: inputdata.FromDate, ToDate : inputdata.ToDate }, replace: true })
	}

	async function fetchOption() {
		await post({ "ID": 10, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

			.then((res) => {
				if (res.data !== undefined) {
					if (res.data.lstResult.length === 0) {
						setflag(ChartType)

						post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 10, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
							.then((res) => {

								post({ "ID": 10, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
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

		await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 13, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
			.then((res) => {
				document.getElementById('myDropdowniconSalesparty').style.display = 'none'
				Notify()

			})
	}

	function handleSorting() {
		document.getElementById("sorticonSalesParty").style.display === "block" ? document.getElementById("sorticonSalesParty").style.display = "none" : document.getElementById("sorticonSalesParty").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')

		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {
				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonSalesParty') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	function handleclickSort(e) {
		setflagSort(e.target.id)
	}


	async function fetchSortData() {
		var inputForSort = { ...inputdata, 'SortByLabel': 'AccountName', 'SortBy': flagSort, ['Grouping']: 'a.accountID,c.AccountName' }

		await post(inputForSort, API.CommonChart, {}, 'post')
			.then((res) => {
				let sale = [];
				var js = {};
				let name = [];
				let weight = [];
				if (res.data !== undefined) {
					for (let index = 0; index < res.data.lstResult.length; index++) {
						if (res.data.lstResult[index]['AccountName'] === null) {
							name.push("null")
						} else {
							name.push(res.data.lstResult[index]['AccountName'])
						}
						weight.push(res.data.lstResult[index][inputdata['column']])


						js = { 'product': '', 'thisYearProfit': 0 }
						if (res.data.lstResult[index]['AccountName'] === null) {
							js['product'] = 'null'
						} else {
							js['product'] = res.data.lstResult[index]['AccountName']
						}
						js['thisYearProfit'] = res.data.lstResult[index][inputdata['column']]

						sale.push(js)

					}
					// setSales(sale)
					var j = []
					for (let index = 0; index < sale.length; index++) {
						j.push({ ...sale[index], ['color']: gradientArray[index] })
					}

					setName(name)
					setweight(weight)
					setSales(j)
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
					<div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
						<p><i className="fas fa-handshake"></i> Sales Party Wise</p>
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
						{/* <i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} ></i> */}
						<div id="sorticonSalesParty" className="dropdown-contenticon" onClick={handleclickSort}>
							{flagSort === 'Label' ? <><a id='Label'>Sort by SalesParty ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by SalesParty ASC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by SalesParty DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by SalesParty DESC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
							{flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
						</div>
						{/* <img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img> */}
						<div className='btnicons'>
							<div id="myDropdowniconSalesparty" className="dropdown-contenticon" onClick={handleclick}>
								{flag === 'polarArea' ? <><a id='polarArea' >Polar Area&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='polarArea' >Polar Area</a><hr className='custom-hr' /></>}
								{flag === 'bar' ? <><a id='bar' className='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' className='bar' >Bar</a><hr className='custom-hr' /></>}
								{flag === 'donut' ? <><a id='donut' className='donut'>Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut' className='donut'>Donut</a><hr className='custom-hr' /></>}
								{flag === 'radialBar' ? <><a id='radialBar' className='radialBar'>Radial Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='radialBar' className='radialBar'>Radial Bar</a><hr className='custom-hr' /></>}
								{flag === 'pie' ? <><a id='pie' className='pie'>Pie Chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='pie' className='pie'>Pie chart </a><hr className='custom-hr' /></>}
								{flag === 'semidonut' ? <><a id='semidonut' className='semidonut'>Semi Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='semidonut' className='semidonut'>Semi Donut </a><hr className='custom-hr' /></>}

								<button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
								{/* <a id='pie' >Pie chart </a><hr className='custom-hr' /> */}
							</div>
						</div>
					</div>
				</div>


				{dataloader !== true ?
					loader !== true ?
						<div className="crancy-progress-card card-contain-graph">
							{flag === 'polarArea' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionPolar))} /> : null}
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
