import React from 'react';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import { useState, useEffect, useContext } from 'react';
import contex from '../../contex/Contex';
import './../../Assets/css/Custom.css';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'
import DataError from '../../Assets/image/Error.gif'

export default function Main_chart(props) {

    const contextData = useContext(contex);
    const [name, setName] = useState([])
    const [id, setId] = useState([])
    const [weight, setweight] = useState([])
    const [data, setdata] = useState([])
    const [flag, setFlag] = useState('bar');
    const [flagSort, setflagSort] = useState('');
    const [prc, setprc] = useState([]);
    const [flagShowId, setFlagShowId] = useState(true)
    const [componentName, setComponentName] = useState('')
    let input = contextData.state;
    const [loader, setLoader] = useState(true);
    const [dataloader, setdataLoader] = useState(true);
    let percentage;
    

    
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

        input = { ...input, ['Grouping']: props.state.grouping, ['FromDate']: props.state.FromDate, ['ToDate']: props.state.ToDate };


        await post(input, API.GetDetailCommanChart, {}, "post").then((res) => {
            let name = [];
            let weg = [];
            let id1 = [];
            let tempdata = [];
            let tempprc = [];
            if (res.data !== undefined) {
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
                        tempprc.push(res.data.lstResult[i]['Prc']);
                    }
                    setprc(tempprc);
                    setName(name);
                    setweight(weg);
                    setId(id1)
                    setdata(tempdata)
                    setdataLoader(false)

                } else {
                    setdataLoader(true)
                }
            } else {
                alert(res['Error']);
            }
        })

    }

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
    let sliderbol
    if (name.length < 8) {
        sliderbol = false
    } else {
        sliderbol = true
    }
    dividedata(name.length, 100)
    let barHorizontal = {
        themeId: contextData.ThemeIndex,
        charttype: 'round-horizontal-bar',
        height: '100%',
        chartId: 'Mainchart',
        width: '100%',
        Xaxis: name,
        Yaxis: weight,
        // idobj: contextData.defaultchart,
        idkey: props.state.filterKey,
        idlst: id,
        divname: 'flip-card-back',
        sliderflag: sliderbol,
        datazoomlst: [0, 100, 0, percentage],
        prclst:prc,
        tooltip: {
            formatter: '{b}<br> NetWeight - {c}',
            confine: true
        }

    }

    let donutoption = {
        themeId: contextData.ThemeIndex,
        charttype: 'donut',
        height: '100%',
        width: '100%',
        chartId: 'Mainchart',
        propdata: data,
        idkey: props.state.filterKey,
        idlst: id,
        label: {
            show: false,
            position: 'center'
        },
        emphasis: {
            label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold'
            }
        },
        tooltip: {
            formatter: '{b}<br> NetWeight - {c}',
            confine: true
        }
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
    function dividedata(len_of_data, per) {
        console.log(len_of_data,"Len")
        if (len_of_data <= 10) {
            console.log(parseInt(per),"answer");
            percentage = parseInt(per)
        } else {
            dividedata(parseInt(len_of_data/2), parseInt(per/2))
        }
    }
    return (
        <div>
            <div class="title-top-graphdetail">
                <h5>
                    {componentName}
                    <button id='dropdownbutton' className="fa-solid fa-ellipsis-vertical" onClick={handledropdownMenu} ></button>
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
            </div>
            <div class="flip-card">

                <div class="flip-card-inner" id='filp'>
                    <div class="flip-card-front">

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
                                    </> : <div style={{ margin: "auto", position: 'inherit', color: 'black' }}><img id='errorImg'  src={DataError} /></div>
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


