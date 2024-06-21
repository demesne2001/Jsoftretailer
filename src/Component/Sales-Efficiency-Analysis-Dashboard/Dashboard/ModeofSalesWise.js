import React, { useCallback, useContext } from 'react'

import ReactApexChart from 'react-apexcharts';
import BlackDots from '../../Assets/image/Dots.png'
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import drop from '../../Assets/img/svg/dropdown.svg'
import { useEffect, useState } from 'react';
import contex from '../../contex/Contex';
import { useNavigate } from 'react-router-dom';
import ModeofSales_donut from '../../ChartOptions/ModeOfSales_donut';
import { ModeofSales_semiDonut } from '../../ChartOptions/ModeOfSales_semiDonut';
import Notify from '../Notification/Notify';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'


export default function ModeofSalesWise() {

  const [data, setdata] = useState([])
  const contexData = useContext(contex);
  const [name, setName] = useState([])
  const [weight, setweight] = useState([])
  const [prc, setprc] = useState([])
  const [flag, setflag] = useState()
  const [flagSort, setflagSort] = useState('')
  const [optionId, setOptionId] = useState()
  let inputdata = contexData.state;
  const ChartType = "semiDonut"
  const [loader, setLoader] = useState(true)
  const [dataloader, setdataLoader] = useState(true)
  const navigate = useNavigate()
  let optionbar = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'bar',
    height: '400%',
    width: '100%',
    chartId: 'modeofsales2',
    Xaxis: name,
    Yaxis: weight,
    prclst:prc
  }
  let radialdata = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'polar-radialbar',
    height: '100%',
    width: '100%',
    chartId: 'modeofsales3',
    radiusAxis: name,
    seriesdata: weight,
  }
  let optiondonut = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'donut',
    height: '100%',
    width: '100%',
    chartId: 'modeofsales4',
    propdata: data,
    radius: [10, 150],
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

  let optionpie = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'simplepie',
    height: '100%',
    width: '100%',
    propdata: data,
    chartId: 'modeofsales1',
    label: {
      position: 'inside',
      formatter: '{d}%',
      color: 'white',
      fontWeight: 'bold',
    },
  }
  let optradialbar = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'semi-donut',
    height: '100%',
    width: '100%',
    chartId: 'modeofsales5123456',
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
  let optionPolar = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'pie',
    height: '100%',
    width: '100%',
    chartId: 'modeofsales16',
    propdata: data,
    radius: [10, 110],
  }
