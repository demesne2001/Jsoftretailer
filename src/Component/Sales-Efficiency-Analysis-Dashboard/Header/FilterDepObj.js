import API from "../../Utility/API"

const FilterDepObj={
        1: [
          "strBranch",
          API.BranchFilter,
          "BranchId",
          "BranchName",
          "strBranchValue",
          1
        ],
        2: [
          "strRegionID",
          API.GetRegion,
          "RegionID",
          "RegionName",
          "strRegionValue",
          2
        ],
        3: ["strState", API.GetState, "StateID", "StateName", "strStateValue", 3],
        4: ["strCity", API.GetCity, "CityName", "CityName", "strCity", 4],
        5: [
          "strItemGroup",
          API.itemGroupFilter,
          "ItemGroupID",
          "ItemGroupName",
          "strItemGroupValue",
          5,
        ],
        6: [
          "strProduct",
          API.productFilter,
          "ProductId",
          "ProductName",
          "strProductValue",
          6,
        ],
        7: ["strItem", API.itemFilter, "ItemId", "ItemName", "strItemValue", 7],
        8: [
          "strSubItem",
          API.GetSubItem,
          "SubItemId",
          "SubItemName",
          "strSubItemValue",
          8,
        ],
        9: [
          "strItemSubitem",
          API.GetItemWithSubitem,
          "ItemSubID",
          "SubItemWithStyleName",
          "strItemSubitemValue",
          9,
        ],
        10: [
          "strDesignCatalogue",
          API.GetDesignCatalogue,
          "DesignCatalogID",
          "DesignNo",
          "strDesignCatalogueValue",
          10,
        ],
        11: [
          "strSaleman",
          API.GetSaleman,
          "SalesmanID",
          "SalesmanName",
          "strSalemanValue",
          11,
        ],
        12: [
          "strModeofSale",
          API.GetModeSale,
          "ChallanGenerateTypeID",
          "ChallanGenerateType",
          "strModeofSaleValue",
          12,
        ],
        13: [
          "strTeamModeofSale",
          API.GetTeamModeofSale,
          "TeamModeofSaleID",
          "TeamModeofSaleName",
          "strTeamModeofSaleValue",
          13,
        ],
        14: [
          "strSaleAging",
          API.GetSalesAging,
          "Caption",
          "Caption",
          "strSaleAging",
          14,
        ],
        15: [
          "strDesignCodeID",
          API.Getdesigncode,
          "designcodeID",
          "DesignName",
          "strDesignCodeValue",
          15,
        ],
        16: [
          "strSalesParty",
          API.GetSalesParty,
          "AccountId",
          "AccountName",
          "strSalesPartyValue",
          16,
        ],
        17: [
          "strMonth",
          API.GetMonth,
          "MonthID",
          "MonthName",
          "strMonthValue",
          17
        ]
      }

export default FilterDepObj
