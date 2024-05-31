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
import { useNavigate } from 'react-router-dom';
import Notify from '../Notification/Notify';
// import { flat } from '../../Assets/font/js/v4-shims';


export default function PurchasePartyWise() {


  // const contexData = useContext(contex)

  // let seriesData = [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
  // let xaxiscategories = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

  // let imagearr =[]

  const navigate = useNavigate()
  const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()
  const [loader, setLoader] = useState(true)
  const [dataloader, setdataLoader] = useState(true)
  const [imagearr, setImageArr] = useState([])
  const [sales, setSales] = useState([])
  const [flag, setflag] = useState()
  const [flagSort, setflagSort] = useState('')
  const ChartType = "donut"
  const [optionId, setOptionId] = useState()
  const [demo, setdemo] = useState("bar")
  const contexData = useContext(contex);
  const [name, setName] = useState([])
  const [weight, setweight] = useState([])
  let inputdata = contexData.state;
  const options_lolipop = PurchaseParty_lolipop(name, inputdata['column'])
  const options_bar = PurchaseParty_bar(name, inputdata['column'])
  const series = [{
    name: 'Weight',
    data: weight
  }]
  function handleclick(e) {
    if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconbranch' && e.target.id !== '') {
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

  function handleNavigation() {
    navigate('/graph-detail', { state: { grouping: "g.DesigncodeID,g.DesignCode", columnName: "DesignCode", columnID: "DesigncodeID", componentName: "Design Wise", filterKey: "strPurchaseParty", chartId: 9 }, replace: true })
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
    fetchOption()
     getdata()

  }, [inputdata])

  useEffect(() => {
    if (flagSort !== '') {
      fetchSortData()
    }
  }, [flagSort])


  useEffect(() => {
    imagepoint()

  }, [imagearr])

  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'g.DesigncodeID,g.DesignCode', ['SortByLabel']: 'DesignCode' }

    await post(inputdata, API.CommonChart, {}, 'post')
      .then((res) => {
        let sale = [];
        var js = {};
        let name = [];
        let weight = [];

        for (let index = 0; index < res.data.lstResult.length; index++) {
          if (res.data.lstResult[index]['DesignCode'] === null) {
            name.push("null")
          } else {
            name.push(res.data.lstResult[index]['DesignCode'])
          }
          weight.push(res.data.lstResult[index][inputdata['column']])

          js = { 'product': '', 'thisYearProfit': 0 }
          if (res.data.lstResult[index]['DesignCode'] === null) {
            js['product'] = 'null'
          } else {
            js['product'] = res.data.lstResult[index]['DesignCode']
          }
          js['thisYearProfit'] = res.data.lstResult[index][inputdata['column']]

          sale.push(js)


        }
        var j = []
        for (let index = 0; index < sale.length; index++) {
          j.push({ ...sale[index], ['color']: gradientArray[index] })
        }


        setName(name)
        setweight(weight)
        setSales(j)
        setdataLoader(false)
        if (weight.length !== 0) {
          setLoader(false)
        } else {
          setLoader(true)
        }

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

    document.getElementById("myDropdowniconPurchase").style.display === "block" ? document.getElementById("myDropdowniconPurchase").style.display = "none" : document.getElementById("myDropdowniconPurchase").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')
    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {

        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconPurchase') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }

  document.getElementById("root").addEventListener("click", function (event) {

    if (event.target.id !== 'icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
      if (document.getElementById("myDropdowniconPurchase") !== null) {
        document.getElementById("myDropdowniconPurchase").style.display = "none"
        document.getElementById("sorticonDesign").style.display = "none"
      }
    }

  });

  async function fetchOption() {
    await post({ "ID": 9, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

      .then((res) => {
        if (res.data.lstResult.length === 0) {
          setflag(ChartType)

          post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 9, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
            .then((res) => {
              post({ "ID": 9, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
                .then((res) => {
                  setOptionId(res.data.lstResult[0].ChartOptionID)
                })
              Notify()
            })

        }
        else {
          setOptionId(res.data.lstResult[0].ChartOptionID)
          setflag(res.data.lstResult[0].ChartOption)
        }

      })
  }

  async function addEditOption() {

    await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 9, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
      .then((res) => {
        document.getElementById('myDropdowniconPurchase').style.display = 'none'
        Notify()

      })
  }

  function handleSorting() {
    document.getElementById("sorticonDesign").style.display === "block" ? document.getElementById("sorticonDesign").style.display = "none" : document.getElementById("sorticonDesign").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')

    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {
        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonDesign') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }

  function handleclickSort(e) {
    if (e.target.id !== 'sorticonDesign' && e.target.id !== '') {
      setflagSort(e.target.id)
    }
  }

  async function fetchSortData() {
    var inputForSort = { ...inputdata, 'SortByLabel': 'DesignCode', 'SortBy': flagSort, ['Grouping']: 'g.DesigncodeID,g.DesignCode' }

    await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
      let sale = [];
      var js = {};
      let name = [];
      let weight = [];

      for (let index = 0; index < res.data.lstResult.length; index++) {
        if (res.data.lstResult[index]['DesignCode'] === null) {
          name.push("null")
        } else {
          name.push(res.data.lstResult[index]['DesignCode'])
        }
        weight.push(res.data.lstResult[index][inputdata['column']])

        js = { 'product': '', 'thisYearProfit': 0 }
        if (res.data.lstResult[index]['DesignCode'] === null) {
          js['product'] = 'null'
        } else {
          js['product'] = res.data.lstResult[index]['DesignCode']
        }
        js['thisYearProfit'] = res.data.lstResult[index][inputdata['column']]

        sale.push(js)


      }
      var j = []
      for (let index = 0; index < sale.length; index++) {
        j.push({ ...sale[index], ['color']: gradientArray[index] })
      }


      setName(name)
      setweight(weight)
      setSales(j)
      setdataLoader(false)
      if (weight.length !== 0) {
        setLoader(false)
      } else {
        setLoader(true)
      }

      inputdata = { ...inputdata, ['Grouping']: '' }
    })
  }



  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="graph-card">
        <div className="card-title-graph">
          <div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
            <p><i className="fas fa-people-carry"></i> Design Wise</p>
          </div>

          <div className="col-sm-2 col-md-2 col-2">
            {/* <i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} ></i> */}
            <div className='d-flex '>
              <div className='dropbtngraph'>
                <i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} />
              </div>
              <div className='dropbtngraph'>
                <i class="fa-solid fa-ellipsis-vertical" id='icon_drop' onClick={handleonchangeCurrency} />
              </div>
            </div>
            <div id="sorticonDesign" className="dropdown-contenticon" onClick={handleclickSort}>
              {flagSort === 'Label' ? <><a id='Label'>Sort by Design ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by Design ASC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by Design DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by Design DESC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
              {flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
            </div>
            {/* <img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img> */}
            <div className='btnicons'>
              <div id="myDropdowniconPurchase" className="dropdown-contenticon" onClick={handleclick}>
                {flag === 'bar' ? <><a id='bar' className='bar'>Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' className='bar'>bar</a><hr className='custom-hr' /></>}
                {/* {flag === 'barl' ? <><a id='barl' className='bar'>Lollipop chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='barl' className='bar'>Lollipop chart </a><hr className='custom-hr' /></>} */}
                {flag === 'heatmap' ? <><a id='heatmap' className='heatmap'>Heat map&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='heatmap' className='heatmap'>Heat map </a><hr className='custom-hr' /></>}
                <button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
              </div>
            </div>
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
        {/* {weight.length !== 0 ?
          <div className="crancy-progress-card card-contain-graph">



            {flag === 'bar'
              ?
              <ReactApexChart options={options_bar} series={series} type={demo} height={350} />
              : null}
            {flag === 'barl'
              ?
              <ReactApexChart options={options_lolipop} series={series} type={demo} height={350} />
              : null}
            {flag === 'heatmap' ?
              <table align='center' rules='rows' border='white' style={{ border: 'white', marginTop: setMargin() }}>
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

              </table> : null}
          </div> :
          <div className="crancy-progress-card card-contain-graph" >
            <div class="dot-spinner" style={{ margin: "auto", position: 'inherit' }} >
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
            </div>
          </div> } */}
        {dataloader !== true ?
          loader !== true ?
            <div className="crancy-progress-card card-contain-graph">



              {flag === 'bar'
                ?
                <ReactApexChart options={options_bar} series={series} type={demo} height={350} />
                : null}
              {flag === 'barl'
                ?
                <ReactApexChart options={options_lolipop} series={series} type={demo} height={350} />
                : null}
              {flag === 'heatmap' ?
                <table align='center' rules='rows' border='white' style={{ border: 'white', marginTop: setMargin() }}>
                  <tr>
                    <th>DesignCode</th>
                    <th>NetWeight</th>
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
            </div> :
            <div className="crancy-progress-card card-contain-graph"  >
              Not Found
            </div>
          :
          <div className="crancy-progress-card card-contain-graph">
            <div class="dot-spinner" style={{ margin: "auto", position: 'inherit' }} >
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
              <div class="dot-spinner__dot"></div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
