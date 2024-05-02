import { Tooltip } from "react-bootstrap";

export function StateWise_Treemap(name, column){
    const options = {
        dataLabels: {
            enabled: true,
            formatter: function (val, opts) {
                return val
            },
            style: {
                fontSize: '14px',
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 600,
                colors: ['#fff']
            },
            background: {
                enabled: false,
            }
        },
        
        legend: {
            show: false
        },
        // labels: name,
        chart: {
            height: 350,
            type: 'treemap',
            toolbar: {
                show: true,
            },
            animations: {
                enabled: true,
                easing: 'easeinout',
                speed: 800,
                animateGradually: {
                    enabled: true,
                    delay: 150
                },
                dynamicAnimation: {
                    enabled: true,
                    speed: 600
                }
            }
        },
        tooltip:{
            enabled: true,
            x:{
                formatter: function(val) {
                    return val
                },
            },
            y: {
                formatter: function(val) {
                    // console.log(column, "prdcccccc");
                    if (column === 'Prc') {
                        return val  + "%"
                    } else {
                        return val
                    }
                },
                title: {
                    // formatter: (seriesName) => seriesName,
                },
            },
        },
        title: {
            text: '',
            align: 'center'
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
        ],
        plotOptions: {
            treemap: {
                distributed: true,
                enableShades: false,
                dataLabels: {
                    format: 'scale'
                }
            }
        }
    }
    return options;
}