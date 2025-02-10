import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';
import { DataChartProps } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

const DataChart: React.FC<DataChartProps> = ({ data }) => {
  const chartData = {
    labels: data.map(item => new Date(item.timestamp).toLocaleDateString()),
    datasets: [{
      data: data.map(item => item.close),
      borderColor: '#008080',
      tension: 0.1
    }]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        title: {
          display: true,
          text: 'Closing Price ($)'
        }
      }
    }
  };

  return (
    <div data-testid="data-chart">
      <Line data={chartData} options={options} />
    </div>
  );
};

export default DataChart;
