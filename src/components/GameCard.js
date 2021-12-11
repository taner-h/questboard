import React from "react";
// import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
// import ImageIcon from "@mui/icons-material/Image";
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
// import WorkIcon from "@mui/icons-material/Work";
// import BeachAccessIcon from "@mui/icons-material/BeachAccess";
// import Button from "@mui/material/Button";
// import MoreIcon from "@mui/icons-material/More";
import AddBoxIcon from "@mui/icons-material/AddBox";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@mui/material/Typography";
// import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";

function GameCard(props) {
  const [openInfo, setOpenInfo] = React.useState(false);
  const [fullWidth, setFullWidth] = React.useState(true);
  const [addGame, setAddGame] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState("sm");

  const handleClickOpenInfo = () => {
    setOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setOpenInfo(false);
  };

  const handleAddGame = () => {
    setAddGame(true);
  };

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value
    );
  };

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked);
  };

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
        <Typography variant="subtitle1" sx={{ mb: 1.5 }} color="#434c5e">
          {props.medium}
          <br />
          {props.length}
        </Typography>
        <Typography variant="body2" color="#4c566a">
          {props.playerCount} Players, {props.storyType}, {props.language}
        </Typography>
      </CardContent>
      <CardActions
        sx={{
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          backgroundColor: "#e5e9f0",
        }}
      >
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
        {/* <IconButton>
          <AddBoxIcon style={{color: "#4c566a"}} ></AddBoxIcon>
        </IconButton>
        <IconButton >
          <MoreIcon style={{color: "#4c566a"}} ></MoreIcon>
        </IconButton> */}
        <CardActions>
          <Button
            size="small"
            variant="contained"
            color="grey"
            sx={{
              fontWeight: "bold",
              color: "#d8dee9",
              backgroundColor: "#4c566a",
              // marginRight: 1.5,
            }}
            onClick={handleClickOpenInfo}
          >
            {props.page === "search" ? "Learn More" : "Details"}
          </Button>
          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={openInfo}
            onClose={handleCloseInfo}
            PaperProps={{
              style: {
                backgroundColor: "#eceff4",
              },
            }}
          >
            {/* <DialogTitle>Curse of Strahd</DialogTitle> */}
            <DialogContent>
              <Box sx={{ m: 2 }}>
                <Grid container alignItems="center">
                  <Grid item xs>
                    <Typography
                      sx={{
                        color: "#2e3440",
                        fontWeight: "500",
                        marginBottom: 1,
                      }}
                      variant="h4"
                      component="div"
                    >
                      Curse of Strahd
                    </Typography>
                  </Grid>
                  <Grid item>
                    {props.page === "search" ? (
                      <IconButton
                        size="large"
                        disabled={addGame}
                        sx={{ color: "#4c566a", marginBottom: 1 }}
                        onClick={handleAddGame}
                      >
                        <AddBoxIcon className="addBoxIcon" />
                      </IconButton>
                    ) : null}
                  </Grid>
                </Grid>

                <Typography color="#4c566a" variant="body2">
                  Under raging storm clouds, the vampire Count Strahd von
                  Zarovich stands silhouetted against the ancient walls of
                  Castle Ravenloft. Rumbling thunder pounds the castle spires.
                  The wind’s howling increases as he turns his gaze down toward
                  the village of Barovia. A lightning flash rips through the
                  darkness, but Strahd is gone. Only the howling of the wind
                  fills the midnight air. The master of Castle Ravenloft is
                  having guests for dinner—and you are invited.
                </Typography>
              </Box>

              <Divider variant="middle" />
              <Box sx={{ m: 2 }}>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "500" }}
                  color="#434c5e"
                  variant="body1"
                >
                  Basics
                </Typography>
                <Typography color="#4c566a" variant="body2">
                  D&D 5e, Campaign, English, Prewritten
                </Typography>
              </Box>
              <Divider variant="middle" />
              <Box sx={{ m: 2 }}>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "500" }}
                  color="#434c5e"
                  variant="body1"
                >
                  Player Info
                </Typography>
                <Typography color="#4c566a" variant="body2">
                  5/7 Players, Intermediate
                </Typography>
              </Box>
              <Divider variant="middle" />
              <Box sx={{ m: 2 }}>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "500" }}
                  color="#434c5e"
                  variant="body1"
                >
                  Location Details
                </Typography>
                <Typography color="#4c566a" variant="body2">
                  Online, Roll20, Discord
                </Typography>
              </Box>
              <Divider variant="middle" />
              <Box sx={{ m: 2 }}>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "500" }}
                  color="#434c5e"
                  variant="body1"
                >
                  Session Details
                </Typography>
                <Typography color="#4c566a" variant="body2">
                  1 Session per 7 days, 4 Hours, +3 UTC, Friday, 7 PM
                </Typography>
              </Box>
              <Divider variant="middle" />
              <Box sx={{ m: 2 }}>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "500" }}
                  color="#434c5e"
                  variant="body1"
                >
                  Game Style
                </Typography>
                <Typography color="#4c566a" variant="body2">
                  RP-heavy, Improvised, Character Driven, Experienced, Horror
                </Typography>
              </Box>

              <Divider variant="middle" />
              <Box sx={{ m: 2 }}>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "500" }}
                  color="#434c5e"
                  variant="body1"
                >
                  Tags
                </Typography>
                <Chip
                  sx={{
                    m: 0.5,
                    backgroundColor: "#4c566a48",
                    color: "#2e3440",
                  }}
                  label="Gothic"
                />
                <Chip
                  sx={{
                    m: 0.5,
                    backgroundColor: "#4c566a48",
                    color: "#2e3440",
                  }}
                  label="Ravenloft"
                />
                <Chip
                  sx={{
                    m: 0.5,
                    backgroundColor: "#4c566a48",
                    color: "#2e3440",
                  }}
                  label="Serious"
                />
                <Chip
                  sx={{
                    m: 0.5,
                    backgroundColor: "#4c566a48",
                    color: "#2e3440",
                  }}
                  label="Vampire"
                />
                <Chip
                  sx={{
                    m: 0.5,
                    backgroundColor: "#4c566a48",
                    color: "#2e3440",
                  }}
                  label="Sandbox"
                />
                <Chip
                  sx={{
                    m: 0.5,
                    backgroundColor: "#4c566a48",
                    color: "#2e3440",
                  }}
                  label="Dark"
                />
              </Box>

              {props.page === "search" ? null : (
                <>
                  <Divider variant="middle" />

                  <Box sx={{ m: 2 }}>
                    <Typography
                      gutterBottom
                      sx={{ fontWeight: "500" }}
                      color="#434c5e"
                      variant="body1"
                    >
                      Next Session
                    </Typography>

                    <Typography color="#4c566a" variant="body2">
                      19.12.2021, 18.00, Roll20, Dicord
                    </Typography>
                  </Box>
                  <Divider variant="middle" />

                  <Box sx={{ m: 2 }}>
                    <Typography
                      gutterBottom
                      sx={{ fontWeight: "500" }}
                      color="#434c5e"
                      variant="body1"
                    >
                      Players
                    </Typography>

                    <List
                      sx={{
                        width: "100%",
                        // maxWidth: 360,
                      }}
                    >
                      <ListItem
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ color: "#4c566a" }}>
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="garygygax"
                          secondary="Sorcerer 6"
                        />
                      </ListItem>
                      <ListItem
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ color: "#4c566a" }}>
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="quillM420"
                          secondary="Rogue 9"
                        />
                      </ListItem>
                      <ListItem
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ color: "#4c566a" }}>
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="JuanB70-1"
                          secondary="Bard 8"
                        />
                      </ListItem>
                      <ListItem
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ color: "#4c566a" }}>
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="Caspien-Dragonborn"
                          secondary="Paladin 10"
                        />
                      </ListItem>
                      <ListItem
                        secondaryAction={
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        }
                      >
                        <ListItemAvatar>
                          <Avatar sx={{ color: "#4c566a" }}>
                            <PersonIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary="GarakMukremin"
                          secondary="Wizard 20"
                        />
                      </ListItem>
                    </List>
                  </Box>
                </>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                variant="contained"
                sx={{
                  fontWeight: "bold",
                  color: "#d8dee9",
                  backgroundColor: "#4c566a",
                  marginBottom: 2,
                  marginRight: 2,
                }}
                color="grey"
                onClick={handleCloseInfo}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </CardActions>
      </CardActions>
    </Card>
  );
}

export default GameCard;
