import { useState } from "react"
import contex from "./Contex"
import { use } from "echarts"

const ContexState1 = (props) => {

    const [state, SetState] = useState({
        "FromDate": "",
        "Todate": "",
        "strBranchID": "",
        "Unit": "G",
        "Mode": 0
    })

    const [tempstate, SettempState] = useState({
        "FromDate": "",
        "Todate": "",
        "strBranchID": "",
        "Unit": "G",
        "Mode": 0
    })

    const [detailedstate, SetdetailedState] = useState({
        "TravellingTeamID": 0,
        "Mode": 0
    })

    const [billstate, setbillState] = useState({
        "ScheduleID": 0,
        "Mode": 0
    })

    const [currency, setcurrency] = useState(localStorage.value);
    const [filtername, setfiltername] = useState("");



    return (

        <contex.Provider value={{filtername, setfiltername, tempstate, SettempState,  state: state, SetState: SetState, currency, setcurrency, detailedstate, SetdetailedState, billstate, setbillState }}>

            {props.children}

        </contex.Provider>

    )

}

export default ContexState1