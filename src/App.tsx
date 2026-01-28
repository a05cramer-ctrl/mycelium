import { useState, useEffect, useRef, useCallback } from 'react'
import './App.css'
import tripVideo from './hf_20260121_181147_7fe8240f-6ed2-4e92-96c5-551af2f9cdc8.mp4'
import Logo from './components/Logo'

interface Spore {
  id: number
  x: number
  y: number
  size: number
  speed: number
  opacity: number
  hue: number
}

interface TrailPoint {
  x: number
  y: number
  id: number
}

function App() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [spores, setSpores] = useState<Spore[]>([])
  const [trail, setTrail] = useState<TrailPoint[]>([])
  const [loreVisible, setLoreVisible] = useState<number[]>([])
  const loreRef = useRef<HTMLDivElement>(null)
  const trailIdRef = useRef(0)

  const loreLines = [
    "In the beginning, there was no chart.",
    "Only the void... and the spores.",
    "Then the mushroom whispered:",
    "\"pump.\"",
    "And so it was written in the blockchain.",
    "The chosen shall ascend.",
    "The paper hands shall perish.",
    "This is the way of the mycelium."
  ]

  // Initialize spores
  useEffect(() => {
    const initialSpores: Spore[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 6 + 2,
      speed: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.7 + 0.3,
      hue: Math.random() * 60 + 90 // Green to cyan range
    }))
    setSpores(initialSpores)
  }, [])

  // Mouse movement handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY })
    
    // Add trail point
    trailIdRef.current += 1
    setTrail(prev => [...prev.slice(-20), { x: e.clientX, y: e.clientY, id: trailIdRef.current }])
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  // Animate spores
  useEffect(() => {
    const interval = setInterval(() => {
      setSpores(prev => prev.map(spore => {
        // Move towards mouse slightly
        const dx = mousePos.x - spore.x
        const dy = mousePos.y - spore.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        
        let newX = spore.x + (dx / dist) * spore.speed * 0.5 + Math.sin(Date.now() / 1000 + spore.id) * 2
        let newY = spore.y - spore.speed + (dy / dist) * spore.speed * 0.3

        // Reset if out of bounds
        if (newY < -20) {
          newY = window.innerHeight + 20
          newX = Math.random() * window.innerWidth
        }
        if (newX < -20) newX = window.innerWidth + 20
        if (newX > window.innerWidth + 20) newX = -20

        return { ...spore, x: newX, y: newY }
      }))
    }, 30)
    return () => clearInterval(interval)
  }, [mousePos])

  // Clear old trail points
  useEffect(() => {
    const interval = setInterval(() => {
      setTrail(prev => prev.slice(-15))
    }, 100)
    return () => clearInterval(interval)
  }, [])

  // Lore reveal on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loreLines.forEach((_, index) => {
            setTimeout(() => {
              setLoreVisible(prev => [...prev, index])
            }, index * 800)
          })
        }
      },
      { threshold: 0.3 }
    )

    if (loreRef.current) {
      observer.observe(loreRef.current)
    }

    return () => observer.disconnect()
  }, [])


  const scrollToLore = () => {
    loreRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="app">
      {/* Custom Cursor */}
      <div 
        className="custom-cursor"
        style={{ left: mousePos.x, top: mousePos.y }}
      />
      
      {/* Cursor Trail */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="cursor-trail"
          style={{
            left: point.x,
            top: point.y,
            opacity: (index / trail.length) * 0.8,
            transform: `scale(${(index / trail.length) * 0.8})`,
          }}
        />
      ))}

      {/* Background Video */}
      <div className="video-container">
        <video autoPlay muted loop playsInline className="bg-video">
          <source src={tripVideo} type="video/mp4" />
        </video>
        <div className="video-overlay" />
      </div>

      {/* Floating Spores */}
      {spores.map(spore => (
        <div
          key={spore.id}
          className="spore"
          style={{
            left: spore.x,
            top: spore.y,
            width: spore.size,
            height: spore.size,
            opacity: spore.opacity,
            filter: `hue-rotate(${spore.hue}deg)`,
          }}
        />
      ))}

      {/* Hero Section */}
      <section className="hero">
        <Logo size={220} />
        <h1 className="main-title">
          <span className="glitch" data-text="MYCELIUM.buzz">MYCELIUM.buzz</span>
        </h1>
        <p className="subtitle">You didn't buy the coin. The mushroom chose you.</p>
        
        <div className="button-container">
          <button className="trip-button" onClick={scrollToLore}>
            🍄 TRIP IN
          </button>
          <button className="trip-button buy">
            💊 BUY BEFORE EGO DEATH
          </button>
          <button className="trip-button prophecy" onClick={scrollToLore}>
            🧠 READ THE PROPHECY
          </button>
        </div>

        <div className="social-links">
          <a href="https://x.com/MYCELIUM_dd" target="_blank" rel="noopener noreferrer" className="social-btn twitter">
            <svg viewBox="0 0 24 24" className="social-icon">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span>TWITTER</span>
          </a>
        </div>
      </section>

      {/* Lore Section */}
      <section className="lore" ref={loreRef}>
        <div className="lore-container">
          <h2 className="lore-title">📜 THE PROPHECY 📜</h2>
          <div className="lore-text">
            {loreLines.map((line, index) => (
              <p 
                key={index} 
                className={`lore-line ${loreVisible.includes(index) ? 'visible' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {line}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Token Stats */}
      <section className="stats">
        <h2 className="stats-title">🔮 SPORE METRICS 🔮</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">SUPPLY</span>
            <span className="stat-value">420,000,000,000</span>
            <span className="stat-note">spores in circulation</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">UTILITY</span>
            <span className="stat-value">ENLIGHTENMENT</span>
            <span className="stat-note">transcendence guaranteed*</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">ROADMAP</span>
            <span className="stat-value roadmap">
              <span>Ego Death</span>
              <span className="arrow">→</span>
              <span>Ascension</span>
              <span className="arrow">→</span>
              <span className="rug">Rug?</span>
            </span>
            <span className="stat-note">trust the process</span>
          </div>
        </div>
      </section>

      {/* Contract Section */}
      <section className="contract">
        <div className="contract-box">
          <span className="contract-label">CONTRACT ADDRESS</span>
          <code className="contract-address">F21KSXYH9qyxEJk2qMXCJ3xrg2eT2r6qYVJvqyGdpump</code>
          <button className="copy-btn">📋 COPY</button>
        </div>
      </section>


      {/* Footer */}
      <footer className="footer">
      </footer>
    </div>
  )
}

export default App
