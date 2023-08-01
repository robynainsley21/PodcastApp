import React from 'react'
import Hero from './Hero'
import GetAllPodcasts from './Preview'
import Suggestions from './Carousel'


/**
 * The Home component renders a Hero component, a Suggestions component, and a GetAllPodcasts
 * component. Serves as landing page after user signs in
 */
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