/* The code below fetches data from an API and displays it in a grid of
preview cards. When a user clicks on a preview card, a modal overlay is displayed with more details
about the selected item. The modal includes an image, title, last updated date, number of seasons,
and a description. The code also includes some styling using Bootstrap classes. */
import React from "react";
import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Card, Row, Container, Button } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import ReactPlayer from "react-player";
import { Backdrop, CircularProgress } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../index.css";

/**
 * Logic to give structure to display each preview overlay
 * @returns Overlay box structured with JSX
 */
export const PreviewOverlay = (props) => {
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
        style={{
          backgroundColor: "#17AFA0",
          fontSize: "1.2rem",
          overflowY: "auto",
          maxHeight: "80vh",
        }}
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
            <Button className="overlay-btn border-radius" onClick={onHide}>
              Close
            </Button>
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
                  <p>Seasons : {seasons.length}</p>
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

/**
 * The SearchAndArrange component is a React component that renders a search input and buttons for
 * sorting and filtering data.
 * @returns The SearchAndArrange component returns JSX elements. These elements are responsible for
 * arranging the show titles in both alphabetical and reverse alphabetical order, as well as
 * arranging their dates from oldest to the most recent
 */
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

/*
 *The component 'ShowSeasons' is responsible for rendering a modal
 * that displays all the seasons and episodes of a selected show.
 */
const ShowSeasons = ({
  isShown,
  onCloseModal,
  openEpisodes,
  seasonContent,
  closeEpisodes,
  selectedShow,
}) => {
  const episodes = selectedShow.seasons.map((season, index) => {
    // state to control favorite star fill
    const [isIconFilled, setIsIconFilled] = useState(false);

    //controlling icon fill
    const toggleIconFill = () => {
      setIsIconFilled(!isIconFilled);
    }

    return (
      <div key={index}>
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
            <div className="player-favorite">
              <ReactPlayer
                url={episode.file}
                controls="true"
                height="70px"
                width="80%"
              />
              <button 
              class={`fa-regular fa-star ${isIconFilled? 'filled' : ''}`}
              onClick={toggleIconFill}
              // style={{backgroundColor: "#17AFA0"}}
              ></button>
            </div>
          </div>
        ))}
      </div>
    );
  });

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
        backgroundColor: "#17AFA0",
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
          <div className="modal-title" style={{ fontSize: "1.3rem" }}>
            All seasons
          </div>
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

            {/* The code below is the structure for the episode modal. It renders conditionally
           based on the value of the `openEpisodes` state, and open when the user selects the 
           'See episodes' button when they are in the season view of a show  */}
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

                  padding: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginBottom: "1rem",
                  }}
                >
                  <button
                    className="episode-btn border-radius"
                    style={{ color: "#0B5B53" }}
                    onClick={closeEpisodes}
                  >
                    Back to seasons
                  </button>
                </div>

                <div style={{ overflowY: "auto", maxHeight: "100vh" }}>
                  {episodes}
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal.Dialog>
    </div>
  );
};

/**
 * This component fetches data from an API collecting all the podcast data and displays it
 * in a grid of cards. Each card display a summary preview of the show, with the option to
 * view all its seasons
 * @returns All podcasts structured with JSX
 */
const GetAllPodcasts = () => {
  //state to store all podcasts
  const [userData, setUserData] = useState([]);

  //state to report loading state
  const [loading, setLoading] = useState(true);

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

  /**
   * Opens and closes all modals
   */
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

  const handleOpenModal = (show) => {
    setSelectedSeasons(show.seasons);
    setSelectedShow(show);
    setOverlay(true);
  };

  /**
   * The fetch to retrieve all data to be stored in the state 'userData'
   */
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

  /**
   * Saving all data in a variable to indirectly manipulate it
   */
  const data = userData;

  /**
   * An array to store all of the data's id's
   */
  const idArray = data.map((singleShow) => singleShow.id);

  useEffect(() => {
    /**
     * Map over the array of id's and created another fetch with an endpoint url using each id
     */
    const fetchShowData = async () => {
      const podcastItems = idArray.map((id) => {
        return fetch(`https://podcast-api.netlify.app/id/${id}`).then((res) =>
          res.json()
        );
      });

      /**
       * Used an await for all the fetch requests to complete so that the showArray
       * array is not empty
       */
      const results = await Promise.all(podcastItems);
      setShowArray(results);
    };

    fetchShowData();
  }, [idArray]);

  /**
   * This section creates the functionality of ordering all the data titles into alphabetical order,
   * reverse alphabetical order, arranges all data based on recently updated, to the oldest, as
   * well as retrieves all shows with any title the user inputs
   */
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
 * The below code is mapping over an array called `selectedSeasons` (which is a state returning 
  true if a season is selected) and creates a new array called
  `seasons`. For each element in `selectedSeasons`, it extracts the `image`, `title`, and
  `episodes` properties. It then returns a JSX element that displays all of aforementioned. 
  It also includes a button that, when clicked, calls the `openEpisodes` function and returns
  a modal of all available episodes for that chosen season.
 */
  const seasons = selectedSeasons.map((season, index) => {
    const { image, title, episodes } = season;

    return (
      <div className="season-items border-radius" key={index}>
        <img className="season-image" src={image} alt="season-image" />
        <p>{title}</p>
        <p>Episodes : {episodes.length}</p>

        <button onClick={openEpisodes} className="episode-btn border-radius">
          See Episodes
        </button>
      </div>
    );
  });

  return (
    <>
      <SearchAndArrange
        ascending={handleTitleAscendingOrder}
        descending={handleTitleDescendingOrder}
        recent={dateRecent}
        oldest={dateOldest}
        search={handleSearch}
      />
      {loading ? (
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loading}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        <Row className="grid-container">
          {showArray.map((show, index) => {
            return (
              <Card key={index} className="preview border-radius">
                <Card.Img className="overlay-image" src={show.image} />

                <Card.Body className="preview-body">
                  <Card.Text>Title: {show.title}</Card.Text>
                  <Container className="genre-container">
                    {show.genres && <p>Genre : {show.genres}</p>}
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
      )}
      {/* The below code uses the `ReactDOM.createPortal` method to render two components 
      (which are the overlays to view a show's preview and seasons) as portals into the 
      `document.body` element.  */}
      {ReactDOM.createPortal(
        selectedShow && (
          <PreviewOverlay
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
        document.body
      )}
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
    </>
  );
};

export default GetAllPodcasts;
