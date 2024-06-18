const StockToSalesChartObject = {
    1:{xAxis : ["period"], yAxis : ["AvgStock", "SNtWt", "Spcs", "AvgStockCycleNtWt"], heading : "Period Wise", iconclassName : "fa-solid fa-clock", id:"periodID",filterkey: 'period', color : ['#003f7f','#00a0af']},
    2:{xAxis : ["BranchName"], yAxis : ["AvgStock", "SNtWt", "Spcs", "AvgStockCycleNtWt"], heading : "Branch Wise", iconclassName : "fas fa-chart-pie", id:"BranchID",filterkey: 'StrBranchID', color : ['#295351','#eeebe4']},
    3:{xAxis : ["ProductName"], yAxis : ["AvgStock", "SNtWt", "Spcs", "AvgStockCycleNtWt"], heading : "Product Wise", iconclassName : "fas fa-boxes", id:"ProductID",filterkey: 'StrProductID', color : ['#264e72','#67b6ff']},
    4:{xAxis : ["ItemName"], yAxis : ["AvgStock", "SNtWt", "Spcs", "AvgStockCycleNtWt"], heading : "Item Wise", iconclassName : "fas fa-project-diagram", id:"ItemID",filterkey: 'StrItemID',color:['#4a61a7','#f3898c']},
    5:{xAxis : ["SubItemName"], yAxis : ["AvgStock", "SNtWt", "Spcs", "AvgStockCycleNtWt"], heading : "Sub-Item Wise", iconclassName : "fas fa-th-list", id:"SubItemID",filterkey: 'StrSubItemID', color:['#122740', '#b9d5b2']}
}
export default StockToSalesChartObject;