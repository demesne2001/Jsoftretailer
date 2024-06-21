import { color } from 'echarts';
import React from 'react'

export default function SheduleClientDetailThirdScreen(xAxis, yAxis, contextData, id, chartid) {
    // const option = {
    //   chart: {
    //     type: 'bar',
    //     height: 350,
    //     stacked: true,
    //     dropShadow: {
    //       enabled: true,
    //       blur: 1,
    //       opacity: 0.25
    //     }
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: true,
    //       barHeight: '60%',
    //     },
    //   },
    //   dataLabels: {
    //     enabled: false
    //   },
    //   stroke: {
    //     width: 2,
    //   },
    //   xaxis: {
    //     categories: xAxis,
    //   },
    //   yaxis: {
    //     title: {
    //       text: undefined
    //     },
    //     labels: {
    //       formatter: function (val) {
    //         if (typeof (val) === 'string') {
    //           return val.slice(0, 6) + '...'
    //         }
    //       }
    //     }
    //   },
    //   tooltip: {
    //     shared: false,
    //     x: {
    //       formatter: function (val) {
    //         return val
    //       }
    //     },
    //     y: {
    //       marker: {
    //         show: true,
    //       },
    //       formatter: function (val, config) {
    //         console.log(config['dataPointIndex']);
    //         return "TotalParty : " + yAxis[0][config['dataPointIndex']].toString() + "<br/>VistedParty : " + yAxis[1][config['dataPointIndex']].toString() + "<br/>Prc : " + yAxis[2][config['dataPointIndex']].toString() + "%"

    //       },
    //       title: {
    //         formatter: (seriesName) => "",
    //       },
    //     }
    //   },
    //   fill: {
    //     type: 'pattern',
    //     opacity: 1,
    //     pattern: {
    //       style: ['circles', 'slantedLines', 'verticalLines', 'horizontalLines'], // string or array of strings

    //     }
    //   },
    //   states: {
    //     hover: {
    //       filter: 'none'
    //     }
    //   },
    //   legend: {
    //     position: 'bottom',
    //     offsetY: 40
    //   }
    // }
    // const series = [{
    //   name: 'TotalParty',
    //   data: yAxis[0]
    // }, {
    //   name: 'VisitedParty',
    //   data: yAxis[1]
    // }]
    function dataformate() {
        let tempjs = {};
        let templs = [];
        for (let index = 0; index < xAxis.length; index++) {
            tempjs = {};
            tempjs['Team'] = xAxis[index];
            tempjs['TargetParty'] = yAxis[0][index];
            tempjs['VisitedParty'] = yAxis[1][index];
            tempjs['Prc'] = yAxis[2][index];
            templs.push(tempjs);
        }
        return templs;
    }
    //   console.log(document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth, "height div");
    // const option = {
    //   height: 350,
    //   width: document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth,
    //   charttype: 'antv-singlebar-multivalue',
    //   series: dataformate(),
    //   widthlst: [40, 60],
    //   color:['#4a61a7','#f3898c',"#1c7ee6"]
    // }
    function findMinMax() {
        let ansmin = [];
        let ansmax = [];
        for (let i = 0; i < yAxis.length - 1; i++) {
            ansmax.push(Math.max(...yAxis[i]))
            ansmin.push(Math.min(...yAxis[i]))
        }

        if (parseInt(Math.min(...ansmin).toFixed(0)) >= 0) {
            return [parseInt(Math.max(...ansmax).toFixed(0)) + 1, 0]
        } else {
            return [parseInt(Math.max(...ansmax).toFixed(0)) + 1, parseInt(Math.min(...ansmin).toFixed(0)) + 1]
        }
    } console.log(yAxis, "sdyrt67asygt");
    let option = {}
    if (document.getElementsByClassName('crancy-progress-card card-contain-graph')[0] !== undefined) {
        option = {
            themeId: 11,
            chartId: 'inside-Baryui',
            charttype: 'inside-Bar',
            height: '650%',
            width: '100%',
            legend: ['TargetParty', 'VisitedParty', 'SeenParty', 'SoldParty', 'Prc'],
            color: ['#46a5dd', '#2c4b6a', '#c3d5ff', '#1563e6', '#c8d6f7'],
            widthlst: [document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth / 20, document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth / 35, document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth / 60, document.getElementsByClassName('crancy-progress-card card-contain-graph')[0].clientWidth / 95],
            Xaxis: xAxis,
            Yaxis: yAxis,
            idkey: 'ScheduleID',
            idlst: id,
            bargap: '-80%',
            alignment: 'v',
            maxval: findMinMax()[0],
            minval: findMinMax()[1],
            barnum: 4,
            divname: 'crancy-progress-card card-contain-graph',
            tooltipid: 4
        }
    }

    return [option]
}
