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
    console.log('i was clicked')
    setIsOpen(!isOpen)

    return (
      <Overlay
          isOpen={isOpen}
          id={userData.id}
          img={userData.image}
          title={userData.title}
          description={userData.description}
          genres={userData.genres}
          seasons={userData.seasons}
          updated={userData}
       /> 
)
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
  /**
   * - create a function that generates content for preview
   * - how to add button?
   * - call in return
   */

  return (
    <>
      <Hero />

      {/* <h2 className='title'>Suggested</h2>
      {suggestions} */}

      <h2 className='title'>Browse</h2> 
      <div className='grid-container'>
        {eachCard}
      </div>     
      
    </>
  )
}

export default App
