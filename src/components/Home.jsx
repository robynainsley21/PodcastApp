import React from 'react'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Hero from './Hero'
import Preview from './Preview'


const Home = () => {
    return (
        <div>
            <Hero />
            <Preview/>
        </div>
    )
}

export default Home