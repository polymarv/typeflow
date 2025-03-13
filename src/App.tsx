import { useState } from 'react'
import TypingArea from './components/TypingArea'

import './App.css'

function App() {
  const predefinedText = "Hey, Loli!°";

  return (
    <>
      <TypingArea text={predefinedText} />
    </>
  )
}

export default App
