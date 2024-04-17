import React, { Children } from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header_detailed from './Components_Detailed/Header_detailed';
import './../Assets/css/Custom.css';
import './../Assets/css/style.css';
import './../Assets/css/responsive.css';
import Main_chart from './Components_Detailed/Main_chart';
import ContexState1 from '../contex/ContextState1';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from '../Assets/image/slider/ring1.png';
import img2 from '../Assets/image/slider/ring2.png';
import img3 from '../Assets/image/slider/ring3.png';
import img4 from '../Assets/image/slider/ring4.png';
import img5 from '../Assets/image/slider/ring5.png';
import img6 from '../Assets/image/slider/Ring11.png';
import img7 from '../Assets/image/slider/Ring12.png';
import img8 from '../Assets/image/slider/Ring13.png';
import img9 from '../Assets/image/slider/Ring14.png';
import img10 from '../Assets/image/slider/Ring15.png';
import Default_chart from './Components_Detailed/Default_chart';
import API from '../Utility/API';
import post from '../Utility/APIHandle';
import { elements } from 'chart.js';
const ChartGroupDefault = {
    "group": "a.BranchID,b.BranchName",
    "column": "BranchID",
    "componentName": "Branch Wise"
}
const ChartGroupDefaultBranch = {
    "group": "a.BranchID,b.BranchName",
    "column": "BranchID",
    "componentName": "Branch Wise"
}

let defaultChartGroup


