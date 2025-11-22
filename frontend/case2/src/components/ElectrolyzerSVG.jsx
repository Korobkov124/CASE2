import { useState, useEffect } from 'react';

const ElectrolyzerSVG = ({ temperature = 960, current = 300 }) => {
  const [isEmergency, setIsEmergency] = useState(false);

  useEffect(() => {
    setIsEmergency(temperature > 980 || temperature < 940);
  }, [temperature]);

  const getElectrolyteColor = () => {
    if (isEmergency) return { start: "#ff5555", end: "#aa2222" };
    const t = Math.max(940, Math.min(980, temperature));
    const ratio = (t - 940) / 40;
    const r = Math.round(30 + 200 * ratio);
    const g = Math.round(100 + 100 * (1 - ratio));
    const b = Math.round(200 - 100 * ratio);
    return {
      start: `rgb(${r}, ${g}, ${b})`,
      end: `rgb(${Math.round(r * 0.7)}, ${Math.round(g * 0.7)}, ${Math.round(b * 0.7)})`
    };
  };

  const { start: electrolyteStart, end: electrolyteEnd } = getElectrolyteColor();

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="10 100 800 400"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="electrolyteGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={electrolyteStart} stopOpacity={isEmergency ? "0.8" : "0.4"} />
          <stop offset="100%" stopColor={electrolyteEnd} stopOpacity={isEmergency ? "0.6" : "0.2"} />
        </linearGradient>
        <linearGradient id="aluminumGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#b5b6b7" />
          <stop offset="100%" stopColor="#8a8b8c" />
        </linearGradient>
        <linearGradient id="cathodeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#34495e" />
          <stop offset="100%" stopColor="#2c3e50" />
        </linearGradient>
        <linearGradient id="anodeGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e74c3c" />
          <stop offset="100%" stopColor="#c0392b" />
        </linearGradient>

        <filter id="highlight" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="6" result="blur" />
          <feFlood floodColor="#3498db" floodOpacity="0.8" result="glow" />
          <feComposite in="glow" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="emergencyGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#ff0000" floodOpacity="0.8" />
          <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
          <feFlood floodColor="#ff0000" floodOpacity="0.6" result="glow" />
          <feComposite in="glow" in2="blur" operator="in" result="glow" />
          <feMerge>
            <feMergeNode in="glow" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <rect
        x="10"
        y="100"
        width="800"
        height="400"
        rx="30"
        fill="#2c3e50"
        stroke="#354061"
        strokeWidth="3"
        filter={isEmergency ? "url(#emergencyGlow)" : ""}
      />

      <rect
        x="35"
        y="120"
        width="750"
        height="360"
        rx="20"
        fill="url(#electrolyteGrad)"
      />

      <rect
        x="35"
        y="425"
        width="750"
        height="50"
        fill="url(#aluminumGrad)"
      />
      <text
        x="410"
        y="460"
        textAnchor="middle"
        fill="#ffffff"
        fontSize="30"
        fontFamily="Arial"
        opacity="0.8"
      >
        Жидкий алюминий
      </text>

      <g id="cathode">
        <rect
          x="35"
          y="120"
          width="40"
          height="360"
          rx="15"
          fill="url(#cathodeGrad)"
          stroke="#ecf0f1"
          strokeWidth="2"
        />
        <text
          x="55"
          y="495"
          textAnchor="middle"
          fill="#ecf0f1"
          fontSize="20"
          fontFamily="Verdana"
          fontWeight="bold"
        >
          Катод
        </text>
      </g>

      <g id="anode">
        <rect
          x="745"
          y="120"
          width="40"
          height="360"
          rx="15"
          fill="url(#anodeGrad)"
          stroke="#ecf0f1"
          strokeWidth="2"
        />
        <text
          x="765"
          y="495"
          textAnchor="middle"
          fill="#ecf0f1"
          fontSize="20"
          fontFamily="Verdana"
          fontWeight="bold"
        >
          Анод
        </text>
      </g>

      <g id="current-flow">
        <path
          d="M765,300 Q600,280 400,300 T55,300"
          fill="none"
          stroke="#3498db"
          strokeWidth="3"
          strokeOpacity={isEmergency ? "0.3" : "0.5"}
          style={{ animationPlayState: isEmergency ? "paused" : "running" }}
        >
          <animate
            attributeName="d"
            values="M765,300 Q600,280 400,300 T55,300;M765,300 Q600,320 400,300 T55,300;M765,300 Q600,280 400,300 T55,300"
            dur="4s"
            repeatCount="indefinite"
            begin={isEmergency ? "indefinite" : "0s"}
          />
        </path>
        {[765, 700, 630, 560, 490, 420, 350, 280, 210, 140].map((cx, i) => {
          const cy = 300 + Math.sin(i * 0.5) * 20;
          return (
            <circle key={i} cx={cx} cy={cy} r="4" fill="#3498db" opacity={isEmergency ? "0.3" : "1"}>
              <animateMotion
                path={`M 0 0 L ${-100 - i * 30} ${Math.cos(i) * 10}`}
                dur={`${2 + i * 0.3}s`}
                repeatCount="indefinite"
                begin={isEmergency ? "indefinite" : "0s"}
              />
            </circle>
          );
        })}
      </g>

      <g id="ions">
        <circle cx="200" cy="200" r="3" fill="#3498db" opacity="0.7">
          <animateMotion path="M 0 0 L -50 0" dur="3s" repeatCount="indefinite" />
        </circle>
        <circle cx="250" cy="250" r="2" fill="#3498db" opacity="0.7">
          <animateMotion path="M 0 0 L -50 0" dur="4s" repeatCount="indefinite" />
        </circle>
        <circle cx="500" cy="230" r="3" fill="#e74c3c" opacity="0.7">
          <animateMotion path="M 0 0 L 50 0" dur="3.5s" repeatCount="indefinite" />
        </circle>
        <circle cx="550" cy="270" r="2" fill="#e74c3c" opacity="0.7">
          <animateMotion path="M 0 0 L 50 0" dur="3s" repeatCount="indefinite" />
        </circle>
      </g>

      <g id="gas-bubbles-anode">
        {[765, 750, 755, 770].map((cx, i) => (
          <circle key={i} cx={cx} cy="130" r="4" fill="#ffffff" opacity="0.6">
            <animate
              attributeName="cy"
              from="130"
              to="100"
              dur={`${2 + i * 0.5}s`}
              repeatCount="indefinite"
            />
            <animate attributeName="r" values="4;6;4" dur={`${2 + i}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>

      <g id="electrolyte-level">
        <line x1="35" y1="120" x2="785" y2="120" stroke="#ffffff" strokeDasharray="5,5" opacity="0.5" />
        <text
          x="410"
          y="170"
          textAnchor="middle"
          fill="#ffffffff"
          fontSize="30"
          fontWeight="bold"
          fontFamily="Arial"
          opacity="0.8"
        >
          t = {temperature}°C
        </text>
      </g>

      {isEmergency && (
        <g transform="translate(410, 300)">
          <rect
            x="-120"
            y="-35"
            width="240"
            height="70"
            rx="12"
            fill="#ff0000"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <text
            x="0"
            y="12"
            textAnchor="middle"
            fill="#ffffff"
            fontSize="26"
            fontFamily="Verdana"
            fontWeight="bold"
            style={{ animation: "blink 1s infinite" }}
          >
            АВАРИЯ!
          </text>
        </g>
      )}

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