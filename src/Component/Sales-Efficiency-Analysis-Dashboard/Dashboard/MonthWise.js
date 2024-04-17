import React from 'react'
import { useEffect, useState, useContext } from 'react';
import ReactApexChart from 'react-apexcharts';
import BlackDots from '../../Assets/image/Dots.png'
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import { MonthWise_Bar } from '../../ChartOptions/MonthWise_Bar';
import { MonthWise_area } from '../../ChartOptions/MonthWise_area';
import { useNavigate } from 'react-router-dom';



export default function MonthWise() {

  const navigate = useNavigate()
  // const series = [{
  // 	name: 'Net Profit',
  // 	data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
  // }]

  // const labels = ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct']

  // const options = GroupBarOptions(labels)

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
  //     getdata()
  // },[])

  // function getdata() {

  // 	let temp1 = []

  //     post(postData,API.GetMonthWise,'post')
  //     .then((res)=>{

  // 		for (let index = 0; index < res.data.lstResult.length; index++) {

  // 			temp1.push({

  // 			})

  // 		}

  //     })
  // }

  // function handledropdownMenu() {
  // 	document.getElementById("myDropdownMonth").style.display === "block" ? document.getElementById("myDropdownMonth").style.display = "none" : document.getElementById("myDropdownMonth").style.display = "block";
  // }


  // function handleSelectedChart(num) {
  // 	// setBranchWiseChart(num)
  // }

  const contexData = useContext(contex);
  const [name, setName] = useState([])
  const [weight, setweight] = useState([])
  let inputdata = contexData.state;


  const [flag, setflag] = useState()
  const ChartType = "bar"
  const [optionId,setOptionId] = useState()
  const [demo, setdemo] = useState("bar")
  const options_bar = MonthWise_Bar(name)
  const options_area = MonthWise_area(name)
  var series = [{
    name: 'weight',
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

  useEffect(() => {
    fetchOption()
    getdata()
  }, [inputdata])

  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'datename(month,a.voucherDate)' }
    await post(inputdata, API.CommonChart, {}, 'post')
      .then((res) => {
        
        // console.log("apiiiiiiiiiiiiiiii", res);
        let name = [];
        let weight = [];
        // console.log(res.data.lstResult)
        for (let index = 0; index < res.data.lstResult.length; index++) {
          if (res.data.lstResult[index]['MonthName'] === null) {
            name.push("null")
          } else {
            name.push(res.data.lstResult[index]['MonthName'])
          }
          weight.push(res.data.lstResult[index]['FineWt'])
        }
        setName(name)
        setweight(weight)
        inputdata = { ...inputdata, ['Grouping']: '' }
      })
  }


  function handleNavigation() {
    navigate('/graph-detail', { state: { grouping: "datename(month,voucherDate)", columnName: "MonthName", columnID: "MonthName", componentName: " Month Wise",filterKey : "strItemSubitem",chartId : 14} })
  }



  function handleonchangeCurrency() {
    // console.log("innn")
    document.getElementById("myDropdowniconmonth").style.display === "block" ? document.getElementById("myDropdowniconmonth").style.display = "none" : document.getElementById("myDropdowniconmonth").style.display = "block";
  }

  window.onclick = function (event) {

    if (!event.target.matches('.dropbtn')) {
      // console.log("hii");
      if (document.getElementsByClassName("dropdown-contenticon")[12] !== undefined) {
        document.getElementsByClassName("dropdown-contenticon")[12].style.display = "none";
      }

    }
  }

  async function fetchOption(){
		await post({ "ID": 14	,"vendorID": 1,"UserID": 1} , API.GetChartOptionByID ,{} ,'post')

		.then((res)=>{
			if(res.data.lstResult.length === 0){
        setflag(ChartType)
				// console.log('FIRST TIME API CALLED')
				post({"ChartOptionID": 0,"ChartOption": ChartType,"ChartID": 14	,"vendorID": 1,"UserID": 1 } ,API.ChartOptionAddEdit,{},'post')
				.then((res)=>{

					post({ "ID": 14	,"vendorID": 1,"UserID": 1} , API.GetChartOptionByID ,{} ,'post')
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
		
		await post({"ChartOptionID": optionId,"ChartOption": flag,"ChartID": 14		,"vendorID": 1,"UserID": 1 } ,API.ChartOptionAddEdit,{},'post')
		.then((res)=>{
			
			alert(res.data.Message)
			
		})
	}



  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="graph-card">
        <div className="card-title-graph">
          <div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
            <p><i className="fas fa-calendar-week"></i>
              Month Wise</p>
          </div>

          <div className="col-sm-2 col-md-2 col-2">
            <div className='btnicons'>
              <img src={drop} className='dropbtn' onClick={handleonchangeCurrency} id='iconidcity'></img>

              <div id="myDropdowniconmonth" className="dropdown-contenticon" onClick={handleclick}>
                {flag  === 'bar' ? <><a id='bar' className='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' className='bar' >Bar</a><hr className='custom-hr' /></>}
                {flag  === 'area' ? <><a id='area' className='area'>Area chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='area' className='area'>Area chart</a><hr className='custom-hr' /></>}
                
                <button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
                {/* <a id='pie' >Pie chart </a><hr className='custom-hr' /> */}
              </div>
              <i class="fas fa-external-link-alt"></i>
            </div>
          </div>


          {/* <i className="fas fa-external-link-alt"></i> */}
          {/* <p class="geex-content__header__quickaction__link  geex-btn__customizer dots" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu} >
						<img src={BlackDots} className='dropbtn' />
					</p>
					<div id="myDropdownMonth" class="dropdown-content" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu}>
						<a id='option1' onClick={() => handleSelectedChart(1)}>Radial Bar</a><hr class="custom-hr" />
						<a id='option2' onClick={() => handleSelectedChart(2)}>Pie</a><hr class="custom-hr" />
					</div> */}

        </div>
        <div className="crancy-progress-card card-contain-graph">

          {flag === 'bar'
            ?
            <ReactApexChart options={options_bar} series={series} type={demo} height={390} />
            : null}
          {flag === 'area'
            ?
            <ReactApexChart options={options_area} series={series} type={demo} height={390} />
            : null}
        </div>
      </div>
    </div>
  )
}
