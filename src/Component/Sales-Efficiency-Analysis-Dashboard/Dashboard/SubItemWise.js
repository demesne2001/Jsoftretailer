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

export default function SubItemWise() {

  const contexData = useContext(contex);
  const [name, setName] = useState([])
  const [weight, setweight] = useState([])
  let inputdata = contexData.state;

  const [flag, setflag] = useState("bar")
  const [sales, setSales] = useState([])

  const options_Polar = SubItem_Polar(name)
  const options_bar = SubItemWise_bar(name)
  const series_bar =  [{
    name: 'Weight',
    data: weight
  }]
  const series_polar = weight;

  function handleclick(e) {
    if (e.target.className !== 'custom-hr'){
			setflag(e.target.id)
		}
  }

  const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()



  useEffect(() => {
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


  

  

  function handleonchangeCurrency() {
    // console.log("innn")
    document.getElementById("myDropdowniconsubitem").style.display === "block" ? document.getElementById("myDropdowniconsubitem").style.display = "none" : document.getElementById("myDropdowniconsubitem").style.display = "block";
  }

  window.onclick = function (event) {

    if (!event.target.matches('.dropbtn') ) {
      // console.log("hii");
      if (document.getElementsByClassName("dropdown-contenticon")[5] !== undefined) {
        document.getElementsByClassName("dropdown-contenticon")[5].style.display = "none";
      }

    }
  }



  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="graph-card">
        <div className="card-title-graph">
          <p><i className="fas fa-th-list"></i>
            Sub-Item Wise</p>
          <div className='btnicons'>
            <img src={drop} className='dropbtn' onClick={handleonchangeCurrency} id='iconidcity'></img>

            <div id="myDropdowniconsubitem" className="dropdown-contenticon" onClick={handleclick}>
              <a id='bar' >Bar </a><hr className='custom-hr' />
              <a id='heatmap' >Heatmap</a><hr className='custom-hr' />
              <a id='polarArea' >polar area</a><hr className='custom-hr' />
            </div>
            <i class="fas fa-external-link-alt"></i>
          </div>

          {/* <i class="fas fa-external-link-alt"></i> */}
        </div>



        <div className="crancy-progress-card card-contain-graph">
          {/* <ReactApexChart options={options} series={series} type="polarArea" height={390} /> */}
          {/* <RoundedBar/> */}

          {flag === 'bar'?
            <ReactApexChart options={options_bar} series={series_bar} type={flag} height={350} />
            :null}
            
            {flag === 'polarArea'?<ReactApexChart options={options_Polar} series={series_polar} type={flag} height={350} />:null}
            {flag ==='heatmap'?
            <table align='center' rules='rows' border='white' style={{ border: 'white', marginTop:setMargin() }}>
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

            </table>:null}
        </div>
      </div>
    </div>
  )
}
