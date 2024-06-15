import React, { useRef } from 'react';
import API from '../../Utility/API';
import post from '../../Utility/APIHandle'
import { useState, useEffect, useContext } from 'react';
import contex from '../../contex/Contex';
import ReactApexChart from 'react-apexcharts';
import './../../Assets/css/Custom.css';
import axios from 'axios';
import { AlphaDashChart } from 'alpha-echart-library/dist/cjs'

export default function Default_chart(props) {
    const contextData = useContext(contex);
    const [name, setName] = useState([]);
    const [id, setid] = useState([]);
    const [weight, setweight] = useState([])
    const checkref = useRef(null)
    const [data, setdata] = useState([])
    const [loader, setLoader] = useState(true);
    let filtername = contextData.defaultchartFilterName;
    let input = contextData.defaultchart;
    const [flagSort, setflagSort] = useState('');
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
        if (props.graph !== '' && props.graph.group !== undefined) {
            // setflagSort('wt-desc')
            fetchData()
            console.log(props, "changed");

        }
    }, [props])
    useEffect(() => {
        if (flagSort !== '') {
            fetchSortData()
        }
    }, [flagSort])

    useEffect(() => {
        // setflagSort('wt-desc')
        console.log(input, "changed");
        fetchData()
    }, [input])



    async function fetchData() {

        if (props.graph.group !== undefined) {
            input = { ...input, ['Grouping']: props.graph.group, ['SortByLabel']: props.graph.column, ['FromDate']: props.Date.FromDate, ['ToDate']: props.Date.ToDate };


            console.log(input, "ggg");
            await post(input, API.CommonChart, {}, "post").then((res) => {


                if (res.data !== undefined) {
                    if (res.data.lstResult !== 0) {
                        let name = [];
                        let weg = [];
                        let id1 = [];
                        for (let i = 0; i < res.data.lstResult.length; i++) {
                            if (res.data.lstResult[i][props.graph.column] !== null) {

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

                        setName(name);
                        setweight(weg);
                        setid(id1);
                        setdata(res.data.lstResult)
                        setLoader(false)
                    }
                } else {
                    alert(res['Error']);
                }
            })
        }


    }

    function flip() {
        if (document.getElementById("filp").style.transform === "rotateY(360deg)" || document.getElementById("filp").style.transform === "") {

            document.getElementById("filp").style.transform = "rotateY(180deg)"
        } else {

            document.getElementById("filp").style.transform = "rotateY(360deg)"
        }

    }
    document.getElementById("root").addEventListener("click", function (event) {

        if (event.target.className !== 'fa-solid fa-arrow-down-short-wide sort-icon-second-screen' && event.target.className !== 'fa-solid fa-ellipsis-vertical') {
            if (document.getElementById("myDropdowniconSecondScreen") !== null) {
                document.getElementById("myDropdowniconSecondScreen").style.display = "none"
                document.getElementById("sorticonsecondScreenDefault").style.display = "none"
            }
        }

    });

    function handleSorting() {
        document.getElementById("sorticonsecondScreenDefault").style.display === "block" ? document.getElementById("sorticonsecondScreenDefault").style.display = "none" : document.getElementById("sorticonsecondScreenDefault").style.display = "block";
        const tag_array = document.getElementsByClassName('dropdown-contenticon-second-screen')

        if (tag_array !== undefined) {
            for (let i = 0; i < tag_array.length; i++) {

                if (document.getElementsByClassName('dropdown-contenticon-second-screen')[i]['id'] !== 'sorticonsecondScreenDefault') {
                    document.getElementsByClassName('dropdown-contenticon-second-screen')[i].style.display = 'none';

                }
            }
        }
    }

    function handleclickSort(e) {
        if (e.target.id !== 'sorticonsecondScreenDefault' && e.target.id !== '') {
            setflagSort(e.target.id)
        }
    }

    async function fetchSortData() {
        var inputForSort = { ...input, 'SortByLabel': props.graph.column, 'SortBy': flagSort, ['Grouping']: props.graph.group }
        console.log(inputForSort, "dfdf");
        await post(inputForSort, API.CommonChart, {}, "post").then((res) => {


            if (res.data !== undefined) {
                if (res.data.lstResult !== 0) {


                    let name = [];
                    let weg = [];
                    let id1 = [];

                    for (let i = 0; i < res.data.lstResult.length; i++) {
                        if (res.data.lstResult[i][props.graph.column] !== null) {
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

                    setName(name);
                    setweight(weg);
                    setid(id1);
                    setdata(res.data.lstResult)
                    setLoader(false)
                }
            } else {
                alert(res['Error']);
            }
        })
    }
    let barHorizontal = {
        themeId: contextData.ThemeIndex,
        charttype: 'round-horizontal-bar',
        height: '450%',
        chartId: 'Main_chart_secondScreen123',
        width: '100%',
        Xaxis: name,
        Yaxis: weight,
        // idobj: contextData.defaultchart,
        idkey: props.graph.filter_key2,
        idlst: id,
        divname: 'topimg-gd'
    }
    let updatedstate = (<AlphaDashChart obj={JSON.parse(JSON.stringify(barHorizontal))} state={contextData.chartImage} />).props.state
    console.log(props.graph.filter_key1, props.graph.filter_key2);
    function divonclick() {
        if (updatedstate.filtername !== undefined) {
            console.log(updatedstate.filtername, "wesdsd");
            let filtername = updatedstate.filtername
            contextData.settagImageFilterName(filtername);
        }
        contextData.setchartImage({ ...defaultImageData, [props.graph.filter_key1]: contextData.defaultchart[props.graph.filter_key1], [props.graph.filter_key2]: updatedstate[props.graph.filter_key2] })
    }
    return (
        <div>
            <div class="title-top-graphdetail-withoutcolor">
                <h5>{props.graph.componentName}  {filtername !== "" ? "( " + filtername + " )" : null}</h5>
                <i className="fa-solid fa-arrow-down-short-wide sort-icon-second-screen" onClick={handleSorting} ></i>
            </div>
            <div id="sorticonsecondScreenDefault" className="dropdown-contenticon-second-screen" onClick={handleclickSort}>
                {flagSort === 'Label' ? <><a id='Label'>Sort by {props.graph.componentName !== undefined ? (props.graph.componentName).split(' ')[0] : ""} ASC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label'>Sort by {props.graph.componentName !== undefined ? (props.graph.componentName).split(' ')[0] : ""} ASC&nbsp;</a><hr className='custom-hr' /></>}
                {flagSort === 'Label-desc' ? <><a id='Label-desc'>Sort by {props.graph.componentName !== undefined ? (props.graph.componentName).split(' ')[0] : ""} DESC&nbsp;<i class="fa-solid fa-check"></i></a><hr className='custom-hr' /></> : <><a id='Label-desc'>Sort by {props.graph.componentName !== undefined ? (props.graph.componentName).split(' ')[0] : ""} DESC&nbsp;</a><hr className='custom-hr' /></>}
                {flagSort === 'wt' ? <><a id='wt'>Sort by Weight ASC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt'>Sort by Weight ASC&nbsp;</a><hr className='custom-hr' /> </>}
                {flagSort === 'wt-desc' ? <><a id='wt-desc'>Sort by Weight DESC&nbsp; <i class="fa-solid fa-check"></i></a><hr className='custom-hr' /> </> : <><a id='wt-desc'>Sort by Weight DESC&nbsp;</a><hr className='custom-hr' /> </>}
            </div>
            {loader === false ?
                <div class="graphdetailcards graphdetail-secondcard">
                    <div class="topimg-gd" onClick={divonclick}>
                        <AlphaDashChart obj={JSON.parse(JSON.stringify(barHorizontal))} state={contextData.chartImage} />
                    </div>
                </div> :
                <div class="graphdetailcards graphdetail-secondcard">
                    <div class="topimg-gd" style={{ height: 500 }}>
                        <div class="dot-spinner" style={{ margin: "auto", position: 'inherit' }} >
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                            <div class="dot-spinner__dot"></div>
                        </div>
                    </div>
                </div>
            }
        </div>

    )
}
