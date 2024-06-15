import React, { useEffect, useState } from 'react'

import jsoftInitial from '../../Assets/image/logo/jsoft-initial.png'
import jsoftMini from '../../Assets/image/Jsoft.png'
import { json, useNavigate } from 'react-router-dom';
import post from '../../Utility/APIHandle';
import API from '../../Utility/API';

export default function Navbar() {
  const navigate = useNavigate()
  // const [ChartPage, setChartPage] = useState([]);
  let TotalPage = []
  // useEffect(() => {
  //   if (ChartPage.length <= 0) {
  //     FetchPageData()
  //   }
  // }, [])
  let input = {
    VendorID: 0,
    PageID: 0
  }
  let ChartPage=[]
  ChartPage=JSON.parse(localStorage.getItem('PageData'))
  console.log('ChartPage',ChartPage)
  function FetchPageData() {
    post(input, API.GetPageData, [], 'post').then((res) => {
      if (res.data != undefined) {
        if (res.data.lstResult.length > 0) {
          // setChartPage(res.data.lstResult)
        }
      }
    })

  }

  const [syncDate, setSyncDate] = useState()
  useEffect(() => {
    getSyncDate()
  }, [])

  function handleNavbar() {
    // console.log(document.getElementsByClassName("crancy-close")[0],"element");
    if (document.getElementsByClassName("crancy-close")[0] !== undefined) {
      const element = document.getElementsByClassName("crancy-smenu")[0];
      element.classList.remove("crancy-close");

      const element1 = document.getElementsByClassName("crancy-header")[0];
      element1.classList.remove("crancy-close");

      const element2 = document.getElementsByClassName("crancy-adashboard")[0];
      element2.classList.remove("crancy-close");

      if (document.getElementsByClassName("crancy-adashboard")[1] !== undefined) {
        const element3 = document.getElementsByClassName("crancy-adashboard")[1];
        element3.classList.remove("crancy-close");
      }
    } else {
      const element = document.getElementsByClassName("crancy-smenu")[0];
      element.classList.add("crancy-close");

      const element1 = document.getElementsByClassName("crancy-header")[0];
      element1.classList.add("crancy-close");

      const element2 = document.getElementsByClassName("crancy-adashboard")[0];
      element2.classList.add("crancy-close");

      if (document.getElementsByClassName("crancy-adashboard")[1] !== undefined) {
        const element3 = document.getElementsByClassName("crancy-adashboard")[1];
        element3.classList.add("crancy-close");
      }
    }

  }

  function HandleLogoClick() {
    navigate('/Home',{replace:true})
    var element =   document.getElementById("root");
    element.scrollIntoView({ block: 'start' })
  }

  function handleSchedualAnalysisClick() {
    navigate('/schedual_analysis', { replace: true })
    var element = document.getElementById("root");
    element.scrollIntoView({ block: 'start' })
  }

  function handleOnDashboardClick() {
    navigate('/Home', { replace: true })
    var element = document.getElementById("root");
    element.scrollIntoView({ block: 'start' })
  }

  function handleOnStockToSalesClick() {
    navigate('/Stock_To_Sales', { replace: true });
    var element = document.getElementById("root");
    element.scrollIntoView({ block: 'start' })
  }

  function handleMinimumStock() {
    navigate('/minimum_stocks', { replace: true });
    var element = document.getElementById("root");
    element.scrollIntoView({ block: 'start' })
  }
  function handleDynamicPageClick(id, name) {
    navigate('/DynamicPage', { state: { PageID: id, PageName: name }, replace: true })
  }

  async function getSyncDate() {
    await post({}, API.GetDefaultScreenData, {}, 'post')
      .then((res) => {
        if (res.data !== undefined) {
          setSyncDate(res.data.lstResult[0].SyncDate)
        } else {
          alert(res['Error']);
        }
      })
  }



  return (
    <div className="crancy-body-area">

      <div className="crancy-smenu" id="CrancyMenu">

        <div className="admin-menu">

          <div className="logo crancy-sidebar-padding pd-right-0">
            <a className="crancy-logo" onClick={HandleLogoClick}>

              <img className="crancy-logo__main" src={jsoftInitial} alt="#" />
              <img className="crancy-logo__main--dark" src={jsoftInitial} alt="#" />

              <img className="crancy-logo__main--small" src={jsoftMini} alt="#" />
              <img className="crancy-logo__main--small--dark" src={jsoftMini} alt="#" />
            </a>
            <div id="crancy__sicon" className="crancy__sicon close-icon" onClick={handleNavbar}>
              {/* <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3.5" d="m9 5 7 7-7 7" />
              </svg> */}


              {/* <i style={{fontSize:'10px'}} class='fas'>&#xf105;</i> */}
              <i className="fas fa-angle-left" style={{ color: "#ffffff" }}></i>
            </div>
          </div>

          <div className="admin-menu__one crancy-sidebar-padding mg-top-20">

            <div className="menu-bar">
              <ul id="CrancyMenu" className="menu-bar__one crancy-dashboard-menu">
                <li><a className="collapsed" onClick={handleOnDashboardClick}><span className="menu-bar__text">
                  <i className="fas fa-home"></i>
                  <span className="menu-bar__name" >Dashboard</span></span></a>
                </li>
                <li><a className="collapsed" onClick={handleOnStockToSalesClick}><span className="menu-bar__text">
                  <i className="fas fa-chart-line"></i>
                  <span className="menu-bar__name">Stock to sales</span></span></a>
                </li>
                <li><a className="collapsed"><span className="menu-bar__text">
                  <i className="fas fa-user-clock"></i>
                  <span className="menu-bar__name">Outstanding</span></span></a>
                </li>
                <li><a className="collapsed" onClick={handleSchedualAnalysisClick}><span className="menu-bar__text">
                  <i className="far fa-calendar-alt"></i>
                  <span className="menu-bar__name last-silderbar-title">Schedule
                    Analysis</span></span></a>
                </li>
                {ChartPage !== null && ChartPage.length>0? ChartPage.map((key, i) => {
                  return (
                    <li><a className="collapsed" onClick={() => handleDynamicPageClick(key.PageID, key.PageName)}><span className="menu-bar__text">
                      <i className={key.SVGPath != '' && key.SVGPath != undefined ? key.SVGPath: "fas fa-user-clock"}></i>
                      <span className="menu-bar__name">{key.PageName}</span></span></a>
                    </li>
                  )
                })
                :null}


              </ul>
              <div className='syncdatediv'>
                <h5 className='syncdata'>
                  Last Sync :{syncDate}
                  <span className="text-muted">
                    { }
                  </span>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}
