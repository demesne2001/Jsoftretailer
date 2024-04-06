import { useState } from "react"
import contex from "./Contex"

const ContexState = (props) => {

    const [state,SetState] = useState({
		strBranch: "",
		strState: "",
		strCity: "",
		strItem: "",
		strSubItem: "",
		strItemGroup: "",
		strItemSubitem: "",
		strPurchaseParty: "",
		strSalesParty: "",
		strSaleman: "",
		strProduct: "",
		strDesignCatalogue: "",
		strSaleAging: "",
		strModeofSale: "",
		strTeamModeofSale: "",
		strRegionID: "",
		FromDate: "",
		ToDate: "",
		strMetalType: "",
		strDayBook: "",
		PageNo: 0,
		PageSize: 9999,
		Search: "",
		Grouping: "",
		FilterIndex: "",
		strBranchValue: "",
		strItemValue: "",
		strSubItemValue: "",
		strItemGroupValue: "",
		strItemSubitemValue: "",
		strPurchasePartyValue: "",
		strSalesPartyValue: "",
		strSalemanValue: "",
		strProductValue: "",
		strDesignCatalogueValue: "",
		strSaleAgingValue: "",
		strModeofSaleValue: "",
		strTeamModeofSaleValue: "",
		strRegionValue: "",
		strDayBookValue:"",
		strStateValue:''
		
    })
	const [tempstate,SettempState] = useState({
		strBranch: "",
		strState: "",
		strCity: "",
		strItem: "",
		strSubItem: "",
		strItemGroup: "",
		strItemSubitem: "",
		strPurchaseParty: "",
		strSalesParty: "",
		strSaleman: "",
		strProduct: "",
		strDesignCatalogue: "",
		strSaleAging: "",
		strModeofSale: "",
		strTeamModeofSale: "",
		strRegionID: "",
		FromDate: "",
		ToDate: "",
		strMetalType: "",
		strDayBook: "",
		PageNo: 0,
		PageSize: 9999,
		Search: "",
		Grouping: "",
		FilterIndex: "",
		strBranchValue: "",
		strItemValue: "",
		strSubItemValue: "",
		strItemGroupValue: "",
		strItemSubitemValue: "",
		strPurchasePartyValue: "",
		strSalesPartyValue: "",
		strSalemanValue: "",
		strProductValue: "",
		strDesignCatalogueValue: "",
		strSaleAgingValue: "",
		strModeofSaleValue: "",
		strTeamModeofSaleValue: "",
		strRegionValue: "",
		strDayBookValue:"",
		strStateValue:''
})
	const [childFilterShow, setchildFilterShow] = useState(false);
	const [currency, setcurrency] = useState("");

    return (

       <contex.Provider value={{state:state, SetState:SetState, childFilterShow, setchildFilterShow, tempstate, SettempState, currency, setcurrency}}>

        {props.children}

       </contex.Provider>

    )

}

export default ContexState