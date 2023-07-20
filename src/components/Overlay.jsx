import React from 'react'

const Overlay = (props) => {
    return (
        <dialog key={props.id} open >
            <img src={props.img} alt="podcast-image" />
            <p>{props.title}</p>
            <p>{props.description}</p>
            <p>Seasons: {props.seasons}</p>
            <p>Genres: {props.genres}</p>
            <p>Date Updated: {props.updated}</p>
            <button onClick={props.handlerPreview}>Close modal</button>

        </dialog>
    )
}

export default Overlay