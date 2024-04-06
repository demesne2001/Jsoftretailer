import React, { useEffect, useState, useContext } from "react";
import axios from "axios";

import Modal from "react-bootstrap/Modal";
import post from "../../Utility/APIHandle";
import API from "../../Utility/API";

import Select from "react-select";
import makeAnimated from "react-select/animated";
import contex from "../../contex/Contex";
import Commonmodel from "../../CommonModel/CommanModal";
import currency from "../../Assets/img/svg/currency.svg";
import "../../Assets/css/Custom.css";
import reactSelect from "react-select";

// import Commonmodel from '../../CommonModel/CommanModal';

export default function Header() {
  const [fullscreen, setFullScreen] = useState(false);
  const contexData = useContext(contex);
  let FilterData = {
    ...contexData.tempstate,
    ["strBranch"]: contexData.tempstate["strBranch"],
    ["strState"]: contexData.tempstate["strState"],
    ["strCity"]: contexData.tempstate["strCity"],
    ["strItem"]: contexData.tempstate["strItem"],
    ["strSubItem"]: contexData.tempstate["strSubItem"],
    ["strItemGroup"]: contexData.tempstate["strItemGroup"],
    ["strItemSubitem"]: contexData.tempstate["strItemSubitem"],
    ["strPurchaseParty"]: contexData.tempstate["strPurchaseParty"],
    ["strSalesParty"]: contexData.tempstate["strSalesParty"],
    ["strSaleman"]: contexData.tempstate["strSaleman"],
    ["strProduct"]: contexData.tempstate["strProduct"].slice(0, -1),
    ["strDesignCatalogue"]: contexData.tempstate["strDesignCatalogue"],
    ["strSaleAging"]: contexData.tempstate["strSaleAging"].slice(0, -1),
    ["strModeofSale"]: contexData.tempstate["strModeofSale"],
    ["strTeamModeofSale"]: contexData.tempstate["strTeamModeofSale"],
    ["FromDate"]: contexData.tempstate["FromDate"],
    ["ToDate"]: contexData.tempstate["ToDate"],
    ["strMetalType"]: contexData.tempstate["strMetalType"],
    ["strDayBook"]: contexData.tempstate["strDayBook"],
  };

  const animatedComponents = makeAnimated();

  const [filterFlag, setFIlterFlag] = useState(false);
  const [fullScreenFlag, setFullscreenFlag] = useState(false);

  const [postData, setPostData] = useState({
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
  });

  const dependentfilter = {
    1: [
      "strBranch",
      API.BranchFilter,
      "BranchId",
      "BranchName",
      "strBranchValue",
    ],
    2: [
      "strRegionID",
      API.GetRegion,
      "RegionID",
      "RegionName",
      "strRegionValue",
    ],
    3: ["strState", API.GetState, "StateID", "StateName", "strStateValue"],
    4: ["strCity", API.GetCity, "CityName", "CityName", "strCity"],
    5: [
      "strItemGroup",
      API.itemGroupFilter,
      "ItemGroupID",
      "ItemGroupName",
      "strItemGroupValue",
    ],
    6: [
      "strProduct",
      API.productFilter,
      "ProductId",
      "ProductName",
      "strProductValue",
    ],
    7: ["strItem", API.itemFilter, "ItemId", "ItemName", "strItemValue"],
    8: [
      "strSubItem",
      API.GetSubItem,
      "SubItemId",
      "SubItemName",
      "strSubItemValue",
    ],
    9: [
      "strItemSubitem",
      API.GetItemWithSubitem,
      "ItemSubID",
      "SubItemWithStyleName",
      "strItemSubitemValue",
    ],
    10: [
      "strDesignCatalogue",
      API.GetDesignCatalogue,
      "DesignCatalogID",
      "DesignNo",
      "strDesignCatalogueValue",
    ],
    11: [
      "strSaleman",
      API.GetSaleman,
      "SalesmanID",
      "SalesmanName",
      "strSalemanValue",
    ],
    12: [
      "strModeofSale",
      API.GetModeOfSalesWise,
      "ModeOfSaleID",
      "ModeOfSaleName",
      "strModeofSaleValue",
    ],
    13: [
      "strTeamModeofSale",
      API.GetTeamModeofSale,
      "TeamModeofSaleID",
      "TeamModeofSaleName",
      "strTeamModeofSaleValue",
    ],
    14: [
      "strSaleAging",
      API.GetSalesAging,
      "Caption",
      "Caption",
      "strSaleAging",
    ],
    15: [
      "strPurchaseParty",
      API.GetPurchaseParty,
      "DesignCatalogID",
      "DesignNo",
      "strPurchasePartyValue",
    ],
    16: [
      "strSalesParty",
      API.GetSalesParty,
      "AccountId",
      "AccountName",
      "strSalesPartyValue",
    ],
  };
  const [demo, setDemo] = useState([]);
  const [demoName, setDemoName] = useState([]);
  const [state, setState] = useState({});
  const [branch, setBranch] = useState({});
  const [region, setRegion] = useState({});
  const [city, setCity] = useState({});
  const [itemGroup, setItemGroup] = useState({});
  const [product, setProduct] = useState({});
  const [item, setItem] = useState({});
  const [subItem, setSubItem] = useState({});
  const [itemSubitem, setItemSubItem] = useState({});
  const [design, Setdesign] = useState({});
  const [salesman, setSalesMan] = useState({});
  const [Daybook, setDayBook] = useState({});
  const [DefaultDaybook, setDefaultDayBook] = useState({});
  const [MetalType, setMetalType] = useState({});
  const [DefaultMetalType, setDefaultMetalType] = useState({});
  const [purchaseParty, setPurcharseParty] = useState({});
  const [salesParty, setSalesParty] = useState({});
  const [props1, setProps1] = useState();
  useEffect(() => {
    console.log(contexData.tempstate);
		var Findex = contexData.tempstate.FilterIndex
		console.log("useEffet1");
		
		if (Findex !== "undefined" && Findex !== 0) {
			if (Findex >= 1 && Findex < 9) {
				for (let index = Findex+1; index < 10; index++) {
					console.log(index,'indexno')
					if (contexData.tempstate[dependentfilter[index][0]].length > 0) {
						FetchDataDependentAPI(FilterData, index)
					}
				}
			}
			else if (Findex > 9 && Findex < 13) {
				for (let index = Findex; index < 16; ++index) {
					if (contexData.tempstate[dependentfilter[index][0]].length > 0) {
						FetchDataDependentAPI(FilterData, index)
					}
				}
			}
		}
	}, [contexData.FilterIndex])

	// useEffect(() => {
	// 	console.log("useEffet3");

	// 	for (let index = 1; index <= dependentfilter.length; index++) {
	// 		FetchDataDependentAPI(FilterData, index)
	// 	}

	// }, [contexData.tempstate.strBranchID, contexData.tempstate.CompanyID])

	function FetchDataDependentAPI(input, FilterIndex) {
		console.log("FetchDataDependentAPI",contexData.tempstate[dependentfilter[FilterIndex][4]]);
		post(input, dependentfilter[FilterIndex][1], [], 'post').then((res) => {
			console.log("response",res);
			console.log("index",contexData.tempstate[dependentfilter[FilterIndex][4]])
			var TempDataID = contexData.tempstate[dependentfilter[FilterIndex][0]].split(',')
			var TempDataValue = contexData.tempstate[dependentfilter[FilterIndex][4]].split(',')
			console.log("hii", res.data.lstResult);
			var resultID = res.data.lstResult.map(Item => Item[dependentfilter[FilterIndex][2]].toString())
			// var resultValue=res.lstResult.map(Item=>Item[dependentfilter[FilterIndex][4]])
			console.log('TempDatabefore', TempDataID)
			console.log('resultID', resultID)
			console.log("contexData.tempstate before",contexData.tempstate);
			var temarrayID=[]
			var temparryValue=[]
			for (let index = 0; index < TempDataID.length; index++) {
				console.log('delete before log',resultID.indexOf(TempDataID[index]),TempDataID[index])
				if (resultID.indexOf(TempDataID[index]) >= 0) {	
					console.log('delete index',TempDataID[index])
					// TempDataID.splice(TempDataID.indexOf(TempDataID[index]),1)
					// TempDataValue.splice(TempDataValue.indexOf(TempDataValue[index]),1)
					// delete TempDataID[index]
					// delete TempDataValue[index]
					temparryValue.push(TempDataValue[index])
					temarrayID.push(TempDataID[index])
				}
			}
			
			
			console.log('TempData After', temarrayID)			
			
			
			contexData.Settempstate({ ...contexData.tempstate, [dependentfilter[FilterIndex][0]]: temarrayID.toString(), [dependentfilter[FilterIndex][4]]: temparryValue.toString(),['FilterIndex']:0 })
			console.log("contexData.tempstate After ",contexData.tempstate);
			
		})
	}

  //   useEffect(() => {
  //     // getdataState();
  //     // getdataBranch();
  //     // getdataRegion();
  //     // getdatacity();
  //     // getdataitemgroup();
  //     // getdataproduct();
  //     // getdataitemgroup();
  //     // getdataitem();
  //     // getdatasubitem();
  //     // getdataitemsubitem();
  //     // getdatadesign();
  //     // getdatasalesman();
  //     // // getdatapurchaseparty()
  //     // getdatasalesparty();
  //   }, [postData]);

  function HandleOnClickComman(IndexNo) {
    let myvalue = contexData.tempstate[dependentfilter[IndexNo][0]];
    let myvalueName = contexData.tempstate[dependentfilter[IndexNo][4]];
    console.log("myval", myvalue);
    let demoo = [];
    let demooName = [];
    demoo.push(myvalue.split(","));
    demooName.push(myvalueName.split(","));
    console.log("DEMOOOOO",demoo[0].length);
    let newarr = [];
    let newarrName = [];

    if (
      dependentfilter[IndexNo][0] !== "strCity" && dependentfilter[IndexNo][0] !== "strSaleAging"
    ) {
      for (let index = 0; index < demoo[0].length; index++) {
        if (demoo[0].indexOf("") === -1) {
          console.log(demoo[0][index]);
          newarr.push(parseInt(demoo[0][index]));
          newarrName.push(demooName[0][index]);
        }
      }
    } else {
      
      for (let index = 0; index < demoo[0].length; index++) {
        if (demoo[0].indexOf("") === -1) {
          console.log(demoo[0][index]);
          newarr.push(demoo[0][index]);
          newarrName.push(demooName[0][index]);
        }
      }
    }
    setDemo(newarr);
    setDemoName(newarrName);
    console.log(newarr);
    setProps1({
      api: dependentfilter[IndexNo][1],
      labelname: dependentfilter[IndexNo][0],
      id: dependentfilter[IndexNo][2],
      name: dependentfilter[IndexNo][3],
      LabelValue: dependentfilter[IndexNo][4],
      FilterIndex: IndexNo,
    });
    contexData.setchildFilterShow(true);
  }

  useEffect(()=>{
    handleDaybook();
    handleMetaltype();
    console.log(contexData.tempstate,"useffect temp");
  },[])

  function handlerOnOpen() {
    setFIlterFlag(true);
  }

  function handleOnClose() {
    setFIlterFlag(false);
  }

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

  function getdataState() {
    let temp1 = [];

    // console.log('branch postdata' ,postData)

    post(postData, API.stateFilter, {}, "post").then((res) => {
      for (let index = 0; index < res.data.lstResult.length; index++) {
        temp1.push({
          value: res.data.lstResult[index].StateID,
          label: res.data.lstResult[index].StateName,
        });
      }
      setState(temp1);
    });
  }

  function handleMetaltype() {
    let temp1 = [];

    post(postData, API.GetMetalType, {}, "post").then((res) => {
      for (let index = 0; index < res.data.lstResult.length; index++) {
        temp1.push({
          value: res.data.lstResult[index].ModelTypeId,
          label: res.data.lstResult[index].ModelTypeName,
        });
      }
      setMetalType(temp1);
    });
  }
  function handleDaybook() {
    let temp1 = [];

    post(postData, API.GetDayBook, {}, "post").then((res) => {
      for (let index = 0; index < res.data.lstResult.length; index++) {
        temp1.push({
          value: res.data.lstResult[index].DayBookId,
          label: res.data.lstResult[index].DayBookName,
        });
      }
      setDayBook(temp1);
    });
  }
  function handleselect(e, selectData) {
    
    if (selectData.name === 'MetalTypeSelect') {
      setDefaultMetalType(e);
      contexData.Settempstate({ ...contexData.tempstate, ['strMetalType']: e.value, ['strMetalTypeValue']: e.label });
    } else {
      setDefaultDayBook(e);
      contexData.Settempstate({ ...contexData.tempstate, ['strDayBook']: e.value, ['strDayBookValue']: e.label });
    }
  }

  // function getdataBranch() {
  //   let temp1 = [];

  //   post(postData, API.BranchFilter, {}, "post").then((res) => {
  //     for (let index = 0; index < res.data.lstResult.length; index++) {
  //       temp1.push({
  //         value: res.data.lstResult[index].BranchId,
  //         label: res.data.lstResult[index].BranchName,
  //       });
  //     }
  //     setBranch(temp1);
  //   });
  // }

  // function getdataRegion() {
  //   let temp1 = [];

  //   post(postData, API.regionFilter, {}, "post").then((res) => {
  //     for (let index = 0; index < res.data.lstResult.length; index++) {
  //       temp1.push({});
  //     }
  //     setRegion(temp1);
  //   });
  // }

  // function getdatacity() {
  //   let temp1 = [];

  //   post(postData, API.cityFilter, {}, "post").then((res) => {
  //     for (let index = 0; index < res.data.lstResult.length; index++) {
  //       temp1.push({
  //         value: res.data.lstResult[index].CityName,
  //         label: res.data.lstResult[index].CityName,
  //       });
  //     }
  //     setCity(temp1);
  //   });
  // }

  // function getdataitemgroup() {
  //   let temp1 = [];

  //   post(postData, API.itemGroupFilter, {}, "post").then((res) => {
  //     for (let index = 0; index < res.data.lstResult.length; index++) {
  //       temp1.push({
  //         value: res.data.lstResult[index].ItemGroupID,
  //         label:
  //           res.data.lstResult[index].GroupName +
  //           "(" +
  //           res.data.lstResult[index].ShortName +
  //           ")",
  //       });
  //     }
  //     setItemGroup(temp1);
  //   });
  // }

  // function getdataproduct() {
  //   let temp1 = [];

  //   post(postData, API.productFilter, {}, "post").then((res) => {
  //     for (let index = 0; index < res.data.lstResult.length; index++) {
  //       temp1.push({
  //         value: res.data.lstResult[index].ProductId,
  //         label: res.data.lstResult[index].ProductName,
  //       });
  //     }
  //     setProduct(temp1);
  //   });
  // }

  // function getdataitem() {
  //   let temp1 = [];

  //   post(postData, API.itemFilter, {}, "post").then((res) => {
  //     for (let index = 0; index < res.data.lstResult.length; index++) {
  //       temp1.push({
  //         value: res.data.lstResult[index].ItemId,
  //         label: res.data.lstResult[index].ItemName,
  //       });
  //     }
  //     setItem(temp1);
  //   });
  // }

  // function getdatasubitem() {
  //   let temp1 = [];

  //   post(postData, API.GetSubItem, {}, "post").then((res) => {
  //     for (let index = 0; index < res.data.lstResult.length; index++) {
  //       temp1.push({
  //         value: res.data.lstResult[index].SubItemId,
  //         label: res.data.lstResult[index].SubItemName,
  //       });
  //     }
  //     setSubItem(temp1);
  //   });
  // }

  // function getdataitemsubitem() {
  //   let temp1 = [];

  //   post(postData, API.GetItemWithSubitem, {}, "post").then((res) => {
  //     for (let index = 0; index < res.data.lstResult.length; index++) {
  //       temp1.push({
  //         value: res.data.lstResult[index].ItemSubID,
  //         label: res.data.lstResult[index].SubItemWithStyleName,
  //       });
  //     }
  //     setItemSubItem(temp1);
  //   });
  // }

  // function getdatadesign() {
  //   let temp1 = [];

  //   post(postData, API.GetDesignCatalogue, {}, "post").then((res) => {
  //     for (let index = 0; index < res.data.lstResult.length; index++) {
  //       temp1.push({
  //         value: res.data.lstResult[index].DesignCatalogID,
  //         label: res.data.lstResult[index].DesignNo,
  //       });
  //     }
  //     Setdesign(temp1);
  //   });
  // }

  // function getdatasalesman() {
  //   let temp1 = [];

  //   post(postData, API.GetSaleman, {}, "post").then((res) => {
  //     for (let index = 0; index < res.data.lstResult.length; index++) {
  //       temp1.push({
  //         value: res.data.lstResult[index].SalesmanID,
  //         label: res.data.lstResult[index].SalesmanName,
  //       });
  //     }
  //     setSalesMan(temp1);
  //   });
  // }

  // function getdatasalesparty() {
  //   let temp1 = [];

  //   post(postData, API.GetSalesParty, {}, "post").then((res) => {
  //     for (let index = 0; index < res.data.lstResult.length; index++) {
  //       temp1.push({
  //         value: res.data.lstResult[index].AccountId,
  //         label: res.data.lstResult[index].AccountName,
  //       });
  //     }
  //     setSalesParty(temp1);
  //   });
  // }

  // function getdatapurchaseparty(){

  // 	let temp1 = []

  // 	post(postData,API.GetSaleman,{},'post')
  // 	.then((res)=>{

  // 		for (let index = 0; index < res.data.lstResult.length; index++) {

  // 			temp1.push({
  // 				value: res.data.lstResult[index].SalesmanID,
  // 				label:res.data.lstResult[index].SalesmanName
  // 			})
  // 		}
  // 		setSalesMan(temp1)
  // 	})

  // }

  function handleonchange(e) {
    contexData.SettempState({ ...contexData.tempstate, [e.target.name]: e.target.value });
  }

  // function handleselect(e, selectData) {
  //   // function to handle selected data and update respactive postdata items

  //   if (selectData.name === "branchSelect") {
  //     let temp = "";

  //     for (let index = 0; index < e.length; index++) {
  //       if (index + 1 === e.length) {
  //         temp = temp + e[index].value;
  //       } else {
  //         temp = temp + e[index].value + ",";
  //       }
  //     }
  //     // console.log(temp)
  //     setPostData({ ...postData, ["strBranch"]: temp });
  //   } else if (selectData.name === "regionSelect") {
  //     let temp = "";

  //     for (let index = 0; index < e.length; index++) {
  //       if (index + 1 === e.length) {
  //         temp = temp + e[index].value;
  //       } else {
  //         temp = temp + e[index].value + ",";
  //       }
  //     }

  //     // setPostData({...postData,['setBranch']:temp})
  //   } else if (selectData.name === "stateSelect") {
  //     let temp = "";

  //     for (let index = 0; index < e.length; index++) {
  //       if (index + 1 === e.length) {
  //         temp = temp + e[index].value;
  //       } else {
  //         temp = temp + e[index].value + ",";
  //       }
  //     }

  //     setPostData({ ...postData, ["strState"]: temp });
  //   } else if (selectData.name === "citySelect") {
  //     let temp = "";

  //     for (let index = 0; index < e.length; index++) {
  //       if (index + 1 === e.length) {
  //         temp = temp + e[index].value;
  //       } else {
  //         temp = temp + e[index].value + ",";
  //       }
  //     }

  //     setPostData({ ...postData, ["strCity"]: temp });
  //   } else if (selectData.name === "itemGroupSelect") {
  //     let temp = "";

  //     for (let index = 0; index < e.length; index++) {
  //       if (index + 1 === e.length) {
  //         temp = temp + e[index].value;
  //       } else {
  //         temp = temp + e[index].value + ",";
  //       }
  //     }

  //     setPostData({ ...postData, ["strItemGroup"]: temp });
  //   } else if (selectData.name === "productSelect") {
  //     let temp = "";

  //     for (let index = 0; index < e.length; index++) {
  //       if (index + 1 === e.length) {
  //         temp = temp + e[index].value;
  //       } else {
  //         temp = temp + e[index].value + ",";
  //       }
  //     }

  //     setPostData({ ...postData, ["strProduct"]: temp });
  //   } else if (selectData.name === "itemSelect") {
  //     let temp = "";

  //     for (let index = 0; index < e.length; index++) {
  //       if (index + 1 === e.length) {
  //         temp = temp + e[index].value;
  //       } else {
  //         temp = temp + e[index].value + ",";
  //       }
  //     }

  //     setPostData({ ...postData, ["strItem"]: temp });
  //   } else if (selectData.name === "subItemSelect") {
  //     let temp = "";

  //     for (let index = 0; index < e.length; index++) {
  //       if (index + 1 === e.length) {
  //         temp = temp + e[index].value;
  //       } else {
  //         temp = temp + e[index].value + ",";
  //       }
  //     }

  //     setPostData({ ...postData, ["strSubItem"]: temp });
  //   } else if (selectData.name === "itemSubItemSelect") {
  //     let temp = "";

  //     for (let index = 0; index < e.length; index++) {
  //       if (index + 1 === e.length) {
  //         temp = temp + e[index].value;
  //       } else {
  //         temp = temp + e[index].value + ",";
  //       }
  //     }

  //     setPostData({ ...postData, ["strItemSubitem"]: temp });
  //   } else if (selectData.name === "designSelect") {
  //     let temp = "";

  //     for (let index = 0; index < e.length; index++) {
  //       if (index + 1 === e.length) {
  //         temp = temp + e[index].value;
  //       } else {
  //         temp = temp + e[index].value + ",";
  //       }
  //     }

  //     setPostData({ ...postData, ["strDesignCatalogue"]: temp });
  //   } else if (selectData.name === "salesmanSelect") {
  //     let temp = "";

  //     for (let index = 0; index < e.length; index++) {
  //       if (index + 1 === e.length) {
  //         temp = temp + e[index].value;
  //       } else {
  //         temp = temp + e[index].value + ",";
  //       }
  //     }

  //     setPostData({ ...postData, ["strSaleman"]: temp });
  //   }
  // }

  function handleApplyFilter() {
    contexData.SetState(FilterData);
    handleOnClose();
  }

  function handleDesignCommanModal() {
    let myvalue = contexData.tempstate["strItemSubitem"];

    let demoo = [];
    demoo.push(myvalue.split(","));

    let newarr = [];

    for (let index = 0; index < demoo[0].length; index++) {
      if (demoo[0].indexOf("") === -1) {
        newarr.push(parseInt(demoo[0][index]));
      }
    }
    setDemo(newarr);
    setProps1({
      api: API.GetItemWithSubitem,
      labelname: "strItemSubitem",
      id: "ItemSubID",
      name: "SubItemWithStyleName",
    });
    contexData.setchildFilterShow(true);
  }

  function handlePurchaseCommanModal() {
    let myvalue = contexData.tempstate["strPurchaseParty"];

    let demoo = [];
    demoo.push(myvalue.split(","));

    let newarr = [];

    for (let index = 0; index < demoo[0].length; index++) {
      if (demoo[0].indexOf("") === -1) {
        newarr.push(parseInt(demoo[0][index]));
      }
    }
    setDemo(newarr);
    setProps1({
      api: API.GetPurchaseParty,
      labelname: "strPurchaseParty",
      id: "DesignCatalogID",
      name: "DesignNo",
    });
    contexData.setchildFilterShow(true);
  }

  function handleSalesCommanModal() {
    let myvalue = contexData.tempstate["strSalesParty"];

    let demoo = [];
    demoo.push(myvalue.split(","));

    let newarr = [];

    for (let index = 0; index < demoo[0].length; index++) {
      if (demoo[0].indexOf("") === -1) {
        newarr.push(parseInt(demoo[0][index]));
      }
    }
    setDemo(newarr);
    setProps1({
      api: API.GetSalesParty,
      labelname: "strSalesParty",
      id: "AccountId",
      name: "AccountName",
    });
    contexData.setchildFilterShow(true);
  }

  function handleDesignCatalogueCommanModal() {
    let myvalue = contexData.tempstate["strDesignCatalogue"];

    let demoo = [];
    demoo.push(myvalue.split(","));

    let newarr = [];

    for (let index = 0; index < demoo[0].length; index++) {
      if (demoo[0].indexOf("") === -1) {
        newarr.push(parseInt(demoo[0][index]));
      }
    }
    setDemo(newarr);
    setProps1({
      api: API.GetDesignCatalogue,
      labelname: "strDesignCatalogue",
      id: "DesignCatalogID",
      name: "DesignNo",
    });
    contexData.setchildFilterShow(true);
  }

  function handleThousand(n) {
    localStorage.setItem("value", n);
    contexData.setcurrency(n);
  }
  function handleonchangeCurrency() {
    document.getElementById("myDropdown").style.display === "block"
      ? (document.getElementById("myDropdown").style.display = "none")
      : (document.getElementById("myDropdown").style.display = "block");
  }

  window.onclick = function (event) {
    console.log(event.target.className);
    if (event.target.className !== "dropbtn") {
      if (
        document.getElementsByClassName("dropdown-content")[0] !== undefined ||
        document.getElementsByClassName("dropdown-content")[1] !== undefined
      ) {
        console.log("hii");
        document.getElementsByClassName("dropdown-content")[0].style.display =
          "none";
      }
    }
  };

  function formatedValue(str) {
		if (str !== undefined) {
			if (str === '' || str.split(',').length === 1) {
				return str
			} else {
				return str.split(',')[0].toString() + ' ' + (str.split(',').length - 1).toString() + '+'
			}
		}
	}

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
                      className="crancy__sicon close-icon"
                    >
                      <i
                        className="fas fa-angle-left"
                        style={{ color: "#ffffff" }}
                      ></i>
                    </div>
                  </div>
                  <div className="geex-content__header">
                    <div className="geex-content__header__content">
                      <div className="geex-content__header__customizer">
                        <h2 className="geex-content__header__title">
                          Sales Efficiency Analysis Dashboard
                        </h2>
                      </div>
                    </div>
                    <div className="geex-content__header__action">
                      <div className="geex-content__header__action__wrap">
                        <ul className="geex-content__header__quickaction">
                          <li className="from-date-to-date-header__quickaction">
                            <h5>
                              Synchronize-Date :{" "}
                              <span className="text-muted">
                                01/03/2023 11:53:00
                              </span>
                            </h5>
                          </li>
                          <li className="geex-content__header__quickaction__item">
                            <div
                              className="geex-content__header__quickaction__link crancy-header__alarm top-header-icon"
                              id="crancy-header__full"
                            >
                              <div className="button-open">
                                {localStorage.getItem("value") === "" ||
                                localStorage.getItem("value") === undefined ? (
                                  <>
                                    <img
                                      src={currency}
                                      className="dropbtn"
                                      onClick={handleonchangeCurrency}
                                    />
                                  </>
                                ) : null}
                                {localStorage.getItem("value") === "k" ? (
                                  <button
                                    className="dropbtn"
                                    onClick={handleonchangeCurrency}
                                  >
                                    Thousand
                                  </button>
                                ) : null}
                                {localStorage.getItem("value") === "l" ? (
                                  <button
                                    className="dropbtn"
                                    onClick={handleonchangeCurrency}
                                  >
                                    Lakh
                                  </button>
                                ) : null}
                                {localStorage.getItem("value") === "m" ? (
                                  <button
                                    className="dropbtn"
                                    onClick={handleonchangeCurrency}
                                  >
                                    Million
                                  </button>
                                ) : null}
                                {localStorage.getItem("value") === "c" ? (
                                  <button
                                    className="dropbtn"
                                    onClick={handleonchangeCurrency}
                                  >
                                    Crore
                                  </button>
                                ) : null}
                                {localStorage.getItem("value") === "b" ? (
                                  <button
                                    className="dropbtn"
                                    onClick={handleonchangeCurrency}
                                  >
                                    Billion
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
                          <li className="geex-content__header__quickaction__item">
                            <div className="geex-content__header__quickaction__link">
                              <i className="fas fa-sync"></i>
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
      {contexData.childFilterShow === true ? (
        <Commonmodel modelprops={props1} prdemo={demo} prdemoName={demoName} />
      ) : (
        <Modal
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-xl modal-filter"
          show={filterFlag}
          onHide={handleOnClose}
          backdrop="static"
          keyboard={false}
          size="xl"
        >
          {/* <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false"
		aria-labelledby="staticBackdropLabel" aria-hidden="true"> */}

          {/* <div class="modal-dialog modal-dialog-c`entered modal-dialog-scrollable modal-xl modal-filter" id="staticBackdrop" data-bs-backdrop="static"  data-bs-keyboard="false" aria-labelledby="staticBackdropLabel" aria-hidden="true"> */}
          <div class="modal-content">
            <Modal.Header class="modal-body-header" closeButton>
            <Modal.Header >
											<div class="geex-customizer__header">
												<h4 class="geex-customizer__title">Filter By</h4>
												<div class="crancy-color2__fill filter-close-icon"  onClick={handleOnClose}>
                        <i class="fa-solid fa-xmark"></i>
												</div>
											</div>
										</Modal.Header>
            </Modal.Header>

            <Modal.Body class="modal-body">
              <div class="container">
                <div class="card-graph-detail">
                  <div class="row">
                    <div class="filter-top">
                      <form class="form-group">
                        <div class="row">
                          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                            <div class="card-filter-contain top-card-filter">
                              <label for="sel1" class="form-label">
                                From Date
                              </label>
                              <input
                                class="form-control  date-spacing"
                                type="date"
                                onChange={handleonchange}
                                name="FromDate"
                              />
                            </div>
                          </div>
                          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                            <div class="card-filter-contain top-card-filter">
                              <label for="sel1" class="form-label">
                                To Date
                              </label>
                              <input
                                class="form-control"
                                type="date"
                                onChange={handleonchange}
                                name="ToDate"
                              />
                            </div>
                          </div>
                          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                            <div class="card-filter-contain top-card-filter">
                              <form class="from-group">
                                <label for="sel1" class="form-label">
                                  Metal Type
                                </label>
                                {/* <select
                                  class="form-select form-control filter-header-dropdown"
                                  aria-label="Default select example"
                                >
                                  <option selected>Select Metal Type</option>
                                  <option value="1">One</option>
                                  <option value="2">Two</option>
                                  <option value="3">Three</option>
                                </select> */}
                                 <Select
                                  // defaultValue={[colourOptions[2], colourOptions[3]]}
                                  name="MetalTypeSelect"
                                  options={MetalType}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  onChange={handleselect}
                                  components={animatedComponents}
                                  closeMenuOnSelect={false}
                                  defaultValue={DefaultMetalType}
                                  placeholder="Select..."
                                  styles={{
                                    control: (provided, state) => ({
                                      ...provided,
                                      height: '45px',
                                      borderRadius:'10px'
                                    }),
                                  }}
                                /> 
                              </form>
                            </div>
                          </div>
                          <div class="col-xl-3 col-lg-3 col-md-6 col-sm-12">
                            <div class="card-filter-contain top-card-filter">
                              <form class="from-group">
                                <label for="sel1" class="form-label">
                                  Day Book Selection
                                </label>
                                <Select
                                  // defaultValue={[colourOptions[2], colourOptions[3]]}
                                  name="DayBookSelect"
                                  options={Daybook}
                                  className="basic-multi-select"
                                  classNamePrefix="select"
                                  onChange={handleselect}
                                  components={animatedComponents}
                                  closeMenuOnSelect={false}
                                  defaultValue={DefaultDaybook}
                                  styles={{
                                    control: (provided, state) => ({
                                      ...provided,
                                      height: '45px',
                                      borderRadius:'10px'
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
                          Branch
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
                          value={formatedValue(contexData.tempstate["strBranchValue"])}
                          onClick={() => {
                            HandleOnClickComman(1);
                          }}
                        />
                      </div>
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <div class="card-filter-contain">
                        <i class="fas fa-globe"></i>
                        <label for="sel1" class="form-label">
                          Region{" "}
                        </label>
                        {/* <Select
                          // defaultValue={[colourOptions[2], colourOptions[3]]}
                          isMulti
                          name="regionSelect"
                          options={region}
                          className="basic-multi-select"
                          classNamePrefix="select"
                          onChange={handleselect}
                          components={animatedComponents}
                          closeMenuOnSelect={false}
                        /> */}
                        <input
                          value={formatedValue(contexData.tempstate["strRegionIDValue"])}
                          onClick={() => {
                            HandleOnClickComman(2);
                          }}
                        />
                      </div>
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <div class="card-filter-contain">
                        <i class="fas fa-map-marker-alt"></i>
                        <label for="sel1" class="form-label">
                          State
                        </label>

                        {/* <Select
														// defaultValue={[colourOptions[2], colourOptions[3]]}
														isMulti
														name="stateSelect"

														options={state}

														className="basic-multi-select"
														classNamePrefix="select"
														onChange={handleselect}

														components={animatedComponents}
														closeMenuOnSelect={false}
													/> */}
                        <input
                          value={formatedValue(contexData.tempstate["strStateValue"])}
                          onClick={() => {
                            HandleOnClickComman(3);
                          }}
                        />
                      </div>
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <div class="card-filter-contain">
                        <i class="fas fa-city"></i>
                        <label for="sel1" class="form-label">
                          City
                        </label>
                        {/* <Select
														// defaultValue={[colourOptions[2], colourOptions[3]]}
														isMulti
														name="citySelect"

														options={city}

														className="basic-multi-select"
														classNamePrefix="select"
														onChange={handleselect}

														components={animatedComponents}
														closeMenuOnSelect={false}
													/> */}
                        <input
                          value={formatedValue(contexData.tempstate["strCity"])}
                          onClick={() => {
                            HandleOnClickComman(4);
                          }}
                        />
                      </div>
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <div class="card-filter-contain">
                        <i class="fas fa-chart-area"></i>
                        <label for="sel1" class="form-label">
                          Item Group
                        </label>
                        {/* <Select
														// defaultValue={[colourOptions[2], colourOptions[3]]}
														isMulti
														name="itemGroupSelect"

														options={itemGroup}

														className="basic-multi-select"
														classNamePrefix="select"
														onChange={handleselect}

														components={animatedComponents}
														closeMenuOnSelect={false}
													/> */}
                        <input
                          value={formatedValue(contexData.tempstate["strItemGroupValue"])}
                          onClick={() => {
                            HandleOnClickComman(5);
                          }}
                        />
                      </div>
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <div class="card-filter-contain">
                        <i class="fas fa-boxes"></i>
                        <label for="sel1" class="form-label">
                          Product
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
                          value={formatedValue(contexData.tempstate["strProductValue"])}
                          onClick={() => {
                            HandleOnClickComman(6);
                          }}
                        />
                      </div>
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <div class="card-filter-contain">
                        <i class="fas fa-project-diagram"></i>
                        <label for="sel1" class="form-label">
                          Item
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
                          value={formatedValue(contexData.tempstate["strItemValue"])}
                          onClick={() => {
                            HandleOnClickComman(7);
                          }}
                        />
                      </div>
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <div class="card-filter-contain">
                        <i class="fas fa-th-list"></i>
                        <label for="sel1" class="form-label">
                          Sub-Item
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
                          value={formatedValue(contexData.tempstate["strSubItemValue"])}
                          onClick={() => {
                            HandleOnClickComman(8);
                          }}
                        />
                      </div>
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <div class="card-filter-contain">
                        <i class="fas fa-sitemap"></i>
                        <label for="sel1" class="form-label">
                          Item with Sub-item
                        </label>
                        {/* <Select
												// defaultValue={[colourOptions[2], colourOptions[3]]}
												isMulti
												name="itemSubItemSelect"

												options={itemSubitem}

												className="basic-multi-select"
												classNamePrefix="select"
												onChange={handleselect}

												components={animatedComponents}
												closeMenuOnSelect={false}
											/> */}
                        <input
                          value={formatedValue(contexData.tempstate["strItemSubitemValue"])}
                          onClick={() => HandleOnClickComman(9)}
                        />
                      </div>
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <div class="card-filter-contain">
                        <i class="fas fa-gem"></i>
                        <label for="sel1" class="form-label">
                          Design Catalogue
                        </label>
                        {/* <Select
												// defaultValue={[colourOptions[2], colourOptions[3]]}
												isMulti
												name="designSelect"

												options={design}

												className="basic-multi-select"
												classNamePrefix="select"
												onChange={handleselect}

												components={animatedComponents}
												closeMenuOnSelect={false}
											/> */}
                        <input
                          value={formatedValue(contexData.tempstate["strDesignCatalogueValue"])}
                          onClick={() => HandleOnClickComman(10)}
                        />
                      </div>
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <div class="card-filter-contain">
                        <i class="fas fa-users"></i>
                        <label for="sel1" class="form-label">
                          Saleman
                        </label>
                        {/* <Select
														// defaultValue={[colourOptions[2], colourOptions[3]]}
														isMulti
														name="salesmanSelect"

														options={salesman}

														className="basic-multi-select"
														classNamePrefix="select"
														// onChange={handleselect}

														components={animatedComponents}
														closeMenuOnSelect={false}
													/> */}
                        <input
                          value={formatedValue(contexData.tempstate["strSalemanValue"])}
                          onClick={() => HandleOnClickComman(11)}
                        />
                      </div>
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <div class="card-filter-contain">
                        <i class="fas fa-layer-group"></i>
                        <label for="sel1" class="form-label">
                          Mode of Sale
                        </label>
                        {/* <div class="dropdown">
														<select class="selectpicker" multiple aria-label="Default select example"
															data-live-search="true">
															<option value="one">One</option>
															<option value="two">Two</option>
															<option value="three">Three</option>
															<option value="four">Four</option>
														</select>
													</div> */}
                        <input
                          value={formatedValue(contexData.tempstate["strModeofSaleValue"])}
                          onClick={() => HandleOnClickComman(12)}
                        />
                      </div>
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <div class="card-filter-contain">
                        <i class="fas fa-stream"></i>
                        <label for="sel1" class="form-label">
                          Team & Mode of Sale
                        </label>
                        {/* <div class="dropdown">
														<select class="selectpicker" multiple aria-label="Default select example"
															data-live-search="true">
															<option value="one">One</option>
															<option value="two">Two</option>
															<option value="three">Three</option>
															<option value="four">Four</option>
														</select>
													</div> */}
                        <input
                          value={formatedValue(contexData.tempstate["strTeamModeofSaleValue"])}
                          onClick={() => HandleOnClickComman(13)}
                        />
                      </div>
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <div class="card-filter-contain">
                        <i class="fas fa-chart-line"></i>
                        <label for="sel1" class="form-label">
                          Sale Aging
                        </label>
                        <input
                          value={formatedValue(contexData.tempstate["strSaleAging"])}
                          onClick={() => HandleOnClickComman(14)}
                        />
                      </div>
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <div class="card-filter-contain">
                        <i class="fas fa-people-carry"></i>
                        <label for="sel1" class="form-label">
                          Purchase Party
                        </label>
                        {/* <Select
												// defaultValue={[colourOptions[2], colourOptions[3]]}
												isMulti
												name="purchasePartySelect"

												options={salesman}

												className="basic-multi-select"
												classNamePrefix="select"
												onChange={handleselect}

												components={animatedComponents}
												closeMenuOnSelect={false}
											/> */}
                        <input
                          value={formatedValue(contexData.tempstate["strPurchasePartyValue"])}
                          onClick={() => HandleOnClickComman(15)}
                        />
                      </div>
                    </div>

                    <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
                      <div class="card-filter-contain">
                        <i class="fas fa-handshake"></i>
                        <label for="sel1" class="form-label">
                          Sales Party
                        </label>
                        {/* <Select
												// defaultValue={[colourOptions[2], colourOptions[3]]}
												isMulti
												name="salesPartySelect"

												options={salesParty}

												className="basic-multi-select"
												classNamePrefix="select"
												// onChange={handleselect}

												components={animatedComponents}
												closeMenuOnSelect={false}
											/> */}
                        <input
                          value={formatedValue(contexData.tempstate["strSalesPartyValue"])}
                          onClick={() => HandleOnClickComman(16)}
                        />
                      </div>
                    </div>

                    {/* <div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
									<div class="card-filter-contain">
										<i class="fas fa-calendar-week"></i>
										<label for="sel1" class="form-label">Month</label>
										<div class="dropdown">
											<select class="selectpicker" multiple aria-label="Default select example"
												data-live-search="true">
												<option value="one">One</option>
												<option value="two">Two</option>
												<option value="three">Three</option>
												<option value="four">Four</option>
											</select>
										</div>
									</div>
								</div>

								<div class="col-xl-4 col-lg-6 col-md-12 col-sm-12">
									<div class="card-filter-contain">
										<i class="fas  fa-calendar-alt"></i>
										<label for="sel1" class="form-label">Year</label>
										<div class="dropdown">
											<select class="selectpicker" multiple aria-label="Default select example"
												data-live-search="true">
												<option value="one">One</option>
												<option value="two">Two</option>
												<option value="three">Three</option>
												<option value="four">Four</option>
											</select>
										</div>
									</div>
								</div> */}
                  </div>
                </form>
              </div>
            </Modal.Body>

            <Modal.Footer class="modal-footer">
              <button
                type="button"
                class="filter-footer-button"
                data-mdb-ripple-init
                onClick={handleOnClose}
              >
                {" "}
                Close{" "}
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
                  checked
                />
                <label
                  class="form-check-label checkbox-filter-label text-muted"
                  for="flexCheckChecked"
                >
                  (% Set as Default)
                </label>
              </div>
            </Modal.Footer>
          </div>
          {/* </div> */}
          {/* </div> */}
        </Modal>
      )}
    </>
  );
}
