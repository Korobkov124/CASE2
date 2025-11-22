import { useState } from 'react';
import ElectrolyzerSVG from '../components/ElectrolyzerSVG';
import '../Home.css';

function Home() {
  const [temp, setTemp] = useState(960);
  const [curr, setCurr] = useState(300);
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
            min="800"
            max="1000"
            value={temp}
            onChange={(e) => setTemp(Number(e.target.value))}
          />
          <span>{temp}°C</span>
        </div>
        <div className="input-group">
          <label>Сила тока, А</label>
          <input
            type="range"
            min="100"
            max="500"
            value={curr}
            onChange={(e) => setCurr(Number(e.target.value))}
          />
          <span>{curr} А</span>
        </div>
      </div>
      <div className="Charts">
        <h2 className="block-title">Графики выходных параметров</h2>
        <p className="placeholder">
          Зависимость расхода энергии и выхода по току от параметров
        </p>
      </div>
      <div className="Calc">
        <h2 className="block-title">Показатели эффективности</h2>
        <div className="result">
          <span>Расход энергии:</span>
          <strong>{energyConsumption} кВт·ч/кг</strong>
        </div>
        <div className="result">
          <span>Выход по току:</span>
          <strong>{clampedEfficiency}%</strong>
        </div>
      </div>
    </div>
  );
}

export default Home;
