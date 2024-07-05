import { useState } from "react"
import contex from "./Contex"

const ContexState = (props) => {

	const [state, SetState] = useState({
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
		strDesignCodeID: "",
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
		strDayBookValue: "",
		strStateValue: '',
		strMonth: "",
		strFinYear: "",
		strMonthValue: "",
		strDesignCodeValue: "",
		column: 'NetWeight',
		Unity: "G",
		SortBy: "wt-desc",
		SortByLabel:""
	})
	const [tempstate, SettempState] = useState({
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
		strDesignCodeID: "",
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
		strDayBookValue: "",
		strStateValue: '',
		strMonth: "",
		strFinYear: "",
		strMonthValue: "",
		strDesignCodeValue: "",
		column: 'NetWeight',
		Unity: "G",
		SortBy: "wt-desc",
		SortByLabel:""
	})
	const [childFilterShow, setchildFilterShow] = useState(false);
	const [currency, setcurrency] = useState(localStorage.value);
	const [flag, setflag] = useState(0);
	const [flagExcel, setflagExcel] = useState(0);
	const [LazyLoading, setLazyLoading] = useState(0);
	let Index = localStorage.getItem("ThemeIndex")
	const [ThemeIndex, setThemeIndex] = useState(Index)

	return (

		<contex.Provider value={{ThemeIndex, setThemeIndex,setLazyLoading, LazyLoading, setflagExcel, flagExcel, state: state, SetState: SetState, childFilterShow, setchildFilterShow, tempstate, SettempState, currency, setcurrency, flag, setflag }}>

			{props.children}

		</contex.Provider>

	)

}

export default ContexState