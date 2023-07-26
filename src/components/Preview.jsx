import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, NavLink } from "react-router-dom";

// MUI features for preview overlay
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const Preview = () => {
  const [userData, setUserData] = useState([]);

  const [sortOrder, setSortOrder] = useState("ascending");

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  //setting error boundary
  const [isError, setIsError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const found = userData.find((obj) => {
    return obj;
  });

  const fetchUserData = () => {
    fetch("https://podcast-api.netlify.app/")
      .then((response) => response.json())
      .then((data) => setUserData(data));
     
  };

  useEffect(() => {
    fetchUserData()
    // .catch(error => {
    //     console.error('Data could not be retrieved', error)
    //     setIsError(true)
    // })
  }, []);

  const eachPreview = userData.map((item) => {
    const date = new Date(item.updated).toDateString();

    return (
      <div
        className="preview border-radius"
        key={item.id}
        onClick={item.handlerPreview}
      >
        <img className="preview-img" src={item.image} alt="show-image" />
        <p>{item.title}</p>
        <p>Seasons: {item.seasons}</p>
        <p>Date: {date}</p>
        <button onClick={handleClickOpen} className="border-radius preview-btn">
          Preview
        </button>
        <button className="border-radius preview-btn">
          <NavLink to='/Seasons'><p>Seasons</p></NavLink>
        </button>
      </div>
    );
  });

  /**
   * Arranging podcasts in alphabetical order based its title
   */
  const handleAscendingOrder = () => {
    setSortOrder("ascending");
    const sortedData = [...userData].sort((a, b) => {
      if (sortOrder === "ascending") {
        return a.title.localeCompare(b.title);
      }
    });
    setUserData(sortedData);
  };

  const handleDescendingOrder = () => {
    setSortOrder("descending");
    const sortedData = [...userData].sort((a, b) => {
      if (sortOrder === "descending") {
        return b.title.localeCompare(a.title);
      }
    });

    setUserData(sortedData);
  };

  /**
   * Arranging podcast cards by most recently updated
   */
  const dateRecent = () => {
    const arrangedDate = [...userData].sort((a, b) => {
      return b.updated.localeCompare(a.updated);
    });

    setUserData(arrangedDate);
  };

  /**
   * Arranging podcast cards by oldest to latest
   */
  const dateOldest = () => {
    const arrangedDate = [...userData].sort((a, b) => {
      return a.updated.localeCompare(b.updated);
    });

    setUserData(arrangedDate);
  };

  /**
   * Searching specific podcast based on user's search input
   */
  const handleSearch = (event) => {
    const query = event.target.value;

    const updatedUserDate = [...userData].filter((item) => {
      return item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });

    setUserData(updatedUserDate);
  };

  return (
    <BrowserRouter>
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {found && <p>{found.title}</p>}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {found && (
                <div key={found.id}>
                  <img
                    className="overlay-image"
                    src={found.image}
                    alt="podcast-image"
                  />
                  <b><p>Description:</p></b>
                  <p>{found.description}</p>
                  <p><b>Genres:</b> {found.genres.length}</p>
                  <p><b>Seasons:</b> {found.seasons}</p>
                </div>
              )}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button autoFocus onClick={handleClose}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="search">
        <input
          onChange={handleSearch}
          className="main-search border-radius"
          placeholder="Search by Name"
        />
        <div className="alphabetical-buttons">
          <button
            onClick={handleAscendingOrder}
            className="alpha-btn border-radius"
          >
            Title A-Z
          </button>
          <button
            onClick={handleDescendingOrder}
            className="alpha-btn border-radius"
          >
            Title Z-A
          </button>
          <button onClick={dateRecent} className="alpha-btn border-radius">
            Date A-Z
          </button>
          <button onClick={dateOldest} className="alpha-btn border-radius">
            Date Z-A
          </button>
        </div>
      </div>

      <div className="grid-container">{eachPreview}</div>
    </BrowserRouter>
  );
};

export default Preview;
