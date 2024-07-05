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
    let MonthType = contextData.Monthtype;
    const [xAxis, setxAxis] = useState([]);
    const [yAxis, setyAxis] = useState([]);
    const [loader, setLoader] = useState(true);
    const [dataloader, setdataLoader] = useState(true);
    const [flag, setflag] = useState('bar');
    const [flagSort, setflagSort] = useState('AvgStockCycleNtWt Desc');
    const [countforflag, setcountforflag] = useState(0);
    const [datashow, setDatashow] = useState(11);

    let percentage;
    let percentageVertical;
    let optionMultiBar = {}
    let optionBar = {}
    let optionHorizontalBar = {}
    let optionLineBar = {}

    useEffect(() => {
        getChartData()

    }, [inputdata])

    useEffect(() => {
        if (props.id === 1) {
            getChartData()
        }
    }, [MonthType])

    useEffect(() => {
        if (flagSort !== "" && countforflag !== 0) {
            getSortChartData()
        }
    }, [flagSort])
    useEffect(() => {
        setDatashowOnDivWidth()
    }, [])

    function handleDetailNaviogation() {
        navigate('/Stock_To_Sales_Detailed', { state: { componentName: StockToSalesChartObject[props.id].heading, ChartMode: props.id, filterkey: StockToSalesChartObject[props.id].filterkey, FromDate: inputdata.FromDate, ToDate: inputdata.ToDate, filterdata: JSON.stringify(inputdata) }, replace: true });
    }

    function getChartData() {
        inputdata = { ...inputdata, 'Mode': props.id, 'MonthType': MonthType }

        post(inputdata, API.GetStockToSalesChart, {}, "post").then((res) => {
            if (res.data !== undefined) {
                var tempYaxis = [];
                for (let i = 0; i < StockToSalesChartObject[props.id]['yAxis'].length; i++) {
                    var tempYaxis1 = [];
                    for (let j = 0; j < res.data.lstResult.length; j++) {
                        tempYaxis1.push(res.data.lstResult[j][StockToSalesChartObject[props.id]['yAxis'][i]]);
                    }
                    tempYaxis.push(tempYaxis1);
                }
                setyAxis(tempYaxis);


                var tempXaxis = [];
                for (let j = 0; j < res.data.lstResult.length; j++) {
                    tempXaxis.push(res.data.lstResult[j][StockToSalesChartObject[props.id]['xAxis']]);
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
            tempjs[StockToSalesChartObject[props.id].xAxis] = xAxis[index];
            tempjs['AvgStock'] = yAxis[0][index];
            tempjs['Sales-NetWeight'] = yAxis[1][index];
            tempjs['AvgStockCycleNtWt'] = yAxis[2][index];
            templs.push(tempjs);
        }
        return templs;
    }

    function handleMonthOptionClick(label) {
        contextData.setMonthtype(label)
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

    function setDatashowOnDivWidth() {
        console.log(document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth, "divlength");
        if (document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth < 902 && document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth > 450) {
            setDatashow(5)
        } else if (document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth <= 450) {
            setDatashow(3)
        } else {
            setDatashow(11)
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
            console.log(per, props.id,"answer12");
            percentageVertical = per
        } else {
            divideVerticalData(parseInt(len_of_data / 2), per / 2)
        }
    }

    divideHorizontalData(xAxis.length, 100)
    divideVerticalData(xAxis.length, 100)
    console.log(percentageVertical, xAxis.length, props.id  ,"asjdhuhd"
    );
    if (inputdata.Unit !== 'P' || inputdata.Unit === '') {
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

        if (document.getElementsByClassName('crancy-progress-card card-contain-graph')[0] !== undefined && xAxis.length > 0 && yAxis.length > 0) {
            if (props.id === 1) {
                optionMultiBar = {
                    themeId: 11,
                    chartId: 'StockToSales' + props.id,
                    charttype: 'inside-Bar',
                    height: '350%',
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
                    tooltipid: 0,
                    sliderflag: sliderbol,
                    datazoomlst: [0, percentageVertical, 0, 100],
                    filtervalueindex: 2,

                }
            } else {
                optionMultiBar = {
                    themeId: 11,
                    chartId: 'StockToSales' + props.id,
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
                    tooltipid: 0,
                    sliderflag: sliderbol,
                    datazoomlst: [0, percentageVertical, 0, 100],
                    filtervalueindex: 2,
                }

            }
            optionHorizontalBar = {
                themeId: localStorage.getItem("ThemeIndex"),
                charttype: 'round-horizontal-bar',
                height: '100%',
                width: '100%',
                chartId: 'StockToSales' + props.id,
                Xaxis: xAxis,
                color: ['#0073b0', '#caf77d', '#8bd9e8', '#c4e8f0'],
                Yaxis: tempYAxis[2],
                divname: 'crancy-progress-card card-contain-graph',
                sliderflag: sliderbol,
                datazoomlst: [0, 100, 0, percentage],
                tooltip: {
                    formatter: '{b}<br> AvgStockCycle - {c}%'
                },
       

            }
            optionBar = {
                themeId: localStorage.getItem("ThemeIndex"),
                charttype: 'roundbar',
                height: document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientHeight - 30,
                width: document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth - 30,
                chartId: 'StockToSales' + props.id,
                Xaxis: xAxis,
                Yaxis: tempYAxis[2],
                sliderflag: sliderbol,
                datazoomlst: [0, 50, 0, 100],
                divname: 'crancy-progress-card card-contain-graph',
                tooltip: {
                    formatter: '{b}<br>AvgStockCycleNtWt - {c}'
                },
                datazoomlst:[0,percentageVertical,0,100],
            }
            optionLineBar = {
                themeId: 11,
                height: '350%',
                width: '100%',
                chartId: 'StockToSales' + props.id,
                charttype: 'cartesian-point',
                Xaxis: xAxis,
                Yaxis: tempYAxis[2],
                tooltip: {
                    formatter: '{b}<br>AvgStockCycleNtWt - {c}'
                }
            }


        }
    } else {
        let tempYAxis = yAxis;
        if (tempYAxis.length > 3) {
            tempYAxis.splice(1, 1);
        }
        let sliderbol
        if (xAxis.length < 8) {
            sliderbol = false
        } else {
            sliderbol = true
        }
        if (document.getElementsByClassName('crancy-progress-card card-contain-graph')[0] !== undefined && xAxis.length > 0 && yAxis.length > 0) {
            if (props.id === 1) {
                optionMultiBar = {
                    themeId: 11,
                    chartId: 'inside-Baryudsd' + props.id,
                    charttype: 'inside-Bar',
                    height: '350%',
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
                    tooltipid: 0,
                    sliderflag: sliderbol,
                    datazoomlst:[0,percentageVertical,0,100],
                    filtervalueindex: 2
                }

            } else {
                optionMultiBar = {
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
                    tooltipid: 0,
                    sliderflag: sliderbol,
                    datazoomlst:[0,percentageVertical,0,100],
                    filtervalueindex: 2
                }

            }
            optionHorizontalBar = {
                themeId: localStorage.getItem("ThemeIndex"),
                charttype: 'round-horizontal-bar',
                height: '100%',
                width: '100%',
                chartId: 'MinimumStocks' + props.id,
                Xaxis: xAxis,
                color: ['#0073b0', '#caf77d', '#8bd9e8', '#c4e8f0'],
                Yaxis: tempYAxis[2],
                divname: 'crancy-progress-card card-contain-graph',
                sliderflag: sliderbol,
                datazoomlst:[0,100,0,percentage],
                tooltip: {
                    formatter: '{b}<br>AvgStockCycleNtWt - {c}'
                }
            }
            optionBar = {
                themeId: localStorage.getItem("ThemeIndex"),
                charttype: 'roundbar',
                height: document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientHeight - 30,
                width: document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth - 30,
                chartId: 'MinimumStockwiseBar1' + props.id,
                Xaxis: xAxis,
                Yaxis: tempYAxis[2],
                divname: 'crancy-progress-card card-contain-graph',
                sliderflag: sliderbol,
                datazoomlst:[0,percentageVertical,0,100],
                tooltip: {
                    formatter: '{b}<br>AvgStockCycleNtWt - {c}'
                }
            }
            optionLineBar = {
                themeId: 11,
                height: '350%',
                width: '100%',
                chartId: 'Minimumsrtocksline' + props.id,
                charttype: 'cartesian-point',
                Xaxis: xAxis,
                Yaxis: tempYAxis[2],
                tooltip: {
                    formatter: '{b}<br>AvgStockCycleNtWt - {c}'
                }
            }


        }
    }

    function handleclick(e) {
        if (e.target.id !== "myDropdownicon" + props.id && e.target.id !== '') {
            setflag(e.target.id)
        }
    }

    function handleonchangeCurrency() {
        document.getElementById("myDropdownicon" + props.id).style.display === "block" ? document.getElementById("myDropdownicon" + props.id).style.display = "none" : document.getElementById("myDropdownicon" + props.id).style.display = "block";
        const tag_array = document.getElementsByClassName('dropdown-contenticon')

        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {

                if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== "myDropdownicon" + props.id) {
                    document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
                }
            }
        }
    }

    function handleSorting() {
        document.getElementById("sortingmenu" + props.id).style.display === "block" ? document.getElementById("sortingmenu" + props.id).style.display = "none" : document.getElementById("sortingmenu" + props.id).style.display = "block";
        const tag_array = document.getElementsByClassName('dropdown-contenticon')

        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {
                if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] !== "sortingmenu" + props.id) {
                    document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
                }
            }
        }
    }

    function handleclickSort(e) {
        if (e.target.id !== props.id && e.target.id !== '') {
            setflagSort(e.target.id)
            setcountforflag(1)
        }
    }

    function getSortChartData() {
        inputdata = { ...inputdata, 'Mode': props.id, "sort": flagSort }

        post(inputdata, API.GetStockToSalesChart, {}, "post").then((res) => {
            if (res.data !== undefined) {
                var tempYaxis = [];
                for (let i = 0; i < StockToSalesChartObject[props.id]['yAxis'].length; i++) {
                    var tempYaxis1 = [];
                    for (let j = 0; j < res.data.lstResult.length; j++) {
                        tempYaxis1.push(res.data.lstResult[j][StockToSalesChartObject[props.id]['yAxis'][i]]);
                    }
                    tempYaxis.push(tempYaxis1);
                }
                setyAxis(tempYaxis);


                var tempXaxis = [];
                for (let j = 0; j < res.data.lstResult.length; j++) {
                    tempXaxis.push(res.data.lstResult[j][StockToSalesChartObject[props.id]['xAxis']]);
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
        if (event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon' && event.target.id !== 'icon_drop') {
            if (document.getElementById("myDropdownicon" + props.id) !== null) {
                document.getElementById("myDropdownicon" + props.id).style.display = "none"
                document.getElementById("sortingmenu" + props.id).style.display = "none"
            }
        }
    });




    return (
        <div class="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="graph-card">
                <div className='card-title-graph schedule-graph' >
                    <div className="col-xs-8 col-sm-10 col-md-10 col-10" onClick={handleDetailNaviogation} >
                        <p><i class={StockToSalesChartObject[props.id].iconclassName}></i>{StockToSalesChartObject[props.id].heading}</p>
                    </div>
                    <div className="col-xs-1 col-sm-1 col-md-1 col-1" >
                        <div className='d-flex MinimumstockIcons'>
                            <div className='dropbtngraph'>
                                <i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleSorting} />
                            </div>
                            <div className='dropbtngraph'>
                                <i class="fa-solid fa-ellipsis-vertical" id='icon_drop' onClick={handleonchangeCurrency} />
                            </div>
                        </div>
                        <div id={"sortingmenu" + props.id} className="dropdown-contenticon stocktosalesdashboarddropdown" onClick={handleclickSort}>
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
                            <div id={"myDropdownicon" + props.id} className="dropdown-contenticon stocktosalesdashboarddropdown" onClick={handleclick}>
                                {flag === 'bar' ? <><a id='bar'>Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' >Bar</a><hr className='custom-hr' /></>}
                                {flag === 'HorizontalBar' ? <><a id='HorizontalBar'>HorizontalBar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='HorizontalBar' >HorizontalBar</a><hr className='custom-hr' /></>}
                                {/* {flag === 'Line' ? <><a id='Line'>Line&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Line' >Line</a><hr className='custom-hr' /></>} */}
                                {flag === 'MultiBar' ? <><a id='MultiBar'>MultiBar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='MultiBar' >MultiBar</a><hr className='custom-hr' /></>}
                            </div>
                        </div>
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
                                {optionMultiBar.Xaxis !== undefined ? optionMultiBar.Xaxis.length > 0 ?
                                    <>
                                        {flag === 'bar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionBar))} /> : null}
                                        {flag === 'HorizontalBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionHorizontalBar))} /> : null}
                                        {/* {flag === 'Line' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionLineBar))} /> : null} */}
                                        {flag === 'MultiBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionMultiBar))} /> : null}
                                    </>
                                    : null : null}
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
		