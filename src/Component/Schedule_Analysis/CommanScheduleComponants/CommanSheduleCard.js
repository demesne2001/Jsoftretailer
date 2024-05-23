import React, { useContext, useEffect, useState } from 'react';
import CommanShedulecardObject from './CommanShedulecardObject';
import contex from '../../contex/Contex';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';

export default function CommanSheduleCard(props) {
  const contexData = useContext(contex);
  const [chartData, setChartData] = useState([]);
  let inputdata = contexData.state;
  let currency = contexData.currency;
  useEffect(() => {
    getCardData();
  }, [inputdata])
  useEffect(() => {
    console.log("called currency", currency);
    getCardData();
  }, [currency])

  function getCardData() {
    inputdata = { ...inputdata, 'Mode': props.id };
    post(inputdata, API.scheduleGetcommonCard, {}, "post").then((res) => {
      if (res.data !== undefined) {
        console.log(res, "carddata");
        setChartData(res.data.lstResult);
      } else {
        alert("Network Error!!!")
      }
    });

  }
  function format(val) {
    console.log("value changes");
    if (localStorage.getItem('value') === 'k') {
      return (Number(parseFloat(((((val / 1000).toFixed(1)).toString())))).toLocaleString('en', {
        minimumFractionDigits: 0
      }) + " " + "K");
    } else if (localStorage.getItem('value') === 'l') {
      return (Number(parseFloat(((((val / 100000).toFixed(1)).toString())))).toLocaleString('en', {
        minimumFractionDigits: 0
      }) + " " + "L");
    } else if (localStorage.getItem('value') === 'm') {
      return (Number(parseFloat(((((val / 1000000).toFixed(1)).toString())))).toLocaleString('en', {
        minimumFractionDigits: 0
      }) + " " + "M");
    } else if (localStorage.getItem('value') === 'c') {
      return (Number(parseFloat(((((val / 10000000).toFixed(1)).toString())))).toLocaleString('en', {
        minimumFractionDigits: 0
      }) + " " + "CR");
    } else if (localStorage.getItem('value') === 'b') {
      return (Number(parseFloat(((((val / 1000000000).toFixed(1)).toString())))).toLocaleString('en', {
        minimumFractionDigits: 0
      }) + " " + "B");
    } else {
      console.log("default");
      return (Number(parseFloat(Math.floor(val))).toLocaleString('en', {
        minimumFractionDigits: 0
      }));
    }
  }

  return (
    <div class={CommanShedulecardObject[props.id]['containerClass']}>
      <div class="graph-card schedule-graph-card">
        <div class={CommanShedulecardObject[props.id]['innerContainerClass1']}>
          <div class="crancy-progress-card__content schedule-content">
            <h4 class="crancy-progress-card__title shedule-card-tt">{CommanShedulecardObject[props.id]['firstLabel']}</h4>
            <div class="crancy-progress-card__history shedule-card-bt">
              {CommanShedulecardObject[props.id]['firstLabel'] === "Per Day Expense" 
              ?<span>₹ {chartData[0] !== undefined ? format(chartData[0][CommanShedulecardObject[props.id]['apiLabel1']]) : 0}</span> 
              :CommanShedulecardObject[props.id]['firstLabel'] === "Total Sales" 
              ? <span>{chartData[0] !== undefined ? chartData[0][CommanShedulecardObject[props.id]['apiLabel1']]  + " " + contexData.state['Unit'] : 0}</span>
              :<span>{chartData[0] !== undefined ? chartData[0][CommanShedulecardObject[props.id]['apiLabel1']] : 0}</span>}
            </div>
          </div>
          <div class="crancy-progress__single">
            {CommanShedulecardObject[props.id]['imageTag1']}
          </div>
        </div>
        <div class={CommanShedulecardObject[props.id]['innerContainerClass2']}>
          <div class="crancy-progress-card__content schedule-content">
            <h4 class="crancy-progress-card__title shedule-card-tt">{CommanShedulecardObject[props.id]['secondLabel']}</h4>
            <div class="crancy-progress-card__history shedule-card-bt">
              {CommanShedulecardObject[props.id]['secondLabel'] === "Total Expense" || CommanShedulecardObject[props.id]['secondLabel'] === "Per Kg Expense" ? <span>₹ {chartData[0] !== undefined ? format(chartData[0][CommanShedulecardObject[props.id]['apiLabel2']]) : 0}</span> : <span>{chartData[0] !== undefined ? chartData[0][CommanShedulecardObject[props.id]['apiLabel2']] : 0}</span>}
            </div>
          </div>
          <div class="crancy-progress__single">
            {CommanShedulecardObject[props.id]['imageTag2']}
          </div>
        </div>
      </div>
    </div>
  )
}
