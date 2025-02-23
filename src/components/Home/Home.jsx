import { Link } from "react-router-dom"
import "./Home.css"

export default function Home() {
  return (
    <div className="game-menu">
      <div className="game-menu__clouds">
        <div className="cloud cloud--1"></div>
        <div className="cloud cloud--2"></div>
        <div className="cloud cloud--3"></div>
      </div>

      <div className="game-menu__trees">
        <div className="tree tree--top-left"></div>
        <div className="tree tree--top-right"></div>
        <div className="tree tree--bottom-left"></div>
        <div className="tree tree--bottom-right"></div>
      </div>

      <div className="game-menu__content">
        {/* Title Bar */}
        <div className="game-menu__title-bar"></div>

        {/* Menu Buttons */}
        <div className="game-menu__buttons">
          <button className="game-button"><Link to={'/gameboard'}>START</Link></button>
          <button className="game-button">instruction</button>
          <button className="game-button">Coming Soon</button>
          <button className="game-button">Coming Soon</button>
        </div>

        {/* Health Bar */}
        <div className="health-bar">
          <div className="health-bar__icon">
            <svg viewBox="0 0 24 24" className="health-bar__heart">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="health-bar__bar">
            <div className="health-bar__fill"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

