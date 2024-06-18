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
        if (parseInt(Math.min(...ansmin).toFixed(0))  >= 0) {
            return [((parseInt((parseInt(Math.max(...ansmax).toFixed(0)) + 1)/Math.pow(10,lenthdigit))+1))*(Math.pow(10,lenthdigit)), 0]
        } else {
            return [((parseInt((parseInt(Math.max(...ansmax).toFixed(0)) + 1)/Math.pow(10,lenthdigit))+1))*(Math.pow(10,lenthdigit)), parseInt(Math.min(...ansmin).toFixed(0)) + 1]
        }
    }
    if (document.getElementsByClassName('graphdetailcards graphdetail-secondcard')[0] !== undefined) {
        let tempYAxis = yAxis;
        tempYAxis.splice(2, 1);
        option = {
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
            tooltipid: 2
        }
        console.log(option, "ashdgtuaystdgf");
    }



    return (
        <div>
            <div class="title-top-graphdetail-withoutcolor">
                <h5>{props.state.componentName} <span style={{ fontSize: '15px' }}> {contextData.filternamesubitemrange !== "" ? "( " + contextData.filternamesubitemrange + " )" : null}</span></h5>
                {/* <i className="fa-solid fa-arrow-down-short-wide sort-icon-second-screen" ></i> */}
            </div>
            <div class="graphdetailcards graphdetail-secondcard">
                <div class="topimg-gd" style={{ height: '290px' }}>
                    {console.log(option, "qwe")}
                    {
                        dataloader !== true ?
                            loader !== true ?
                                option.Xaxis !== undefined ? option.Xaxis.length > 0 ?
                                    <div>
                                        <AlphaDashChart obj={JSON.parse(JSON.stringify(option))} />
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
