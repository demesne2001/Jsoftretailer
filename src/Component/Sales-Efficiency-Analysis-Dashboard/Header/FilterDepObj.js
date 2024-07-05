import API from "../../Utility/API"

const FilterDepObj={
        1: [
          "strBranch",
          API.BranchFilter,
          "BranchId",
          "BranchName",
          "strBranchValue",
          1,
          "BranchWise"
        ],
        2: [
          "strRegionID",
          API.GetRegion,
          "RegionID",
          "RegionName",
          "strRegionValue",
          2,
          "RegionWise"
        ],
        3: ["strState", API.GetState, "StateID", "StateName", "strStateValue", 3,"StateWise"],
        4: ["strCity", API.GetCity, "CityName", "CityName", "strCity", 4, "CityWise"],
        5: [
          "strItemGroup",
          API.itemGroupFilter,
          "ItemGroupID",
          "ItemGroupName",
          "strItemGroupValue",
          5,
          "ItemGroupWise"
        ],
        6: [
          "strProduct",
          API.productFilter,
          "ProductId",
          "ProductName",
          "strProductValue",
          6,
          "ProductWise"
        ],
        7: ["strItem", API.itemFilter, "ItemId", "ItemName", "strItemValue", 7, "ItemWise"],
        8: [
          "strSubItem",
          API.GetSubItem,
          "SubItemId",
          "SubItemName",
          "strSubItemValue",
          8,
          "SubItemWise"
        ],
        9: [
          "strItemSubitem",
          API.GetItemWithSubitem,
          "ItemSubID",
          "SubItemWithStyleName",
          "strItemSubitemValue",
          9,
          "ItemWithSubItemWise"
        ],
        10: [
          "strDesignCatalogue",
          API.GetDesignCatalogue,
          "DesignCatalogID",
          "DesignNo",
          "strDesignCatalogueValue",
          10,
          "DesignCatalogueWise"
        ],
        11: [
          "strSaleman",
          API.GetSaleman,
          "SalesmanID",
          "SalesmanName",
          "strSalemanValue",
          11,
          "SalesmanWise"
        ],
        12: [
          "strModeofSale",
          API.GetModeSale,
          "ChallanGenerateTypeID",
          "ChallanGenerateType",
          "strModeofSaleValue",
          12,
          "ModeofSaleWise"
        ],
        13: [
          "strTeamModeofSale",
          API.GetTeamModeofSale,
          "TeamModeofSaleID",
          "TeamModeofSaleName",
          "strTeamModeofSaleValue",
          13,
          "TeamModeofSaleWise"
        ],
        14: [
          "strSaleAging",
          API.GetSalesAging,
          "Caption",
          "Caption",
          "strSaleAging",
          14,
          "SaleAgingWise"
        ],
        15: [
          "strDesignCodeID",
          API.Getdesigncode,
          "designcodeID",
          "DesignName",
          "strDesignCodeValue",
          15,
          "DesignCodeWise"
        ],
        16: [
          "strSalesParty",
          API.GetSalesParty,
          "AccountId",
          "AccountName",
          "strSalesPartyValue",
          16,
          "SalesPartyWise"
        ],
        17: [
          "strMonth",
          API.GetMonth,
          "MonthID",
          "MonthName",
          "strMonthValue",
          17,
          "MonthWise"
        ]
      }

export default FilterDepObj
