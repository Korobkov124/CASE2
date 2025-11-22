import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { GraphicsService } from '../services/GraphicsService';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Graphics = ({
  temperature,
  current,
  isRunning,
  lastEnergyConsumption,
  lastCurrentOutput,
}) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Расход энергии (кВт·ч/кг)',
        data: [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: false,
        yAxisID: 'y', // Primary y-axis
      },
      {
        label: 'Выход по току (%)',
        data: [],
        borderColor: 'rgb(153, 102, 255)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: false,
        yAxisID: 'y1', // Secondary y-axis
      },
    ],
  });

  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);
  const paramsRef = useRef({ temperature, current });

  // Update the params ref when temperature or current changes
  useEffect(() => {
    paramsRef.current = { temperature, current };
  }, [temperature, current]);

  // Function to fetch new data and update chart
  const updateChartData = useCallback(async () => {
    try {
      const { temperature: currentTemp, current: currentCurr } =
        paramsRef.current;

      const response = await GraphicsService.getGraphicParameters(
        currentTemp,
        currentCurr
      );

      // Update the parent component with the new values
      if (
        lastEnergyConsumption &&
        typeof lastEnergyConsumption === 'function'
      ) {
        lastEnergyConsumption(response.energyConsumption);
      }
      if (lastCurrentOutput && typeof lastCurrentOutput === 'function') {
        lastCurrentOutput(response.currentOutput);
      }

      // Calculate actual time from start
      const currentTime = new Date();
      let timeLabel;

      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
        timeLabel = 't=0s';
      } else {
        const timeDiff = Math.floor(
          (currentTime - startTimeRef.current) / 1000
        ); // in seconds
        timeLabel = `t=${timeDiff}s`;
      }

      setChartData((prevData) => {
        const newLabels = [...prevData.labels, timeLabel];
        const newEnergyData = [
          ...prevData.datasets[0].data,
          parseFloat(response.energyConsumption),
        ];
        const newCurrentData = [
          ...prevData.datasets[1].data,
          parseFloat(response.currentOutput),
        ];

        // Limit the number of points to 20 to prevent chart overcrowding
        if (newLabels.length > 20) {
          newLabels.shift();
          newEnergyData.shift();
          newCurrentData.shift();
        }

        return {
          labels: newLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: newEnergyData,
            },
            {
              ...prevData.datasets[1],
              data: newCurrentData,
            },
          ],
        };
      });
    } catch (error) {
      console.error('Error fetching graphic parameters:', error);
      // If API call fails, use simulated data as fallback
      const simulatedResponse = {
        energyConsumption: (0.15 + Math.random() * 0.05).toFixed(5),
        currentOutput: 80 + Math.random() * 10,
      };

      // Update the parent component with the simulated values
      if (
        lastEnergyConsumption &&
        typeof lastEnergyConsumption === 'function'
      ) {
        lastEnergyConsumption(simulatedResponse.energyConsumption);
      }
      if (lastCurrentOutput && typeof lastCurrentOutput === 'function') {
        lastCurrentOutput(simulatedResponse.currentOutput);
      }

      // Calculate actual time from start
      const currentTime = new Date();
      let timeLabel;

      if (!startTimeRef.current) {
        startTimeRef.current = currentTime;
        timeLabel = 't=0s';
      } else {
        const timeDiff = Math.floor(
          (currentTime - startTimeRef.current) / 1000
        ); // in seconds
        timeLabel = `t=${timeDiff}s`;
      }

      setChartData((prevData) => {
        const newLabels = [...prevData.labels, timeLabel];
        const newEnergyData = [
          ...prevData.datasets[0].data,
          parseFloat(simulatedResponse.energyConsumption),
        ];
        const newCurrentData = [
          ...prevData.datasets[1].data,
          parseFloat(simulatedResponse.currentOutput),
        ];

        // Limit the number of points to 20 to prevent chart overcrowding
        if (newLabels.length > 20) {
          newLabels.shift();
          newEnergyData.shift();
          newCurrentData.shift();
        }

        return {
          labels: newLabels,
          datasets: [
            {
              ...prevData.datasets[0],
              data: newEnergyData,
            },
            {
              ...prevData.datasets[1],
              data: newCurrentData,
            },
          ],
        };
      });
    }
  }, [lastEnergyConsumption, lastCurrentOutput]);

  // Handle start/stop/pause logic - only depends on isRunning state
  useEffect(() => {
    if (isRunning) {
      // Clear any existing interval before starting a new one
      // if (intervalRef.current) {
      //   clearInterval(intervalRef.current);
      // }

      // Update chart data immediately on start
      // updateChartData();

      // Set up interval to update every second
      intervalRef.current = setInterval(updateChartData, 1000);
    } else {
      // Clear interval when paused or stopped
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, updateChartData]);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: 'white', // White legend labels
        },
      },
      title: {
        display: true,
        text: 'Графики выходных параметров в реальном времени',
        color: 'white', // White title
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Расход энергии (кВт·ч/кг)',
          color: 'white', // White title text
        },
        min: 13000,  // Static minimum for energy consumption
        max: 19000,  // Static maximum for energy consumption
        beginAtZero: false,
        ticks: {
          color: 'white', // White tick labels
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)', // Light white grid lines
        },
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Выход по току (%)',
          color: 'white', // White title text
        },
        min: 65,  // Static minimum for current output
        max: 95,  // Static maximum for current output
        beginAtZero: false,
        ticks: {
          color: 'white', // White tick labels
        },
        // grid line settings for the right axis
        grid: {
          drawOnChartArea: false, // Only draw grid lines on the left axis
          color: 'rgba(255, 255, 255, 0.1)', // Light white grid lines
        },
      },
      x: {
        // Grid lines for the x-axis
        grid: {
          display: true,
          color: 'rgba(255, 255, 255, 0.1)', // Light white grid lines
        },
        ticks: {
          color: 'white', // White tick labels
        },
      },
    },
    animation: {
      duration: 300,
    },
  };

  return <Line data={chartData} options={options} />;
};

export default Graphics;
