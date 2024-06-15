import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../Sales-Efficiency-Analysis-Dashboard/NavigationBar/Navbar';
import Header_detailed from '../../SecondScreen/Components_Detailed/Header_detailed';
import CommanSheduleChart from '../CommanScheduleComponants/CommanSheduleChart';
import ScheduleContextState from '../../contex/ScheduleContextState';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import ExpensesDetails from '../CommanScheduleComponants/ExpensesDetails';
import BillShowComponents from './BillShowComponents';
import contex from '../../contex/Contex';


export default function DetailedCommanScheduleScreen() {
    const location = useLocation();
    const navigate = useNavigate();
    const [urlData, seturlData] = useSearchParams()
    const mainChartProps = location.state
    const contextData = useContext(contex);

   
   
    return (
        <ScheduleContextState>
            <Navbar />
            <div id="crancy-dark-light">
                <div class="crancy-body-area">
                    <Header_detailed screen={2} context={contextData} Date={{ FromDate: mainChartProps.FromDate, ToDate: mainChartProps.ToDate }} />
                    <section class="crancy-adashboard crancy-show">
                    </section>
                    <section class="crancy-adashboard dashboard-graphdetail">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-6 col-lg-6 col-md-12 col-12" >
                                    {/* <Main_chart state={mainChartProps} /> */}
                                    {mainChartProps.id === 3 ? <ExpensesDetails screen={2} Date={{ FromDate: mainChartProps.FromDate, ToDate: mainChartProps.ToDate }} /> : <CommanSheduleChart id={mainChartProps.id} screen={2} Date={{ FromDate: location.state.FromDate, ToDate: location.state.ToDate }} />}
                                    <BillShowComponents id={mainChartProps.id} Date={{ FromDate: mainChartProps.FromDate, ToDate: mainChartProps.ToDate }}  />
                                </div>

                                <div class="col-xl-6 col-lg-6 col-md-12 col-12" >
                                    <CommanSheduleChart id={mainChartProps.id + 10} screen={3} Date={{ FromDate: mainChartProps.FromDate, ToDate: mainChartProps.ToDate }} />
                                </div>

                                {/* <div class="col-xl-6 col-lg-6 col-md-12 col-12">
                                 
                                </div> */}
                            </div>

                        </div>
                    </section>
                </div>
            </div>
        </ScheduleContextState>
    )
}
