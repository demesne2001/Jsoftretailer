import { useState } from "react"
import contex from "./Contex"


const DynmicChartDetailContext = (props) => {
    const [state, SetState] = useState({
        DependancyID: "",
        ID: 0
    })
    return (

        <contex.Provider value={{ state: state, SetState: SetState }}>

            {props.children}

        </contex.Provider>

    )
}
export default DynmicChartDetailContext