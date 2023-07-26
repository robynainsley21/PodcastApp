import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Overlay from './components/newPreview'


import './index.css'
import Seasons from './components/Seasons'


const App = () => {
  return (
    <>
    <Home />
    {/* <Overlay /> */}

    <BrowserRouter>     
      <Routes >
       
        <Route 
          path='/Seasons' 
          element={<Seasons  />}
        />

      </Routes>        
    </BrowserRouter>
      
    </>
  )
}

export default App
