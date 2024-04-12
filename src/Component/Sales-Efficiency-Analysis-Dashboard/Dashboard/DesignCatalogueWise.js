import React, { useContext } from 'react'
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { DesignCatalogueWise_bar } from '../../ChartOptions/DesignCatalogueWise_bar';
import { DesignCatalogueWise_donut } from '../../ChartOptions/DesignCatalogueWise_donut';
import { DesignCatalogueWise_pie } from '../../ChartOptions/DesignCatalogueWise_pie';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import flow from '../../Assets/image/flow.jpg'
import img3 from '../../Assets/image/img3.jpg'
import dots from '../../Assets/image/dots.jpg'
import strip from '../../Assets/image/strips.jpg'
import Gradient from "javascript-color-gradient";
import { useNavigate } from 'react-router-dom';


export default function DesignCatalogueWise() {
  const [sales, setSales] = useState([])
  const navigate = useNavigate()
  // const contexData = useContext(contex)

  // const series = [44, 55, 41, 17, 15]

  // const label = ["Comedy", "Action", "SciFi", "Drama", "Horror"]

  // const pieOptions = patternedPieOptions(label)

  // const [postData, setPostData] = useState({
  //   "strBranch": "",
  //   "strState": "",
  //   "strCity": "",
  //   "strItem": "",
  //   "strSubItem": "",
  //   "strItemGroup": "",
  //   "strItemSubitem": "",
  //   "strPurchaseParty": "",
  //   "strSalesParty": "",
  //   "strSaleman": "",
  //   "strProduct": "",
  //   "strDesignCatalogue": "",
  //   "strSaleAging": "",
  //   "strModeofSale": "",
  //   "strTeamModeofSale": "",
  //   "FromDate": "",
  //   "ToDate": "",
  //   "strMetalType": "",
  //   "strDayBook": "",
  //   "PageNo": 0,
  //   "PageSize": 0,
  //   "Search": ""
  // })


  // useEffect(()=>{

  // 	setPostData(contexData.state)

  // },[contexData.state])

  // useEffect(()=>{
  // 	getdata()
  // },[postData])


  // function getdata() {

  //   let temp1 = []

  //   post(postData, API.GetDesignCatalogueWise, 'post')
  //     .then((res) => {

  //       for (let index = 0; index < res.data.lstResult.length; index++) {

  //         temp1.push({

  //         })

  //       }

  //     })
  // }

  // function handledropdownMenu() {
  //   document.getElementById("myDropdownDesign").style.display === "block" ? document.getElementById("myDropdownDesign").style.display = "none" : document.getElementById("myDropdownDesign").style.display = "block";
  // }


  // function handleSelectedChart(num) {
  //   // setBranchWiseChart(num)
  // }

  const contexData = useContext(contex);
  const [name, setName] = useState([])
  const [weight, setweight] = useState([])
  let inputdata = contexData.state;

  const [flag, setflag] = useState("donut")

  const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()

  const options_bar = DesignCatalogueWise_bar(name);
  const options_donut = DesignCatalogueWise_donut(name);
  const options_pie = DesignCatalogueWise_pie(name);
  const series1 = weight;
  const series2 = [{
    name: 'weight',
    data: weight
  }]


  function handleclick(e) {
    if (e.target.className !== 'custom-hr') {
      setflag(e.target.id)
    }
  }
  useEffect(() => {
    getdata()
  }, [inputdata])


  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'j.designCatalogID,j.DesignNo' }
    // console.log("branchwise data", inputdata);
    await post(inputdata, API.CommonChart, {}, 'post')
      .then((res) => {
        let name = [];
        let weight = [];
        let sale = [];
        var js = {};


        for (let index = 0; index < res.data.lstResult.length; index++) {
          js = { 'product': '', 'thisYearProfit': 0 }
          if (res.data.lstResult[index]['DesignNo'] === null) {
            name.push("null")
          } else {
            name.push(res.data.lstResult[index]['DesignNo'])
          }
          weight.push(res.data.lstResult[index]['FineWt'])

          if (res.data.lstResult[index]['DesignNo'] === null) {
            js['product'] = 'null'
          } else {
            js['product'] = res.data.lstResult[index]['DesignNo']
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

  function setMargin() {
    if (weight.length < 7) {
      return 80
    } else {
      return 30
    }
  }




  function handleNavigation() {
		navigate('/graph-detail', { state: { grouping: "j.designCatalogID,j.DesignNo", columnName: "DesignNo", columnID: "designCatalogID", componentName: "Design Catalogue Wise",filterKey : "strDesignCatalogue" } })
	}


  function handleonchangeCurrency() {
    // console.log("innn")
    document.getElementById("myDropdownicondesigncat").style.display === "block" ? document.getElementById("myDropdownicondesigncat").style.display = "none" : document.getElementById("myDropdownicondesigncat").style.display = "block";
  }

  window.onclick = function (event) {

    if (!event.target.matches('.dropbtn')) {
      // console.log("hii");
      if (document.getElementsByClassName("dropdown-contenticon")[11] !== undefined) {
        document.getElementsByClassName("dropdown-contenticon")[11].style.display = "none";
      }
    }
  }


  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="graph-card">
        <div className="card-title-graph">
          <div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
            <p><i className="fas fa-gem"></i>
              Design Catalogue Wise</p>
          </div>

          <div className="col-sm-2 col-md-2 col-2">
            <div className='btnicons'>
              <img src={drop} className='dropbtn' onClick={handleonchangeCurrency} id='iconidcity'></img>

              <div id="myDropdownicondesigncat" className="dropdown-contenticon" onClick={handleclick}>

                <a id='donut' >Donut</a><hr className='custom-hr' />
                <a id='heatmap' >Heatmap</a><hr className='custom-hr' />
                <a id='bar' >Bar</a><hr className='custom-hr' />
                <a id='pie' >Pie chart </a><hr className='custom-hr' />
              </div>
              <i class="fas fa-external-link-alt"></i>
            </div>
          </div>
          {/* <i className="fas fa-external-link-alt"></i> */}
          {/* <p class="geex-content__header__quickaction__link  geex-btn__customizer dots" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu} >
            <img src={BlackDots} className='dropbtn' />
          </p>
          <div id="myDropdownDesign" class="dropdown-content" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu}>
            <a id='option1' onClick={() => handleSelectedChart(1)}>Radial Bar</a><hr class="custom-hr" />
            <a id='option2' onClick={() => handleSelectedChart(2)}>Pie</a><hr class="custom-hr" />
          </div> */}
        </div>
        <div className="crancy-progress-card card-contain-graph">
          {flag === 'bar' ? <ReactApexChart options={options_bar} type={flag} series={series2} height={350} /> : null}
          {flag === 'pie' ? <ReactApexChart options={options_pie} type={flag} series={series1} height={350} /> : null}
          {flag === 'donut' ? <ReactApexChart options={options_donut} type={flag} series={series1} height={350} /> : null}

          {flag === 'heatmap' ?

            <table align='center' rules='rows' border='white' style={{ border: 'white', marginTop: setMargin() }}>
              <tr>
                <th>DesignNo</th>
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

            </table> : null
          }
        </div>
      </div>
    </div>
  )
}
