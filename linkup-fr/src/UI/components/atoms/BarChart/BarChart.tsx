import React, { useEffect } from 'react'; // Importing React and useEffect hook
import * as echarts from 'echarts'; // Importing echarts library for chart rendering
import './BarChart.css'; // Importing CSS styles for the BarChart component

// Defining the interface for the props that the BarChart component will receive
interface BarChartProps {
  xData: string[]; // Data for the x-axis (categories)
  yData: number[]; // Data for the y-axis (values)
  darkMode: boolean; // Flag to indicate if dark mode is enabled
  title: string; // Title of the chart
}

// Creating the BarChart component
const BarChart: React.FC<BarChartProps> = ({ xData, yData, darkMode, title }) => {
  
  useEffect(() => {
    // Check if there is data to display; if not, exit early
    if (xData.length === 0 || yData.length === 0) return; 

    // Get root styles for color and font configurations
    const rootStyle = getComputedStyle(document.documentElement);
    const mainColor = rootStyle.getPropertyValue('--main-color').trim(); // Main color from CSS variables
    const mainFont = rootStyle.getPropertyValue('--main-font').trim(); // Font from CSS variables

    // Initialize the chart element
    const chartDom = document.getElementById('bar-chart')!; 
    const myChart = echarts.init(chartDom, darkMode ? 'dark' : undefined); // Initialize echarts with dark mode if applicable

    // Determine text color based on dark mode
    const textColor = darkMode ? '#fff' : rootStyle.getPropertyValue('--paragraph-color-gray').trim();

    // Configure the chart options
    const option: echarts.EChartsOption = {
      backgroundColor: darkMode ? '#151B23' : 'transparent', // Set background color based on mode
      xAxis: {
        type: 'category', // Set x-axis to category type
        data: xData, // Assign x-axis data
        axisLabel: {
          fontFamily: mainFont, // Font for x-axis labels
          color: textColor, // Color for x-axis labels
        },
        axisLine: {
          lineStyle: {
            color: 'transparent', // Hide x-axis line
          },
        },
        axisTick: {
          show: false, // Hide x-axis ticks
        },
      },
      yAxis: {
        type: 'value', // Set y-axis to value type
        axisLabel: {
          fontFamily: mainFont, // Font for y-axis labels
          color: textColor, // Color for y-axis labels
        },
        axisLine: {
          lineStyle: {
            color: 'transparent', // Hide y-axis line
          },
        },
        axisTick: {
          show: false, // Hide y-axis ticks
        },
        splitLine: {
          show: false, // Hide y-axis split lines
        },
        minInterval: 1, // Set minimum interval for y-axis
      },
      series: [
        {
          data: yData, // Assign y-axis data
          type: 'bar', // Set the series type to bar
          itemStyle: {
            color: mainColor, // Set bar color
            borderRadius: [10, 10, 10, 10], // Round bar corners
          },
          barWidth: '60%', // Set width of the bars
        },
      ],
      grid: {
        top: '20%', // Set top margin for the grid
        bottom: '3%', // Set bottom margin for the grid
        left: '3%', // Set left margin for the grid
        right: '3%', // Set right margin for the grid
        containLabel: true, // Ensure grid does not overlap with labels
      },
    };

    // Set the chart options to the chart instance
    myChart.setOption(option);

    // Cleanup function to dispose of the chart on component unmount
    return () => {
      myChart.dispose(); // Dispose the chart instance to free up resources
    };
  }, [xData, yData, darkMode]); // Dependency array for useEffect

  return (
    <div className={`chart-container ${darkMode ? 'dark-mode' : 'light-mode'}`}> {/* Conditional class for dark/light mode */}
      <h4 className={darkMode ? 'chart-title-dark-mode' : "chart-title"}>{title}</h4> {/* Title of the chart */}
      
      {/* Conditional rendering for no data */}
      {xData.length === 0 || yData.length === 0 ? (
        <div className="chart-no-data">-- No Data --</div> // Message when no data is available
      ) : (
        <div id="bar-chart"></div> // Chart container
      )}
    </div>
  );
};

export default BarChart; // Exporting the BarChart component
