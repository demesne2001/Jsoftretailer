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
import { useNavigate } from 'react-router-dom';
import Notify from '../Notification/Notify';


export default function CityWise() {
	const [loader, setLoader] = useState(true)
	const [dataloader, setdataLoader] = useState(true)
	const contexData = useContext(contex);
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;
	const [optionId, setOptionId] = useState()
	const [flagSort, setflagSort] = useState("")
	const options_lolipop = CityWise_LoliMap(name, inputdata['column'])
	const options_bar = CityWise_Bar(name, inputdata['column']);
	const series_lolipop = [{
		name: 'Weight',
		data: weight
	}]
	const series_bar = [{
		data: weight
	}]

	useEffect(() => {
		fetchOption();
	
			getdata()
	
	}, [inputdata])

	useEffect(() => {
		if (flagSort !== "") {
			fetchSortData()
		}
	}, [flagSort])

	const [sales, setSales] = useState([])

	const [flag, setflag] = useState()
	const ChartType = "treemap"

	const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()

	const navigate = useNavigate()

	function handleclick(e) {

		if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconcity' && e.target.id !== '') {

			setflag(e.target.id)
		}
		else {

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

		inputdata = { ...inputdata, ['Grouping']: 'c.cityname', ['SortByLabel']: 'cityname' }

		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				let sale = [];
				var js = {};


				for (let index = 0; index < res.data.lstResult.length; index++) {
					name.push(res.data.lstResult[index]['cityname'])
					weight.push(res.data.lstResult[index][inputdata['column']])
					js = { 'product': '', 'thisYearProfit': 0 }
					if (res.data.lstResult[index]['cityname'] === null) {
						js['product'] = 'null'
					} else {
						js['product'] = res.data.lstResult[index]['cityname']
					}
					js['thisYearProfit'] = res.data.lstResult[index][inputdata['column']]

					sale.push(js)
				}
				setName(name)
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


			})
	}

	// function handledropdownMenu() {
	// 	document.getElementById("myDropdownCity").style.display === "block" ? document.getElementById("myDropdownCity").style.display = "none" : document.getElementById("myDropdownCity").style.display = "block";
	// }



	// function handleSelectedChart(num) {
	// 	// setBranchWiseChart(num)
	// }


	function handleonchangeCurrency() {

		document.getElementById("myDropdowniconcity").style.display === "block" ? document.getElementById("myDropdowniconcity").style.display = "none" : document.getElementById("myDropdowniconcity").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')
		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {

				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconcity') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}


	document.getElementById("root").addEventListener("click", function (event) {

		if (event.target.id !== 'icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
			if (document.getElementById("myDropdowniconcity") !== null) {
				document.getElementById("myDropdowniconcity").style.display = "none"
				document.getElementById("sorticoncity").style.display = "none"
			}
		}

	});

	function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "c.cityname", columnName: "cityname", columnID: "cityname", componentName: "City Wise", filterKey: "strCity", chartId: 3 }, replace: true })
	}

	async function fetchOption() {
		await post({ "ID": 3, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

			.then((res) => {
				setflag(ChartType)
				if (res.data.lstResult.length === 0) {

					setflag(ChartType)
					post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 3, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
						.then((res) => {
							post({ "ID": 3, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
								.then((res) => {
									setOptionId(res.data.lstResult[0].ChartOptionID)
								})

								Notify()
						})

				}
				else {

					setOptionId(res.data.lstResult[0].ChartOptionID)
					setflag(res.data.lstResult[0].ChartOption)
				}

			})
	}

	async function addEditOption() {

		await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 3, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
			.then((res) => {

				document.getElementById('myDropdowniconcity').style.display = 'none'
				Notify()

			})
	}

	function handleSorting() {
		document.getElementById("sorticoncity").style.display === "block" ? document.getElementById("sorticoncity").style.display = "none" : document.getElementById("sorticoncity").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')

		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {
				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticoncity') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	function handleclickSort(e) {
		if (e.target.id !== 'sorticoncity' && e.target.id !== '') {
			setflagSort(e.target.id)
		}
	}

	async function fetchSortData() {
		var inputForSort = { ...inputdata, 'SortByLabel': 'cityname', 'SortBy': flagSort, ['Grouping']: 'c.cityname' }

		await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
			let name = [];
			let weight = [];
			let sale = [];
			var js = {};


			for (let index = 0; index < res.data.lstResult.length; index++) {
				name.push(res.data.lstResult[index]['cityname'])
				weight.push(res.data.lstResult[index][inputdata['column']])
				js = { 'product': '', 'thisYearProfit': 0 }
				if (res.data.lstResult[index]['cityname'] === null) {
					js['product'] = 'null'
				} else {
					js['product'] = res.data.lstResult[index]['cityname']
				}
				js['thisYearProfit'] = res.data.lstResult[index][inputdata['column']]

				sale.push(js)
			}
			setName(name)
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

			inputdata = { ...inputdata, ['Grouping']: '' }
		})
	}


	return (
		<div className="col-lg-4 col-md-6 col-12">
			<div className="graph-card">
				<div className="card-title-graph">
					<div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation} >

						<p><i className="fas fa-city"></i> City Wise</p>

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

						{/* <i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} ></i> */}
						<div id="sorticoncity" className="dropdown-contenticon" onClick={handleclickSort}>
							{flagSort === 'Label' ? <><a id='Label'>Sort by City ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by City ASC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by City DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by City DESC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
							{flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
						</div>
						{/* <img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img> */}
						<div className='btnicons'>
							<div id="myDropdowniconcity" className="dropdown-contenticon" onClick={handleclick}>
								{flag === 'bar' ? <><a id='bar' >bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' >bar </a><hr className='custom-hr' /></>}
								{flag === 'heatmap' ? <><a id='heatmap' >Heatmap&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='heatmap' >Heatmap</a><hr className='custom-hr' /></>}
								{/* {flag === 'barl' ? <><a id='barl' >lollipop chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='barl' >lollipop chart</a><hr className='custom-hr' /></>} */}
								<button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
							</div>
						</div>
					</div>

				</div>


				{/* {weight.length !== 0 ?
					<div className="crancy-progress-card card-contain-graph">

						{flag === 'bar' ?
							<ReactApexChart options={options_bar} series={series_bar} type="bar" height={390} />
							: null}
						{flag === 'barl' ?
							<ReactApexChart options={options_lolipop} series={series_lolipop} type="bar" height={390} />
							: null}

						{flag === 'heatmap' ?
							<table align='center' rules='rows' border='white' style={{ border: 'white', marginTop: setMargin() }}>
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

							</table> : null}

					</div> :
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
				} */}
				{dataloader !== true ?
					loader !== true ?
						<div className="crancy-progress-card card-contain-graph">

							{flag === 'bar' ?
								<ReactApexChart options={options_bar} series={series_bar} type="bar" height={390} />
								: null}
							{flag === 'barl' ?
								<ReactApexChart options={options_lolipop} series={series_lolipop} type="bar" height={390} />
								: null}

							{flag === 'heatmap' ?
								<table align='center' rules='rows' border='white' style={{ border: 'white', marginTop: setMargin() }}>
									<tr>
										<th>Citywise</th>
										<th>NetWeight</th>
									</tr>


									{sales.map((data) => {
										return (
											<tr >
												<td style={{ backgroundColor: data.color, width: 250, color: 'white' }}>{data.product} </td>
												<td style={{ backgroundColor: data.color, width: 250, color: 'white' }}>{data.thisYearProfit}</td>
											</tr>
										)
									})}

								</table> : null}

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
