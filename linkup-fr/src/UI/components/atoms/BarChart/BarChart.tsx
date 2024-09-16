import React, { useEffect } from 'react';
import * as echarts from 'echarts';

interface BarChartProps {
  xData: string[];
  yData: number[];
  darkMode: boolean;
  title: string;
}

const BarChart: React.FC<BarChartProps> = ({ xData, yData, darkMode, title }) => {
  useEffect(() => {
    if (xData.length === 0 || yData.length === 0) return; // No inicializar gráfico si no hay datos

    const rootStyle = getComputedStyle(document.documentElement);
    const mainColor = rootStyle.getPropertyValue('--main-color').trim();
    const mainFont = rootStyle.getPropertyValue('--main-font').trim();

    const chartDom = document.getElementById('main')!;
    const myChart = echarts.init(chartDom, darkMode ? 'dark' : undefined);

    const textColor = darkMode ? '#fff' : rootStyle.getPropertyValue('--paragraph-color-gray').trim();

    const option: echarts.EChartsOption = {
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
    <div style={{ position: 'relative', width: '50%', height: '60%' }}>
      <h4
        style={{
          position: 'absolute',
          top: '10%', 
          left: '5%',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'left',
          fontFamily: 'var(--main-font)',
          color: darkMode ? '#fff' : 'var(--paragraph-color-gray)',
          fontWeight: '400',
          fontSize: '1.5rem',
          zIndex: 20,
        }}
      >
        {title}
      </h4>
      
      {xData.length === 0 || yData.length === 0 ? (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: darkMode ? '#fff' : '#333',
            fontFamily: 'var(--main-font)',
            fontSize: '1.2rem',
            textAlign: 'center',
          }}
        >
          -- No Data --
        </div>
      ) : (
        <div
          id="main"
          style={{
            position: 'absolute',
            top: '6%',
            width: '100%',
            height: '94%',
            borderRadius: '30px',
            overflow: 'hidden',
            backgroundColor: darkMode ? '#333' : '#d3d3d3',
            zIndex: 10,
          }}
        ></div>
      )}
    </div>
  );
};

export default BarChart;
