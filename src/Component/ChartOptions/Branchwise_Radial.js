
export function BranchWise_Radial(name){
const options = {
    dataLabels: {
        enabled: false,
        formatter: function (val, opts) {
            return (val.toFixed(2)) + '%'
        },
        style: {
            fontSize: '14px',
            fontFamily: 'Helvetica, Arial, sans-serif',
            fontWeight: 200,
            colors: ['#fff']
        },
        background: {
            enabled: false,
        }
    },
    tooltip: {
        enabled: true,
        followCursor: true,
    },
    chart: {
        type: 'donut',
        animations: {
            enabled: true,
            easing: 'easein',
        },
    },

    stroke: {
        width: 0,
    },

    fill: {
        type: 'solid',
        opacity: 2
    },

    plotOptions: {
        radialBar: {
            offsetY: 0,
            startAngle: 0,
            endAngle: 270,
            hollow: {
                size: '10%',
                // background: 'transparent',
                // image: undefined,
            },
            show: false,
            dataLabels: {
                name: {
                    show: false,
                },
                value: {
                    show: false,
                }
            }
        }
    },

    // colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e', '#f48024', '#69d2e7'],
    labels: name,
    legend: {
        show: true,
        floating: true,
        fontSize: '15px',
        position: 'left',
        offsetX: 130,
        offsetY: 7,
        labels: {
            useSeriesColors: true,
        },
        markers: {
            width: 0,
            height: 0
        }
    },
    responsive: [{
        breakpoint: 593,
        options: {
            legend: {
                show: true,
                floating: true,
                fontSize: '15px',
                position: 'left',
                offsetX: 10,
                offsetY: 7,
                labels: {
                    useSeriesColors: true,
                },
                markers: {
                    width: 0,
                    height: 0
                }
            },
        },
    }]

}
return options
}
