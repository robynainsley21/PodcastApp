import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";

// STYLING
import Modal from "react-bootstrap/Modal";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const SuggestionOverlay = ({
  show,
  onCloseModal,
  image,
  title,
  updated,
  description,
  seasons,
}) => {
  const handleCloseModal = () => {
    onCloseModal();
  };

  return (
    <Modal.Dialog
      show={show.toString()}
      onHide={handleCloseModal}
      className="modal suggestion-overlay"
      style={{ display: "block", position: "initial" }}
    >
      <Modal.Body style={{ maxWidth: "90%", margin: "auto" }}>
        <img
          className="suggestion-overlay-image"
          src={image}
          alt="podcast-image"
        />
        <Modal.Header>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <p>Description:</p>
        <p style={{ maxWidth: "80%" }}>{description}</p>
        <p>Date updated: {updated}</p>
        <Modal.Footer>
          <button onClick={handleCloseModal} variant="secondary">
            Close
          </button>
        </Modal.Footer>
      </Modal.Body>
    </Modal.Dialog>
  );
};

const Card = ({ randomCard, date, openModal }) => {
  const { title, image, seasons } = randomCard;

  return (
    <div className="main-suggestions">
      <h1>Suggested</h1>
      <Box
        component="span"
        sx={{
          display: "inline-block",
          mx: "2px",
          transform: "scale(0.8)",
          minWidth: 275,
        }}
        className="suggestions-container"
      >
        <CardContent variant="outlined" className="suggestions-card">
          <CardMedia
            component="img"
            height="250"
            width="150"
            image={image}
            alt="Paella dish"
          />
          <br />
          <Typography
            sx={{ fontSize: 18, fontWeight: 600 }}
            color="text.secondary"
            gutterBottom
          >
            Title: {title}
          </Typography>
          <Typography variant="h6">Seasons: {seasons}</Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Date updated: {date}
          </Typography>
          <CardActions>
            <Button
              onClick={openModal}
              className="suggestion-card-btn"
              size="small"
            >
              Preview
            </Button>
          </CardActions>
        </CardContent>
      </Box>
    </div>
  );
};

const Suggested = () => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  //state for suggestion overlay
  const [showModal, setShowModal] = useState(!!false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <div>Error fetching data</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const readableDate = (date) => {
    return new Date(date).toDateString();
  };

  const random = () => {
    const randomNumber1 = Math.floor(Math.random() * userData.length);
    const randomCard1 = userData[randomNumber1];
    return randomCard1;
  };

  const randomCard1 = random();

  return (
    <>
      {ReactDOM.createPortal(
        showModal && (
          <div
            show={showModal}
            onHide={handleClose}
            className="modal"
            style={{
              display: showModal ? "flex" : "none",
              alignItems: "center",
              justifyContent: "center",
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "#0B5B53",
              zIndex: 9999,
            }}
          >
            <SuggestionOverlay
              show={showModal}
              onCloseModal={handleClose}
              image={randomCard1.image}
              title={randomCard1.title}
              updated={readableDate(randomCard1.updated)}
              description={randomCard1.description}
              seasons={randomCard1.seasons}
            />
          </div>
        ),
        document.body
      )}

      <div className="random-card-container border-radius">
        <Card
          randomCard={randomCard1}
          date={readableDate(randomCard1.updated)}
          openModal={handleOpenModal}
        />
      </div>
    </>
  );
};

export default Suggested;
