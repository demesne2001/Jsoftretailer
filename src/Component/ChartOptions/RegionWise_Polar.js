export function RegionWise_Polar(name) {
    const options = {
        chart: {
            width: 380,
            type: 'polarArea'
        },
        labels: name,
        fill: {
            opacity: 3
        },
        stroke: {
            width: 1,
            colors: undefined
        },
        yaxis: {
            show: false
        },
        legend: {
            show: false
        },
        plotOptions: {
            polarArea: {
                rings: {
                    strokeWidth: 0
                },
                spokes: {
                    strokeWidth: 0
                },
            }
        },
        colors: '#2b908f',
        theme: {
            palette: 'palette1', 
            // monochrome: {
            // 	enabled: false,
            // 	shadeTo: 'light',
            // 	shadeIntensity: 1.5
            // }
        },
        dataLabels: {
            formatter: function (val) {
                return val + "%"
              },
            enabled: true,
            // textAnchor: 'middle',
            offsetY: 50,
            style: {
                fontSize: '17px',
                colors: ["#fff"],
            },
            background: {
                enabled: false,
                foreColor: '#fff',
                padding: 0,
                borderRadius: 0,
                borderWidth: 0,
                // borderColor: '#26a0fc',
                opacity: 1,

            }
        },
    }
    return options
}