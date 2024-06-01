import React, { useEffect, useState } from 'react'
import post from '../Utility/APIHandle'
import { useLocation } from 'react-router-dom'
import API from '../Utility/API'
import Header_detailed from '../SecondScreen/Components_Detailed/Header_detailed'
import Navbar from '../Sales-Efficiency-Analysis-Dashboard/NavigationBar/Navbar'
import CommonchartComp from './CommonchartComp'
import DetailCommonChartComp from './DetailCommonChartComp'
import DynmicChartDetailContext from '../contex/DynmicChartDetailContext'

export default function DynamicDetailDashboard() {
    const [ChartData, setChartData] = useState(useLocation())
    const [APIResult, setAPIResult] = useState([])
    let input = { VendorID: 0, DyChartID: ChartData.state.DyChart.DyChartID }

    useEffect(() => {

        FetchDetailChart()
    }, [])
    function FetchDetailChart() {
        post(input, API.GetDetailChartConfig, [], 'post').then((res) => {

            if (res.data != undefined) {
                if (res.data.lstResult.length > 0) {
                    setAPIResult(res.data.lstResult)
                    console.log('API Resp', res.data.lstResult)
                }
            }
        })
    }
    return (
        <>
            <Navbar></Navbar>
            <DynmicChartDetailContext>
                <div id="crancy-dark-light">
                    <div class="crancy-body-area">
                        <Header_detailed></Header_detailed>
                        <section class="crancy-adashboard crancy-show">
                            <div class="container"></div>
                        </section>
                        <section class="crancy-adashboard dashboard-graphdetail">
                            <div class="container">
                                <div class="row">
                                    <CommonchartComp Chartconf={ChartData.state.DyChart} pageID={ChartData.state.DyChart.PageID} Screen={2} />
                                    {APIResult[0] != undefined ? <DetailCommonChartComp DetailConfig={APIResult[0]} /> : null}
                                </div>
                                <div class="row">
                                    {
                                        APIResult.map((key, i) => {
                                            if (i > 0) {
                                                console.log('DetailCommonChartComp', key)
                                                return <DetailCommonChartComp DetailConfig={key} />
                                            }
                                        })
                                    }
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </DynmicChartDetailContext>
        </>
    )
}
