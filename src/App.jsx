import React, { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Preview from './components/Preview'
import Overlay from './components/Overlay'

import Modal from 'react-modal'

// Modal.setAppElement("#root");

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

  // const eachPreview = () => {
  //   return (
  //         <Overlay
  //             id={userData.id}
  //             img={userData.image}
  //             title={userData.title}
  //             description={userData.description}
  //             genres={userData.genres}
  //             seasons={userData.seasons}
  //             updated={userData}
  //          /> 
  //   )
  // }

  const togglePreview = () => {
    setIsOpen(!isOpen)
  }

  const eachCard = userData.map(item => {
    return (
      <div>
        <Preview
          key={item.id}
          img={item.image}
          title={item.title}
          seasons={item.seasons}
          handlerPreview={togglePreview}
        />      
      </div>  
    )
  })

  return (
    <>
      <Hero />     

      <h2 className='title'>Suggested</h2>
      
      {/* suggestions to be put here */}

      <h2 className='title'>Browse</h2> 

      <dialog className='preview-overlay border-radius' open={isOpen}>
        <div className='overlay-inner' key={userData.id} open >
          <img src={userData.image} alt="podcast-image" />
          <p>{userData.title}</p>
          <p>{userData.description}</p>
          <p>Seasons: {userData.seasons}</p>
          <p>Genres: {userData.genres}</p>
          <p>Date Updated: {userData.updated}</p>
          <button className='border-radius' onClick={togglePreview}>Close modal</button>
        </div>      
      </dialog>

      <div className='grid-container'>
        {eachCard}
      </div>     
      
    </>
  )
}

export default App
