import React, { useState, useEffect } from "react";
// import Drawer from '@mui/material/Drawer';
// import AppBar from '@mui/material/AppBar';
import Grid from "@mui/material/Grid";
// import Toolbar from '@mui/material/Toolbar';
// import List from '@mui/material/List';
// import Typography from '@mui/material/Typography';
// import ListItem from '@mui/material/ListItem';
import Divider from "@mui/material/Divider";
// import Card from "@mui/material/Card";
// import CardActions from "@mui/material/CardActions";
import GameCard from "./GameCard";
import FormInfo from "./FormInfo";
// import NavBar from './NavBar';
// import CardContent from "@mui/material/CardContent";
// import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import MoreIcon from '@mui/icons-material/More';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
// import Stack from '@mui/material/Stack';
// import Chip from '@mui/material/Chip';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';

function Manage(props) {

  const [name, setName] = useState("");

  async function getName()
  {
    try {
      const response = await fetch("http://localhost:5000/manage/",{
      method: "GET",
      headers: {token: localStorage.token}
    });

    const parseRes = await response.json();

    setName(parseRes.username);
    console.log(parseRes.username);

    } catch (err) {
      console.error(err.message); 
    }
  }


  useEffect(() => {
    getName();
  }, []); 

  return (

    <Box
    sx={{ flexGrow: 1, mt: 17, paddingX: { xs: 4, sm: 6, md: 8, lg: 12 } }}
    >
      <FormInfo
        type="title"
        title="Manage"
        welcome={name}
        subtitle={"Manage your groups here. Schedule the next session and add a new group member (or ban them if you want, we won't tell anybody!"}
      ></FormInfo>

      <Divider variant="middle" />

      <FormInfo
        title="My Groups"
        // subtitle="Let's start with the basics. Tell us about the basics of the game you wish to run."
      ></FormInfo>

      <Grid
        container
        sx={{
          marginBottom: 8,
          alignItems: "stretch",
          justifyContent: "center",
        }}
        spacing={4}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            game="D&D 5e"
            adventureName="Curse of Strahd"
            medium="Online(Roll20)"
            length="Campaign"
            playerCount="5/7"
            storyType="Prewritten"
            language="English"
          ></GameCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            game="FATE: Core"
            adventureName="Dragon Heist"
            medium="Online(Roll20)"
            length="Mini Adventure"
            playerCount="3/5"
            storyType="Prewritten"
            language="English"
          ></GameCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            game="D&D 5e"
            adventureName="Witchlight"
            medium="Online(Foundry)"
            length="Campaign"
            playerCount="0/5"
            storyType="Prewritten"
            language="German"
          ></GameCard>
        </Grid>
      </Grid>

      <FormInfo
        title="Pending Response"
        // subtitle="Let's start with the basics. Tell us about the basics of the game you wish to run."
      ></FormInfo>

      <Grid
        container
        sx={{
          marginBottom: 8,
          alignItems: "stretch",
          justifyContent: "center",
        }}
        spacing={4}
      >
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            game="Pathfinder 2e"
            adventureName="Out of the Abyys"
            medium="Istanbul, Turkey"
            length="One Shot"
            playerCount="1/4"
            storyType="Homebrew"
            language="English"
          ></GameCard>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={3}>
          <GameCard
            game="Call of Cthulhu 7e"
            adventureName="Below the Surface"
            medium="London, UK"
            length="One-Shot"
            playerCount="3/7"
            storyType="Homebrew"
            language="English"
          ></GameCard>
        </Grid>
      </Grid>
    </Box>

  )

}

export default Manage;
