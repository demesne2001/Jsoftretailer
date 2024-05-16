import React, { useEffect, useState, useContext } from 'react'
import contex from '../../contex/Contex'
import post from '../../Utility/APIHandle';
import API from '../../Utility/API';
import ReactApexChart from 'react-apexcharts';
import CommanSheduleObject from './CommanSheduleObject';
import TargetAndAchievedSeriesOptions from '../../ChartOptions/SheduleAnalysis/TargetAndAchievedSeriesOptions';
import AvarageTimeSpentSeriesOption from '../../ChartOptions/SheduleAnalysis/AvarageTimeSpentSeriesOption';
import SheduleClientDetailsSeriesOptions from '../../ChartOptions/SheduleAnalysis/SheduleClientDetailsSeriesOptions';
import TotalNoOfBillsSeriesOptions from '../../ChartOptions/SheduleAnalysis/TotalNoOfBillsSeriesOptions';
import TargetAndArchievedSecondScreen from '../../ChartOptions/SheduleAnalysis/TargetAndArchievedSecondScreen';
import '../../Assets/css/Custom.css'
import { useNavigate } from 'react-router-dom';
import AvarageTimeSpentSecondScreen from '../../ChartOptions/SheduleAnalysis/AvarageTimeSpentSecondScreen';
import SheduleClientDetailsSecondScreen from '../../ChartOptions/SheduleAnalysis/SheduleClientDetailsSecondScreen';
import TotalNoOfBillsSecondScreen from '../../ChartOptions/SheduleAnalysis/TotalNoOfBillsSecondScreen';
import SecondSheduleScreenBar1 from '../../ChartOptions/SheduleAnalysisDetailed/SecondSheduleScreenBar1';
import SecondSheduleScreenBar2 from '../../ChartOptions/SheduleAnalysisDetailed/SecondSheduleScreenBar2';
import ExpenseComboChart from '../../ChartOptions/SheduleAnalysisDetailed/ExpenseComboChart';
import { Table } from 'react-bootstrap';

