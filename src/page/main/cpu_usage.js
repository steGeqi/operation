export function Cpu_usage_echarts(data){
    return {
        series: [
            {
                type: 'gauge',
                startAngle: 180,
                endAngle: 0,
                min: 0,
                max: 1,
                axisLine: {
                    lineStyle: {
                        width: 6,
                        color: [
                            [0.25, '#7CFFB2'],
                            [0.5, '#58D9F9'],
                            [0.75, '#FDDD60'],
                            [1, '#FF6E76']
                        ]
                    }
                },
                splitLine: {
                    length: 20,
                    lineStyle: {
                        color: 'auto',
                        width: 5
                    }
                },
                detail: {
                    fontSize: 15,
                    offsetCenter: [0, '40%'],
                    formatter: function (value) {
                        var result = Math.round(value * 10000) / 100
                        return + result + '%';
                    },
                    color: 'auto'
                },
                data: [
                    {
                        value: data * 0.01,
                    }
                ]
            }
        ]
    };
}
