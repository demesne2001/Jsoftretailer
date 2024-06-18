import React, { useContext, useEffect, useState } from 'react';
import StockToSalesChartObject from '../Stock_To_Sales_Components/StockToSalesChartObject';
import contex from '../../contex/Contex';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'

export default function StockToSalesDefaultChart(props) {
    const contextData = useContext(contex);
    let inputdata = contextData.detailsecondstate;
    const [xAxis, setxAxis] = useState([]);
    const [id, setid] = useState([]);
    const [yAxis, setyAxis] = useState([]);
    const [loader, setLoader] = useState(true);
    const [dataloader, setdataLoader] = useState(true);
    const [data, setdata] = useState([]);
    const [page, setPage] = useState(0);
    let updatedstate = {}
    let option = {};

    useEffect(() => {
        if (props.state.ChartMode !== undefined && props.state.ChartMode !== null) {
            getChartData()
        }
        console.log("api calleddd", props.state);
    }, [props])

    useEffect(() => {
        if (props.state.ChartMode !== undefined && props.state.ChartMode !== null) {
            getChartData()
        }
        console.log("api calleddd11", inputdata);
    }, [inputdata])
    useEffect(() => {
        fetchPaginatedData(data[0])
    }, [data])

    function getChartData() {
        console.log(props);
        inputdata = { ...inputdata, 'Mode': props.state.ChartMode, 'FromDate': props.state.FromDate, 'ToDate': props.state.ToDate }
        console.log(inputdata, "api default");
        post(inputdata, API.GetStockToSalesChart, {}, "post").then((res) => {
            if (res.data !== undefined) {
                console.log(res.data.lstResult, "main data");
                let templength = res.data.lstResult.length
                let mainlist = [];
                let childlist = [];
                console.log(templength, "length");
                if (templength > 0) {


                    childlist.push(res.data.lstResult[0])
                    for (let i = 1; i <= parseInt(templength / 5) + 1; i++) {
                        if (((i) * 5) < res.data.lstResult.length) {
                            for (let index = (i - 1) * 5 + 1; index <= i * 5; index++) {
                                childlist.push(res.data.lstResult[index])
                            }
                        } else {
                            console.log("hahahah", (i - 1) * 5 + 1, templength - (parseInt(templength / 5) * 5));
                            for (let index = (i - 1) * 5 + 1; index < templength; index++) {
                                childlist.push(res.data.lstResult[index])
                            }
                        }
                        console.log(childlist, 'list');
                        mainlist.push(childlist)
                        console.log(mainlist, 'list');

                        childlist = [];
                    }
                    setdata(mainlist)
                    setLoader(false)
                    setdataLoader(false)
                } else {
                    setdataLoader(false)
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
            tempjs[StockToSalesChartObject[props.state.ChartMode].xAxis] = xAxis[index];
            tempjs['AvgStock'] = yAxis[0][index];
            tempjs['Sales-NetWeight'] = yAxis[1][index];
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
        if (parseInt(Math.min(...ansmin).toFixed(0))  >= 0) {
            return [((parseInt((parseInt(Math.max(...ansmax).toFixed(0)) + 1)/Math.pow(10,lenthdigit))+1))*(Math.pow(10,lenthdigit)), 0]
        } else {
            return [((parseInt((parseInt(Math.max(...ansmax).toFixed(0)) + 1)/Math.pow(10,lenthdigit))+1))*(Math.pow(10,lenthdigit)), parseInt(Math.min(...ansmin).toFixed(0)) + 1]
        }
    }
    if (document.getElementsByClassName('graphdetailcards graphdetail-secondcard')[0] !== undefined) {
        let tempYAxis = yAxis;
        tempYAxis.splice(2, 1);
        if (props.state.ChartMode === '1') {
            option = {
                themeId: 11,
                chartId: 'inside-Barydwudsd' + props.state.ChartMode,
                charttype: 'inside-Bar',
                height: '250%',
                width: '100%',
                legend: ['AvgStock', 'Sales-NetWeight', 'AvgStockCycleNtWt'],
                color: StockToSalesChartObject[props.state.ChartMode].color,
                widthlst: [document.getElementsByClassName('graphdetailcards graphdetail-secondcard')[0].clientWidth / 20, document.getElementsByClassName('graphdetailcards graphdetail-secondcard')[0].clientWidth / 35],
                Xaxis: xAxis,
                Yaxis: tempYAxis,
                bargap: '-80%',
                alignment: 'v',
                maxval: findMinMax()[0],
                minval: findMinMax()[1],
                barnum: 2,
            }
        } else {
            option = {
                themeId: 11,
                chartId: 'inside-Barsdwayudsd' + props.state.ChartMode,
                charttype: 'inside-Bar',
                height: '540%',
                width: '100%',
                legend: ['AvgStock', 'Sales-NetWeight', 'AvgStockCycleNtWt'],
                color: StockToSalesChartObject[props.state.ChartMode].color,
                widthlst: [document.getElementsByClassName('graphdetailcards graphdetail-secondcard')[0].clientWidth / 20, document.getElementsByClassName('graphdetailcards graphdetail-secondcard')[0].clientWidth / 35],
                Xaxis: xAxis,
                Yaxis: tempYAxis,
                bargap: '-80%',
                alignment: 'v',
                maxval: findMinMax()[0],
                minval: findMinMax()[1],
                barnum: 2,
            }
        }
    }

    function fetchPaginatedData(data1) {
        console.log(data, data1, "data");
        if (data.length > 0 && data1 !== undefined && data1.length > 0) {
            var tempYaxis = [];
            for (let i = 0; i < StockToSalesChartObject[props.state.ChartMode]['yAxis'].length; i++) {
                var tempYaxis1 = [];
                for (let j = 0; j < data1.length; j++) {
                    tempYaxis1.push(data1[j][StockToSalesChartObject[props.state.ChartMode]['yAxis'][i]]);
                }
                tempYaxis.push(tempYaxis1);
            }
            setyAxis(tempYaxis);

            let idtemp = [];
            let tempXaxis = [];
            for (let j = 0; j < data1.length; j++) {
                tempXaxis.push(data1[j][StockToSalesChartObject[props.state.ChartMode]['xAxis']]);
                idtemp.push(data1[j][StockToSalesChartObject[props.state.ChartMode]['id']])
            }
            setxAxis(tempXaxis);
            setid(idtemp);
        }
    }


    function handleRightClick() {
        if (data.length > page + 1) {
            setPage(page + 1);
            fetchPaginatedData(data[page + 1])
        }
    }

    function handleLeftClick() {
        if (0 < page) {
            setPage(page - 1);
            fetchPaginatedData(data[page - 1])
        }
    }

    function handleMonthOptionClick(label) {
        contextData.SetDetailsecondState({ ...contextData.detailsecondstate, ['MonthType']: label })
    }

    return (
        <div>
            <div class="title-top-graphdetail-withoutcolor">
                <h5>{props.state.componentName} <span style={{ fontSize: '15px' }}> {contextData.filtername !== "" ? "( " + contextData.filtername + " )" : null}</span></h5>
                {/* <i className="fa-solid fa-arrow-down-short-wide sort-icon-second-screen" ></i> */}
            </div>
            <div class="graphdetailcards graphdetail-secondcard">
                <div class="topimg-gd" style={{ height: '580px' }}>

                    {
                        dataloader !== true ?
                            loader !== true ?


                                option.Xaxis !== undefined ? option.Xaxis.length > 0 ?
                                    <div>
                                        {props.state.ChartMode === '1' ?
                                            <div className='ChartMonthOption'>
                                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("M") }}>Month Wise</button>
                                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("Q") }}>Quater Wise</button>
                                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("HY") }}>Half Year Wise</button>
                                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("Y") }}>Year Wise</button>
                                            </div>
                                            : null}
                                        <AlphaDashChart obj={JSON.parse(JSON.stringify(option))} /><div className='mainscreenchartdiv defaulchartbutton'>
                                            <button onClick={handleLeftClick} className='chartupdown left'><i class="fa-solid fa-left-long iconupdown"></i></button>

                                            <button onClick={handleRightClick} className='chartupdown right'><i class="fa-solid fa-right-long iconupdown"></i></button>
                                        </div>
                                    </div>
                                    : null : null




                                : <div >
                                    {props.state.ChartMode === '1' ?
                                        <div className='ChartMonthOption'>
                                            <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("M") }}>Month Wise</button>
                                            <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("Q") }}>Quater Wise</button>
                                            <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("HY") }}>Half Year Wise</button>
                                            <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("Y") }}>Year Wise</button>
                                        </div>
                                        : null}
                                    Not Found</div> : <div class="dot-spinner" style={{ margin: "auto", position: 'inherit' }} >
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                                <div class="dot-spinner__dot"></div>
                            </div>
                    }
                </div>
            </div>
        </div >
    )
}
