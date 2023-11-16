import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/Home";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route  path="/" element={<Home />}>
      <Route path="signIn" element={<SignIn />} />
      <Route path="signUp" element={<SignUp />} />
    </Route>
  )
);

const App = () => {
  /* The App function the `useState` hook to create a state variable called `token` and a function
  called `setToken` to update the value of `token` for the sign in page. The initial value of 
  `token` is set to `false`. */
  // const [token, setToken] = useState(false);

  //If the token is true, it is stored in sessionStorage with the key 'token'
  // if (token) {
  //   sessionStorage.setItem("token", JSON.stringify(token));
  // }

  //The useEffect hook is then used to perform an action on the component mount
  // useEffect(() => {
  //   //First it is checked if there is a token stored in the sessionStorage
  //   if (sessionStorage.getItem("token")) {
  //     //If there is a stored 'token', parse it and then update its state.
  //     let data = JSON.parse(sessionStorage.getItem("token"));
  //     setToken(data);
  //   }
  // }, []);

  /**
   * The token is the parsed to the sign in page as a prop
   */
  return (
    <>
      {/* <BrowserRouter>
        <Routes>
          <Route path="SignUp" element={<SignUp />} />
          <Route path="SignIn" element={<SignIn setToken={setToken} />} />
          <Route path="/" element={<Home />} />
          <Route path="/Favorites:userId" element={<Favorites />}/>
        </Routes>
      </BrowserRouter> */}
      <RouterProvider router={router}/>
    </>
  );
};

export default App;
