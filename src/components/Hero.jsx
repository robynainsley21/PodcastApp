import React from 'react'

const Hero = () => {
    return (
        <>
            <div style={{position: 'fixed'}}>
               <a href='index.html'>
                <div style={{borderRadius: '100%', height: '170px', width: '180px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F1FDFC'}}>
                <img className='logo' src="podcast.png" alt="logo-image" />

                </div>
                </a>
            </div>
            <div className='logo-name'>
                <h1>Podify</h1>
            </div>

        </>
       
    )
}

export default Hero