/* eslint-disable */
import React from "react";
import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Card, Row, Container, Button, Modal } from 'react-bootstrap';
import '../index.css'

/**
 * Logic to give structure to display each preview overlay
 * @returns Overlay box structured with JSX
 */
export const DetailModal = (props) => {
	/**
	 * Each property specific to the selected object
	 */
	const { image, title, updated, description, onHide, seasons } = props

	const readableDate = (date) => {
		const dateType = { year: 'numeric', month: 'short', day: 'numeric' }
		return new Intl.DateTimeFormat('en-US', dateType).format(new Date(date));
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
									<div className="overlay__data fw-bold">Last updated : {readableDate(updated)}</div>
									<p className="fw-bold">Seasons : {seasons.length}</p>
									<p className="overlay__data" >{description}</p>
								</div>
							</div>
						</Row>
					</Container>
					<Modal.Footer className="title-container">
						<Button className='overlay-btn border-radius'>Episodes</Button>
					</Modal.Footer>
				</Modal.Body>
			</Modal>
		</>
	);
}



/**
 * Logic to display o
 * @returns Jsx
 */
const getAllPodcasts = () => {
	
	const [userData, setUserData] = useState([]);

	//state to report loading error
	const [error, setError] = useState(false);

	//store the fetched show information
	const [showArray, setShowArray] = useState([]);

	//state for the show summary modal
	const [overlay, setOverlay] = useState(false);

	//state for updating the show modal
	const [selectedShow, setSelectedShow] = useState(null);

	//create a function to handle the modal opening
	const handleOpenModal = (show) => {
		setSelectedShow(show);
		setOverlay(true);
	};

	useEffect(() => {
		fetch("https://podcast-api.netlify.app/")
			.then(res => res.json())
			.then(data => {
				setUserData(data);
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

	const data = userData;
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
		            {/* <div className='search'>
                <input className='main-search border-radius' placeholder='Search by title' onChange={handlerSearch}/>
                <div className='alphabetical-buttons'>
                    <button className='alpha-btn border-radius' onClick={handlerTitleOrder}>Title A-Z</button>
                    <button className='alpha-btn border-radius' onClick={handlerTitleDescending}>Title Z-A</button>
                    <button className='alpha-btn border-radius' onClick={handlerDateAscending}>Recent</button>
                    <button className='alpha-btn border-radius' onClick={handlerDateDescending}>Oldest</button>                           
                </div>
            </div> */}
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
					show={overlay}
					onHide={() => setOverlay(false)}
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

export default getAllPodcasts