import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import Header_detailed from './Components_Detailed/Header_detailed';
import './../Assets/css/Custom.css';
import './../Assets/css/style.css';
import './../Assets/css/responsive.css';
import Main_chart from './Components_Detailed/Main_chart';
import ContexState1 from '../contex/ContextState1';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Default_chart from './Components_Detailed/default_chart';
import API from '../Utility/API';
import post from '../Utility/APIHandle';
import Navbar from '../Sales-Efficiency-Analysis-Dashboard/NavigationBar/Navbar';
import Tag_Image from './Components_Detailed/Tag_Image';
import Notify from '../Sales-Efficiency-Analysis-Dashboard/Notification/Notify';
import { NotificationContainer } from 'react-notifications';



export default function DetailedScreen() {
    const location = useLocation()
    const navigate = useNavigate()
    const [graph, setGraph] = useState("") // passed as props to handle the component name , grouping and collum name from api
    const [mainChartProps, setMainChartProps] = useState()
    const [chartGroupId, setChartGroupId] = useState() // To fetch api data 
    const [chartGroup, setChartGroup] = useState() // To check and uncheck default button and add selected effect on slider
    const [defaultGroup, setdefaultGroup] = useState()
    const [urlData, seturlData] = useSearchParams()
    const [getUrlState] = useSearchParams()
    const [sliderData, setSliderData] = useState([]);
    let defaultChartGroup

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
    const settings = {

        speed: 100,
        slidesToShow: 5,
        slidesToScroll: 1,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2500,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ]
    };

    useEffect(() => {
        if (localStorage.getItem('username') === null) {
            navigate('/', { replace: true })
        }
        if (getUrlState.size === 0) {
            seturlData(location.state, { replace: true })
        }
        getUrlData()
    }, [])

    useEffect(() => {
        if (mainChartProps !== undefined && mainChartProps['chartId'] !== null) {
            setsliderDataByfunction()
            setDefaultGrouping()
            fetchOption()
        } else {
            getUrlData()
        }
    }, [mainChartProps])

    function getUrlData() {
        let urlData = {
            "grouping": getUrlState.get("grouping"),
            "columnID": getUrlState.get("columnID"),
            "columnName": getUrlState.get("columnName"),
            "componentName": getUrlState.get("componentName"),
            "filterKey": getUrlState.get("filterKey"),
            "chartId": getUrlState.get("chartId"),
            "FromDate":getUrlState.get("FromDate") !== '' ? getUrlState.get("FromDate") : `${year}-04-01`, 
            "ToDate":getUrlState.get("ToDate") !== '' ? getUrlState.get("ToDate") : currentDate, 
        }
        
        setMainChartProps(urlData)
    }

    function setsliderDataByfunction() {
        setSliderData([
            { name: 'Branch', iconClass: 'fas fa-chart-pie icon-m', group: 'a.BranchID,b.BranchName', column: 'BranchName', columnID: 'BranchID', componentName: 'Branch Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strBranch', FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate'] },
            { name: 'State', iconClass: 'fas fa-map-marker-alt icon-m', group: 'k.stateID,k.Statename', column: 'Statename', columnID: 'stateID', componentName: 'State Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strState', FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate'] },
            { name: 'City', iconClass: 'fas fa-city icon-m', group: 'c.cityname', column: 'cityname', columnID: 'cityname', componentName: 'City Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strCity' , FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate']},
            { name: 'Region', iconClass: 'fas fa-globe icon-m', group: 'l.RegionID,l.RegionName', column: 'RegionName', columnID: 'RegionID', componentName: 'Region Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strRegionID', FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate'] },
            { name: 'Item', iconClass: 'fas fa-project-diagram icon-m', group: 'd.itemID,d.ItemName', column: 'ItemName', columnID: 'itemID', componentName: 'Item Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strItem', FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate'] },
            { name: 'Sub-Item', iconClass: 'fas fa-th-list icon-m', group: 'e.subitemID,e.subItemName', column: 'subItemName', columnID: 'subitemID', componentName: 'Sub-Item Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strSubItem', FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate'] },
            { name: 'Item Group', iconClass: 'fas fa-chart-area icon-m', group: 'o.ItemGroupId,o.GroupName', column: 'GroupName', columnID: 'ItemGroupId', componentName: 'Item Group Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strItemGroup', FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate'] },
            { name: 'Item with Sub-item', iconClass: 'fas fa-sitemap icon-m', group: 'f.ItemSubNAme,f.ItemSubID', column: 'ItemSubNAme', columnID: 'ItemSubID', componentName: 'Item with Sub-item Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strItemSubitem', FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate'] },
            { name: 'Design Wise', iconClass: 'fas fa-people-carry icon-m', group: 'g.DesigncodeID,g.DesignCode', column: 'DesignCode', columnID: 'DesigncodeID', componentName: 'Design Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strDesignCodeID', FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate'] },
            { name: 'Sales Party', iconClass: 'fas fa-handshake icon-m', group: 'a.accountID,c.AccountName', column: 'AccountName', columnID: 'accountID', componentName: 'Sales Party Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strSalesParty', FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate'] },
            { name: 'Saleman', iconClass: 'fas fa-users icon-m', group: 'h.SalesmanID,h.SalesmanNAme', column: 'SalesmanNAme', columnID: 'SalesmanID', componentName: 'Saleman Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strSaleman', FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate'] },
            { name: 'Product', iconClass: 'fas fa-boxes icon-m', group: 'i.ProductId,i.ProductName', column: 'ProductName', columnID: 'ProductId', componentName: 'Product Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strProduct', FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate'] },
            { name: 'Design Catalogue', iconClass: 'fas fa-gem icon-m', group: 'j.designCatalogID,j.DesignNo', column: 'DesignNo', columnID: 'designCatalogID', componentName: 'Design Catalogue Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strDesignCatalogue', FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate'] },
            { name: 'Month', iconClass: 'fas fa-calendar-week icon-m', group: 'datename(month,a.voucherDate)', column: 'MonthName', columnID: 'MonthName', componentName: 'Month Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strMonth', FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate'] },
            { name: 'Year', iconClass: 'fas  fa-calendar-alt icon-m', group: 'M.FinYearID,m.YearCode', column: 'YearCode', columnID: 'FinYearID', componentName: 'Year Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strFinYear', FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate'] },
            { name: 'Sale Aging', iconClass: 'fas fa-chart-line icon-m', group: 'a.[rd.caption]', column: 'rd.caption', columnID: 'rd.caption', componentName: 'Sale Aging Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strSaleAging', FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate'] },
            // { name: 'Mode of Sale', iconClass: 'fas fa-layer-group icon-m', group: 'a.ChallanGenerateTypeID,N.ChallanGenerateType', column: 'ChallanGenerateType', componentName: 'Mode of Sale Wise', columnID: 'ChallanGenerateTypeID', filter_key1: mainChartProps['filterKey'], filter_key2: 'strModeofSale', FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate'] },
         ])
    }

    function setDefaultGrouping() {
        if (mainChartProps !== null) {
            if (mainChartProps.chartId > 1) {
                defaultChartGroup = {
                    name: 'Branch', iconClass: 'fas fa-chart-pie icon-m', group: 'a.BranchID,b.BranchName', column: 'BranchName', columnID: 'BranchID', componentName: 'Branch Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strBranch', FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate']
                }
            }
            else {
                defaultChartGroup = { name: 'Item', iconClass: 'fas fa-project-diagram icon-m', group: 'd.itemID,d.ItemName', column: 'ItemName', columnID: 'itemID', componentName: 'Item Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strItem' , FromDate:mainChartProps['FromDate'], ToDate:mainChartProps['ToDate']}
            }
        }
    }

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (

            <div
                className={className}
                style={{ ...style, marginLeft: '100px', zIndex: '1', display: "block", background: "#094876", width: '28px', height: '28px', top: '30%', fontSize: '10px' }}
                onClick={onClick}
            />

        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;

        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "#094876", zIndex: '1', width: '28px', height: '28px', top: '30%', fontSize: '10px' }}
                onClick={onClick}
            />
        );
    }


    function handleOnLink(str) {


        showSelectedSlider(str.componentName)


        if (chartGroup === str.group) {

            setGraph(str)
            document.getElementById("DefaultCheckBoxSeconScreen").checked = true;
        }

        else {
            document.getElementById("DefaultCheckBoxSeconScreen").checked = false;
            setGraph(str)
            setdefaultGroup(str.group)

        }
    }


    async function fetchOption() {

        post({ "ID": mainChartProps.chartId, "vendorID": 1, "UserID": 1 }, API.GetChartGroupByID, {}, 'post')
            .then((res) => {
                if (res.data !== undefined) {
                    if (res.data.lstResult.length === 0) {


                        post({ "ChartGroupID": 0, "ChartGroup": JSON.stringify(defaultChartGroup), "ChartID": mainChartProps.chartId, "vendorID": 1, "UserID": 1 }, API.ChartGroupAddEdit, {}, 'post')
                            .then((res) => {

                                post({ "ID": mainChartProps.chartId, "vendorID": 1, "UserID": 1 }, API.GetChartGroupByID, {}, 'post')
                                    .then((res) => {
                                        if (res.data !== undefined) {
                                            if (res.data.lstResult.length !== 0) {
                                                setChartGroup(JSON.parse(res.data.lstResult[0].ChartGroup).group)
                                                setChartGroupId(res.data.lstResult[0].ChartGroupID)
                                                setGraph(JSON.parse(res.data.lstResult[0].ChartGroup))
    
                                                showSelectedSlider(JSON.parse(res.data.lstResult[0].ChartGroup).componentName)
                                            }
                                           
                                        } else {
                                            alert(res['Error']);
                                        }
                                    })
                            })
                    }

                    else {



                        setChartGroup(JSON.parse(res.data.lstResult[0].ChartGroup).group)
                        setChartGroupId(res.data.lstResult[0].ChartGroupID)
                        setGraph(JSON.parse(res.data.lstResult[0].ChartGroup))

                        showSelectedSlider(JSON.parse(res.data.lstResult[0].ChartGroup).componentName)


                    }
                } else {
                    alert(res['Error']);
                }

            })

        document.getElementById('DefaultCheckBoxSeconScreen').checked = true

    }

    async function addEditOption() {




        setChartGroup(defaultGroup)


        post({ "ChartGroupID": chartGroupId, "ChartGroup": JSON.stringify(graph), "ChartID": mainChartProps.chartId, "vendorID": 1, "UserID": 1 }, API.ChartGroupAddEdit, {}, 'post')
            .then((res) => {

                Notify();
            })

    }

    function showSelectedSlider(selectedId) {
        if (document.getElementById(selectedId) !== null) {
            if (document.querySelector(".active") !== null) { // to deselect a icon
                document.querySelector(".active").className = document.querySelector(".active").className.replace('active', '')
            }
            document.getElementById(selectedId).className = document.getElementById(selectedId).className + ' ' + 'active'
        }
    }

    if (mainChartProps !== undefined && mainChartProps['chartId'] !== null) {
        return (
            <ContexState1>
                <Navbar />
                <NotificationContainer />
                <div id="crancy-dark-light">
                    <div class="crancy-body-area">
                        <Header_detailed Date={{FromDate : mainChartProps.FromDate , ToDate: mainChartProps.ToDate}} />

                        <section class="crancy-adashboard crancy-show">
                            <div class="container"></div>
                        </section>
                        <section class="crancy-adashboard dashboard-graphdetail">
                            <div class="container">
                                <div class="row">
                                    <div class="col-xl-6 col-lg-6 col-md-12 col-12">
                                        <Main_chart state={mainChartProps} />
                                    </div>
                                    <div class="col-xl-6 col-lg-6 col-md-12 col-12">
                                        <div class="top-slider">
                                            <div class="row">
                                                <div class="col-12">
                                                    <div class="graphdetailcards-silder graphdetailtopslider-card mb-0">

                                                        <ul id="topitem" class="js-carousel ag-carousel_list detailgraph-carousel topicon-gd">

                                                            <Slider {...settings} >
                                                                {
                                                                    sliderData.map((data) => {
                                                                        if (data.group === mainChartProps.grouping) {

                                                                        }
                                                                        else {
                                                                            return (
                                                                                <li class="ag-carousel_item">
                                                                                    <div class="ag-carousel_figure" >
                                                                                        <a onClick={() => { handleOnLink({ group: data.group, column: data.column, componentName: data.componentName, columnID: data.columnID, filter_key1: data.filter_key1, filter_key2: data.filter_key2 }) }}>
                                                                                              <div class="crancy-featured-user__ficon" id={data.componentName}>
                                                                                                <i class={data.iconClass}></i>
                                                                                            </div>
                                                                                            <h4 class="crancy-featured-user__fname">{data.name}</h4>
                                                                                        </a>
                                                                                    </div>
                                                                                </li>
                                                                            )
                                                                        }
                                                                    })
                                                                }
                                                            </Slider>
                                                        </ul>
                                                    </div>
                                                    <div class="crancy-featured-default-box">
                                                        <div class="crancy-featured-user__fcontent graphdetaildefault mb-0">
                                                            <form class="form-check checkbox-filter"  id='checkboxofdetailscreen'>
                                                                  <input class="form-check-input" type="checkbox" value="" id="DefaultCheckBoxSeconScreen" onClick={addEditOption} />
                                                                <label class="form-check-label checkbox-filter-label graphdetail-text" for="DefaultCheckBoxSeconScreen">Set as Default</label>
                                                            </form>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                        <Default_chart graph={graph} Date={{FromDate : mainChartProps.FromDate, ToDate: mainChartProps.ToDate}}  />
                                    </div>
                                    <Tag_Image   Date={{FromDate : mainChartProps.FromDate, ToDate: mainChartProps.ToDate}}/>

                                </div>

                            </div>


                        </section >
                    </div >
                </div>
            </ContexState1>

        )
    }
}
