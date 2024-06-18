import React, { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import post from "../../Utility/APIHandle";
import API from "../../Utility/API";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import contex from "../../contex/Contex";
import Commonmodel from "../../CommonModel/CommanModal";
import "../../Assets/css/Custom.css";
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';

export default function MinimumStockHeader() {

    // Variable And UseState
    const [syncDate, setSyncDate] = useState()
    const contexData = useContext(contex);
    const [count, setCount] = useState(uuidv4())
    const [fullscreen, setFullScreen] = useState(false);
    const [filterFlag, setFIlterFlag] = useState(false);
    const [props1, setProps1] = useState();
    const [demo, setDemo] = useState([]);
    const [demoName, setDemoName] = useState([]);
    const metaltypeRef = useRef(null);
    const [Daybook, setDayBook] = useState({});
    const [DefaultDaybook, setDefaultDayBook] = useState();
    const [MetalType, setMetalType] = useState({});
    const [DefaultMetalType, setDefaultMetalType] = useState();
    const animatedComponents = makeAnimated();
    const DaybookRef = useRef(null);
    const dependentfilter = {
        1: ["StrBranchID", API.BranchFilter, "BranchId", "BranchName", "strBranchValue", 1],
        2: ["ItemGroupID", API.itemGroupFilter, "ItemGroupID", "ItemGroupName", "strItemGroupValue", 5],
        3: ["StrProductID", API.productFilter, "ProductId", "ProductName", "strProductValue", 6,],
        4: ["StrItemID", API.itemFilter, "ItemId", "ItemName", "strItemValue", 7],
        5: ["StrSubItemID", API.GetSubItem, "SubItemId", "SubItemName", "strSubItemValue", 8],
    };
    const postData = {
       "FromDate": "2024-04-01",
        "ToDate": "2024-06-07",
        "StrBranchID": "",
        "StrCompanyID": "",
        "StrItemID": "",
        "StrSubItemID": "",
        "MetalType": "",
        "ItemGroupID": "",
        "MonthType": "Q",
        "Unit": "",
        "Mode": 5,
        "strBranchValue":"",
        "strItemGroupValue":"",
        "strProductValue":"",
        "strItemValue":"",
        "strSubItemValue":"",
        "StrProductID":"",
    };
    let FilterData = {
        ...contexData.tempstate,
        ["StrBranchID"]: contexData.tempstate["StrBranchID"],
        ["StrItemID"]: contexData.tempstate["StrItemID"],
        ["StrSubItemID"]: contexData.tempstate["StrSubItemID"],
        ["ItemGroupID"]: contexData.tempstate["ItemGroupID"],
        ["StrProductID"]: contexData.tempstate["StrProductID"],
        ["FromDate"]: contexData.tempstate["FromDate"],
        ["ToDate"]: contexData.tempstate["ToDate"],
        ["strMetalType"]: contexData.tempstate["strMetalType"],
        ["column"]: contexData.tempstate["column"]
    };
    const unitRef = useRef(null);
    const [unit, setUnit] = useState([{ value: 'P', label: 'PIECE' }, { value: 'W', label: 'NET WEIGHT' }]);
    const [Defaultunit, setDefaultUnit] = useState({ value: 'W', label: 'NET WEIGHT' });
    const [percentage_check, setpercentage_check] = useState(false);


    //UseEffect
    useEffect(() => {
        setCurrentDate()
        handleDaybook();
        handleMetaltype();
    }, [])

    useEffect(() => {
        if (contexData.state['column'] === 'Prc') {
            setpercentage_check(true)
        } else {
            setpercentage_check(false)
        }
    }, [contexData.state['column']])

    useEffect(() => {
        var Findex = contexData.tempstate.FilterIndex
    
        if (Findex !== "undefined" && Findex !== 0) {
            for (let index = Findex + 1; index < 5; index++) {
                console.log(dependentfilter[index][0],"asd");
                if (contexData.tempstate[dependentfilter[index][0]].length > 0) {
                    FetchDataDependentAPI(FilterData, index)
                }
            }
        }
    }, [contexData.tempstate.FilterIndex])



    // Functions

    //Description : To handle The Navigation Bar on Right Side
    function handleNavbar() {

        if (document.getElementsByClassName("crancy-close")[0] !== undefined) {
            const element = document.getElementsByClassName("crancy-smenu")[0];
            element.classList.remove("crancy-close");

            const element1 = document.getElementsByClassName("crancy-header")[0];
            element1.classList.remove("crancy-close");

            const element2 = document.getElementsByClassName("crancy-adashboard")[0];
            element2.classList.remove("crancy-close");

            if (document.getElementsByClassName("crancy-adashboard")[1] !== undefined) {
                const element3 = document.getElementsByClassName("crancy-adashboard")[1];
                element3.classList.remove("crancy-close");
            }

        } else {
            const element = document.getElementsByClassName("crancy-smenu")[0];
            element.classList.add("crancy-close");

            const element1 = document.getElementsByClassName("crancy-header")[0];
            element1.classList.add("crancy-close");

            const element2 = document.getElementsByClassName("crancy-adashboard")[0];
            element2.classList.add("crancy-close");

            if (document.getElementsByClassName("crancy-adashboard")[1] !== undefined) {
                const element3 = document.getElementsByClassName("crancy-adashboard")[1];
                element3.classList.add("crancy-close");
            }
        }

    }

    //Description : Handle Currnency Menu Hide and Show on Button Click
    function handleonchangeCurrency() {
        document.getElementById("myDropdown").style.display === "block"
            ? (document.getElementById("myDropdown").style.display = "none")
            : (document.getElementById("myDropdown").style.display = "block");
    }

    //Description : on Currency Chnage it store it into the local storage
    function handleThousand(n) {
        localStorage.setItem("value", n);
        contexData.setcurrency(n);
    }

    //Description : This Fnction handle the pdf download option
    async function downloadPdfDocument() {
        var nameArray = []
        document.getElementById("downloadPdf").disabled = true

        document.getElementById('pdf-div').style.display = "block";

        await htmlToImage.toPng(document.getElementById('rootElementId'))

            .then(function (dataUrl) {

                setCount(count + 1)

                var name = count.toString() + "Dashboard";


                // download(dataUrl, "file1.png")
                post({ "Base64": dataUrl, "Extension": "png", "LoginID": name }, API.uploadImage, {}, "post").then((res) => {
                    if (res.data !== undefined) {
                        nameArray.push(res.data.filename);
                    } else {
                        alert(res['Error']);
                    }
                })
            });

        await htmlToImage.toPng(document.getElementById('pdf-div'))
            .then(function (dataUrl) {
                var name = count.toString() + "filter";
                // download(dataUrl, "file2.png")

                post({ "Base64": dataUrl, "Extension": "png", "LoginID": name }, API.uploadImage, {}, "post").then((res) => {

                    nameArray.push(res.data.filename);

                    post({ "ImageLst": [count.toString() + "filter.png", count.toString() + "Dashboard.png"], "FileName": count.toString() + "aa" }, 'http://103.131.196.61:52202/Common/GetPDFUsingImage', {}, "post").then((res) => {
                        // download("http://192.168.1.208:7000/PDF/5aa.pdf", "dash", "pdf")

                        // const pdfUrl = "http://192.168.1.208:7000/PDF/" + count.toString() + "aa.pdf";

                        const pdfUrl = API.downloadPdf + count.toString() + "aa.pdf";
                        axios.get(pdfUrl, {
                            responseType: 'blob',
                        })
                            .then((res) => {
                                download(res.data, "JSoftDashboard.pdf")
                                document.getElementById("downloadPdf").disabled = false
                            })
                            .catch((e) => {

                                document.getElementById("downloadPdf").disabled = false
                            })

                    });
                })
            });


        setTimeout(() => {
            document.getElementById('pdf-div').style.display = "none";
        }, 100);
    }

    //Description : This function useed to generate the random name of Pdf
    function uuidv4() {
        return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
            (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
        );
    }

    //Description : This Fnction handle the Excel File download option
    function downloadExcelDocument() {
        contexData.setflagExcel(contexData.flagExcel + 1)
    }

    //Description : This Function Handle the full screen functionality
    function Handlefullscreen() {
        if (fullscreen === true) {
            setFullScreen(false);
            document.exitFullscreen();
        } else {
            setFullScreen(true);
            var ele = document.documentElement;
            ele.requestFullscreen();
        }
    }

    //Description : It's handle the modal open functionality
    function handlerOnOpen() {
        setFIlterFlag(true);
    }

    //Description : It's handle the modal close functionality
    function handleOnClose() {
        setFIlterFlag(false);
        var element = document.getElementById("root");
        element.scrollIntoView({ block: 'start' })
    }

    //Description : It's handle the Date Decrease
    function handleArrowLeft(str) {
        if (contexData.tempstate[str] !== "") {
            var ans = ""

            const date = new Date(contexData.tempstate[str]);
            var month = date.getMonth() + 1

            if (date.getDate() === 1) {
                if (month === 1) {
                    ans = (date.getFullYear() - 1).toString() + "-12" + "-31"
                } else {
                    ans = date.getFullYear().toString() + "-" + (month - 1).toString() + "-" + new Date(date.getFullYear(), month - 1, 0).getDate().toString()
                }
            } else {
                ans = date.getFullYear().toString() + "-" + month.toString() + "-" + (date.getDate() - 1).toString()
            }

            var listarr = ans.split("-")

            if (listarr[1].length < 2) {
                listarr[1] = "0" + listarr[1]
            }
            if (listarr[2].length < 2) {
                listarr[2] = "0" + listarr[2]
            }

            ans = listarr[0] + "-" + listarr[1] + "-" + listarr[2];
            // document.getElementById("FromDate").value = ans;
            contexData.SettempState({ ...contexData.tempstate, [str]: ans })
        }

    }

    //Description : It's handle the Date Increase
    function handleArrowRight(str) {
        if (contexData.tempstate[str] !== "") {
            var ans = ""

            const date = new Date(contexData.tempstate[str]);
            var month = date.getMonth() + 1

            if (date.getDate() === new Date(date.getFullYear(), month, 0).getDate()) {
                if (month === 12) {
                    ans = (date.getFullYear() + 1).toString() + "-01" + "-01"
                } else {
                    ans = date.getFullYear().toString() + "-" + (month + 1).toString() + "-01"
                }
            } else {
                ans = date.getFullYear().toString() + "-" + month.toString() + "-" + (date.getDate() + 1).toString()
            }

            var listarr = ans.split("-")

            if (listarr[1].length < 2) {
                listarr[1] = "0" + listarr[1]
            }
            if (listarr[2].length < 2) {
                listarr[2] = "0" + listarr[2]
            }

            ans = listarr[0] + "-" + listarr[1] + "-" + listarr[2];
            // document.getElementById("FromDate").value = ans;
            contexData.SettempState({ ...contexData.tempstate, [str]: ans })
        }
    }

    //Description : It's handle the and set the Date into the temp context
    function handleonchange(e) {
        contexData.SettempState({ ...contexData.tempstate, [e.target.name]: e.target.value });
    }

    //Description : It's handle the and set the ReactSelect DropDown into the temp context (MetalType and Daybook)
    function handleselect(e, selectData) {

        if (selectData.name === 'MetalTypeSelect') {
            if (e.length !== 0) {
                var name = [];
                var val = [];
                setDefaultMetalType(e);
                for (let i = 0; i < e.length; i++) {
                    name.push(e[i]['label'])
                    val.push(e[i]['value'])
                }
                contexData.SettempState({ ...contexData.tempstate, ['strMetalType']: val.toString(), ['strMetalTypeValue']: name.toString() });
            } else {
                // contexData.SettempState({ ...contexData.tempstate, ['strMetalType']: '', ['strMetalTypeValue']: '' });
                setDefaultMetalType([])
            }

        } else {

            if (e.length !== 0) {
                setDefaultDayBook(e);
                var name = [];
                var val = [];
                for (let i = 0; i < e.length; i++) {
                    name.push(e[i]['label'])
                    val.push(e[i]['value'])
                }
                contexData.SettempState({ ...contexData.tempstate, ['strDayBook']: val.toString(), ['strDayBookValue']: name.toString() });
            } else {
                // contexData.SettempState({ ...contexData.tempstate, ['strDayBook']: '', ['strDayBookValue']: '' });
                setDefaultDayBook([])
            }
        }
    }

    //Description : It's handle the value which shown in the filter example :- Supermall 8+
    function formatedValue(str) {
        if (str !== undefined) {
            if (str === '' || str.split(',').length === 1) {
                return str
            } else {
                return str.split(',')[0].toString() + ' ' + (str.split(',').length - 1).toString() + '+'
            }
        }
    }

    //Description : It's handle the common modal props and send the value into the comman modal and open it when input is clicked
    function HandleOnClickComman(IndexNo) {
        console.log(contexData.tempstate,"keyone");
        let myvalue = contexData.tempstate[dependentfilter[IndexNo][0]];
        let myvalueName = contexData.tempstate[dependentfilter[IndexNo][4]];
        console.log(myvalue,"qw");
        let demoo = [];
        let demooName = [];
        demoo.push(myvalue.split(","));
        demooName.push(myvalueName.split(","));

        let newarr = [];
        let newarrName = [];

        if (
            dependentfilter[IndexNo][0] !== "strCity" && dependentfilter[IndexNo][0] !== "strSaleAging"
        ) {
            for (let index = 0; index < demoo[0].length; index++) {
                if (demoo[0].indexOf("") === -1) {

                    newarr.push(parseInt(demoo[0][index]));
                    newarrName.push(demooName[0][index]);
                }
            }
        } else {

            for (let index = 0; index < demoo[0].length; index++) {
                if (demoo[0].indexOf("") === -1) {

                    newarr.push(demoo[0][index]);
                    newarrName.push(demooName[0][index]);
                }
            }
        }
        setDemo(newarr);
        setDemoName(newarrName);

        setProps1({
            api: dependentfilter[IndexNo][1],
            labelname: dependentfilter[IndexNo][0],
            id: dependentfilter[IndexNo][2],
            name: dependentfilter[IndexNo][3],
            LabelValue: dependentfilter[IndexNo][4],
            FilterIndex: IndexNo,
            grid: dependentfilter[IndexNo][5]
        });
        contexData.setchildFilterShow(true);
    }

    //Description : It's handle the Unit DropDown
    function handleselectUnit(e) {
        if (e !== null) {
            setDefaultUnit(e);
            contexData.SettempState({ ...contexData.tempstate, ['Unit']: e.value })
        }
    }

    //Description : It's handle the reset filter functionality
    function handleOnReset() {
        contexData.SettempState(postData);
        FilterData = contexData.tempstate
        metaltypeRef.current.clearValue()
        unitRef.current.clearValue()
        setDefaultMetalType([])
        setDefaultUnit([])
    }

    //Description : It's handle the Apply filter functionality
    function handleApplyFilter() {
        if (JSON.stringify(contexData.state) !== JSON.stringify(FilterData)) {

            contexData.SetState(FilterData);
            handleOnClose();
        }
        else {
            handleOnClose();
        }
        var element = document.getElementById("root");
        element.scrollIntoView({ block: 'start' })
        localStorage.setItem('load', '0')
        // contexData.SetState(FilterData);
        // handleOnClose();
    }

    //Description : It's handle the percentage checkbox functionality
    function handlePercentageShow(e) {
        if (e.target.checked) {
            contexData.SettempState({ ...contexData.tempstate, ['column']: 'Prc' })
        } else {
            contexData.SettempState({ ...contexData.tempstate, ['column']: 'NetWeight' })
        }
    }

    //Description : It's fetch the Syncy Data Functionality
    async function getSyncDate() {
        await post({}, API.GetDefaultScreenData, {}, 'post')
            .then((res) => {
                if (res.data !== undefined) {
                    setSyncDate(res.data.lstResult[0].SyncDate)
                } else {
                    alert(res['Error']);
                }
            })
    }

    //Description : It's set the current date into the to date
    function setCurrentDate() {
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate
        if (month < 10) {
            if (day < 10) {
                currentDate = `${year}-0${month}-0${day}`;
            }
            else {
                currentDate = `${year}-0${month}-${day}`;
            }
        }
        else {
            if (day < 10) {
                currentDate = `${year}-0${month}-0${day}`;
            }
            else {
                currentDate = `${year}-0${month}-${day}`;
            }
        }
        contexData.SettempState({ ...contexData.tempstate, ['ToDate']: currentDate });
    }

    //Description : It's fetch the Metal Type
    function handleMetaltype() {
        let temp1 = [];

        post(postData, API.GetMetalType, {}, "post").then((res) => {
            if (res.data !== undefined) {
                for (let index = 0; index < res.data.lstResult.length; index++) {
                    temp1.push({
                        label: res.data.lstResult[index].MetalTypeDesc,
                        value: res.data.lstResult[index].MetalType,
                    });
                }
                setMetalType(temp1);
            } else {
                alert(res['Error']);
            }
        });
    }

    //Description : It's fetch the Daybook
    function handleDaybook() {
        let temp1 = [];

        post(postData, API.GetDayBook, {}, "post").then((res) => {
            if (res.data !== undefined) {
                for (let index = 0; index < res.data.lstResult.length; index++) {
                    temp1.push({
                        value: (res.data.lstResult[index].DayBookID).toString(),
                        label: res.data.lstResult[index].Daybook,
                    });
                }

                setDayBook(temp1);
            } else {
                alert(res['Error']);
            }
        });
    }

    //Description : It's used for depandancy filter api
    function FetchDataDependentAPI(input, FilterIndex) {

        post(input, dependentfilter[FilterIndex][1], {}, 'post').then((res) => {


            var TempDataID = contexData.tempstate[dependentfilter[FilterIndex][0]].split(',')
            var TempDataValue = contexData.tempstate[dependentfilter[FilterIndex][4]].split(',')

            if (res.data !== undefined) {

                var resultID = res.data.lstResult.map(Item => Item[dependentfilter[FilterIndex][2]].toString())
                var temarrayID = []
                var temparryValue = []
                for (let index = 0; index < TempDataID.length; index++) {
                    if (resultID.indexOf(TempDataID[index]) >= 0) {
                        temparryValue.push(TempDataValue[index])
                        temarrayID.push(TempDataID[index])
                    }
                }
            } else {
                alert(res['Error'])
            }
            if (temarrayID !== undefined) {
                contexData.SettempState({ ...contexData.tempstate, [dependentfilter[FilterIndex][0]]: temarrayID.toString(), [dependentfilter[FilterIndex][4]]: temparryValue.toString(), ['FilterIndex']: 0 })
            } else {
                contexData.SettempState({ ...contexData.tempstate, [dependentfilter[FilterIndex][0]]: '', [dependentfilter[FilterIndex][4]]: '', ['FilterIndex']: 0 })
            }
        })
    }


    //Return
    return (
        <>
            <header className="crancy-header">
                <div className="container g-0">
                    <div className="row g-0">
                        <div className="col-12">
                            <div className="crancy-header__inner">
                                <div className="crancy-header__middle">
                                    <div className="crancy-header__left">
                                        <div className="crancy-header__nav-bottom">
                                            <div className="logo crancy-sidebar-padding">
                                                <a className="crancy-logo">
                                                    <img
                                                        className="crancy-logo__main"
                                                        src="image/logo/jsoft-initial.png"
                                                        alt="#"
                                                    />
                                                    <img
                                                        className="crancy-logo__main--dark"
                                                        src="image/logo/jsoft-initial.png"
                                                        alt="#"
                                                    />
                                                    <img
                                                        className="crancy-logo__main--small"
                                                        src="image/logo/jsoft-initial.png"
                                                        alt="#"
                                                    />
                                                    <img
                                                        className="crancy-logo__main--small--dark"
                                                        src="image/logo/jsoft-initial.png"
                                                        alt="#"
                                                    />
                                                </a>
                                            </div>
                                        </div>

                                        <div
                                            id="crancy__sicon"
                                            className="crancy__sicon close-icon" onClick={handleNavbar}
                                        >
                                            <i
                                                className="fas fa-angle-right"
                                                style={{ color: "#ffffff" }}
                                            ></i>
                                        </div>
                                    </div>
                                    <div className="geex-content__header">
                                        <div className="geex-content__header__content">
                                            <div className="geex-content__header__customizer">
                                                <h2 className="geex-content__header__title">
                                                    Minimum Stock
                                                </h2>
                                            </div>
                                        </div>
                                        <div className="geex-content__header__action">
                                            <div className="geex-content__header__action__wrap">
                                                <ul className="geex-content__header__quickaction">
                                                    <li className="from-date-to-date-header__quickaction">
                                                        <h5>
                                                            <span className="text-muted">
                                                                { }
                                                            </span>
                                                        </h5>
                                                    </li>
                                                    <li className="geex-content__header__quickaction__item">
                                                        <div
                                                            className="geex-content__header__quickaction__link crancy-header__alarm top-header-icon"
                                                            id="Currency_Button"
                                                        >
                                                            <div className="button-open">
                                                                {localStorage.getItem("value") === "" ||
                                                                    localStorage.getItem("value") === null ? (
                                                                    <>

                                                                        <button
                                                                            class="dropbtn"
                                                                            onClick={handleonchangeCurrency}>
                                                                            <i class='fas fa-rupee-sign'></i>
                                                                            <p class='value_name'> Default</p>
                                                                        </button>
                                                                        {/* <button class="fa fa-inr" aria-hidden="true" src={currency} className="dropbtn" onClick={handleonchangeCurrency} > </button> */}
                                                                    </>
                                                                ) : null}
                                                                {localStorage.getItem("value") === "k" ? (
                                                                    <button
                                                                        className="dropbtn"
                                                                        onClick={handleonchangeCurrency}>
                                                                        <i class='fas fa-rupee-sign'></i>
                                                                        <p class='value_name'>
                                                                            Thousand
                                                                        </p>
                                                                    </button>
                                                                ) : null}
                                                                {localStorage.getItem("value") === "l" ? (
                                                                    <button
                                                                        className="dropbtn"
                                                                        onClick={handleonchangeCurrency}
                                                                    >
                                                                        <i class='fas fa-rupee-sign'></i>
                                                                        <p class='value_name'>
                                                                            Lakh
                                                                        </p>
                                                                    </button>
                                                                ) : null}
                                                                {localStorage.getItem("value") === "m" ? (
                                                                    <button
                                                                        className="dropbtn"
                                                                        onClick={handleonchangeCurrency}>
                                                                        <i class='fas fa-rupee-sign'></i>
                                                                        <p class='value_name'>
                                                                            Million
                                                                        </p>
                                                                    </button>
                                                                ) : null}
                                                                {localStorage.getItem("value") === "c" ? (
                                                                    <button
                                                                        className=" dropbtn"
                                                                        onClick={handleonchangeCurrency}>
                                                                        <i class='fas fa-rupee-sign'></i>
                                                                        <p class='value_name'>
                                                                            Crore
                                                                        </p>
                                                                    </button>
                                                                ) : null}
                                                                {localStorage.getItem("value") === "b" ? (
                                                                    <button
                                                                        className="dropbtn"
                                                                        onClick={handleonchangeCurrency}
                                                                    >
                                                                        <i class='fas fa-rupee-sign'></i>
                                                                        <p class='value_name'>
                                                                            Billion
                                                                        </p>
                                                                    </button>
                                                                ) : null}
                                                            </div>
                                                        </div>
                                                        <div id="myDropdown" class="dropdown-content">
                                                            <a
                                                                id="default"
                                                                onClick={() => handleThousand("")}
                                                            >
                                                                Default
                                                            </a>
                                                            <hr className="custom-hr" />
                                                            <a
                                                                id="thousand"
                                                                onClick={() => handleThousand("k")}
                                                            >
                                                                Thousand
                                                            </a>
                                                            <hr className="custom-hr" />
                                                            <a id="lakh" onClick={() => handleThousand("l")}>
                                                                Lakh
                                                            </a>
                                                            <hr className="custom-hr" />
                                                            <a
                                                                id="million"
                                                                onClick={() => handleThousand("m")}
                                                            >
                                                                Million
                                                            </a>
                                                            <hr className="custom-hr" />
                                                            <a id="crore" onClick={() => handleThousand("c")}>
                                                                Crore
                                                            </a>
                                                            <hr className="custom-hr" />
                                                            <a
                                                                id="billion"
                                                                onClick={() => handleThousand("b")}
                                                            >
                                                                Billion
                                                            </a>
                                                        </div>
                                                    </li>
                                                    {/* <li className="geex-content__header__quickaction__item">
                                                        <div
                                                            className="geex-content__header__quickaction__link  geex-btn__customizer"
                                                            id="Filtermodal"
                                                        >
                                                            <i id="downloadPdf" className="fa-solid fa-file-pdf" onClick={downloadPdfDocument} > </i>
                                                        </div>
                                                    </li>
                                                    <li className="geex-content__header__quickaction__item">
                                                        <div
                                                            className="geex-content__header__quickaction__link  geex-btn__customizer"
                                                            id="Filtermodal"
                                                        >
                                                            <i id="downloadExcel" className="fa-solid fa-file-excel" onClick={downloadExcelDocument} > </i>
                                                        </div>
                                                    </li> */}


                                                    <li className="geex-content__header__quickaction__item">
                                                        <div
                                                            className="geex-content__header__quickaction__link crancy-header__alarm top-header-icon"
                                                            id="crancy-header__full"
                                                        >
                                                            <i
                                                                className="fas fa-expand-alt"
                                                                onClick={Handlefullscreen}
                                                            ></i>
                                                        </div>
                                                    </li>
                                                    <li className="geex-content__header__quickaction__item">
                                                        <div
                                                            className="geex-content__header__quickaction__link  geex-btn__customizer"
                                                            id="Filtermodal"
                                                        >
                                                            <i
                                                                className="fas fa-filter"
                                                                onClick={handlerOnOpen}
                                                            ></i>
                                                        </div>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {
                contexData.childFilterShow === true ? (
                    <Commonmodel modelprops={props1} prdemo={demo} prdemoName={demoName} />
                ) : (
                    <Modal
                        className="modal-dialog modal-dialog-centered  modal-xl modal-filter"
                        show={filterFlag}
                        onHide={handleOnClose}
                        backdrop="static"
                        keyboard={false}
                        size="xl"
                    >
                        <Modal.Header class="modal-header">
                            <h5 class="modal-title filter-modal-title"><i class="fa-solid fa-filter"></i> Filter By</h5>
                            <button class="geex-btn geex-btn__customizer-close" onClick={handleOnClose}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"
                                        fill="#ffffff" />
                                    <path
                                        d="M18 7.05L16.95 6L12 10.95L7.05 6L6 7.05L10.95 12L6 16.95L7.05 18L12 13.05L16.95 18L18 16.95L13.05 12L18 7.05Z"
                                        fill="#ffffff" fill-opacity="0.8" />
                                </svg>
                            </button>

                        </Modal.Header>


                        <Modal.Body className="shedule">
                            <div class="container">
                                <div class="card-graph-detail">
                                    <div class="row">
                                        <div class="filter-top">
                                            <form class="form-group">
                                                <div class="row">
                                                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                                        <div class="card-filter-contain top-card-filter">
                                                            <label for="sel1" class="form-label">
                                                                From Date
                                                            </label>
                                                            <div class="date-picker-filter">

                                                                <i class="fa-solid fa-chevron-left date-arrow-left" id="arrow-left" onClick={() => { handleArrowLeft('FromDate') }} />
                                                                <input
                                                                    class="form-control  date-spacing "
                                                                    type="date"
                                                                    onChange={handleonchange}
                                                                    name="FromDate"
                                                                    id="FromDate"
                                                                    value={contexData.tempstate["FromDate"]}
                                                                />
                                                                {/* <i class="fa-solid fa-chevron-right"></i>fa-solid fa-caret-right date-arrow-right */}
                                                                <i class="fa-solid fa-chevron-right date-arrow-right" onClick={() => { handleArrowRight('FromDate') }} />
                                                            </div>

                                                        </div>
                                                    </div>
                                                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                                        <div class="card-filter-contain top-card-filter">
                                                            <label for="sel1" class="form-label">
                                                                To Date
                                                            </label>
                                                            <div class="date-picker-filter">

                                                                <i class="fa-solid fa-chevron-left date-arrow-left" id="arrow-left" onClick={() => { handleArrowLeft('ToDate') }} />
                                                                <input
                                                                    class="form-control"
                                                                    type="date"
                                                                    onChange={handleonchange}
                                                                    name="ToDate"
                                                                    value={contexData.tempstate["ToDate"]}
                                                                    id="ToDate"

                                                                />
                                                                <i class="fa-solid fa-chevron-right date-arrow-right" onClick={() => { handleArrowRight('ToDate') }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="col-xl-4 col-lg-4 col-md-6 col-sm-12">
                                                        <div class="card-filter-contain top-card-filter">
                                                            <form class="from-group">
                                                                <label for="sel1" class="form-label">
                                                                    Metal Type
                                                                </label>


                                                                <Select
                                                                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                                                                    name="MetalTypeSelect"
                                                                    closeMenuOnSelect={false}
                                                                    isMulti
                                                                    ref={metaltypeRef}
                                                                    options={MetalType}
                                                                    className="basic-multi-select"
                                                                    classNamePrefix="select"
                                                                    onChange={handleselect}
                                                                    components={animatedComponents}
                                                                    defaultValue={DefaultMetalType}
                                                                    placeholder="Select..."
                                                                    styles={{
                                                                        control: (provided, state) => ({
                                                                            ...provided,
                                                                            // height: '45px',
                                                                            // overflow:'auto',
                                                                            borderRadius: '10px'
                                                                        }),
                                                                    }}
                                                                />
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="container">
                                <form>
                                    <div class="row">
                                        <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                                            <div class="card-filter-contain">
                                                <i class="fa-solid fa-building"></i>
                                                <label for="sel1" class="form-label">
                                                    &nbsp;Branch
                                                </label>
                                                {/* <Select

                                                    isMulti
                                                    name="branchSelect"

                                                    options={branch}

                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={handleselect}

                                                    components={animatedComponents}
                                                    closeMenuOnSelect={false}
                                                /> */}
                                                <input
                                                    className="filter-input" id='123' value={formatedValue(contexData.tempstate["strBranchValue"])}
                                                    onClick={() => {
                                                        HandleOnClickComman(1);
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                                            <div class="card-filter-contain">
                                                <i class="fas fa-chart-area"></i>
                                                <label for="sel1" class="form-label">
                                                    &nbsp;Item Group
                                                </label>

                                                <input
                                                    className="filter-input" value={formatedValue(contexData.tempstate["strItemGroupValue"])}
                                                    onClick={() => {
                                                        HandleOnClickComman(2);
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                                            <div class="card-filter-contain">
                                                <i class="fas fa-boxes"></i>
                                                <label for="sel1" class="form-label">
                                                    &nbsp;Product
                                                </label>
                                                {/* <Select
                                                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                                                    isMulti
                                                    name="productSelect"

                                                    options={product}

                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={handleselect}

                                                    components={animatedComponents}
                                                    closeMenuOnSelect={false}
                                                /> */}
                                                <input
                                                    className="filter-input" value={formatedValue(contexData.tempstate["strProductValue"])}
                                                    onClick={() => {
                                                        HandleOnClickComman(3);
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                                            <div class="card-filter-contain">
                                                <i class="fas fa-project-diagram"></i>
                                                <label for="sel1" class="form-label">
                                                    &nbsp;Item
                                                </label>
                                                {/* <Select
                                                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                                                    isMulti
                                                    name="itemSelect"

                                                    options={item}

                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={handleselect}

                                                    components={animatedComponents}
                                                    closeMenuOnSelect={false}
                                                /> */}
                                                <input
                                                    className="filter-input" value={formatedValue(contexData.tempstate["strItemValue"])}
                                                    onClick={() => {
                                                        HandleOnClickComman(4);
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                                            <div class="card-filter-contain">
                                                <i class="fas fa-th-list"></i>
                                                <label for="sel1" class="form-label">
                                                    &nbsp;Sub-Item
                                                </label>
                                                {/* <Select
                                                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                                                    isMulti
                                                    name="subItemSelect"

                                                    options={subItem}

                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={handleselect}

                                                    components={animatedComponents}
                                                    closeMenuOnSelect={false}
                                                /> */}
                                                <input
                                                    className="filter-input" value={formatedValue(contexData.tempstate["strSubItemValue"])}
                                                    onClick={() => {
                                                        HandleOnClickComman(5);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                        <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                                            <div class="card-filter-contain">
                                                <i class="fas fa-calendar-alt"></i>
                                                <label for="sel1" class="form-label">
                                                    &nbsp;Units
                                                </label>

                                                <Select
                                                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                                                    name="unit"
                                                    ref={unitRef}
                                                    options={unit}
                                                    className="basic-multi-select"
                                                    classNamePrefix="select"
                                                    onChange={handleselectUnit}
                                                    components={animatedComponents}
                                                    closeMenuOnSelect={true}
                                                    defaultValue={Defaultunit}
                                                    styles={{
                                                        control: (provided, state) => ({
                                                            ...provided,
                                                            height: '45px',
                                                            borderRadius: '10px'
                                                        }),
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </Modal.Body>

                        <Modal.Footer class="modal-footer">
                            <button
                                type="button"
                                class="filter-footer-button"
                                data-mdb-ripple-init
                                onClick={handleOnReset}
                            >
                                {" "}
                                Reset{" "}
                            </button>
                            <button
                                type="button"
                                class="filter-footer-button"
                                data-mdb-ripple-init
                                onClick={handleApplyFilter}
                            >
                                Apply
                            </button>
                            <div class="form-check checkbox-filter">

                                <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="flexCheckChecked"
                                    onChange={handlePercentageShow}
                                    defaultChecked={percentage_check}
                                />
                                <label
                                    class="form-check-label checkbox-filter-label text-muted"
                                    for="flexCheckChecked"
                                >
                                    (% Set as Default)
                                </label>
                            </div>
                        </Modal.Footer>
                    </Modal>
                )
            }
        </>
    )
}
