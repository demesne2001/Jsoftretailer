export default function StockToSalesOption(xAxis, yAxis, id, contextdata, filterkey, screen) {
    const series = [
        {
            name: 'AvgStock',
            type: 'column',
            data: yAxis[0]
        },
        {
            name: 'Sales-NetWeight',
            type: 'line',
            data: yAxis[1]
        },
        {
            name: 'AvgStockCycleNtWt',
            type: 'line',
            data: yAxis[2]
        }
    ];

    const options = {
        chart: {
            height: 350,
            type: 'line',
            toolbar: {
                tools: {
                    download: true,
                    selection: false,
                    zoom: false,
                    zoomin: false,
                    zoomout: false,
                    pan: false,
                    reset: false
                },
            },
            events: {

                dataPointSelection: (event, chartContex, config) => {
                    if (screen === 2) {
                        if (id[config.dataPointIndex] === null) {
                            contextdata.SetDetailThirdState({ ...contextdata.detailTirdstate, [filterkey]: '-' })
                        }
                        else {
                            setTimeout(() => {
                                contextdata.SetDetailThirdState({ ...contextdata.detailTirdstate, ['SubItemID']: id[config.dataPointIndex].toString() })
                                contextdata.setfilternamesubitemrange(xAxis[config.dataPointIndex])
                            }, [1])
                        }
                    } else {
                        if (id[config.dataPointIndex] === null) {
                            contextdata.SetDetailsecondState({ ...contextdata.detailsecondstate, [filterkey]: '-' })
                        }
                        else {
                            setTimeout(() => {
                                contextdata.SetDetailsecondState({ ...contextdata.detailsecondstate, [filterkey]: id[config.dataPointIndex].toString(), ['MonthType']:contextdata.detailstate['MonthType'] })
                                contextdata.setfiltername(xAxis[config.dataPointIndex])
                            }, [1])
                        }
                    }

                }
            },
        },
        dataLabels: {
            enabled: true,
            enabledOnSeries: [1, 2],
            formatter: function (val) {
                let temp = ""
                for (let i = 0; i < window.innerWidth / (xAxis.length * 5); i++) {
                    temp += '-'

                }
                return temp
            },
            style: {
                fontSize: '2px',
                fontWeight: 'bold',
            },
            background: {
                enabled: true,
                foreColor: '#775dd0',
                padding: 7,
                borderRadius: 0,
                borderWidth: 1,
                borderColor: ['#775dd0', '#ff7800'],
                opacity: 0.9,
                dropShadow: {
                    enabled: false,
                    top: 1,
                    left: 1,
                    blur: 1,
                    color: '#000',
                    opacity: 0.45
                }
            },
        },
        colors: ['#26e7a6', '#775dd0', '#ff7800'],
        stroke: {
            width: [4, 0, 0]
        },
        xaxis: {
            categories: xAxis,
            labels: {
                formatter: function (val) {
                    if (typeof (val) === 'string') {
                        return val.slice(0, 5) + '...';
                    }
                }
            }
        },
        yaxis: [
            {
                seriesName: 'AvgStock',
                axisTicks: {
                    show: false,
                },
                axisBorder: {
                    show: false,
                    color: '#26e7a6'
                },
                labels: {
                    style: {
                        colors: '#000',
                    },
                    formatter: function (val) {
                        return val.toFixed(0)
                    }

                },

            },

        ],
        legend: {
            horizontalAlign: 'center',
            offsetX: 40,
            markers: {
                width: [10, 10, 10], // hides first marker
            }
        },
        tooltip: {
            x: {
                formatter: function (val, config) {
                    return xAxis[config['dataPointIndex']]
                }
            },
            y: {
                formatter: function (val, config) {
                    if (config['seriesIndex'] === 0 && val !== undefined) {
                        return (val.toFixed(3)).toString()
                    } else if (config['seriesIndex'] === 2 && val !== undefined) {
                        return (val.toFixed(2)).toString()
                    } else if (config['seriesIndex'] === 1 && val !== undefined) {
                        return (val.toFixed(3)).toString()
                    }

                }
            }
        },

    };
    return [options, series]
}
