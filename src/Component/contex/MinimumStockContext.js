import React, { useState } from 'react';
import contex from "./Contex"

export default function MinimumStockContext(props) {
    const [state, SetState] = useState({
        "FromDate": "2024-04-01",
        "ToDate": "2024-06-07",
        "StrBranchID": "",
        "StrProductID": "",
        "StrCompanyID": "",
        "StrItemID": "",
        "StrSubItemID": "",
        "MetalType": "",
        "ItemGroupID": "",
        "MonthType": "Q",
        "Unit": "",
        "Mode": 5,
        "strBranchValue": "",
        "strItemGroupValue": "",
        "strProductValue": "",
        "strItemValue": "",
        "strSubItemValue": ""
    })
    const [tempstate, SettempState] = useState({
        "FromDate": "2024-04-01",
        "ToDate": "2024-06-07",
        "StrBranchID": "",
        "StrProductID": "",
        "StrCompanyID": "",
        "StrItemID": "",
        "StrSubItemID": "",
        "MetalType": "",
        "ItemGroupID": "",
        "MonthType": "",
        "Unit": "",
        "Mode": 5,
        "strBranchValue": "",
        "strItemGroupValue": "",
        "strProductValue": "",
        "strItemValue": "",
        "strSubItemValue": "",
        "StrProductValue": ""
    })

    const [detailstate, SetDetailState] = useState({
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
        "StrProductID": "",
        "Mode": 5
    })

    const [detailsecondstate, SetDetailsecondState] = useState({
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
        "StrProductID": "",
        "Mode": 5
    })

    const [detailTirdstate, SetDetailThirdState] = useState({
        "FromDate": "2024-04-01",
        "ToDate": "2024-06-07",
        "SubItemID": ''
    })


    const [childFilterShow, setchildFilterShow] = useState(false);
    const [currency, setcurrency] = useState(localStorage.value);
    const [flag, setflag] = useState(0);
    const [flagExcel, setflagExcel] = useState(0);
    const [LazyLoading, setLazyLoading] = useState(0);
    const [filtername, setfiltername] = useState("");
    const [filternamesubitemrange, setfilternamesubitemrange] = useState("");
    const [filtervalue, setfiltervalue] = useState("");
    const [filtervaluesubitemrange, setfiltervaluesubitemrange] = useState("");    return (

        <contex.Provider value={{filtervalue,setfiltervalue,filtervaluesubitemrange,setfiltervaluesubitemrange,filternamesubitemrange, setfilternamesubitemrange,setfiltername , filtername, detailTirdstate, SetDetailThirdState, SetDetailsecondState, detailsecondstate, detailstate, SetDetailState, setLazyLoading, LazyLoading, setflagExcel, flagExcel, state: state, SetState: SetState, childFilterShow, setchildFilterShow, tempstate, SettempState, currency, setcurrency, flag, setflag }}>

            {props.children}

        </contex.Provider>

    )
}
