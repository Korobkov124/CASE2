import { useState, useEffect } from 'react';
import ElectrolyzerSVG from '../components/ElectrolyzerSVG';
import Graphics from '../components/Graphics';
import ExperimentControls from '../components/ExperimentControls';
import { GraphicsService } from '../services/GraphicsService';
import '../Home.css';

function Home() {
  const [temp, setTemp] = useState(960);
  const [curr, setCurr] = useState(180);
  const [isRunning, setIsRunning] = useState(false);
  const [resetKey, setResetKey] = useState(0);
  const [lastEnergyConsumption, setLastEnergyConsumption] = useState(null);
  const [lastCurrentOutput, setLastCurrentOutput] = useState(null);

  // Calculate default values when not running
  const energyConsumption = (
    8.0 +
    (temp - 960) * 0.01 +
    (curr - 300) * 0.005
  ).toFixed(1);
  const currentEfficiency = (
    95 -
    Math.abs(temp - 960) * 0.03 -
    Math.abs(curr - 300) * 0.01
  ).toFixed(1);
  const clampedEfficiency = Math.max(70, Math.min(98, currentEfficiency));

  // Initialize with default values from API on component mount
  useEffect(() => {
    const initializeWithDefaults = async () => {
      try {
        // Fetch initial values using default parameters
        const response = await GraphicsService.getGraphicParameters(960, 300);
        setLastEnergyConsumption(response.energyConsumption);
        setLastCurrentOutput(response.currentOutput);
      } catch (error) {
        console.error('Error fetching initial values:', error);
        // Use calculated values as fallback
        setLastEnergyConsumption(energyConsumption);
        setLastCurrentOutput(clampedEfficiency);
      }
    };

    initializeWithDefaults();
  }, []);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleStop = () => {
    setIsRunning(false);
    // Reset the chart data by changing the key to force remount
    setResetKey((prev) => prev + 1);
  };

  // Update last received values when the API calls are made
  // For now, I'll simulate the update when running starts
  useEffect(() => {
    if (isRunning) {
      // In a real implementation, this would be updated when API data is received
      // The actual values would be passed from the Graphics component
    }
  }, [isRunning, temp, curr]);

  // When the experiment is not running, show the calculated values
  // When running, show the last received values from API
  const displayEnergyConsumption = isRunning
    ? lastEnergyConsumption || energyConsumption
    : lastEnergyConsumption || energyConsumption;
  const displayCurrentOutput = isRunning
    ? lastCurrentOutput || clampedEfficiency
    : lastCurrentOutput || clampedEfficiency;

  return (
    <div className="elDiv">
      <div className="Electrolyzer">
        <h2 className="block-title">Модель электролизера</h2>
        <ElectrolyzerSVG temperature={temp} current={curr} />
      </div>

      <div className="Inputs">
        <h2 className="block-title">Входные параметры</h2>
        <div className="input-group">
          <label>Температура электролита, °C</label>
          <input
            type="range"
            min="900"
            max="1000"
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
          />
          <span>{temp}°C</span>
        </div>
        <div className="input-group">
          <label>Сила тока, кА</label>
          <input
            type="range"
            min="160"
            max="180"
            value={curr}
            onChange={(e) => setCurr(Number(e.target.value))}
          />
          <span>{curr} кА </span>
        </div>
      </div>
      <div className="Charts">
        <h2 className="block-title">Графики выходных параметров</h2>
        <div className="graphics-container">
          <Graphics
            key={resetKey}
            temperature={temp}
            current={curr}
            isRunning={isRunning}
            lastEnergyConsumption={(value) => setLastEnergyConsumption(value)}
            lastCurrentOutput={(value) => setLastCurrentOutput(value)}
            onPause={handlePause}
            onPlay={handleStart}
            onStop={handleStop}
          />
        </div>
        <div className="controls-container">
          <ExperimentControls
            isRunning={isRunning}
            onStart={handleStart}
            onPause={handlePause}
            onStop={handleStop}
          />
        </div>
      </div>
      <div className="Calc">
        <h2 className="block-title">Показатели эффективности</h2>
        <div className="result">
          <span>Расход энергии:</span>
          <strong>{displayEnergyConsumption} кВт·ч/кг</strong>
        </div>
        <div className="result">
          <span>Выход по току:</span>
          <strong>{displayCurrentOutput}%</strong>
        </div>
      </div>
    </div>
  );
}

export default Home;
