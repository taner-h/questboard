import React from "react";
// import Box from '@mui/material/Box';
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MoreIcon from '@mui/icons-material/More';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Typography from "@mui/material/Typography";

function GameCard(props) {
  return (
    <Card>
      <CardContent sx={{ padding: 2, backgroundColor: "#eceff4" }}>
        <Typography
          sx={{ fontSize: 14, color: "#4c566a" }}
          color="text.secondary"
          gutterBottom
        >
          {props.game}
        </Typography>
        <Typography variant="h6" color="#2e3440">
          {props.adventureName}
        </Typography>
        <Typography variant='subtitle1' sx={{ mb: 1.5 }} color="#434c5e">
          {props.medium}
          <br />
          {props.length}
        </Typography>
        <Typography variant="body2" color="#4c566a">
          {props.playerCount} Players, {props.storyType}, {props.language}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center",
        alignItems: "center",
        display: "flex", backgroundColor: "#e5e9f0" }}>
        {/* <Button
          variant="contained"
          color="grey"
          sx={{
            fontWeight: "bold",
            color: "#d8dee9",
            backgroundColor: "#4c566a",
          }}
          size="small"
        >
          Send Request
        </Button> */}
        <IconButton>
          <AddBoxIcon style={{color: "#4c566a"}} ></AddBoxIcon>
        </IconButton>
        <IconButton >
          <MoreIcon style={{color: "#4c566a"}} ></MoreIcon>
        </IconButton>


      </CardActions>
    </Card>
  );
}

export default GameCard;
