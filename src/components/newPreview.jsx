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
			<Modal
				{...props}
                className='overlay'
				size="lg"
				aria-labelledby="contained-modal-title-vcenter"
				centered
				>
				<Modal.Body>
					<Row className="title-container">
						<Modal.Header className="fw-bolder fs-4 ">{title}</Modal.Header>
                        <Button className='overlay-btn border-radius' onClick={onHide}>Close</Button>
					</Row>
					<Container>
						<Row g-0>
							<div className="col-lg-6">
								<div className="overlay__preview">
									<img className="overlay__blur" src={image} />
									<img className="overlay__image overlay-image" src={image} /></div>
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
					<Modal.Footer className="title-container">
						<Button className='overlay-btn border-radius'>Open show</Button>
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
		fetch("https://podcast-api.netlify.app/")
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


	return (
		<>
			<Row  className="grid-container">
				{showArray.map((show, index) => {
					return (
						<Card key={index} className="preview border-radius">
							<Card.Img className='overlay-image' src={show.image} />

							<Card.Body>
                                <Card.Text>Title: {show.title}</Card.Text>
								<Container>

									<p>Genre : {show.genres}</p>
								</Container>
								<Button className='preview-btn border-radius' onClick={() => handleOpenModal(show)}>Preview</Button>
							</Card.Body>
						</Card>)
				})
				}
			</Row>


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

export default BrowseAllShows