export default function CommanSheduleChart(props) {
    const contextData = useContext(contex);
    const navigate = useNavigate();
    let inputdata = contextData.state;
    let inputdataDetail = contextData.detailedstate;
    const [xAxis, setxAxis] = useState([]);
    const [yAxis, setyAxis] = useState([]);
    const [xAxisDetailed, setxAxisDetailed] = useState([]);
    const [yAxisDetailed, setyAxisDetailed] = useState([]);
    const [TravelingId, SetTravelingId] = useState([]);
    const [SheduleId, SetSheduleId] = useState([]);
    const chartOptions = {
        1: { Chartoption: TargetAndAchievedSeriesOptions, ChartType: 'bar' },
        2: { Chartoption: AvarageTimeSpentSeriesOption, ChartType: 'bar' },
        4: { Chartoption: SheduleClientDetailsSeriesOptions, ChartType: 'bar' },
        5: { Chartoption: AvarageTimeSpentSeriesOption, ChartType: 'bar' },
        6: { Chartoption: TotalNoOfBillsSeriesOptions, ChartType: 'treemap' },
    }
    const chartOptionsScreen2 = {
        1: { Chartoption: TargetAndArchievedSecondScreen, ChartType: 'bar' },
        2: { Chartoption: AvarageTimeSpentSecondScreen, ChartType: 'bar' },
        4: { Chartoption: SheduleClientDetailsSecondScreen, ChartType: 'bar' },
        5: { Chartoption: AvarageTimeSpentSecondScreen, ChartType: 'bar' },
        6: { Chartoption: TotalNoOfBillsSecondScreen, ChartType: 'treemap' },
        11: { Chartoption: TargetAndArchievedSecondScreen, ChartType: 'bar' },
        12: { Chartoption: SecondSheduleScreenBar2, ChartType: 'bar' },
        13: { Chartoption: ExpenseComboChart, ChartType: 'line' },
        14: { Chartoption: SheduleClientDetailsSecondScreen, ChartType: 'bar' },
        15: { Chartoption: SecondSheduleScreenBar1, ChartType: 'bar' },
        16: { Chartoption: SecondSheduleScreenBar1, ChartType: 'bar' },
    }


    useEffect(() => {
        console.log(CommanSheduleObject[props.id], "chartcomman");
        console.log('effectSjedule', inputdata);

        getChartData()
    }, [inputdata])

    useEffect(() => {
        console.log(CommanSheduleObject[props.id]);
        if (props.screen === 3) {
            getChartDetailData()
        }
    }, [inputdataDetail]);

    function getChartData() {
        inputdata = { ...inputdata, 'Mode': props.id }
        console.log(API.scheduleGetcommonChart);
        post(inputdata, API.scheduleGetcommonChart, {}, "post").then((res) => {
            console.log(res);
            if (res.data !== undefined) {
                var tempYaxis = [];
                for (let i = 0; i < CommanSheduleObject[props.id]['yAxis'].length; i++) {
                    var tempYaxis1 = [];
                    for (let j = 0; j < res.data.lstResult.length; j++) {
                        tempYaxis1.push(res.data.lstResult[j][CommanSheduleObject[props.id]['yAxis'][i]]);
                    }
                    tempYaxis.push(tempYaxis1);
                }
                setyAxis(tempYaxis);


                var tempXaxis = [];
                var tempTravelingId = [];
                for (let j = 0; j < res.data.lstResult.length; j++) {
                    tempXaxis.push(res.data.lstResult[j][CommanSheduleObject[props.id]['xAxis']]);
                    tempTravelingId.push(res.data.lstResult[j]['TravellingTeamID'])
                }
                setxAxis(tempXaxis);
                SetTravelingId(tempTravelingId);

            } else {
                alert("Network Error!!!")
            }
        })
    }

    function getChartDetailData() {
        inputdataDetail = { ...inputdataDetail, 'Mode': props.id - 10 }
        console.log(inputdataDetail, "dtailed");
        post(inputdataDetail, API.GetChartDetailWise, {}, "post").then((res) => {
            console.log(res, "detailed");
            if (res.data !== undefined) {
                var tempYaxis = [];
                for (let i = 0; i < CommanSheduleObject[props.id]['yAxis'].length; i++) {
                    var tempYaxis1 = [];
                    for (let j = 0; j < res.data.lstResult.length; j++) {
                        tempYaxis1.push(res.data.lstResult[j][CommanSheduleObject[props.id]['yAxis'][i]]);
                    }
                    tempYaxis.push(tempYaxis1);
                }
                setyAxisDetailed(tempYaxis);


                var tempXaxis = [];
                var tempSheduleId = [];
                for (let j = 0; j < res.data.lstResult.length; j++) {
                    tempXaxis.push(res.data.lstResult[j][CommanSheduleObject[props.id]['xAxis']]);
                    tempSheduleId.push(res.data.lstResult[j]["ScheduleID"]);
                }
                setxAxisDetailed(tempXaxis);
                SetSheduleId(tempSheduleId)

            } else {
                alert("Network Error!!!")
            }
        })
    }

    function handleNavigate() {
        if (props.screen === 1) {
            navigate('/schedual_analysis_detail', { state: props.id, replace: true })
        }
    }
    
    function handleOnClickRow(id) {
        if (id !== undefined) {
            contextData.setbillState({ ...contextData.billstate, ['ScheduleID']: id.toString() })
        }
    }

    return (
        <div class="col-xl-12 col-lg-12 col-md-12 col-12">
            {console.log(chartOptionsScreen2[props.id], props.screen)}
            <div className="graph-card">
                <div className='card-title-graph schedule-graph'>
                    <div className="col-xs-8 col-sm-10 col-md-10 col-10" onClick={handleNavigate}>
                        <p><i class={CommanSheduleObject[props.id]['iconclassName']}></i>{CommanSheduleObject[props.id]['heading']}</p>
                    </div>
                    {/* <div className="col-xs-1 col-sm-1 col-md-1 col-1" >
                        <div className='d-flex schedule-card-icon'>
                            <div className='dropbtngraph'>
                                {props.screen !== 2 ? <i className="fa-solid fa-arrow-down-short-wide sorticon" /> : null}
                            </div>
                            <div className='dropbtngraph'>
                                <i class="fa-solid fa-ellipsis-vertical" id='icon_drop' />
                            </div>
                        </div>
                    </div> */}
                </div>
                {props.screen === 1 ? <div class="crancy-progress-card card-contain-graph"><ReactApexChart options={chartOptions[props.id]['Chartoption'](xAxis, yAxis, props.id)[0]} series={chartOptions[props.id]['Chartoption'](xAxis, yAxis, props.id)[1]} type={chartOptions[props.id]['ChartType']} height={350} /></div> :
                    props.screen !== 3 ?
                        <div class="crancy-progress-card card-contain-graph shedule-secondscreen"> <ReactApexChart options={chartOptionsScreen2[props.id]['Chartoption'](xAxis, yAxis, contextData, TravelingId, props.id)[0]} series={chartOptionsScreen2[props.id]['Chartoption'](xAxis, yAxis, contextData, TravelingId, props.id)[1]} type={chartOptionsScreen2[props.id]['ChartType']} height={400} /> </div> :
                        window.innerWidth < 1870 && props.id === 13 && props.screen === 3 ? <div class="crancy-progress-card card-contain-graph shedule-thirdscreen">
                            <Table responsive striped bordered hover>
                                <thead>
                                    <th>Trips</th>
                                    <th>Sales(wt)</th>
                                    <th>Per kg. Expense</th>
                                    <th>Per Trip Expense</th>
                                </thead>
                                <tbody>
                                    {
                                        xAxisDetailed.map((e, i) => {
                                            return <tr onClick={() => handleOnClickRow(SheduleId[i])}>
                                                <td>{e}</td>
                                                <td>{yAxisDetailed[1][i]}</td>
                                                <td>{yAxisDetailed[2][i]}</td>
                                                <td>{yAxisDetailed[3][i]}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div> : <div class="crancy-progress-card card-contain-graph shedule-thirdscreen"> <ReactApexChart options={chartOptionsScreen2[props.id]['Chartoption'](xAxisDetailed, yAxisDetailed, contextData, SheduleId, props.id)[0]} series={chartOptionsScreen2[props.id]['Chartoption'](xAxisDetailed, yAxisDetailed, contextData, SheduleId, props.id)[1]} type={chartOptionsScreen2[props.id]['ChartType']} height={650} /> </div>}
            </div>

        </div>
    )
    // }

}
