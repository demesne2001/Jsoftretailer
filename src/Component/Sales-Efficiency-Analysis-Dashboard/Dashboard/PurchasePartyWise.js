import React, { useContext, useEffect, useState } from 'react'
import { PurchaseParty_bar } from '../../ChartOptions/PurchaseParty_bar';
import { PurchaseParty_lolipop } from '../../ChartOptions/PurchaseParty_lolipop';
import ReactApexChart from 'react-apexcharts';
import Gradient from "javascript-color-gradient";
import img from '../../Assets/icons8-person-48.png'
import BlackDots from '../../Assets/image/Dots.png'
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
// import { flat } from '../../Assets/font/js/v4-shims';


export default function PurchasePartyWise() {


  // const contexData = useContext(contex)

  // let seriesData = [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
  // let xaxiscategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // let imagearr =[]


  const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()

  const [imagearr, setImageArr] = useState([])
  const [sales, setSales] = useState([])
  const [flag, setflag] = useState("bar")
  const [demo, setdemo] = useState("bar")
  const contexData = useContext(contex);
  const [name, setName] = useState([])
  const [weight, setweight] = useState([])
  let inputdata = contexData.state;
  const options_lolipop = PurchaseParty_lolipop(name)
  const options_bar = PurchaseParty_bar(name)
  const series = [{
    name: 'Weight',
    data: weight
  }]
  function handleclick(e) {
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

  //   post(postData, API.GetPurchasePartywise, 'post')
  //     .then((res) => {

  //       for (let index = 0; index < res.data.lstResult.length; index++) {

  //         temp1.push({

  //         })

  //       }

  //     })
  // }



  useEffect(() => {
    getdata()

  }, [inputdata])

  useEffect(() => {
    imagepoint()

  }, [imagearr])

  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'g.DesigncodeID,g.DesignCode' }
    // console.log("branchwise data", inputdata);
    await post(inputdata, API.CommonChart, {}, 'post')
      .then((res) => {
        let sale = [];
        var js = {};
        let name = [];
        let weight = [];
        // console.log(res.data.lstResult)
        for (let index = 0; index < res.data.lstResult.length; index++) {
          if (res.data.lstResult[index]['DesignCode'] === null) {
            name.push("null")
          } else {
            name.push(res.data.lstResult[index]['DesignCode'])
          }
          weight.push(res.data.lstResult[index]['FineWt'])

          js = { 'product': '', 'thisYearProfit': 0 }
          if (res.data.lstResult[index]['DesignCode'] === null) {
            js['product'] = 'null'
          } else {
            js['product'] = res.data.lstResult[index]['DesignCode']
          }
          js['thisYearProfit'] = res.data.lstResult[index]['FineWt']

          sale.push(js)


        }
        var j = []
        for (let index = 0; index < sale.length; index++) {
          j.push({ ...sale[index], ['color']: gradientArray[index] })
        }


        setName(name)
        setweight(weight)
        setSales(j)
        // console.log("itemgroup", weight);
        inputdata = { ...inputdata, ['Grouping']: '' }
      })
  }

  function imagepoint() {

    let temp = []

    for (let index = 0; index < weight.length; index++) {

      temp.push({

        x: name[index],
        y: weight[index],
        marker: {
          size: 15,
        },
        image: {
          path: img,
        }

      })
    }
    // setImageArr(temp)
  }
  // function handledropdownMenu() {
  //   document.getElementById("myDropdownPurchase").style.display === "block" ? document.getElementById("myDropdownPurchase").style.display = "none" : document.getElementById("myDropdownPurchase").style.display = "block";
  // }

  // function handleSelectedChart(num) {
  //   // setBranchWiseChart(num)
  // }

  function handleonchangeCurrency() {
    // console.log("innn")
    document.getElementById("myDropdowniconPurchase").style.display === "block" ? document.getElementById("myDropdowniconPurchase").style.display = "none" : document.getElementById("myDropdowniconPurchase").style.display = "block";
  }

  window.onclick = function (event) {

    if (!event.target.matches('.dropbtn')) {
      if (document.getElementsByClassName("dropdown-contenticon")[8] !== undefined) {
        document.getElementsByClassName("dropdown-contenticon")[8].style.display = "none";
      }
    }
  }


  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="graph-card">
        <div href="#" target="_self" className="card-title-graph">
          <p><i className="fas fa-people-carry"></i>
            Purchase Party Wise</p>
          <div className='btnicons'>
            <img src={drop} className='dropbtn' onClick={handleonchangeCurrency}></img>

            <div id="myDropdowniconPurchase" className="dropdown-contenticon" onClick={handleclick}>
              <a id='bar' className='bar'>bar</a><hr className='custom-hr' />
              <a id='barl' className='bar'>lollipop chart </a><hr className='custom-hr' />
              <a id='heatmap' className='heatmap'>Heat map </a><hr className='custom-hr' />
            </div>
            <i class="fas fa-external-link-alt"></i>
          </div>

          {/* <i class="fas fa-external-link-alt"></i> */}
          {/* <p class="geex-content__header__quickaction__link  geex-btn__customizer dots" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu} >
            <img src={BlackDots} className='dropbtn' />
          </p>
          <div id="myDropdownPurchase" class="dropdown-content" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu}>
            <a id='option1' onClick={() => handleSelectedChart(1)}>Tree Map</a><hr class="custom-hr" />
            <a id='option2' onClick={() => handleSelectedChart(2)}>Radial Bar</a><hr class="custom-hr" />
            <a id='option2' onClick={() => handleSelectedChart(3)}>Semi Doughnut</a><hr class="custom-hr" />
          </div> */}
        </div>
        <div className="crancy-progress-card card-contain-graph">


        
        {flag === 'bar'
            ?
            <ReactApexChart options={options_bar} series={series} type={demo} height={350} />
            :null}
             {flag === 'barl'
            ?
            <ReactApexChart options={options_lolipop} series={series} type={demo} height={350} />
            :null}
            {flag === 'heatmap'?
            <table align='center' rules='rows' border='white' style={{ border: 'white', marginTop:setMargin() }}>
              <tr>
                <th>DesignCode</th>
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
