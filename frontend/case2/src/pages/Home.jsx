import ElectrolyzerSVG from "../components/ElectrolyzerSVG";
import "../Home.css";

function Home() {
  return (
    <div className="elDiv">
      <div className="Electrolyzer">
        <h2 className="block-title">Модель электролизера</h2>
        <ElectrolyzerSVG />
      </div>
      <div className="Inputs">
        <h2 className="block-title">Входные параметры</h2>
        <div className="input-group">
          <label>Температура электролита, °C</label>
          <input type="range" min="800" max="1000" defaultValue="960" />
        </div>
        <div className="input-group">
          <label>Сила тока, А</label>
          <input type="range" min="100" max="500" defaultValue="300" />
        </div>
      </div>
      <div className="Charts">
        <h2 className="block-title">Графики выходных параметров</h2>
        <p className="placeholder">График зависимости расхода энергии от силы тока</p>
      </div>
      <div className="Calc">
        <h2 className="block-title">Показатели эффективности</h2>
        <div className="result">
          <span>Расход энергии:</span>
          <strong>8.5 кВт·ч/кг</strong>
        </div>
        <div className="result">
          <span>Выход по току:</span>
          <strong>92%</strong>
        </div>
      </div>
    </div>
  );
}

export default Home;