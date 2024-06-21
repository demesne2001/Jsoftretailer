const MinimumStockChartObject = {
    1:{xAxis : ["period"], yAxis : [ "AvgMinStockRequired",  "AvgMinStockRequiredPcs", "AvgStock","AvgStockCycle"], heading : "Period Wise", iconclassName : "fa-solid fa-clock", id:"period",filterkey: 'StrBranchID'},
    2:{xAxis : ["BranchName"], yAxis : [ "AvgMinStockRequired",  "AvgMinStockRequiredPcs", "AvgStock","AvgStockCycle"], heading : "Branch Wise", iconclassName : "fas fa-chart-pie", id:"BranchID",filterkey: 'StrBranchID'},
    3:{xAxis : ["ProductName"], yAxis : [ "AvgMinStockRequired",  "AvgMinStockRequiredPcs", "AvgStock","AvgStockCycle"], heading : "Product Wise", iconclassName : "fas fa-boxes", id:"ProductID",filterkey: 'StrProductID',color:['#4a61a7','#f3898c',"#1c7ee6"]},
    4:{xAxis : ["ItemName"], yAxis : [ "AvgMinStockRequired",  "AvgMinStockRequiredPcs", "AvgStock","AvgStockCycle"], heading : "Item Wise", iconclassName : "fas fa-project-diagram", id:"ItemID",filterkey: 'StrItemID',color : ['#264e72','#67b6ff',"#1c7ee6"]},
    5:{xAxis : ["SubItemName"], yAxis : [ "AvgMinStockRequired",  "AvgMinStockRequiredPcs", "AvgStock","AvgStockCycle"], heading : "Sub-Item Wise", iconclassName : "fas fa-th-list", id:"SubItemID",filterkey: 'StrSubItemID', color:['#4a61a7','#f3898c',"#1c7ee6"]},
    6:{xAxis : ["SubitemRange"], yAxis : ["AvgStockPcs", "AvgMinStockRequired",  "AvgMinStockRequiredPcs","AvgStockCycle"], heading : "Sub-Item-Range Wise", iconclassName : "fas fa-th-list", id:"SubitemRange",filterkey: '',  color:['#4a61a7','#f3898c',"#1c7ee6"]}
}
export default MinimumStockChartObject;