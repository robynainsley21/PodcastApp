import React from 'react'
import Suggested from './Suggested'
import Hero from './Hero'
import GetAllPodcasts from './Preview'
import supabase from '../supabaseClient'

const Home = () => {
    console.log(supabase)
    return (
        <div>
            <Hero />
            <Suggested />
            <GetAllPodcasts />
        </div>
    )
}

export default Home