
import React, { useContext, useEffect, useState } from 'react';
import MinimumStockChartObject from '../MinimumStocksComponents/MinimumStockChartObject';
import contex from '../../contex/Contex';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'
import StockToSalesOption from '../../ChartOptions/StockToSales/StockToSalesOption';
import ReactApexChart from 'react-apexcharts';

export default function MinimumStockDefaultChart(props) {
    const contextData = useContext(contex);
    let inputdata = contextData.detailsecondstate;
    const [xAxis, setxAxis] = useState([]);
    const [id, setid] = useState([]);
    const [yAxis, setyAxis] = useState([]);
    const [loader, setLoader] = useState(true);
    const [dataloader, setdataLoader] = useState(true);
    const [flag, setflag] = useState('bar');
    const [flagSort, setflagSort] = useState('AvgStockCycle Desc');
    const [countforflag, setcountforflag] = useState(0)
    let optionMultiBar = {}
    let optionBar = {}
    let optionHorizontalBar = {}
    let optionLineBar = {}
    let option = {};
    let updatecontext = {}

    useEffect(() => {
        if (props.state.ChartMode !== null) {
            getChartData()
        }
        console.log("api calleddd", props.state.ChartMode);
    }, [props])

    useEffect(() => {
        if (props.state.ChartMode !== null) {
            getChartData()
        }
        console.log("api calleddd1sdsd1", inputdata);
    }, [inputdata])

    useEffect(() => {
        if (flagSort !== "" && countforflag !== 0) {
            getSortChartData()
        }
    }, [flagSort])



    function getChartData() {
        inputdata = { ...inputdata, 'Mode': props.state.ChartMode, 'FromDate': props.state.FromDate, 'ToDate': props.state.ToDate }
        console.log(inputdata, 'sed123');

        post(inputdata, API.GetMinStockChart, {}, "post").then((res) => {
            if (res.data !== undefined) {
                var tempYaxis = [];
                for (let i = 0; i < MinimumStockChartObject[props.state.ChartMode]['yAxis'].length; i++) {
                    var tempYaxis1 = [];
                    for (let j = 0; j < res.data.lstResult.length; j++) {
                        tempYaxis1.push(res.data.lstResult[j][MinimumStockChartObject[props.state.ChartMode]['yAxis'][i]]);
                    }
                    tempYaxis.push(tempYaxis1);
                }
                setyAxis(tempYaxis);

                let idtemp = [];
                let tempXaxis = [];
                for (let j = 0; j < res.data.lstResult.length; j++) {
                    tempXaxis.push(res.data.lstResult[j][MinimumStockChartObject[props.state.ChartMode]['xAxis']]);
                    idtemp.push(res.data.lstResult[j][MinimumStockChartObject[props.state.ChartMode]['id']])
                }
                setxAxis(tempXaxis);
                console.log(idtemp, "sasa");
                setid(idtemp);
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

    if (document.getElementsByClassName('detailstocktosales')[0] !== undefined) {
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

        if (props.state.dropdown === "1") {
            optionMultiBar = {
                themeId: 11,
                chartId: 'inside-Baryuwsedsd' + props.state.ChartMode,
                charttype: 'inside-Bar',
                height: '350%',
                width: '100%',
                legend: ['Minimum Stock', 'Actual Stock', 'AvgStockCycleNtWt'],
                color: MinimumStockChartObject[props.state.ChartMode].color,
                widthlst: [document.getElementsByClassName('detailstocktosales')[0].clientWidth / 20, document.getElementsByClassName('detailstocktosales')[0].clientWidth / 35],
                Xaxis: xAxis,
                Yaxis: tempYAxis,
                bargap: '-80%',
                alignment: 'v',
                idkey: props.state.filterkey,
                idlst: id,
                maxval: findMinMax()[0],
                minval: findMinMax()[1],
                barnum: 2,
                divname: 'detailstocktosales',
                tooltipid: 2,
                sliderflag: sliderbol,
                datazoomlst: [0, 40, 0, 100],

            }
          
        } else {
            optionMultiBar = {
                themeId: 11,
                chartId: 'inside-Baryuwsedsd' + props.state.ChartMode,
                charttype: 'inside-Bar',
                height: '350%',
                width: '100%',
                legend: ['Minimum Stock', 'Actual Stock', 'AvgStockCycleNtWt'],
                color: MinimumStockChartObject[props.state.ChartMode].color,
                widthlst: [document.getElementsByClassName('detailstocktosales')[0].clientWidth / 20, document.getElementsByClassName('detailstocktosales')[0].clientWidth / 35],
                Xaxis: xAxis,
                Yaxis: tempYAxis,
                bargap: '-80%',
                alignment: 'v',
                idkey: props.state.filterkey,
                idlst: id,
                maxval: findMinMax()[0],
                minval: findMinMax()[1],
                barnum: 2,
                divname: 'detailstocktosales',
                tooltipid: 2,
                sliderflag: sliderbol,
                datazoomlst: [0, 40, 0, 100],

            }
        }
        optionHorizontalBar = {
            themeId: localStorage.getItem("ThemeIndex"),
            charttype: 'round-horizontal-bar',
            height: '100%',
            width: '100%',
            chartId: 'MinimumStocks2' + props.id,
            Xaxis: xAxis,
            color: ['#0073b0', '#caf77d', '#8bd9e8', '#c4e8f0'],
            Yaxis: tempYAxis[2],
            divname: 'detailstocktosales',
            idkey: props.state.filterkey,
            idlst: id,
            sliderflag: sliderbol,
            datazoomlst: [0, 100, 50, 100],
            tooltip:{
                formatter:'{b}<br> AvgStockCycle - {c}%'
            }
        }
        optionBar = {
            themeId: localStorage.getItem("ThemeIndex"),
            charttype: 'roundbar',
            height: document.getElementsByClassName('flip-card-back')[0].clientHeight,
            width: document.getElementsByClassName('flip-card-back')[0].clientWidth - 30,
            chartId: 'MinimumStockwiseBar2' + props.id,
            Xaxis: xAxis,
            Yaxis: tempYAxis[2],
            divname: 'detailstocktosales',
            idkey: props.state.filterkey,
            idlst: id,
            sliderflag: sliderbol,
            datazoomlst: [0, 50, 0, 100],
            tooltip:{
                formatter:'{b}<br> AvgStockCycle - {c}%'
            }
        }
        optionLineBar = {
            themeId: 11,
            height: '350%',
            width: '100%',
            chartId: 'Minimumsrtocksline2' + props.id,
            charttype: 'cartesian-point',
            Xaxis: xAxis,
            Yaxis: tempYAxis[2],
            divname: 'detailstocktosales',
            idkey: props.state.filterkey,
            idlst: id,
            sliderflag: sliderbol,
            datazoomlst: [0, 50, 0, 100],
            tooltip:{
                formatter:'{b}<br> AvgStockCycle - {c}%'
            }
        }

        console.log(option, "sdfshgfd");
    }

    if (flag === 'MultiBar') {
        updatecontext = (<AlphaDashChart obj={JSON.parse(JSON.stringify(optionMultiBar))} state={contextData.detailTirdstate} />).props.state;
    } else if (flag === 'Line') {
        updatecontext = (<AlphaDashChart obj={JSON.parse(JSON.stringify(optionLineBar))} state={contextData.detailTirdstate} />).props.state;
    } else if (flag === 'HorizontalBar') {
        updatecontext = (<AlphaDashChart obj={JSON.parse(JSON.stringify(optionHorizontalBar))} state={contextData.detailTirdstate} />).props.state;
    } else if (flag === 'bar') {
        updatecontext = (<AlphaDashChart obj={JSON.parse(JSON.stringify(optionBar))} state={contextData.detailTirdstate} />).props.state;
    }
    function DivOnClick() {
        console.log(updatecontext, "asdhtutdf");
        contextData.SetDetailThirdState({ ...contextData.detailTirdstate, [props.state.filterkey]: updatecontext[props.state.filterkey] })
    }

    function handleclick(e) {
        if (e.target.id !== "myDropdownicon1" + props.id && e.target.id !== '') {
            setflag(e.target.id)
        }
    }

    function handleonchangeCurrency() {
        document.getElementById("myDropdownicon1" + props.id).style.display === "block" ? document.getElementById("myDropdownicon1" + props.id).style.display = "none" : document.getElementById("myDropdownicon1" + props.id).style.display = "block";
        const tag_array = document.getElementsByClassName('dropdown-contenticon-second-screen')

        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {

                if (document.getElementsByClassName('dropdown-contenticon-second-screen')[i]['id'] !== "myDropdownicon1" + props.id) {
                    document.getElementsByClassName('dropdown-contenticon-second-screen')[i].style.display = 'none';
                }
            }
        }
    }

    function handleSorting() {
        document.getElementById("sortingmenu1" + props.id).style.display === "block" ? document.getElementById("sortingmenu1" + props.id).style.display = "none" : document.getElementById("sortingmenu1" + props.id).style.display = "block";
        const tag_array = document.getElementsByClassName('dropdown-contenticon-second-screen')

        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {
                if (document.getElementsByClassName('dropdown-contenticon-second-screen')[i]['id'] !== "sortingmenu1" + props.id) {
                    document.getElementsByClassName('dropdown-contenticon-second-screen')[i].style.display = 'none';
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
        inputdata = { ...inputdata, 'Mode': props.state.ChartMode, "sort": flagSort }
        console.log(inputdata, "sahdgaysdgyagsd");
        post(inputdata, API.GetMinStockChart, {}, "post").then((res) => {
            if (res.data !== undefined) {
                var tempYaxis = [];
                for (let i = 0; i < MinimumStockChartObject[props.state.ChartMode]['yAxis'].length; i++) {
                    var tempYaxis1 = [];
                    for (let j = 0; j < res.data.lstResult.length; j++) {
                        tempYaxis1.push(res.data.lstResult[j][MinimumStockChartObject[props.state.ChartMode]['yAxis'][i]]);
                    }
                    tempYaxis.push(tempYaxis1);
                }
                setyAxis(tempYaxis);

                let idtemp = [];
                let tempXaxis = [];
                for (let j = 0; j < res.data.lstResult.length; j++) {
                    tempXaxis.push(res.data.lstResult[j][MinimumStockChartObject[props.state.ChartMode]['xAxis']]);
                    idtemp.push(res.data.lstResult[j][MinimumStockChartObject[props.state.ChartMode]['id']])
                }
                setxAxis(tempXaxis);
                console.log(idtemp, "sasa");
                setid(idtemp);
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
        if (event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon minimumstocktosaleschartoption' && event.target.id !== 'icon_drop') {
            if (document.getElementById("myDropdownicon1" + props.id) !== null) {
                document.getElementById("myDropdownicon1" + props.id).style.display = "none"
                document.getElementById("sortingmenu1" + props.id).style.display = "none"
            }
        }
    });



    return (
        <div class="col-xl-6 col-lg-6 col-md-12 col-12">
            <div className='graph-card'>
                <div class="title-top-graphdetail">
                            <h5>
                                {props.state !== null ? props.state.componentName : null} <span style={{ fontSize: '15px' }}> {contextData.filtername !== "" ? "( " + contextData.filtername + " )" : null}</span>
                        
                    
                        <div className='d-flex MinimumstockIcons'  >
                            <div className='dropbtngraph'>
                                <i className="fa-solid fa-arrow-down-short-wide sorticon minimumstocktosaleschartoption" onClick={handleSorting} />
                            </div>
                            <div className='dropbtngraph'>
                                <i class="fa-solid fa-ellipsis-vertical " id='icon_drop' onClick={handleonchangeCurrency} />
                            </div>
                        </div>
                        </h5>
                        </div>
                   

                        <div id={"sortingmenu1" + props.id} className="dropdown-contenticon-second-screen" onClick={handleclickSort}>
                            {flagSort === 'AvgStockCycle' ? <><a id='AvgStockCycle'>Sort by MinimumStockCycle ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='AvgStockCycle'>Sort by MinimumStockCycle ASC&nbsp;</a><hr className='custom-hr' /></>}
                            {flagSort === 'AvgStockCycle Desc' ? <><a id='AvgStockCycle Desc'>Sort by MinimumStockCycle DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='AvgStockCycle Desc'>Sort by MinimumStockCycle DESC&nbsp;</a><hr className='custom-hr' /></>}
                            {inputdata.Unit === 'P' ?
                                <>
                                    {flagSort === 'AvgMinStockRequiredPcs' ? <><a id='AvgMinStockRequiredPcs'>Sort by MinimumStockPcs ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='AvgMinStockRequiredPcs'>Sort by MinimumStockPcs ASC&nbsp;</a><hr className='custom-hr' /> </>}
                                    {flagSort === 'AvgMinStockRequiredPcs desc' ? <><a id='AvgMinStockRequiredPcs desc'>Sort by MinimumStockPcs DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='AvgMinStockRequiredPcs desc'>Sort by MinimumStockPcs DESC&nbsp;</a><hr className='custom-hr' /> </>}
                                </> :
                                <>
                                    {flagSort === 'AvgMinStockRequired' ? <><a id='AvgMinStockRequired'>Sort by MinimumStock ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='AvgMinStockRequired'>Sort by MinimumStock ASC&nbsp;</a><hr className='custom-hr' /> </>}
                                    {flagSort === 'AvgMinStockRequired desc' ? <><a id='AvgMinStockRequired desc'>Sort by MinimumStock DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='AvgMinStockRequired desc'>Sort by MinimumStock DESC&nbsp;</a><hr className='custom-hr' /> </>}
                                </>
                            }
                        </div>
                        <div className='btnicons1'>
                            <div id={"myDropdownicon1" + props.id} className="dropdown-contenticon-second-screen" onClick={handleclick}>
                                {flag === 'bar' ? <><a id='bar'>Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' >Bar</a><hr className='custom-hr' /></>}
                                {flag === 'HorizontalBar' ? <><a id='HorizontalBar'>HorizontalBar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='HorizontalBar' >HorizontalBar</a><hr className='custom-hr' /></>}
                                {/* {flag === 'Line' ? <><a id='Line'>Line&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Line' >Line</a><hr className='custom-hr' /></>} */}
                                {flag === 'MultiBar' ? <><a id='MultiBar'>MultiBar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='MultiBar' >MultiBar</a><hr className='custom-hr' /></>}
                            </div>
                        </div>
                 
                
                {dataloader !== true ?
                    loader !== true ?
                        <div class="flip-card">
                            <div class="flip-card-inner" id='filp'>
                                <div class="flip-card-back">
                                    <div className="detailstocktosales" onClick={DivOnClick} style={props.state.dropdown === '1' ? { height: '395px' } : { height: '350px' }} >

                                        {console.log(props.state, "ssss")}
                                        {flag === 'bar' && optionBar.height !== undefined ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionBar))} state={contextData.detailTirdstate} /> : null}
                                        {flag === 'HorizontalBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionHorizontalBar))} state={contextData.detailTirdstate} /> : null}
                                        {/* {flag === 'Line' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionLineBar))} state={contextData.detailTirdstate} /> : null} */}
                                        {flag === 'MultiBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionMultiBar))} state={contextData.detailTirdstate} /> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div class="flip-card">
                            <div class="flip-card-inner" id='filp'>
                                <div class="flip-card-back">
                                    <div class="" style={props.state.dropdown === '1' ? { height: '395px', color: 'black' } : { height: '350px', color: 'black' }}>

                                        Not Found
                                    </div>
                                </div>
                            </div>
                        </div> :
                    <div class="flip-card">
                        <div class="flip-card-inner" id='filp'>
                            <div class="flip-card-back">
                                <div class="" style={props.state.dropdown === '1' ? { height: '395px' } : { height: '350px' }}>
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
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}
