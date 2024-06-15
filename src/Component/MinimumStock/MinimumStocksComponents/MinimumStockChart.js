import React, { useContext, useEffect, useState } from 'react';
import MinimumStockChartObject from './MinimumStockChartObject';
import { useNavigate } from 'react-router-dom';
import contex from '../../contex/Contex';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'

export default function MinimumStockChart(props) {
    const navigate = useNavigate();
    const contextData = useContext(contex);
    let inputdata = contextData.state;
    const [xAxis, setxAxis] = useState([]);
    const [yAxis, setyAxis] = useState([]);
    const [loader, setLoader] = useState(true);
    const [dataloader, setdataLoader] = useState(true);
    const [startIndex, setStartIndex] = useState(0);
    const [EndIndex, setEndIndex] = useState(0);
    let option = {}

    useEffect(() => {
        getChartData()
        console.log("api calleddd", inputdata);
    }, [inputdata])

    function handleDetailNaviogation() {
        if (props.id === 3) {
            navigate('/minimum_stocks_Detailed', { state: { componentName: MinimumStockChartObject[4].heading, ChartMode: 4, filterkey: 'StrItemID', screen: 1, showdropdown: 1, FromDate: inputdata.FromDate, ToDate: inputdata.ToDate }, replace: true });
        } else {
            navigate('/minimum_stocks_Detailed', { state: { componentName: MinimumStockChartObject[4].heading, ChartMode: 4, filterkey: 'StrItemID', screen: 1, showdropdown: 0, FromDate: inputdata.FromDate, ToDate: inputdata.ToDate }, replace: true });
        }
    }

    function getChartData() {
        inputdata = { ...inputdata, 'Mode': props.id }

        post(inputdata, API.GetMinStockChart, {}, "post").then((res) => {
            if (res.data !== undefined) {
                var tempYaxis = [];
                for (let i = 0; i < MinimumStockChartObject[props.id]['yAxis'].length; i++) {
                    var tempYaxis1 = [];
                    for (let j = 0; j < res.data.lstResult.length; j++) {
                        tempYaxis1.push(res.data.lstResult[j][MinimumStockChartObject[props.id]['yAxis'][i]]);
                    }
                    tempYaxis.push(tempYaxis1);
                }
                setyAxis(tempYaxis);


                var tempXaxis = [];
                for (let j = 0; j < res.data.lstResult.length; j++) {
                    tempXaxis.push(res.data.lstResult[j][MinimumStockChartObject[props.id]['xAxis']]);
                }
                setxAxis(tempXaxis);
                setdataLoader(false)
                if (tempXaxis.length !== 0) {
                    setLoader(false)
                } else {
                    setLoader(true)
                }
            } else {
                alert(res.Error)
            }
        })
    }

    function dataformate() {
        let tempjs = {};
        let templs = [];

        for (let index = 0; index < xAxis.length; index++) {
            tempjs = {};
            tempjs[MinimumStockChartObject[props.id]['xAxis']] = xAxis[index];
            tempjs['AvgStock'] = yAxis[0][index];
            tempjs['MinStockNetWt'] = yAxis[1][index];
            tempjs['AvgStockCycleNtWt'] = yAxis[2][index];
            templs.push(tempjs);
        }
        return templs;
    }

    if (document.getElementsByClassName('crancy-progress-card card-contain-graph')[0] !== undefined) {
        option = {
            height: 350,
            width: document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth,
            charttype: 'antv-singlebar-multivalue',
            series: dataformate(),
            widthlst: [40, 60],
            color: MinimumStockChartObject[props.id].color
        }

    }

    function handleRightClick() {

    }

    function handleLeftClick() {

    }


    return (
        <div class="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="graph-card">
                <div className='card-title-graph schedule-graph' onClick={handleDetailNaviogation}>
                    <div className="col-xs-8 col-sm-10 col-md-10 col-10" >
                        <p><i class={MinimumStockChartObject[props.id].iconclassName}></i>{MinimumStockChartObject[props.id].heading}</p>
                    </div>
                </div>

                {dataloader !== true ?
                    loader !== true ?
                        <div class="crancy-progress-card card-contain-graph">

                            <div style={props.id === 1 ? { height: '310px' } : { height: '350px' }}>
                                <AlphaDashChart obj={JSON.parse(JSON.stringify(option))} />
                                {/* <div className='mainscreenchartdiv'>
                                    <button onClick={handleLeftClick} className='chartupdown left'><i class="fa-solid fa-left-long iconupdown"></i></button>

                                    <button onClick={handleRightClick} className='chartupdown right'><i class="fa-solid fa-right-long iconupdown"></i></button>
                                </div> */}
                            </div>
                        </div>
                        : <div class="crancy-progress-card card-contain-graph">

                            Data Not Found</div> :
                    <div class="crancy-progress-card card-contain-graph">
                        <div class="dot-spinner" style={{ margin: "auto", position: 'inherit' }} >
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                        </div>
                    </div>
                }
            </div>

        </div >
    )
}
