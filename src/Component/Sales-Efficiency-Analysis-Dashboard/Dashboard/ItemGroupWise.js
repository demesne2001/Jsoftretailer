import React, { useContext } from 'react'
import API from '../../Utility/API';
import { useEffect, useState } from 'react';
import post from '../../Utility/APIHandle'


import ReactApexChart from 'react-apexcharts';
import { ItemGroup_RadialBar } from '../../ChartOptions/ItemGroup_RadialBar';
import { ItemGroup_treemap } from '../../ChartOptions/ItemGroup_treemap';

import BlackDots from '../../Assets/image/Dots.png'
import contex from '../../contex/Contex';
import drop from '../../Assets/img/svg/dropdown.svg'
import '../../Assets/css/Custom.css'
import { useNavigate } from 'react-router-dom';


export default function ItemGroupWise() {
  const contexData = useContext(contex);
  const [name, setName] = useState([])
  const [weight, setweight] = useState([])
  const [finalarr, setarr] = useState([])
  const [flagSort, setflagSort] = useState('')
  let inputdata = contexData.state;
  const [loader, setLoader] = useState(true)
  const [dataloader, setdataLoader] = useState(true)
  const [flag, setflag] = useState()
  const ChartType = "radialBar"
  const [optionId, setOptionId] = useState()

  const options_radial = ItemGroup_RadialBar(name)
  const options_treemap = ItemGroup_treemap(name, inputdata['column'])
  const series_treemap = [
    {
      data: finalarr
    }
  ]
  const series_radial = handleSeriesData()

  const navigate = useNavigate()

  function handleSeriesData() {
    let percarray = []
    let sum = 0;
    if (inputdata['column'] === 'NetWeight') {
      for (let i = 0; i < weight.length; i++) {
        sum += weight[i];
      }

      for (let index = 0; index < weight.length; index++) {
        percarray.push((weight[index] / sum) * 100)
      }
      return percarray
    } else {
      return weight
    }
  }

  function handleclick(e) {

    if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconbranch' && e.target.id !== '') {

      setflag(e.target.id)
    }
    else {
      // console.log("NOT UPDATING OPTIOJN")
    }

  }

  const [seri, setseries] = useState([])
  const [opt, setopt] = useState([])

  useEffect(() => {
    fetchOption()
    getdata()
  }, [inputdata])
  useEffect(() => {
    if (flagSort !== '') {
      fetchSortData()
    }
  }, [flagSort])

  // useEffect(() => {
  //   setseries(select_series(flag))
  //   setopt(select_option(flag))
  // }, [flag])


  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'o.ItemGroupId,o.GroupName', ['SortByLabel']: 'GroupName' }
    // console.log("branchwise data", inputdata);
    await post(inputdata, API.CommonChart, {}, 'post')
      .then((res) => {
        let name = [];
        let weight = [];
        let finalarr = [];

        // console.log(res.data.lstResult)
        for (let index = 0; index < res.data.lstResult.length; index++) {
          if (res.data.lstResult[index]['GroupName'] === null) {
            name.push("null")
          } else {
            name.push(res.data.lstResult[index]['GroupName'])
          }
          finalarr.push({ x: res.data.lstResult[index]['GroupName'], y: res.data.lstResult[index][inputdata['column']] })
          weight.push(res.data.lstResult[index][inputdata['column']])
        }
        setdataLoader(false)
        if (weight.length !== 0) {
          setLoader(false)
        } else {
          setLoader(true)
        }
        setName(name)
        setweight(weight)
        setarr(finalarr)
        // console.log("itemgroup", weight);
        inputdata = { ...inputdata, ['Grouping']: '' }
      })
  }

  function handleNavigation() {
    navigate('/graph-detail', { state: { grouping: "o.ItemGroupId,o.GroupName", columnName: "GroupName", columnID: "ItemGroupId", componentName: "Item Group Wise", filterKey: "strItemGroup", chartId: 5 }, replace: true })
  }

  function handleonchangeCurrency() {
    // console.log("innn")
    document.getElementById("myDropdowniconigroup").style.display === "block" ? document.getElementById("myDropdowniconigroup").style.display = "none" : document.getElementById("myDropdowniconigroup").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')
    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {
        console.log(document.getElementsByClassName('dropdown-contenticon'), 'tag');
        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconigroup') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }

  document.getElementById("root").addEventListener("click", function (event) {
    console.log(event.target, "class");
    if (event.target.id !== 'icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
      if (document.getElementById("myDropdowniconigroup") !== null) {
        document.getElementById("myDropdowniconigroup").style.display = "none"
        document.getElementById("sorticonItemGroup").style.display = "none"
      }
    }

  });
  async function fetchOption() {
    await post({ "ID": 5, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

      .then((res) => {
        if (res.data.lstResult.length === 0) {

          // console.log('FIRST TIME API CALLED')
          setflag(ChartType)
          post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 5, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
            .then((res) => {

              post({ "ID": 5, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
                .then((res) => {
                  setOptionId(res.data.lstResult[0].ChartOptionID)
                })
              alert(res.data.Message)
            })


        }
        else {
          setOptionId(res.data.lstResult[0].ChartOptionID)
          setflag(res.data.lstResult[0].ChartOption)
        }

      })
  }

  async function addEditOption() {

    await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 5, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
      .then((res) => {
        document.getElementById('myDropdowniconigroup').style.display = 'none'
        alert(res.data.Message)

      })


  }

  function handleSorting() {
    document.getElementById("sorticonItemGroup").style.display === "block" ? document.getElementById("sorticonItemGroup").style.display = "none" : document.getElementById("sorticonItemGroup").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')
    // console.log(tag_array);
    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {
        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'sorticonItemGroup') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }

  function handleclickSort(e) {
    if (e.target.id !== 'sorticonItemGroup' && e.target.id !== '') {
      setflagSort(e.target.id)
    }
  }

  async function fetchSortData() {
    var inputForSort = { ...inputdata, 'SortByLabel': 'GroupName', 'SortBy': flagSort, ['Grouping']: 'o.ItemGroupId,o.GroupName' }
    console.log(inputForSort);
    await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
      let name = [];
      let weight = [];
      let finalarr = [];

      // console.log(res.data.lstResult)
      for (let index = 0; index < res.data.lstResult.length; index++) {
        if (res.data.lstResult[index]['GroupName'] === null) {
          name.push("null")
        } else {
          name.push(res.data.lstResult[index]['GroupName'])
        }
        finalarr.push({ x: res.data.lstResult[index]['GroupName'], y: res.data.lstResult[index][inputdata['column']] })
        weight.push(res.data.lstResult[index][inputdata['column']])
      }
      setdataLoader(false)
      if (weight.length !== 0) {
        setLoader(false)
      } else {
        setLoader(true)
      }
      setName(name)
      setweight(weight)
      setarr(finalarr)
      // console.log("itemgroup", weight);
      inputdata = { ...inputdata, ['Grouping']: '' }
    })
  }


  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="graph-card">
        <div className="card-title-graph">
          <div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
            <p><i className="fas fa-chart-area"></i> Item Group Wise</p>
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
            <div id="sorticonItemGroup" className="dropdown-contenticon" onClick={handleclickSort}>
              {flagSort === 'Label' ? <><a id='Label'>Sort by ItemGroup ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by ItemGroup ASC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by ItemGroup DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by ItemGroup DESC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
              {flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
            </div>
            {/* <img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img> */}
            <div className='btnicons'>
              <div id="myDropdowniconigroup" className="dropdown-contenticon" onClick={handleclick}>
                {/* {flag === 'radialBar' ? <><a id='radialBar'>Radial Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='radialBar'>Radial Bar</a><hr className='custom-hr' /></>} */}
                {flag === 'treemap' ? <><a id='treemap'>Treemap&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='treemap'>Treemap</a><hr className='custom-hr' /></>}
                <button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
              </div>
            </div>
          </div>
        </div>

        {dataloader !== true ?
          loader !== true ?
            <div className="crancy-progress-card card-contain-graph">

              {/* {flag === 'radialBar' ? <ReactApexChart options={options_radial} series={series_radial} height={390} type={flag} /> : null} */}
              {flag === 'treemap' ? <ReactApexChart options={options_treemap} series={series_treemap} height={390} type={flag} /> : null}

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
