import React, { useContext, useEffect, useState } from 'react';
import StockToSalesChartObject from '../Stock_To_Sales_Components/StockToSalesChartObject';
import contex from '../../contex/Contex';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import 'react-date-range/dist/theme/default.css'; 
import 'react-date-range/dist/styles.css'; 
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs';
import DataError from '../../Assets/image/Error.gif'

export default function StockToSalesMainChart(props) {
    const contextData = useContext(contex);
    let inputdata = contextData.detailstate;
    const [xAxis, setxAxis] = useState([]);
    const [id, setid] = useState([]);
    const [yAxis, setyAxis] = useState([]);
    const [loader, setLoader] = useState(true);
    const [dataloader, setdataLoader] = useState(true);
    const [flag, setflag] = useState('bar');
    const [flagSort, setflagSort] = useState('AvgStockCycleNtWt Desc');
    const [countforflag, setcountforflag] = useState(0)
    const [datashow, setDatashow] = useState(11);

    let optionMultiBar = {}
    let optionBar = {}
    let optionHorizontalBar = {}
    let optionLineBar = {}
    let updatecontext = {}
    let percentage;
    let percentageVertical;


    useEffect(() => {

        if (props.state.filterdata !== null) {
            contextData.SetDetailState(props.state.filterdata)
        }
    }, [])
    useEffect(() => {
        if (props.state.ChartMode !== null) {
            getChartData()
        }

    }, [props])
    useEffect(() => {
        if (props.state.ChartMode !== null) {
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



    function handleMonthOptionClick(label) {
        contextData.SetDetailState({ ...contextData.detailstate, ['MonthType']: label })
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
    if (document.getElementsByClassName('detailstocktosales')[0] !== undefined && xAxis.length > 0 && yAxis.length > 0) {

        let tempYAxis = yAxis;
        let templegend = [];
        let sliderbol
        if (xAxis.length < 8) {
            sliderbol = false
        } else {
            sliderbol = true
        }
        if (inputdata.Unit !== 'P' || inputdata.Unit === '') {
            if (tempYAxis.length > 3) {
                tempYAxis.splice(2, 1);
            }

            templegend = ['AvgStock', 'Sales-NetWeight', 'AvgStockCycleNtWt']
        } else {
            if (tempYAxis.length > 3) {
                tempYAxis.splice(1, 1);
            }

            templegend = ['AvgStock', 'Sales-Pieces', 'AvgStockCycleNtWt']
        }
        if (props.state.ChartMode === 1) {
            optionMultiBar = {
                themeId: 11,
                chartId: 'inside-Baryudsd' + props.state.ChartMode,
                charttype: 'inside-Bar',
                height: '670%',
                width: '100%',
                legend: templegend,
                color: StockToSalesChartObject[props.state.ChartMode].color,
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
                tooltipid: 0,
                divname: 'detailstocktosales',
                sliderflag: sliderbol,
                datazoomlst: [0, percentageVertical, 0, 100],
            }

        } else {
            optionMultiBar = {
                themeId: 11,
                chartId: 'inside-Baryuiaw' + props.ChartMode,
                charttype: 'inside-Bar',
                height: '700%',
                width: '100%',
                legend: templegend,
                color: StockToSalesChartObject[props.state.ChartMode].color,
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
                tooltipid: 0,
                divname: 'detailstocktosales',
                sliderflag: sliderbol,
                datazoomlst: [0, percentageVertical, 0, 100],
            }

        }
        optionHorizontalBar = {
            themeId: localStorage.getItem("ThemeIndex"),
            charttype: 'round-horizontal-bar',
            height: '100%',
            width: '100%',
            chartId: 'MinimumStocks2' + props.state.ChartMode,
            Xaxis: xAxis,
            color: ['#0073b0', '#caf77d', '#8bd9e8', '#c4e8f0'],
            Yaxis: tempYAxis[2],
            idkey: props.state.filterkey,
            idlst: id,
            divname: 'detailstocktosales',
            sliderflag: sliderbol,
            datazoomlst: [0, 100, 0, 50],
            tooltip:{
                formatter:'{b}<br>AvgStockCycleNtWt - {c}'
            }
        }
        optionBar = {
            themeId: localStorage.getItem("ThemeIndex"),
            charttype: 'roundbar',
            height: document.getElementsByClassName('detailstocktosales')[0].clientHeight - 30,
            width: document.getElementsByClassName('detailstocktosales')[0].clientWidth - 30,
            chartId: 'MinimumStockwiseBar2' + props.state.ChartMode,
            Xaxis: xAxis,
            Yaxis: tempYAxis[2],
            idkey: props.state.filterkey,
            idlst: id,
            divname: 'detailstocktosales',
            sliderflag: sliderbol,
            datazoomlst: [0, percentageVertical, 0, 100],
            tooltip:{
                formatter:'{b}<br>AvgStockCycleNtWt - {c}'
            }
        }
        optionLineBar = {
            themeId: 11,
            height: '600%',
            width: '100%',
            chartId: 'Minimumsrtocksline2' + props.state.ChartMode,
            charttype: 'cartesian-point',
            Xaxis: xAxis,
            Yaxis: tempYAxis[2],
            idkey: props.state.filterkey,
            idlst: id,
        }
      

    }
    if (flag === 'MultiBar') {
        updatecontext = (<AlphaDashChart obj={JSON.parse(JSON.stringify(optionMultiBar))} state={contextData.detailsecondstate} />).props.state;
    } else if (flag === 'Line') {
        updatecontext = (<AlphaDashChart obj={JSON.parse(JSON.stringify(optionLineBar))} state={contextData.detailsecondstate} />).props.state;
    } else if (flag === 'HorizontalBar') {
        updatecontext = (<AlphaDashChart obj={JSON.parse(JSON.stringify(optionHorizontalBar))} state={contextData.detailsecondstate} />).props.state;
    } else if (flag === 'bar') {
        updatecontext = (<AlphaDashChart obj={JSON.parse(JSON.stringify(optionBar))} state={contextData.detailsecondstate} />).props.state;
    }
    function DivOnClick() {
        if (updatecontext.filtername !== undefined && updatecontext.filtervalue !== undefined) {
            contextData.setfiltervalue(updatecontext.filtervalue)
            contextData.setfiltername(updatecontext.filtername)
        }
        contextData.SetDetailsecondState({ ...contextData.detailsecondstate, [props.state.filterkey]: updatecontext[props.state.filterkey] })
    }
    function handleclick(e) {
        if (e.target.id !== "myDropdownicon" + props.id && e.target.id !== '') {
            setflag(e.target.id)
        }
    }

    function handleonchangeCurrency() {
        document.getElementById("myDropdownicon" + props.id).style.display === "block" ? document.getElementById("myDropdownicon" + props.id).style.display = "none" : document.getElementById("myDropdownicon" + props.id).style.display = "block";
        const tag_array = document.getElementsByClassName('dropdown-contenticon-second-screen')

        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {

                if (document.getElementsByClassName('dropdown-contenticon-second-screen')[i]['id'] !== "myDropdownicon" + props.id) {
                    document.getElementsByClassName('dropdown-contenticon-second-screen')[i].style.display = 'none';
                }
            }
        }
    }

    function handleSorting() {
        document.getElementById("sortingmenu" + props.id).style.display === "block" ? document.getElementById("sortingmenu" + props.id).style.display = "none" : document.getElementById("sortingmenu" + props.id).style.display = "block";
        const tag_array = document.getElementsByClassName('dropdown-contenticon-second-screen')

        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {
                if (document.getElementsByClassName('dropdown-contenticon-second-screen')[i]['id'] !== "sortingmenu" + props.id) {
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
        if (event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon minimumstocktosaleschartoption' && event.target.id !== 'icon_drop') {
            if (document.getElementById("myDropdownicon" + props.id) !== null) {
                document.getElementById("myDropdownicon" + props.id).style.display = "none"
                document.getElementById("sortingmenu" + props.id).style.display = "none"
            }
        }
    });

    return (
        <div class="col-xl-6 col-lg-6 col-md-12 col-12">

            <div className='graph-card'>
                <div class="title-top-graphdetail" >


                        <h5>
                        {props.state !== null ? props.state.componentName : null}
                        <div className='d-flex MinimumstockIcons'>
                                <div className='dropbtngraph'>
                                    <i className="fa-solid fa-arrow-down-short-wide sorticon minimumstocktosaleschartoption" onClick={handleSorting} />
                                </div>
                                <div className='dropbtngraph'>
                                    <i class="fa-solid fa-ellipsis-vertical" id='icon_drop' onClick={handleonchangeCurrency} />
                                </div>
                            </div>
                        </h5>

        
                        </div>


                    <div id={"sortingmenu" + props.id} className="dropdown-contenticon-second-screen" onClick={handleclickSort}>
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
                        <div id={"myDropdownicon" + props.id} className="dropdown-contenticon-second-screen" onClick={handleclick}>
                            {flag === 'bar' ? <><a id='bar'>Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' >Bar</a><hr className='custom-hr' /></>}
                            {flag === 'HorizontalBar' ? <><a id='HorizontalBar'>HorizontalBar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='HorizontalBar' >HorizontalBar</a><hr className='custom-hr' /></>}
                             {flag === 'MultiBar' ? <><a id='MultiBar'>MultiBar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='MultiBar' >MultiBar</a><hr className='custom-hr' /></>}
                        </div>
                    </div>




                {dataloader !== true ?
                    loader !== true ?
                        <div class="flip-card">
                            <div class="flip-card-inner" id='filp'>
                                <div class="flip-card-back">
                                    <div className="detailstocktosales" onClick={DivOnClick} style={{ height: '683px' }} >
                                        {props.state.ChartMode === '1' ?
                                            <div className='ChartMonthOption'>
                                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("M") }}>Month Wise</button>
                                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("Q") }}>Quater Wise</button>
                                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("HY") }}>Half Year Wise</button>
                                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("Y") }}>Year Wise</button>
                                            </div>
                                            : null}
                                      
                                        {optionBar.Xaxis !== undefined ? optionBar.Xaxis.length > 0 ?
                                            <>
                                                {flag === 'bar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionBar))} state={contextData.detailsecondstate} /> : null}
                                                {flag === 'HorizontalBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionHorizontalBar))} state={contextData.detailsecondstate} /> : null}
                                                 {flag === 'MultiBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionMultiBar))} state={contextData.detailsecondstate} /> : null}
                                            </>
                                            : null : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div class="flip-card">
                            <div class="flip-card-inner" id='filp'>
                                <div class="flip-card-back">
                                    <div class="" style={{ height: '683px', color: 'black' }}>
                                        {props.state.ChartMode === '1' ?
                                            <div className='ChartMonthOption'>
                                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("M") }}>Month Wise</button>
                                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("Q") }}>Quater Wise</button>
                                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("HY") }}>Half Year Wise</button>
                                                <button className='chartoptionButton' onClick={() => { handleMonthOptionClick("Y") }}>Year Wise</button>
                                            </div>
                                            : null}
                                      <img id='errorImg'  src={DataError} />
                                    </div>
                                </div>
                            </div>
                        </div> :
                    <div class="flip-card">
                        <div class="flip-card-inner" id='filp'>
                            <div class="flip-card-back">
                                <div class="" style={{ height: '683px' }}>
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
