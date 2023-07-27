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

        </>
       
    )
}

export default Hero