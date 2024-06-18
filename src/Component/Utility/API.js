const Baseurl="http://192.168.1.208:52202/"
// const Baseurl = "http://192.168.1.245:52202/"
// const Baseurl = "http://jsoftwhreport.alphaebarcode.com:52202/"
// const Baseurl = "http://103.250.147.184:52202/"
// const BaseurlCommon="http://103.131.196.61:42202/"

// // const Baseurl ="http://103.131.196.61:52202/"

const Filter = Baseurl + 'Filter/'
const Chart = Baseurl + 'Chart/'          
const Card = Baseurl + 'Card/'
const Login = Baseurl + 'Login/'
const Dynamic=Baseurl+'Dynamic/'
const Common = Baseurl + 'Common/'
const Schedule = Baseurl + 'Schedule/'
const StocktoSales = Baseurl + 'StocktoSales/'
const MinStock = Baseurl + 'MinStock/'

const API = {
    /*Help Module API*/
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
    Getdesigncode: Filter + 'Getdesigncode',
    GetMonth:Filter+'GetMonth',
    GetFilterGridByID:Filter + "GetFilterGridByID",   
    FilterGridAddEdit: Filter + "FilterGridAddEdit",
    GetDefaultScreenData:Filter+'GetDefaultScreenData',
    
    /*Sales Card Module API*/
    GetSalesEfficiencyCard : Card + 'GetSalesEfficiencyCard',
    GetReturnTrendCard : Card + 'GetReturnTrendCard',
    GetSalesWeightCard : Card + 'GetSalesWeightCard',
    GetCollectionCard : Card + 'GetCollectionCard',
    GetStockAnalysisCard : Card + 'GetStockAnalysisCard',
    CommonCard : Card + 'GetCardValue',


    /*Sales Chart Module API*/

    // GetBranchWise : Chart + 'GetBranchWise',
    // GetStateWise : Chart + 'GetStateWise',
    // GetCityWise : Chart + 'GetCityWise',
    // GetRegionWise : Chart + 'GetRegionWise',
    // GetItemWise : Chart + 'GetItemWise',
    // GetSubItemWise : Chart + 'GetSubItemWise',
    // GetItemGroupWise : Chart + 'GetItemGroupWise',
    // GetItemWithSubItemWise : Chart + 'GetItemWithSubItemWise',
    // GetPurchasePartywise : Chart + 'GetPurchasePartywise',
    // GetSalesPartyWise : Chart + 'GetSalesPartyWise',
    // GetProductWise : Chart + 'GetProductWise',
    // GetDesignCatalogueWise : Chart + 'GetDesignCatalogueWise',
    // GetMonthWise : Chart + 'GetMonthWise',
    // GetYearWise : Chart + 'GetYearWise',
    // GetSalesAgingWise : Chart + 'GetSalesAgingWise',
    // GetModeOfSalesWise : Chart + 'GetModeOfSalesWise',
    // GetTeamAndModeOFSalesWise : Chart + 'GetTeamAndModeOFSalesWise',
    // GetSalesmanWise : Chart + 'GetSalesmanWise',
    CommonChart : Chart + 'GetCommanChart',        
    GetDetailCommanChart: Chart + 'GetDetailCommanChart',
    GetChartOptionByID : Chart + 'GetChartOptionByID',
    ChartOptionAddEdit : Chart + 'ChartOptionAddEdit',
    GetChartGroupByID : Chart + 'GetChartGroupByID',
    ChartGroupAddEdit : Chart + 'ChartGroupAddEdit',
    GetDetailChartImage : Chart + 'GetDetailChartImage',
    

    /*Pdf And Excel for Image Module API*/
    uploadImage : Common + "uploadImage",
    DeleteFile : Common + "DeleteFile",
    GetPDFUsingImage : Common + "GetPDFUsingImage",
    downloadPdf : Baseurl + "PDF/",

    login : Login + "login/",

    /*Schedule Module API*/
    scheduleGetcommonChart : Schedule + "GetcommonChart",
    scheduleGetcommonCard : Schedule + "GetcommonCard",
    GetChartDetailWise: Schedule + "GetChartDetailWise",
    GetChartPartyDetails : Schedule + "GetChartPartyDetails",


    /*Dynamic Module API*/
    // GetDynamicChartConfig:'http://127.0.0.1:2025/Dynamic/GetcommonChartDetail',
    GetDynamicChartConfig:Dynamic+'GetcommonChartDetail',
    GetDynamicChartData:Dynamic+"GetcommonChart",    
    // GetPageData:'http://127.0.0.1:2025/'+'Dynamic/'+"VendorPageData",
     GetPageData:Dynamic+"VendorPageData",
    // GetDetailChartConfig:'http://127.0.0.1:2025/'+'Dynamic/'+"VendorchartDetailScreen",
    GetDetailChartConfig:Dynamic+"VendorchartDetailScreen",
    GetCommanVendorChartDetail:Dynamic+"CommanVendorchartDetail",
    // GetCommanVendorChartDetail:'http://127.0.0.1:2025/'+'Dynamic/'+"CommanVendorchartDetail",

    GetStockToSalesChart : StocktoSales + "GetStockToSalesChart",
    GetMinStockChart : MinStock + "GetMinStockChart",
    GetMinStockChartDeatil : MinStock + "GetMinStockChartDeatil",
    baseurl : Baseurl,
}
export default API

