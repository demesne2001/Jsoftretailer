import React, { useEffect, useState } from 'react'
import StockToSalesContext from '../contex/StockToSalesContext'
import Navbar from '../Sales-Efficiency-Analysis-Dashboard/NavigationBar/Navbar'
import Header_detailed from '../SecondScreen/Components_Detailed/Header_detailed'
import Slider from "react-slick";
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import MinimumStockMainCharts from './MinimumStockDetailComponents/MinimumStockMainCharts';
import MinimumStockDefaultChart from './MinimumStockDetailComponents/MinimumStockDefaultChart';
import MinimumStockThirdChart from './MinimumStockDetailComponents/MinimumStockThirdChart';
import MinimumStockContext from '../contex/MinimumStockContext';

export default function MinimumStockDetailedDashboard() {
    //UseState and variables
    const location = useLocation()
    const navigate = useNavigate()
    const [mainChartProps, setMainChartProps] = useState({})
    const [urlData, seturlData] = useSearchParams()
    const [getUrlState] = useSearchParams()
    const [ThirdChartProps, setThirdChartProps] = useState({})
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
            setDefaultChartProps({ name: 'SubItem', iconClass: 'fas fa-th-list', group: '', column: '', columnID: '', componentName: 'Sub-Item Wise', filter_key1: '', filter_key2: '', ChartMode: '5', screen: 2, filterkey: 'SubItemID', dropdown:mainChartProps.showdropdown, FromDate:mainChartProps.FromDate, ToDate: mainChartProps.ToDate })
            setThirdChartProps({ name: 'SubItem-range', iconClass: 'fas fa-th-list', group: '', column: '', columnID: '', componentName: 'Sub-Item-Range Wise', filter_key1: '', filter_key2: '', ChartMode: '6', FromDate:mainChartProps.FromDate, ToDate: mainChartProps.ToDate })
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
            "screen": getUrlState.get("screen"),
            "showdropdown": getUrlState.get("showdropdown"),
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
        <MinimumStockContext>
            <Navbar />
            <div id="crancy-dark-light">
                <div class="crancy-body-area">
                    <Header_detailed screen={4} Date={{FromDate: mainChartProps.FromDate, ToDate : mainChartProps.ToDate}} />
                    <section class="crancy-adashboard dashboard-graphdetail">
                        <div class="container">
                            <div class="row minimumstockrow" >
                                {JSON.stringify(mainChartProps) !== JSON.stringify({}) ? <MinimumStockMainCharts state={mainChartProps} /> : null}
                                {JSON.stringify(defaulChartprops) !== JSON.stringify({}) ? <MinimumStockDefaultChart state={defaulChartprops} /> : null}
                            </div>
                            <div class="row">
                                {JSON.stringify(ThirdChartProps) !== JSON.stringify({}) ? <MinimumStockThirdChart state={ThirdChartProps} /> : null}
                            </div>
                        </div>
                    </section >
                </div>
            </div>
        </MinimumStockContext>
    )
}
