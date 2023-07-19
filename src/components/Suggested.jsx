import React from 'react'
import data from '../data'

const Suggested = () => {
    const randomNumber = Math.round((Math.random() * data.length) + 1)
    const randomCard = data[randomNumber]
    return (
        console.log(randomCard)
    )
}

export default Suggested