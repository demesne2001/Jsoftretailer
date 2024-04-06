
const Baseurl="http://192.168.1.208:5000/"

const Filter = Baseurl + 'Filter/'
const Chart = Baseurl + 'Chart/'
const Card = Baseurl + 'Card/'


const API = {

    BranchFilter: Filter+'GetBranch',
    stateFilter : Filter + 'GetState',
    regionFilter : Filter + 'GetRegion',
    cityFilter : Filter +'GetCity',
    itemGroupFilter : Filter + 'GetItemGroup',
    productFilter : Filter + 'GetProduct',
    itemFilter : Filter + 'GetItem',
    GetSubItem: Filter + 'GetSubItem',
    GetItemWithSubitem : Filter + 'GetItemWithSubitem',
    GetDesignCatalogue: Filter+'GetDesignCatalogue',
    GetSaleman:Filter+'GetSaleman',
    GetSalesParty : Filter+'GetSalesParty',
    GetPurchaseParty : Filter+'GetPurchaseParty',
    GetState: Filter + 'GetState',
    GetCity: Filter + 'GetCity',
    GetRegion: Filter + 'GetRegion',
    GetModeSale: Filter + 'GetModeSale',
    GetTeamModeofSale: Filter + 'GetTeamModeofSale',
    GetSalesParty: Filter + 'GetSalesParty',
    GetPurchaseParty: Filter + 'GetPurchaseParty',
    GetSalesAging: Filter + 'GetSalesAging',
    GetDayBook: Filter + 'GetDayBook',
    GetMetalType: Filter + 'GetMetalType',

    GetSalesEfficiencyCard : Card + 'GetSalesEfficiencyCard',
    GetReturnTrendCard : Card + 'GetReturnTrendCard',
    GetSalesWeightCard : Card + 'GetSalesWeightCard',
    GetCollectionCard : Card + 'GetCollectionCard',
    GetStockAnalysisCard : Card + 'GetStockAnalysisCard',

    GetBranchWise : Chart + 'GetBranchWise',
    GetStateWise : Chart + 'GetStateWise',
    GetCityWise : Chart + 'GetCityWise',
    GetRegionWise : Chart + 'GetRegionWise',
    GetItemWise : Chart + 'GetItemWise',
    GetSubItemWise : Chart + 'GetSubItemWise',
    GetItemGroupWise : Chart + 'GetItemGroupWise',
    GetItemWithSubItemWise : Chart + 'GetItemWithSubItemWise',
    GetPurchasePartywise : Chart + 'GetPurchasePartywise',
    GetSalesPartyWise : Chart + 'GetSalesPartyWise',
    GetProductWise : Chart + 'GetProductWise',
    GetDesignCatalogueWise : Chart + 'GetDesignCatalogueWise',
    GetMonthWise : Chart + 'GetMonthWise',
    GetYearWise : Chart + 'GetYearWise',
    GetSalesAgingWise : Chart + 'GetSalesAgingWise',
    GetModeOfSalesWise : Chart + 'GetModeOfSalesWise',
    GetTeamAndModeOFSalesWise : Chart + 'GetTeamAndModeOFSalesWise',
    GetSalesmanWise : Chart + 'GetSalesmanWise',
    CommonChart : Chart + 'GetCommanChart',
    CommonCard : Card + 'GetCardValue',
    GetDetailCommanChart: Chart + 'GetDetailCommanChart'

}
export default API

