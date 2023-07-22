import React from 'react'

const Preview = (props) => {

    return (
        <div className='center'>
            <div className='preview border-radius' key={props.id}>            
                <img src={props.img} alt="show-image" />
                <p>{props.title}</p>
                <p>Seasons: {props.seasons}</p>
                <p>Last updated: {props.updated}</p>
                <button className='preview-btn border-radius' onClick={props.handlerPreview}>Show preview</button>
            </div>
        </div>
        
            
    )
}

export default Preview