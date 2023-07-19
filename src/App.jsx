import React from 'react'
import Hero from './components/Hero'
import Preview from './components/Preview'


const App = () => {
  
  return (
    <>
      <Hero />
      <h2 className='title'>Suggested</h2>
      <h2 className='title'>Browse</h2>

      <Preview />
    </>
  )
}

export default App
