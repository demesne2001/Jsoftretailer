import React, { useContext, useEffect, useState } from 'react';
import MinimumStockChartObject from './MinimumStockChartObject';
import { useNavigate } from 'react-router-dom';
import contex from '../../contex/Contex';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs';
import DataError from '../../Assets/image/Error.gif'

export default function MinimumStockChart(props) {
    const navigate = useNavigate();
    const contextData = useContext(contex);
    let inputdata = contextData.state;
    const [xAxis, setxAxis] = useState([]);
    const [yAxis, setyAxis] = useState([]);
    const [loader, setLoader] = useState(true);
    const [dataloader, setdataLoader] = useState(true);
    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(0);
    const [data, setdata] = useState([]);
    const [flag, setflag] = useState('bar');
    const [datashow, setDatashow] = useState(11);
    const [flagSort, setflagSort] = useState('AvgStockCycle Desc');
    const [countforflag, setcountforflag] = useState(0);
    let percentage;
    let percentageVertical;
    let optionMultiBar = {}
    let optionBar = {}
    let optionHorizontalBar = {}
    let optionLineBar = {}

    useEffect(() => {
        if (window.innerWidth < 767) {
            setPageSize(5)
        } else {
            setPageSize(10)
        } 
        setDatashowOnDivWidth()
    }, [])

    useEffect(() => {
        getChartData()

    }, [inputdata])

    useEffect(() => {
        if (flagSort !== "" && countforflag !== 0) {
            getSortChartData()
        }
    }, [flagSort])


    function handleDetailNaviogation() {
        if (props.id === 3) {

            contextData.SetDetailState(inputdata)
            navigate('/minimum_stocks_Detailed', { state: { componentName: MinimumStockChartObject[4].heading, ChartMode: 4, filterkey: 'StrItemID', screen: 1, showdropdown: 1, FromDate: inputdata.FromDate, ToDate: inputdata.ToDate, filterdata: JSON.stringify(inputdata) }, replace: true });
        } else if (props.id === 4) {
            contextData.SetDetailState(inputdata)
            navigate('/minimum_stocks_Detailed', { state: { componentName: MinimumStockChartObject[4].heading, ChartMode: 4, filterkey: 'StrItemID', screen: 1, showdropdown: 0, FromDate: inputdata.FromDate, ToDate: inputdata.ToDate, filterdata: JSON.stringify(inputdata) }, replace: true });
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
            console.log(parseInt(per),"answer");
            percentage = parseInt(per)
        } else {
            divideHorizontalData(parseInt(len_of_data/2), parseInt(per/2))
        }
    }

    function divideVerticalData(len_of_data, per) {
        if (len_of_data <= datashow) {
            console.log(parseInt(per),"answer");
            percentageVertical = parseInt(per)
        } else {
            divideVerticalData(parseInt(len_of_data/2), parseInt(per/2))
        }
    }

    divideHorizontalData(xAxis.length, 100)
    divideVerticalData(xAxis.length, 100)
    if (yAxis.length > 0) {
        let sliderbol
        if (xAxis.length < 8) {
            sliderbol = false
        } else {
            sliderbol = true
        }
        if (inputdata.Unit !== 'P' || inputdata.Unit === '') {
            let tempYAxis = yAxis;
            if (tempYAxis.length > 3) {
                tempYAxis.splice(1, 1);
            }

            if (document.getElementsByClassName('crancy-progress-card card-contain-graph')[0] !== undefined) {
                optionMultiBar = {
                    themeId: 11,
                    chartId: 'MinimumStocks' + props.id,
                    charttype: 'inside-Bar',
                    height: '350%',
                    width: '100%',
                    legend: ["Minimum Stock", "Actual Stock", "MinimumStockCycle"],
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
                    tooltipid: 2,
                    sliderflag:sliderbol,
                    datazoomlst:[0,percentageVertical,0,100],
                    filtervalueindex:2,
                    prclst:tempYAxis[2]
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
                    sliderflag:sliderbol,
                    datazoomlst:[0,100,0,percentage],
                    tooltip:{
                        formatter:'{b}<br> AvgStockCycle - {c}%'
                    },
                    prclst:tempYAxis[2]
                }
                optionBar = {
                    themeId: localStorage.getItem("ThemeIndex"),
                    charttype: 'roundbar',
                    height: document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientHeight - 30,
                    width: document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth - 30,
                    chartId: 'MinimumStocks' + props.id,
                    Xaxis: xAxis,
                    Yaxis: tempYAxis[2],
                    sliderflag:sliderbol,
                    datazoomlst:[0,percentageVertical,0,100],
                    divname: 'crancy-progress-card card-contain-graph',
                    tooltip:{
                        formatter:'{b}<br> AvgStockCycle - {c}%'
                    },
                    prclst:tempYAxis[2]
                }
                optionLineBar = {
                    themeId: 11,
                    height: '350%',
                    width: '100%',
                    chartId: 'MinimumStocks' + props.id,
                    charttype: 'cartesian-point',
                    Xaxis: xAxis,
                    Yaxis: tempYAxis[2],
                }

            }
        } else {
            let tempYAxis = yAxis;
            if (tempYAxis.length > 3) {
                tempYAxis.splice(0, 1);
            }

            if (document.getElementsByClassName('crancy-progress-card card-contain-graph')[0] !== undefined) {
                optionMultiBar = {
                    themeId: 11,
                    chartId: 'MinimumStocks' + props.id,
                    charttype: 'inside-Bar',
                    height: '350%',
                    width: '100%',
                    legend: ["Minimum Stock Pcs ", "Actual stock", "MinimumStockCycle"],
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
                    tooltipid: 2,
                    sliderflag:sliderbol,
                    datazoomlst:[0,percentageVertical,0,100],
                    prclst:tempYAxis[2],
                    filtervalueindex:2
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
                    sliderflag:sliderbol,
                    datazoomlst:[0,100,0,percentage],
                    tooltip:{
                        formatter:'{b} - {c}%'
                    }
                }
                optionBar = {
                    themeId: localStorage.getItem("ThemeIndex"),
                    charttype: 'roundbar',
                    height: document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientHeight - 30,
                    width: document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth - 30,
                    chartId: 'MinimumStocks' + props.id,
                    Xaxis: xAxis,
                    Yaxis: tempYAxis[2],
                    sliderflag:sliderbol,
                    datazoomlst:[0,percentageVertical,0,100],
                    divname: 'crancy-progress-card card-contain-graph',
                    tooltip:{
                        formatter:'{b}<br>AvgStockCycle - {c}%'
                    }
                }
                optionLineBar = {
                    themeId: 11,
                    height: '350%',
                    width: '100%',
                    chartId: 'MinimumStocks' + props.id,
                    charttype: 'cartesian-point',
                    Xaxis: xAxis,
                    Yaxis: tempYAxis[2],
                    sliderflag:sliderbol
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

    document.getElementById("root").addEventListener("click", function (event) {
        if (event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon' && event.target.id !== 'icon_drop') {
            if (document.getElementById("myDropdownicon" + props.id) !== null) {
                document.getElementById("myDropdownicon" + props.id).style.display = "none"
                document.getElementById("sortingmenu" +props.id).style.display = "none"
            }
        }
    });

    return (
        <div class="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="graph-card">
                <div className='card-title-graph schedule-graph'>
                    <div className="col-xs-8 col-sm-10 col-md-10 col-10" onClick={handleDetailNaviogation}>
                        <p><i class={MinimumStockChartObject[props.id].iconclassName}></i>{MinimumStockChartObject[props.id].heading}</p>
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
                        <div id={"sortingmenu" + props.id} className="dropdown-contenticon minimumstockdropdown" onClick={handleclickSort}>
                            {flagSort === 'AvgStockCycle' ? <><a id='AvgStockCycle'>Sort by MinimumStockCycle ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='AvgStockCycle'>Sort by MinimumStockCycle ASC&nbsp;</a><hr className='custom-hr' /></>}
                            {flagSort === 'AvgStockCycle Desc' ? <><a id='AvgStockCycle Desc'>Sort by MinimumStockCycle DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='AvgStockCycle Desc'>Sort by MinimumStockCycle DESC&nbsp;</a><hr className='custom-hr' /></>}
                           { inputdata.Unit === 'P'?
                           <>
                            {flagSort === 'AvgMinStockRequiredPcs' ? <><a id='AvgMinStockRequiredPcs'>Sort by MinimumStockPcs ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='AvgMinStockRequiredPcs'>Sort by MinimumStockPcs ASC&nbsp;</a><hr className='custom-hr' /> </>}
                            {flagSort === 'AvgMinStockRequiredPcs desc' ? <><a id='AvgMinStockRequiredPcs desc'>Sort by MinimumStockPcs DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='AvgMinStockRequiredPcs desc'>Sort by MinimumStockPcs DESC&nbsp;</a><hr className='custom-hr' /> </>}
                            </>:
                            <>
                            {flagSort === 'AvgMinStockRequired' ? <><a id='AvgMinStockRequired'>Sort by MinimumStock ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='AvgMinStockRequired'>Sort by MinimumStock ASC&nbsp;</a><hr className='custom-hr' /> </>}
                            {flagSort === 'AvgMinStockRequired desc' ? <><a id='AvgMinStockRequired desc'>Sort by MinimumStock DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='AvgMinStockRequired desc'>Sort by MinimumStock DESC&nbsp;</a><hr className='custom-hr' /> </>}
                            </>
                            }

                        </div>
                        <div className='btnicons'>
                            <div id={"myDropdownicon" + props.id} className="dropdown-contenticon minimumstockdropdownchartdata" onClick={handleclick}>
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
                            <div style={props.id === 1 ? { height: '310px' } : { height: '350px' }}>
                                {flag === 'bar' && optionBar.height !== undefined ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionBar))} /> : null}
                                {flag === 'HorizontalBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionHorizontalBar))} /> : null}
                                {/* {flag === 'Line' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionLineBar))} /> : null} */}
                                {flag === 'MultiBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionMultiBar))} /> : null}

                            </div>
                        </div>
                        : <div class="crancy-progress-card card-contain-graph">

<img id='errorImg'  src={DataError} /></div> :
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
