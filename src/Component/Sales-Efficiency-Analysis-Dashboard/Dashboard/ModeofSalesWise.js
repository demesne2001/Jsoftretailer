import React, { useCallback, useContext } from 'react'

import ReactApexChart from 'react-apexcharts';
import BlackDots from '../../Assets/image/Dots.png'
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import { useEffect, useState } from 'react';
import contex from '../../contex/Contex';
import { useNavigate } from 'react-router-dom';

export default function ModeofSalesWise() {

  
	const contexData = useContext(contex);
	const [name, setName] = useState([])
	const [weight, setweight] = useState([])
	let inputdata = contexData.state;

  const navigate = useNavigate()


	useEffect(() => {
		getdata()
	}, [inputdata])

	async function getdata() {

		inputdata = { ...inputdata, ['Grouping']: 'a.ChallanGenerateTypeID,N.ChallanGenerateType' }
		// console.log("branchwise data", inputdata);
		await post(inputdata, API.CommonChart, {}, 'post')
			.then((res) => {
				let name = [];
				let weight = [];
				// console.log(res.data.lstResult)
				for (let index = 0; index < res.data.lstResult.length; index++) {
					if (res.data.lstResult[index]['ChallanGenerateType'] === null) {
						name.push("null")
					} else {
						name.push(res.data.lstResult[index]['ChallanGenerateType'])
					}
					weight.push(res.data.lstResult[index]['FineWt'])
				}
				setName(name)
				setweight(weight)

				inputdata = { ...inputdata, ['Grouping']: '' }
			})
	}

  function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "a.ChallanGenerateTypeID,N.ChallanGenerateType", columnName: "ChallanGenerateType", columnID: "ChallanGenerateTypeID", componentName: "Mode of Sales Wise",chartId : 17} })
	}

	const series = weight


  const options = {
    chart: {
      toolbar: {
        show: true,
        offsetX: 0,
        offsetY: 0,
        tools: {
          download: true,
        },

      },
      type: 'donut',
    },
    colors: ['#51bde4','#265cb9','#00e396'],
    legend: {
      position: 'bottom'
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
      }
    }],
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10
      }
  },
  labels : name
}
  return (
    <div className="col-lg-6 col-md-6 col-12">
      <div className="graph-card">
        <div className="card-title-graph" onClick={handleNavigation}>
           
          <p><i className="fas fa-layer-group"></i>
            Mode of Sales Wise</p>
          <i className="fas fa-external-link-alt"></i>
          
          {/* <p class="geex-content__header__quickaction__link  geex-btn__customizer dots" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu} >
            <img src={BlackDots} className='dropbtn' />
          </p>
          <div id="myDropdownModeofsales" class="dropdown-content" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu}>
            <a id='option1' onClick={() => handleSelectedChart(1)}>Radial Bar</a><hr class="custom-hr" />
            <a id='option2' onClick={() => handleSelectedChart(2)}>Pie</a><hr class="custom-hr" />
          </div> */}
        </div>
        {weight.length !== 0 ?
        <div className="crancy-progress-card card-contain-graph">
          <ReactApexChart options={options} series={series} type="donut" height={390} />
        </div>:
        <div className="crancy-progress-card card-contain-graph">
				<div class="dot-spinner"style={{margin:"auto", position:'inherit'}} >
					<div class="dot-spinner__dot"></div>
					<div class="dot-spinner__dot"></div>
					<div class="dot-spinner__dot"></div>
					<div class="dot-spinner__dot"></div>
					<div class="dot-spinner__dot"></div>
					<div class="dot-spinner__dot"></div>
					<div class="dot-spinner__dot"></div>
					<div class="dot-spinner__dot"></div>
				</div>
			</div>}
      </div>
    </div>
  )
}
