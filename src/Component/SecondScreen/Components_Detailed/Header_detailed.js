import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import contex from '../../contex/Contex';



export default function Header_detailed(props) {

    const [fullscreen, setFullScreen] = useState(false);
    const contextData = useContext(contex)

    useEffect(() => {
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
    }, [])

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


    const navigate = useNavigate()

    function handleNavigation() {
        const element = document.getElementsByClassName("crancy-smenu")[0];
        element.classList.remove("crancy-close");

        const element1 = document.getElementsByClassName("crancy-header")[0];
        element1.classList.remove("crancy-close");
        const element2 = document.getElementsByClassName("crancy-adashboard")[0];
        element2.classList.remove("crancy-close");

        if (props.screen === 2) {
            navigate('/schedual_analysis', { replace: true })
        } else if (props.screen === 3) {
            navigate('/Stock_TO_Sales', { replace: true })
        } else if (props.screen === 4) {
            navigate('/minimum_stocks', { replace: true })
        } else {
            navigate('/Home', { replace: true })
        }
    }

    function handleNavbar() {

        if (document.getElementsByClassName("crancy-close")[0] !== undefined) {
            const element = document.getElementsByClassName("crancy-smenu")[0];
            element.classList.remove("crancy-close");

            const element1 = document.getElementsByClassName("crancy-header")[0];
            element1.classList.remove("crancy-close");

            const element2 = document.getElementsByClassName("crancy-adashboard")[0];
            element2.classList.remove("crancy-close");


        } else {
            const element = document.getElementsByClassName("crancy-smenu")[0];
            element.classList.add("crancy-close");

            const element1 = document.getElementsByClassName("crancy-header")[0];
            element1.classList.add("crancy-close");

            const element2 = document.getElementsByClassName("crancy-adashboard")[0];
            element2.classList.add("crancy-close");

        }

    }
    function handleResetAllContext() {

        if (props.screen === 2) {
            contextData.SetdetailedState({
                "TravellingTeamID": 0,
                "Mode": 0
            });
            contextData.setbillState({
                "ScheduleID": 0,
                "Mode": 0
            });
            contextData.setfiltername("");
        } else if (props.screen === 3 || props.screen === 4) {
            contextData.SetDetailsecondState({
                "FromDate": "2024-04-01",
                "ToDate": "2024-06-07",
                "StrBranchID": "",
                "StrCompanyID": "",
                "StrItemID": "",
                "StrSubItemID": "",
                "MetalType": "",
                "ItemGroupID": "",
                "MonthType": "Q",
                "Unit": "",
                "Mode": 5
            })
        } else {
            contextData.setDefaultChart({
                "strBranch": "",
                "strCompanyID": "",
                "strState": "",
                "strCity": "",
                "strItem": "",
                "strSubItem": "",
                "strItemGroup": "",
                "strRegionID": "",
                "strItemSubitem": "",
                "strPurchaseParty": "",
                "strDesignCodeID": "",
                "strSalesParty": "",
                "strSaleman": "",
                "strProduct": "",
                "strDesignCatalogue": "",
                "strSaleAging": "",
                "strModeofSale": "",
                "strTeamModeofSale": "",
                "FromDate": props.Date.FromDate,
                "ToDate": props.Date.ToDate ,
                "strMetalType": "",
                "strDayBook": "",
                "PageNo": 1,
                "PageSize": 10,
                "Search": "",
                "Grouping": "",
                "SortBy": "wt-desc",
                "SortByLabel": "",
            })
            contextData.setchartImage({
                "strBranch": "",
                "strState": "",
                "strCity": "",
                "strRegionID": "",
                "strSubItem": "",
                "strItem": "",
                "strItemGroup": "",
                "strItemSubitem": "",
                "strDesignCodeID": "",
                "strSalesParty": "",
                "strSaleman": "",
                "strProduct": "",
                "strDesignCatalog": "",
                "strSaleAging": "",
                "strMonth": "",
                "strFinYear": "",
                "PageNo": 1,
                "PageSize": 5
            })
            contextData.settagImageFilterName("")
            contextData.setdefaultchartFilterName("")
        }
    }
    function FormateDate(date) {
        if (date !== undefined && date !== null) {
            let listdate = date.split("-");
            let formateDateString = listdate[2] + "-" + listdate[1] + "-" + listdate[0]
            return formateDateString
        }

    }
    return (
        <header class="crancy-header">
            <div class="container g-0">
                <div class="row g-0">
                    <div class="col-12">
                        <div class="crancy-header__inner">
                            <div class="crancy-header__middle">
                                <div class="crancy-header__left">
                                    <div class="crancy-header__nav-bottom">
                                        <div class="logo crancy-sidebar-padding">
                                            <a class="crancy-logo">
                                                <img
                                                    class="crancy-logo__main"
                                                    src="image/logo/jsoft-initial.png"
                                                />
                                                <img
                                                    class="crancy-logo__main--small"
                                                    src="image/logo/jsoft-initial.png"
                                                />
                                            </a>
                                        </div>
                                    </div>

                                    <div id="crancy__sicon" class="crancy__sicon close-icon" onClick={handleNavbar}>
                                        <i class="fas fa-angle-right" style={{ color: '#ffffff' }}></i>
                                    </div>
                                </div>
                                <div class="geex-content__header">
                                    <div class='geex-header-title-date'>
                                        <div class="geex-content__header__content">
                                            <div class="geex-content__header__customizer">
                                                <h2 class="geex-content__header__title">
                                                    {props.screen === 2 ? "Schedule Analysis" : props.screen === 3 ? "Stock To Sales" : props.screen === 4 ? "Minimum Stocks" : "Sales Efficiency Analysis Dashboard"}
                                                </h2>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="geex-content__header__action">
                                        <div class="geex-content__header__action__wrap">
                                            <ul class="geex-content__header__quickaction">
                                                <li class="geex-content__header__quickaction__item">


                                                    {props.Date !== undefined ?
                                                        <div className='datesinheader'>
                                                            {props.Date.FromDate !== "" ? "From: " + FormateDate(props.Date.FromDate) + " " : null}
                                                            {props.Date.ToDate !== "" ? "To: " + FormateDate(props.Date.ToDate) : null}
                                                        </div>
                                                        : null
                                                    }

                                                </li>
                                                <li class="geex-content__header__quickaction__item">


                                                </li>
                                                <li class="geex-content__header__quickaction__item">
                                                    <div
                                                        class="geex-content__header__quickaction__link crancy-header__alarm top-header-icon"
                                                        id="crancy-header__full"
                                                    >
                                                        <i class="fas fa-expand-alt" onClick={Handlefullscreen}></i>
                                                    </div>
                                                </li>
                                                <li class="geex-content__header__quickaction__item">
                                                    <div
                                                        class="geex-content__header__quickaction__link"
                                                    >
                                                        <i class="fas fa-sync" onClick={handleResetAllContext}></i>
                                                    </div>
                                                </li>
                                                <li class="geex-content__header__quickaction__item">
                                                    <a>
                                                        <div
                                                            class="geex-content__header__quickaction__link"
                                                        >
                                                            <i class="fas fa-reply-all" onClick={handleNavigation} ></i>
                                                        </div>
                                                    </a>
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
    )
}



