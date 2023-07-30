/* The code provided is a React component that fetches data from an API and displays it in a grid of
preview cards. When a user clicks on a preview card, a modal overlay is displayed with more details
about the selected item. The modal includes an image, title, last updated date, number of seasons,
and a description. The code also includes some styling using Bootstrap classes. */
import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Card, Row, Container, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ReactPlayer from "react-player";

import "../index.css";

/**
 * Logic to give structure to display each preview overlay
 * @returns Overlay box structured with JSX
 */
export const DetailModal = (props) => {
  /**
   * Each property specific to the selected object
   */
  const { image, title, updated, description, onHide, seasons, openSeason } =
    props;

  const readableDate = (date) => {
    const dateType = { year: "numeric", month: "short", day: "numeric" };
    return new Intl.DateTimeFormat("en-US", dateType).format(new Date(date));
  };

  return (
    <>
      <Modal
        {...props}
        className="overlay"
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Row className="title-container">
            <Modal.Header className="fw-bolder fs-4 ">{title}</Modal.Header>
            <Button className="overlay-btn border-radius" onClick={onHide}>
              Close
            </Button>
          </Row>
          <Container style={{ overflowY: "auto", maxHeight: "80vh" }}>
            <Row g-0>
              <div className="col-lg-6">
                <div className="overlay__preview">
                  <img className="overlay__blur" src={image} />
                  <img className="overlay__image overlay-image" src={image} />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="overlay__content">
                  <h3 className="overlay__title fw-bolder"></h3>
                  <div className="overlay__data fw-bold">
                    Last updated : {readableDate(updated)}
                  </div>
                  <p className="fw-bold">Seasons : {seasons.length}</p>
                  <p className="overlay__data">{description}</p>
                </div>
              </div>
            </Row>
          </Container>
          <Modal.Footer className="title-container">
            <Button onClick={openSeason} className="overlay-btn border-radius">
              Seasons
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

const SearchAndArrange = (props) => {
  const { ascending, descending, recent, oldest, search } = props;

  return (
    <div className="search">
      <input
        className="main-search border-radius"
        placeholder="Search by title"
        onChange={search}
      />
      <div className="alphabetical-buttons">
        <button className="alpha-btn border-radius" onClick={ascending}>
          Title A-Z
        </button>
        <button className="alpha-btn border-radius" onClick={descending}>
          Title Z-A
        </button>
        <button className="alpha-btn border-radius" onClick={recent}>
          Recent
        </button>
        <button className="alpha-btn border-radius" onClick={oldest}>
          Oldest
        </button>
      </div>
    </div>
  );
};

const ShowSeasons = ({
  isShown,
  onCloseModal,
  openEpisodes,
  seasonContent,
  closeEpisodes,
  selectedShow,
}) => {
  const episodes = selectedShow.seasons.map((season, index) => {
    return (
      <div key={index} >
        {season.episodes.map((episode, episodeIndex) => (
          <div
            key={episodeIndex}
            style={{
              border: "1px solid",
              padding: "1rem",
              marginBottom: ".7rem",
              fontSize: "1.1rem",
            }}
          >
            <h3>
              <b>Episode:</b> {episode.episode}
            </h3>
            <p>
              <b>Title:</b> {episode.title}
            </p>
            {episode.description && (
              <div>
                <p>
                  <b>Episode description:</b> {episode.description}
                </p>
              </div>
            )}
            <ReactPlayer
              url={episode.file}
              controls="true"
              height="70px"
              width="80%"
            />
          </div>
        ))}
      </div>
    );
  });
  console.log(selectedShow.seasons);

  return (
    <div
      show={isShown}
      style={{
        display: isShown ? "flex" : "none",
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
      <Modal.Dialog
        className="modal"
        show={isShown}
        style={{ color: "#fff", width: "75%" }}
      >
        <div
          className="modal-header"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <div className="modal-title">All seasons</div>
          <button
            onClick={onCloseModal}
            className="secondary-button episode-btn border-radius"
          >
            Back to show
          </button>
        </div>
        <div style={{ overflowY: "auto", maxHeight: "80vh" }}>
          <div className="modal-desc season-container">
            <div>{seasonContent}</div>

            {/* put overlay of episodes */}
            {openEpisodes && (
              <div
                show={openEpisodes}
                style={{
                  position: "fixed",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: "#92CBC5",
                  color: "#000",
                  zIndex: 9999,
                  overflowY: "auto",
                  maxHeight: "100vh",
                  padding: "1rem",
                }}
              >
                <button onClick={closeEpisodes}>Back to seasons</button>

                <div>{episodes}</div>
              </div>
            )}
          </div>
        </div>
      </Modal.Dialog>
    </div>
  );
};

/**
 * The code defines a React functional component called `GetAllPodcasts`. This component fetches data
 * from an API and displays it in a grid of preview cards.
 * @returns All podcasts structured with JSX
 */
const GetAllPodcasts = () => {
  //state to store all podcasts
  const [userData, setUserData] = useState([]);

  //state to report loading error
  const [error, setError] = useState(false);

  //store the fetched show information
  const [showArray, setShowArray] = useState([]);

  //state for the show summary overlay
  const [overlay, setOverlay] = useState(false);

  //state for updating the podcast overlay
  const [selectedShow, setSelectedShow] = useState(null);

  //state to arrange the data alphabetically
  const [sortOrder, setSortOrder] = useState("ascending");

  //state to open show seasons
  const [openSeason, setOpenSeason] = useState(false);

  const [showEpisodesOverlay, setShowEpisodesOverlay] = useState(false);

  // State to store the selected show's seasons
  const [selectedSeasons, setSelectedSeasons] = useState([]);

  const openEpisodes = () => {
    setShowEpisodesOverlay(true);
  };

  const closeEpisodes = () => {
    setShowEpisodesOverlay(false);
  };

  const openSelectedSeason = () => {
    setOpenSeason(true);
  };

  const closeSeason = () => {
    setOpenSeason(false);
  };

  //function to handle the modal opening
  const handleOpenModal = (show) => {
    //when the preview overlay opens, the 'selectedShow' state becomes the selected show and the
    //respective seasons are selected
    setSelectedSeasons(show.seasons);
    setSelectedShow(show);
    setOverlay(true);
  };

  useEffect(() => {
    fetch("https://podcast-api.netlify.app/")
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(true);
      });
  }, []);

  if (error) {
    return <div>Error fetching data</div>;
  }

  /**
   * Saving all data in a variable to indirectly manipulate it
   */
  const data = userData;
  //add show id's to array
  const idArray = data.map((singleShow) => singleShow.id);

  useEffect(() => {
    //fetch all the show info using the showID array
    const fetchShowData = async () => {
      const podcastItems = idArray.map((id) => {
        return fetch(`https://podcast-api.netlify.app/id/${id}`).then((res) =>
          res.json()
        );
      });

      //use promise.all to await for all the fetch requests to complete
      //so that the showArray array is not empty
      const results = await Promise.all(podcastItems);
      setShowArray(results);
    };

    fetchShowData();
  }, [idArray]);

  /**
   * The function `handleTitleAscendingOrder` sorts the `userData` array in ascending order based on the
   * `title` property.
   */
  const handleTitleAscendingOrder = () => {
    setSortOrder("ascending");
    const sortedData = [...userData].sort((a, b) => {
      if (sortOrder === "ascending") {
        return a.title.localeCompare(b.title);
      }
    });

    setUserData(sortedData);
  };

  /**
   * The function `handleTitleDescendingOrder` sorts the `userData` array in descending order based on
   * the `title` property.
   */
  const handleTitleDescendingOrder = () => {
    setSortOrder("descending");
    const sortedData = [...userData].sort((a, b) => {
      if (sortOrder === "descending") {
        return b.title.localeCompare(a.title);
      }
    });

    setUserData(sortedData);
  };

  /**
   * The `readableDate` function takes a date as input and returns a human-readable string representation
   * of the date.
   * @returns The function `readableDate` returns a string representation of the input date in the format "Day of
   * the week Month Day Year".
   */
  const readableDate = (date) => {
    return new Date(date).toDateString();
  };

  /**
   * The function `dateRecent` sorts an array of user data based on the `updated` property in descending
   * order.
   */
  const dateRecent = () => {
    const arrangedDate = [...userData].sort((a, b) => {
      return b.updated.localeCompare(a.updated);
    });

    setUserData(arrangedDate);
  };

  /**
   * The function `dateOldest` arranges the `userData` array in ascending order based on the `updated`
   * property.
   */
  const dateOldest = () => {
    const arrangedDate = [...userData].sort((a, b) => {
      return a.updated.localeCompare(b.updated);
    });

    setUserData(arrangedDate);
  };

  /**
   * The handleSearch function filters userData based on a query and updates the state with the filtered
   * data.
   */
  const handleSearch = (event) => {
    const query = event.target.value;

    const updatedUserDate = [...userData].filter((item) => {
      return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setUserData(updatedUserDate);
  };

  /**
   * in each array there is an array of seasons, which each have their own image.
   * you dont have to create another fetch, just use the same state
   * use a map to fetch the respective season content?
   */

  const seasons = selectedSeasons.map((season, index) => {
    const { image, title, episodes } = season;

    //put the episode content generation here
    const seeEpisodes = () => {
      const episodeArray = episodes;

      return (
        <Modal.Dialog
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#0B5B53",
            zIndex: 9999,
          }}
        >
          <div>
            {episodeArray.map((episode) => {
              return <p>Title: {episode.title}</p>; // Use return here
            })}
          </div>
        </Modal.Dialog>
      );
    };
    return (
      <div className="season-items" key={index}>
        <img className="season-image" src={image} alt="season-image" />
        <p>{title}</p>
        <p>Episodes: {episodes.length}</p>
        <button onClick={openEpisodes} className="episode-btn border-radius">
          See Episodes
        </button>
      </div>
    );
  });

  // console.log(seasons)
  return (
    <>
      {ReactDOM.createPortal(
        openSeason && (
          <ShowSeasons
            isShown={openSeason}
            onCloseModal={closeSeason}
            seasonContent={seasons}
            openEpisodes={showEpisodesOverlay}
            closeEpisodes={closeEpisodes}
            selectedShow={selectedShow}
          />
        ),
        document.body
      )}

      <SearchAndArrange
        ascending={handleTitleAscendingOrder}
        descending={handleTitleDescendingOrder}
        recent={dateRecent}
        oldest={dateOldest}
        search={handleSearch}
      />

      <Row className="grid-container">
        {showArray.map((show, index) => {
          return (
            <Card key={index} className="preview border-radius">
              <Card.Img className="overlay-image" src={show.image} />

              <Card.Body className="preview-body">
                <Card.Text>Title: {show.title}</Card.Text>
                <Container className="genre-container">
                  <p>Genre : {show.genres}</p>
                  <p>Date updated: {readableDate(show.updated)}</p>
                </Container>
                <Button
                  className="preview-btn border-radius"
                  onClick={() => handleOpenModal(show)}
                >
                  Preview
                </Button>
              </Card.Body>
            </Card>
          );
        })}
      </Row>

      {/* Use createPortal to render the BookModal outside the BrowseAllShows component */}
      {ReactDOM.createPortal(
        selectedShow && (
          <DetailModal
            show={overlay}
            onHide={() => setOverlay(false)}
            image={selectedShow.image}
            title={selectedShow.title}
            updated={selectedShow.updated}
            description={selectedShow.description}
            seasons={selectedShow.seasons}
            openSeason={openSelectedSeason}
          />
        ),
        document.body // Append the modal to the document body
      )}
    </>
  );
};

export default GetAllPodcasts;
