import React from 'react';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import { useState, useEffect, useContext } from 'react';
import contex from '../../contex/Contex';
import ReactApexChart from 'react-apexcharts';
import './../../Assets/css/Custom.css'
export default function Main_chart(props) {
    const contextData = useContext(contex);
    const [name, setName] = useState([])
    const [weight, setweight] = useState([])
    const [data, setdata] = useState([])
    let input = contextData.state;


    useEffect(() => {
        fetchData()
        console.log(props.chart);
    }, [input])


    function fetchData() {
        input = { ...input, ['Grouping']: props.chart };
        console.log(input);
        post(input, API.GetDetailCommanChart, {}, "post").then((res) => {
            let name = [];
            let weg = [];
            for (let i = 0; i < res.data.lstResult.length; i++) {
                name.push(res.data.lstResult[i]['BranchName']);
                weg.push(res.data.lstResult[i]['FineWt']);
            }
            setName(name);
            setweight(weg);
            setdata(res.data.lstResult)
        })

    }
    console.log(weight);
    const series = [{
        data: weight
    }]
    const options = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                borderRadius: 4,
                horizontal: true,
            }
        },
        dataLabels: {
            enabled: false
        },
        xaxis: {
            categories: name,
        }
    }
    function flip() {
        if (document.getElementById("done").style.transform === "rotateY(360deg)" || document.getElementById("done").style.transform === "") {
            console.log(document.getElementById("done").style.transform);
            document.getElementById("done").style.transform = "rotateY(180deg)"
        } else {
            console.log(document.getElementById("done").style.transform);
            document.getElementById("done").style.transform = "rotateY(360deg)"
        }
        
    }
    return (
        <div class="">
            <div class="title-top-graphdetail">
                <h5>Branch Wise</h5>
            </div>
            <div class="flip-card">
                <div class="flip-card-inner" id='done'>
                    <div class="flip-card-front">
                        <div class="gd-refresh-icon">
                            <div class="graphdetailcards-icon" onClick={flip}>
                                <i class="fa-solid fa-retweet"></i>
                            </div>
                        </div>
                        <div class="graphdetailcards graphdetail-firstcard">
                            <ReactApexChart options={options} series={series} type="bar" height={350} />
                        </div>
                    </div>
                    <div class="flip-card-back">
                    <div class="gd-refresh-icon">
                                <div class="graphdetailcards-icon" onClick={flip}>
                                    <i class="fa-solid fa-retweet"></i>
                                </div>
                            </div>
                        <div class="graphdetailcards graphdetail-firstcard">
                            
                            <table class="table table-striped table-bordered" >
                                <thead>
                                  <td>ID</td>
                                  <td>NAME</td>
                                  <td>WEIGHT</td>
                                </thead>
                                <tbody>
                                    {
                                        data.map((ele) =>{
                                            console.log(ele);
                                            return(
                                                
                                                <tr>
                                                    <td>{ele['BranchID']}</td>
                                                    <td>{ele['BranchName']}</td>
                                                    <td>{ele['FineWt']}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>

                            </table>
                        </div>
                    </div>
                </div>

                {/* <ReactApexChart options={options} series={series} type="bar" height={350} /> */}
            </div>
        </div>
    )
}
