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


export default function RegionWise() {

	const contexData = useContext(contex);
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;

	const [flag, setflag] = useState("bar")


	const options_lolipop = RegionWise_lolipop(name)
	const options_polar = RegionWise_Polar(name)
	const series_lolipop = [{
		name: 'Weight',
		data: weight
	}]
	const series_polar = weight

	function handleclick(e) {
		// console.log('aaaaaa', e.target.id)
		setflag(e.target.id)
	}
	useEffect(() => {
		getdata()
	}, [inputdata])

	async function getdata() {

		inputdata = { ...inputdata, ['Grouping']: 'l.RegionID,l.RegionName' }
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

					weight.push(res.data.lstResult[index]['FineWt'])
				}
				setName(name)
				setweight(weight)
				// console.log("name in region", name)
				// console.log("weight in reign", weight);
				inputdata = { ...inputdata, ['Grouping']: '' }
			})
	}
	function handleonchangeCurrency() {
		// console.log("innn")
		document.getElementById("myDropdowniconregion").style.display === "block" ? document.getElementById("myDropdowniconregion").style.display = "none" : document.getElementById("myDropdowniconregion").style.display = "block";
	}

	window.onclick = function (event) {
		if (!event.target.matches('.dropbtn') ) {
			// console.log("hii");
			if (document.getElementsByClassName("dropdown-contenticon")[3] !== undefined) {
				document.getElementsByClassName("dropdown-contenticon")[3].style.display = "none";
			}

		}
	}




	return (
		<div className="col-lg-4 col-md-6 col-12">
			<div className="graph-card">
				<div className="card-title-graph">
					<p><i className="fas fa-globe"></i>
						Region Wise</p>
					<div className='btnicons'>
						<img src={drop} className='dropbtn' onClick={handleonchangeCurrency} id='iconidcity'></img>

						<div id="myDropdowniconregion" className="dropdown-contenticon" onClick={handleclick}>
							<a id='bar' >lollipop chart </a><hr className='custom-hr' />
							<a id='polarArea' >polar area</a><hr className='custom-hr' />
							{/* <a id='bar' >chart</a><hr className='custom-hr' />
							<a id='bar' >chart</a><hr className='custom-hr' /> */}
						</div>
						<i class="fas fa-external-link-alt"></i>
					</div>

					{/* <i class="fas fa-external-link-alt"></i> */}
				</div>
				<div className="crancy-progress-card card-contain-graph">
				{flag === 'bar' ? <ReactApexChart options={options_lolipop} type={flag} series={series_lolipop} height={350} />:null}
				{flag === 'polarArea' ? <ReactApexChart options={options_polar} type={flag} series={series_polar} height={350} />:null}

					
					{/* <Cylinder/> */}
				</div>
			</div>
		</div>
	)
}
