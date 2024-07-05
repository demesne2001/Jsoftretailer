import React, { useContext, useEffect, useState } from 'react';
import StockToSalesChartObject from '../Stock_To_Sales_Components/StockToSalesChartObject';
import contex from '../../contex/Contex';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'
import DataError from '../../Assets/image/Error.gif'

export default function StockToSalesDefaultChart(props) {
    const contextData = useContext(contex);
    let inputdata = contextData.detailsecondstate;
    const [xAxis, setxAxis] = useState([]);
    const [id, setid] = useState([]);
    const [yAxis, setyAxis] = useState([]);
    const [loader, setLoader] = useState(true);
    const [dataloader, setdataLoader] = useState(true);
    const [datashow, setDatashow] = useState(11);

    const [flag, setflag] = useState('bar');
    const [flagSort, setflagSort] = useState('AvgStockCycleNtWt Desc');
    const [countforflag, setcountforflag] = useState(0)
    let optionMultiBar = {}
    let optionBar = {}
    let optionHorizontalBar = {}
    let optionLineBar = {}
    let percentage;
    let percentageVertical;


    useEffect(() => {
        if (props.state.ChartMode !== undefined && props.state.ChartMode !== null) {
            getChartData()
        }
    }, [props])

    useEffect(() => {
        if (props.state.ChartMode !== undefined && props.state.ChartMode !== null) {
            getChartData()
        }
    }, [inputdata])

    useEffect(() => {
        if (flagSort !== "" && countforflag !== 0) {
            getSortChartData()
        }
    }, [flagSort])



    function getChartData() {
        inputdata = { ...inputdata, 'Mode': props.state.ChartMode, 'FromDate': props.state.FromDate, 'ToDate': props.state.ToDate }
        post(inputdata, API.GetStockToSalesChart, {}, "post").then((res) => {
            if (res.data !== undefined) {
                if (res.data.lstResult.length > 0) {
                    var tempYaxis = [];
                    for (let i = 0; i < StockToSalesChartObject[props.state.ChartMode]['yAxis'].length; i++) {
                        var tempYaxis1 = [];
                        for (let j = 0; j < res.data.lstResult.length; j++) {
                            tempYaxis1.push(res.data.lstResult[j][StockToSalesChartObject[props.state.ChartMode]['yAxis'][i]]);
                        }
                        tempYaxis.push(tempYaxis1);
                    }
                    setyAxis(tempYaxis);

                    let idtemp = [];
                    let tempXaxis = [];
                    for (let j = 0; j < res.data.lstResult.length; j++) {
                        tempXaxis.push(res.data.lstResult[j][StockToSalesChartObject[props.state.ChartMode]['xAxis']]);
                        idtemp.push(res.data.lstResult[j][StockToSalesChartObject[props.state.ChartMode]['id']])
                    }
                    setxAxis(tempXaxis);
                    setid(idtemp);
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
    function divideHorizontalData(len_of_data, per) {
        if (len_of_data <= 5) {
            console.log(parseInt(per), "answer");
            percentage = parseInt(per)
        } else {
            divideHorizontalData(parseInt(len_of_data / 2), parseInt(per / 2))
        }
    }

    function divideVerticalData(len_of_data, per) {
        if (len_of_data <= datashow) {
            console.log(parseInt(per), "answer");
            percentageVertical = parseInt(per)
        } else {
            divideVerticalData(parseInt(len_of_data / 2), parseInt(per / 2))
        }
    }

    divideHorizontalData(xAxis.length, 100)
    divideVerticalData(xAxis.length, 100)
    if (document.getElementsByClassName('graphdetailcards graphdetail-secondcard')[0] !== undefined) {
        let tempYAxis = yAxis;
        if (tempYAxis.length > 3) {
            tempYAxis.splice(2, 1);
        }
        let sliderbol
        if (xAxis.length < 8) {
            sliderbol = false
        } else {
            sliderbol = true
        }
        if (props.state.ChartMode === '1') {
            optionMultiBar = {
                themeId: 11,
                chartId: 'inside-Barydwudsd' + props.state.ChartMode,
                charttype: 'inside-Bar',
                height: '600%',
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
                divname: 'graphdetailcards graphdetail-secondcard',
                sliderflag: sliderbol,
                datazoomlst: [0, percentageVertical, 0, 100],
            }

        } else {
            optionMultiBar = {
                themeId: 11,
                chartId: 'inside-Barsdwayudsd' + props.state.ChartMode,
                charttype: 'inside-Bar',
                height: '600%',
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
                divname: 'graphdetailcards graphdetail-secondcard',
                sliderflag: sliderbol,
                datazoomlst: [0, percentageVertical, 0, 100],
            }

        }
        optionHorizontalBar = {
            themeId: localStorage.getItem("ThemeIndex"),
            charttype: 'round-horizontal-bar',
            height: '600%',
            width: '100%',
            chartId: 'MinimumStocks1' + props.state.ChartMode,
            Xaxis: xAxis,
            color: ['#0073b0', '#caf77d', '#8bd9e8', '#c4e8f0'],
            Yaxis: tempYAxis[2],
            divname: 'graphdetailcards graphdetail-secondcard',
            sliderflag: sliderbol,
            datazoomlst: [0, 100, 0, 50],
            tooltip:{
                formatter:'{b}<br>AvgStockCycleNtWt - {c}'
            }
        }
        optionBar = {
            themeId: localStorage.getItem("ThemeIndex"),
            charttype: 'roundbar',
            height: document.getElementsByClassName('graphdetailcards graphdetail-secondcard')[0].clientHeight - 30,
            width: document.getElementsByClassName('graphdetailcards graphdetail-secondcard')[0].clientWidth - 30,
            chartId: 'MinimumStockwiseBar' + props.state.ChartMode,
            Xaxis: xAxis,
            Yaxis: tempYAxis[2],
            divname: 'graphdetailcards graphdetail-secondcard',
            sliderflag: sliderbol,
            datazoomlst: [0, percentageVertical, 0, 100],
            tooltip:{
                formatter:'{b}<br>AvgStockCycleNtWt - {c}'
            }
        }
        optionLineBar = {
            themeId: 11,
            height: '350%',
            width: '100%',
            chartId: 'Minimumsrtocksline' + props.state.ChartMode,
            charttype: 'cartesian-point',
            Xaxis: xAxis,
            Yaxis: tempYAxis[2],
            tooltip:{
                formatter:'{b}<br>AvgStockCycleNtWt - {c}'
            }
        }
    }




    function handleMonthOptionClick(label) {
        contextData.SetDetailsecondState({ ...contextData.detailsecondstate, ['MonthType']: label })
    }

    function handleclick(e) {
        if (e.target.id !== "myDropdownicon1" + props.state.ChartMode && e.target.id !== '') {
            setflag(e.target.id)
        }
    }

    function handleonchangeCurrency() {
        document.getElementById("myDropdownicon1" + props.state.ChartMode).style.display === "block" ? document.getElementById("myDropdownicon1" + props.state.ChartMode).style.display = "none" : document.getElementById("myDropdownicon1" + props.state.ChartMode).style.display = "block";
        const tag_array = document.getElementsByClassName('dropdown-contenticon-second-screen')

        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {

                if (document.getElementsByClassName('dropdown-contenticon-second-screen')[i]['id'] !== "myDropdownicon1" + props.state.ChartMode) {
                    document.getElementsByClassName('dropdown-contenticon-second-screen')[i].style.display = 'none';
                }
            }
        }
    }

    function handleSorting() {
        document.getElementById("sortingmenu1" + props.state.ChartMode).style.display === "block" ? document.getElementById("sortingmenu1" + props.state.ChartMode).style.display = "none" : document.getElementById("sortingmenu1" + props.state.ChartMode).style.display = "block";
        const tag_array = document.getElementsByClassName('dropdown-contenticon-second-screen')

        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {
                if (document.getElementsByClassName('dropdown-contenticon-second-screen')[i]['id'] !== "sortingmenu1" + props.state.ChartMode) {
                    document.getElementsByClassName('dropdown-contenticon-second-screen')[i].style.display = 'none';
                }
            }
        }
    }

    function handleclickSort(e) {
        if (e.target.id !=="sortingmenu1" + props.state.ChartMode && e.target.id !== '') {
            setflagSort(e.target.id)
            setcountforflag(1)
        }
    }

    function getSortChartData() {
        inputdata = { ...inputdata, 'Mode': props.state.ChartMode, "sort": flagSort }

        post(inputdata, API.GetStockToSalesChart, {}, "post").then((res) => {
            if (res.data !== undefined) {
                var tempYaxis = [];
                for (let i = 0; i < StockToSalesChartObject[props.state.ChartMode]['yAxis'].length; i++) {
                    var tempYaxis1 = [];
                    for (let j = 0; j < res.data.lstResult.length; j++) {
                        tempYaxis1.push(res.data.lstResult[j][StockToSalesChartObject[props.state.ChartMode]['yAxis'][i]]);
                    }
                    tempYaxis.push(tempYaxis1);
                }
                setyAxis(tempYaxis);


                var tempXaxis = [];
                for (let j = 0; j < res.data.lstResult.length; j++) {
                    tempXaxis.push(res.data.lstResult[j][StockToSalesChartObject[props.state.ChartMode]['xAxis']]);
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

    document.getElementById("root").addEventListener("click", function (event) {
        if (event.target.id !== 'icon_sort' && event.target.id !== 'icon_drop') {
            if (document.getElementById("myDropdownicon1" + props.state.ChartMode) !== null) {
                document.getElementById("myDropdownicon1" + props.state.ChartMode).style.display = "none"
                document.getElementById("sortingmenu1" + props.state.ChartMode).style.display = "none"
            }
        }
    });

    return (
        <div>
            <div class="title-top-graphdetail-withoutcolor">
                <h5>
                {props.state.componentName} <span style={{ fontSize: '15px' }}> {contextData.filtername !== "" ? "( " + contextData.filtername + ", AvgStockCycleNtWt - " + contextData.filtervalue + " )" : null}</span>
                    <div className='d-flex MinimumstockIcons'>
                        <div className='dropbtngraph'>
                            <i className="fa-solid fa-arrow-down-short-wide" id='icon_sort' style={{ color: '#094876 !important' }} onClick={handleSorting} />
                        </div>
                        <div className='dropbtngraph'>
                            <i class="fa-solid fa-ellipsis-vertical" id='icon_drop' onClick={handleonchangeCurrency} />
                        </div>
                    </div>
                </h5>
            </div>


            <div id={"sortingmenu1" + props.state.ChartMode} className="dropdown-contenticon-second-screen" onClick={handleclickSort}>
                {flagSort === 'AvgStockCycleNtWt' ? <><a id='AvgStockCycleNtWt'>Sort by AvgStockCycleNtWt ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='AvgStockCycleNtWt'>Sort by AvgStockCycleNtWt ASC&nbsp;</a><hr className='custom-hr' /></>}
                {flagSort === 'AvgStockCycleNtWt Desc' ? <><a id='AvgStockCycleNtWt Desc'>Sort by AvgStockCycleNtWt DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='AvgStockCycleNtWt Desc'>Sort by AvgStockCycleNtWt DESC&nbsp;</a><hr className='custom-hr' /></>}
                {inputdata.Unit === 'P' ?
                    <>
                        {flagSort === 'Spcs' ? <><a id='Spcs'>Sort by Sales-Peices ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='Spcs'>Sort by Sales-Peices ASC&nbsp;</a><hr className='custom-hr' /> </>}
                        {flagSort === 'Spcs desc' ? <><a id='Spcs desc'>Sort by Sales-Peices DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='Spcs desc'>Sort by Sales-Peices DESC&nbsp;</a><hr className='custom-hr' /> </>}
                    </> :
                    <>
                        {flagSort === 'SNtWt' ? <><a id='SNtWt'>Sort by Sales-Netweight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='SNtWt'>Sort by Sales-Netweight ASC&nbsp;</a><hr className='custom-hr' /> </>}
                        {flagSort === 'SNtWt desc' ? <><a id='SNtWt desc'>Sort by Sales-Netweight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='SNtWt desc'>Sort by Sales-Netweight DESC&nbsp;</a><hr className='custom-hr' /> </>}
                    </>
                }

            </div>
            <div className='btnicons'>
                <div id={"myDropdownicon1" + props.state.ChartMode} className="dropdown-contenticon-second-screen" onClick={handleclick}>
                    {flag === 'bar' ? <><a id='bar'>Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' >Bar</a><hr className='custom-hr' /></>}
                    {flag === 'HorizontalBar' ? <><a id='HorizontalBar'>HorizontalBar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='HorizontalBar' >HorizontalBar</a><hr className='custom-hr' /></>}
                    {flag === 'MultiBar' ? <><a id='MultiBar'>MultiBar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='MultiBar' >MultiBar</a><hr className='custom-hr' /></>}
                </div>
            </div>

            <div class="graphdetailcards graphdetail-secondcard">
                <div class="topimg-gd" style={{ height: '580px' }}>

                    {
                        dataloader !== true ?
                            loader !== true ?


                                optionBar.Xaxis !== undefined ? optionBar.Xaxis.length > 0 ?
                                    <div>
                                        {props.state.ChartMode === '1' ?
                                            <div className='ChartMonthOption'>
                                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("M") }}>Month Wise</button>
                                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("Q") }}>Quater Wise</button>
                                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("HY") }}>Half Year Wise</button>
                                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("Y") }}>Year Wise</button>
                                            </div>
                                            : null}
                                        <>
                                            {flag === 'bar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionBar))} /> : null}
                                            {flag === 'HorizontalBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionHorizontalBar))} /> : null}
                                             {flag === 'MultiBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionMultiBar))} /> : null}
                                        </>                                    </div>
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
                                    <img id='errorImg'  src={DataError} /></div> : <div class="dot-spinner" style={{ margin: "auto", position: 'inherit' }} >
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
