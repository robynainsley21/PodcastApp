import React from 'react'
import data from '../data'

const Preview = (props) => {

    return (
        <div className='preview border-radius' key={props.id}>            
                <img src={props.img} alt="show-image" />
                <p>{props.title}</p>
                <p>Seasons: {props.seasons}</p>
                <button className='preview-btn border-radius' onClick={props.handlerPreview}>Show preview</button>
        </div>
            
    )
}

export default Preview