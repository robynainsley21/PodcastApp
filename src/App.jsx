import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Overlay from './components/Preview'
import Login from './components/Login'

import './index.css'


const App = () => {
  return (
    <>
    {/* <Home /> */}
    {/* <Login /> */}

    <BrowserRouter>     
      <Routes >
       
        <Route path='/' element={<Login />} />

      </Routes>        
    </BrowserRouter>
      
    </>
  )
}

export default App
