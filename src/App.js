import React from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./components/Main";
import Auth from "./components/Auth";
import SignIn from "./components/SignIn";
import Nav from "./components/Nav";
import { BrowserRouter as Router } from "react-router-dom";
const App = () => {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/signup" element={<Auth />} />
          <Route path="/signin" element={<SignIn />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
