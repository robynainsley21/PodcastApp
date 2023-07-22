import React, { useEffect, useState, useRef } from 'react'
import Hero from './components/Hero'
import Preview from './components/Preview'

// MUI COMPONENTS
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

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
   * State to manage the alphabetical order of podcasts
   */
  const [sortOrder, setSortOrder] = useState('ascending')

  /**
   * State to manage search result of user input
   */
  const [searched, setSearched] = useState('title')
  const [state, setState] = useState({
    query: '',
    list: userData
  })

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
    console.log('this is supposed to be open')
    setIsOpen(true)
    setScroll(scrollType)
  }

  const togglePreviewClose = () => {
    setIsOpen(false)
  }  

  /**
   * Generating a card for each podcast that receives structure from its component
   */
  const eachCard = userData.map(item => {
    //Formatting the date to a readable format
    const date = new Date(item.updated).toDateString()

    return (
      <div key={item.id}>
        <Preview
          img={item.image}
          title={item.title}
          seasons={item.seasons}
          updated={date}
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
   * use a forEach
   * use full-screen-dialog for
   */

  // const found = userData.find(obj => {
    
  //     return (
  //       obj.id,
  //       obj.title,
  //       obj.description,
  //       obj.image,
  //       obj.seasons,
  //       obj.genres,
  //       obj.updated
  //     )     
    
  // })

  // const showEpisodes = () => {

  // }
  
  const podcasts = userData.map(item => {
    return item

  })


  // console.log(podcasts)
 
  /**
   * Arranging podcasts in alphabetical order based its title
   */
  const handleOrder = () => {
    setSortOrder('ascending')
    const sortedData = [...userData].sort((a, b) => {
      if (sortOrder === 'ascending') {
        return a.title.localeCompare(b.title);
      } 
    })
    setUserData(sortedData)
  }

  const handleDescendingOrder = () => {
    console.log('descending was clicked');
    setSortOrder('descending')
    const sortedData = [...userData].sort((a, b) => {
      if (sortOrder === 'descending') {
        return b.title.localeCompare(a.title);
      } 
    })

    setUserData(sortedData)
  }

  /**
   * Arranging podcast cards by most recently updated 
   */
  const dateRecent = () => {
    const arrangedDate = [...userData].sort((a, b) => {
       return b.updated.localeCompare(a.updated)
    })
      
    setUserData(arrangedDate)
  }

  /**
   * Arranging podcast cards by most recently updated 
   */
  const dateOldest = () => {
    const arrangedDate = [...userData].sort((a, b) => {
      return a.updated.localeCompare(b.updated)
    })
    
    setUserData(arrangedDate)
  }

  /**
   * Searching specific podcast based on user's search input
   */
  const handleSearch = (event) => {
    console.log('this is meant to function')
    const query = event.target.value

    const updatedUserDate = [...userData].filter(item => {
      return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1
    })

    setUserData(updatedUserDate)

    console.log(updatedUserDate)
    console.log(query)
   }
  //   setSearched(prevFormData => {
  //     return {
  //         ...prevFormData,
  //         [event.target.name]: event.target.value
  //     }
  // })


  
  return (
    <div>
      <Hero
        handlerTitleOrder={handleOrder}
        handlerTitleDescending={handleDescendingOrder}
        handlerDateAscending={dateRecent}
        handlerDateDescending={dateOldest}
        handlerSearch={handleSearch}
      />     

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
          <DialogContent dividers={scroll === 'paper'}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              {
                podcasts && 
                  <div key={podcasts.id}>
                    <p>{podcasts.title}</p>
                  </div>
                
                  
                
              }
              {/* { userData.map((obj, index) => (
                <div key={index}>
                  <p>{podcast}</p>
                  <p>Title: {obj.title}</p> 
                </div>
              ))
                
              } */}
              {/* {
                found &&
                <div key={found.id} className='overlay'>
                  <p>{found.id}</p>
                  <h2>{found.title}</h2>
                  <img className='overlay-image' src={found.image} alt="podcast-image" />
                  <h3><b>Description: </b></h3>
                  <p>{found.description}</p>
                  <p><b>Genres: </b>{found.genres}</p>
                  <p><b>Date updated: </b>{found.updated}</p>
                  <button className='episode-btn' onClick={showEpisodes}>View episodes</button>
                </div>
              } */}
              {/* {[...new Array(50)]
                .map(
                  () => 'this where the content goes',
                )
                .join('\n')} */}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <div className='overlay-button'>
              <button onClick={togglePreviewClose}>Close</button>

            </div>
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
