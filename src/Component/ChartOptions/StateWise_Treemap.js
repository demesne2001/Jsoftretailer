export function StateWise_Treemap(name){
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