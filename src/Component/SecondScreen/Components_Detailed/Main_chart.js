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
import axios from 'axios';



export default function Main_chart(props) {

    const contextData = useContext(contex);
    const [name, setName] = useState([])
    const [id, setId] = useState([])
    const [weight, setweight] = useState([])
    const [data, setdata] = useState([])
    const [flag, setFlag] = useState('bar');
    const [flagSort, setflagSort] = useState('');
    const [flagShowId, setFlagShowId] = useState(true)
    // const [tableFlag, setTableFlag] = useState(false)
    const [componentName, setComponentName] = useState('')
    let input = contextData.state;
    const [loader, setLoader] = useState(true);





    const options_hbar = secondScreen_hbar(name, contextData, id, props.state.filterKey)
    const options_donut = secondScreen_donut(name, contextData, id, props.state.filterKey)
    // const options_radialbar = secondScreen_radial(name)

    const series_bar = [{
        data: weight
    }]

    const series_donut = handleSeriesData()
    useEffect(() => {
        if (flagSort !== '') {
            fetchSortData()
        }
    }, [flagSort])
    useEffect(() => {

        setComponentName(props.state.componentName)
        if (props.state.columnName === props.state.columnID) {
            setFlagShowId(false)
        }
        fetchData()

        // console.log(props, "useEffect_Main_Chart effect11 effect12");

    }, [input])



    async function fetchData() {

        input = { ...input, ['Grouping']: props.state.grouping };
        // await axios.post(API.GetDetailCommanChart, input).then((res) => {
        //     let name = [];
        //     let weg = [];
        //     let id1 = [];

        //     if (res.data.lstResult.length !== 0) {
        //         console.log(res)
        //         for (let i = 0; i < res.data.lstResult.length; i++) {
        //             // console.log(i)
        //             name.push(res.data.lstResult[i][props.state.columnName] ? res.data.lstResult[i][props.state.columnName] : 'null');
        //             weg.push(res.data.lstResult[i]['NetWeight']);
        //             id1.push(res.data.lstResult[i][props.state.columnID]);
        //         }

        //         // console.log(props.state.columnId)
        //         setName(name);
        //         setweight(weg);
        //         setId(id1)
        //         setdata(res.data.lstResult)
        //     }
        // })

        await post(input, API.GetDetailCommanChart, {}, "post").then((res) => {
            let name = [];
            let weg = [];
            let id1 = [];

            if (res.data.lstResult.length !== 0) {
                // console.log(res)
                for (let i = 0; i < res.data.lstResult.length; i++) {
                    // console.log(i)
                    name.push(res.data.lstResult[i][props.state.columnName] ? res.data.lstResult[i][props.state.columnName] : 'null');
                    weg.push(res.data.lstResult[i]['NetWeight']);
                    id1.push(res.data.lstResult[i][props.state.columnID]);
                }

                // console.log(props.state.columnId)
                setName(name);
                setweight(weg);
                setId(id1)
                setdata(res.data.lstResult)
                setLoader(false)
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
            // console.log(document.getElementById("filp").style.transform);
            document.getElementById("filp").style.transform = "rotateY(180deg)"
        } else {
            // console.log(document.getElementById("filp").style.transform);
            document.getElementById("filp").style.transform = "rotateY(360deg)"
        }

    }

    // function tableView() {

    // setTableFlag(true)
    // }

    function handleChartSelect(e) {
        // console.log(e.target.id,"log in sls");
        if (e.target.id !== "") {
            setFlag(e.target.id)
        }
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

    // function handleFullDiv(e) {

    //     if (document.getElementsByClassName("flip-card")[0].style.height == "600px") {

    //         document.getElementsByClassName("flip-card")[0].style.height = "390px"
    //         document.getElementsByClassName("graphdetailcards graphdetail-firstcard")[0].style.height = "390px"
    //     }
    //     else {
    //         document.getElementsByClassName("flip-card")[0].style.height = "600px"
    //         document.getElementsByClassName("graphdetailcards graphdetail-firstcard")[0].style.height = "600px"
    //     };
    // }

    function handledropdownMenu() {
        // console.log("call", document.getElementById("myDropdowniconSecondScreen").style.display);
        if ( document.getElementById("myDropdowniconSecondScreen").style.display === "block") {
            document.getElementById("myDropdowniconSecondScreen").style.display = "none"
        } else {
            // console.log("condition trueee");
            document.getElementById("myDropdowniconSecondScreen").style.display = "block";
        }
        const tag_array = document.getElementsByClassName('dropdown-contenticon-second-screen')
        console.log(tag_array, "Tage_array_of_secondScreem");
        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {
                console.log(document.getElementsByClassName('dropdown-contenticon-second-screen')[i]['id'], "each_element_id");
                if (document.getElementsByClassName('dropdown-contenticon-second-screen')[i]['id'] !== 'myDropdowniconSecondScreen') {
                    document.getElementsByClassName('dropdown-contenticon-second-screen')[i].style.display = 'none';
                }
            }
        }
    }

    // window.onclick = function (event) {
    //     if (event.target.id !== 'dropdownbutton') {
    //         if (document.getElementsByClassName("dropdown-contenticon-second-screen")[0] !== undefined) {
    //             console.log('DROP DOWN STYLE', document.getElementsByClassName("dropdown-contenticon-second-screen")[0])
    //             document.getElementsByClassName("dropdown-contenticon-second-screen")[0].style.display = "none";
    //         }
    //     }
    // }
    document.getElementById("root").addEventListener("click", function (event) {
        console.log(event.target, "class");
        if (event.target.className !== 'fa-solid fa-arrow-down-short-wide sort-icon-second-screen' && event.target.id !== 'dropdownbutton') {
            if (document.getElementById("myDropdowniconSecondScreen") !== null) {
                // console.log("condition True of click");
                document.getElementById("myDropdowniconSecondScreen").style.display = "none"
                document.getElementById("sorticonsecondScreen").style.display = "none"
            }
        }

    });

    function handleSorting() {
        document.getElementById("sorticonsecondScreen").style.display === "block" ? document.getElementById("sorticonsecondScreen").style.display = "none" : document.getElementById("sorticonsecondScreen").style.display = "block";
        const tag_array = document.getElementsByClassName('dropdown-contenticon-second-screen')
        console.log(tag_array, "Tage_array_of_secondScreem");
        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {
                console.log(document.getElementsByClassName('dropdown-contenticon-second-screen')[i]['id'], "each_element_id");
                if (document.getElementsByClassName('dropdown-contenticon-second-screen')[i]['id'] !== 'sorticonsecondScreen') {
                    document.getElementsByClassName('dropdown-contenticon-second-screen')[i].style.display = 'none';

                }
            }
        }
    }

    function handleclickSort(e) {
        if (e.target.id !== 'sorticonsecondScreen' && e.target.id !== '') {
            setflagSort(e.target.id)
        }
    }

    async function fetchSortData() {
        var inputForSort = { ...input, 'SortByLabel': props.state.columnName, 'SortBy': flagSort, ['Grouping']: props.state.grouping }
        console.log(inputForSort, "main_default_sort");
        await post(inputForSort, API.GetDetailCommanChart, {}, 'post').then((res) => {
            let name = [];
            let weg = [];
            let id1 = [];

            if (res.data.lstResult.length !== 0) {
                console.log(res)
                for (let i = 0; i < res.data.lstResult.length; i++) {
                    // console.log(i)
                    name.push(res.data.lstResult[i][props.state.columnName] ? res.data.lstResult[i][props.state.columnName] : 'null');
                    weg.push(res.data.lstResult[i]['NetWeight']);
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

    return (
        <div>

            <div class="title-top-graphdetail">
                <h5>
                    {componentName}

                    {/* <button class="fa-solid fa-retweet" style={{ float: 'right', height:'10px' }} onClick={flip} /> */}

                    {/* <i class="fa-light fa-table" style={{ float: 'right' }} onClick={tableView} /> */}

                    {/* <button class="fas fa-expand-alt" style={{ float: 'right' }} onClick={handleFullDiv} /> */}

                    <button id='dropdownbutton' className="fa-solid fa-ellipsis-vertical" onClick={handledropdownMenu} ></button>
                    {/* <i className="fa-solid fa-arrow-down-short-wide sort-icon-second-screen" onClick={handleSorting} ></i> */}
                </h5>
            </div>

            <div id="sorticonsecondScreen" className="dropdown-contenticon-second-screen" onClick={handleclickSort}>
                {flagSort === 'Label' ? <><a id='Label'>Sort by Branch ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by Branch ASC&nbsp;</a><hr className='custom-hr' /></>}
                {flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by Branch DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by Branch DESC&nbsp;</a><hr className='custom-hr' /></>}
                {flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
                {flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
            </div>

            <div id="myDropdowniconSecondScreen" className="dropdown-contenticon-second-screen" onClick={handleChartSelect}>

                {flag === 'bar' ? <><a id='bar'> Bar &nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='bar'>Bar</a><hr className='custom-hr' /> </>}
                {flag === 'donut' ? <><a id='donut'>Donut &nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='donut'>Donut</a><hr className='custom-hr' /></>}

                {/* {flag === 'radialBar'} ?<><a id='radialBar'>Radial Bar &nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr'/></> : <><a id='radialBar'>Radial Bar</a><hr className='custom-hr'/></> */}

            </div>




            {/* <div class="graphdetailcards graphdetail-firstcard">

                {tableFlag ?

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

                    :

                    <div class="">
                        {flag === 'bar' ?
                            <ReactApexChart options={options_hbar} series={series_bar} type="bar" height={600} />
                            : null}
                        {flag === 'donut' ?
                            <ReactApexChart options={options_donut} series={series_donut} type="donut" height={600} />
                            : null}

                    </div>


                }

            </div> */}



            <div class="flip-card">

                <div class="flip-card-inner" id='filp'>
                    <div class="flip-card-front">

                        {/* <div className="tableScroll">
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
                                                        <td>{ele['NetWeight']}</td>
                                                    </tr>
                                                </>
                                            )
                                        }) : data.map((ele) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{ele[props.state.columnName]}</td>
                                                        <td>{ele['NetWeight']}</td>
                                                    </tr>
                                                </>
                                            )
                                        })}
                                    </tbody>

                                </table>
                            </div> */}

                    </div>
                    <div class="flip-card-back">
                        <div class="" style={{ height: '600px' }}>
                            {loader === false ?
                                <>
                                    {flag === 'bar' ?
                                        <ReactApexChart options={options_hbar} series={series_bar} type="bar" height={600} />
                                        : null}
                                    {flag === 'donut' ?
                                        <ReactApexChart options={options_donut} series={series_donut} type="donut" height={600} />
                                        : null}
                                </>
                                :
                                <div class="dot-spinner" style={{ margin: "auto", position: 'inherit' }} >
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>
                                    <div class="dot-spinner__dot"></div>

                                </div>}</div>
                    </div>
                </div>
            </div>


        </div>
    )
}


