import React, { useEffect } from 'react';
import * as echarts from 'echarts';
import './BarChart.css'; 

interface BarChartProps {
  xData: string[];
  yData: number[];
  darkMode: boolean;
  title: string;
}

const BarChart: React.FC<BarChartProps> = ({ xData, yData, darkMode, title }) => {
  useEffect(() => {
    if (xData.length === 0 || yData.length === 0) return; 

    const rootStyle = getComputedStyle(document.documentElement);
    const mainColor = rootStyle.getPropertyValue('--main-color').trim();
    const mainFont = rootStyle.getPropertyValue('--main-font').trim();

    const chartDom = document.getElementById('bar-chart')!; 
    const myChart = echarts.init(chartDom, darkMode ? 'dark' : undefined);

    const textColor = darkMode ? '#fff' : rootStyle.getPropertyValue('--paragraph-color-gray').trim();

    const option: echarts.EChartsOption = {
      backgroundColor: darkMode ? '#151B23' : 'transparent',
      xAxis: {
        type: 'category',
        data: xData,
        axisLabel: {
          fontFamily: mainFont,
          color: textColor,
        },
        axisLine: {
          lineStyle: {
            color: 'transparent',
          },
        },
        axisTick: {
          show: false,
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          fontFamily: mainFont,
          color: textColor,
        },
        axisLine: {
          lineStyle: {
            color: 'transparent',
          },
        },
        axisTick: {
          show: false,
        },
        splitLine: {
          show: false,
        },
        minInterval: 1,
      },
      series: [
        {
          data: yData,
          type: 'bar',
          itemStyle: {
            color: mainColor,
            borderRadius: [10, 10, 10, 10],
          },
          barWidth: '60%',
        },
      ],
      grid: {
        top: '20%',
        bottom: '3%',
        left: '3%',
        right: '3%',
        containLabel: true,
      },
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose();
    };
  }, [xData, yData, darkMode]);

  return (
    <div className={`chart-container ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      <h4 className={darkMode?'chart-title-dark-mode':"chart-title"}>{title}</h4>
      
      {xData.length === 0 || yData.length === 0 ? (
        <div className="chart-no-data">-- No Data --</div>
      ) : (
        <div id="bar-chart"></div>
      )}
    </div>
  );
};

export default BarChart;
