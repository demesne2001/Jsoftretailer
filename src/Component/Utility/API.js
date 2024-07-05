// const Baseurl="http://192.168.1.208:52202/"
// const Baseurl = "http://192.168.1.245:52202/"
// const Baseurl = "http://jsoftwhreport.alphaebarcode.com:52202/"
// const Baseurl = "http://103.250.147.184:52202/"
// const BaseurlCommon="http://103.131.196.61:42202/"
// // const Baseurl ="http://103.131.196.61:52202/"



/* Jsoft Retails All Api*/


const Baseurl = "http://192.168.1.219:62202/"



const Filter = Baseurl + 'Filter/'
const Chart = Baseurl + 'SalesChart/'
const Card = Baseurl + 'SalesChart/'
const Login = Baseurl + 'Login/'
const Dynamic = Baseurl + 'Dynamic/'
const Common = Baseurl + 'Common/'
const Schedule = Baseurl + 'Schedule/'
const StocktoSales = Baseurl + 'SalesChart/'
const MinStock = Baseurl + 'SalesChart/'

const API = {
    /*Help Module API*/
    BranchFilter: Filter + 'GetBranch',
    stateFilter: Filter + 'GetState',
    regionFilter: Filter + 'GetRegion',
    cityFilter: Filter + 'GetCity',
    itemGroupFilter: Filter + 'GetItemGroup',
    productFilter: Filter + 'GetProduct',
    itemFilter: Filter + 'GetItem',
    GetSubItem: Filter + 'GetSubItem',
    GetItemWithSubitem: Filter + 'GetItemWithSubitem',
    GetDesignCatalogue: Filter + 'GetDesignCatalogue',
    GetSaleman: Filter + 'GetSaleman',
    GetSalesParty: Filter + 'GetSalesParty',
    GetPurchaseParty: Filter + 'GetPurchaseParty',
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
    GetMonth: Filter + 'GetMonth',
    GetFilterGridByID: Filter + "GetFilterGridByID",
    FilterGridAddEdit: Filter + "FilterGridAddEdit",
    GetDefaultScreenData: Card + 'GetDefaultScreenData',

    /*Sales Card Module API*/
    GetSalesEfficiencyCard: Card + 'GetSalesEfficiencyCard',
    GetReturnTrendCard: Card + 'GetReturnTrendCard',
    GetSalesWeightCard: Card + 'GetSalesWeightCard',
    GetCollectionCard: Card + 'GetCollectionCard',
    GetStockAnalysisCard: Card + 'GetStockAnalysisCard',
    CommonCard: Card + 'GetCardValue',
    CommonChart: Chart + 'GetCommanChart',
    GetDetailCommanChart: Chart + 'GetDetailCommanChart',
    GetChartOptionByID: Chart + 'GetChartOptionByID',
    ChartOptionAddEdit: Chart + 'ChartOptionAddEdit',
    GetChartGroupByID: Chart + 'GetChartGroupByID',
    ChartGroupAddEdit: Chart + 'ChartGroupAddEdit',
    GetDetailChartImage: Chart + 'GetDetailChartImage',


    /*Pdf And Excel for Image Module API*/
    uploadImage: Common + "uploadImage",
    DeleteFile: Common + "DeleteFile",
    GetPDFUsingImage: Common + "GetPDFUsingImage",
    downloadPdf: Baseurl + "PDF/",

    login: Login + "login",

    /*Schedule Module API*/
    scheduleGetcommonChart: Schedule + "GetcommonChart",
    scheduleGetcommonCard: Schedule + "GetcommonCard",
    GetChartDetailWise: Schedule + "GetChartDetailWise",
    GetChartPartyDetails: Schedule + "GetChartPartyDetails",


    /*Dynamic Module API*/
    GetDynamicChartConfig: Dynamic + 'GetcommonChartDetail',
    GetDynamicChartData: Dynamic + "GetcommonChart",
    GetPageData: Dynamic + "VendorPageData",
    GetDetailChartConfig: Dynamic + "VendorchartDetailScreen",
    GetCommanVendorChartDetail: Dynamic + "CommanVendorchartDetail",
    GetStockToSalesChart: StocktoSales + "GetStockToSalesChart",
    GetMinStockChart: MinStock + "GetMinStockChart",
    GetMinStockChartDeatil: MinStock + "GetMinStockChartDeatil",
    baseurl: Baseurl,


    /*DatabaseChange API */

    GetVendorDeatil: Common + "GetVendorDeatil",
    TokenInvoke: Login + "TokenInvoke",
    GetAllDataBase: Common + "GetAllDataBase"
}
export default API

