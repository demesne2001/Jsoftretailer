import React, { useContext, useEffect, useState } from 'react'


import ReactApexChart from 'react-apexcharts';
import img from '../../Assets/icons8-person-48.png'
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import { useNavigate } from 'react-router-dom';
import Notify from '../Notification/Notify';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'

export default function SalesManWise() {
  const [loader, setLoader] = useState(true)
  const [dataloader, setdataLoader] = useState(true)
  const [imagearr, setImageArr] = useState([])
  const contexData = useContext(contex);
  const [name, setName] = useState([])
  const [weight, setweight] = useState([])
  const [flag, setFlag] = useState()
  const ChartType = 'bar'
  const [data, setdata] = useState([])
  const [optionId, setOptionId] = useState()
  let inputdata = contexData.state;
  const navigate = useNavigate()
  const [flagSort, setflagSort] = useState('')
  let optionbar = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'bar',
    height: '400%',
    width: '100%',
    chartId: 'SalesManWise',
    Xaxis: name,
    Yaxis: weight,
  }
  let radialdata = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'polar-radialbar',
    height: '100%',
    width: '100%',
    chartId: 'SalesManWise Wise',
    radiusAxis: name,
    seriesdata: weight,
  }
  let optiondonut = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'donut',
    height: '100%',
    width: '100%',
    chartId: 'SalesManWise Wise',
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
    chartId: 'PieChartSalesManWise',
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
    chartId: 'RadialBarchartSalesManWise',
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
    chartId: 'SalesManWise 12',
    propdata: data,
    radius: [10, 110],
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

  useEffect(() => {
    imagepoint()

  }, [imagearr])

  function handleNavigation() {
    navigate('/graph-detail', { state: { grouping: "h.SalesmanID,h.SalesmanNAme", columnName: "SalesmanNAme", columnID: "SalesmanID", componentName: "SalesMan Wise", filterKey: "strSaleman", chartId: 11, FromDate: inputdata.FromDate, ToDate : inputdata.ToDate }, replace: true })
  }

  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'h.SalesmanID,h.SalesmanNAme', ['SortByLabel']: 'SalesmanNAme' }

    await post(inputdata, API.CommonChart, {}, 'post')
      .then((res) => {
        let name = [];
        let weight = [];
        let data = [];
        if (res.data !== undefined) {
          for (let index = 0; index < res.data.lstResult.length; index++) {
            data.push({ value: res.data.lstResult[index][inputdata['column']], name: res.data.lstResult[index]['SalesmanNAme'] })
            if (res.data.lstResult[index]['SalesmanNAme'] === null) {
              name.push("null")
            } else {
              name.push(res.data.lstResult[index]['SalesmanNAme'])
            }
            weight.push(res.data.lstResult[index][inputdata['column']])
          }
          setdata(data);
          setName(name)
          setweight(weight)
          setdataLoader(false)
          console.log(data, "asdsd");
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

  // useEffect(() => {

  // }, [inputdata])

  const series = [{
    name: 'weight',
    data: weight
  }]

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
      height: 350,
      type: 'bar',
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: 'top', // top, center, bottom
        },
      }
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return val;
      },
      offsetY: 20,
      style: {
        fontSize: '12px',
        colors: ["#304758"]
      }
    },

    tooltip: {
      x: {
        show: true,
        formatter: function (val) {
          return val
        }
      },
      y: {
        show: true,
        formatter: function (val) {
          if (inputdata['column'] === 'Prc') {
            return val.toString() + "%"
          } else {
            return val
          }
        }
      },
    },
    xaxis: {
      categories: name,
      position: 'bottom',
      axisBorder: {
        show: false
      },
      axisTicks: {
        show: true
      },
      crosshairs: {
        fill: {
          type: 'gradient',
          gradient: {
            colorFrom: '#D8E3F0',
            colorTo: '#BED1E6',
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          }
        }
      }
    },
    yaxis: {
      axisBorder: {
        show: true
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: true,
        formatter: function (val) {
          return val;
        }
      }
    },

    annotations: {
      // points: imagearr,
      tooltip: {
        enabled: true,
      }
    },
    responsive: [{
      breakpoint: 593,
      options: {

        xaxis: {
          labels: {
            formatter: function (val) {
              if (val.length > 3) {
                return val.slice(0, 3) + "..."
              } else {
                return val
              }
            }
          }
        },
        yaxis: {
          labels: {
            show: true,
            formatter: function (val) {

              return ((val / 1000).toFixed(0)).toString() + "KG"

            }

          }
        }
      },
    }]
  }


  function handleclick(e) {

    if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconbranch' && e.target.id !== '') {

      setFlag(e.target.id)
    }
    else {

    }

  }

  function handleonchangeCurrency() {

    document.getElementById("myDropdowniconSalesManWise").style.display === "block" ? document.getElementById("myDropdowniconSalesManWise").style.display = "none" : document.getElementById("myDropdowniconSalesManWise").style.display = "block";
  }

  document.getElementById("root").addEventListener("click", function (event) {
    if (event.target.id !== 'icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
      if (document.getElementById("myDropdowniconSalesManWise") !== null) {
        document.getElementById("sorticonSalesManWise").style.display = "none"
        document.getElementById("myDropdowniconSalesManWise").style.display = "none"
      }
    }
  });

  async function fetchOption() {
    await post({ "ID": 11, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

      .then((res) => {
        if (res.data !== undefined) {
          if (res.data.lstResult.length === 0) {
            setFlag(ChartType)

            post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 11, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
              .then((res) => {

                post({ "ID": 11, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
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
            setFlag(res.data.lstResult[0].ChartOption)
          }
        } else {
          alert(res['Error']);
        }

      })
  }

  async function addEditOption() {

    await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 11, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
      .then((res) => {

        Notify()

      })
  }
  function handleSorting() {
    document.getElementById("sorticonSalesManWise").style.display === "block" ? document.getElementById("sorticonSalesManWise").style.display = "none" : document.getElementById("sorticonSalesManWise").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')

    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {
        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonSalesManWise') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }

  function handleclickSort(e) {
    if (e.target.id !== 'sorticonSalesManWise' && e.target.id !== '') {
      setflagSort(e.target.id)
    }
  }

  async function fetchSortData() {
    var inputForSort = { ...inputdata, 'SortByLabel': 'SalesmanNAme', 'SortBy': flagSort, ['Grouping']: 'h.SalesmanID,h.SalesmanNAme' }

    await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
      let name = [];
      let weight = [];
      let data = [];
      if (res.data !== undefined) {
        for (let index = 0; index < res.data.lstResult.length; index++) {
          data.push({ value: res.data.lstResult[index][inputdata['column']], name: res.data.lstResult[index]['SalesmanNAme'] })
          if (res.data.lstResult[index]['SalesmanNAme'] === null) {
            name.push("null")
          } else {
            name.push(res.data.lstResult[index]['SalesmanNAme'])
          }
          weight.push(res.data.lstResult[index][inputdata['column']])
        }
        setdata(data);
        setName(name)
        setweight(weight)
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
    <div className="col-lg-4 col-md-6 col-12">
      <div className="graph-card">
        <div className="card-title-graph">

          <div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
            <p><i className="fas fa-users"></i> Salesmen Wise</p>
          </div>


          <div className="col-sm-2 col-md-2 col-2">
            <div className='d-flex '>
              <div className='dropbtngraph'>
                <i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} />
              </div>
              <div className='dropbtngraph'>
                <i class="fa-solid fa-ellipsis-vertical" id='icon_drop' onClick={handleonchangeCurrency} />
              </div>
            </div>

            <div id="sorticonSalesManWise" className="dropdown-contenticon" onClick={handleclickSort}>
              {flagSort === 'Label' ? <><a id='Label'>Sort by SalesMan ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by SalesMan ASC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by SalesMan DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by SalesMan DESC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
              {flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
            </div>
            {/* <img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img> */}
            <div className='btnicons'>
              {/* <img src={drop} className='dropbtn' onClick={handleonchangeCurrency} id='iconidsalesmanwise'></img> */}

              <div id="myDropdowniconSalesManWise" className="dropdown-contenticon" onClick={handleclick}>
                {flag === 'polarArea' ? <><a id='polarArea' >Polar Area&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='polarArea' >Polar Area</a><hr className='custom-hr' /></>}
                {flag === 'bar' ? <><a id='bar' className='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' className='bar' >Bar</a><hr className='custom-hr' /></>}
                {flag === 'donut' ? <><a id='donut' className='donut'>Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut' className='donut'>Donut</a><hr className='custom-hr' /></>}
                {flag === 'radialBar' ? <><a id='radialBar' className='radialBar'>Radial Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='radialBar' className='radialBar'>Radial Bar</a><hr className='custom-hr' /></>}
                {flag === 'pie' ? <><a id='pie' className='pie'>Pie Chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='pie' className='pie'>Pie chart </a><hr className='custom-hr' /></>}
                {flag === 'semidonut' ? <><a id='semidonut' className='semidonut'>Semi Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='semidonut' className='semidonut'>Semi Donut </a><hr className='custom-hr' /></>}
                <button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
                {/* <a id='pie' >Pie chart </a><hr className='custom-hr' /> */}
              </div>
            </div>
          </div>

        </div>
        {/* {weight.length !== 0 ?
        <div className="crancy-progress-card card-contain-graph">
          <ReactApexChart options={options} series={series} type="bar" height={350} />
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
			</div>} */}
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
