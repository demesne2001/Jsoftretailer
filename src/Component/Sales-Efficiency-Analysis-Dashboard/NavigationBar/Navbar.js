import React from 'react'

import jsoftInitial from '../../Assets/image/logo/jsoft-initial.png'


export default function Navbar() {
  return (
    <div className="crancy-body-area">

      <div className="crancy-smenu" id="CrancyMenu">

        <div className="admin-menu">

          <div className="logo crancy-sidebar-padding pd-right-0">
            <a className="crancy-logo">

						<img className="crancy-logo__main" src={jsoftInitial} alt="#"/>
						<img className="crancy-logo__main--dark" src={jsoftInitial} alt="#"/>

						<img className="crancy-logo__main--small" src={jsoftInitial} alt="#"/>
						<img className="crancy-logo__main--small--dark" src={jsoftInitial} alt="#"/>
					</a>
            <div id="crancy__sicon" className="crancy__sicon close-icon">
              <i className="fas fa-angle-right" style={{color:"#ffffff"}}></i>
            </div>
          </div>

          <div className="admin-menu__one crancy-sidebar-padding mg-top-20">

            <div className="menu-bar">
              <ul id="CrancyMenu" className="menu-bar__one crancy-dashboard-menu">
                <li><a className="collapsed"><span className="menu-bar__text">
                  <i className="fas fa-home"></i>
                  <span className="menu-bar__name">Dashboard</span></span></a>
                </li>
                <li><a className="collapsed"><span className="menu-bar__text">
                  <i className="fas fa-chart-line"></i>
                  <span className="menu-bar__name">Stock to sales</span></span></a>
                </li>
                <li><a className="collapsed"><span className="menu-bar__text">
                  <i className="fas fa-user-clock"></i>
                  <span className="menu-bar__name">Outstanding</span></span></a>
                </li>
                <li><a className="collapsed"><span className="menu-bar__text">
                  <i className="far fa-calendar-alt"></i>
                  <span className="menu-bar__name last-silderbar-title">Schedule
                    Analysis</span></span></a>
                </li>

              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
