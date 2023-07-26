import React from "react";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";

// MUI components
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import FeaturedPlayListOutlinedIcon from '@mui/icons-material/FeaturedPlayListOutlined';
import StarBorderIcon from "@mui/icons-material/StarBorder";

// HAMBURGER MENU
const drawerWidth = 350;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

// MAIN FUNCTIONALITY
const Hero = () => {

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      

      <BrowserRouter>
      <Box  sx={{ display: "flex" }}>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader className="menu-title">
            Menu
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "rtl" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List className="menu-list">
            <ListItem disablePadding>
              <StarBorderIcon            
                className="menu-item"
                fontSize="large"
              ></StarBorderIcon>

              <NavLink to='/Favorites'><p className="menu-item">Favorites</p></NavLink>
            </ListItem>
          </List >

          <List className="menu-list">
          <ListItem disablePadding>
              <FeaturedPlayListOutlinedIcon
                className="menu-item"
                fontSize="large"
              ></FeaturedPlayListOutlinedIcon>

              <p className="menu-item">Genres</p>
            </ListItem>
          </List>
        </Drawer>
      </Box>
        <div className="nav border-radius">
          <a href="index.html">
            <img className="logo" src="podcast.png" alt="logo-image" />
          </a>
          <div className="navigation">
            <a href="/Preview">
              <p className="browse nav-item">Browse</p>
            </a>

            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="end"
              onClick={handleDrawerOpen}
              sx={{ ...(open && { display: "none" }) }}
            >
              <img
                className="settings nav-item"
                src="settings.png"
                alt="settings-image"
              />
            </IconButton>
          </div>
        </div>
        <div className="logo-name">
          <h1>Podify</h1>
        </div>
      </BrowserRouter>
    </>
  );
};

export default Hero;
