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


export default function RegionWise() {

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

	const options_lolipop = RegionWise_lolipop(name, inputdata['column'])
	const options_polar = RegionWise_Polar(name, inputdata['column'])
	const options_donut = BranchWise_donut(name, inputdata['column'])

	const series_lolipop = [{
		name: 'Weight',
		data: weight
	}]
	const series_polar = weight

	const navigate = useNavigate()

	function handleclick(e) {

		if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconbranch' && e.target.id !== '') {
			console.log(e.target.id, "options");
			setflag(e.target.id)
		}
		else {
			// console.log("NOT UPDATING OPTIOJN")
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
		// console.log("branchwise data", inputdata);
		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				// console.log(res.data.lstResult)
				for (let index = 0; index < res.data.lstResult.length; index++) {
					if (res.data.lstResult[index]['RegionName'] === null) {
						name.push("null")
					} else {
						name.push(res.data.lstResult[index]['RegionName'])
					}

					weight.push(res.data.lstResult[index][inputdata['column']])
				}
				setName(name)
				setweight(weight)
				setdataLoader(false)
				if (weight.length !== 0) {
					setLoader(false)
				} else {
					setLoader(true)
				}
				// console.log("name in region", name)
				// console.log("weight in reign", weight);
				inputdata = { ...inputdata, ['Grouping']: '' }
			})
	}
	function handleonchangeCurrency() {
		// console.log("innn")
		document.getElementById("myDropdowniconregion").style.display === "block" ? document.getElementById("myDropdowniconregion").style.display = "none" : document.getElementById("myDropdowniconregion").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')
		if (tag_array !== undefined) {
			for (let i = 0; i < tag_array.length; i++) {
				console.log(document.getElementsByClassName('dropdown-contenticon'), 'tag');
				if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconregion') {
					document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
				}
			}
		}
	}

	document.getElementById("root").addEventListener("click", function (event) {
		console.log(event.target, "class");
		if (event.target.className !== 'dropbtn icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
			if (document.getElementById("myDropdowniconregion") !== null) {
				document.getElementById("myDropdowniconregion").style.display = "none"
				document.getElementById("sorticonRegion").style.display = "none"
			}
		}

	});
	function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "l.RegionID,l.RegionName", columnName: "RegionName", columnID: "RegionID", componentName: "Region Wise", filterKey: "strRegionID", chartId: 4 }, replace: true })
	}

	async function fetchOption() {
		await post({ "ID": 4, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

			.then((res) => {
				if (res.data.lstResult.length === 0) {
					setflag(ChartType)
					// console.log('FIRST TIME API CALLED')
					setflag(ChartType)
					post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 4, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
						.then((res) => {
							post({ "ID": 4, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
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

		await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 4, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
			.then((res) => {
				document.getElementById('myDropdowniconregion').style.display = 'none'
				alert(res.data.Message)

			})
	}

	function handleSorting() {
		document.getElementById("sorticonRegion").style.display === "block" ? document.getElementById("sorticonRegion").style.display = "none" : document.getElementById("sorticonRegion").style.display = "block";
		const tag_array = document.getElementsByClassName('dropdown-contenticon')
		// console.log(tag_array);
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
		console.log(inputForSort);
		await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
			let name = [];
			let weight = [];
			// console.log(res.data.lstResult)
			for (let index = 0; index < res.data.lstResult.length; index++) {
				if (res.data.lstResult[index]['RegionName'] === null) {
					name.push("null")
				} else {
					name.push(res.data.lstResult[index]['RegionName'])
				}

				weight.push(res.data.lstResult[index][inputdata['column']])
			}
			setName(name)
			setweight(weight)
			setdataLoader(false)
			if (weight.length !== 0) {
				setLoader(false)
			} else {
				setLoader(true)
			}
			// console.log("name in region", name)
			// console.log("weight in reign", weight);
			inputdata = { ...inputdata, ['Grouping']: '' }
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
						<i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} ></i>

						<div id="sorticonRegion" className="dropdown-contenticon" onClick={handleclickSort}>
							{flagSort === 'Label' ? <><a id='Label'>Sort by Region ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by Region ASC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by Region DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by Region DESC&nbsp;</a><hr className='custom-hr' /></>}
							{flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
							{flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
						</div>
						<img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img>
						<div className='btnicons'>
							<div id="myDropdowniconregion" className="dropdown-contenticon" onClick={handleclick}>
								{/* {flag === 'bar' ? <><a id='bar' >lollipop chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' >lollipop chart </a><hr className='custom-hr' /></>} */}
								{flag === 'polarArea' ? <><a id='polarArea' >polar area&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='polarArea' >polar area</a><hr className='custom-hr' /></>}
								{flag === 'donut' ? <><a id='donut' >donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut' >donut</a><hr className='custom-hr' /></>}
								<button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
							</div>
						</div>

					</div>

					{/* <i class="fas fa-external-link-alt"></i> */}
				</div>

				{dataloader !== true ?
					loader !== true ?
						<div className="crancy-progress-card card-contain-graph">
							{flag === 'bar' ? <ReactApexChart options={options_lolipop} type={flag} series={series_lolipop} height={350} /> : null}
							{flag === 'polarArea' ? <ReactApexChart options={options_polar} type='polarArea' series={series_polar} height={350} /> : null}
							{flag === 'donut' ? <ReactApexChart options={options_donut} type='donut' series={series_polar} height={350} /> : null}

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
