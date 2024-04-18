import React from 'react';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import { useState, useEffect, useContext } from 'react';
import contex from '../../contex/Contex';
import ReactApexChart from 'react-apexcharts';
import './../../Assets/css/Custom.css';
import Slider from "react-slick";
import { secondScreen_hbar } from '../../ChartOptions/SecondScreen/Hbar';
import { secondScreen_donut } from '../../ChartOptions/SecondScreen/Donut';
import secondScreen_radial from '../../ChartOptions/SecondScreen/Radial';
import { BranchWise_donut } from '../../ChartOptions/BranchWise_donut';



export default function Main_chart(props) {

    const contextData = useContext(contex);
    const [name, setName] = useState([])
    const [id, setId] = useState([])
    const [weight, setweight] = useState([])
    const [data, setdata] = useState([])
    const [flag, setFlag] = useState('bar')
    const [flagShowId, setFlagShowId] = useState(true)
    const [componentName, setComponentName] = useState('')
    let input = contextData.state;

    


    const options_hbar = secondScreen_hbar(name,contextData,id,props.state.filterKey)
    const options_donut = secondScreen_donut(name,contextData,id,props.state.filterKey)
    // const options_radialbar = secondScreen_radial(name)

    const series_bar = [{
        data: weight
    }]

    const series_donut = handleSeriesData()

    useEffect(() => {

        setComponentName(props.state.componentName)
        if (props.state.columnName === props.state.columnID) {
            setFlagShowId(false)
        }
        fetchData()

        // console.log(props.chart);

    }, [input])



    function fetchData() {

        input = { ...input, ['Grouping']: props.state.grouping };
        post(input, API.GetDetailCommanChart, {}, "post").then((res) => {
            let name = [];
            let weg = [];
            let id1 = [];

            if (res.data.lstResult.length !== 0) {
                console.log(res)
                for (let i = 0; i < res.data.lstResult.length; i++) {
                    // console.log(i)
                    name.push(res.data.lstResult[i][props.state.columnName] ? res.data.lstResult[i][props.state.columnName] : 'null');
                    weg.push(res.data.lstResult[i]['FineWt']);
                    id1.push(res.data.lstResult[i][props.state.columnID]);
                }

                // console.log(props.state.columnId)
                setName(name);
                setweight(weg);
                setId(id1)
                setdata(res.data.lstResult)
            }
        })

    }
    // console.log(weight);

    // const series = weight

    function handleSeriesData() {
        let percarray = []
        let sum = 0;

        for (let i = 0; i < weight.length; i++) {
            sum += weight[i];
        }

        for (let index = 0; index < weight.length; index++) {
            percarray.push((weight[index] / sum) * 100)
        }
        return percarray

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

    function handleChartSelect(e) {
        setFlag(e.target.id)
    }

    // function handleFullDiv() {

    //     if (document.getElementsByClassName("flip-card")[0].style.height == "600px") {

    //         document.getElementsByClassName("flip-card")[0].style.height = "390px"
    //         document.getElementsByClassName("graphdetailcards graphdetail-firstcard")[0].style.height = "390px"
    //     }
    //     else {
    //         document.getElementsByClassName("flip-card")[0].style.height = "600px"
    //         document.getElementsByClassName("graphdetailcards graphdetail-firstcard")[0].style.height = "600px"
    //     };

    // }

    function handleFullDiv(e) {

        if (document.getElementsByClassName("flip-card")[0].style.height == "600px") {

            document.getElementsByClassName("flip-card")[0].style.height = "390px"
            document.getElementsByClassName("graphdetailcards graphdetail-firstcard")[0].style.height = "390px"
        }
        else {
            document.getElementsByClassName("flip-card")[0].style.height = "600px"
            document.getElementsByClassName("graphdetailcards graphdetail-firstcard")[0].style.height = "600px"
        };
    }

    function handledropdownMenu() {
        document.getElementById("myDropdowniconSecondScreen").style.display === "block" ? document.getElementById("myDropdowniconSecondScreen").style.display = "none" : document.getElementById("myDropdowniconSecondScreen").style.display = "block";

    }

    window.onclick = function (event) {
        if (event.target.id !== 'dropdownbutton') {
            if (document.getElementsByClassName("dropdown-contenticon-second-screen")[0] !== "block") {
                document.getElementsByClassName("dropdown-contenticon-second-screen")[0].style.display = "none";
            }
        }
    }

    return (
        <div>

            <div class="title-top-graphdetail">
                <h5>
                    {componentName}
                    <button class="fa-solid fa-retweet" style={{ float: 'right' }} onClick={flip} />
                    {/* <button class="fas fa-expand-alt" style={{ float: 'right' }} onClick={handleFullDiv} /> */}
                    <button id='dropdownbutton' class="fa-solid fa-ellipsis-vertical" style={{ float: 'right' }} onClick={handledropdownMenu} ></button>
                </h5>
            </div>

            <div id="myDropdowniconSecondScreen" className="dropdown-contenticon-second-screen" onClick={handleChartSelect}>

                {flag === 'bar' ? <><a id='bar'> Bar &nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar'>Bar</a><hr className='custom-hr' /> </>}
                {flag === 'donut' ? <><a id='donut'>Donut &nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut'>Donut</a><hr className='custom-hr' /></>}
                
                {/* {flag === 'radialBar'} ?<><a id='radialBar'>Radial Bar &nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr'/></> : <><a id='radialBar'>Radial Bar</a><hr className='custom-hr'/></> */}

            </div>
            
            <div class="flip-card">
                <div class="flip-card-inner" id='filp'>
                    <div class="flip-card-front">

                    <div className="tableScroll">
                                <table class="table table-striped table-bordered" >
                                    {flagShowId === true ?
                                        <><thead>
                                            <td>ID</td>
                                            <td>NAME</td>
                                            <td>WEIGHT</td>
                                        </thead></> :
                                        <><thead>
                                            <td>NAME</td>
                                            <td>WEIGHT</td>
                                        </thead></>}

                                    <tbody>
                                        {flagShowId === true ? data.map((ele) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{ele[props.state.columnID]}</td>
                                                        <td>{ele[props.state.columnName]}</td>
                                                        <td>{ele['FineWt']}</td>
                                                    </tr>
                                                </>
                                            )
                                        }) : data.map((ele) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{ele[props.state.columnName]}</td>
                                                        <td>{ele['FineWt']}</td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody>

                                </table>
                            </div>
                        
                    </div>
                    <div class="flip-card-back">
                        <div class="">                          
                          {flag === 'bar' ?
                              <ReactApexChart options={options_hbar} series={series_bar} type="bar" height={580}/>
                              : null}
                          {flag === 'donut' ?
                              <ReactApexChart options={options_donut} series={series_donut} type="donut" height={580}/>
                              : null}                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}


