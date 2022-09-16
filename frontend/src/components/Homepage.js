import React, { Fragment } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import GitHubIcon from "@mui/icons-material/GitHub";
import logo from "../img/dice-dark.svg";
import { Link as MuiLink } from "@mui/material";

function Copyright(props) {
  return (
    <Typography variant="body2" color="#4C566A" align="center" {...props}>
      {"Copyright © "}
      <Link style={{ textDecoration: "none", color: "#4C566A" }} to="/">
        questboard
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Homepage() {
  return (
    <>
      <Container
        maxWidth="md"
        sx={{
          mt: 20,
          flexGrow: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            flexGrow: 1,
            color: "#434C5E",
            fontWeight: "700",
          }}
          variant="h2"
        >
          Looking for online
          <br />
          <span style={{ color: "#677590" }}>game groups</span>?
        </Typography>

        <Typography
          sx={{
            mt: 8,
            flexGrow: 1,
            color: "#434C5E",
          }}
          variant="h5"
        >
          With{" "}
          <span style={{ fontWeight: "bold", color: "#677590" }}>
            questboard
          </span>
          , you can create, search and manage game groups and schedule your
          online & IRL game sessions.
        </Typography>

        <Box>
          <Link className="text-link" to="/search">
            <Button
              variant="contained"
              style={{ textTransform: "none" }}
              color="grey"
              size="large"
              sx={{
                backgroundColor: "#434C5E",
                fontSize: 19,
                width: 200,
                height: 64,
                color: "#d8dee9",
                mt: 5,
                mx: 3,
              }}
            >
              Get Started
            </Button>
          </Link>
          <a class="text-link" href="https://github.com/taner-h/questboard">
            <Button
              variant="contained"
              style={{ textTransform: "none" }}
              color="grey"
              startIcon={<GitHubIcon />}
              size="large"
              sx={{
                backgroundColor: "#434C5E",
                fontSize: 19,
                width: 200,
                height: 64,
                mt: 5,
                color: "#d8dee9",
                mx: 3,
              }}
            >
              GitHub
            </Button>
          </a>
        </Box>

        <Typography
          sx={{
            flexGow: 1,
            color: "#4C566A",
          }}
          variant="h5"
        ></Typography>

        <img src={logo} alt="logo" height={200} style={{ marginTop: 50 }} />
        <Divider sx={{ mt: 6 }} />

        {/* <Typography
          sx={{ mt: 5, flexGrow: 1, color: "#434C5E", fontWeight: "600" }}
          variant="h5"
        >
          Supported game systems:
        </Typography> */}
        <Copyright sx={{ mt: 4, mb: 1 }} />
      </Container>
    </>
  );
}
