import * as echarts from 'echarts';

const BarChart:React.FC=()=>{
    type EChartsOption = echarts.EChartsOption;

    const chartDom = document.getElementById('main')!;
    const myChart = echarts.init(chartDom, 'dark');
    let option: EChartsOption;

    option = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'bar'
        }
    ]
    };

    option && myChart.setOption(option);
    return (
        <div>
            myChart()
        </div>
    )
}

export default BarChart;