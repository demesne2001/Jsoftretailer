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
import Notify from '../Notification/Notify';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'

export default function DesignCatalogueWise() {
  const [sales, setSales] = useState([])
  const navigate = useNavigate()
  const contexData = useContext(contex);
  const [name, setName] = useState([])
  const [weight, setweight] = useState([])
  let inputdata = contexData.state;
  const [loader, setLoader] = useState(true)
  const [dataloader, setdataLoader] = useState(true)
  const [flag, setflag] = useState()
  const ChartType = "donut"
  const gradientArray = new Gradient().setColorGradient("#01555b", "#98c8cb").getColors()
  const [optionId, setOptionId] = useState()
  const options_bar = DesignCatalogueWise_bar(name, inputdata['column']);
  const options_donut = DesignCatalogueWise_donut(name, inputdata['column']);
  const options_pie = DesignCatalogueWise_pie(name, inputdata['column']);
  const series1 = weight;
  const [data, setData] = useState()
  const [flagSort, setflagSort] = useState('')
  const series2 = [{
    name: 'weight',
    data: weight
  }]

  let optionbar = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'bar',
    height: '400%',
    width: '100%',
    chartId: 'DesigncatlogWise',
    Xaxis: name,
    Yaxis: weight,
  }

  let radialdata = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'polar-radialbar',
    height: '100%',
    width: '100%',
    chartId: 'DesigncatlogWise radialdata',
    radiusAxis: name,
    seriesdata: weight,
  }
  let optiondonut = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'donut',
    height: '100%',
    width: '100%',
    chartId: 'DesigncatlogWise optiondonut',
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
    chartId: 'DesigncatlogWise optionpie',
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
    chartId: 'DesigncatlogWise optradialbar',
    propdata: data,
    position: 'center',
    fontsize: 20,
    label:  {
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


  function handleclick(e) {

    if (e.target.id !== 'save') {

      setflag(e.target.id)
    }
    else {

    }

  }

  useEffect(() => {

    fetchOption()
    getdata()
  }, [inputdata])

  useEffect(() => {
    if (flagSort !== '') {
      fetchSortData()
    }
  }, [flagSort])
  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'j.designCatalogID,j.DesignNo', ['SortByLabel']: 'DesignNo' }

    await post(inputdata, API.CommonChart, {}, 'post')
      .then((res) => {
        let name = [];
        let weight = [];
        let sale = [];
        var js = {};
        let data = [];
        if (res.data !== undefined) {


          for (let index = 0; index < res.data.lstResult.length; index++) {
            js = { 'product': '', 'thisYearProfit': 0 }
            if (res.data.lstResult[index]['DesignNo'] === null) {
              name.push("null")
              data.push({ name: 'null', value: res.data.lstResult[index][inputdata['column']] })

            } else {
              name.push(res.data.lstResult[index]['DesignNo'])
              data.push({ name: res.data.lstResult[index]['DesignNo'], value: res.data.lstResult[index][inputdata['column']] })
            }
            weight.push(res.data.lstResult[index][inputdata['column']])

            if (res.data.lstResult[index]['DesignNo'] === null) {
              js['product'] = 'null'
            } else {
              js['product'] = res.data.lstResult[index]['DesignNo']
            }
            js['thisYearProfit'] = res.data.lstResult[index][inputdata['column']]

            sale.push(js)

          }
          setData(data)
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

  function setMargin() {
    if (weight.length < 7) {
      return 80
    } else {
      return 30
    }
  }




  function handleNavigation() {
    navigate('/graph-detail', { state: { grouping: "j.designCatalogID,j.DesignNo", columnName: "DesignNo", columnID: "designCatalogID", componentName: "Design Catalogue Wise", filterKey: "strDesignCatalogue", chartId: 13, FromDate: inputdata.FromDate, ToDate : inputdata.ToDate }, replace: true })
  }


  function handleonchangeCurrency() {

    document.getElementById("myDropdownicondesigncat").style.display === "block" ? document.getElementById("myDropdownicondesigncat").style.display = "none" : document.getElementById("myDropdownicondesigncat").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')
    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {

        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdownicondesigncat') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }

  document.getElementById("root").addEventListener("click", function (event) {

    if (event.target.id !== 'icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
      if (document.getElementById("myDropdownicondesigncat") !== null) {
        document.getElementById("myDropdownicondesigncat").style.display = "none"
        document.getElementById("sorticonDesignCat").style.display = "none"
      }
    }

  });

  async function fetchOption() {
    await post({ "ID": 13, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

      .then((res) => {
        if (res.data !== undefined) {



          if (res.data.lstResult.length === 0) {
            setflag(ChartType)

            post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 13, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
              .then((res) => {

                post({ "ID": 13, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
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

    await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 13, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
      .then((res) => {

        Notify()

      })
  }

  function handleSorting() {
    document.getElementById("sorticonDesignCat").style.display === "block" ? document.getElementById("sorticonDesignCat").style.display = "none" : document.getElementById("sorticonDesignCat").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')

    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {
        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonDesignCat') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }

  function handleclickSort(e) {
    if (e.target.id !== 'sorticonDesignCat' && e.target.id !== '') {
      setflagSort(e.target.id)
    }
  }

  async function fetchSortData() {
    var inputForSort = { ...inputdata, 'SortByLabel': 'DesignNo', 'SortBy': flagSort, ['Grouping']: 'j.designCatalogID,j.DesignNo' }

    await post(inputForSort, API.CommonChart, {}, 'post')
      .then((res) => {
        let name = [];
        let weight = [];
        let sale = [];
        var js = {};
        let data = [];
        if (res.data !== undefined) {


          for (let index = 0; index < res.data.lstResult.length; index++) {
            js = { 'product': '', 'thisYearProfit': 0 }
            if (res.data.lstResult[index]['DesignNo'] === null) {
              name.push("null")
              data.push({ name: 'null', value: res.data.lstResult[index][inputdata['column']] })

            } else {
              name.push(res.data.lstResult[index]['DesignNo'])
              data.push({ name: res.data.lstResult[index]['DesignNo'], value: res.data.lstResult[index][inputdata['column']] })
            }
            weight.push(res.data.lstResult[index][inputdata['column']])

            if (res.data.lstResult[index]['DesignNo'] === null) {
              js['product'] = 'null'
            } else {
              js['product'] = res.data.lstResult[index]['DesignNo']
            }
            js['thisYearProfit'] = res.data.lstResult[index][inputdata['column']]

            sale.push(js)

          }
          setData(data)
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
          alert(res['Error']);;
        }
      })
  }


  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="graph-card">
        <div className="card-title-graph">
          <div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
            <p><i className="fas fa-gem"></i> Design Catalogue Wise</p>
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
            <div id="sorticonDesignCat" className="dropdown-contenticon" onClick={handleclickSort}>
              {flagSort === 'Label' ? <><a id='Label'>Sort by DesignCatalog ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by DesignCatalog ASC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by DesignCatalog DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by DesignCatalog DESC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
              {flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
            </div>
            {/* <img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img> */}
            <div className='btnicons'>

              <div id="myDropdownicondesigncat" className="dropdown-contenticon" onClick={handleclick}>

                {flag === 'bar' ? <><a id='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' >Bar</a><hr className='custom-hr' /></>}
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
