import React, { useContext, useEffect, useState } from 'react'
import post from '../Utility/APIHandle'
import API from '../Utility/API'
import DataFormat from './ChartDataFormat'
import ReactApexChart from 'react-apexcharts'
import { render } from 'react-dom'
import { useNavigate } from 'react-router-dom';
import contex from '../contex/Contex'


export default function CommonchartComp(props) {
    const navigate = useNavigate()
    const Detailcontext = useContext(contex)
    let input = {
        "strBranchID": "",
        "strCompanyID": "",
        "strStateID": "",
        "strCityID": "",
        "strItemID": "",
        "strSubItemID": "",
        "strItemGroupID": "",
        "strRegionID": "",
        "strItemSubitemID": "",
        "strPurchasePartyID": "",
        "strSalesPartyID": "",
        "strSalemanID": "",
        "strProductID": "",
        "strDesignCodeID": "",
        "strDesignCatalogueID": "",
        "strSaleAging": "",
        "strModeofSale": "",
        "strTeamModeofSale": "",
        "FromDate": "",
        "ToDate": "",
        "strMetalType": "",
        "strDayBookID": "",
        "strMonth": "",
        "strFinYear": "",
        "Unity": ""
    }
    const [DataResult, setResultdat] = useState([])
    const [prop, setprop] = useState({})
    useEffect(() => {
       
        setprop(props.Chartconf)
    }, [props.Chartconf.PageID])
    useEffect(() => {
        setResultdat([])
        FetchData()
    }, [prop])   
    function handleNavigation() {
        if (prop.DetailScreen === true) {
            navigate('/DynamicDetailPage', { state: { DyChart: prop }, replace: true })

        }
    }
    function FetchData() {
        var ErrorMessage = []
        input = { ...input, 'DychartID': props.Chartconf.DyChartID }
        post(input, API.GetDynamicChartData, ErrorMessage, 'post').then((res) => {
            if (res.data != undefined) {
                if (res.data.lstResult.length > 0) {
                    setResultdat(res.data.lstResult)
                 
                }
            }


        })
    }


    return (
        <div className={props.Screen==2? prop.DetailScreenDiv :prop.DivClass }>

            <div className="graph-card">
                <div className='card-title-graph'>

                    <div className="col-xs-8 col-sm-10 col-md-10 col-10" onClick={handleNavigation}>
                        <p><i class="fas fa-chart-pie"></i> {prop.ChartLabel}</p>
                    </div>
                    <div className="col-xs-4 col-sm-2 col-md-2 col-2" >
                    </div>
                </div>
                <div className={prop.Height==650 ?"crancy-progress-card card-contain-graph shedule-thirdscreen":"crancy-progress-card card-contain-graph"} id='flipbranch'>
                    
                    {DataResult.length >0 && prop.PageID === props.pageID && Object.keys(DataResult[0]).indexOf(prop.XLabel)!=-1 && DataResult[0]['DyChartID']==props.DyChartID  ?
                        <ReactApexChart options={DataFormat(DataResult, prop.XLabel, prop.YLabel, prop.ChartOption,prop.XLabelID,0,Detailcontext).option}
                            series={DataFormat(DataResult, prop.XLabel, prop.YLabel, prop.ChartOption,prop.XLabelID,0,Detailcontext).series}
                            type={DataFormat(DataResult, prop.XLabel, prop.YLabel, prop.ChartOption,prop.XLabelID,0,Detailcontext).type} height={props.Screen==2? prop.Height :350} />
                        : null}

                </div>

            </div>
        </div>
    )
}
