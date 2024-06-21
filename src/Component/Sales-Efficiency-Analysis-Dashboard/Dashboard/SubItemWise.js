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
import Notify from '../Notification/Notify';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'

export default function SubItemWise() {

  const contexData = useContext(contex);
  const [name, setName] = useState([])
  const [weight, setweight] = useState([])
  let inputdata = contexData.state;
  const [loader, setLoader] = useState(true)
  const [dataloader, setdataLoader] = useState(true)
  const [flag, setflag] = useState()
  const ChartType = "bar"
  const [optionId, setOptionId] = useState()
  const [sales, setSales] = useState([])
  const [flagSort, setflagSort] = useState('')
  const options_Polar = SubItem_Polar(name, inputdata['column'])
  const options_bar = SubItemWise_bar(name, inputdata['column'])
  const [data, setdata] = useState([])
  const [prc, setprc] = useState([]);

  const series_bar = [{
    name: 'Weight',
    data: weight
  }]
  let optiondata = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'pie',
    height: '100%',
    width: '100%',
    chartId: 'subItemWise',
    propdata: data,
    radius: [10, 110],
  }
  let optradialbar = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'semi-donut',
    height: '100%',
    width: '100%',
    chartId: 'subItemWise',
    propdata: data,
    position: 'center',
    fontsize: 20,
    label: {
      show: false,
      position: 'center'
    },
    emphasis: {
      label: {
        show: true,
        fontSize: 20,
        fontWeight: 'bold'
      }
    }
  }

  let roundbar = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'roundbar',
    height: '100%',
    width: '100%',
    chartId: 'subItemWise',
    Xaxis: name,
    Yaxis: weight,
    divname: "crancy-progress-card card-contain-graph",
    prclst:prc
  }
  let radialdata = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'polar-radialbar',
    height: '100%',
    width: '100%',
    chartId: 'subItemWise',
    radiusAxis: name,
    seriesdata: weight,
  }
  const series_polar = weight;

  const navigate = useNavigate()

  function handleclick(e) {

    if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconbranch' && e.target.id !== '') {

      setflag(e.target.id)
    }
    else {

    }

  }


  const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()



  useEffect(() => {
    fetchOption()
    getdata()
  }, [inputdata])

  useEffect(() => {
    if (flagSort !== '') {
      fetchSortData()
    }
  }, [flagSort])


  function setMargin() {
    if (weight.length < 7) {
      return 80
    } else {
      return 30
    }
  }



  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'e.subitemID,e.subItemName', ['SortByLabel']: 'subItemName' }

    await post(inputdata, API.CommonChart, {}, 'post')
      .then((res) => {
        let name = [];
        let weight = [];
        let sale = [];
        var js = {};
        let tempdata = [];
        let tempprc = [];
        if (res.data !== undefined) {

          for (let index = 0; index < res.data.lstResult.length; index++) {
            js = { 'product': '', 'thisYearProfit': 0 }
            if (res.data.lstResult[index]['subItemName'] === null) {
              name.push("null")
              tempdata.push({ value: res.data.lstResult[index]['NetWeight'], name: 'null' })

            } else {
              name.push(res.data.lstResult[index]['subItemName'])
              tempdata.push({ value: res.data.lstResult[index]['NetWeight'], name: res.data.lstResult[index]['subItemName'] })
            }
            weight.push(res.data.lstResult[index][inputdata['column']])

            if (res.data.lstResult[index]['subItemName'] === null) {
              js['product'] = 'null'
            } else {
              js['product'] = res.data.lstResult[index]['subItemName']
            }
            js['thisYearProfit'] = res.data.lstResult[index][inputdata['column']]

            sale.push(js)
            tempprc.push(res.data.lstResult[index]['Prc']);
          }
          setprc(tempprc);
          setdata(tempdata)
          setName(name)
          setweight(weight)
          setdataLoader(false)
          if (weight.length !== 0) {
            setLoader(false)
          } else {
            setLoader(true)
          }
          var j = []
          for (let index = 0; index < sale.length; index++) {
            j.push({ ...sale[index], ['color']: gradientArray[index] })
          }
          setSales(j)

          inputdata = { ...inputdata, ['Grouping']: '' }
        } else {
          alert(res['Error']);
        }
      })
  }


  function handleNavigation() {
    navigate('/graph-detail', { state: { grouping: "e.subitemID,e.subItemName", columnName: "subItemName", columnID: "subitemID", componentName: " Sub-Item Wise", filterKey: "strSubItem", chartId: 6, FromDate: inputdata.FromDate, ToDate : inputdata.ToDate }, replace: true })
  }



  function handleonchangeCurrency() {

    document.getElementById("myDropdowniconsubitem").style.display === "block" ? document.getElementById("myDropdowniconsubitem").style.display = "none" : document.getElementById("myDropdowniconsubitem").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')
    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {

        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconsubitem') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }

  document.getElementById("root").addEventListener("click", function (event) {

    if (event.target.id !== 'icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
      if (document.getElementById("myDropdowniconsubitem") !== null) {
        document.getElementById("myDropdowniconsubitem").style.display = "none"
        document.getElementById("sorticonSubItem").style.display = "none"
      }
    }

  });

  async function fetchOption() {
    await post({ "ID": 6, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

      .then((res) => {
        if (res.data !== undefined) {
          if (res.data.lstResult.length === 0) {
            setflag(ChartType)

            post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 6, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
              .then((res) => {

                post({ "ID": 6, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
                  .then((res) => {
                    if (res.data !== undefined) {
                      setOptionId(res.data.lstResult[0].ChartOptionID)
                    } else {
                      alert(res['Error']);
                    }
                  })
                Notify()
              })

          }
          else {
            setOptionId(res.data.lstResult[0].ChartOptionID)
            setflag(res.data.lstResult[0].ChartOption)
          }
        } else {
          alert(res['Error']);
        }
      })
  }

  async function addEditOption() {

    await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 6, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
      .then((res) => {
        document.getElementById('myDropdowniconsubitem').style.display = 'none'
        Notify()

      })
  }
  function handleSorting() {
    document.getElementById("sorticonSubItem").style.display === "block" ? document.getElementById("sorticonSubItem").style.display = "none" : document.getElementById("sorticonSubItem").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')

    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {
        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonSubItem') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }

  function handleclickSort(e) {
    if (e.target.id !== 'sorticonSubItem' && e.target.id !== '') {
      setflagSort(e.target.id)
    }
  }

  async function fetchSortData() {
    var inputForSort = { ...inputdata, 'SortByLabel': 'subItemName', 'SortBy': flagSort, ['Grouping']: 'e.subitemID,e.subItemName' }

    await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
      let name = [];
      let weight = [];
      let sale = [];
      var js = {};
      let tempdata = [];
      let tempprc = [];
      if (res.data !== undefined) {
        for (let index = 0; index < res.data.lstResult.length; index++) {
          js = { 'product': '', 'thisYearProfit': 0 }
          if (res.data.lstResult[index]['subItemName'] === null) {
            name.push("null")
            tempdata.push({ value: res.data.lstResult[index]['NetWeight'], name: 'null' })

          } else {
            name.push(res.data.lstResult[index]['subItemName'])
            tempdata.push({ value: res.data.lstResult[index]['NetWeight'], name: res.data.lstResult[index]['subItemName'] })
          }
          weight.push(res.data.lstResult[index][inputdata['column']])

          if (res.data.lstResult[index]['subItemName'] === null) {
            js['product'] = 'null'
          } else {
            js['product'] = res.data.lstResult[index]['subItemName']
          }
          js['thisYearProfit'] = res.data.lstResult[index][inputdata['column']]
          tempprc.push(res.data.lstResult[index]['Prc']);
          sale.push(js)
        }
        setprc(tempprc);
        setdata(tempdata)
        setName(name)
        setweight(weight)
        setdataLoader(false)
        if (weight.length !== 0) {
          setLoader(false)
        } else {
          setLoader(true)
        }
        var j = []
        for (let index = 0; index < sale.length; index++) {
          j.push({ ...sale[index], ['color']: gradientArray[index] })
        }
        setSales(j)

        inputdata = { ...inputdata, ['Grouping']: '' }
      } else {
        alert(res['Error']);
      }
    })
  }



  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="graph-card">
        <div className="card-title-graph">
          <div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
            <p><i className="fas fa-th-list"></i> Sub-Item Wise</p>
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
            <div id="sorticonSubItem" className="dropdown-contenticon" onClick={handleclickSort}>
              {flagSort === 'Label' ? <><a id='Label'>Sort by SubItem ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by SubItem ASC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by SubItem DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by SubItem DESC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
              {flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
            </div>
            {/* <img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img> */}
            <div className='btnicons'>
              <div id="myDropdowniconsubitem" className="dropdown-contenticon" onClick={handleclick}>
                {flag === 'bar' ? <><a id='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' >Bar </a><hr className='custom-hr' /></>}
                {flag === 'polarArea' ? <><a id='polarArea' >Polar Area&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='polarArea' >Polar Area</a><hr className='custom-hr' /></>}
                {flag === 'semidonut' ? <><a id='semidonut' >Semi Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='semidonut' >Semi Donut</a><hr className='custom-hr' /></>}
                {flag === 'radialBar' ? <><a id='radialBar' >Radial Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='radialBar' >Radial Bar</a><hr className='custom-hr' /></>}
                <button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
              </div>
            </div>
          </div>

          {/* <i class="fas fa-external-link-alt"></i> */}
        </div>



        {dataloader !== true ?
          loader !== true ?
            <div className="crancy-progress-card card-contain-graph">
              {/* <ReactApexChart options={options} series={series} type="polarArea" height={390} /> */}
              {/* <RoundedBar/> */}

              {flag === 'bar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(roundbar))} /> : null}
              {flag === 'polarArea' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optiondata))} /> : null}
              {flag === 'semidonut' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optradialbar))} /> : null}
              {flag === 'radialBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(radialdata))} /> : null}

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
