import React, { useEffect, useState } from 'react'
import Navbar from '../Sales-Efficiency-Analysis-Dashboard/NavigationBar/Navbar'
import Header_detailed from '../SecondScreen/Components_Detailed/Header_detailed'
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
        if (JSON.stringify(mainChartProps) !== JSON.stringify({}) && mainChartProps.componentName !== null) {
            setDefaultChartProps({ name: 'SubItem', iconClass: 'fas fa-th-list', group: '', column: '', columnID: '', componentName: 'Sub-Item Wise', filter_key1: '', filter_key2: '', ChartMode: '5', screen: 2, filterkey: 'SubItemID', dropdown:mainChartProps.showdropdown, FromDate:mainChartProps.FromDate, ToDate: mainChartProps.ToDate, filterdata : mainChartProps.filterdata })
            setThirdChartProps({ name: 'SubItem-range', iconClass: 'fas fa-th-list', group: '', column: '', columnID: '', componentName: 'Sub-Item-Range Wise', filter_key1: '', filter_key2: '', ChartMode: '6', FromDate:mainChartProps.FromDate, ToDate: mainChartProps.ToDate, filterdata : mainChartProps.filterdata })
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
            "filterdata":JSON.parse(getUrlState.get("filterdata")),
        }
        setMainChartProps(urlData)
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
