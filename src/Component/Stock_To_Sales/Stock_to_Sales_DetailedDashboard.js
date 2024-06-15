import React, { useEffect, useState } from 'react'
import StockToSalesContext from '../contex/StockToSalesContext'
import Navbar from '../Sales-Efficiency-Analysis-Dashboard/NavigationBar/Navbar'
import Header_detailed from '../SecondScreen/Components_Detailed/Header_detailed'
import Slider from "react-slick";
import StockToSalesMainChart from './Stock_To_Sales_DetailedScreen_Components/StockToSalesMainChart';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import StockToSalesDefaultChart from './Stock_To_Sales_DetailedScreen_Components/StockToSalesDefaultChart';

export default function Stock_to_Sales_DetailedDashboard() {
    //UseState and variables
    const location = useLocation()
    const navigate = useNavigate()
    const [mainChartProps, setMainChartProps] = useState({})
    const [urlData, seturlData] = useSearchParams()
    const [getUrlState] = useSearchParams()
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
    const [defaulChartprops, setDefaultChartProps] = useState({})

    const SliderData = [

        { name: 'Period', iconClass: 'fa-solid fa-clock', group: '', column: '', columnID: '', componentName: 'Period Wise', filter_key1: '', filter_key2: '', ChartMode:'1', FromDate: mainChartProps.FromDate, ToDate : mainChartProps.ToDate },
        { name: 'Branch', iconClass: 'fas fa-chart-pie', group: '', column: '', columnID: '', componentName: 'Branch Wise', filter_key1: '', filter_key2: '', ChartMode:'2', FromDate: mainChartProps.FromDate, ToDate : mainChartProps.ToDate  },
        { name: 'Product', iconClass: 'fas fa-boxes', group: '', column: '', columnID: '', componentName: 'Product Wise', filter_key1: '', filter_key2: '', ChartMode:'3', FromDate: mainChartProps.FromDate, ToDate : mainChartProps.ToDate  },
        { name: 'Item', iconClass: 'fas fa-project-diagram', group: '', column: '', columnID: '', componentName: 'Item Wise', filter_key1: '', filter_key2: '', ChartMode:'4', FromDate: mainChartProps.FromDate, ToDate : mainChartProps.ToDate  },
        { name: 'SubItem', iconClass: 'fas fa-th-list', group: '', column: '', columnID: '', componentName: 'Sub-Item Wise', filter_key1: '', filter_key2: '', ChartMode:'5', FromDate: mainChartProps.FromDate, ToDate : mainChartProps.ToDate  }
    ]


    //UseEffect------------------------------>
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
        console.log(mainChartProps, "mainchart");
        if (JSON.stringify(mainChartProps) !== JSON.stringify({}) && mainChartProps.componentName !== null) {
            if (mainChartProps.componentName === 'Product Wise') {
                setDefaultChartProps({ name: 'Branch', iconClass: 'fas fa-chart-pie', group: '', column: '', columnID: '', componentName: 'Branch Wise', filter_key1: '', filter_key2: '', ChartMode:'2', FromDate: mainChartProps.FromDate, ToDate : mainChartProps.ToDate  })
            } else {
                setDefaultChartProps( { name: 'Product', iconClass: 'fas fa-boxes', group: '', column: '', columnID: '', componentName: 'Product Wise', filter_key1: '', filter_key2: '', ChartMode:'3', FromDate: mainChartProps.FromDate, ToDate : mainChartProps.ToDate  })
            }
        } else {
            getUrlData()
        }
    }, [mainChartProps])


    // Function

    //Description : This function is used to fetch data from url
    function getUrlData() {
        let urlData = {
            "componentName": getUrlState.get("componentName"),
            "ChartMode": getUrlState.get("ChartMode"),
            "filterkey": getUrlState.get("filterkey"),
            "FromDate": getUrlState.get("FromDate"),
            "ToDate": getUrlState.get("ToDate"),
        }
        setMainChartProps(urlData)
    }

    //Description : it's return the nextarrow of slider
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

    //Description : it's return the prevarrow of slider
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

    //Description : It's used for change the props of the default graph
    function handleDefaulChartClick(e) {
        setDefaultChartProps(e);
    }






    return (
        <StockToSalesContext>
            <Navbar />
            <div id="crancy-dark-light">
                <div class="crancy-body-area">
                    <Header_detailed screen={3} Date={{FromDate: mainChartProps.FromDate, ToDate: mainChartProps.ToDate }} />
                    <section class="crancy-adashboard dashboard-graphdetail">
                        <div class="container">
                            <div class="row">
                            {JSON.stringify(mainChartProps) !== JSON.stringify({})?<StockToSalesMainChart state={mainChartProps} />:null}
                                <div class="col-xl-6 col-lg-6 col-md-12 col-12">
                                    <div class="top-slider">
                                        <div class="row">
                                            <div class="col-12">
                                                <div class="graphdetailcards-silder graphdetailtopslider-card mb-0">

                                                    <ul id="topitem" class="js-carousel ag-carousel_list detailgraph-carousel topicon-gd">
                                                        <Slider {...settings} >
                                                            {
                                                                SliderData.map((e) => {
                                                                    if (e.componentName !== mainChartProps.componentName) {
                                                                        return (
                                                                            <li class="ag-carousel_item">
                                                                                <div class="ag-carousel_figure" >
                                                                                    <a onClick={() => { handleDefaulChartClick(e) }}>
                                                                                        <div class="crancy-featured-user__ficon">
                                                                                            <i class={e.iconClass}></i>
                                                                                        </div>
                                                                                        <h4 class="crancy-featured-user__fname">{e.name}</h4>
                                                                                    </a>
                                                                                </div>
                                                                            </li>
                                                                        );
                                                                    }
                                                                })
                                                            }
                                                        </Slider>
                                                    </ul>
                                                </div>
                                                <div class="crancy-featured-default-box">
                                                    {/* <div class="crancy-featured-user__fcontent graphdetaildefault mb-0">
                                                        <form class="form-check checkbox-filter">
                                                           
                                                            <input class="form-check-input" type="checkbox" value="" id="DefaultCheckBoxSeconScreen" />
                                                            <label class="form-check-label checkbox-filter-label graphdetail-text" for="DefaultCheckBoxSeconScreen">Set as Default</label>
                                                        </form>
                                                    </div> */}
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                   {JSON.stringify(defaulChartprops) !== JSON.stringify({})? <StockToSalesDefaultChart state={defaulChartprops} />:null}
                                </div>
                            </div>
                        </div>
                    </section >
                </div>
            </div>
        </StockToSalesContext>
    )
}
