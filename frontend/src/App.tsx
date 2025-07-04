import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const holaMundo = 'Hola mundo desde TSX'
  return (
    <>
      <h1 className='text-6xl font-black'>
        Hola Mundo
      </h1>
    </>
  )
}

export default App
