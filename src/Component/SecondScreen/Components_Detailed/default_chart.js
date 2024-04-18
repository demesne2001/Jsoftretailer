import React from 'react';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import { useState, useEffect, useContext } from 'react';
import contex from '../../contex/Contex';
import ReactApexChart from 'react-apexcharts';
import './../../Assets/css/Custom.css'

export default function Default_chart(props) {
    const contextData = useContext(contex);
    const [name, setName] = useState([])
    const [weight, setweight] = useState([])
    
    const [data, setdata] = useState([])
    let input = contextData.defaultchart;


    useEffect(() => {
        fetchData()
    }, [props])

    useEffect(() => {
        fetchData()
    }, [input])


// console.log(props);
    function fetchData() {
        input = { ...input, ['Grouping']: props.graph.group };
        console.log(input, "DEFAULT CHART API");
        post(input, API.CommonChart, {}, "post").then((res) => {

            console.log('INPUT FOR CLICK',input)

            if (res.data.lstResult.length !== 0) {
                
                
                let name = [];
                let weg = [];
                for (let i = 0; i < res.data.lstResult.length; i++) {
                    if (res.data.lstResult[i][props.graph.column] !== null) {
                        

                        name.push(res.data.lstResult[i][props.graph.column]);
                        weg.push(res.data.lstResult[i]['FineWt']);
                    }
                    else{
                        name.push('null');
                        weg.push(res.data.lstResult[i]['FineWt']);
                        
                    }
                }
                // console.log(name, weg);
                setName(name);
                setweight(weg);
                setdata(res.data.lstResult)
            }
        })

    }
    // console.log(weight);
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
        },
        yaxis: {
            labels: {
                show: true,
                formatter: function (val) {
                    if (val.length > 7) {
                        return val.slice(0, 6) + "..."
                    } else {
                        return val
                    }
                }
            }
        },
        tooltip: {
            x: {
                formatter: function (val) {
                    return val
                }
            },
            y: {
                formatter: function (val) {
                    return val
                }
            }
        },
    }

    function flip() {
        if (document.getElementById("filp").style.transform === "rotateY(360deg)" || document.getElementById("filp").style.transform === "") {
            console.log(document.getElementById("filp").style.transform);
            document.getElementById("filp").style.transform = "rotateY(180deg)"
        } else {
            console.log(document.getElementById("filp").style.transform);
            document.getElementById("filp").style.transform = "rotateY(360deg)"
        }

    }

    

    return (
        <div>
            <div class="title-top-graphdetail-withoutcolor">
                <h5>{props.graph.componentName}<button class="fa-solid fa-retweet" id='FlipDefaultChart' ></button></h5>
            </div>

            {/* <div class="flip-card">
                <div class="flip-card-inner" id='filp'>

                    <div class="flip-card-front">
                        <div class="graphdetailcards graphdetail-secondcard">
                       
                            <div class="topimg-gd">
                                <ReactApexChart options={options} series={series} type="bar" height={350} />
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
       
            <div class="graphdetailcards graphdetail-secondcard">
                {/* <div class="gd-refresh-icon">
                    <div class="graphdetailcards-icon">
                        <i class="fa-solid fa-retweet"></i>
                    </div>
                </div> */}
                <div class="topimg-gd">
                    <ReactApexChart options={options} series={series} type="bar" height={450} />
                </div>
            </div>:
			
        </div>
    )
}
