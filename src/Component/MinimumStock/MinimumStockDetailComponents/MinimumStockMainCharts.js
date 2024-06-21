import React, { useContext, useEffect, useState } from 'react';
import MinimumStockChartObject from '../MinimumStocksComponents/MinimumStockChartObject';
import contex from '../../contex/Contex';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import makeAnimated from "react-select/animated";
import StockToSalesOption from '../../ChartOptions/StockToSales/StockToSalesOption';
import ReactApexChart from 'react-apexcharts';
import Select from "react-select";
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'

export default function MinimumStockMainCharts(props) {
    const animatedComponents = makeAnimated();
    const contextData = useContext(contex);
    let inputdata = contextData.detailstate;
    const [xAxis, setxAxis] = useState([]);
    const [id, setid] = useState([]);
    const [yAxis, setyAxis] = useState([]);
    const [loader, setLoader] = useState(true);
    const [dataloader, setdataLoader] = useState(true);
    const [productData, setProductData] = useState([]);
    const [flag, setflag] = useState('bar');
    const [flagSort, setflagSort] = useState('AvgStockCycle Desc');
    const [countforflag, setcountforflag] = useState(0)
    let updatedstate = {}
    let optionMultiBar = {}
    let optionBar = {}
    let optionHorizontalBar = {}
    let optionLineBar = {}

    useEffect(() => {
        console.log("awsdvbaygsdv", props.state.filterdata);
        if (props.state.filterdata !== null) {
            contextData.SetDetailState(props.state.filterdata)
        }
    }, [])

    useEffect(() => {
        if (props.state.ChartMode !== null) {
            getChartData()
            getProductData()
        }
        console.log("api calleddd", props.state.ChartMode);
    }, [props])

    useEffect(() => {
        if (props.state.ChartMode !== null) {
            getChartData()
        }
        console.log("api calleddd11 main", inputdata, props);
    }, [inputdata])

    useEffect(() => {
        if (flagSort !== "" && countforflag !== 0) {
            getSortChartData()
        }
    }, [flagSort])

    function getChartData() {
        console.log(props);
        inputdata = { ...inputdata, 'Mode': props.state.ChartMode }
        console.log(inputdata, "apisss");
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

    function getProductData() {
        inputdata = { ...inputdata, 'Mode': 3, 'FromDate': props.state.FromDate, 'ToDate': props.state.ToDate }
        post(inputdata, API.GetMinStockChart, {}, "post").then((res) => {
            if (res.data !== undefined) {
                let tempjs = {}
                let templist = [{ label: "None", value: "" }]

                for (let i = 0; i < res.data.lstResult.length; i++) {
                    tempjs = {}
                    tempjs['label'] = res.data.lstResult[i][MinimumStockChartObject['3']['xAxis']];
                    tempjs['value'] = res.data.lstResult[i][MinimumStockChartObject['3']['id']];
                    templist.push(tempjs);
                }
                console.log(templist, "qw");
                setProductData(templist);
            } else {
                alert(res.Error)
            }
        })
    }

    function handleproductChange(e) {
        contextData.SetDetailState({ ...contextData.detailstate, ['StrProductID']: e.value.toString() })
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

        let templegend = [];
        let sliderbol
        if (xAxis.length < 8) {
            sliderbol = false
        } else {
            sliderbol = true
        }

        if (inputdata.Unit !== 'P' || inputdata.Unit === '') {
            if (tempYAxis.length > 3) {
                tempYAxis.splice(1, 1);
            }
            console.log("asdgjhagsd", tempYAxis);
            templegend = ['Minimum Stock', 'Actual Stock', 'AvgStockCycleNtWt']
        } else {
            if (tempYAxis.length > 3) {
                tempYAxis.splice(0, 1);
            }
            console.log("asdgjhagsd", tempYAxis);
            templegend = ['Minimum Stock Pcs', 'Actual Stock', 'AvgStockCycleNtWt']
        }
        console.log(document.getElementsByClassName('detailstocktosales')[0].clientWidth, "zshdgysgdysgbd");
        optionMultiBar = {
            themeId: 11,
            chartId: 'inside-Baryuwsedsd' + props.state.ChartMode,
            charttype: 'inside-Bar',
            height: '350%',
            width: '100%',
            legend: templegend,
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
            datazoomlst: [0, 50, 0, 100],

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
            divname: 'detailstocktosales',
            idkey: props.state.filterkey,
            idlst: id,
            // prclst: ,
            sliderflag: sliderbol,
            datazoomlst: [0, 100, 0, 50],
        }
        optionBar = {
            themeId: localStorage.getItem("ThemeIndex"),
            charttype: 'roundbar',
            height: document.getElementsByClassName('detailstocktosales')[0].clientHeight,
            width: document.getElementsByClassName('detailstocktosales')[0].clientWidth,
            chartId: 'MinimumStockwiseBarq' + props.id,
            Xaxis: xAxis,
            Yaxis: tempYAxis[2],
            sliderflag: true,
            idkey: props.state.filterkey,
            idlst: id,
            divname: 'detailstocktosales',
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
            chartId: 'Minimumsrtocksline' + props.id,
            charttype: 'cartesian-point',
            Xaxis: xAxis,
            Yaxis: tempYAxis[2],
            idkey: props.state.filterkey,
            idlst: id,
            divname: 'detailstocktosales',
            sliderflag: sliderbol,
            datazoomlst: [0, 50, 0, 100],
        }
    }


    if (flag === 'MultiBar') {
        updatedstate = (<AlphaDashChart obj={JSON.parse(JSON.stringify(optionMultiBar))} state={contextData.detailsecondstate} />).props.state;
    } else if (flag === 'Line') {
        updatedstate = (<AlphaDashChart obj={JSON.parse(JSON.stringify(optionLineBar))} state={contextData.detailsecondstate} />).props.state;
    } else if (flag === 'HorizontalBar') {
        updatedstate = (<AlphaDashChart obj={JSON.parse(JSON.stringify(optionHorizontalBar))} state={contextData.detailsecondstate} />).props.state;
    } else if (flag === 'bar') {
        updatedstate = (<AlphaDashChart obj={JSON.parse(JSON.stringify(optionBar))} state={contextData.detailsecondstate} />).props.state;
    }
    function DivOnClick() {
        console.log(updatedstate, "asdhtutdf");
        contextData.SetDetailsecondState({ ...contextData.detailsecondstate, [props.state.filterkey]: updatedstate[props.state.filterkey] })
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
            if (document.getElementById("myDropdownicon" + props.id) !== null) {
                document.getElementById("myDropdownicon" + props.id).style.display = "none"
                document.getElementById("sortingmenu" + props.id).style.display = "none"
            }
        }
    });

    return (
        <div class="col-xl-6 col-lg-6 col-md-12 col-12 minimumstockmain">
            <div className='graph-card'>
                <div class="title-top-graphdetail">
                    <h5>  {props.state !== null ? props.state.componentName : null}
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
                <div id={"sortingmenu" + props.id} className="dropdown-contenticon-second-screen" onClick={handleclickSort}>
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
                <div className='btnicons'>
                    <div id={"myDropdownicon" + props.id} className="dropdown-contenticon-second-screen" onClick={handleclick}>
                        {flag === 'bar' ? <><a id='bar'>Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' >Bar</a><hr className='custom-hr' /></>}
                        {flag === 'HorizontalBar' ? <><a id='HorizontalBar'>HorizontalBar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='HorizontalBar' >HorizontalBar</a><hr className='custom-hr' /></>}
                        {/* {flag === 'Line' ? <><a id='Line'>Line&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Line' >Line</a><hr className='custom-hr' /></>} */}
                        {flag === 'MultiBar' ? <><a id='MultiBar'>MultiBar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='MultiBar' >MultiBar</a><hr className='custom-hr' /></>}
                    </div>
                </div>
                {
                    props.state.showdropdown === "1" ?
                        <Select
                            name="product"
                            className="basic-multi-select"
                            options={productData}
                            classNamePrefix="select"
                            placeholder="Select Product..."
                            components={animatedComponents}
                            closeMenuOnSelect={true}
                            onChange={handleproductChange}
                            styles={{
                                control: (provided, state) => ({
                                    ...provided,
                                    height: '45px',
                                    borderRadius: '10px',
                                    backgroundColor: '#e3e9ed'
                                }),
                            }}
                        /> : null
                }
                {dataloader !== true ?
                    loader !== true ?
                        <div class="flip-card">
                            <div class="flip-card-inner" id='filp'>
                                <div class="flip-card-back">
                                    <div className="detailstocktosales" onClick={DivOnClick} style={{ height: '350px' }} >

                                        {console.log(StockToSalesOption(xAxis, yAxis, id, contextData)[1], "ssss")}
                                        {flag === 'bar' && optionBar.height !== undefined ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionBar))} state={contextData.detailsecondstate} /> : null}
                                        {flag === 'HorizontalBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionHorizontalBar))} state={contextData.detailsecondstate} /> : null}
                                        {/* {flag === 'Line' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionLineBar))} state={contextData.detailsecondstate} /> : null} */}
                                        {flag === 'MultiBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionMultiBar))} state={contextData.detailsecondstate} /> : null}
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <div class="flip-card">
                            <div class="flip-card-inner" id='filp'>
                                <div class="flip-card-back">
                                    <div class="" style={{ height: '350px', color: 'black' }}>
                                        Not Found
                                    </div>
                                </div>
                            </div>
                        </div> :
                    <div class="flip-card">
                        <div class="flip-card-inner" id='filp'>
                            <div class="flip-card-back">
                                <div class="" style={{ height: '350px' }}>
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
        </div >
    )
}
