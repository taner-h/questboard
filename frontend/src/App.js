import "./App.css";
import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import Search from "./components/Search";
import NavBar from "./components/NavBar";
import Manage from "./components/Manage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState(null);

  const handleChangeUserID = (integer) => {
    setUserID(integer);
  };
  const handleAuthChange = (boolean) => {
    setIsAuthenticated(boolean);
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/isVerified", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      // console.log(parseRes);
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth();
  }, []);

  return (
    <div className="App">
      <Router>
        <NavBar
          isAuthenticated={isAuthenticated}
          userID={userID}
          handleChangeUserID={handleChangeUserID}
          handleAuthChange={handleAuthChange}
        ></NavBar>
        <Routes>
          {/* <Route path='/' exact element={<Homepage/>}/> */}
          <Route
            path="/create"
            element={<Form isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/search"
            element={<Search isAuthenticated={isAuthenticated} />}
          />
          <Route
            path="/manage"
            element={<Manage isAuthenticated={isAuthenticated} />}
          />
          {/* <Route path="/manage" render={(props) => <Manage {...props} />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
