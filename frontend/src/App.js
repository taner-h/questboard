import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Form from "./components/Form";
import Homepage from "./components/Homepage";
import Manage from "./components/Manage";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import Search from "./components/Search";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userID, setUserID] = useState(null);

  const handleChangeUserID = (integer) => {
    setUserID(integer);
  };
  const handleAuthChange = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const handleGrantAuth = () => {
    setIsAuthenticated(true);
  };

  const handleDenyAuth = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  async function isAuth() {
    try {
      const response = await fetch("http://localhost:5000/auth/isVerified", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();
      // console.log(parseRes);
      parseRes === true ? handleGrantAuth() : handleDenyAuth();
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
          <Route
            path="/"
            element={<Homepage isAuthenticated={isAuthenticated} />}
          />
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
            element={
              isAuthenticated ? (
                <Manage isAuthenticated={isAuthenticated} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="*"
            element={<NotFound isAuthenticated={isAuthenticated} />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
