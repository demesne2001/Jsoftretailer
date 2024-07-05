import React, { useContext, useEffect, useState } from 'react'
import API from '../Utility/API'
import post from '../Utility/APIHandle'
import ReactApexChart from 'react-apexcharts'
import DataFormat from './ChartDataFormat'
import contex from '../contex/Contex'

export default function DetailCommonChartComp(props) {
    const [prop, setprop] = useState({})
    const Detailcontext = useContext(contex)
    const [DataResult, setResultdat] = useState([])
    let input = {
        VendorID: 0,
        ID: 0
    }
    useEffect(() => {
        setprop(props.DetailConfig) 
        input={ VendorID: 0, DyChartDetailID: props.DetailConfig.DyChartDetailID,ID:0 }
        FetchData()
    }, [])
    useEffect(() => {
        if (Detailcontext.state.DependancyID === props.DetailConfig.DependancyID ) {
            input={ VendorID: 0, DyChartDetailID: props.DetailConfig.DyChartDetailID,ID:Detailcontext.state.ID }
            FetchData()
        }
    }, [Detailcontext.state])
    function FetchData() {
        post(input, API.GetCommanVendorChartDetail, [], 'post').then((res) => {

            if (res.data != undefined) {
                if (res.data.lstResult.length > 0) {
                    setResultdat(res.data.lstResult)

                }
            }
        })
    }
    return (

        <div className={prop.DivClass}>

            <div className="graph-card">
                <div className='card-title-graph'>

                    <div className="col-xs-8 col-sm-10 col-md-10 col-10" >

                        <p><i class="fas fa-chart-pie"></i> {prop.ChartName}</p>


                    </div>

                    <div className="col-xs-4 col-sm-2 col-md-2 col-2" >

                    </div>
                </div>
                <div className={prop.TotalChart==1 ?"crancy-progress-card card-contain-graph shedule-thirdscreen":"crancy-progress-card card-contain-graph"} id='flipbranch'>
                
                    {DataResult != undefined && DataResult.length > 0 ?
                        <ReactApexChart options={DataFormat(DataResult, prop.XLabel, prop.YLabel, prop.ChartOption, prop.XLabelID, prop.SrNo, Detailcontext).option}
                            series={DataFormat(DataResult, prop.XLabel, prop.YLabel, prop.ChartOption, prop.XLabelID, prop.SrNo, Detailcontext).series}
                            type={DataFormat(DataResult, prop.XLabel, prop.YLabel, prop.ChartOption, prop.XLabelID, prop.SrNo, Detailcontext).type} height={prop.TotalChart==1 ?650:350} />
                        : null}

                </div>

            </div>


        </div>
    )
}
