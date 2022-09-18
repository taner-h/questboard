import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FormInfo from "./FormInfo";
import Typography from "@mui/material/Typography";
import GameCard from "./GameCard";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";

function Manage(props) {
  const [name, setName] = useState("");
  const [gmGroups, setGmGroups] = useState([]);
  const [playerGroups, setPlayerGroups] = useState([]);
  const [requestGroups, setRequestGroups] = useState([]);

  const [tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const getGroups = async () => {
    try {
      const userID = localStorage.getItem("user");

      const response = await fetch(`/groups/${userID}`);
      const jsonRes = await response.json();

      setGmGroups(jsonRes.gm);
      setPlayerGroups(jsonRes.player);
      setRequestGroups(jsonRes.request);

      // console.log(gmGroups);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getGroups();
  }, [props.isAuthenticated]);

  return (
    <Box
      sx={{ flexGrow: 1, mt: 17, paddingX: { xs: 4, sm: 6, md: 8, lg: 12 } }}
    >
      <FormInfo
        type="title"
        title="Manage"
        name={name}
        isAuthenticated={props.isAuthenticated}
        subtitle={
          "You can manage your groups from here. Schedule the next session and add a new group member."
        }
      ></FormInfo>

      <Tabs value={tab} onChange={handleChange} centered>
        <Tooltip title="Groups that you created">
          <Tab label="Creator" />
        </Tooltip>
        <Tooltip title="Groups in which your a player">
          <Tab label="Player" />
        </Tooltip>
        <Tooltip title="Groups that you sent a request to">
          <Tab label="Requested" />
        </Tooltip>
      </Tabs>

      <Divider sx={{ mb: 5 }} variant="middle" />

      {tab === 0 &&
        (gmGroups.length === 0 ? (
          <>
            <Typography sx={{ mb: 3, color: "#4c566a" }}>
              You have no groups that you created.
            </Typography>

            <Typography sx={{ mb: 3, color: "#4c566a" }}>
              Click the button below and start creating a group.
            </Typography>

            <Link className="text-link" to="/create">
              <Button
                variant="contained"
                color="grey"
                sx={{
                  backgroundColor: "#2e3440",
                  color: "#d8dee9",
                }}
              >
                Create
              </Button>
            </Link>
          </>
        ) : (
          <Grid
            container
            sx={{
              marginBottom: 8,
              alignItems: "stretch",
              justifyContent: "center",
            }}
            spacing={4}
          >
            {gmGroups.map((group) => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <GameCard type="gm" group={group}></GameCard>
              </Grid>
            ))}
          </Grid>
        ))}
      {tab === 1 &&
        (playerGroups.length === 0 ? (
          <>
            <Typography sx={{ mb: 3, color: "#4c566a" }}>
              You have no groups in which you are a player.
            </Typography>

            <Typography sx={{ mb: 3, color: "#4c566a" }}>
              Click the button below and start searching for games.
            </Typography>

            <Link className="text-link" to="/search">
              <Button
                variant="contained"
                color="grey"
                sx={{
                  backgroundColor: "#2e3440",
                  color: "#d8dee9",
                }}
              >
                Search
              </Button>
            </Link>
          </>
        ) : (
          <Grid
            container
            sx={{
              marginBottom: 8,
              alignItems: "stretch",
              justifyContent: "center",
            }}
            spacing={4}
          >
            {playerGroups.map((group) => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <GameCard group={group} type="player"></GameCard>
              </Grid>
            ))}
          </Grid>
        ))}
      {tab === 2 &&
        (requestGroups.length === 0 ? (
          <>
            <Typography sx={{ mb: 3, color: "#4c566a" }}>
              You have no requested groups.
            </Typography>

            <Typography sx={{ mb: 3, color: "#4c566a" }}>
              Click the button below and start searching for games.
            </Typography>

            <Link className="text-link" to="/search">
              <Button
                variant="contained"
                color="grey"
                sx={{
                  backgroundColor: "#2e3440",
                  color: "#d8dee9",
                }}
              >
                Search
              </Button>
            </Link>
          </>
        ) : (
          <Grid
            container
            sx={{
              marginBottom: 8,
              alignItems: "stretch",
              justifyContent: "center",
            }}
            spacing={4}
          >
            {requestGroups.map((group) => (
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <GameCard type="request" group={group}></GameCard>
              </Grid>
            ))}
          </Grid>
        ))}
    </Box>
  );
}

export default Manage;
