import React, { useEffect, useState } from 'react'
import Hero from './components/Hero'
import Preview from './components/Preview'
import Overlay from './components/Overlay'

// MUI COMPONENTS
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const App = () => {
  /**
   * State for retrieval of user data from API
   */
  const [userData, setUserData] = useState([])

  /**
   * State to set boolean for open and close function of preview overlay
   */
  const [isOpen, setIsOpen] = useState(false)

  /**
   * State to manage the podcast summary overlay scroll feature
   */
  const [scroll, setScroll] = useState('paper')

  /**
   * Fetches user data via API
   */
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

  
  /**
   * Setting booleans for 'Show preview' button and overlay 'close' button 
   */
  const togglePreviewOpen = (scrollType) => () => {
    setIsOpen(true)
    setScroll(scrollType)
  }

  const togglePreviewClose = () => {
    setIsOpen(false)
  }

  /**
   * Generating a card for each podcast receiving structure from its component
   */
  const eachCard = userData.map(item => {
    return (
      <div>
        <Preview
          key={item.id}
          img={item.image}
          title={item.title}
          seasons={item.seasons}
          handlerPreview={togglePreviewOpen('paper')}
        />      
      </div>  
    )
  })

  /**
   * Logic to display overlay that makes use of MUI components
   */
  const descriptionElementRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [isOpen]);

  /**
   * Creating content to be displayed on each podcast overlay
   */
  const found = userData.find(obj => {
    
      return (
        obj.id,
        obj.title,
        obj.description,
        obj.image,
        obj.seasons,
        obj.genres,
        obj.updated
      )
   
    
    
  })

  // console.log(found)

  return (
    <div>
      <Hero />     

      <h2 className='title'>Suggested</h2>
      
      {/* (suggestions) to be put here */}

      <h2 className='title'>Browse</h2> 

      <div>
        <Dialog
          open={isOpen}
          onClose={togglePreviewClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle id="scroll-dialog-title">Title: {found.title}</DialogTitle>
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              {
                found &&
                <div key={found.id}>
                  <img src={found.image} alt="podcast-image" />
                  <h3>Description: </h3>
                  <p>{found.description}</p>
                  <p>Genres: {found.genres}</p>
                  <p>Date updated: {found.updated}</p>
                </div>
              }
              {/* {[...new Array(50)]
                .map(
                  () => 'this where the content goes',
                )
                .join('\n')} */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={togglePreviewClose}>Close</Button>
          </DialogActions>
        </Dialog>
      </div>

      {/* ORIGINAL OVERLAY */}
      {/* <dialog className='preview-overlay border-radius' open={isOpen}>
        <div className='overlay-inner' key={userData.id} open >
          <img src={userData.image} alt="podcast-image" />
          <p>{userData.title}</p>
          <p>{userData.description}</p>
          <p>Seasons: {userData.seasons}</p>
          <p>Genres: {userData.genres}</p>
          <p>Date Updated: {userData.updated}</p>
          <button className='border-radius' onClick={togglePreview}>Close modal</button>
        </div>      
      </dialog> */}

      <div className='grid-container'>
        {eachCard}
      </div>     
      
    </div>
  )
}

export default App
