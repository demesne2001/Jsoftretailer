import React, { useContext } from 'react'

import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import Gradient from "javascript-color-gradient";
import BlackDots from '../../Assets/image/Dots.png'
import { SubItemWise_bar } from '../../ChartOptions/SubItemWise_bar';
import { SubItem_Polar } from '../../ChartOptions/SubItem_Polar';
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import { useNavigate } from 'react-router-dom';

export default function SubItemWise() {

  const contexData = useContext(contex);
  const [name, setName] = useState([])
  const [weight, setweight] = useState([])
  let inputdata = contexData.state;

  const [flag, setflag] = useState()
  const ChartType = "bar"
  const [optionId,setOptionId] = useState()
  const [sales, setSales] = useState([])

  const options_Polar = SubItem_Polar(name)
  const options_bar = SubItemWise_bar(name)
  const series_bar = [{
    name: 'Weight',
    data: weight
  }]
  const series_polar = weight;

  const navigate = useNavigate()

  function handleclick(e) {
		
		if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconbranch' && e.target.id !== '' ){
			
			setflag(e.target.id)
		}
		else{
			// console.log("NOT UPDATING OPTIOJN")
		}
		
	}


  const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()



  useEffect(() => {
    fetchOption()
    getdata()
  }, [inputdata])


  function setMargin() {
    if (weight.length < 7) {
      return 80
    } else {
      return 30
    }
  }


  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'e.subitemID,e.subItemName' }
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
          if (res.data.lstResult[index]['subItemName'] === null) {
            name.push("null")
          } else {
            name.push(res.data.lstResult[index]['subItemName'])
          }
          weight.push(res.data.lstResult[index]['FineWt'])

          if (res.data.lstResult[index]['subItemName'] === null) {
            js['product'] = 'null'
          } else {
            js['product'] = res.data.lstResult[index]['subItemName']
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


  function handleNavigation() {
    navigate('/graph-detail', { state: { grouping: "e.subitemID,e.subItemName", columnName: "subItemName", columnID: "subitemID", componentName: " Sub-Item Wise",filterKey : "strSubItem",chartId : 6 } })
  }



  function handleonchangeCurrency() {
    // console.log("innn")
    document.getElementById("myDropdowniconsubitem").style.display === "block" ? document.getElementById("myDropdowniconsubitem").style.display = "none" : document.getElementById("myDropdowniconsubitem").style.display = "block";
  }

  window.onclick = function (event) {

    if (!event.target.matches('.dropbtn')) {
      // console.log("hii");
      if (document.getElementsByClassName("dropdown-contenticon")[5] !== undefined) {
        document.getElementsByClassName("dropdown-contenticon")[5].style.display = "none";
      }

    }
  }

  async function fetchOption(){
		await post({ "ID": 6,"vendorID": 1,"UserID": 1} , API.GetChartOptionByID ,{} ,'post')

		.then((res)=>{
			if(res.data.lstResult.length === 0){  
        setflag(ChartType)
				// console.log('FIRST TIME API CALLED')
				post({"ChartOptionID": 0,"ChartOption": ChartType,"ChartID": 6,"vendorID": 1,"UserID": 1 } ,API.ChartOptionAddEdit,{},'post')
				.then((res)=>{
					
          post({ "ID": 6,"vendorID": 1,"UserID": 1} , API.GetChartOptionByID ,{} ,'post')
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
		
		await post({"ChartOptionID": optionId,"ChartOption": flag,"ChartID": 6,"vendorID": 1,"UserID": 1 } ,API.ChartOptionAddEdit,{},'post')
		.then((res)=>{
			document.getElementById('myDropdowniconsubitem').style.display = 'none'
			alert(res.data.Message)
			
		})
	}



  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="graph-card">
        <div className="card-title-graph">
          <div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
            <p><i className="fas fa-th-list"></i>
              Sub-Item Wise</p>
          </div>

          <div className="col-sm-2 col-md-2 col-2">
            <div className='btnicons'>
              <img src={drop} className='dropbtn' onClick={handleonchangeCurrency} id='iconidcity'></img>

              <div id="myDropdowniconsubitem" className="dropdown-contenticon" onClick={handleclick}>
                {flag === 'bar' ? <><a id='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' >Bar </a><hr className='custom-hr' /></>}
                {flag === 'heatmap' ? <><a id='heatmap' >Heatmap&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='heatmap' >Heatmap</a><hr className='custom-hr' /></> }
                {flag === 'polarArea' ? <><a id='polarArea' >Polar area&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='polarArea' >polar area</a><hr className='custom-hr' /></>}
                
                <button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
              </div>
              <i class="fas fa-external-link-alt"></i>
            </div>
          </div>

          {/* <i class="fas fa-external-link-alt"></i> */}
        </div>



        <div className="crancy-progress-card card-contain-graph">
          {/* <ReactApexChart options={options} series={series} type="polarArea" height={390} /> */}
          {/* <RoundedBar/> */}

          {flag === 'bar' ?
            <ReactApexChart options={options_bar} series={series_bar} type={flag} height={350} />
            : null}

          {flag === 'polarArea' ? <ReactApexChart options={options_Polar} series={series_polar} type={flag} height={350} /> : null}
          {flag === 'heatmap' ?
            <table align='center' rules='rows' border='white' style={{ border: 'white', marginTop: setMargin() }}>
              <tr>
                <th>Subitemwise</th>
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
