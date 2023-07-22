import React from 'react'

const Hero = (props) => {
    return (
        <>
            <div className='nav border-radius'>
               <a href='index.html'>
                    <img className='logo' src="podcast.png" alt="logo-image" />
                </a>
                <img className='settings' src="settings.png" alt="settings-image" />
            </div>
            <div className='logo-name'>
                <h1>Podify</h1>
            </div>
            <div className='search'>
                <input className='main-search border-radius' placeholder='Search by title' onChange={props.handlerSearch}/>
                {/* <button onClick={props.handlerSearch}>Search</button> */}
                <div className='alphabetical-buttons'>
                    <button className='alpha-btn border-radius' onClick={props.handlerTitleOrder}>Title A-Z</button>
                    <button className='alpha-btn border-radius' onClick={props.handlerTitleDescending}>Title Z-A</button>
                    <button className='alpha-btn border-radius' onClick={props.handlerDateAscending}>Recent</button>
                    <button className='alpha-btn border-radius' onClick={props.handlerDateDescending}>Oldest</button>                           
                </div>
            </div>
        </>
       
    )
}

export default Hero