import React, { useContext, useEffect, useState } from 'react'
import ReactApexChart from 'react-apexcharts';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import BlackDots from '../../Assets/image/Dots.png'

import { StateWise_SemiDonut } from '../../ChartOptions/StateWise_SemiDonut';
import { StateWise_Treemap } from '../../ChartOptions/StateWise_Treemap';

import contex from '../../contex/Contex';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'


export default function StateWise() {

	const contexData = useContext(contex)
	const [state, setState] = useState([]);
	const navigate = useNavigate()
	let inputdata = contexData.state;
	const [flag, setflag] = useState()
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	const [optionId, setOptionId] = useState()

	const options_semidonut = StateWise_SemiDonut(name, state)
	const options_Treemap = StateWise_Treemap(name)
	const series_treemap = [
		{
			data: state
		}
	]
	const series_semidonut = weight;

	const ChartType = "treemap"

	function handleclick(e) {

		if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconbranch' && e.target.id !== '' ) {

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

	async function getdata() {
		inputdata = { ...inputdata, ['Grouping']: 'k.stateID,k.Statename' }
		// console.log(inputdata, "stat");
		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = []
				let name1 = [];
				let weight = [];
				// console.log("response", res.data.lstResult[0]['Statename'])
				for (let index = 0; index < res.data.lstResult.length; index++) {
					if (res.data.lstResult[index]['Statename'] != null) {
						// name.push({ x: res.data.lstResult[index]['Statename'] + "\n" +"(" +res.data.lstResult[index]['FineWt']+")", y: res.data.lstResult[index]['FineWt'] })
						name.push({ x: res.data.lstResult[index]['Statename'], y: res.data.lstResult[index]['FineWt'] })
						name1.push(res.data.lstResult[index]['Statename'])
					}
					weight.push(res.data.lstResult[index]['FineWt'])

				}
				// setweight(weight)
				setState(name)
				setName(name1)
				setweight(weight)
				// console.log("statewise", name)
				// console.log("statewise Service", series);
				inputdata = { ...inputdata, ['Grouping']: '' }
			})
	}





	function handleonchangeCurrency() {

		document.getElementById("myDropdowniconstate").style.display === "block" ? document.getElementById("myDropdowniconstate").style.display = "none" : document.getElementById("myDropdowniconstate").style.display = "block";
	}

	window.onclick = function (event) {



		if (!event.target.matches('#iconidstate')) {
			document.getElementById('myDropdowniconstate').style.display = 'none'
			if (document.getElementsByClassName("dropdown-contenticon")[1] !== undefined) {
				document.getElementsByClassName("dropdown-contenticon")[1].style.display = "none";
			}
		}
	}


	function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "k.stateID,k.Statename", columnName: "Statename", columnID: "stateID", componentName: "State Wise", filterKey: "strState",chartId : 2 } })
	}

	async function fetchOption() {
		await post({ "ID": 2, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

			.then((res) => {
				if (res.data.lstResult.length === 0) {
					setflag(ChartType)
					// console.log('FIRST TIME API CALLED')
					setflag(ChartType)
					post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 2, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
						.then((res) => {
							post({ "ID": 2, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
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

		await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 2, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
			.then((res) => {
				document.getElementById('myDropdowniconstate').style.display = 'none'
				alert(res.data.Message)

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

						<div className='btnicons'>

							<img src={drop} className='dropbtn' onClick={handleonchangeCurrency} id='iconidstate'></img>

							<div id="myDropdowniconstate" className="dropdown-contenticon" onClick={handleclick}>

								{flag === 'treemap' ? <><a id='treemap'>Tree map &nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='treemap'>Tree map</a><hr className='custom-hr' /></>}
								{flag === 'donut' ? <><a id='donut'>Semi donut &nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut'>Semi donut </a><hr className='custom-hr' /></>}
								<button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
							</div>
							<i class="fas fa-external-link-alt"></i>
						</div>

					</div>




					{/* <i class="fas fa-external-link-alt"></i> */}
				</div>

				{/* <p class="geex-content__header__quickaction__link  geex-btn__customizer dots" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu} >
						<img src={BlackDots} className='dropbtn' />
					</p>
					<div id="myDropdownState" class="dropdown-content" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu}>
						<a id='option1' onClick={() => handleSelectedChart(1)}>Tree Map</a><hr class="custom-hr" />
						<a id='option2' onClick={() => handleSelectedChart(2)}>Radial Bar</a><hr class="custom-hr" />
						<a id='option2' onClick={() => handleSelectedChart(3)}>Semi Doughnut</a><hr class="custom-hr" />
					</div> */}








				<div className="crancy-progress-card card-contain-graph">

					{flag === 'donut' ? <ReactApexChart options={options_semidonut} type={flag} series={series_semidonut} height={350} /> : null}
					{flag === 'treemap' ? <ReactApexChart options={options_Treemap} type={flag} series={series_treemap} height={350} /> : null}
				</div>
				<div id="html-dist"></div>
			</div>
		</div>
	)
}
