import React from 'react'
import Navbar from '../Sales-Efficiency-Analysis-Dashboard/NavigationBar/Navbar'
import '../Assets/css/schedule-analysis.css'
import Header_shedual_Analysis from './Header_shedual_Analysis'
import Schedule_image_Graph from '../Assets/img/schedule-img/top-graph.png'
import Schedule_img_newcustomer from '../Assets/img/schedule-img/new customer.svg'
import Schedule_img_customer from '../Assets/img/schedule-img/customer.svg'
import Schedule_img_Totalsales from '../Assets/img/schedule-img/Total sales.svg'
import Schedule_img_Totalexpense from '../Assets/img/schedule-img/Total expense.svg'
import Schedule_img_visitparty from '../Assets/img/schedule-img/visit party.svg'
import Schedule_img_bill from '../Assets/img/schedule-img/bill.svg'
import Schedule_img_perday from '../Assets/img/schedule-img/per-day-1.svg'
import Schedule_img_weight from '../Assets/img/schedule-img/weight.svg';
import ScheduleContextState from '../contex/ScheduleContextState';
import CommanSheduleChart from './CommanScheduleComponants/CommanSheduleChart'
import ExpensesDetails from './CommanScheduleComponants/ExpensesDetails'
import CommanSheduleCard from './CommanScheduleComponants/CommanSheduleCard'
import TargetAchievedCard from './CommanScheduleComponants/TargetAchievedCard'


export default function Schedule_Analysis_MainScreen() {
  return (
    <div>
      <ScheduleContextState>
        <Navbar />
        <Header_shedual_Analysis />
        <section class="crancy-adashboard crancy-show">
          <div class="container">
            <div class="crancy-body">

              <div class="crancy-dsinner">
                <div class="row">
                  <TargetAchievedCard/>
                  <div class="col-xl-2 col-lg-4 col-md-4 col-12">
                    <div class="graph-card schedule-graph-card">
                      <div class="crancy-progress-card1 top-contant-top-card schedule-card-top">
                        <div class="crancy-progress-card__content schedule-content">
                          <h4 class="crancy-progress-card__title shedule-card-tt">New Customer</h4>
                          <div class="crancy-progress-card__history shedule-card-bt">
                            <span>72</span>
                          </div>
                        </div>
                        <div class="crancy-progress__single">
                          <img class="crancy-color3__fill" width="42" height="42"
                            src={Schedule_img_newcustomer} />
                        </div>
                      </div>
                      <div class="crancy-progress-card1 top-contant-botton-card schedule-card-bottom">
                        <div class="crancy-progress-card__content schedule-content">
                          <h4 class="crancy-progress-card__title shedule-card-tt">Existing Customer</h4>
                          <div class="crancy-progress-card__history shedule-card-bt">
                            <span>832</span>
                          </div>
                        </div>
                        <div class="crancy-progress__single">
                          <img class="crancy-color3__fill" width="42" height="42"
                            src={Schedule_img_customer} />
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div class="col-xl-2 col-lg-4 col-md-4 col-12">
                    <div class="graph-card schedule-graph-card">
                      <div class="crancy-progress-card2 top-contant-top-card schedule-card-top">
                        <div class="crancy-progress-card__content schedule-content">
                          <h4 class="crancy-progress-card__title shedule-card-tt">Total Sales</h4>
                          <div class="crancy-progress-card__history shedule-card-bt">
                            <span>18460.520 gm</span>
                          </div>
                        </div>
                        <div class="crancy-progress__single">
                          <img class="crancy-color2__fill" width="40" height="40" viewBox="0 0 20 20"
                            fill="none" src={Schedule_img_Totalsales} />
                        </div>
                      </div>
                      <div class="crancy-progress-card2 top-contant-botton-card schedule-card-bottom">
                        <div class="crancy-progress-card__content schedule-content">
                          <h4 class="crancy-progress-card__title shedule-card-tt">Total Expense</h4>
                          <div class="crancy-progress-card__history shedule-card-bt">
                            <span>₹ 1,32,802</span>
                          </div>
                        </div>
                        <div class="crancy-progress__single">
                          <img class="crancy-color2__fill" width="40" height="40" viewBox="0 0 20 20"
                            fill="none" src={Schedule_img_Totalexpense} />
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <CommanSheduleCard id ={2}/>
                  <div class="col-xl-2 col-lg-6 col-md-6 col-12">
                    <div class="graph-card schedule-graph-card">
                      <div class="crancy-progress-card3 top-contant-top-card schedule-card-top">
                        <div class="crancy-progress-card__content schedule-content">
                          <h4 class="crancy-progress-card__title shedule-card-tt">Visited Party</h4>
                          <div class="crancy-progress-card__history shedule-card-bt">
                            <span>831</span>
                          </div>
                        </div>
                        <div class="crancy-progress__single">
                          <img class="crancy-color2__fill" width="40" height="40" viewBox="0 0 20 20"
                            fill="none" src={Schedule_img_visitparty} />
                        </div>
                      </div>
                      <div class="crancy-progress-card3 top-contant-botton-card schedule-card-bottom">
                        <div class="crancy-progress-card__content schedule-content">
                          <h4 class="crancy-progress-card__title shedule-card-tt">No. of Bill</h4>
                          <div class="crancy-progress-card__history shedule-card-bt">
                            <span>631</span>
                          </div>
                        </div>
                        <div class="crancy-progress__single">
                          <img class="crancy-color2__fill" width="40" height="40" viewBox="0 0 20 20"
                            fill="none" src={Schedule_img_bill} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <CommanSheduleCard id ={4}/>

                  {/* <div class="col-xl-2 col-lg-6 col-md-6 col-12">
                    <div class="graph-card schedule-graph-card">
                      <div class="crancy-progress-card4 top-contant-top-card schedule-card-top">
                        <div class="crancy-progress-card__content schedule-content">
                          <h4 class="crancy-progress-card__title shedule-card-tt">Per Day Expense</h4>
                          <div class="crancy-progress-card__history shedule-card-bt">
                            <span>₹ 3250</span>
                          </div>
                        </div>
                        <div class="crancy-progress__single">
                          <img class="crancy-color2__fill" width="40" height="40" viewBox="0 0 20 20"
                            fill="none" src={Schedule_img_perday} />
                        </div>
                      </div>
                      <div class="crancy-progress-card4 top-contant-botton-card schedule-card-bottom">
                        <div class="crancy-progress-card__content schedule-content">
                          <h4 class="crancy-progress-card__title shedule-card-tt">Per Kg Expense</h4>
                          <div class="crancy-progress-card__history shedule-card-bt">
                            <span>₹ 4520</span>
                          </div>
                        </div>
                        <div class="crancy-progress__single">
                          <img class="crancy-color2__fill" width="38" height="38" viewBox="0 0 20 20"
                            fill="none" src={Schedule_img_weight} />
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>

              </div>
            </div>
          </div>
        </section>


        <section class="crancy-adashboard dashboard-graphdetail">
          <div class="container">
            <div class="row">
              <CommanSheduleChart id={1} screen={1}/>
              <CommanSheduleChart id={2} screen={1}/>
              <ExpensesDetails/>
              <CommanSheduleChart id={4} screen={1}/>
              <CommanSheduleChart id={5} screen={1}/>
              <CommanSheduleChart id={6} screen={1}/>

            </div>
          </div>
        </section>
      </ScheduleContextState >
    </div>
  )
}
