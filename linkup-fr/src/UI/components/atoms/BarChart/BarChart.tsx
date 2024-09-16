import React, { useEffect } from 'react';
import * as echarts from 'echarts';

interface BarChartProps {
  xData: string[]; // Datos del eje X
  yData: number[]; // Datos del eje Y
  darkMode: boolean; // Modo oscuro
}

const BarChart: React.FC<BarChartProps> = ({ xData, yData, darkMode }) => {
  useEffect(() => {
    // Obtener el valor de la variable CSS --main-color
    const rootStyle = getComputedStyle(document.documentElement);
    const mainColor = rootStyle.getPropertyValue('--main-color').trim(); // Obtener el valor de la variable y eliminar espacios en blanco
    const mainFont = rootStyle.getPropertyValue('--main-font').trim(); // Obtener el valor de la fuente

    const chartDom = document.getElementById('main')!;
    const myChart = echarts.init(chartDom, darkMode ? 'dark' : undefined);

    const textColor = darkMode ? '#fff' : '#000'; // Color de las etiquetas basado en el modo

    const option: echarts.EChartsOption = {
      xAxis: {
        type: 'category',
        data: xData,
        axisLabel: {
          fontFamily: mainFont, // Aplicar la fuente global
          color: textColor, // Color de las etiquetas basado en el modo
        },
        axisLine: {
          lineStyle: {
            color: 'transparent', // Ocultar línea del eje X
          },
        },
        axisTick: {
          show: false, // Ocultar ticks en el eje X
        },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          fontFamily: mainFont, // Aplicar la fuente global
          color: textColor, // Color de las etiquetas basado en el modo
        },
        axisLine: {
          lineStyle: {
            color: 'transparent', // Ocultar línea del eje Y
          },
        },
        axisTick: {
          show: false, // Ocultar ticks en el eje Y
        },
        splitLine: {
          show: false, // Ocultar líneas secundarias
        },
        minInterval: 1, // Asegura que el espaciado sea de 1 en 1
      },
      series: [
        {
          data: yData,
          type: 'bar',
          itemStyle: {
            color: mainColor, // Usar el color de la variable CSS
            borderRadius: [10, 10, 10, 10], // Bordes redondeados (top-left, top-right, bottom-right, bottom-left)
          },
          barWidth: '60%', // Ajustar el ancho de las barras
        },
      ],
      grid: {
        containLabel: true,
        bottom: '3%', // Espacio superior del gráfico
      },
    };

    myChart.setOption(option);

    return () => {
      myChart.dispose(); // Limpiar la instancia del gráfico al desmontar el componente
    };
  }, [xData, yData, darkMode]); // Dependencias para actualizar el gráfico cuando cambian los props

  return (
    <div
      id="main"
      style={{
        width: '50%',
        height: '60%',
        borderRadius: '30px',
        overflow: 'hidden', // Asegurar que el borde redondeado sea visible
        backgroundColor: darkMode ? '#333' : '#f5f5f5', // Gris beige para modo claro
      }}
    ></div>
  );
};

export default BarChart;
