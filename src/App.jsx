import React from 'react'
import GameBoard from './components/Game_Board/GameBoard'
import Home from './components/Home/Home'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import "./App.css"; // Make sure App.css is imported
import RunningCharacter from './components/Character/Character';
function App() {
  return (
    <Router>
     
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gameboard" element={<GameBoard />} />
      </Routes>
      <RunningCharacter/>
    </Router>
    
  )
}

export default App
