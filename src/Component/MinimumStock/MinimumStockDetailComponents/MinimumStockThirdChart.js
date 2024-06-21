import React, { useContext, useEffect, useState } from 'react';
import MinimumStockChartObject from '../MinimumStocksComponents/MinimumStockChartObject';
import contex from '../../contex/Contex';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'


export default function MinimumStockThirdChart(props) {
    const contextData = useContext(contex);
    let inputdata = contextData.detailTirdstate;
    const [xAxis, setxAxis] = useState([]);
    const [id, setid] = useState([]);
    const [yAxis, setyAxis] = useState([]);
    const [loader, setLoader] = useState(true);
    const [dataloader, setdataLoader] = useState(true);
    let option = {};
    const [flag, setflag] = useState('bar');
    const [flagSort, setflagSort] = useState('AvgStockCycle Desc');
    const [countforflag, setcountforflag] = useState(0)
    let optionMultiBar = {}
    let optionBar = {}
    let optionHorizontalBar = {}
    let optionLineBar = {}

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
        console.log("api calleddd11", contextData.detailTirdstate);
    }, [inputdata])
    useEffect(() => {
        if (flagSort !== "" && countforflag !== 0) {
            getSortChartData()
        }
    }, [flagSort])


    function getChartData() {
        console.log(props);
        inputdata = { ...inputdata, 'FromDate': props.state.FromDate, 'ToDate': props.state.ToDate }
        console.log(inputdata, "thirdsubitem");
        if (inputdata.SubItemID !== "") {
            post(inputdata, API.GetMinStockChartDeatil, {}, "post").then((res) => {
                if (res.data !== undefined) {
                    console.log(res, "output third");
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
        } else {
            setdataLoader(true)
            setdataLoader(false)
        }
    }

    function dataformate() {
        let tempjs = {};
        let templs = [];
        for (let index = 0; index < xAxis.length; index++) {
            tempjs = {};
            tempjs[MinimumStockChartObject[props.state.ChartMode]['xAxis']] = xAxis[index];
            tempjs['AvgStockPcs'] = yAxis[0][index];
            tempjs['AvgMinStockRequired'] = yAxis[1][index];
            tempjs['AvgStockCycle'] = yAxis[2][index];
            templs.push(tempjs);
        }
        return templs;
    }
    function findMinMax() {
        let ansmin = [];
        let ansmax = [];
        for (let i = 0; i < yAxis.length - 1; i++) {

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

        optionMultiBar = {
            themeId: 11,
            chartId: 'inside-Barydsfuwsesddsd' + props.state.ChartMode,
            charttype: 'inside-Bar',
            height: '340%',
            width: '100%',
            legend: ['AvgStockPcs', 'AvgMinStockRequired', 'AvgStockCycle'],
            color: MinimumStockChartObject[props.state.ChartMode].color,
            widthlst: [document.getElementsByClassName('graphdetailcards graphdetail-secondcard')[0].clientWidth / 20, document.getElementsByClassName('graphdetailcards graphdetail-secondcard')[0].clientWidth / 35],
            Xaxis: xAxis,
            Yaxis: tempYAxis,
            bargap: '-80%',
            alignment: 'v',
            maxval: findMinMax()[0],
            minval: findMinMax()[1],
            barnum: 2,
            divname: 'graphdetailcards graphdetail-secondcard',
            tooltipid: 2,
            sliderflag: sliderbol,
            datazoomlst: [0, 50, 0, 100],

        }
        optionHorizontalBar = {
            themeId: localStorage.getItem("ThemeIndex"),
            charttype: 'round-horizontal-bar',
            height: document.getElementsByClassName('graphdetailcards graphdetail-secondcard')[0].clientHeight,
            width: '100%',
            chartId: 'MinimumStocks3' + props.id,
            Xaxis: xAxis,
            color: ['#0073b0', '#caf77d', '#8bd9e8', '#c4e8f0'],
            Yaxis: tempYAxis[2],
            divname: 'graphdetailcards graphdetail-secondcard',
            sliderflag: sliderbol,
            datazoomlst: [0, 50, 0, 100],
            tooltip:{
                formatter:'{b}<br> AvgStockCycle - {c}%'
            }
        }
        optionBar = {
            themeId: localStorage.getItem("ThemeIndex"),
            charttype: 'roundbar',
            height: document.getElementsByClassName('graphdetailcards graphdetail-secondcard')[0].clientHeight - 30,
            width: document.getElementsByClassName('graphdetailcards graphdetail-secondcard')[0].clientWidth - 30,
            chartId: 'MinimumStockwiseBar3' + props.id,
            Xaxis: xAxis,
            Yaxis: tempYAxis[2],
            sliderflag: sliderbol,
            datazoomlst: [0, 50, 0, 100],
            divname: 'graphdetailcards graphdetail-secondcard',
            tooltip:{
                formatter:function(params) {
                    return 
                }
            }
        }
        optionLineBar = {
            themeId: 11,
            height: '350%',
            width: '100%',
            chartId: 'Minimumsrtocksline3' + props.id,
            charttype: 'cartesian-point',
            Xaxis: xAxis,
            Yaxis: tempYAxis[2],
        }
    }

    function getSortChartData() {
        console.log(props);
        inputdata = { ...inputdata, 'FromDate': props.state.FromDate, 'ToDate': props.state.ToDate, "Sort": flagSort }
        console.log(inputdata, "sfdsdf");
        if (inputdata.SubItemID !== "") {
            post(inputdata, API.GetMinStockChartDeatil, {}, "post").then((res) => {
                if (res.data !== undefined) {
                    console.log(res, "output third");
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
        } else {
            setdataLoader(true)
            setdataLoader(false)
        }
    } function handleclick(e) {
        if (e.target.id !== "myDropdownicon2" + props.id && e.target.id !== '') {
            setflag(e.target.id)
        }
    }

    function handleonchangeCurrency() {
        document.getElementById("myDropdownicon2" + props.id).style.display === "block" ? document.getElementById("myDropdownicon2" + props.id).style.display = "none" : document.getElementById("myDropdownicon2" + props.id).style.display = "block";
        const tag_array = document.getElementsByClassName('dropdown-contenticon-second-screen')

        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {

                if (document.getElementsByClassName('dropdown-contenticon-second-screen')[i]['id'] !== "myDropdownicon2" + props.id) {
                    document.getElementsByClassName('dropdown-contenticon-second-screen')[i].style.display = 'none';
                }
            }
        }
    }

    function handleSorting() {
        document.getElementById("sortingmenu2" + props.id).style.display === "block" ? document.getElementById("sortingmenu2" + props.id).style.display = "none" : document.getElementById("sortingmenu2" + props.id).style.display = "block";
        const tag_array = document.getElementsByClassName('dropdown-contenticon-second-screen')

        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {
                if (document.getElementsByClassName('dropdown-contenticon-second-screen')[i]['id'] !== "sortingmenu2" + props.id) {
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

    document.getElementById("root").addEventListener("click", function (event) {
        if (event.target.className !== 'fa-solid fa-arrow-down-short-wide' && event.target.id !== 'icon_drop') {
            if (document.getElementById("myDropdownicon2" + props.id) !== null) {
                document.getElementById("myDropdownicon2" + props.id).style.display = "none"
                document.getElementById("sortingmenu2" + props.id).style.display = "none"
            }
        }
    });


    return (
        <div>
            <div class="title-top-graphdetail-withoutcolor">
                <h5>{props.state.componentName} <span style={{ fontSize: '15px' }}> {contextData.filternamesubitemrange !== "" ? "( " + contextData.filternamesubitemrange + " )" : null}</span></h5>
                {/* <i className="fa-solid fa-arrow-down-short-wide sort-icon-second-screen" ></i> */}
                <div className='d-flex MinimumstockIcons'  >
                    <div className='dropbtngraph'>
                        <i className="fa-solid fa-arrow-down-short-wide" onClick={handleSorting} />
                    </div>
                    <div className='dropbtngraph'>
                        <i class="fa-solid fa-ellipsis-vertical " id='icon_drop' onClick={handleonchangeCurrency} />
                    </div>
                </div>
            </div>
            <div id={"sortingmenu2" + props.id} className="dropdown-contenticon-second-screen" onClick={handleclickSort}>
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
                <div id={"myDropdownicon2" + props.id} className="dropdown-contenticon-second-screen" onClick={handleclick}>
                    {flag === 'bar' ? <><a id='bar'>Bar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar' >Bar</a><hr className='custom-hr' /></>}
                    {flag === 'HorizontalBar' ? <><a id='HorizontalBar'>HorizontalBar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='HorizontalBar' >HorizontalBar</a><hr className='custom-hr' /></>}
                    {/* {flag === 'Line' ? <><a id='Line'>Line&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Line' >Line</a><hr className='custom-hr' /></>} */}
                    {flag === 'MultiBar' ? <><a id='MultiBar'>MultiBar&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='MultiBar' >MultiBar</a><hr className='custom-hr' /></>}
                </div>
            </div>



            <div class="graphdetailcards graphdetail-secondcard">
                <div class="topimg-gd" style={{ height: '290px' }}>
                    {console.log(option, "qwe")}
                    {
                        dataloader !== true ?
                            loader !== true ?
                                optionMultiBar.Xaxis !== undefined ? optionMultiBar.Xaxis.length > 0 ?
                                    <div>
                                        {flag === 'bar' && optionBar.height !== undefined ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionBar))} /> : null}
                                        {flag === 'HorizontalBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionHorizontalBar))} /> : null}
                                        {/* {flag === 'Line' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionLineBar))} /> : null} */}
                                        {flag === 'MultiBar' ? <AlphaDashChart obj={JSON.parse(JSON.stringify(optionMultiBar))} /> : null}
                                    </div>
                                    : null : null
                                : <div >

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
