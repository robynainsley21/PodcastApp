import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Overlay from "./components/Preview";
import Login from "./components/Login";
import supabase from "./supabaseClient";

import "./index.css";

const App = () => {
  useState(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getSession();
      console.log(data);
    };

    fetchUser();
  }, []);

  return (
    <>
      {/* <Home /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
