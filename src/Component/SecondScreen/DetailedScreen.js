import React, { useRef } from 'react';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import Header_detailed from './Components_Detailed/Header_detailed';
import './../Assets/css/Custom.css';
import './../Assets/css/style.css';
// import './../Assets/css/fstyle.css';
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
import Default_chart from './Components_Detailed/default_chart';
import API from '../Utility/API';
import post from '../Utility/APIHandle';
import { elements } from 'chart.js';
import Navbar from '../Sales-Efficiency-Analysis-Dashboard/NavigationBar/Navbar';
import Fancybox from './Components_Detailed/Fancybox';
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
    const [imagePath, setimagePath] = useState([])
    const [barcode, setbarcode] = useState([])
    const [netweight, setnetweight] = useState([])
    const [urlData, seturlData] = useSearchParams()
    const [getUrlState] = useSearchParams()
    const [sliderData, setSliderData] = useState([]);
    let defaultChartGroup


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
            seturlData(location.state, {replace:true})
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
        }
        setMainChartProps(urlData)
    }

    function setsliderDataByfunction() {
        setSliderData([
            { name: 'Branch', iconClass: 'fas fa-chart-pie icon-m', group: 'a.BranchID,b.BranchName', column: 'BranchName', columnID: 'BranchID', componentName: 'Branch Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strBranch' },
            { name: 'State', iconClass: 'fas fa-map-marker-alt icon-m', group: 'k.stateID,k.Statename', column: 'Statename', columnID: 'stateID', componentName: 'State Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strState' },
            { name: 'City', iconClass: 'fas fa-city icon-m', group: 'c.cityname', column: 'cityname', columnID: 'cityname', componentName: 'City Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strCity' },
            { name: 'Region', iconClass: 'fas fa-globe icon-m', group: 'l.RegionID,l.RegionName', column: 'RegionName', columnID: 'RegionID', componentName: 'Region Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strRegionID' },
            { name: 'Item', iconClass: 'fas fa-project-diagram icon-m', group: 'd.itemID,d.ItemName', column: 'ItemName', columnID: 'itemID', componentName: 'Item Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strItem' },
            { name: 'Sub-Item', iconClass: 'fas fa-th-list icon-m', group: 'e.subitemID,e.subItemName', column: 'subItemName', columnID: 'subitemID', componentName: 'Sub-Item Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strSubItem' },
            { name: 'Item Group', iconClass: 'fas fa-chart-area icon-m', group: 'o.ItemGroupId,o.GroupName', column: 'GroupName', columnID: 'ItemGroupId', componentName: 'Item Group Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strItemGroup' },
            { name: 'Item with Sub-item', iconClass: 'fas fa-sitemap icon-m', group: 'f.ItemSubNAme,f.ItemSubID', column: 'ItemSubNAme', columnID: 'ItemSubID', componentName: 'Item with Sub-item Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strItemSubitem' },
            { name: 'Design Wise', iconClass: 'fas fa-people-carry icon-m', group: 'g.DesigncodeID,g.DesignCode', column: 'DesignCode', columnID: 'DesigncodeID', componentName: 'Design Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strDesignCodeID' },
            { name: 'Sales Party', iconClass: 'fas fa-handshake icon-m', group: 'a.accountID,c.AccountName', column: 'AccountName', columnID: 'accountID', componentName: 'Sales Party Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strSalesParty' },
            { name: 'Saleman', iconClass: 'fas fa-users icon-m', group: 'h.SalesmanID,h.SalesmanNAme', column: 'SalesmanNAme', columnID: 'SalesmanID', componentName: 'Saleman Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strSaleman' },
            { name: 'Product', iconClass: 'fas fa-boxes icon-m', group: 'i.ProductId,i.ProductName', column: 'ProductName', columnID: 'ProductId', componentName: 'Product Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strProduct' },
            { name: 'Design Catalogue', iconClass: 'fas fa-gem icon-m', group: 'j.designCatalogID,j.DesignNo', column: 'DesignNo', columnID: 'designCatalogID', componentName: 'Design Catalogue Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strDesignCatalogue' },
            { name: 'Month', iconClass: 'fas fa-calendar-week icon-m', group: 'datename(month,a.voucherDate)', column: 'MonthName', columnID: 'MonthName', componentName: 'Month Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strMonth' },
            { name: 'Year', iconClass: 'fas  fa-calendar-alt icon-m', group: 'M.FinYearID,m.YearCode', column: 'YearCode', columnID: 'FinYearID', componentName: 'Year Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strFinYear' },
            { name: 'Sale Aging', iconClass: 'fas fa-chart-line icon-m', group: 'a.[rd.caption]', column: 'rd.caption', columnID: 'rd.caption', componentName: 'Sale Aging Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strSaleAging' },
            { name: 'Mode of Sale', iconClass: 'fas fa-layer-group icon-m', group: 'a.ChallanGenerateTypeID,N.ChallanGenerateType', column: 'ChallanGenerateType', componentName: 'Mode of Sale Wise',  columnID: 'ChallanGenerateTypeID', filter_key1: mainChartProps['filterKey'], filter_key2: 'strModeofSale' },
            // { name: 'Team & Mode of Sale', iconClass: 'fas fa-stream icon-m', group: '', column: '', componentName: 'Team & Mode of Sale Wise' }
        ])
    }

    function setDefaultGrouping() {
        if (mainChartProps !== null) {
            if (mainChartProps.chartId > 1) {
                defaultChartGroup = {
                    name: 'Branch', iconClass: 'fas fa-chart-pie icon-m', group: 'a.BranchID,b.BranchName', column: 'BranchName', columnID: 'BranchID', componentName: 'Branch Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strBranch'
                }
            }
            else {
                defaultChartGroup = { name: 'Item', iconClass: 'fas fa-project-diagram icon-m', group: 'd.itemID,d.ItemName', column: 'ItemName', columnID: 'itemID', componentName: 'Item Wise', filter_key1: mainChartProps['filterKey'], filter_key2: 'strItem' }
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

                if (res.data.lstResult.length === 0) {


                    post({ "ChartGroupID": 0, "ChartGroup": JSON.stringify(defaultChartGroup), "ChartID": mainChartProps.chartId, "vendorID": 1, "UserID": 1 }, API.ChartGroupAddEdit, {}, 'post')
                        .then((res) => {

                            post({ "ID": mainChartProps.chartId, "vendorID": 1, "UserID": 1 }, API.GetChartGroupByID, {}, 'post')
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

            // else {

            //     document.getElementById(selectedId).className = document.getElementById(selectedId).className + ' ' + 'active'
            // }
            document.getElementById(selectedId).className = document.getElementById(selectedId).className + ' ' + 'active'

        }



    }
 
   

    if (mainChartProps !== undefined &&  mainChartProps['chartId'] !== null) {
        return (
            <ContexState1>
                <Navbar />
                <NotificationContainer />
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
                                                                                            {/* <div class="crancy-featured-user__fcontent"> */}
                                                                                            <div class="crancy-featured-user__ficon" id={data.componentName}>
                                                                                                <i class={data.iconClass}></i>
                                                                                            </div>
                                                                                            <h4 class="crancy-featured-user__fname">{data.name}</h4>
                                                                                            {/* </div> */}
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
                                    {/* <div class="col-xl-12 col-lg-12 col-md-12 col-12">
                                    <div class="title-top-graphdetail">
                                        <h5>Tag Image</h5>
                                    </div>
                                    <div class="graphdetailcards-silder graphdetail-fourthcard"> */}
                                    {/* <div class="ag-carousel-arrow_box">
                                        <i class="js-ag-carousel-arrow_prev ag-carousel-arrow top-slider-prevarrow"></i>
                                        <i class="js-ag-carousel-arrow_next ag-carousel-arrow top-slider-nextarrow"></i>
                                    </div> */}
                                    {/* <ul id="TagImage" class="js-carousel ag-carousel_list" >

                                            <Fancybox
                                                options={{
                                                    Carousel: {
                                                        infinite: false,
                                                    },
                                                }}
                                            >
                                                <Slider  {...settings} >
                                                    <li class="ag-carousel_item">
                                                        <figure class="ag-carousel_figure">

                                                            <a data-fancybox="gallery" href="http://110.227.251.94:9992/Images/TagImage/943.jpg"><img src="http://110.227.251.94:9992/Images/TagImage/943.jpg" width="200" height="150" /></a>

                                                            <figcaption class="ag-carousel_figcaption">
                                                                111
                                                            </figcaption>
                                                        </figure>
                                                    </li>

                                                    <li class="ag-carousel_item">
                                                        <figure class="ag-carousel_figure">

                                                            <a data-fancybox="gallery" href="http://110.227.251.94:9992/Images/TagImage/943.jpg"><img src="http://110.227.251.94:9992/Images/TagImage/943.jpg" width="200" height="150" /></a>

                                                            <figcaption class="ag-carousel_figcaption">
                                                                112
                                                            </figcaption>
                                                        </figure>
                                                    </li>

                                                    <li class="ag-carousel_item">
                                                        <figure class="ag-carousel_figure">

                                                            <a data-fancybox="gallery" href="http://110.227.251.94:9992/Images/TagImage/943.jpg"><img src="http://110.227.251.94:9992/Images/TagImage/943.jpg" width="200" height="150" /></a>

                                                            <figcaption class="ag-carousel_figcaption">
                                                                113
                                                            </figcaption>
                                                        </figure>
                                                    </li>

                                                    <li class="ag-carousel_item">
                                                        <figure class="ag-carousel_figure">

                                                            <a data-fancybox="gallery" href="http://110.227.251.94:9992/Images/TagImage/943.jpg"><img src="http://110.227.251.94:9992/Images/TagImage/943.jpg" width="200" height="150" /></a>


                                                            <figcaption class="ag-carousel_figcaption">
                                                                114
                                                            </figcaption>
                                                        </figure>
                                                    </li>

                                                    <li class="ag-carousel_item">
                                                        <figure class="ag-carousel_figure">

                                                            <a data-fancybox="gallery" href="http://110.227.251.94:9992/Images/TagImage/943.jpg"><img src="http://110.227.251.94:9992/Images/TagImage/943.jpg" width="200" height="150" /></a>

                                                            <figcaption class="ag-carousel_figcaption">
                                                                115
                                                            </figcaption>
                                                        </figure>
                                                    </li>

                                                    <li class="ag-carousel_item">
                                                        <figure class="ag-carousel_figure">

                                                            <a data-fancybox="gallery" href="http://110.227.251.94:9992/Images/TagImage/943.jpg"><img src="http://110.227.251.94:9992/Images/TagImage/943.jpg" width="200" height="150" /></a>


                                                            <figcaption class="ag-carousel_figcaption">
                                                                116
                                                            </figcaption>
                                                        </figure>
                                                    </li>

                                                    <li class="ag-carousel_item">
                                                        <figure class="ag-carousel_figure">

                                                            <a data-fancybox="gallery" href="http://110.227.251.94:9992/Images/TagImage/943.jpg"><img src="http://110.227.251.94:9992/Images/TagImage/943.jpg" width="200" height="150" /></a>


                                                            <figcaption class="ag-carousel_figcaption">
                                                                117
                                                            </figcaption>
                                                        </figure>
                                                    </li>

                                                    <li class="ag-carousel_item">
                                                        <figure class="ag-carousel_figure">

                                                            <a data-fancybox="gallery" href="http://110.227.251.94:9992/Images/TagImage/943.jpg"><img src="http://110.227.251.94:9992/Images/TagImage/943.jpg" width="200" height="150" /></a>


                                                            <figcaption class="ag-carousel_figcaption">
                                                                118
                                                            </figcaption>
                                                        </figure>
                                                    </li>
                                                </Slider>
                                            </Fancybox>

                                        </ul>
                                    </div>
                                </div> */}
                                    <Tag_Image />

                                </div>

                            </div>


                        </section >
                    </div >
                </div>
            </ContexState1>


        )
    }
}
