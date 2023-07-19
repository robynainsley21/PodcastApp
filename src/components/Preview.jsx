import React from 'react'
import data from '../data'

const Preview = (props) => {

    return (
        <div className='preview border-radius' key={props.id} onClick={props.handlerPreview}>            
                <img src={props.img} alt="show-image" />
                <p>{props.title}</p>
                <p>Seasons: {props.seasons}</p>
        </div>
            
    )
}

export default Preview