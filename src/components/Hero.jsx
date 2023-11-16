import React, { useState } from "react";
import SignIn from "./SignIn";
import { Link } from "react-router-dom"

/**
 * The Hero component is a React functional component that renders a fixed position logo and
 * the logo name "Podify".
 */
const Hero = () => {
  const [ showSignIn, setShowSignIn ] = useState(false);

  const signin = () => {
    console.log('this button registers')
    setShowSignIn(true)
  }
  return (
    <>
      <div className="hero">
        <a href="index.html">
          <div
            style={{
              borderRadius: "100%",
              height: "170px",
              width: "180px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F1FDFC",
              marginRight: '1rem'
            }}
          >
            <img className="logo" src="podcast.png" alt="logo-image" />
          </div>
        </a>
        <div>
          
          <Link className="sign-in-button" to='/SignIn'>Sign In</Link>
        </div>
      </div>
      <div className="logo-name">
        <h1>Podify</h1>
      </div>
    </>
  );
};

export default Hero;
