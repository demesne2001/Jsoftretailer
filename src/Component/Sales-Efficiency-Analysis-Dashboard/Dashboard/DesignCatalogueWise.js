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
  const options_bar = DesignCatalogueWise_bar(name);
  const options_donut = DesignCatalogueWise_donut(name);
  const options_pie = DesignCatalogueWise_pie(name);
  const series1 = weight;
  const [flagSort, setflagSort] = useState()
  const series2 = [{
    name: 'weight',
    data: weight
  }]


  function handleclick(e) {

    if (e.target.id !== 'save') {
      // console.log('Updationg option')
      setflag(e.target.id)
    }
    else {
      // console.log("NOT UPDATING OPTIOJN")
    }

  }

  useEffect(() => {
    console.log("123456", inputdata['column']);
    fetchOption()
    getdata()
  }, [inputdata])

  useEffect(() => {
    fetchSortData()
  }, [flagSort])

  async function getdata() {

    inputdata = { ...inputdata, ['Grouping']: 'j.designCatalogID,j.DesignNo',['SortByLabel']:'DesignNo' }
    // console.log("branchwise data", inputdata);
    await post(inputdata, API.CommonChart, {}, 'post')
      .then((res) => {
        let name = [];
        let weight = [];
        let sale = [];
        var js = {};


        for (let index = 0; index < res.data.lstResult.length; index++) {
          js = { 'product': '', 'thisYearProfit': 0 }
          if (res.data.lstResult[index]['DesignNo'] === null) {
            name.push("null")
          } else {
            name.push(res.data.lstResult[index]['DesignNo'])
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
    navigate('/graph-detail', { state: { grouping: "j.designCatalogID,j.DesignNo", columnName: "DesignNo", columnID: "designCatalogID", componentName: "Design Catalogue Wise", filterKey: "strDesignCatalogue", chartId: 13 }, replace: true })
  }


  function handleonchangeCurrency() {
    // console.log("innn")
    document.getElementById("myDropdownicondesigncat").style.display === "block" ? document.getElementById("myDropdownicondesigncat").style.display = "none" : document.getElementById("myDropdownicondesigncat").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')
    if (tag_array !== undefined) {
      for (let i = 0; i < tag_array.length; i++) {
        console.log(document.getElementsByClassName('dropdown-contenticon'), 'tag');
        if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== 'myDropdownicondesigncat') {
          document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
        }
      }
    }
  }

  document.getElementById("root").addEventListener("click", function (event) {
    console.log(event.target, "class");
    if (event.target.className !== 'dropbtn icon_drop' && event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
      if (document.getElementById("myDropdownicondesigncat") !== null) {
        document.getElementById("myDropdownicondesigncat").style.display = "none"
        document.getElementById("sorticonDesignCat").style.display = "none"
      }
    }

  });

  async function fetchOption() {
    await post({ "ID": 13, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')

      .then((res) => {
        if (res.data.lstResult.length === 0) {
          setflag(ChartType)
          // console.log('FIRST TIME API CALLED')
          post({ "ChartOptionID": 0, "ChartOption": ChartType, "ChartID": 13, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
            .then((res) => {

              post({ "ID": 13, "vendorID": 1, "UserID": 1 }, API.GetChartOptionByID, {}, 'post')
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

    await post({ "ChartOptionID": optionId, "ChartOption": flag, "ChartID": 13, "vendorID": 1, "UserID": 1 }, API.ChartOptionAddEdit, {}, 'post')
      .then((res) => {

        alert(res.data.Message)

      })
  }

  function handleSorting() {
    document.getElementById("sorticonDesignCat").style.display === "block" ? document.getElementById("sorticonDesignCat").style.display = "none" : document.getElementById("sorticonDesignCat").style.display = "block";
    const tag_array = document.getElementsByClassName('dropdown-contenticon')
    // console.log(tag_array);
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
    console.log(inputForSort);
    await post(inputForSort, API.CommonChart, {}, 'post').then((res) => {
      let name = [];
        let weight = [];
        let sale = [];
        var js = {};


        for (let index = 0; index < res.data.lstResult.length; index++) {
          js = { 'product': '', 'thisYearProfit': 0 }
          if (res.data.lstResult[index]['DesignNo'] === null) {
            name.push("null")
          } else {
            name.push(res.data.lstResult[index]['DesignNo'])
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

    })
  }


  return (
    <div className="col-lg-4 col-md-6 col-12">
      <div className="graph-card">
        <div className="card-title-graph">
          <div className="col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
            <p><i className="fas fa-gem"></i>
              Design Catalogue Wise</p>
          </div>

          <div className="col-sm-2 col-md-2 col-2">
            <i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} ></i>

            <div id="sorticonDesignCat" className="dropdown-contenticon" onClick={handleclickSort}>
              {flagSort === 'Label' ? <><a id='Label'>Sort by DesignCatalog ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by DesignCatalog ASC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by DesignCatalog DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by DesignCatalog DESC&nbsp;</a><hr className='custom-hr' /></>}
              {flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
              {flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
            </div>
            <img src={drop} className='dropbtn icon_drop' onClick={handleonchangeCurrency} ></img>
            <div className='btnicons'>

              <div id="myDropdownicondesigncat" className="dropdown-contenticon" onClick={handleclick}>

                {flag === 'donut' ? <> <a id='donut' >Donut&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <> <a id='donut' >Donut</a><hr className='custom-hr' /></>}
                {flag === 'heatmap' ? <> <a id='heatmap' >Heatmap&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <> <a id='heatmap' >Heatmap</a><hr className='custom-hr' /></>}
                {flag === 'bar' ? <><a id='bar' >Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' >Bar</a><hr className='custom-hr' /></>}
                {flag === 'pie' ? <><a id='pie' >Pie chart&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='pie' >Pie chart </a><hr className='custom-hr' /></>}

                <button id='save' onClick={addEditOption}>Save&nbsp;<i class="fas fa-save"></i></button>
              </div>
            </div>
          </div>
          {/* <i className="fas fa-external-link-alt"></i> */}
          {/* <p class="geex-content__header__quickaction__link  geex-btn__customizer dots" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu} >
            <img src={BlackDots} className='dropbtn' />
          </p>
          <div id="myDropdownDesign" class="dropdown-content" onMouseEnter={handledropdownMenu} onMouseLeave={handledropdownMenu}>
            <a id='option1' onClick={() => handleSelectedChart(1)}>Radial Bar</a><hr class="custom-hr" />
            <a id='option2' onClick={() => handleSelectedChart(2)}>Pie</a><hr class="custom-hr" />
          </div> */}
        </div>
        {/* {weight.length !== 0 ?
        <div className="crancy-progress-card card-contain-graph">
          {flag === 'bar' ? <ReactApexChart options={options_bar} type={flag} series={series2} height={350} /> : null}
          {flag === 'pie' ? <ReactApexChart options={options_pie} type={flag} series={series1} height={350} /> : null}
          {flag === 'donut' ? <ReactApexChart options={options_donut} type={flag} series={series1} height={350} /> : null}

          {flag === 'heatmap' ?

            <table align='center' rules='rows' border='white' style={{ border: 'white', marginTop: setMargin() }}>
              <tr>
                <th>DesignNo</th>
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

            </table> : null
          }
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
              {flag === 'bar' ? <ReactApexChart options={options_bar} type={flag} series={series2} height={350} /> : null}
              {flag === 'pie' ? <ReactApexChart options={options_pie} type={flag} series={series1} height={350} /> : null}
              {flag === 'donut' ? <ReactApexChart options={options_donut} type={flag} series={series1} height={350} /> : null}

              {flag === 'heatmap' ?

                <table align='center' rules='rows' border='white' style={{ border: 'white', marginTop: setMargin() }}>
                  <tr>
                    <th>DesignNo</th>
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

                </table> : null
              }
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
