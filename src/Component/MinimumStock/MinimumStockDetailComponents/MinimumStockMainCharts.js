import React, { useContext, useEffect, useState } from 'react';
import MinimumStockChartObject from '../MinimumStocksComponents/MinimumStockChartObject';
import contex from '../../contex/Contex';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import makeAnimated from "react-select/animated";
import StockToSalesOption from '../../ChartOptions/StockToSales/StockToSalesOption';
import ReactApexChart from 'react-apexcharts';
import Select from "react-select";

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
    let updatedstate = {}
    let option = {};


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

    function getChartData() {
        console.log(props);
        inputdata = { ...inputdata, 'Mode': props.state.ChartMode, 'FromDate' : props.state.FromDate, 'ToDate' : props.state.ToDate }
        console.log(inputdata,"apisss");
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
        inputdata = { ...inputdata, 'Mode': 3, 'FromDate' : props.state.FromDate, 'ToDate' : props.state.ToDate }
        post(inputdata, API.GetMinStockChart, {}, "post").then((res) => {
            if (res.data !== undefined) {
                let tempjs = {}
                let templist = [{label:"None", value:""}]

                for (let i = 0; i < res.data.lstResult.length; i++) {
                    tempjs = {}
                    tempjs['label'] = res.data.lstResult[i][MinimumStockChartObject['3']['xAxis']];
                    tempjs['value'] = res.data.lstResult[i][MinimumStockChartObject['3']['id']];
                    templist.push(tempjs);
                }
                console.log(templist,"qw");
                setProductData(templist);
            } else {
                alert(res.Error)
            }
        })
    }

    function handleproductChange(e) {
        contextData.SetDetailState({ ...contextData.detailstate, ['StrProductID']: e.value.toString() })
    }


    return (
        <div class="col-xl-6 col-lg-6 col-md-12 col-12 minimumstockmain">
            <div>
                <div class="title-top-graphdetail">
                    <h5>
                        {props.state !== null ? props.state.componentName : null}
                    </h5>
                  {
                    props.state.showdropdown === "1"?
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
                                borderRadius: '10px'
                            }),
                        }}
                    />:null
                  }
                    
                </div>
                {dataloader !== true ?
                    loader !== true ?
                        <div class="flip-card">
                            <div class="flip-card-inner" id='filp'>
                                <div class="flip-card-back">
                                    <div className="detailstocktosales" style={{ height: '350px' }} >

                                        {console.log(StockToSalesOption(xAxis, yAxis, id, contextData)[1], "ssss")}
                                        <ReactApexChart options={StockToSalesOption(xAxis, yAxis, id, contextData, props.state.filterkey, 1)[0]} series={StockToSalesOption(xAxis, yAxis, id, contextData, props.state.filterkey, 1)[1]} type='line' height={350} />
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
        </div>
    )
}
