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


export default function ItemWise() {

	const contexData = useContext(contex)

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
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;

	const [sales, setSales] = useState([])

	const [flag, setflag] = useState("bar")
	const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()
	const [demo, setdemo] = useState('bar')

	const options_bar = ItemWise_bar(name);
	const options_barh = Itemwise_horiZontal_Bar(name)
	const series = [{
		name: 'weight',
		data: weight
	}]

	function handleclick(e) {
		// console.log('aaaaaa', e.target.id)
		if (e.target.className !== 'custom-hr'){
			setflag(e.target.id)
			setdemo(e.target.className)
		}

	}

	function setMargin() {
		if (weight.length < 7) {
			return 80
		} else {
			return 30
		}
	}



	useEffect(() => {
		getdata()
	}, [inputdata])

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
					js = {'product':'','thisYearProfit' : 0}
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

	window.onclick = function (event) {
		if (!event.target.matches('.dropbtn')) {
			// console.log("hii");
			if (document.getElementsByClassName("dropdown-contenticon")[4] !== undefined) {
				document.getElementsByClassName("dropdown-contenticon")[4].style.display = "none";
			}

		}
	}



	return (

		<div className="col-lg-4 col-md-6 col-12">
			<div className="graph-card">
				<div className="card-title-graph">
					<p><i className="fas fa-project-diagram"></i>
						Item Wise</p>
					<div className='btnicons'>
						<img src={drop} className='dropbtn' onClick={handleonchangeCurrency} id='iconidcity'></img>

						<div id="myDropdowniconitem" className="dropdown-contenticon" onClick={handleclick}>
							<a id='bar' className='bar'>bar chart </a><hr className='custom-hr' />
							<a id='barh' className='bar'>horizontal bar</a><hr className='custom-hr' />
							<a id='heatmap' >heat map</a><hr className='custom-hr' />
							{/* <a id='bar' >chart</a><hr className='custom-hr' /> */}
						</div>
						<i class="fas fa-external-link-alt"></i>
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



				<div className="crancy-progress-card card-contain-graph">

					{flag === 'bar' ? <ReactApexChart options={options_bar} series={series} type={demo} height={350} />:null}
					{flag === 'barh' ? <ReactApexChart options={options_barh} series={series} type={demo} height={350} />:null}
					{flag === 'heatmap'?
					<table align='center' rules='rows' border='white' style={{ border: 'white', marginTop:setMargin() }}>
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

					</table>:null}
				</div>
			</div>
		</div>

	)
}
