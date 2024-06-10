// import { useState } from 'react'
import {BrowserRouter, Routes, Route} from "react-router-dom"
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import QRCodeDisplay from './components/QRCodeDisplay'

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/:username' element={<QRCodeDisplay/>}></Route>
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
