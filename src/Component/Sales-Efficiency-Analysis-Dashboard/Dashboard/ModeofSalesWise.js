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


export default function ModeofSalesWise() {


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


  useEffect(() => {
    fetchOption()
     getdata()
  }, [inputdata])

  useEffect(() => {
    if (flagSort !== '') {
      fetchSortData()
    }
  }, [flagSort])

  async function fetchOption() {
    await post({ "ID": 17, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

      .then((res) => {
        if (res.data.lstResult.length === 0) {
          setflag(ChartType)
          // console.log('FIRST TIME API CALLED')
          post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 17, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
            .then((res) => {
              post({ "ID": 17, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
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
        // console.log(document.getElementsByClassName('dropdown-contenticon'), 'tag');
        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconModeOfSales') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }


  function handleclick(e) {

    // console.log('Event ID',e.target.id)

    if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconModeOfSales' && e.target.id !== '') {
      // console.log('Updationg option')
      setflag(e.target.id)
    }
    else {
      // console.log("NOT UPDATING OPTIOJN")
    }

  }

  document.getElementById("root").addEventListener("click", function (event) {
    // console.log(event.target, "class");
    if (event.target.id !== 'icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
      if (document.getElementById("myDropdowniconModeOfSales") !== null) {
        document.getElementById("myDropdowniconModeOfSales").style.display = "none"
        document.getElementById("sorticonModeOfScale").style.display = "none"
      }
    }

  });

  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'a.ChallanGenerateTypeID,N.ChallanGenerateType', ['SortByLabel']: 'ChallanGenerateType' }
    // console.log("branchwise data", inputdata);
    await post(inputdata, API.CommonChart, {}, 'post')
      .then((res) => {
        let name = [];
        let weight = [];
        let prce = [];
        // console.log(res.data)

        for (let index = 0; index < res.data.lstResult.length; index++) {
          if (res.data.lstResult[index]['ChallanGenerateType'] === null) {
            name.push("null")
          } else {
            name.push(res.data.lstResult[index]['ChallanGenerateType'])
          }
          weight.push(res.data.lstResult[index][inputdata['column']])
          prce.push(res.data.lstResult[index]['Prc'])
        }
        console.log(prce, "percentage");
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
      })
  }

  function handleNavigation() {
    navigate('/graph-detail', { state: { grouping: "a.ChallanGenerateTypeID,N.ChallanGenerateType", columnName: "ChallanGenerateType", columnID: "ChallanGenerateTypeID", componentName: "Mode of Sales Wise", chartId: 17 }, replace: true })
  }

  const series = weight

  const option_semiDonut = ModeofSales_semiDonut(name, inputdata['column'], prc)
  const options_donut = ModeofSales_donut(name, inputdata['column'])


  // const options = {
  //   chart: {
  //     toolbar: {
  //       show: true,
  //       offsetX: 0,
  //       offsetY: 0,
  //       tools: {
  //         download: true,
  //       },

  //     },
  //     type: 'donut',
  //   },
  //   colors: ['#51bde4', '#265cb9', '#00e396'],
  //   legend: {
  //     position: 'bottom'
  //   },
  //   responsive: [{
  //     breakpoint: 480,
  //     options: {
  //       chart: {
  //         width: 300
  //       },
  //     }
  //   }],
  //   plotOptions: {
  //     pie: {
  //       startAngle: -90,
  //       endAngle: 90,
  //       offsetY: 10,
  //       donut: {
  //         labels: {
  //           show: true,

  //           name: {
  //             fontSize: '20px',
  //             // color:"black"
  //           },
  //           value: {
  //             offsetY: 6,
  //             fontSize: '12px',
  //             fontFamily: 'Helvetica, Arial, sans-serif',
  //             fontWeight: 600,
  //           }
  //         }
  //       }
  //     }
  //   },
  //   labels: name
  // }

  function handleSorting() {
    document.getElementById("sorticonModeOfScale").style.display === "block" ? document.getElementById("sorticonModeOfScale").style.display = "none" : document.getElementById("sorticonModeOfScale").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')
    // console.log(tag_array);
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
    // console.log(inputForSort);
    await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
      let name = [];
      let weight = [];
      // console.log(res.data.lstResult)
      for (let index = 0; index < res.data.lstResult.length; index++) {
        if (res.data.lstResult[index]['ChallanGenerateType'] === null) {
          name.push("null")
        } else {
          name.push(res.data.lstResult[index]['ChallanGenerateType'])
        }
        weight.push(res.data.lstResult[index][inputdata['column']])
      }
      setName(name)
      setweight(weight)
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

                {flag === 'semiDonut' ? <><a id='semiDonut'>Semi Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='semiDonut' >Semi Donut</a><hr className='custom-hr' /></>}
                {flag === 'donut' ? <><a id='donut'>Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut' >Donut</a><hr className='custom-hr' /></>}

                <button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>

              </div>

            </div>

          </div>
        </div>
        {/* {weight.length !== 0 ?
          <div className="crancy-progress-card card-contain-graph">

            {flag === 'semiDonut' ? <ReactApexChart options={option_semiDonut} series={series} type="donut" height={390} /> : null }
            {flag === 'donut' ? <ReactApexChart options={options_donut} series={series} type="donut" height={390} /> : null }

          </div> :
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
          </div>} */}
        {dataloader !== true ?
          loader !== true ?
            <div className="crancy-progress-card card-contain-graph">

              {flag === 'semiDonut' ? <ReactApexChart options={option_semiDonut} series={series} type="donut" height={390} /> : null}
              {flag === 'donut' ? <ReactApexChart options={options_donut} series={series} type="donut" height={390} /> : null}

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
