import React, { useEffect, useState, useContext, useRef } from "react";
import API from "../Utility/API";
import post from "../Utility/APIHandle";
import Modal from "react-bootstrap/Modal";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import contex from "../contex/Contex";
import * as htmlToImage from 'html-to-image';
import reactSelect from "react-select";
import download from 'downloadjs';


export default function Header_shedual_Analysis() {
  //define variable
  const contextData = useContext(contex);
  const animatedComponents = makeAnimated();
  const [syncDate, setSyncDate] = useState();
  const [filterFlag, setFIlterFlag] = useState(false);
  const [fullscreen, setFullScreen] = useState(false);
  const [tempFilterData, setTempFilterData] = useState(contextData.state)
  const DefaultFilter = {
		strBranch: "",
		strState: "",
		strCity: "",
		strItem: "",
		strSubItem: "",
		strItemGroup: "",
		strItemSubitem: "",
		strPurchaseParty: "",
		strSalesParty: "",
		strSaleman: "",
		strProduct: "",
		strDesignCatalogue: "",
		strSaleAging: "",
		strModeofSale: "",
		strTeamModeofSale: "",
		strDesignCodeID: "",
		strRegionID: "",
		FromDate: "",
		ToDate: "",
		strMetalType: "",
		strDayBook: "",
		PageNo: 0,
		PageSize: 9999,
		Search: "",
		Grouping: "",
		FilterIndex: "",
		strBranchValue: "",
		strItemValue: "",
		strSubItemValue: "",
		strItemGroupValue: "",
		strItemSubitemValue: "",
		strPurchasePartyValue: "",
		strSalesPartyValue: "",
		strSalemanValue: "",
		strProductValue: "",
		strDesignCatalogueValue: "",
		strSaleAgingValue: "",
		strModeofSaleValue: "",
		strTeamModeofSaleValue: "",
		strRegionValue: "",
		strDayBookValue: "",
		strStateValue: '',
		strMonth: "",
		strFinYear: "",
		strMonthValue: "",
		strDesignCodeValue: "",
		column: 'NetWeight',
		Unity: "G",
		SortBy: "wt-desc",
		SortByLabel:""
	};
  

  //useEffect
  useEffect(() => {
    getSyncDate()
    setCurrentDate()
  }, [])


  //function
  function fetchBrandData() {
    post()
  }

  function setCurrentDate() {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let currentDate
    if (month < 10) {
      if (day < 10) {
        currentDate = `${year}-0${month}-0${day}`;
      }
      else {
        currentDate = `${year}-0${month}-${day}`;
      }
    }
    else {
      if (day < 10) {
        currentDate = `${year}-0${month}-0${day}`;
      }
      else {
        currentDate = `${year}-0${month}-${day}`;
      }
    }
    setTempFilterData({ ...tempFilterData, ['ToDate']: currentDate });

  }

  function handleNavbar() {

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

  function handleOnClose() {
    setFIlterFlag(false);
  }

  function handlerOnOpen() {
    setFIlterFlag(true);
  }

  function Handlefullscreen() {
    if (fullscreen === true) {
      setFullScreen(false);
      document.exitFullscreen();
    } else {
      setFullScreen(true);
      var ele = document.documentElement;
      ele.requestFullscreen();
    }
  }

  function handleThousand(n) {
    localStorage.setItem("value", n);
    contextData.setcurrency(n);
  }

  async function getSyncDate() {
    await post({}, API.GetDefaultScreenData, {}, 'post')
      .then((res) => {
        setSyncDate(res.data.lstResult[0].SyncDate)
      })
  }

  function handleArrowLeft(str) {
    if (tempFilterData[str] !== "") {
      var ans = ""
      const date = new Date(tempFilterData[str]);
      var month = date.getMonth() + 1
      if (date.getDate() === 1) {
        if (month === 1) {
          ans = (date.getFullYear() - 1).toString() + "-12" + "-31"
        } else {
          ans = date.getFullYear().toString() + "-" + (month - 1).toString() + "-" + new Date(date.getFullYear(), month - 1, 0).getDate().toString()
        }
      } else {
        ans = date.getFullYear().toString() + "-" + month.toString() + "-" + (date.getDate() - 1).toString()
      }
      var listarr = ans.split("-")
      if (listarr[1].length < 2) {
        listarr[1] = "0" + listarr[1]
      }
      if (listarr[2].length < 2) {
        listarr[2] = "0" + listarr[2]
      }
      ans = listarr[0] + "-" + listarr[1] + "-" + listarr[2];
      setTempFilterData({ ...tempFilterData, [str]: ans })
    }

  }

  function handleArrowRight(str) {
    if (tempFilterData[str] !== "") {
      var ans = ""

      const date = new Date(tempFilterData[str]);
      var month = date.getMonth() + 1
      if (date.getDate() === new Date(date.getFullYear(), month, 0).getDate()) {
        if (month === 12) {
          ans = (date.getFullYear() + 1).toString() + "-01" + "-01"
        } else {
          ans = date.getFullYear().toString() + "-" + (month + 1).toString() + "-01"
        }
      } else {
        ans = date.getFullYear().toString() + "-" + month.toString() + "-" + (date.getDate() + 1).toString()
      }
      var listarr = ans.split("-")
      if (listarr[1].length < 2) {
        listarr[1] = "0" + listarr[1]
      }
      if (listarr[2].length < 2) {
        listarr[2] = "0" + listarr[2]
      }
      ans = listarr[0] + "-" + listarr[1] + "-" + listarr[2];
      setTempFilterData({ ...tempFilterData, [str]: ans })
    }
  }

  function handleonchangeCurrency() {
    document.getElementById("myDropdown").style.display === "block"
      ? (document.getElementById("myDropdown").style.display = "none")
      : (document.getElementById("myDropdown").style.display = "block");
  }

  function handleOnDateChange(e) {
    setTempFilterData({ ...tempFilterData, [e.target.name]: e.tareget.value });
  }

  return (
    <>
      <header className="crancy-header">
        <div className="container g-0">
          <div className="row g-0">
            <div className="col-12">
              <div className="crancy-header__inner">
                <div className="crancy-header__middle">
                  <div className="crancy-header__left">
                    <div className="crancy-header__nav-bottom">
                      <div className="logo crancy-sidebar-padding">
                        <a className="crancy-logo">
                          <img
                            className="crancy-logo__main"
                            src="image/logo/jsoft-initial.png"
                            alt="#"
                          />
                          <img
                            className="crancy-logo__main--dark"
                            src="image/logo/jsoft-initial.png"
                            alt="#"
                          />
                          <img
                            className="crancy-logo__main--small"
                            src="image/logo/jsoft-initial.png"
                            alt="#"
                          />
                          <img
                            className="crancy-logo__main--small--dark"
                            src="image/logo/jsoft-initial.png"
                            alt="#"
                          />
                        </a>
                      </div>
                    </div>

                    <div
                      id="crancy__sicon"
                      className="crancy__sicon close-icon" onClick={handleNavbar}
                    >
                      <i
                        className="fas fa-angle-left"
                        style={{ color: "#ffffff" }}
                      ></i>
                    </div>
                  </div>
                  <div className="geex-content__header">
                    <div className="geex-content__header__content">
                      <div className="geex-content__header__customizer">
                        <h2 className="geex-content__header__title">
                          Schedule Analysis
                        </h2>
                      </div>
                    </div>
                    <div className="geex-content__header__action">
                      <div className="geex-content__header__action__wrap">
                        <ul className="geex-content__header__quickaction">
                          <li className="from-date-to-date-header__quickaction">
                            <h5>
                              Last Sync :{syncDate}
                              <span className="text-muted">
                                { }
                              </span>
                            </h5>
                          </li>
                          <li className="geex-content__header__quickaction__item">
                            <div
                              className="geex-content__header__quickaction__link crancy-header__alarm top-header-icon"
                              id="Currency_Button"
                            >
                              <div className="button-open">
                                {localStorage.getItem("value") === "" ||
                                  localStorage.getItem("value") === null ? (
                                  <>

                                    {/* <img
                                      src={currency}
                                      className="dropbtn"
                                      onClick={handleonchangeCurrency}
                                    ></img>
                                     */}
                                    <button
                                      class="dropbtn"
                                      onClick={handleonchangeCurrency}>
                                      <i class='fas fa-rupee-sign'></i>
                                      <p class='value_name'> Default</p>
                                    </button>
                                    {/* <button class="fa fa-inr" aria-hidden="true" src={currency} className="dropbtn" onClick={handleonchangeCurrency} > </button> */}
                                  </>
                                ) : null}
                                {localStorage.getItem("value") === "k" ? (
                                  <button
                                    className="dropbtn"
                                    onClick={handleonchangeCurrency}>
                                    <i class='fas fa-rupee-sign'></i>
                                    <p class='value_name'>
                                      Thousand
                                    </p>
                                  </button>
                                ) : null}
                                {localStorage.getItem("value") === "l" ? (
                                  <button
                                    className="dropbtn"
                                    onClick={handleonchangeCurrency}
                                  >
                                    <i class='fas fa-rupee-sign'></i>
                                    <p class='value_name'>
                                      Lakh
                                    </p>
                                  </button>
                                ) : null}
                                {localStorage.getItem("value") === "m" ? (
                                  <button
                                    className="dropbtn"
                                    onClick={handleonchangeCurrency}>
                                    <i class='fas fa-rupee-sign'></i>
                                    <p class='value_name'>
                                      Million
                                    </p>
                                  </button>
                                ) : null}
                                {localStorage.getItem("value") === "c" ? (
                                  <button
                                    className=" dropbtn"
                                    onClick={handleonchangeCurrency}>
                                    <i class='fas fa-rupee-sign'></i>
                                    <p class='value_name'>
                                      Crore
                                    </p>
                                  </button>
                                ) : null}
                                {localStorage.getItem("value") === "b" ? (
                                  <button
                                    className="dropbtn"
                                    onClick={handleonchangeCurrency}
                                  >
                                    <i class='fas fa-rupee-sign'></i>
                                    <p class='value_name'>
                                      Billion
                                    </p>
                                  </button>
                                ) : null}
                              </div>
                            </div>
                            <div id="myDropdown" class="dropdown-content">
                              <a
                                id="default"
                                onClick={() => handleThousand("")}
                              >
                                Default
                              </a>
                              <hr className="custom-hr" />
                              <a
                                id="thousand"
                                onClick={() => handleThousand("k")}
                              >
                                Thousand
                              </a>
                              <hr className="custom-hr" />
                              <a id="lakh" onClick={() => handleThousand("l")}>
                                Lakh
                              </a>
                              <hr className="custom-hr" />
                              <a
                                id="million"
                                onClick={() => handleThousand("m")}
                              >
                                Million
                              </a>
                              <hr className="custom-hr" />
                              <a id="crore" onClick={() => handleThousand("c")}>
                                Crore
                              </a>
                              <hr className="custom-hr" />
                              <a
                                id="billion"
                                onClick={() => handleThousand("b")}
                              >
                                Billion
                              </a>
                            </div>
                          </li>
                          {/* <li className="geex-content__header__quickaction__item">
                            <div
                              className="geex-content__header__quickaction__link  geex-btn__customizer"
                              id="Filtermodal"
                            >
                              <i id="downloadPdf" className="fa-solid fa-file-pdf" > </i>
                            </div>
                          </li>
                          <li className="geex-content__header__quickaction__item">
                            <div
                              className="geex-content__header__quickaction__link  geex-btn__customizer"
                              id="Filtermodal"
                            >
                              <i id="downloadExcel" className="fa-solid fa-file-excel"  > </i>
                            </div>
                          </li> */}


                          <li className="geex-content__header__quickaction__item">
                            <div
                              className="geex-content__header__quickaction__link crancy-header__alarm top-header-icon"
                              id="crancy-header__full"
                            >
                              <i
                                className="fas fa-expand-alt"
                                onClick={Handlefullscreen}
                              ></i>
                            </div>
                          </li>
                          <li className="geex-content__header__quickaction__item">
                            <div
                              className="geex-content__header__quickaction__link  geex-btn__customizer"
                              id="Filtermodal"
                            >
                              <i
                                className="fas fa-filter"
                                onClick={handlerOnOpen}
                              ></i>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <Modal
        className="modal-dialog modal-dialog-centered  modal-lg modal-filter"
        show={filterFlag}
        onHide={handleOnClose}
        backdrop="static"
        keyboard={false}
        size="xl"
      >
        <Modal.Header class="modal-header">
          <h5 class="modal-title filter-modal-title"><i class="fa-solid fa-filter"></i> Filter By</h5>
          <button class="geex-btn geex-btn__customizer-close" onClick={handleOnClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"
                fill="#ffffff" />
              <path
                d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"
                fill="#ffffff" fill-opacity="0.8" />
            </svg>
          </button>

        </Modal.Header>


        <Modal.Body class="modal-body model-schedule">
          <div class="container">
            <div class="card-graph-detail">
              <div class="row">
                <div class="filter-top schedule-filter">
                  <form class="form-group">
                    <div class="row">
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="card-filter-contain top-card-filter">
                          <label for="sel1" class="form-label">
                            From Date
                          </label>
                          <div class="date-picker-filter">

                            <i class="fa-solid fa-chevron-left date-arrow-left" id="arrow-left" onClick={() => { handleArrowLeft('FromDate') }} />
                            <input
                              class="form-control  date-spacing "
                              type="date"
                              name="FromDate"
                              id="FromDate"
                              value={tempFilterData['FromDate']}
                              onChange={handleOnDateChange}
                            />
                            {/* <i class="fa-solid fa-chevron-right"></i>fa-solid fa-caret-right date-arrow-right */}
                            <i class="fa-solid fa-chevron-right date-arrow-right" onClick={() => { handleArrowRight('FromDate') }} />
                          </div>

                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="card-filter-contain top-card-filter">
                          <label for="sel1" class="form-label">
                            To Date
                          </label>
                          <div class="date-picker-filter">

                            <i class="fa-solid fa-chevron-left date-arrow-left" id="arrow-left" onClick={() => { handleArrowLeft('ToDate') }} />
                            <input
                              class="form-control"
                              type="date"
                              name="ToDate"
                              id="ToDate"
                              value={tempFilterData['ToDate']}
                              onChange={handleOnDateChange}
                            />
                            <i class="fa-solid fa-chevron-right date-arrow-right" onClick={() => { handleArrowRight('ToDate') }} />
                          </div>
                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="card-filter-contain">
                          <i class="fa-solid fa-building"></i>
                          <label for="sel1" class="form-label">
                            &nbsp;Branch
                          </label>
                          <Select
                            // defaultValue={[colourOptions[2], colourOptions[3]]}
                            name="unit"
                            className="basic-multi-select"
                            classNamePrefix="select"
                          />

                        </div>
                      </div>
                      <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12">
                        <div class="card-filter-contain">
                          <i class="fas fa-balance-scale"></i>
                          <label for="sel1" class="form-label">
                            &nbsp;Units
                          </label>

                          <Select
                            // defaultValue={[colourOptions[2], colourOptions[3]]}
                            name="unit"
                            className="basic-multi-select"
                            classNamePrefix="select"
                          />
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

        </Modal.Body>

        <Modal.Footer class="modal-footer">
          <button
            type="button"
            class="filter-footer-button"
            data-mdb-ripple-init
          >
            {" "}
            Reset{" "}
          </button>
          <button
            type="button"
            class="filter-footer-button"
            data-mdb-ripple-init
          >
            Apply
          </button>

        </Modal.Footer>


      </Modal>

    </>
  )
}
