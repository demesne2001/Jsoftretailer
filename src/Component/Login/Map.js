import React, { useEffect } from "react";
import * as echarts from 'echarts/dist/echarts.js';
import * as usechart from './Asset/Map.json'

const Map = () => {
    useEffect(()=>{
        defaultChart()
    },[])
    
    function defaultChart()
    {
        var dom = document.getElementById('chart-container');
        var myChart = echarts.init(dom, null, {
          renderer: 'canvas',
          useDirtyRect: false
        });
        var option;
        
        myChart.showLoading();
  
          myChart.hideLoading();
          echarts.registerMap('USA', usechart, {
  
          });
          var data = [
            { name: 'Sikkim', value: 4822023 },
            { name: 'Punjab', value: 731449 },
            { name: 'Himachalpradesh', value: 6553255 },
            { name: 'Jammu & Kashmir', value: 2949131 },
            { name: 'Rajastan', value: 38041430 },
            { name: 'Chhattisgarh', value: 5187582 },
            { name: 'Madhya Pradesh', value: 3590347 },
            { name: 'Uttar Pradesh', value: 917092 },
            { name: 'Jharkhand', value: 632323 },
            { name: 'Bihar', value: 19317568 },
            { name: 'Meghalaya', value: 9919945 },
            { name: 'Tripura', value: 1392313 },
            { name: 'Assam', value: 1595728 },
            { name: 'Mizoram', value: 12875255 },
            { name: 'Manipur', value: 6537334 },
            { name: 'Arunachal Pradesh', value: 3074186 },
            { name: 'Nagaland', value: 2885905 },
            { name: 'Andhra Pradesh', value: 4380415 },
            { name: 'Haryana', value: 4601893 },
            { name: 'West Bengal', value: 1329192 },
            { name: 'Tamil Nadu', value: 5884563 },
            { name: 'Orissa', value: 6646144 },
            { name: 'Karnataka', value: 9883360 },
            { name: 'Goa', value: 5379139 },
            { name: 'Maharashtra', value: 2984926 },
            { name: 'Gujarat', value: 6021988 },
            { name: 'Kerala', value: 1005141 },
            { name: 'Pondicherry', value: 1855525 },
            { name: 'Laksha Dweeps', value: 2758931 },
            { name: 'Andaman and Nicobar', value: 1320718 }
          ];
          data.sort(function (a, b) {
            return a.value - b.value;
          });
          const mapOption = {
            visualMap: {
              left: 'right',
              min: 500000,
              max: 38000000,
              inRange: {
                color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
              },
              text: ['High', 'Low'],
              calculable: true
            },
            series: [
              {
                left:'28%',
                height: '100%',
                width: '60%',
                id: 'population',
                type: 'map',
                // roam: true,
                map: 'USA',
                universalTransition: true,
                data: data
              }
            ]
          };
          const barOption = {
            xAxis: {
              type: 'value'
            },
            yAxis: {
              type: 'category',
              axisLabel: {
                rotate: 30
              },
              data: data.map(function (item) {
                return item.name;
              })
            },
            animationDurationUpdate: 2000,
            series: {
              height: '800%',
              width: '100%',
              type: 'bar',
              id: 'population',
              data: data.map(function (item) {
                return item.value;
              }),
              universalTransition: true
            }
          };

          const lineOption = {
            xAxis: {
              type: 'value'
            },
            yAxis: {
              type: 'category',
              axisLabel: {
                rotate: 30
              },
              data: data.map(function (item) {
                return item.name;
              })
            },
            animationDurationUpdate: 2500,
            series: {
              height: '800%',
              width: '100%',
              type: 'line',
              id: 'population',
              data: data.map(function (item) {
                return item.value;
              }),
              universalTransition: true
            }
          };
          let currentOption = lineOption;
          if (currentOption === lineOption) {
            myChart.setOption(lineOption);
          }
          setInterval(function () {
            currentOption = currentOption === mapOption ? barOption : currentOption === lineOption ? mapOption : barOption;
            myChart.setOption(currentOption, true);
          },2500);
        
        
        if (option && typeof option === 'object') {
          myChart.setOption(option);
        }
        
        window.addEventListener('resize', myChart.resize);
    }
    return (
            <div id="chart-container"></div>
    );
};

export default Map;
