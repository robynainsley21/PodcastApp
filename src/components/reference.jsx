/* eslint-disable */
import React from "react";
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Card, Row, Container, Button, Modal } from 'react-bootstrap';
import '../index.css'

export const DetailModal = (props) => {

	const { image, title, updated, description, onHide, seasons } = props

	/**
* The function `formatDate` takes a date string as input and returns a formatted date in the format
* "Dec 31, 2023".
* @returns The function `formatDate` returns a formatted date string in the format "Dec 31, 2023".
*/
	const formatDate = (dateString) => {
		const options = { year: 'numeric', month: 'short', day: 'numeric' }
		return new Intl.DateTimeFormat('en-US', options).format(new Date(dateString));
	};

	return (
		<>
			<Modal className="overlay"
				{...props}
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				onHide={onHide}>
				<Modal.Body>
					<Row>
						<Modal.Header closeButton className="fw-bolder fs-4 ">{title}</Modal.Header>
					</Row>
					<Container>
						<Row g-0>
							<div className="col-lg-6">
								<div className="overlay__preview">
									<img className="overlay__blur" src={image} />
									<img className="overlay__image" src={image} /></div>
							</div>
							<div className="col-lg-6">
								<div className="overlay__content">
									<h3 className="overlay__title fw-bolder" ></h3>
									<div className="overlay__data fw-bold">Last updated : {formatDate(updated)}</div>
									<p className="fw-bold">Seasons : {seasons.length}</p>
									<p className="overlay__data" >{description}</p>
								</div>
							</div>
						</Row>
					</Container>
					<Modal.Footer className="justify-content-center">
						<Button>Open show</Button>
					</Modal.Footer>
				</Modal.Body>
			</Modal>
		</>
	);
}


/* The code defines a functional component called `BrowseAllShows` in JavaScript using React. */
const BrowseAllShows = () => {
	
	const [showAPIdata, setShowAPIdata] = useState([]);
	//state to report loading error
	const [error, setError] = useState(false);
	//keep track of the number of cards loaded per page
	const [numOfCards, setNumOfCards] = useState(8);
	//store the fetched show information
	const [showArray, setShowArray] = useState([]);
	//state for the show summary modal
	const [modalShow, setModalShow] = useState(false);
	//state for updating the show modal
	const [selectedShow, setSelectedShow] = useState(null);

	//create a function to handle the modal opening
	const handleOpenModal = (show) => {
		setSelectedShow(show);
		setModalShow(true);
	};


	useEffect(() => {
		fetch("https://podcast-api.netlify.app/shows")
			.then(res => res.json())
			.then(data => {
				setShowAPIdata(data);
			})
			.catch(error => {
				console.error("Error fetching data:", error);
				setError(true);
			})
	}, [])

	if (error) {
		return (
			<div>Error fetching data</div>
		)
	}

	const data = showAPIdata;
	//add show id's to array
	const idArray = data.map(singleShow => singleShow.id)

	useEffect(() => {
		//fetch all the show info using the showID array
		const fetchShowData = async () => {
			const promises = idArray.map(id => {
				return fetch(`https://podcast-api.netlify.app/id/${id}`)
					.then(res => res.json());
			});

			//use promise.all to await for all the fetch requests to complete
			//so that the showArray array is not empty
			const results = await Promise.all(promises);
			setShowArray(results)
		};

		fetchShowData();
	}, [idArray])

	//create function to load more cards when the button is clicked
	const handleShowMore = () => {
		// Increase the number of cards to show by 4
		setNumOfCards(prevNumOfCards => prevNumOfCards + 4)
	};

	return (
		<>
			<Row xs={1} md={2} lg={3} className="gap-3 justify-content-center mx-auto ">
				{showArray.slice(0, numOfCards).map((show, index) => {
					return (
						<Card key={index} style={{ width: '20rem' }} className="rounded col-4">
							<Card.Img src={show.image} />
							<Card.Body>
								<Card.Title>{show.title}</Card.Title>
								<Container>
									<p>Genre : {show.genres}</p>
								</Container>
								<Card.Text>{show.description.slice(0, 100)}...</Card.Text>
								{/* modal button */}
								<Button onClick={() => handleOpenModal(show)}>Read more</Button>
							</Card.Body>
						</Card>)
				})
				}
			</Row>
			{/* Show the "Show More" button only if there are more cards to show */}
			{numOfCards < data.length && (
				<div className="text-center">
					<button onClick={handleShowMore} className="btn btn-primary mt-3">Show More</button>
				</div>
			)}

			{/* Use createPortal to render the BookModal outside the BrowseAllShows component */}
			{ReactDOM.createPortal(
				selectedShow &&
				<DetailModal
					show={modalShow}
					onHide={() => setModalShow(false)}
					image={selectedShow.image}
					title={selectedShow.title}
					updated={selectedShow.updated}
					description={selectedShow.description}
					seasons={selectedShow.seasons}
				/>,
				document.body // Append the modal to the document body
			)}
		</>

	)
}

