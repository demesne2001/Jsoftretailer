import React from 'react'
import API from '../../Utility/API';
import { useEffect, useState, useContext } from 'react';
import post from '../../Utility/APIHandle'
import Gradient from "javascript-color-gradient";

import ReactApexChart from 'react-apexcharts';
import BlackDots from '../../Assets/image/Dots.png'
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import { ItemWithSubItemWise_bar } from '../../ChartOptions/ItemWithSubItemWise_bar';
import { ItemWithSubItemWise_vbar } from '../../ChartOptions/ItemWithSubItemWise_vbar';

import { useNavigate } from 'react-router-dom';


export default function ItemWithSubItemWise() {
	const contexData = useContext(contex);
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;

	const [flag, setflag] = useState()
	const ChartType="bar"
	const [optionId,setOptionId] = useState()

	const [sales, setSales] = useState([])

	const navigate = useNavigate()

	const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()

	const options_bar = ItemWithSubItemWise_bar(name);
	const options_vbar = ItemWithSubItemWise_vbar(name);
	const series = [{
		data: weight
	}]

	function handleclick(e) {
		
		if (e.target.id !== 'save' ){
			// console.log('Updationg option')
			setflag(e.target.id)
		}
		else{
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



	useEffect(() => {
		fetchOption()
		getdata()
	}, [inputdata])

	async function getdata() {

		inputdata = { ...inputdata, ['Grouping']: 'f.ItemSubNAme,f.ItemSubID' }
		// console.log("branchwise data", inputdata);
		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				let sale = [];
				var js = {};
				// console.log(res.data.lstResult)
				for (let index = 0; index < res.data.lstResult.length; index++) {
					if (res.data.lstResult[index]['ItemSubNAme'] === null) {
						name.push("null")
					} else {
						name.push(res.data.lstResult[index]['ItemSubNAme'])
					}
					weight.push(res.data.lstResult[index]['FineWt'])
					js = { 'product': '', 'thisYearProfit': 0 }
					if (res.data.lstResult[index]['ItemSubNAme'] === null) {
						js['product'] = 'null'
					} else {
						js['product'] = res.data.lstResult[index]['ItemSubNAme']
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
				inputdata = { ...inputdata, ['Grouping']: '' }
			})
	}

	function handleonchangeCurrency() {
		// console.log("innn")
		document.getElementById("myDropdowniconitemsub").style.display === "block" ? document.getElementById("myDropdowniconitemsub").style.display = "none" : document.getElementById("myDropdowniconitemsub").style.display = "block";
	}

	function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "f.ItemSubNAme,f.ItemSubID", columnName: "ItemSubNAme", columnID: "ItemSubID", componentName: "Item With Sub Item Wise",filterKey : "strItemSubitem",chartId :7 } })
	  }

	  async function fetchOption(){
		await post({ "ID": 8,"vendorID": 1,"UserID": 1} , API.GetChartOptionByID ,{} ,'post')

		.then((res)=>{
			if(res.data.lstResult.length === 0){
				setflag(ChartType)
				// console.log('FIRST TIME API CALLED')
				post({"ChartOptionID": 0,"ChartOption": ChartType,"ChartID": 8,"vendorID": 1,"UserID": 1 } ,API.ChartOptionAddEdit,{},'post')
				.then((res)=>{
					post({"ChartOptionID": 0,"ChartOption": ChartType,"ChartID": 8,"vendorID": 1,"UserID": 1 } ,API.ChartOptionAddEdit,{},'post')
					.then((res)=>{
						setOptionId(res.data.lstResult[0].ChartOptionID)
					})
					alert(res.data.Message)
				})

			}
			else{
				setOptionId(res.data.lstResult[0].ChartOptionID)
				setflag(res.data.lstResult[0].ChartOption) 
			}
			
		})	
	}

	async function addEditOption(){
		
		await post({"ChartOptionID": optionId,"ChartOption": flag,"ChartID": 8,"vendorID": 1,"UserID": 1 } ,API.ChartOptionAddEdit,{},'post')
		.then((res)=>{
			
			alert(res.data.Message)
			
		})
	}
	

	window.onclick = function (event) {
		// console.log('evennnn', event.target.className)

		if (!event.target.matches('.dropbtn')) {
			// console.log("hii");
			// console.log('branchhh', document.getElementsByClassName("dropdown-contenticon")[7])
			if (document.getElementsByClassName("dropdown-contenticon")[7] !== undefined) {
				document.getElementsByClassName("dropdown-contenticon")[7].style.display = "none";
			}
		}
	}



	return (
		<div className="col-lg-4 col-md-6 col-12">
			<div className="graph-card">
				<div className="card-title-graph">
					<div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
						<p><i className="fas fa-sitemap"></i>
							Item with Sub item Wise</p>
					</div>

					<div className="col-sm-2 col-md-2 col-2">
					<div className='btnicons'>
						<img src={drop} className='dropbtn' onClick={handleonchangeCurrency}></img>

						<div id="myDropdowniconitemsub" className="dropdown-contenticon" onClick={handleclick}>
							{flag === 'bar' ? <><a id='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' >bar</a><hr className='custom-hr' /></>}
							{flag === 'barv' ? <><a id='barv' >Vertical Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='barv' >vertical bar </a><hr className='custom-hr' /></>}
							{flag === 'heatmap' ? <><a id='heatmap' >Heat map&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='heatmap' >Heat map</a><hr className='custom-hr' /></>}
							<button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
						</div>
						<i class="fas fa-external-link-alt"></i>
					</div>
					</div>

					
				</div>
				<div className="crancy-progress-card card-contain-graph">

					{flag === 'bar' ?
						<ReactApexChart options={options_bar} series={series} type="bar" height={330} />
						: null}
					{flag === 'barv' ? <ReactApexChart options={options_vbar} series={series} type="bar" height={330} /> : null}
					{flag === 'heatmap' ?
						<table align='center' rules='rows' border='white' style={{ border: 'white', marginTop: setMargin() }}>
							<tr>
								<th>ItemWithSubItemWise</th>
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
				</div>
			</div>
		</div>
	)
}
