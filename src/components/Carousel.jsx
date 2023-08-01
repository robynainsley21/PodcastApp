import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

// MUI components
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Row, Container, Button } from "react-bootstrap";

const Suggestions = () => {
  const [userData, setUserData] = useState([]);

  const [openStates, setOpenStates] = useState({});


  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((res) => res.json())
      .then((data) => setUserData(data.reverse()));
  });

  const carouselArray = userData.slice(0, 20);
  const [open, setOpen] = useState(false);


  const openPreview = (id) => {
setOpenStates((prevState) => ({...prevState, [id]: true}))
  };

  const closePreview = (id) => {
    setOpenStates((prevState) => ({...prevState, [id]: false}))
  };

  const Preview = ({ image, title, updated, description, onHide, show, id }) => {
    const readableDate = (date) => {
      const dateType = { year: "numeric", month: "short", day: "numeric" };
      return new Intl.DateTimeFormat("en-US", dateType).format(new Date(date));
    };

    return (
      <Modal
        className="overlay"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        style={{
          backgroundColor: "#17AFA0",
          fontSize: "1.2rem",
          overflowY: "auto",
          maxHeight: "80vh",
        }}
        show={show}
        key={id}
      >
        <Modal.Body
          style={{
            justifyContent: "center",
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#17AFA0",
            zIndex: 9999,
          }}
        >
          <Row className="title-container">
            <Modal.Header className="fw-bolder fs-4 ">{title}</Modal.Header>
          </Row>

          <Container>
            <Row g-0>
              <div>
                <div className="overlay__preview">
                  <img className="overlay__blur" src={image} />
                  <img className="overlay__image overlay-image" src={image} />
                </div>
              </div>
              <div>
                <div className="overlay__content">
                  <h3 className="overlay__title fw-bolder"></h3>
                  <div>Last updated : {readableDate(updated)}</div>
                  <p className="overlay__data">{description}</p>
                </div>
              </div>
            </Row>
          </Container>
          <Modal.Footer className="title-container">
            <Button onClick={onHide} className="overlay-btn border-radius">
              Close
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <>
      <div
        style={{
          color: "#0B5B53",
          fontSize: "1.7rem",
          display: "flex",
          justifyContent: "center",
          fontWeight: "600",
        }}
      >
        <p>Suggestions</p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          overflowX: "auto",
          width: "100%",
        }}
      >
        {carouselArray.map((show, index) => {
          const { image, title, seasons, updated, description, id } = show;

          const isPreviewOpen = openStates[id]
          const readableDate = (date) => {
            return new Date(date).toDateString();
          };

          return (
            <>
              <Card
                sx={{ minWidth: "14rem", minHeight: "10rem", margin: "0 10px" }}
                key={index}
              >
                <CardHeader
                  title={title}
                  subheader={` Updated ${readableDate(updated)}`}
                  style={{ fontSize: "1rem" }}
                />
                <CardMedia
                  component="img"
                  height="100"
                  image={image}
                  alt="show-image"
                  className="carousel-image"
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    Seasons: {seasons}
                  </Typography>
                </CardContent>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    style={{
                      backgroundColor: "#17AFA0",
                      border: "1px solid",
                      marginBottom: "1rem",
                      padding: '.5rem'
                    }}
                    className="border-radius"
                    onClick={() => openPreview(id)}
                  >
                    Preview
                  </button>
                </div>
              </Card>
              <Preview
                image={image}
                title={title}
                updated={updated}
                description={description}
                onHide={() => closePreview(id)}
                show={isPreviewOpen}
                id={id}
                key={id}
              />
            </>
          );
        })}
      </div>
    </>
  );
};

export default Suggestions;
