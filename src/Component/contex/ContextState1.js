import { useState } from "react"
import contex from "./Contex"

const ContexState1 = (props) => {

    const [state, SetState] = useState({
        "strBranch": "",
        "strCompanyID": "",
        "strState": "",
        "strCity": "",
        "strItem": "",
        "strSubItem": "",
        "strItemGroup": "",
        "strRegionID": "",
        "strItemSubitem": "",
        "strPurchaseParty": "",
        "strSalesParty": "",
        "strSaleman": "",
        "strProduct": "",
        "strDesignCatalogue": "",
        "strSaleAging": "",
        "strModeofSale": "",
        "strTeamModeofSale": "",
        "FromDate": "",
        "ToDate": "",
        "strMetalType": "",
        "strDayBook": "",
        "PageNo": 1,
        "PageSize": 10,
        "Search": "",
        "Grouping": ""
    })


    return (

        <contex.Provider value={{ state: state, SetState: SetState }}>

            {props.children}

        </contex.Provider>

    )

}

export default ContexState1