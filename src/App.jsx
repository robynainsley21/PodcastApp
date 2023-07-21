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
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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

  const togglePreviewOpen = () => {
    console.log('im supposed to be open')
    setIsOpen(true)
  }

  const togglePreviewClose = () => {
    console.log('im supposed to be closed')
    setIsOpen(false)
  }

  const eachCard = userData.map(item => {
    return (
      <div>
        <Preview
          key={item.id}
          img={item.image}
          title={item.title}
          seasons={item.seasons}
          handlerPreview={togglePreviewOpen}
        />      
      </div>  
    )
  })

  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  // const dialog = () => {
  //   return (
  //     <div>
  //       <Dialog
  //         fullScreen={fullScreen}
  //         open
  //         onClose={togglePreviewClose}
  //         aria-labelledby="responsive-dialog-title"
  //         // key={}
  //       >
  //         <DialogContent>
  //           <DialogContentText>
  //             Let Google help apps determine location. This means sending anonymous
  //             location data to Google, even when no apps are running.
  //           </DialogContentText>
  //         </DialogContent>

  //         <DialogActions>
  //           <Button autoFocus onClick={togglePreviewClose}>
  //             Close
  //           </Button>
  //         </DialogActions>

  //       </Dialog>
  //     </div>
  //   )
  // }

  return (
    <div>
      <Hero />     

      <h2 className='title'>Suggested</h2>
      
      {/* (suggestions) to be put here */}

      <h2 className='title'>Browse</h2> 

      {/* NEW OVERLAY */}
      {/* {dialog} */}
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={isOpen}
          onClose={togglePreviewClose}
          aria-labelledby="responsive-dialog-title"
          // key={}
        >
          <DialogContent>
            <DialogContentText>
              Let Google help apps determine location. This means sending anonymous
              location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>

          <DialogActions>
            <Button autoFocus onClick={togglePreviewClose}>
              Close
            </Button>
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
