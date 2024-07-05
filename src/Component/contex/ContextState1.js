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
        "strDesignCodeID": "",
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
        "SortBy": "wt-desc",
        "SortByLabel": "",
        "Search": "",
        "Grouping": "",
        "strMonth": "",
        "strFinYear": "",
        "Unity": "G"

    })

    const [defaultchart, setDefaultChart] = useState({
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
        "strDesignCodeID": "",
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
        "Grouping": "",
        "SortBy": "wt-desc",
        "SortByLabel": "",
    });

    const [chartImage, setchartImage] = useState({
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
    });

    const [defaultchartFilterName,  setdefaultchartFilterName] = useState("");
    const [TageImageFilterName,  settagImageFilterName] = useState("");
    const [defaultchartValue,  setdefaultchartValue] = useState("");
    const [TageImageValue,  settagImageValue] = useState("");

    let Index = localStorage.getItem("ThemeIndex")
	const [ThemeIndex, setThemeIndex] = useState(Index)
    return (

        <contex.Provider value={{defaultchartValue,setdefaultchartValue,TageImageValue,settagImageValue,setThemeIndex, ThemeIndex, setdefaultchartFilterName, defaultchartFilterName, TageImageFilterName , settagImageFilterName , state: state, SetState: SetState, defaultchart, setDefaultChart, chartImage, setchartImage }}>

            {props.children}

        </contex.Provider>

    )

}

export default ContexState1