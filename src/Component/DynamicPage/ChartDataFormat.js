



function DataFormat(resultdata, XLabel, YLabelName, TypeName,XLabelID,SrNo,ContextObj) {
   
    function ComboChartoption(lstCombo) {
        var colorlst = ["#008FFB", "#00E396", "#FEB019"]
        var postion = [true, false, true]
        for (let index = 0; index < lstCombo.length; index++) {

            ComboYAxis.push(
                {
                    min: 0,
                    seriesName: YLabel[index],
                    opposite: postion[index],
                    axisTicks: {
                        show: true,
                    },
                    axisBorder: {
                        show: true,
                        color: colorlst[index]
                    },
                    labels: {
                        style: {
                            colors: colorlst[index],
                        }
                    },
                    tooltip: {
                        enabled: false
                    }
                }
            )
            ComboSer.push(
                { "name": YLabel[index], type: lstCombo[index], data: YAxis[index] }
            )


        }
        option = {
            chart: {
                height: 350,
                type: 'line',
                stacked: false,
                events: {
                    dataPointSelection: (event, chartContex, config) => {
                        if (XAxisID[config.dataPointIndex] !== null && XAxisID[config.dataPointIndex] !== undefined) {
                            console.log(XAxisID[config.dataPointIndex], "on Click");
                            console.log(XAxisID, "ID Click");
                              }
                    }
                },
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                width: [4, 4, 5]
            },
            xaxis: {
                categories: XAxis
            },
            yaxis: ComboYAxis,
            tooltip: {
                fixed: {
                    enabled: true,
                    position: 'topLeft', // topRight, topLeft, bottomRight, bottomLeft
                    offsetY: 30,
                    offsetX: 60
                },
            },
            legend: {
                horizontalAlign: 'left',
                offsetX: 40
            }
        }


    }

    let ReturnResult = {
    }
    const YLabel = YLabelName.split(',')
    let YAxis1 = []
    let YAxis2 = []
    let YAxis3 = []
    let series = []
    let YAxis = []
    let XAxis = []
    let XAxisID = []
    let XYCombian = []
    let ComboYAxis = []
    let ComboSer = []
    var option

    if (YLabel.length === 1) {
        resultdata.forEach(item => {
            YAxis1.push(item[YLabel[0]])
            XAxis.push(item[XLabel])
            XAxisID.push(item[XLabelID])
            console.log('+++++++++++++++++++>',XLabel,XLabelID,item[XLabelID],item[XLabel])
            XYCombian.push({ x: item[XLabel], y: item[YLabel[0]] })
        });
        YAxis.push(YAxis1)
    }
    else if (YLabel.length === 2) {
        resultdata.forEach(item => {
            YAxis1.push(item[YLabel[0]])
            YAxis2.push(item[YLabel[1]])
            XAxis.push(item[XLabel])
            XAxisID.push(item[XLabelID])
        });

        YAxis.push(YAxis1)
        YAxis.push(YAxis2)
    }
    else if (YLabel.length === 3) {
        resultdata.forEach(item => {
            YAxis1.push(item[YLabel[0]])
            YAxis2.push(item[YLabel[1]])
            YAxis3.push(item[YLabel[2]])
            XAxis.push(item[XLabel])
            XAxisID.push(item[XLabelID])
            console.log('itemWiseData', item[XLabel])
        });

        YAxis.push(YAxis1)
        YAxis.push(YAxis2)
        YAxis.push(YAxis3)
    }
    if ('bar' === TypeName || 'line' === TypeName || 'area' === TypeName) {
        for (let index = 0; index < YLabel.length; index++) {
            series.push({ "name": YLabel[index], "data": YAxis[index] })
        }
        option = {
            chart: {
                height: 350,
                type: TypeName,
                zoom: {
                    enabled: false
                },
                events: {
                    dataPointSelection: (event, chartContex, config) => {
                        console.log('On click Event',XAxisID,config.dataPointIndex,SrNo)
                        if (XAxisID[config.dataPointIndex] !== null && XAxisID[config.dataPointIndex] !== undefined) {
                            console.log(XAxisID[config.dataPointIndex], "on Click");
                            console.log(XAxisID, "ID Click");
                            ContextObj.SetState({...ContextObj.state,"DependancyID":XLabelID,"ID":XAxisID[config.dataPointIndex]})
                              }
                    }
                },
            },
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: false,
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                show: true,
                width: 2,
            },
            legend: {
                show: true
            },
            xaxis: {
                categories: XAxis,
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            },

        }
        ReturnResult['series'] = series
        ReturnResult['option'] = option
        ReturnResult['type'] = TypeName

    }

    else if ('treemap' === TypeName) {
        option = {
            legend: {
                show: false
            },
            chart: {
                height: 350,
                type: 'treemap',
                events: {
                    dataPointSelection: (event, chartContex, config) => {
                        if (XAxisID[config.dataPointIndex] !== null && XAxisID[config.dataPointIndex] !== undefined) {
                            console.log(XAxisID[config.dataPointIndex], "on Click");
                            console.log(XAxisID, "ID Click");
                              }
                    }
                },
            },
            colors: [
                '#3B93A5',
                '#F7B844',
                '#ADD8C7',
                '#EC3C65',
                '#CDD7B6',
                '#C1F666',
                '#D43F97',
                '#1E5D8C',
                '#421243',
                '#7F94B0',
                '#EF6537',
                '#C0ADDB'
            ],
            
            plotOptions: {
                treemap: {
                    distributed: true,
                    enableShades: false
                }
            }
            
        }
        ReturnResult['series'] = [{ "data": XYCombian }]
        ReturnResult['option'] = option
        ReturnResult['type'] = TypeName

    }
    else if ('pie' === TypeName || 'donut' === TypeName || 'polarArea' === TypeName || 'radialBar' === TypeName) {
        option = {
            chart: {
                type: TypeName,
                events: {
                    dataPointSelection: (event, chartContex, config) => {
                        console.log('On click Event',XAxisID,config.dataPointIndex,SrNo)
                        if (XAxisID[config.dataPointIndex] !== null && XAxisID[config.dataPointIndex] !== undefined) {
                            console.log(XAxisID[config.dataPointIndex], "on Click");
                            console.log(XAxisID, "ID Click");
                            ContextObj.SetState({...ContextObj.state,"DependancyID":XLabelID,"ID":XAxisID[config.dataPointIndex]})
                              }
                    }
                },
            },
            labels: XAxis,
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200
                    },
                    legend: {
                        position: 'bottom'
                    },


                }
            }]
        }
        ReturnResult['series'] = YAxis1
        ReturnResult['option'] = option
        ReturnResult['type'] = TypeName
    }
    else if ('BarArea' === TypeName) {
        if (YLabel.length == 2) {
            ComboChartoption(['column', 'area'])

        }
        else {
            ComboChartoption(['column', 'column', 'area'])
        }

        ReturnResult['series'] = ComboSer
        ReturnResult['option'] = option
        ReturnResult['type'] = 'line'
        console.log('BarLine', ReturnResult)
    }
    else if ('AreaBar' === TypeName) {
        if (YLabel.length == 2) {
            ComboChartoption(['area', 'column'])

        }
        else {
            ComboChartoption(['area', 'area', 'column'])
        }

        ReturnResult['series'] = ComboSer
        ReturnResult['option'] = option
        ReturnResult['type'] = 'line'
        console.log('BarLine', ReturnResult)

    }
    else if ('Barline' === TypeName) {
        if (YLabel.length == 2) {
            ComboChartoption(['column', 'line'])

        }
        else {
            ComboChartoption(['column', 'column', 'line'])
        }

        ReturnResult['series'] = ComboSer
        ReturnResult['option'] = option
        ReturnResult['type'] = 'line'
        console.log('BarLine', ReturnResult)

    }
    else if ('LineBar' === TypeName) {
        if (YLabel.length == 2) {
            ComboChartoption(['line', 'column'])

        }
        else {
            ComboChartoption(['line', 'line', 'column'])
        }

        ReturnResult['series'] = ComboSer
        ReturnResult['option'] = option
        ReturnResult['type'] = 'line'
        console.log('BarLine', ReturnResult)

    }
    else if ('BarLineArea' === TypeName) {
        if (YLabel.length == 2) {
            ComboChartoption(['column', 'line'])

        }
        else {
            ComboChartoption(['column', 'line', 'area'])
        }

        ReturnResult['series'] = ComboSer
        ReturnResult['option'] = option
        ReturnResult['type'] = 'line'
        console.log('BarLine', ReturnResult)

    }
    console.log('XAxisID',XAxisID)
    return ReturnResult
}



export default DataFormat


