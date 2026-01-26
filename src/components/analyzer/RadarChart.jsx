import React from 'react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const RadarChart = ({ car1, car2 }) => {
  const data = {
    labels: ['Speed', 'Acceleration', 'Braking', 'Handling', 'Off-Road', 'Weight'],
    datasets: [
      {
        label: car1.name,
        data: [
          car1.stats.speed,
          car1.stats.acceleration,
          car1.stats.braking,
          car1.stats.handling,
          car1.stats.offroad,
          car1.stats.weight
        ],
        backgroundColor: 'rgba(0, 240, 255, 0.2)',
        borderColor: '#00f0ff',
        borderWidth: 2,
      },
      ...(car2 ? [{
        label: car2.name,
        data: [
          car2.stats.speed,
          car2.stats.acceleration,
          car2.stats.braking,
          car2.stats.handling,
          car2.stats.offroad,
          car2.stats.weight
        ],
        backgroundColor: 'rgba(189, 0, 255, 0.2)',
        borderColor: '#bd00ff',
        borderWidth: 2,
      }] : [])
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        },
        pointLabels: {
          color: '#9ca3af',
          font: {
            size: 12
          }
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          backdropColor: 'transparent',
          color: 'transparent' // Hide numbers for cleaner look
        }
      }
    },
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'
        }
      }
    }
  };

  return <Radar data={data} options={options} />;
};

export default RadarChart;
