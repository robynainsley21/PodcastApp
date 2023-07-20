import React from 'react'

const Overlay = (props) => {
    return (
        <div key={props.id} onClick={props.handlerPreview}>
            <img src={props.img} alt="podcast-image" />
            <p>{props.title}</p>
            <p>{props.description}</p>
            <p>Seasons: {props.seasons}</p>
            <p>Genres: {props.genres}</p>
            <p>Date Updated: {props.updated}</p>
        </div>
    )
}

export default Overlay