import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Hero from './Hero'
import Overlay from './Preview'

const Home = () => {
    return (
        <div>
            <Hero />
            <Overlay />
        </div>
    )
}

export default Home