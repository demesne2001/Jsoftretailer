import React, { useContext, useEffect, useState } from 'react';
import CommanShedulecardObject from './CommanShedulecardObject';
import contex from '../../contex/Contex';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';

export default function CommanSheduleCard(props) {
    const contexData = useContext(contex);
    const [chartData, setChartData] = useState([]);
    let inputdata = contexData.state;
    useEffect(()=>{
        getCardData();
    },[inputdata])

    function getCardData() {
        inputdata = {...inputdata , 'Mode' : props.id};
        post(inputdata,API.scheduleGetcommonCard, {}, "post").then((res) => {
            if (res.data !== undefined) {
                console.log(res, "carddata");
                setChartData(res.data.lstResult);
            } else {
                alert("Network Error!!!")
            }
        });

    }

    return (
        <div class={CommanShedulecardObject[props.id]['containerClass']}>
            <div class="graph-card schedule-graph-card">
                <div class={CommanShedulecardObject[props.id]['innerContainerClass1']}>
                    <div class="crancy-progress-card__content schedule-content">
                        <h4 class="crancy-progress-card__title shedule-card-tt">{CommanShedulecardObject[props.id]['firstLabel']}</h4>
                        <div class="crancy-progress-card__history shedule-card-bt">
                            <span>{chartData[0] !== undefined ? chartData[0][CommanShedulecardObject[props.id]['apiLabel1']]: null}</span>
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
                            <span>₹ {chartData[0] !== undefined ? chartData[0][CommanShedulecardObject[props.id]['apiLabel2']]: null}</span>
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
