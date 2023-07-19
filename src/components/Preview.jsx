import React from 'react'
import data from '../data'

const Preview = () => {
    // const [card, setCard] = React.useState({
    //     image: '',
    //     title: '',
    //     seasons: ''
    // })

    
    const eachTitle = data.map(item => {
        return (
            <div className='preview border-radius'>            
                <img src={item.image} alt="show-image" />
                <p>{item.title}</p>
                <p>Seasons: {item.seasons}</p>
            </div>
            
            
        )
    })
   
        
    // }
    // const [eachCard, setEach] = React.useState([])

    // React.useEffect(() => {
    //     fetch("https://podcast-api.netlify.app/shows")
    //         .then(res => res.json())
    //         .then(data => setEach(data))
    //     }    
    //     , [1]
    // )

   

    return (
        <div className='grid-container'>
            {eachTitle}
        </div>
        
    )
}

export default Preview