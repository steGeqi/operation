export function Par_usage(data){
    return  {
        series: [
            {
                type: 'gauge',
                center: ['50%', '50%'],
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: 100,
                splitNumber: 12,
                itemStyle: {
                    color: '#FFAB91'
                },
                progress: {
                    show: true,
                    width: 30
                },

                axisLine: {
                    lineStyle: {
                        width: 30
                    }
                },
                axisLabel: {
                    show:false
                },
                detail: {
                    valueAnimation: true,
                    borderRadius: 8,
                    offsetCenter: [0,20],
                    fontSize: 15,
                    formatter: '{value} %',
                    color: 'auto'
                },
                data: [
                    {
                        value: data
                    }
                ]
            },
        ]
    };
}