import React, { useRef } from 'react';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import { useState, useEffect, useContext } from 'react';
import contex from '../../contex/Contex';
import ReactApexChart from 'react-apexcharts';
import './../../Assets/css/Custom.css'

export default function Default_chart(props) {
    const contextData = useContext(contex);
    const [name, setName] = useState([]);
    const [id, setid] = useState([]);
    const [weight, setweight] = useState([])
    const checkref = useRef(null)
    const [data, setdata] = useState([])
    let input = contextData.defaultchart;
    const defaultImageData = {
        "strBranch": "",
        "strState": "",
        "strCity": "",
        "strRegionID": "",
        "strSubItem": "",
        "strItem": "",
        "strItemGroup": "",
        "strItemSubitem": "",
        "strDesignCodeID": "",
        "strSalesParty": "",
        "strSaleman": "",
        "strProduct": "",
        "strDesignCatalog": "",
        "strSaleAging": "",
        "strMonth": "",
        "strFinYear": "",
        "PageNo": 1,
        "PageSize": 5
      }

    useEffect(() => {
        console.log("effect11", props);

        if (props.graph !== '' && props.graph.group !== undefined) {
            fetchData()
        }
    }, [props])

    useEffect(() => {
        console.log("effect12");
        if (props.graph !== '' && props.graph.group !== undefined) {
            fetchData()
        }
    }, [input])


    // console.log(props);
    function fetchData() {
        console.log(props.graph.group, "props");

        input = { ...input, ['Grouping']: props.graph.group };
        console.log(input, "DEFAULT CHART API");
        post(input, API.CommonChart, {}, "post").then((res) => {
            console.log(res, "res_default");
            console.log('INPUT FOR CLICK', input)
            console.log(props.graph.columnID, "columnID");
            if (res.data.lstResult !== 0) {


                let name = [];
                let weg = [];
                let id1 = [];
                for (let i = 0; i < res.data.lstResult.length; i++) {
                    if (res.data.lstResult[i][props.graph.column] !== null) {


                        console.log("IF inside loop")

                        name.push(res.data.lstResult[i][props.graph.column]);
                        weg.push(res.data.lstResult[i]['NetWeight']);
                        id1.push(res.data.lstResult[i][props.graph.columnID]);
                    }
                    else {
                        name.push('null');
                        weg.push(res.data.lstResult[i]['NetWeight']);
                        id1.push(res.data.lstResult[i][props.graph.columnID])
                    }
                }
                // console.log(name, weg);
                setName(name);
                setweight(weg);
                setid(id1);
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
            height: 350,
            events: {
                dataPointSelection: (event, chartContex, config) => {
                    if (id[config.dataPointIndex] !== null && id[config.dataPointIndex] !== undefined) {
                        console.log(id[config.dataPointIndex],"id456789");
                        console.log(id, "id123");
                        console.log(props.graph.filter_key1, props.graph.filter_key2, "123456789");
                        contextData.setchartImage({ ...defaultImageData, [props.graph.filter_key1]: contextData.defaultchart[props.graph.filter_key1], [props.graph.filter_key2]: (id[config.dataPointIndex]).toString() })
                    }
                }
            }
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

        responsive: [
            {
                breakpoint: 850,
                options: {
                    legend: {
                        position: "bottom"
                    }
                },
                breakpoint: 415,
                options: {

                    xaxis: {
                        categories: name,
                        labels: {
                            style: {
                                fontSize: "8px",

                            }

                        }


                    },
                }
            },
        ],
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
            {/* <div class="title-top-graphdetail-withoutcolor">
                <h5>{props.graph.componentName}<button class="fa-solid fa-retweet" id='FlipDefaultChart' ></button></h5>
            </div> */}

            <div class="title-top-graphdetail-withoutcolor">
                <h5>{props.graph.componentName}</h5>
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
            </div>

        </div>
    )
}
