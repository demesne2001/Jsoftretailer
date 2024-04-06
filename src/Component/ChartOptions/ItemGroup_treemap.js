export function ItemGroup_treemap(name) {
    const options = {
        dataLabels: {
            style: {
              colors: ['#ffffff']
            },
            enabled: true
          },
          stroke: {
            width: 0
          },
          legend: {
            show: false
          },
          colors: [
                    '#3B93A5',
                    '#F7B844',
                ],
          chart: {
            height: 350,
            type: 'treemap',
            toolbar: {
              show: true,
            },
            // animations: {
            //   enabled: false,
            //   easing: 'easeinout',
            //   speed: 800,
            //   animateGradually: {
            //     enabled: true,
            //     delay: 150
            //   },
            //   dynamicAnimation: {
            //     enabled: true,
            //     speed: 700
            //   }
            // }
          },
          title: {
            text: '',
            align: 'center'
          },
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
    return options
}