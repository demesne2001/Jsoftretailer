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
        inputdata = {...inputdata, 'FromDate' : props.state.FromDate, 'ToDate' : props.state.ToDate}
        console.log(inputdata,"thirdsubitem");
        if (inputdata.SubItemID !== "") {
            post(inputdata, API.GetMinStockChartDeatil, {}, "post").then((res) => {
                if (res.data !== undefined) {
                    console.log(res,"output third");
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
    if (document.getElementsByClassName('graphdetailcards graphdetail-secondcard')[0] !== undefined) {

        option = {
            height: 250,
            width: document.getElementsByClassName('graphdetailcards graphdetail-secondcard')[0].clientWidth - 10,
            charttype: 'antv-singlebar-multivalue',
            series: dataformate(),
            widthlst: [40, 60],
            color:['#4a61a7','#f3898c',"#1c7ee6"]
        }
    }



    return (
        <div>
            <div class="title-top-graphdetail-withoutcolor">
                <h5>{props.state.componentName} <span style={{fontSize:'15px'}}> {contextData.filternamesubitemrange !== ""? "( " + contextData.filternamesubitemrange + " )": null}</span></h5>
                {/* <i className="fa-solid fa-arrow-down-short-wide sort-icon-second-screen" ></i> */}
            </div>
            <div class="graphdetailcards graphdetail-secondcard">
                <div class="topimg-gd" style={{ height: '290px' }}>
                    {console.log(option, "qwe")}
                    {
                        dataloader !== true ?
                            loader !== true ?
                                option.series !== undefined ? option.series.length > 0 ?
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
