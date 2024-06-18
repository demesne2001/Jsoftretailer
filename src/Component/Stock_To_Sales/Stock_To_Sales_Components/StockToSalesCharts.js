import React, { useContext, useEffect, useState } from 'react';
import StockToSalesChartObject from './StockToSalesChartObject';
import { useNavigate } from 'react-router-dom';
import contex from '../../contex/Contex';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'
import { color } from 'echarts';

export default function StockToSalesCharts(props) {
    const navigate = useNavigate();
    const contextData = useContext(contex);
    const [data, setdata] = useState([]);
    let inputdata = contextData.state;
    const [xAxis, setxAxis] = useState([]);
    const [yAxis, setyAxis] = useState([]);
    const [loader, setLoader] = useState(true);
    const [dataloader, setdataLoader] = useState(true);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    let option = {}

    useEffect(() => {
        getChartData()
        console.log("api calleddd", inputdata);
    }, [inputdata])
    useEffect(() => {
        fetchPaginatedData(data[0])
    }, [data])
    useEffect(() => {
        if (pageSize !== 0) {
            getChartData()
            console.log("api calleddd", pageSize);
        }
    }, [pageSize])


    useEffect(() => {
        if (window.innerWidth < 767) {
            setPageSize(5)
        } else {
            setPageSize(10)
        }
    }, [])

    function handleDetailNaviogation() {
        navigate('/Stock_To_Sales_Detailed', { state: { componentName: StockToSalesChartObject[props.id].heading, ChartMode: props.id, filterkey: StockToSalesChartObject[props.id].filterkey, FromDate: inputdata.FromDate, ToDate: inputdata.ToDate }, replace: true });
    }

    function getChartData() {
        inputdata = { ...inputdata, 'Mode': props.id }
        console.log("aegrhagb", inputdata);
        console.log(pageSize, "ds");
        post(inputdata, API.GetStockToSalesChart, {}, "post").then((res) => {
            if (res.data !== undefined) {
                let templength = res.data.lstResult.length
                let mainlist = [];
                let childlist = [];
                console.log(templength, "length");
                childlist.push(res.data.lstResult[0])
                for (let i = 1; i <= parseInt(templength / pageSize) + 1; i++) {
                    if (((i) * pageSize) < res.data.lstResult.length) {
                        for (let index = (i - 1) * pageSize + 1; index <= i * pageSize; index++) {
                            childlist.push(res.data.lstResult[index])
                        }
                    } else {
                        console.log("hahahah", (i - 1) * pageSize + 1, templength - (parseInt(templength / pageSize) * pageSize));
                        for (let index = (i - 1) * pageSize + 1; index < templength; index++) {
                            childlist.push(res.data.lstResult[index])
                        }
                    }
                    console.log(childlist, 'list');
                    mainlist.push(childlist)
                    console.log(mainlist, 'list');

                    childlist = [];
                }
                setdata(mainlist)
                setdataLoader(false)
                if (templength !== 0) {
                    setLoader(false)
                } else {
                    setLoader(true)
                }
            } else {
                alert(res.Error)
            }
        })
    }

    function fetchPaginatedData(data1) {
        if (data1 !== undefined && data1.indexOf(undefined) === -1) {
            console.log(data1, "sds");
            if (data.length > 0 && data1.length > 0) {
                console.log(data, "rtrtrtr");

                var tempYaxis = [];
                for (let i = 0; i < StockToSalesChartObject[props.id]['yAxis'].length; i++) {
                    var tempYaxis1 = [];
                    for (let j = 0; j < data1.length; j++) {
                        tempYaxis1.push(data1[j][StockToSalesChartObject[props.id]['yAxis'][i]]);
                    }
                    tempYaxis.push(tempYaxis1);
                }
                setyAxis(tempYaxis);


                var tempXaxis = [];
                for (let j = 0; j < data1.length; j++) {
                    tempXaxis.push(data1[j][StockToSalesChartObject[props.id]['xAxis']]);
                }
                setxAxis(tempXaxis);

            }
        }
    }

    function dataformate() {
        let tempjs = {};
        let templs = [];

        for (let index = 0; index < xAxis.length; index++) {
            tempjs = {};
            tempjs[StockToSalesChartObject[props.id].xAxis] = xAxis[index];
            tempjs['AvgStock'] = yAxis[0][index];
            tempjs['Sales-NetWeight'] = yAxis[1][index];
            tempjs['AvgStockCycleNtWt'] = yAxis[2][index];
            templs.push(tempjs);
        }
        return templs;
    }

    function handleMonthOptionClick(label) {
        contextData.SetState({ ...contextData.state, ['MonthType']: label })
    }
    // let max1: any = Math.max(...props.barprops.Yaxis[0])
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
    if (inputdata.Unit !== 'P' || inputdata.Unit === '') {
        let tempYAxis = yAxis;
        tempYAxis.splice(2, 1);
        if (document.getElementsByClassName('crancy-progress-card card-contain-graph')[0] !== undefined && xAxis.length > 0 && yAxis.length > 0) {
            if (props.id === 1) {
                option = {
                    themeId: 11,
                    chartId: 'inside-Baryudsd' + props.id,
                    charttype: 'inside-Bar',
                    height: '320%',
                    width: '100%',
                    legend: ['AvgStock', 'Sales-NetWeight', 'AvgStockCycleNtWt'],
                    color: StockToSalesChartObject[props.id].color,
                    widthlst: [document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth / 20, document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth / 35],
                    Xaxis: xAxis,
                    Yaxis: tempYAxis,
                    bargap: '-80%',
                    alignment: 'v',
                    maxval: findMinMax()[0],
                    minval: findMinMax()[1],
                    barnum: 2,
                    divname: 'crancy-progress-card card-contain-graph',
                    tooltipid: 0
                }
            } else {
                option = {
                    themeId: 11,
                    chartId: 'inside-Baryuiaw' + props.id,
                    charttype: 'inside-Bar',
                    height: '350%',
                    width: '100%',
                    legend: ['AvgStock', 'Sales-NetWeight', 'AvgStockCycleNtWt'],
                    color: StockToSalesChartObject[props.id].color,
                    widthlst: [document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth / 20, document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth / 35, document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth / 45],
                    Xaxis: xAxis,
                    Yaxis: tempYAxis,
                    bargap: '-80%',
                    alignment: 'v',
                    maxval: findMinMax()[0],
                    minval: findMinMax()[1],
                    barnum: 2,
                    divname: 'crancy-progress-card card-contain-graph',
                    tooltipid: 0
                }
            }
            console.log("options", option);

        }
    } else {
        let tempYAxis = yAxis;
        tempYAxis.splice(1, 1);
        if (document.getElementsByClassName('crancy-progress-card card-contain-graph')[0] !== undefined && xAxis.length > 0 && yAxis.length > 0) {
            if (props.id === 1) {
                option = {
                    themeId: 11,
                    chartId: 'inside-Baryudsd' + props.id,
                    charttype: 'inside-Bar',
                    height: '320%',
                    width: '100%',
                    legend: ['AvgStock', 'Sales-Pieces', 'AvgStockCycleNtWt'],
                    color: StockToSalesChartObject[props.id].color,
                    widthlst: [document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth / 20, document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth / 35],
                    Xaxis: xAxis,
                    Yaxis: tempYAxis,
                    bargap: '-80%',
                    alignment: 'v',
                    maxval: findMinMax()[0],
                    minval: findMinMax()[1],
                    barnum: 2,
                    divname: 'crancy-progress-card card-contain-graph',
                    tooltipid: 0
                }
            } else {
                option = {
                    themeId: 11,
                    chartId: 'inside-Baryuiaw' + props.id,
                    charttype: 'inside-Bar',
                    height: '350%',
                    width: '100%',
                    legend: ['AvgStock', 'Sales-Pieces', 'AvgStockCycleNtWt'],
                    color: StockToSalesChartObject[props.id].color,
                    widthlst: [document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth / 20, document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth / 35, document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth / 45],
                    Xaxis: xAxis,
                    Yaxis: tempYAxis,
                    bargap: '-80%',
                    alignment: 'v',
                    maxval: findMinMax()[0],
                    minval: findMinMax()[1],
                    barnum: 2,
                    divname: 'crancy-progress-card card-contain-graph',
                    tooltipid: 0
                }
            }
            console.log("options", option);

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

    console.log("chart", <AlphaDashChart obj={JSON.parse(JSON.stringify(option))} />)

    return (
        <div class="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="graph-card">
                <div className='card-title-graph schedule-graph' onClick={handleDetailNaviogation}>
                    <div className="col-xs-8 col-sm-10 col-md-10 col-10" >
                        <p><i class={StockToSalesChartObject[props.id].iconclassName}></i>{StockToSalesChartObject[props.id].heading}</p>
                    </div>
                </div>

                {dataloader !== true ?
                    loader !== true ?
                        <div class="crancy-progress-card card-contain-graph">
                            {props.id === 1 ?
                                <div className='ChartMonthOption'>
                                    <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("M") }}>Month Wise</button>
                                    <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("Q") }}>Quater Wise</button>
                                    <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("HY") }}>Half Year Wise</button>
                                    <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("Y") }}>Year Wise</button>
                                </div>
                                : null}
                            <div className='' style={props.id === 1 ? { height: '310px' } : { height: '350px' }}>
                                {option.Xaxis !== undefined ? option.Xaxis.length > 0 ? <AlphaDashChart obj={JSON.parse(JSON.stringify(option))} /> : null : null}
                                <div className='mainscreenchartdiv'>
                                    <button onClick={handleLeftClick} className='chartupdown left'><i class="fa-solid fa-left-long iconupdown"></i></button>

                                    <button onClick={handleRightClick} className='chartupdown right'><i class="fa-solid fa-right-long iconupdown"></i></button>
                                </div>
                            </div>
                        </div>
                        : <div class="crancy-progress-card card-contain-graph"> {props.id === 1 ?
                            <div className='ChartMonthOption'>
                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("M") }}>Month Wise</button>
                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("Q") }}>Quater Wise</button>
                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("HY") }}>Half Year Wise</button>
                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("Y") }}>Year Wise</button>
                            </div>
                            : null}Data Not Found</div> :
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
