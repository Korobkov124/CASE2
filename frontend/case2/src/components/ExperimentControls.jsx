import React from 'react';
import './ExperimentControls.css';

const ExperimentControls = ({ isRunning, onStart, onPause, onStop }) => {
  return (
    <div className="experiment-controls">
      <div className="control-buttons">
        {!isRunning && (
          <button
            className="control-btn start-btn"
            onClick={onStart}
            disabled={isRunning}
          >
            <span className="btn-icon">▶</span>Старт
          </button>
        )}
        {isRunning && (
          <button
            className="control-btn pause-btn"
            onClick={onPause}
          >
            <span className="btn-icon">⏸</span>Пауза
          </button>
        )}
        <button
          className="control-btn stop-btn"
          onClick={onStop}
        >
          <span className="btn-icon">⏹</span>Стоп
        </button>
      </div>
    </div>
  );
};

export default ExperimentControls;