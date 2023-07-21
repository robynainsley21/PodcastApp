import React from 'react'

const Overlay = (props) => {
    return (
        <div className='overlay-inner' key={props.id} open >
            <img src={props.img} alt="podcast-image" />
            <p>{props.title}</p>
            <p>{props.description}</p>
            <p>Seasons: {props.seasons}</p>
            <p>Genres: {props.genres}</p>
            <p>Date Updated: {props.updated}</p>
            <button onClick={props.handlerPreview}>Close modal</button>

        </div>
    )
}

export default Overlay