import './Logo.css'

interface LogoProps {
  size?: number
}

export function Logo({ size = 200 }: LogoProps) {
  return (
    <div className="logo-container" style={{ width: size, height: size }}>
      <svg
        viewBox="0 0 200 200"
        xmlns="http://www.w3.org/2000/svg"
        className="logo-svg"
      >
        <defs>
          {/* Glow filters */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          
          <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Gradients */}
          <linearGradient id="capGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ff00ff" />
            <stop offset="50%" stopColor="#9400d3" />
            <stop offset="100%" stopColor="#4b0082" />
          </linearGradient>

          <linearGradient id="stemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e0e0e0" />
            <stop offset="100%" stopColor="#a0a0a0" />
          </linearGradient>

          <radialGradient id="spotGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#39ff14" />
            <stop offset="100%" stopColor="#00ff41" />
          </radialGradient>

          <linearGradient id="eyeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#00f3ff" />
            <stop offset="100%" stopColor="#0080ff" />
          </linearGradient>
        </defs>

        {/* Background circle */}
        <circle 
          cx="100" 
          cy="100" 
          r="95" 
          fill="#0a0a0a" 
          stroke="url(#capGradient)" 
          strokeWidth="3"
          filter="url(#glow)"
          className="logo-border"
        />

        {/* Mushroom stem */}
        <path
          d="M85 130 Q80 160 75 180 Q100 185 125 180 Q120 160 115 130 Z"
          fill="url(#stemGradient)"
          filter="url(#glow)"
          className="mushroom-stem"
        />

        {/* Stem details */}
        <path
          d="M90 140 Q92 155 88 170"
          fill="none"
          stroke="#888"
          strokeWidth="2"
          opacity="0.5"
        />
        <path
          d="M110 140 Q108 155 112 170"
          fill="none"
          stroke="#888"
          strokeWidth="2"
          opacity="0.5"
        />

        {/* Mushroom cap */}
        <ellipse
          cx="100"
          cy="90"
          rx="60"
          ry="45"
          fill="url(#capGradient)"
          filter="url(#strongGlow)"
          className="mushroom-cap"
        />

        {/* Cap underside */}
        <path
          d="M45 95 Q100 115 155 95"
          fill="none"
          stroke="#2a0040"
          strokeWidth="4"
        />

        {/* Glowing spots on cap */}
        <circle cx="70" cy="70" r="8" fill="url(#spotGradient)" filter="url(#glow)" className="spot spot-1" />
        <circle cx="100" cy="55" r="10" fill="url(#spotGradient)" filter="url(#glow)" className="spot spot-2" />
        <circle cx="130" cy="70" r="7" fill="url(#spotGradient)" filter="url(#glow)" className="spot spot-3" />
        <circle cx="85" cy="90" r="6" fill="url(#spotGradient)" filter="url(#glow)" className="spot spot-4" />
        <circle cx="115" cy="85" r="8" fill="url(#spotGradient)" filter="url(#glow)" className="spot spot-5" />
        <circle cx="60" cy="88" r="5" fill="url(#spotGradient)" filter="url(#glow)" className="spot spot-6" />
        <circle cx="140" cy="85" r="5" fill="url(#spotGradient)" filter="url(#glow)" className="spot spot-7" />

        {/* Trippy eyes */}
        <g className="eyes">
          {/* Left eye */}
          <ellipse cx="80" cy="100" rx="12" ry="15" fill="#000" />
          <ellipse cx="80" cy="100" rx="8" ry="10" fill="url(#eyeGradient)" filter="url(#glow)" className="eye-iris" />
          <circle cx="80" cy="100" r="4" fill="#000" className="pupil" />
          <circle cx="83" cy="97" r="2" fill="#fff" opacity="0.8" />

          {/* Right eye */}
          <ellipse cx="120" cy="100" rx="12" ry="15" fill="#000" />
          <ellipse cx="120" cy="100" rx="8" ry="10" fill="url(#eyeGradient)" filter="url(#glow)" className="eye-iris" />
          <circle cx="120" cy="100" r="4" fill="#000" className="pupil" />
          <circle cx="123" cy="97" r="2" fill="#fff" opacity="0.8" />
        </g>

        {/* Trippy smile */}
        <path
          d="M85 115 Q100 130 115 115"
          fill="none"
          stroke="#39ff14"
          strokeWidth="3"
          strokeLinecap="round"
          filter="url(#glow)"
          className="smile"
        />

        {/* Floating spores around */}
        <circle cx="30" cy="50" r="3" fill="#39ff14" filter="url(#glow)" className="spore spore-1" />
        <circle cx="170" cy="40" r="2" fill="#ff00ff" filter="url(#glow)" className="spore spore-2" />
        <circle cx="25" cy="150" r="2.5" fill="#00f3ff" filter="url(#glow)" className="spore spore-3" />
        <circle cx="175" cy="160" r="3" fill="#39ff14" filter="url(#glow)" className="spore spore-4" />
        <circle cx="50" cy="30" r="2" fill="#ff00ff" filter="url(#glow)" className="spore spore-5" />
        <circle cx="150" cy="170" r="2" fill="#00f3ff" filter="url(#glow)" className="spore spore-6" />
      </svg>
    </div>
  )
}

export default Logo
