import React, { useContext, useEffect, useState } from 'react';
import {Table} from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import contex from '../../contex/Contex';
import post from '../../Utility/APIHandle';
import API from '../../Utility/API';

export default function ExpensesDetails() {
    const contexData = useContext(contex);
    const naviagte = useNavigate();
    const [chartData, setChartData] = useState([]);
    let inputdata = contexData.state;

    useEffect(() => {
        getChartData();
    },[inputdata]);

    function getChartData() {
        inputdata = {...inputdata , 'Mode' : 3};
        post(inputdata,API.scheduleGetcommonChart, {}, "post").then((res) => {
            if (res.data !== undefined) {
                setChartData(res.data.lstResult);
            } else {
                alert("Network Error!!!")
            }
        });
    }

    function handleOnClickNavigate() {
        naviagte('/schedual_analysis_detail', {state:3, replace:true})
    }

    function handleonClickRow(id) {
        console.log("clicked");
        contexData.SetdetailedState({...contexData.detailedstate, ['TravellingTeamID'] : id.toString()})
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
                            <div className='dropbtngraph'>
                                <i className="fa-solid fa-arrow-down-short-wide sorticon" />
                            </div>
                            <div className='dropbtngraph'>
                                <i class="fa-solid fa-ellipsis-vertical" id='icon_drop' />
                            </div>
                        </div>

                    </div>

                </div>
                <div class="crancy-progress-card card-contain-graph">
                    <Table striped bordered hover>
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
                                chartData.map((e)=>{
                                    return<tr onClick={() => handleonClickRow(e['TravellingTeamID'])}>
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
                </div>
            </div>
        </div>

    )
}
