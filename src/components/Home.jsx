import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Hero from './Hero'
import GetAllPodcasts from './Preview'

const Home = () => {
    return (
        <div>
            <Hero />
            <GetAllPodcasts />
        </div>
    )
}

export default Home