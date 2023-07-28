import React from 'react'
import Suggested from './Suggested'
import Hero from './Hero'
import GetAllPodcasts from './Preview'

const Home = () => {
    return (
        <div>
            <Hero />
            <Suggested />
            <GetAllPodcasts />
        </div>
    )
}

export default Home