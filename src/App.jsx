import React from 'react'
import GameBoard from './components/Game_Board/GameBoard'
import Home from './components/Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "./App.css"; // Make sure App.css is imported

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gameboard" element={<GameBoard />} />
      </Routes>
    </Router>
  )
}

export default App
