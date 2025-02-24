import React from 'react'
import './StartButton.css'
function StartButton({startGame}) {
  return (
    <div onClick={startGame} className='start-button'>StartButton </div>
  )
}

export default StartButton
