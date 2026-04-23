import { useEffect, useState } from 'react'
import './App.css'

const INITIAL_SECONDS = 20 * 60 * 60

const backgroundImages = [
  {
    src: '/backgrounds/deal-1.png',
    className: 'market-scene market-scene--one',
    alt: 'Two professionals closing a deal at a table',
  },
  {
    src: '/backgrounds/deal-2.png',
    className: 'market-scene market-scene--two',
    alt: 'Global logistics and trade scene with containers and transport',
  },
  {
    src: '/backgrounds/deal-3.png',
    className: 'market-scene market-scene--three',
    alt: 'Trading and logistics illustration with headline',
  },
  {
    src: '/backgrounds/deal-4.png',
    className: 'market-scene market-scene--four',
    alt: 'Business deal illustration on a cargo ship',
  },
]

const marketTiles = [
  { label: '24h Volume', value: '$4.82B', tone: 'up' },
  { label: 'Active Pairs', value: '1,248', tone: 'neutral' },
  { label: 'Execution', value: '42 ms', tone: 'up' },
]

function formatTimer(totalSeconds) {
  const safeSeconds = Math.max(0, totalSeconds)
  const hours = String(Math.floor(safeSeconds / 3600)).padStart(2, '0')
  const minutes = String(Math.floor((safeSeconds % 3600) / 60)).padStart(2, '0')
  const seconds = String(safeSeconds % 60).padStart(2, '0')

  return `${hours}:${minutes}:${seconds}`
}

function App() {
  const [remainingSeconds, setRemainingSeconds] = useState(INITIAL_SECONDS)

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setRemainingSeconds((currentSeconds) =>
        currentSeconds > 0 ? currentSeconds - 1 : 0,
      )
    }, 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  const timerText = formatTimer(remainingSeconds)
  const isExpired = remainingSeconds === 0

  return (
    <main className="page-shell">
      <div className="page-backdrop" aria-hidden="true">
        <div className="page-backdrop__glow page-backdrop__glow--one" />
        <div className="page-backdrop__glow page-backdrop__glow--two" />
        <div className="page-backdrop__grid" />
      </div>

      <section className="platform-card">
        <header className="topbar">
          <div className="brand-block">
            <div className="brand-logo">
              <img src="/tradafy-logo.png" alt="Tradafy logo" />
            </div>
            <div>
              <p className="eyebrow">Tradafy</p>
              <p className="brand-subtitle">A premium trading platform for global markets</p>
            </div>
          </div>

          <nav className="topbar__nav" aria-label="Primary">
            <a href="#overview">Overview</a>
            <a href="#markets">Markets</a>
            <a href="#timer">Timer</a>
          </nav>
        </header>

        <div className="platform-grid" id="overview">
          <div className="hero-copy">
            <p className="eyebrow">Trade better. Move faster.</p>
            <h1>Built for serious traders who want a polished platform experience.</h1>
            <p className="lead">
              Tradafy combines a calm blue-and-white visual system, professional market stats,
              and a featured trading countdown to create a homepage that feels investment-grade.
            </p>

            <div className="cta-row">
              <a className="primary-cta" href="#timer">
                Open countdown
              </a>
              <a className="secondary-cta" href="#markets">
                View market snapshot
              </a>
            </div>

            <div className="stats-row" id="markets">
              {marketTiles.map((tile) => (
                <article className="stat-card" key={tile.label}>
                  <span className="stat-label">{tile.label}</span>
                  <strong className={`stat-value stat-value--${tile.tone}`}>{tile.value}</strong>
                </article>
              ))}
            </div>
          </div>

          <aside className="timer-panel" id="timer">
            <div className="timer-panel__header">
              <span className="timer-label">Market open window</span>
              <span className={`timer-badge ${isExpired ? 'timer-badge--expired' : ''}`}>
                {isExpired ? 'Closed' : 'Live now'}
              </span>
            </div>

            <div className="timer-display" aria-label={`Countdown timer ${timerText}`}>
              {timerText}
            </div>

            <p className="timer-copy">
              {isExpired
                ? 'The 20-hour launch window has ended.'
                : 'Countdown begins at 20 hours and tracks the active trading window.'}
            </p>

            <div className="timer-meta">
              <span>Low friction interface</span>
              <span>Trust-first presentation</span>
            </div>
          </aside>
        </div>

        <section className="feature-card" aria-label="Trading platform visual background">
          <div className="feature-card__content">
            <p className="eyebrow">Market context</p>
            <h2>The imagery below sits inside the platform card as an ambient trade backdrop.</h2>
            <p className="feature-card__copy">
              Use this space for featured instruments, platform highlights, or product messaging
              while the supplied art stays softly visible behind the content.
            </p>
          </div>

          <div className="feature-card__scenes" aria-hidden="true">
            {backgroundImages.map((image) => (
              <img key={image.src} src={image.src} className={image.className} alt={image.alt} />
            ))}
          </div>
        </section>
      </section>
    </main>
  )
}

export default App