console.log(optionPolar, 'aaa')

  useEffect(() => {
    fetchOption()
    getdata()
    console.log(inputdata.column, "sdsdsss");
  }, [inputdata])

  useEffect(() => {
    if (flagSort !== '') {
      fetchSortData()
    }
  }, [flagSort])

  async function fetchOption() {
    await post({ "ID": 17, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

      .then((res) => {
        if (res.data !== undefined) {
          if (res.data.lstResult.length === 0) {
            setflag(ChartType)

            post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 17, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
              .then((res) => {
                post({ "ID": 17, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
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

    await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 17, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
      .then((res) => {

        document.getElementById('myDropdowniconModeOfSales').style.display = 'none'
        Notify()

      })
  }

  function handleonchangeCurrency() {
    document.getElementById("myDropdowniconModeOfSales").style.display === "block" ? document.getElementById("myDropdowniconModeOfSales").style.display = "none" : document.getElementById("myDropdowniconModeOfSales").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')
    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {

        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconModeOfSales') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }


  function handleclick(e) {



    if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconModeOfSales' && e.target.id !== '') {

      setflag(e.target.id)
    }
    else {

    }

  }

  document.getElementById("root").addEventListener("click", function (event) {

    if (event.target.id !== 'icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
      if (document.getElementById("myDropdowniconModeOfSales") !== null) {
        document.getElementById("myDropdowniconModeOfSales").style.display = "none"
        document.getElementById("sorticonModeOfScale").style.display = "none"
      }
    }

  });

  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'a.ChallanGenerateTypeID,N.ChallanGenerateType', ['SortByLabel']: 'ChallanGenerateType' }

    await post(inputdata, API.CommonChart, {}, 'post')
      .then((res) => {
        let name = [];
        let weight = [];
        let prce = [];
        let data = [];
        if (res.data !== undefined) {
          for (let index = 0; index < res.data.lstResult.length; index++) {
            if (res.data.lstResult[index]['ChallanGenerateType'] === null) {
              name.push("null")
              data.push({ name: "null", value: res.data.lstResult[index][inputdata['column']] })
            } else {
              name.push(res.data.lstResult[index]['ChallanGenerateType'])
              data.push({value: res.data.lstResult[index][inputdata['column']],  name: res.data.lstResult[index]['ChallanGenerateType']})
            }
            weight.push(res.data.lstResult[index][inputdata['column']])
            prce.push(res.data.lstResult[index]['Prc'])
          }
      
          setdata(data);
          setName(name)
          setweight(weight)
          setprc(prce)
          setdataLoader(false)
          if (weight.length !== 0) {
            setLoader(false)
          } else {
            setLoader(true)
          }
          inputdata = { ...inputdata, ['Grouping']: '' }
        } else {
          alert(res['Error']);
        }
      })
  }

  function handleNavigation() {
    navigate('/graph-detail', { state: { grouping: "a.ChallanGenerateTypeID,N.ChallanGenerateType", columnName: "ChallanGenerateType", columnID: "ChallanGenerateTypeID", componentName: "Mode of Sales Wise", chartId: 17, FromDate: inputdata.FromDate, ToDate : inputdata.ToDate }, replace: true })
  }

  const series = weight

  const option_semiDonut = ModeofSales_semiDonut(name, inputdata['column'], prc)
  const options_donut = ModeofSales_donut(name, inputdata['column'])




  function handleSorting() {
    document.getElementById("sorticonModeOfScale").style.display === "block" ? document.getElementById("sorticonModeOfScale").style.display = "none" : document.getElementById("sorticonModeOfScale").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')

    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {
        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonModeOfScale') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }

  function handleclickSort(e) {
    if (e.target.id !== 'sorticonModeOfScale' && e.target.id !== '') {
      setflagSort(e.target.id)
    }
  }

  async function fetchSortData() {
    var inputForSort = { ...inputdata, 'SortByLabel': 'ChallanGenerateType', 'SortBy': flagSort, ['Grouping']: 'a.ChallanGenerateTypeID,N.ChallanGenerateType' }

    await post(inputForSort, API.CommonChart, {}, 'post')
      .then((res) => {
        let name = [];
        let weight = [];
        let prce = [];
        let data = [];
        if (res.data !== undefined) {
          for (let index = 0; index < res.data.lstResult.length; index++) {
            if (res.data.lstResult[index]['ChallanGenerateType'] === null) {
              name.push("null")
              data.push({ name: "null", value: res.data.lstResult[index][inputdata['column']] })
            } else {
              name.push(res.data.lstResult[index]['ChallanGenerateType'])
              data.push({value: res.data.lstResult[index][inputdata['column']],  name: res.data.lstResult[index]['ChallanGenerateType']})
            }
            weight.push(res.data.lstResult[index][inputdata['column']])
            prce.push(res.data.lstResult[index]['Prc'])
          }
          setdata(data);
          setName(name)
          setweight(weight)
          setprc(prce)
          setdataLoader(false)
          if (weight.length !== 0) {
            setLoader(false)
          } else {
            setLoader(true)
          }
          inputdata = { ...inputdata, ['Grouping']: '' }
        } else {
          alert(res['Error']);
        }
      })
  }

  return (
    <div className="col-lg-6 col-md-6 col-12">
      <div className="graph-card">
        <div className="card-title-graph">

          <div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation} >

            <p><i class="fas fa-chart-pie"></i> Mode of Sales Wise</p>

          </div>

          <div className="col-sm-2 col-md-2 col-2" >

            {/* <i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} ></i> */}
            <div className='d-flex '>
              <div className='dropbtngraph'>
                <i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} />
              </div>
              <div className='dropbtngraph'>
                <i class="fa-solid fa-ellipsis-vertical" id='icon_drop' onClick={handleonchangeCurrency} />
              </div>
            </div>
            <div id="sorticonModeOfScale" className="dropdown-contenticon" onClick={handleclickSort}>
              {flagSort === 'Label' ? <><a id='Label'>Sort by ModeOfScale ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by ModeOfScale ASC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by ModeOfScale DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by ModeOfScale DESC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
              {flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
            </div>
            {/* <img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img> */}

            <div className='btnicons'>


              <div id="myDropdowniconModeOfSales" className="dropdown-contenticon" onClick={handleclick}>
                {flag === 'polarArea' ? <><a id='polarArea' >Polar Area&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='polarArea' >Polar Area</a><hr className='custom-hr' /></>}
                {flag === 'bar' ? <><a id='bar' className='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' className='bar' >Bar</a><hr className='custom-hr' /></>}
                {flag === 'donut' ? <><a id='donut' className='donut'>Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut' className='donut'>Donut</a><hr className='custom-hr' /></>}
                {flag === 'radialBar' ? <><a id='radialBar' className='radialBar'>Radial Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='radialBar' className='radialBar'>Radial Bar</a><hr className='custom-hr' /></>}
                {flag === 'pie' ? <><a id='pie' className='pie'>Pie Chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='pie' className='pie'>Pie chart </a><hr className='custom-hr' /></>}
                {flag === 'semidonut' ? <><a id='semidonut' className='semidonut'>Semi Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='semidonut' className='semidonut'>Semi Donut </a><hr className='custom-hr' /></>}

                <button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>

              </div>

            </div>

          </div>
        </div>

        {dataloader !== true ?
          loader !== true ?
            <div className="crancy-progress-card card-contain-graph">

              {flag === 'polarArea' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionPolar))} /> : null}
              {flag === 'bar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionbar))} /> : null}
              {flag === 'donut' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optiondonut))} /> : null}
              {flag === 'radialBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(radialdata))} /> : null}
              {flag === 'pie' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionpie))} /> : null}
              {flag === 'semidonut' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optradialbar))} /> : null}
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
