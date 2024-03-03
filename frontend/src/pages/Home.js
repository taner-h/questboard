import React from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import Copyright from "../components/Copyright";
import Grid from "@mui/material/Grid";
import GitHubIcon from "@mui/icons-material/GitHub";
import logo from "../img/dice-dark.svg";
import dnd from "../img/dnd.png";
import cthulhu from "../img/cthulhu.png";
import fate from "../img/fate.png";
import vampire from "../img/vampire.png";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const handleLogin = async () => {
      const body = { email: "test1@mail.com", password: "password" };

      try {
        const response = await fetch("/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const parseRes = await response.json();

        if (parseRes.token) {
          localStorage.setItem("token", parseRes.token);
          localStorage.setItem("user", parseRes.userID);
          props.handleAuthChange(true);
          // setOpenToastSuccess(true);
        } else {
          // setOpenToastFail(true);
          props.handleAuthChange(false);
        }
        // console.log(parseRes);
      } catch (err) {
        console.error(err.message);
      }
    };
    if (location.pathname === "/test") {
      handleLogin();
    }
  }, [third]);

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
        <Container
          maxWidth="xs"
          sx={{
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
              wordWrap: "break-word",
            }}
            variant="h3"
          >
            Looking for online{" "}
            <span style={{ color: "#677590" }}> game groups</span>?
          </Typography>
        </Container>

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

        <Typography sx={{ mt: 5, flexGrow: 1, color: "#434C5E" }} variant="h5">
          Supported game systems:
        </Typography>

        <Grid
          container
          justifyContent="center"
          // alignItems="center"
          maxWidth="md"
          sx={{ my: 3, alignItems: "stretch" }}
          spacing={4}
        >
          <Grid sx={{ margin: "auto" }} item xs={12} sm={6} md={3}>
            <img src={dnd} alt="D&D Logo" width={180}></img>
          </Grid>
          <Grid sx={{ margin: "auto" }} item xs={12} sm={6} md={3}>
            <img src={vampire} alt="D&D Logo" width={180}></img>
          </Grid>
          <Grid sx={{ margin: "auto" }} item xs={12} sm={6} md={3}>
            <img src={fate} alt="D&D Logo" width={180}></img>
          </Grid>
          <Grid sx={{ margin: "auto" }} item xs={12} sm={6} md={3}>
            <img src={cthulhu} alt="D&D Logo" width={180}></img>
          </Grid>
        </Grid>

        <Typography sx={{ mt: 5, flexGrow: 1, color: "#434C5E" }} variant="h5">
          and many more...
        </Typography>
      </Container>
      <Box
        sx={{
          backgroundColor: "#2E3440",
          mt: 5,
          py: 3,
        }}
      >
        <Copyright />
      </Box>
    </>
  );
}
