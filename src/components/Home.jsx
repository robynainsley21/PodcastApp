import React from 'react'
import Suggested from './Suggested'
import Hero from './Hero'
import GetAllPodcasts from './Preview'
import supabase from '../supabaseClient'
import Suggestions from './Carousel'
const Home = () => {
    return (
        <div>
            <Hero />
            <Suggestions />
            <GetAllPodcasts />
        </div>
    )
}

export default Home