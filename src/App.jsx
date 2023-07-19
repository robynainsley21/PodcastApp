import React, { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Preview from './components/Preview'
import Overlay from './components/Overlay'

const App = () => {
  const [userData, setUserData] = useState([])

  const fetchUserData = () => {
    fetch("https://podcast-api.netlify.app/shows")
      .then(response => response.json())
      .then(data => setUserData(data))
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  // const suggestions = data.map( item => {
  //   return (
  //     <Suggested 
  //       key={userData.id}
  //       img={item.image}
  //       title={item.title}
  //     />
  //   )
  // })

  const [isOpen, setIsOpen] = useState(false)

  const togglePreview = () => {
    console.log('i was clicked')
    setIsOpen(!isOpen)
  }

  const eachPreview = userData.map(item => {
    return (
      
        <Preview
          key={item.id}
          img={item.image}
          title={item.title}
          seasons={item.seasons}
          handlerPreview={togglePreview}
        />
        
      
    )
  })

  return (
    <>
      <Hero />

      {/* <h2 className='title'>Suggested</h2>
      {suggestions} */}

      <h2 className='title'>Browse</h2> 
      <div className='grid-container'>
        {eachPreview}
      </div>     
      <Overlay 
        isOpen={isOpen}
        onClose={togglePreview}
        
      >
        <div >
          <img src={userData.image} alt="podcast-image" />
          <p>{userData.title}</p>
          <p>Seasons: {userData.seasons}</p>
          <p>Description: {userData.description}</p>
          <p>Genres: {userData.genres}</p>
          <p>Date Updated: {userData.updated}</p>
        </div>
      </Overlay>
    </>
  )
}

export default App