export default function DetailedScreen() {
    const location = useLocation()
    const [graph, setGraph] = useState("") // passed as props to handle the component name , grouping and collum name from api
    const [componentName, setComponentName] = useState(location.state)

    const [chartGroupId, setChartGroupId] = useState() // To fetch api data 
    const [chartGroup, setChartGroup] = useState() // To check and uncheck default button and add selected effect on slider

    if (location.state.chartId > 1) {
        defaultChartGroup = {
            "group": "a.BranchID,b.BranchName",
            "column": "BranchName",
            "componentName": "Branch Wise"
        }
    }
    else {
        defaultChartGroup = {

            "group": "d.itemID,d.ItemName",
            "column": "itemID",
            "componentName": "Item Wise"
        }
    }




    const settings = {

        speed: 500,
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
                    slidesToScroll:2
                }
            }
        ]
    };


    useEffect(() => {
        fetchOption()
    }, [])

    function SampleNextArrow(props) {
        const { className, style, onClick } = props;
        return (

            <div
                className={className}
                style={{ ...style, marginLeft: '100px', display: "block", background: "#094876", width: '28px', height: '28px', top: '30%', fontSize: '10px' }}
                onClick={onClick}
            />

        );
    }

    function SamplePrevArrow(props) {
        const { className, style, onClick } = props;
        // console.log(style, className);
        return (
            <div
                className={className}
                style={{ ...style, display: "block", background: "#094876", width: '28px', height: '28px', top: '30%', fontSize: '10px' }}
                onClick={onClick}
            />
        );
    }


    function handleOnLink(str) {

        console.log('Onclick on data', str)
        showSelectedSlider(str.componentName)

        console.log('CHART GROUP AND CLICK CHART GROUP', chartGroup, str.group)
        if (chartGroup === str.group) {
            // document.getElementById("DefaultCheckBoxSeconScreen").checked = true; 
        }

        else {
            document.getElementById("DefaultCheckBoxSeconScreen").checked = false;
            setGraph(str)
            setChartGroup(str.group)
        }



        
    }

    

    async function fetchOption() {
        console.log(location.state.chartId)

        post({ "ID": location.state.chartId, "vendorID": 1, "UserID": 1 }, API.GetChartGroupByID, {}, 'post')
            .then((res) => {
                // console.log('API CALEED')
                if (res.data.lstResult.length === 0) {
                    console.log('Condition True second screen')
                    post({ "ChartGroupID": 0, "ChartGroup": JSON.stringify(defaultChartGroup), "ChartID": location.state.chartId, "vendorID": 1, "UserID": 1 }, API.ChartGroupAddEdit, {}, 'post')
                        .then((res) => {

                            post({ "ID": location.state.chartId, "vendorID": 1, "UserID": 1 }, API.GetChartGroupByID, {}, 'post')
                                .then((res) => {

                                    
                                    setChartGroup(JSON.parse(res.data.lstResult[0].ChartGroup).group)
                                    setChartGroupId(res.data.lstResult[0].ChartGroupID)
                                    setGraph(JSON.parse(res.data.lstResult[0].ChartGroup))

                                    showSelectedSlider(JSON.parse(res.data.lstResult[0].ChartGroup).componentName)

                                })
                        })
                }

                else {

                    setChartGroup(JSON.parse(res.data.lstResult[0].ChartGroup).group)
                    setChartGroupId(res.data.lstResult[0].ChartGroupID)
                    setGraph(JSON.parse(res.data.lstResult[0].ChartGroup))

                    showSelectedSlider(JSON.parse(res.data.lstResult[0].ChartGroup).componentName)


                }

            })

        document.getElementById('DefaultCheckBoxSeconScreen').checked = true

    }

    async function addEditOption() {

        // console.log('Chart GROUP ',chartGroupId)
        // console.log('GRAPH ',graph)

        

        // console.log({ "ChartGroupID": chartGroupId,"ChartGroup": chartGroup,"ChartID": location.state.chartOptionId,"vendorID": 1,"UserID": 1})
        post({ "ChartGroupID": chartGroupId, "ChartGroup": JSON.stringify(graph), "ChartID": location.state.chartId, "vendorID": 1, "UserID": 1 }, API.ChartGroupAddEdit, {}, 'post')
            .then((res) => {
                // alert(res.data.Message)
            })

    }

    function showSelectedSlider(selectedId) {

        console.log('SELECTED ID', selectedId)

        if (document.querySelector(".active") !== null) { // to deselect a icon


            document.querySelector(".active").className = document.querySelector(".active").className.replace('active', '')
        }

        document.getElementById(selectedId).className = document.getElementById(selectedId).className + ' ' + 'active'

    }

   


    const sliderData = [
        { name: 'Branch', iconClass: 'fas fa-chart-pie icon-m', group: 'a.BranchID,b.BranchName', column: 'BranchName', componentName: 'Branch Wise' },
        { name: 'State', iconClass: 'fas fa-map-marker-alt icon-m', group: 'k.stateID,k.Statename', column: 'Statename', componentName: 'State Wise' },
        { name: 'City', iconClass: 'fas fa-city icon-m', group: 'c.cityname', column: 'cityname', componentName: 'City Wise' },
        { name: 'Region', iconClass: 'fas fa-globe icon-m', group: 'l.RegionID,l.RegionName', column: 'RegionName', componentName: 'Region Wise' },
        { name: 'Item', iconClass: 'fas fa-project-diagram icon-m', group: 'd.itemID,d.ItemName', column: 'ItemName', componentName: 'Item Wise' },
        { name: 'Sub-Item', iconClass: 'fas fa-th-list icon-m', group: 'e.subitemID,e.subItemName', column: 'subItemName', componentName: 'Sub-Item Wise' },
        { name: 'Item Group', iconClass: 'fas fa-chart-area icon-m', group: 'o.ItemGroupId,o.GroupName', column: 'GroupName', componentName: 'Item Group Wise' },
        { name: 'Item with Sub-item', iconClass: 'fas fa-sitemap icon-m', group: 'f.ItemSubNAme,f.ItemSubID', column: 'ItemSubNAme', componentName: 'Item with Sub-item Wise' },
        { name: 'Purchase Party', iconClass: 'fas fa-people-carry icon-m', group: 'g.DesigncodeID,g.DesignCode', column: 'DesignCode', componentName: 'Purchase Party Wise' },
        { name: 'Sales Party', iconClass: 'fas fa-handshake icon-m', group: 'a.accountID,c.AccountName', column: 'AccountName', componentName: 'Sales Party Wise' },
        { name: 'Saleman', iconClass: 'fas fa-users icon-m', group: 'h.SalesmanID,h.SalesmanNAme', column: 'SalesmanNAme', componentName: 'Saleman Wise' },
        { name: 'Product', iconClass: 'fas fa-boxes icon-m', group: 'i.ProductId,i.ProductName', column: 'ProductName', componentName: 'Product Wise', },
        { name: 'Design Catalogue', iconClass: 'fas fa-gem icon-m', group: 'j.designCatalogID,j.DesignNo', column: 'DesignNo', componentName: 'Design Catalogue Wise' },
        { name: 'Month', iconClass: 'fas fa-calendar-week icon-m', group: 'datename(month,a.voucherDate)', column: 'MonthName', componentName: 'Month Wise' },
        { name: 'Year', iconClass: 'fas  fa-calendar-alt icon-m', group: 'M.FinYearID,m.YearCode', column: 'YearCode', componentName: 'Year Wise' },
        { name: 'Sale Aging', iconClass: 'fas fa-chart-line icon-m', group: 'a.[rd.caption]', column: 'rd.caption', componentName: 'Sale Aging Wise' },
        { name: 'Mode of Sale', iconClass: 'fas fa-layer-group icon-m', group: 'a.ChallanGenerateTypeID,N.ChallanGenerateType', column: 'ChallanGenerateType', componentName: 'Mode of Sale Wise' },
        { name: 'Team & Mode of Sale', iconClass: 'fas fa-stream icon-m', group: '', column: '', componentName: 'Team & Mode of Sale Wise' }
    ]

    return (
        <ContexState1>
            <div id="crancy-dark-light">
                <div class="crancy-body-area">
                    <Header_detailed />

                    <section class="crancy-adashboard crancy-show">
                        <div class="container"></div>
                    </section>
                    <section class="crancy-adashboard dashboard-graphdetail">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-12 col-12">
                                    <Main_chart state={componentName} />
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-12 col-12">
                                    <div class="top-slider">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="graphdetailcards-silder graphdetailtopslider-card">

                                                    <ul id="topitem" class="js-carousel ag-carousel_list detailgraph-carousel topicon-gd">

                                                        <Slider {...settings} >
                                                            {
                                                                sliderData.map((data) => {
                                                                    if (data.group === location.state.grouping) {
                                                                        // console.log('SAME GROUP', data.group)
                                                                    }
                                                                    else {
                                                                        return (
                                                                            <li class="ag-carousel_item">
                                                                                <figure class="ag-carousel_figure" >
                                                                                    <a onClick={() => { handleOnLink({ group: data.group, column: data.column, componentName: data.componentName }) }}>
                                                                                        <div class="crancy-featured-user__fcontent">
                                                                                            <div class="crancy-featured-user__ficon" id={data.componentName}>
                                                                                                <i class={data.iconClass}></i>
                                                                                            </div>
                                                                                            <h4 class="crancy-featured-user__fname">{data.name}</h4>
                                                                                        </div>
                                                                                    </a>
                                                                                </figure>
                                                                            </li>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </Slider>
                                                    </ul>
                                                </div>
                                                <div class="crancy-featured-default-box">
                                                    <div class="crancy-featured-user__fcontent graphdetaildefault">
                                                        <form class="form-check checkbox-filter">
                                                            {/* <input class="form-check-input" type="checkbox" value="" id="DefaultCheckBoxSeconScreen" onClick={handleDefault} /> */}
                                                            <input class="form-check-input" type="checkbox" value="" id="DefaultCheckBoxSeconScreen" onClick={addEditOption} />
                                                            <label class="form-check-label checkbox-filter-label graphdetail-text" for="DefaultCheckBoxSeconScreen">Set as Default</label>
                                                        </form>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <Default_chart graph={graph} />
                                </div>
                                <div class="col-xl-12 col-lg-12 col-md-12 col-12">
                                    <div class="title-top-graphdetail">
                                        <h5>Tag Image</h5>
                                    </div>
                                    <div class="graphdetailcards-silder graphdetail-fourthcard">
                                        {/* <div class="ag-carousel-arrow_box">
                                        <i class="js-ag-carousel-arrow_prev ag-carousel-arrow top-slider-prevarrow"></i>
                                        <i class="js-ag-carousel-arrow_next ag-carousel-arrow top-slider-nextarrow"></i>
                                    </div> */}
                                        <ul id="TagImage" class="js-carousel ag-carousel_list" >
                                            <Slider  {...settings} >
                                                <li class="ag-carousel_item">
                                                    <figure class="ag-carousel_figure">
                                                        <a href={img1} data-fancybox="gallery">
                                                            <img src={img1} class="ag-carousel_img"
                                                                alt="Certificates 1" />
                                                        </a>

                                                        <figcaption class="ag-carousel_figcaption">
                                                            111
                                                        </figcaption>
                                                    </figure>
                                                </li>

                                                <li class="ag-carousel_item">
                                                    <figure class="ag-carousel_figure">
                                                        <a href={img1} data-fancybox="gallery">
                                                            <img src={img1} class="ag-carousel_img"
                                                                alt="Certificates 1" />
                                                        </a>

                                                        <figcaption class="ag-carousel_figcaption">
                                                            112
                                                        </figcaption>
                                                    </figure>
                                                </li>

                                                <li class="ag-carousel_item">
                                                    <figure class="ag-carousel_figure">
                                                        <a href={img1} data-fancybox="gallery">
                                                            <img src={img1} class="ag-carousel_img"
                                                                alt="Certificates 1" />
                                                        </a>

                                                        <figcaption class="ag-carousel_figcaption">
                                                            113
                                                        </figcaption>
                                                    </figure>
                                                </li>

                                                <li class="ag-carousel_item">
                                                    <figure class="ag-carousel_figure">
                                                        <a href={img1} data-fancybox="gallery">
                                                            <img src={img1} class="ag-carousel_img"
                                                                alt="Certificates 1" />
                                                        </a>

                                                        <figcaption class="ag-carousel_figcaption">
                                                            114
                                                        </figcaption>
                                                    </figure>
                                                </li>

                                                <li class="ag-carousel_item">
                                                    <figure class="ag-carousel_figure">
                                                        <a href={img1} data-fancybox="gallery">
                                                            <img src={img1} class="ag-carousel_img"

                                                                alt="Certificates 1" />
                                                        </a>

                                                        <figcaption class="ag-carousel_figcaption">
                                                            115
                                                        </figcaption>
                                                    </figure>
                                                </li>

                                                <li class="ag-carousel_item">
                                                    <figure class="ag-carousel_figure">
                                                        <a href={img1} data-fancybox="gallery">
                                                            <img src={img1} class="ag-carousel_img"
                                                                alt="Certificates 1" />
                                                        </a>

                                                        <figcaption class="ag-carousel_figcaption">
                                                            116
                                                        </figcaption>
                                                    </figure>
                                                </li>

                                                <li class="ag-carousel_item">
                                                    <figure class="ag-carousel_figure">
                                                        <a href={img1} data-fancybox="gallery">
                                                            <img src={img1} class="ag-carousel_img"
                                                                alt="Certificates 1" />
                                                        </a>

                                                        <figcaption class="ag-carousel_figcaption">
                                                            117
                                                        </figcaption>
                                                    </figure>
                                                </li>

                                                <li class="ag-carousel_item">
                                                    <figure class="ag-carousel_figure">
                                                        <a href={img1} data-fancybox="gallery">
                                                            <img src={img1} class="ag-carousel_img"
                                                                alt="Certificates 1" />
                                                        </a>

                                                        <figcaption class="ag-carousel_figcaption">
                                                            118
                                                        </figcaption>
                                                    </figure>
                                                </li>
                                            </Slider>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </section >
                </div >
            </div>
        </ContexState1 >


    )
}
