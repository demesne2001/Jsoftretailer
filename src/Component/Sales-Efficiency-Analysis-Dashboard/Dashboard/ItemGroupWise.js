import React, { useContext } from 'react'
import API from '../../Utility/API';
import { useEffect, useState } from 'react';
import post from '../../Utility/APIHandle'
import contex from '../../contex/Contex';
import '../../Assets/css/Custom.css'
import { useNavigate } from 'react-router-dom';
import Notify from '../Notification/Notify';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'
import DataError from '../../Assets/image/Error.gif'

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
  const [prc, setprc] = useState([]);
  let optionbarpolar = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'polar-radialbar',
    height: '100%',
    width: '100%',
    chartId: 'ItemGroupWise',
    radiusAxis: name,
    seriesdata: weight,
    maxdegree: 80,
    tooltip: {
      formatter: `{b} <br> ${inputdata.column} - {c}${inputdata.column === 'Prc' ? '%' : ""}`,
      confine: true
    }
  }
  let treemap = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'treemap',
    height: '100%',
    width: '100%',
    seriesdata: [
      {
        data: finalarr
      }
    ],
    column: inputdata.column
  
  }

  let roundedBarHorizontal = {
    themeId: localStorage.getItem("ThemeIndex"),
    charttype: 'round-horizontal-bar',
    height: '100%',
    width: '100%',
    chartId: 'ItemGroupWise',
    Xaxis: name,
    color: ['#0073b0', '#caf77d', '#8bd9e8', '#c4e8f0'],
    Yaxis: weight,
    divname: 'crancy-progress-card card-contain-graph',
    prclst: prc,
    tooltip: {
      formatter: `{b} <br> ${inputdata.column} - {c}${inputdata.column === 'Prc' ? '%' : ""}`,
      confine: true
    }
  }

  const navigate = useNavigate()


  function handleclick(e) {

    if (e.target.id !== 'save' && e.target.id !== 'myDropdowniconbranch' && e.target.id !== '') {

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

    inputdata = { ...inputdata, ['Grouping']: 'o.ItemGroupId,o.GroupName', ['SortByLabel']: 'GroupName' }

    await post(inputdata, API.CommonChart, {}, 'post')
      .then((res) => {
        let name = [];
        let weight = [];
        let finalarr = [];
        let tempprc = [];
        if (res.data !== undefined) {
          for (let index = 0; index < res.data.lstResult.length; index++) {
            if (res.data.lstResult[index]['GroupName'] === null) {
              name.push("null")
            } else {
              name.push(res.data.lstResult[index]['GroupName'])
            }
            finalarr.push({ x: res.data.lstResult[index]['GroupName'], y: res.data.lstResult[index][inputdata['column']] })
            weight.push(res.data.lstResult[index][inputdata['column']])
            tempprc.push(res.data.lstResult[index]['Prc']);
          }
          setprc(tempprc);
          setdataLoader(false)
          if (weight.length !== 0) {
            setLoader(false)
          } else {
            setLoader(true)
          }
          setName(name)
          setweight(weight)
          setarr(finalarr)

          inputdata = { ...inputdata, ['Grouping']: '' }
        } else {
          alert(res['Error']);
        }
      })
  }

  function handleNavigation() {
    navigate('/graph-detail', { state: { grouping: "o.ItemGroupId,o.GroupName", columnName: "GroupName", columnID: "ItemGroupId", componentName: "Item Group Wise", filterKey: "strItemGroup", chartId: 5, FromDate: inputdata.FromDate, ToDate: inputdata.ToDate }, replace: true })
  }

  function handleonchangeCurrency() {

    document.getElementById("myDropdowniconigroup").style.display === "block" ? document.getElementById("myDropdowniconigroup").style.display = "none" : document.getElementById("myDropdowniconigroup").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')
    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {

        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdowniconigroup') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }

  document.getElementById("root").addEventListener("click", function (event) {

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
        if (res.data !== undefined) {
          if (res.data.lstResult.length === 0) {


            setflag(ChartType)
            post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 5, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
              .then((res) => {

                post({ "ID": 5, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
                  .then((res) => {
                    if (res.data !== undefined) {
                      if (res.data.lstResult.length !== 0) {
                      setOptionId(res.data.lstResult[0].ChartOptionID)
                      }
                    } else {
                      alert(res['Error']);
                    }
                  })
                Notify()
              })


          }
          else {
            if (res.data.lstResult.length !== 0) {
            setOptionId(res.data.lstResult[0].ChartOptionID)
            setflag(res.data.lstResult[0].ChartOption)
            }
          }
        } else {
          alert(res['Error']);
        }
      })
  }

  async function addEditOption() {

    await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 5, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
      .then((res) => {
        document.getElementById('myDropdowniconigroup').style.display = 'none'
        Notify()

      })


  }

  function handleSorting() {
    document.getElementById("sorticonItemGroup").style.display === "block" ? document.getElementById("sorticonItemGroup").style.display = "none" : document.getElementById("sorticonItemGroup").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')

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

    await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
      let name = [];
      let weight = [];
      let finalarr = [];
      let tempprc = [];
      if (res.data !== undefined) {
        for (let index = 0; index < res.data.lstResult.length; index++) {
          if (res.data.lstResult[index]['GroupName'] === null) {
            name.push("null")
          } else {
            name.push(res.data.lstResult[index]['GroupName'])
          }
          finalarr.push({ x: res.data.lstResult[index]['GroupName'], y: res.data.lstResult[index][inputdata['column']] })
          weight.push(res.data.lstResult[index][inputdata['column']])
          tempprc.push(res.data.lstResult[index]['Prc']);
        }
        setprc(tempprc);
        setdataLoader(false)
        if (weight.length !== 0) {
          setLoader(false)
        } else {
          setLoader(true)
        }
        setName(name)
        setweight(weight)
        setarr(finalarr)

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
            <p><i className="fas fa-chart-area"></i> Item Group Wise</p>
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
            <div id="sorticonItemGroup" className="dropdown-contenticon" onClick={handleclickSort}>
              {flagSort === 'Label' ? <><a id='Label'>Sort by ItemGroup ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by ItemGroup ASC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by ItemGroup DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by ItemGroup DESC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
              {flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
            </div>
            <div className='btnicons'>
              <div id="myDropdowniconigroup" className="dropdown-contenticon" onClick={handleclick}>
                {flag === 'radialBar' ? <><a id='radialBar'>Radial Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='radialBar'>Radial Bar</a><hr className='custom-hr' /></>}
                {flag === 'hbar' ? <><a id='hbar'>Horizantal bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='hbar'>Horizantal bar</a><hr className='custom-hr' /></>}
                {flag === 'treemap' ? <><a id='treemap'>Treemap&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='treemap'>Treemap</a><hr className='custom-hr' /></>}
                <button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
              </div>
            </div>
          </div>
        </div>

        {dataloader !== true ?
          loader !== true ?
            <div className="crancy-progress-card card-contain-graph">
              {flag === 'radialBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionbarpolar))} /> : null}
              {flag === 'hbar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(roundedBarHorizontal))} /> : null}
              {flag === 'treemap' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(treemap))} /> : null}
            </div> :
            <div className="crancy-progress-card card-contain-graph"  >
         <img id='errorImg'  src={DataError} />
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
