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
import { useNavigate, useSearchParams } from 'react-router-dom';
import AvarageTimeSpentSecondScreen from '../../ChartOptions/SheduleAnalysis/AvarageTimeSpentSecondScreen';
import SheduleClientDetailsSecondScreen from '../../ChartOptions/SheduleAnalysis/SheduleClientDetailsSecondScreen';
import TotalNoOfBillsSecondScreen from '../../ChartOptions/SheduleAnalysis/TotalNoOfBillsSecondScreen';
import SecondSheduleScreenBar1 from '../../ChartOptions/SheduleAnalysisDetailed/SecondSheduleScreenBar1';
import SecondSheduleScreenBar2 from '../../ChartOptions/SheduleAnalysisDetailed/SecondSheduleScreenBar2';
import ExpenseComboChart from '../../ChartOptions/SheduleAnalysisDetailed/ExpenseComboChart';
import SheduleClientDetailThirdScreen from '../../ChartOptions/SheduleAnalysisDetailed/SheduleClientDetailThirdScreen';
import { Table } from 'react-bootstrap';
import TargetAndAchievedDetailScreenChart from '../../ChartOptions/SheduleAnalysisDetailed/TargetAndAchievedDetailScreenChart';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'
export default function CommanSheduleChart(props) {

    //useState and variables
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
    const [flagSort, setflagSort] = useState(CommanSheduleObject[props.id]['sortingcolumn'] + " desc");
    const [countforflag, setcountforflag] = useState(0)
    let updatecontext = {}
    const chartOptions = {
        1: { Chartoption: TargetAndAchievedSeriesOptions, ChartType: 'line' },
        2: { Chartoption: AvarageTimeSpentSeriesOption, ChartType: 'bar' },
        4: { Chartoption: SheduleClientDetailsSeriesOptions, ChartType: 'bar' },
        5: { Chartoption: AvarageTimeSpentSeriesOption, ChartType: 'bar' },
        6: { Chartoption: TotalNoOfBillsSeriesOptions, ChartType: 'treemap' },
    }
    const chartOptionsScreen2 = {
        1: { Chartoption: TargetAndArchievedSecondScreen, ChartType: 'line' },
        2: { Chartoption: AvarageTimeSpentSecondScreen, ChartType: 'bar' },
        4: { Chartoption: SheduleClientDetailsSecondScreen, ChartType: 'bar' },
        5: { Chartoption: AvarageTimeSpentSecondScreen, ChartType: 'bar' },
        6: { Chartoption: TotalNoOfBillsSecondScreen, ChartType: 'treemap' },
        11: { Chartoption: TargetAndAchievedDetailScreenChart, ChartType: 'line' },
        12: { Chartoption: SecondSheduleScreenBar2, ChartType: 'bar' },
        13: { Chartoption: ExpenseComboChart, ChartType: 'line' },
        14: { Chartoption: SheduleClientDetailThirdScreen, ChartType: 'bar' },
        15: { Chartoption: SecondSheduleScreenBar1, ChartType: 'bar' },
        16: { Chartoption: SecondSheduleScreenBar1, ChartType: 'bar' },
    }
    const [loader, setLoader] = useState(true)
    const [dataloader, setdataLoader] = useState(true)



    // All UseEffects
    useEffect(() => {
        console.log("api called");
        getChartData()
    }, [inputdata])

    useEffect(() => {

        if (props.screen === 3) {
            getChartDetailData()
        }
    }, [inputdataDetail]);

    useEffect(() => {
        if (flagSort !== "" && countforflag !== 0) {
            getSortChartData()
        }
    }, [flagSort])


    // Functions 
    function getChartData() {
        if (props.screen === 2) {
            inputdata = { ...inputdata, 'Mode': props.id, 'FromDate': props.Date.FromDate, 'Todate': props.Date.ToDate }
        } else {
            inputdata = { ...inputdata, 'Mode': props.id }
        }
        console.log(inputdata, "secondmainasdhyuh");

        post(inputdata, API.scheduleGetcommonChart, {}, "post").then((res) => {

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

    function getChartDetailData() {
        inputdataDetail = { ...inputdataDetail, 'Mode': props.id - 10, 'FromDate': props.Date.FromDate, 'Todate': props.Date.ToDate }
        console.log(inputdataDetail, "sdhqwgteyugqw");
        post(inputdataDetail, API.GetChartDetailWise, {}, "post").then((res) => {

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

    function handleNavigate() {
        if (props.screen === 1) {
            console.log(inputdata.FromDate, inputdata.Todate, "sdasdgausydg");
            navigate('/schedual_analysis_detail', { state: { id: props.id, FromDate: inputdata.FromDate, ToDate: inputdata.Todate }, replace: true });
            // contextData.SetState({...contextData.state, [FromDate] : inputdata.FromDate,  })
        }
    }

    function handleOnClickRow(id) {
        if (id !== undefined) {
            contextData.setbillState({ ...contextData.billstate, ['ScheduleID']: id.toString() })
        }
    }

    function handleclickSort(e) {
        if (e.target.id !== props.id && e.target.id !== '') {
            setcountforflag(1)
            setflagSort(e.target.id)
        }
    }

    function handleShowSortDropDown() {
        document.getElementById(props.id).style.display === "block" ? document.getElementById(props.id).style.display = "none" : document.getElementById(props.id).style.display = "block";
        const tag_array = document.getElementsByClassName('dropdown-contenticon')

        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {

                if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] != props.id) {
                    document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
                }
            }
        }
    }

    document.getElementById("root").addEventListener("click", function (event) {

        if (event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
            if (document.getElementById(props.id) !== null) {
                // document.getElementById("myDropdowniconbranch").style.display = "none"
                document.getElementById(props.id).style.display = "none"
            }
        }
    });

    if (props.screen === 2) {
        updatecontext = (<AlphaDashChart obj={JSON.parse(JSON.stringify(chartOptionsScreen2[props.id]['Chartoption'](xAxis, yAxis, contextData, TravelingId, props.id, contextData.state['Unit'])[0]))} state={contextData.detailedstate} />).props.state;
    } else {
        updatecontext = (<AlphaDashChart obj={JSON.parse(JSON.stringify(chartOptionsScreen2[props.id]['Chartoption'](xAxisDetailed, yAxisDetailed, contextData, SheduleId, props.id, contextData.state['Unit'])[0]))} state={contextData.billstate} />).props.state;

    }
    function DivOnClick() {
        console.log(updatecontext, "asdhafd");
        if (props.screen === 2) {
            contextData.SetdetailedState({ ...contextData.detailedstate, ['TravellingTeamID']: updatecontext.TravellingTeamID })
        } else {
            contextData.setbillState({ ...contextData.billstate, ['ScheduleID']: updatecontext.ScheduleID })
        }
    }

    function getSortChartData() {
        if (props.screen === 2) {
            inputdata = { ...inputdata, 'Mode': props.id, 'FromDate': props.Date.FromDate, 'Todate': props.Date.ToDate, 'sort': flagSort }
        } else {
            inputdata = { ...inputdata, 'Mode': props.id, 'sort': flagSort }
        }
        // console.log(inputdata, "secongfdmainasdhyuh");

        post(inputdata, API.scheduleGetcommonChart, {}, "post").then((res) => {

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

    // Return   
    return (
        <div class="col-xl-12 col-lg-12 col-md-12 col-12">
            {console.log(props.id, "idfer")}
            <div className="graph-card">
                <div className='card-title-graph schedule-graph'>
                    <div className="col-xs-8 col-sm-10 col-md-10 col-10" onClick={handleNavigate}>
                        <p><i class={CommanSheduleObject[props.id]['iconclassName']}></i>{CommanSheduleObject[props.id]['heading']} <div style={{ fontSize: '15px' }}> {props.screen === 3 ? contextData.filtername !== "" && contextData.filterValue !== undefined ? " ( " + contextData.filtername + " ) " + CommanSheduleObject[props.id]['yAxis'][0]+" : " + contextData.filterValue : null : null}</div></p>
                    </div>
                    {props.screen !== 3 ?
                        <div className="col-xs-1 col-sm-1 col-md-1 col-1" >
                            <div className='d-flex schedule-card-icon'>

                                {/* <div className='dropbtngraph'>
                                <i class="fa-solid fa-ellipsis-vertical" id='icon_drop' />
                            </div> */}
                                <div className='dropbtngraph'>
                                    <i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleShowSortDropDown} />
                                </div>
                            </div>
                            <div id={props.id} className="dropdown-contenticon shedulepagesort" onClick={handleclickSort}>
                                {flagSort === 'TravellingTeamName asc' ? <><a id='TravellingTeamName asc'>Sort by TeamName ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='TravellingTeamName asc'>Sort by TeamName ASC&nbsp;</a><hr className='custom-hr' /></>}
                                {flagSort === 'TravellingTeamName desc' ? <><a id='TravellingTeamName desc'>Sort by TeamName DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='TravellingTeamName desc'>Sort by TeamName DESC&nbsp;</a><hr className='custom-hr' /></>}
                                {flagSort === CommanSheduleObject[props.id]['sortingcolumn'] + " asc" ? <><a id={CommanSheduleObject[props.id]['sortingcolumn'] + " asc"}>Sort by {CommanSheduleObject[props.id]['sortingcolumn']} ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id={CommanSheduleObject[props.id]['sortingcolumn'] + " asc"}>Sort by {CommanSheduleObject[props.id]['sortingcolumn']} ASC&nbsp;</a><hr className='custom-hr' /> </>}
                                {flagSort === CommanSheduleObject[props.id]['sortingcolumn'] + " desc" ? <><a id={CommanSheduleObject[props.id]['sortingcolumn'] + " desc"}>Sort by{CommanSheduleObject[props.id]['sortingcolumn']} DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id={CommanSheduleObject[props.id]['sortingcolumn'] + " desc"}>Sort by {CommanSheduleObject[props.id]['sortingcolumn']} DESC&nbsp;</a><hr className='custom-hr' /> </>}
                            </div>
                        </div> : null}
                </div>
                {console.log(yAxis)}
                {dataloader !== true ?
                    loader !== true || props.screen === 3 ? props.screen === 1 ? <div class="crancy-progress-card card-contain-graph">{props.id !== 4 ? <ReactApexChart options={chartOptions[props.id]['Chartoption'](xAxis, yAxis, contextData.state['Unit'], props.id)[0]} series={chartOptions[props.id]['Chartoption'](xAxis, yAxis, contextData.state['Unit'], props.id)[1]} type={chartOptions[props.id]['ChartType']} height={350} /> : <AlphaDashChart obj={JSON.parse(JSON.stringify(chartOptions[props.id]['Chartoption'](xAxis, yAxis, contextData.state['Unit'], props.id)[0]))} />}</div> :
                        props.screen !== 3 ?
                            <div class="crancy-progress-card card-contain-graph shedule-secondscreen" onClick={DivOnClick}> {props.id !== 4 ? <ReactApexChart options={chartOptionsScreen2[props.id]['Chartoption'](xAxis, yAxis, contextData, TravelingId, props.id, contextData.state['Unit'])[0]} series={chartOptionsScreen2[props.id]['Chartoption'](xAxis, yAxis, contextData, TravelingId, props.id, contextData.state['Unit'])[1]} type={chartOptionsScreen2[props.id]['ChartType']} height={400} /> :<AlphaDashChart obj={JSON.parse(JSON.stringify(chartOptionsScreen2[props.id]['Chartoption'](xAxis, yAxis, contextData, TravelingId, props.id, contextData.state['Unit'])[0]))} state={contextData.detailedstate} />} </div> :
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
                            </div> : <div class="crancy-progress-card card-contain-graph shedule-thirdscreen" onClick={DivOnClick}>{props.id !== 14 ? <ReactApexChart options={chartOptionsScreen2[props.id]['Chartoption'](xAxisDetailed, yAxisDetailed, contextData, SheduleId, props.id, contextData.state['Unit'])[0]} series={chartOptionsScreen2[props.id]['Chartoption'](xAxisDetailed, yAxisDetailed, contextData, SheduleId, props.id, contextData.state['Unit'])[1]} type={chartOptionsScreen2[props.id]['ChartType']} height={650} /> :<div style={{height:650}}> <AlphaDashChart obj={JSON.parse(JSON.stringify(chartOptionsScreen2[props.id]['Chartoption'](xAxisDetailed, yAxisDetailed, contextData, SheduleId, props.id, contextData.state['Unit'])[0]))}  state={contextData.billstate} /></div>}</div> : <div className='crancy-progress-card card-contain-graph'>{props.screen === 3 ? null : "Not Found"}</div> : <div className="crancy-progress-card card-contain-graph">
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
                    </div>}
            </div>

        </div>
    )
    // }

}
