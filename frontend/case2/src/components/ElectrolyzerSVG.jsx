import { useState, useEffect } from 'react';

const ElectrolyzerSVG = ({ temperature = 960, current = 300 }) => {
  const [isEmergency, setIsEmergency] = useState(false);

  // Авария при температуре > 980°C
  useEffect(() => {
    if (temperature > 980) {
      setIsEmergency(true);
    } else {
      setIsEmergency(false);
    }
  }, [temperature]);

  return (
    <svg width="100%" height="100%" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
      <defs>
        {/* Градиенты */}
        <linearGradient id="electrolyteGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1d6ca8" stopOpacity={isEmergency ? "0.8" : "0.4"} />
          <stop offset="100%" stopColor="#1d4f88" stopOpacity={isEmergency ? "0.6" : "0.2"} />
        </linearGradient>
        <linearGradient id="cathodeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34495e"/>
          <stop offset="100%" stopColor="#2c3e50"/>
        </linearGradient>
        <linearGradient id="anodeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={isEmergency ? "#e74c3c" : "#e74c3c"}/>
          <stop offset="100%" stopColor={isEmergency ? "#c0392b" : "#c0392b"}/>
        </linearGradient>

        {/* Фильтры */}
        <filter id="highlight" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur"/>
          <feFlood floodColor="#3498db" floodOpacity="0.8" result="glow"/>
          <feComposite in="glow" in2="blur" operator="in" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Аварийный фильтр */}
        <filter id="emergencyGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#ff0000" floodOpacity="0.8"/>
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur"/>
          <feFlood floodColor="#ff0000" floodOpacity="0.6" result="glow"/>
          <feComposite in="glow" in2="blur" operator="in" result="glow"/>
          <feMerge>
            <feMergeNode in="glow"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Основной контейнер */}
      <rect
        x="100"
        y="100"
        width="600"
        height="400"
        rx="30"
        fill="#2c3e50"
        stroke="#354061"
        strokeWidth="3"
        filter={isEmergency ? "url(#emergencyGlow)" : ""}
      />

      {/* Электролит */}
      <rect
        x="110"
        y="150"
        width="580"
        height="340"
        rx="20"
        fill="url(#electrolyteGrad)"
        filter={isEmergency ? "url(#emergencyGlow)" : ""}
      />

      {/* Слой с деталями — масштабируем его */}
      <g transform="scale(1.2) translate(-100, -100)">
        {/* Катод */}
        <g id="cathode">
          <rect
            x="150"
            y="160"
            width="40"
            height="320"
            rx="15"
            fill="url(#cathodeGrad)"
            stroke="#ecf0f1"
            strokeWidth="2"
          />
          <text
            x="170"
            y="495"
            textAnchor="middle"
            fill="#ecf0f1"
            fontSize="16"
            fontFamily="Verdana"
            fontWeight="bold"
          >
            Катод
          </text>
          {/* Деталь: метка позиции */}
          <text
            x="150"
            y="150"
            fill="#bdc3c7"
            fontSize="10"
            fontFamily="Arial"
          >
            X=150, Y=160
          </text>
        </g>

        {/* Анод */}
        <g id="anode">
          <rect
            x="610"
            y="160"
            width="40"
            height="320"
            rx="15"
            fill="url(#anodeGrad)"
            stroke="#ecf0f1"
            strokeWidth="2"
          />
          <text
            x="630"
            y="495"
            textAnchor="middle"
            fill="#ecf0f1"
            fontSize="16"
            fontFamily="Verdana"
            fontWeight="bold"
          >
            Анод
          </text>
          {/* Деталь: метка позиции */}
          <text
            x="610"
            y="150"
            fill="#bdc3c7"
            fontSize="10"
            fontFamily="Arial"
          >
            X=610, Y=160
          </text>
        </g>

        {/* Движение тока */}
        <g id="current-flow">
          <path
            d="M190,300 Q300,280 400,300 T600,300"
            fill="none"
            stroke="#3498db"
            strokeWidth="3"
            strokeOpacity={isEmergency ? "0.3" : "0.5"}
            style={{ animationPlayState: isEmergency ? "paused" : "running" }}
          >
            <animate
              attributeName="d"
              values="
                M190,300 Q300,280 400,300 T600,300;
                M190,300 Q300,320 400,300 T600,300;
                M190,300 Q300,280 400,300 T600,300
              "
              dur="4s"
              repeatCount="indefinite"
              begin={isEmergency ? "indefinite" : "0s"}
            />
          </path>
          {/* Частицы тока */}
          {[190, 250, 310, 370].map((cx, i) => (
            <circle
              key={i}
              cx={cx}
              cy="300"
              r="4"
              fill="#3498db"
              opacity={isEmergency ? "0.3" : "1"}
            >
              <animateMotion
                path="M 0 0 L 410 0"
                dur={`${2 + i * 0.5}s`}
                repeatCount="indefinite"
                begin={isEmergency ? "indefinite" : "0s"}
              />
            </circle>
          ))}
        </g>

        {/* Ионы в электролите */}
        <g id="ions">
          {/* Положительные ионы (движутся к катоду) */}
          <circle cx="200" cy="200" r="3" fill="#3498db" opacity="0.7">
            <animateMotion path="M 0 0 L -50 0" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="250" cy="250" r="2" fill="#3498db" opacity="0.7">
            <animateMotion path="M 0 0 L -50 0" dur="4s" repeatCount="indefinite" />
          </circle>
          {/* Отрицательные ионы (движутся к аноду) */}
          <circle cx="500" cy="230" r="3" fill="#e74c3c" opacity="0.7">
            <animateMotion path="M 0 0 L 50 0" dur="3.5s" repeatCount="indefinite" />
          </circle>
          <circle cx="550" cy="270" r="2" fill="#e74c3c" opacity="0.7">
            <animateMotion path="M 0 0 L 50 0" dur="3s" repeatCount="indefinite" />
          </circle>
        </g>

        {/* Аварийное сообщение */}
        {isEmergency && (
          <g transform="translate(300, 200)">
            <rect
              x="-100"
              y="-30"
              width="200"
              height="60"
              rx="10"
              fill="#ff0000"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <text
              x="0"
              y="10"
              textAnchor="middle"
              fill="#ffffff"
              fontSize="24"
              fontFamily="Verdana"
              fontWeight="bold"
              style={{
                animation: "blink 1s infinite",
              }}
            >
              АВАРИЯ!
            </text>
          </g>
        )}

        {/* Параметры */}
        <g id="parameter-controls">
          <g transform="translate(170, 300)" className="highlightable" data-param="current">
            <circle r="20" fill="#3498db" fillOpacity="0.2" stroke="#3498db" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fill="#3498db" fontSize="14" fontFamily="sans-serif" fontWeight="bold">I</text>
          </g>
          <g transform="translate(400, 520)" className="highlightable" data-param="temperature">
            <circle r="20" fill="#e67e22" fillOpacity="0.2" stroke="#e67e22" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fill="#e67e22" fontSize="14" fontFamily="sans-serif" fontWeight="bold">T</text>
          </g>
        </g>
      </g>
      
      <style>{`
        @keyframes blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
        .highlightable:hover {
          filter: url(#highlight);
          cursor: pointer;
        }
      `}</style>
    </svg>
  );
};

export default ElectrolyzerSVG;