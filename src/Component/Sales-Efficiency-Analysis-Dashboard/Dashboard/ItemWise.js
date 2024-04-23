import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import Gradient from "javascript-color-gradient";
import { Itemwise_horiZontal_Bar } from '../../ChartOptions/Itemwise_horiZontal_Bar';
import { ItemWise_bar } from '../../ChartOptions/ItemWise_bar';
import BlackDots from '../../Assets/image/Dots.png'
import API from '../../Utility/API'
import post from '../../Utility/APIHandle'
import contex from '../../contex/Contex';
import ReactApexChart from 'react-apexcharts';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import { useNavigate } from 'react-router-dom';

export default function ItemWise() {



	// const lineDiffrence = ["100%","80%","60%","40%","20%","0%"]  

	// const label = ["x1","x2","x3","x4","x5","x6"]
	// const data = ["95%","83%","80%","93%","65%","78%"]	


	// function handledropdownMenu() {
	// 	document.getElementById("myDropdownItem").style.display === "block" ? document.getElementById("myDropdownItem").style.display = "none" : document.getElementById("myDropdownItem").style.display = "block";
	// }


	// function handleSelectedChart(num) {
	// 	// setBranchWiseChart(num)
	// }

	// const [postData, setPostData] = useState({
	//     "strBranch": "",
	//     "strState": "",
	//     "strCity": "",
	//     "strItem": "",
	//     "strSubItem": "",
	//     "strItemGroup": "",
	//     "strItemSubitem": "",
	//     "strPurchaseParty": "",
	//     "strSalesParty": "",
	//     "strSaleman": "",
	//     "strProduct": "",
	//     "strDesignCatalogue": "",
	//     "strSaleAging": "",
	//     "strModeofSale": "",
	//     "strTeamModeofSale": "",
	//     "FromDate": "",
	//     "ToDate": "",
	//     "strMetalType": "",
	//     "strDayBook": "",
	//     "PageNo": 0,
	//     "PageSize": 0,
	//     "Search": ""
	// })


	// useEffect(()=>{

	// 	setPostData(contexData.state)

	// },[contexData.state])

	// useEffect(()=>{
	// 	getdata()
	// },[postData])

	const contexData = useContext(contex)
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;
	const [sales, setSales] = useState([])
	const [loader, setLoader] = useState(true)
	const [dataloader, setdataLoader] = useState(true)
	const [flag, setflag] = useState()
	const ChartType = "bar"
	const [optionId, setOptionId] = useState()
	const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()
	const [demo, setdemo] = useState('bar')

	const options_bar = ItemWise_bar(name);
	const options_barh = Itemwise_horiZontal_Bar(name)
	const series = [{
		name: 'weight',
		data: weight
	}]

	const navigate = useNavigate()

	useEffect(() => {
		fetchOption()
		getdata()
	}, [inputdata])

	function handleclick(e) {

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


	async function getdata() {

		inputdata = { ...inputdata, ['Grouping']: 'd.itemID,d.ItemName' }
		// console.log("branchwise data", inputdata);
		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				let sale = [];
				var js = {};
				// console.log(res.data.lstResult)
				for (let index = 0; index < res.data.lstResult.length; index++) {
					js = { 'product': '', 'thisYearProfit': 0 }
					if (res.data.lstResult[index]['ItemName'] === null) {
						name.push("null")
					} else {
						name.push(res.data.lstResult[index]['ItemName'])
					}
					weight.push(res.data.lstResult[index]['FineWt'])


					if (res.data.lstResult[index]['ItemName'] === null) {
						js['product'] = 'null'
					} else {
						js['product'] = res.data.lstResult[index]['ItemName']
					}
					js['thisYearProfit'] = res.data.lstResult[index]['FineWt']

					sale.push(js)
				}
				setdataLoader(false)
				if (weight.length !== 0) {
					setLoader(false)
				} else {
					setLoader(true)
				}
				setName(name)
				setweight(weight)
				var j = []
				for (let index = 0; index < sale.length; index++) {
					j.push({ ...sale[index], ['color']: gradientArray[index] })
				}
				setSales(j)
				// console.log("itemgroup", weight);
				inputdata = { ...inputdata, ['Grouping']: '' }
			})
	}


	function handleonchangeCurrency() {
		// console.log("innn")
		document.getElementById("myDropdowniconitem").style.display === "block" ? document.getElementById("myDropdowniconitem").style.display = "none" : document.getElementById("myDropdowniconitem").style.display = "block";
	}

	document.getElementById("root").addEventListener("click", function (event) {
		if (event.target.className !== 'dropbtn') {
			if (document.getElementById("myDropdowniconitem") !== null) {
				document.getElementById("myDropdowniconitem").style.display = "none"
			}
		}
	});

	function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "d.itemID,d.ItemName", columnName: "ItemName", columnID: "itemID", componentName: "Item Group Wise", filterKey: "strItem", chartId: 7 }, replace: true })
	}

	async function fetchOption() {
		await post({ "ID": 7, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

			.then((res) => {
				if (res.data.lstResult.length === 0) {
					setflag(ChartType)
					// console.log('FIRST TIME API CALLED')
					post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 7, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
						.then((res) => {
							post({ "ID": 7, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
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

		await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 7, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
			.then((res) => {
				document.getElementById('myDropdowniconitem').style.display = 'none'
				alert(res.data.Message)

			})
	}


	return (

		<div className="col-lg-4 col-md-6 col-12">
			<div className="graph-card">
				<div className="card-title-graph">
					<div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation} >
						<p><i className="fas fa-project-diagram"></i>
							Item Wise</p>
					</div>

					<div className='col-sm-2 col-md-2 col-2'>
						<div className='btnicons'>
							<img src={drop} className='dropbtn' onClick={handleonchangeCurrency} id='iconidcity'></img>

							<div id="myDropdowniconitem" className="dropdown-contenticon" onClick={handleclick}>

								{flag === 'bar' ? <><a id='bar' className='bar'>Bar Chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' className='bar'>bar chart </a><hr className='custom-hr' /></>}
								{flag === 'barh' ? <><a id='barh' className='bar'>Horizontal Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='barh' className='bar'>horizontal bar</a><hr className='custom-hr' /></>}
								{flag === 'heatmap' ? <><a id='heatmap' >Heat Map&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='heatmap' >heat map</a><hr className='custom-hr' /></>}
								<button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>

							</div>
							<i class="fas fa-external-link-alt"></i>
						</div>
					</div>


					{/* <i class="fas fa-external-link-alt"></i> */}
					{/* <p class="geex-content__header__quickaction__link  geex-btn__customizer dots" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu} >
						<img src={BlackDots} className='dropbtn' />
				</p>
					<div id="myDropdownItem" class="dropdown-content" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu}>
						<a id='option1' onClick={() => handleSelectedChart(1)}>Radial Bar</a><hr class="custom-hr" />
						<a id='option2' onClick={() => handleSelectedChart(2)}>Pie</a><hr class="custom-hr" />
					</div> */}
				</div>


				{/* {weight.length !== 0 ?
					<div className="crancy-progress-card card-contain-graph">

						{flag === 'bar' ? <ReactApexChart options={options_bar} series={series} type={demo} height={350} /> : null}
						{flag === 'barh' ? <ReactApexChart options={options_barh} series={series} type={demo} height={350} /> : null}
						{flag === 'heatmap' ?
							<table align='center' rules='rows' border='white' style={{ border: 'white', marginTop: setMargin() }}>
								<tr>
									<th>Itemwise</th>
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
					<div className="crancy-progress-card card-contain-graph" >
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
					</div>} */}
				{dataloader !== true ?
					loader !== true ?
						<div className="crancy-progress-card card-contain-graph">

							{flag === 'bar' ? <ReactApexChart options={options_bar} series={series} type={demo} height={350} /> : null}
							{flag === 'barh' ? <ReactApexChart options={options_barh} series={series} type={demo} height={350} /> : null}
							{flag === 'heatmap' ?
								<table align='center' rules='rows' border='white' style={{ border: 'white', marginTop: setMargin() }}>
									<tr>
										<th>Itemwise</th>
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
