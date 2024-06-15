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
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'


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
    const [dataloader, setdataLoader] = useState(true);

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

    }, [input])



    async function fetchData() {

        input = { ...input, ['Grouping']: props.state.grouping, ['FromDate'] : props.state.FromDate, ['ToDate'] : props.state.ToDate };
        // await axios.post(API.GetDetailCommanChart, input).then((res) => {
        //     let name = [];
        //     let weg = [];
        //     let id1 = [];

        //     if (res.data.lstResult.length !== 0) {

        //         for (let i = 0; i < res.data.lstResult.length; i++) {

        //             name.push(res.data.lstResult[i][props.state.columnName] ? res.data.lstResult[i][props.state.columnName] : 'null');
        //             weg.push(res.data.lstResult[i]['NetWeight']);
        //             id1.push(res.data.lstResult[i][props.state.columnID]);
        //         }


        //         setName(name);
        //         setweight(weg);
        //         setId(id1)
        //         setdata(res.data.lstResult)
        //     }
        // })

        console.log(input, "main chart input");

        await post(input, API.GetDetailCommanChart, {}, "post").then((res) => {
            let name = [];
            let weg = [];
            let id1 = [];
            let tempdata = [];
            if (res.data !== undefined) {
                console.log(res.data.lstResult.length, "sdffe");
                setLoader(false)
                if (res.data.lstResult.length !== 0) {

                    for (let i = 0; i < res.data.lstResult.length; i++) {
                        tempdata.push({
                            name: res.data.lstResult[i][props.state.columnName] ? res.data.lstResult[i][props.state.columnName] : 'null'
                            , value: res.data.lstResult[i]['NetWeight']
                        })
                        name.push(res.data.lstResult[i][props.state.columnName] ? res.data.lstResult[i][props.state.columnName] : 'null');
                        weg.push(res.data.lstResult[i]['NetWeight']);
                        id1.push(res.data.lstResult[i][props.state.columnID]);
                    }
                    setName(name);
                    setweight(weg);
                    setId(id1)
                    setdata(tempdata)
                    console.log(tempdata, "sdffe");
                    setdataLoader(false)

                } else {
                    setdataLoader(true)
                }
            } else {
                alert(res['Error']);
            }
        })

    }


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

            document.getElementById("filp").style.transform = "rotateY(180deg)"
        } else {

            document.getElementById("filp").style.transform = "rotateY(360deg)"
        }

    }

    // function tableView() {

    // setTableFlag(true)
    // }

    function handleChartSelect(e) {
        if (e.target.id !== "") {
            setFlag(e.target.id)
        }
    }


    function handledropdownMenu() {

        if (document.getElementById("myDropdowniconSecondScreen").style.display === "block") {
            document.getElementById("myDropdowniconSecondScreen").style.display = "none"
        } else {

            document.getElementById("myDropdowniconSecondScreen").style.display = "block";
        }
        const tag_array = document.getElementsByClassName('dropdown-contenticon-second-screen')

        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {

                if (document.getElementsByClassName('dropdown-contenticon-second-screen')[i]['id'] !== 'myDropdowniconSecondScreen') {
                    document.getElementsByClassName('dropdown-contenticon-second-screen')[i].style.display = 'none';
                }
            }
        }
    }

    // window.onclick = function (event) {
    //     if (event.target.id !== 'dropdownbutton') {
    //         if (document.getElementsByClassName("dropdown-contenticon-second-screen")[0] !== undefined) {

    //             document.getElementsByClassName("dropdown-contenticon-second-screen")[0].style.display = "none";
    //         }
    //     }
    // }
    document.getElementById("root").addEventListener("click", function (event) {

        if (event.target.className !== 'fa-solid fa-arrow-down-short-wide sort-icon-second-screen' && event.target.id !== 'dropdownbutton') {
            if (document.getElementById("myDropdowniconSecondScreen") !== null) {

                document.getElementById("myDropdowniconSecondScreen").style.display = "none"
                document.getElementById("sorticonsecondScreen").style.display = "none"
            }
        }

    });

    function handleclickSort(e) {
        if (e.target.id !== 'sorticonsecondScreen' && e.target.id !== '') {
            setflagSort(e.target.id)
        }
    }

    async function fetchSortData() {
        var inputForSort = { ...input, 'SortByLabel': props.state.columnName, 'SortBy': flagSort, ['Grouping']: props.state.grouping }

        await post(inputForSort, API.GetDetailCommanChart, {}, 'post').then((res) => {
            let name = [];
            let weg = [];
            let id1 = [];
            if (res.data !== undefined) {

                if (res.data.lstResult.length !== 0) {

                    for (let i = 0; i < res.data.lstResult.length; i++) {

                        name.push(res.data.lstResult[i][props.state.columnName] ? res.data.lstResult[i][props.state.columnName] : 'null');
                        weg.push(res.data.lstResult[i]['NetWeight']);
                        id1.push(res.data.lstResult[i][props.state.columnID]);
                    }


                    setName(name);
                    setweight(weg);
                    setId(id1)
                    setdata(res.data.lstResult)
                }
            } else {
                alert(res['Error']);
            }
        })
    }

    let barHorizontal = {
        themeId: contextData.ThemeIndex,
        charttype: 'round-horizontal-bar',
        height: '100%',
        chartId: 'Main_chart_secondScreen',
        width: '100%',
        Xaxis: name,
        Yaxis: weight,
        // idobj: contextData.defaultchart,
        idkey: props.state.filterKey,
        idlst: id,
        divname: 'flip-card-back'
    }
    console.log(props.state.filterKey, "key");
    let donutoption = {
        themeId: contextData.ThemeIndex,
        charttype: 'donut',
        height: '100%',
        width: '100%',
        chartId: 'Main_chart_secondScreen',
        propdata: data,
        idkey: props.state.filterKey,
        idlst: id
    }
    let updatedstate = {}

    if (flag === 'bar') {
        updatedstate = (<AlphaDashChart obj={JSON.parse(JSON.stringify(barHorizontal))} state={contextData.defaultchart} />).props.state
    } else {
        updatedstate = (<AlphaDashChart obj={JSON.parse(JSON.stringify(donutoption))} state={contextData.defaultchart} />).props.state
    }
    function divonclick() {
        if (updatedstate.filtername !== undefined) {
            contextData.setdefaultchartFilterName(updatedstate.filtername)
        }
        contextData.setDefaultChart({ ...contextData.defaultchart, [props.state.filterKey]: updatedstate[props.state.filterKey] })
    }

    return (
        <div>
            {console.log(loader, "sdsdweerfwer")}
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
                        <div class="" style={{ height: '600px' }} onClick={divonclick}>

                            {loader === false ?
                                dataloader === false ?
                                    <>
                                        {flag === 'bar' ?
                                            <AlphaDashChart obj={JSON.parse(JSON.stringify(barHorizontal))} state={contextData.defaultchart} />
                                            : null}
                                        {flag === 'donut' ?
                                            <AlphaDashChart obj={donutoption} state={contextData.defaultchart} />
                                            : null}
                                    </> : <div style={{ margin: "auto", position: 'inherit', color: 'black' }}>Not Found</div>
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


