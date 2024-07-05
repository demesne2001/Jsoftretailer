import React, { useContext, useEffect, useState } from 'react';
import StockToSalesChartObject from './StockToSalesChartObject';
import { useNavigate } from 'react-router-dom';
import contex from '../../contex/Contex';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'
import DataError from '../../Assets/image/Error.gif'


export default function Experiment(props) {
    const navigate = useNavigate();
    const contextData = useContext(contex);
    const [data, setdata] = useState([]);
    let inputdata = contextData.state;
    const [xAxis, setxAxis] = useState([]);
    const [yAxis, setyAxis] = useState([]);
    const [loader, setLoader] = useState(true);
    const [dataloader, setdataLoader] = useState(true);
    const [page, setPage] = useState(0)
    let option = {}

    useEffect(() => {
        getChartData()
    }, [inputdata])
    useEffect(() => {
        fetchPaginatedData(data[0])
    }, [data])

    function handleDetailNaviogation() {
        navigate('/Stock_To_Sales_Detailed', { state: { componentName: StockToSalesChartObject[props.id].heading, ChartMode: props.id, filterkey: StockToSalesChartObject[props.id].filterkey }, replace: true });
    }

    function getChartData() {
        inputdata = { ...inputdata, 'Mode': props.id }

        post(inputdata, API.GetStockToSalesChart, {}, "post").then((res) => {
            if (res.data !== undefined) {
                let templength = res.data.lstResult.length
                let mainlist = [];
                let childlist = [];
                childlist.push(res.data.lstResult[0])
                for (let i = 1; i <= parseInt(templength / 5) + 1; i++) {
                    if (((i) * 5) <= res.data.lstResult.length) {
                        for (let index = (i - 1) * 5 + 1; index <= i * 5; index++) {
                            childlist.push(res.data.lstResult[index])
                        }
                    } else {
                        for (let index = (i - 1) * 5 + 1; index < templength; index++) {
                            childlist.push(res.data.lstResult[index])
                        }
                    }
                    mainlist.push(childlist)

                    childlist = [];
                }
                setdata(mainlist)
                setdataLoader(false)
                if (mainlist.length !== 0) {
                    setLoader(false)
                } else {
                    setLoader(true)
                }
            } else {
                alert(res.Error)
            }
        })
    }

    function fetchPaginatedData(data1) {
        if (data.length > 0) {

            var tempYaxis = [];
            for (let i = 0; i < StockToSalesChartObject[props.id]['yAxis'].length; i++) {
                var tempYaxis1 = [];
                for (let j = 0; j < data1.length; j++) {
                    tempYaxis1.push(data1[j][StockToSalesChartObject[props.id]['yAxis'][i]]);
                }
                tempYaxis.push(tempYaxis1);
            }
            setyAxis(tempYaxis);


            var tempXaxis = [];
            for (let j = 0; j < data1.length; j++) {
                tempXaxis.push(data1[j][StockToSalesChartObject[props.id]['xAxis']]);
            }
            setxAxis(tempXaxis);

        }
    }

    function dataformate() {
        let tempjs = {};
        let templs = [];

        for (let index = 0; index < xAxis.length; index++) {
            tempjs = {};
            tempjs['Team'] = xAxis[index];
            tempjs['AvgStock'] = yAxis[0][index];
            tempjs['Sales-NetWeight'] = yAxis[1][index];
            tempjs['AvgStockCycleNtWt'] = yAxis[2][index];
            templs.push(tempjs);
        }
        return templs;
    }

    function handleMonthOptionClick(label) {
        contextData.SetState({ ...contextData.state, ['MonthType']: label })
    }

    if (document.getElementsByClassName('crancy-progress-card card-contain-graph')[0] !== undefined) {
        option = {
            height: 350,
            width: document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth,
            charttype: 'antv-singlebar-multivalue',
            series: dataformate(),
        }

    }

    function handleRightClick() {
        if (data.length > page + 1) {
            setPage(page + 1);
            fetchPaginatedData(data[page + 1])
        }
    }

    function handleLeftClick() {
        if (0 < page) {
            setPage(page - 1);
            fetchPaginatedData(data[page - 1])
        }
    }


    return (
        <div class="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="graph-card">
                <div className='card-title-graph schedule-graph' onClick={handleDetailNaviogation}>
                    <div className="col-xs-8 col-sm-10 col-md-10 col-10" >
                        <p><i class={StockToSalesChartObject[props.id].iconclassName}></i>{StockToSalesChartObject[props.id].heading}</p>
                    </div>
                </div>

                {dataloader !== true ?
                    loader !== true ?
                        <div class="crancy-progress-card card-contain-graph">
                            {props.id === 1 ?
                                <div className='ChartMonthOption'>
                                    <button onClick={() => { handleMonthOptionClick("M") }}>Month Wise</button>
                                    <button onClick={() => { handleMonthOptionClick("Q") }}>Quater Wise</button>
                                    <button onClick={() => { handleMonthOptionClick("Y") }}>Year Wise</button>
                                </div>
                                : null}
                            <div style={props.id === 1 ? { height: '310px' } : { height: '350px' }}>
                                {option.series !== undefined ? option.series.length > 0 ? <AlphaDashChart obj={JSON.parse(JSON.stringify(option))} /> : null : null}
                                <div className='mainscreenchartdiv'>
                                    <button onClick={handleLeftClick} className='chartupdown left'><i class="fa-solid fa-left-long iconupdown"></i></button>

                                    <button onClick={handleRightClick} className='chartupdown right'><i class="fa-solid fa-right-long iconupdown"></i></button>
                                </div>
                            </div>
                        </div>
                        : <div class="crancy-progress-card card-contain-graph"> {props.id === 1 ?
                            <div className='ChartMonthOption'>
                                <button onClick={() => { handleMonthOptionClick("M") }}>Month Wise</button>
                                <button onClick={() => { handleMonthOptionClick("Q") }}>Quater Wise</button>
                                <button onClick={() => { handleMonthOptionClick("Y") }}>Year Wise</button>
                            </div>
                            : null}<img id='errorImg'  src={DataError} /></div> :
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
