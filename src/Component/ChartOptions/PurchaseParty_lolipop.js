export function PurchaseParty_lolipop(name) {
    const options = {
        chart: {
            height: 350,
            type: 'bar',
          },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: '10%',
              // columnWidth: '1%',
              borderRadius: 1,
              dataLabels: {
                position: 'top', // top, center, bottom
              },
            }
          },
          dataLabels: {
            position: 'top',
            enabled: true,
            formatter: function (val) {
              return val;
            },
            offsetY: 0,
            offsetX: 60,
            style: {
              fontSize: '14px',
              colors: ["#25e1fa"],
            },
            background: {
              enabled: true,
              foreColor: '#000000',
              padding: 10,
              borderRadius: 52,
              borderWidth: 1,
              borderColor: '#26a0fc',
              opacity: 1,
    
            }
          },
    
          xaxis: {
            labels: {
                      show: true,
                  type: 'numeric',
                  stepSize: 60000
                  },
            // categories: name,
            // position: 'bottom',
            // axisBorder: {
            // 	show: false
            // },
            // axisTicks: {
            // 	show: false
            // },
            // crosshairs: {
            // 	fill: {
            // 		type: 'gradient',
            // 		gradient: {
            // 			colorFrom: '#D8E3F0',
            // 			colorTo: '#BED1E6',
            // 			stops: [0, 100],
            // 			opacityFrom: 0.4,
            // 			opacityTo: 0.5,
            // 		}
            // 	}
            // },
            tooltip: {
              enabled: true,
            }
          },
    }
    return options
}