import React, { useContext, useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import contex from '../../contex/Contex';
import post from '../../Utility/APIHandle';
import API from '../../Utility/API';
import CommanSheduleObject from './CommanSheduleObject';

export default function ExpensesDetails() {
    const contexData = useContext(contex);
    const naviagte = useNavigate();
    const [chartData, setChartData] = useState([]);
    let inputdata = contexData.state;
    const [loader, setLoader] = useState(true)
    const [dataloader, setdataLoader] = useState(true)
    const [flagSort, setflagSort] = useState("salesWT desc");
    const [countforflag, setcountforflag] = useState(0)

    useEffect(() => {
        getChartData();
    }, [inputdata]);

    useEffect(() => {
        if (flagSort !== "" && countforflag !== 0) {
            getSortChartData()
        }
    }, [flagSort])

    function getChartData() {
        inputdata = { ...inputdata, 'Mode': 3 };
        post(inputdata, API.scheduleGetcommonChart, {}, "post").then((res) => {
            let tempdata = [];
            if (res.data !== undefined) {
                for (let i = 0; i < res.data.lstResult.length; i++) {
                    tempdata.push([
                        { value: res.data.lstResult[i][''] }
                    ])

                }
                setChartData(res.data.lstResult);
                setdataLoader(false)
                if (res.data.lstResult.length !== 0) {
                    setLoader(false)
                } else {
                    setLoader(true)
                }
            } else {
                alert(res.Error)
            }
        });
    }

    function handleOnClickNavigate() {
        naviagte('/schedual_analysis_detail', { state: { id: 3, FromDate: inputdata.FromDate, ToDate: inputdata.Todate }, replace: true })
    }

    function handleonClickRow(id, name) {

        contexData.SetdetailedState({ ...contexData.detailedstate, ['TravellingTeamID']: id.toString() })
        contexData.setfiltername(name)
    }
    function handleShowSortDropDown() {
        document.getElementById(3).style.display === "block" ? document.getElementById(3).style.display = "none" : document.getElementById(3).style.display = "block";
        const tag_array = document.getElementsByClassName('dropdown-contenticon')

        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {

                if (document.getElementsByClassName('dropdown-contenticon')[i]['id'] != 3) {
                    document.getElementsByClassName('dropdown-contenticon')[i].style.display = 'none';
                }
            }
        }
    }
    document.getElementById("root").addEventListener("click", function (event) {

        if (event.target.className !== 'fa-solid fa-arrow-down-short-wide sorticon') {
            if (document.getElementById(3) !== null) {
                // document.getElementById("myDropdowniconbranch").style.display = "none"
                document.getElementById(3).style.display = "none"
            }
        }
    });

    function getSortChartData() {

        inputdata = { ...inputdata, 'Mode': 3, 'sort': flagSort }

        console.log(inputdata, "seconfghfhggfdmainasdhyuh");

        post(inputdata, API.scheduleGetcommonChart, {}, "post").then((res) => {
            let tempdata = [];
            if (res.data !== undefined) {
                for (let i = 0; i < res.data.lstResult.length; i++) {
                    tempdata.push([
                        { value: res.data.lstResult[i][''] }
                    ])

                }
                setChartData(res.data.lstResult);
                setdataLoader(false)
                if (res.data.lstResult.length !== 0) {
                    setLoader(false)
                } else {
                    setLoader(true)
                }
            } else {
                alert(res.Error)
            }
        });
    }

    function handleclickSort(e) {
        if (e.target.id !== 3 && e.target.id !== '') {
            setcountforflag(1)
            setflagSort(e.target.id)
        }
    }
    return (
        <div class="col-xl-12 col-lg-12 col-md-12 col-12">
            <div className="graph-card">
                <div className='card-title-graph schedule-graph'>

                    <div className="col-xs-8 col-sm-10 col-md-10 col-10" onClick={handleOnClickNavigate}>
                        <p><i class="fas fa-money-bill-wave"></i>Expense to Sales, Expense per kg. and Trips</p>
                    </div>
                    <div className="col-xs-1 col-sm-1 col-md-1 col-1" >
                        <div className='d-flex schedule-card-icon'>

                            {/* <div className='dropbtngraph'>
                                <i class="fa-solid fa-ellipsis-vertical" id='icon_drop' />
                            </div> */}
                            <div className='dropbtngraph'>
                                <i className="fa-solid fa-arrow-down-short-wide sorticon" onClick={handleShowSortDropDown} />
                            </div>
                        </div>
                        <div id={3} className="dropdown-contenticon shedulepagesort" onClick={handleclickSort}>
                            {flagSort === 'TravellingTeamName asc' ? <><a id='TravellingTeamName asc'>Sort by TeamName ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='TravellingTeamName asc'>Sort by TeamName ASC&nbsp;</a><hr className='custom-hr' /></>}
                            {flagSort === 'TravellingTeamName desc' ? <><a id='TravellingTeamName desc'>Sort by TeamName DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='TravellingTeamName desc'>Sort by TeamName DESC&nbsp;</a><hr className='custom-hr' /></>}
                            {flagSort === "salesWT" + " asc" ? <><a id={"salesWT" + " asc"}>Sort by {"salesWT"} ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id={"salesWT" + " asc"}>Sort by {"salesWT"} ASC&nbsp;</a><hr className='custom-hr' /> </>}
                            {flagSort === "salesWT" + " desc" ? <><a id={"salesWT" + " desc"}>Sort by{"salesWT"} DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id={"salesWT" + " desc"}>Sort by {"salesWT"} DESC&nbsp;</a><hr className='custom-hr' /> </>}
                        </div>
                    </div>
                    {/* <div className="col-xs-1 col-sm-1 col-md-1 col-1" >
                        <div className='d-flex schedule-card-icon'>
                            <div className='dropbtngraph'>
                                <i className="fa-solid fa-arrow-down-short-wide sorticon" />
                            </div>
                            <div className='dropbtngraph'>
                                <i class="fa-solid fa-ellipsis-vertical" id='icon_drop' />
                            </div>
                        </div>

                    </div> */}

                </div>
                {dataloader !== true ?
                    loader !== true ?
                        <div class="crancy-progress-card card-contain-graph Tabel-Card">
                            <Table responsive striped bordered hover>
                                <thead>
                                    <th>Teams</th>
                                    <th colSpan={2}>Expense to Sales</th>
                                    <th>Per kg. Expense</th>
                                    <th colSpan={2}>Trip Expense</th>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td>Expense (₹)</td>
                                        <td>Sales(wt)</td>
                                        <td>Per kg. expense</td>
                                        <td>Trips</td>
                                        <td>Trips Avg. exp</td>
                                    </tr>
                                    {
                                        chartData.map((e) => {
                                            return <tr onClick={() => handleonClickRow(e['TravellingTeamID'], e['TravellingTeamName'])}>
                                                <td>{e['TravellingTeamName']}</td>
                                                <td>{e['ExpenseAmount']}</td>
                                                <td>{e['SalesWt']}</td>
                                                <td>{e['KgExp']}</td>
                                                <td>{e['noTrip']}</td>
                                                <td>{e['TripAvgEx']}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div> : <div class="crancy-progress-card card-contain-graph Tabel-Card">Not Found</div> : <div class="crancy-progress-card card-contain-graph Tabel-Card"><div class="dot-spinner" style={{ margin: "auto", position: 'inherit' }} >
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                        </div></div>}
            </div>
        </div>

    )
}
