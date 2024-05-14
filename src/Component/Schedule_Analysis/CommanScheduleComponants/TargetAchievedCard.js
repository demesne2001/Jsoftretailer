import React, { useContext, useEffect, useState } from 'react';
import CommanShedulecardObject from './CommanShedulecardObject';
import contex from '../../contex/Contex';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle';
import ReactApexChart from 'react-apexcharts';

export default function TargetAchievedCard() {
    const contexData = useContext(contex);
    const [chartData, setChartData] = useState([]);
    let inputdata = contexData.state;
    const options = {
        chart: {
            height: 200,
            type: 'radialBar',
        },
        plotOptions: {
            radialBar: {
                hollow: {
                    size: '60%',
                },
                dataLabels: {
                    showOn: "always",
                    name: {
                        offsetY: -10,
                        show: false,
                        color: "#888",
                        fontSize: "13px"
                    },
                    value: {
                        offsetY: 8
                        ,
                        color: "#111",
                        fontSize: "25px",
                        show: true
                    }
                }

            },
        },

    }
    useEffect(() => {
        getCardData();
    }, [inputdata])

    function getCardData() {
        inputdata = { ...inputdata, 'Mode': 1 };
        post(inputdata, API.scheduleGetcommonCard, {}, "post").then((res) => {
            if (res.data !== undefined) {
                console.log(res, "carddata");
                setChartData(res.data.lstResult);
            } else {
                alert("Network Error!!!")
            }
        });

    }

    return (
        <div class="col-xl-2 col-lg-4 col-md-4 col-12">
            <div class="graph-card">
                <div class="crancy-progress-card top-graph-card Shedule-piechart">
                    <div class="text-center">
                        <ReactApexChart options={options} series={chartData[0] !== undefined ? [chartData[0]['Prc']] : [0]} type="radialBar" height={200} />
                    </div>
                </div>
            </div>
        </div>
    )
}
