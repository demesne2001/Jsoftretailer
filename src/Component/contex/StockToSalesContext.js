import { useState } from "react"
import contex from "./Contex"

const StockToSalesContext = (props) => {
    const [state, SetState] = useState({
        "FromDate": "2024-04-01",
        "ToDate": "2024-06-07",
        "StrBranchID": "",
        "StrProductID":"",
        "StrCompanyID": "",
        "StrItemID": "",
        "StrSubItemID": "",
        "MetalType": "",
        "ItemGroupID": "",
        "MonthType": "Q",
        "Unit": "W",
        "Mode": 5,
        "strBranchValue":"",
        "strItemGroupValue":"",
        "strProductValue":"",
        "strItemValue":"",
        "strSubItemValue":"",
        "period": ""
    })
    const [tempstate, SettempState] = useState({
        "FromDate": "2024-04-01",
        "ToDate": "2024-06-07",
        "StrBranchID": "",
        "StrProductID":"",
        "StrCompanyID": "",
        "StrItemID": "",
        "StrSubItemID": "",
        "MetalType": "",
        "ItemGroupID": "",
        "MonthType": "Q",
        "Unit": "W",
        "Mode": 5,
        "strBranchValue":"",
        "strItemGroupValue":"",
        "strProductValue":"",
        "strItemValue":"",
        "strSubItemValue":"",
        "StrProductValue":"",
        "period": ""
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
        "Unit": "W",
        "strProductID":"",
        "Mode": 5,
        "period": ""
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
        "Unit": "W",
        "strProductID":"",
        "Mode": 5,
        "period": ""
    })
    const [Monthtype, setMonthtype] = useState("Q")
    const [childFilterShow, setchildFilterShow] = useState(false);
    const [currency, setcurrency] = useState(localStorage.value);
    const [flag, setflag] = useState(0);
    const [flagExcel, setflagExcel] = useState(0);
    const [LazyLoading, setLazyLoading] = useState(0);
    const [filtername, setfiltername] = useState("");
    const [filtervalue, setfiltervalue] = useState("");
    return (

        <contex.Provider value={{filtervalue,setfiltervalue, setMonthtype, Monthtype, filtername, setfiltername, SetDetailsecondState, detailsecondstate, detailstate, SetDetailState, setLazyLoading, LazyLoading, setflagExcel, flagExcel, state: state, SetState: SetState, childFilterShow, setchildFilterShow, tempstate, SettempState, currency, setcurrency, flag, setflag }}>

            {props.children}

        </contex.Provider>

    )

}

export default StockToSalesContext