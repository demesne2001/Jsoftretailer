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

    function findMinMax() {
        let ansmin = [];
        let ansmax = [];
        for (let i = 0; i < yAxis.length; i++) {

            ansmax.push(Math.max(...yAxis[i]))
            ansmin.push(Math.min(...yAxis[i]))
        }
        let lenthdigit = (parseInt(Math.max(...ansmax).toFixed(0))).toString().length - 1
        if (parseInt(Math.min(...ansmin).toFixed(0)) >= 0) {
            return [((parseInt((parseInt(Math.max(...ansmax).toFixed(0)) + 1) / Math.pow(10, lenthdigit)) + 1)) * (Math.pow(10, lenthdigit)), 0]
        } else {
            return [((parseInt((parseInt(Math.max(...ansmax).toFixed(0)) + 1) / Math.pow(10, lenthdigit)) + 1)) * (Math.pow(10, lenthdigit)), parseInt(Math.min(...ansmin).toFixed(0)) + 1]
        }
    }
    if (inputdata.Unit !== 'P' || inputdata.Unit === '' ) {
        let tempYAxis = yAxis;
        tempYAxis.splice(2, 1);
        if (document.getElementsByClassName('crancy-progress-card card-contain-graph')[0] !== undefined) {
            option = {
                themeId: 11,
                chartId: 'inside-Bardfyuwsedsd' + props.id,
                charttype: 'inside-Bar',
                height: '400%',
                width: '100%',
                legend: ["AvgStock", "AvgMinStockRequired", "AvgStockCycle"],
                color: MinimumStockChartObject[props.id].color,
                widthlst: [document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth / 20, document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth / 35],
                Xaxis: xAxis,
                Yaxis: tempYAxis,
                bargap: '-80%',
                alignment: 'v',
                maxval: findMinMax()[0],
                minval: findMinMax()[1],
                barnum: 2,
                divname: 'crancy-progress-card card-contain-graph',
                tooltipid: 2
            }

        }
    } else {
        let tempYAxis = yAxis;
        tempYAxis.splice(1, 1);
        console.log(tempYAxis,"dshgjhusdgkfg");
        if (document.getElementsByClassName('crancy-progress-card card-contain-graph')[0] !== undefined) {
            option = {
                themeId: 11,
                chartId: 'inside-Bardfyuwsedsd' + props.id,
                charttype: 'inside-Bar',
                height: '400%',
                width: '100%',
                legend: ["AvgStock","AvgMinStockRequiredPcs", "AvgStockCycle"],
                color: MinimumStockChartObject[props.id].color,
                widthlst: [document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth / 20, document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth / 35],
                Xaxis: xAxis,
                Yaxis: tempYAxis,
                bargap: '-80%',
                alignment: 'v',
                maxval: findMinMax()[0],
                minval: findMinMax()[1],
                barnum: 2,
                divname: 'crancy-progress-card card-contain-graph',
                tooltipid: 2
            }

        }
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
