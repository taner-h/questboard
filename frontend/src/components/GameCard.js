import React, {forceUpdate} from "react";
// import Box from '@mui/material/Box';
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CheckIcon from "@mui/icons-material/Check";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
import EventNoteIcon from "@mui/icons-material/EventNote";
import GroupIcon from "@mui/icons-material/Group";
import CardContent from "@mui/material/CardContent";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
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
import ScheduleIcon from "@mui/icons-material/Schedule";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
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
  const [openPlayers, setOpenPlayers] = React.useState(false);
  const [openSession, setOpenSession] = React.useState(false);

  const [players, setPlayers] = React.useState([]);
  const [requests, setRequests] = React.useState([]);
  const [gm, setGm] = React.useState([]);

  const { group } = props;

  const [toast, setToast] = React.useState({
    isOpen: false,
    message: "",
  });

  const closeToast = (event) => {
    setToast({ ...toast, isOpen: false });
  };

  const getPlayers = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/players/${group.group_id}`
      );
      const jsonRes = await response.json();

      setPlayers(jsonRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getRequests = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/requests/${group.group_id}`
      );
      const jsonRes = await response.json();

      setRequests(jsonRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getGM = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/creator/${group.group_id}`
      );
      const jsonRes = await response.json();

      setGm(jsonRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getExp = (number) => {
    if (number === "0") return "Beginner";
    if (number === "25") return "Novice";
    if (number === "50") return "Intermediate";
    if (number === "75") return "Experienced";
    if (number === "100") return "Veteran";
  };

  const handleClickOpenInfo = () => {
    setOpenInfo(true);
  };

  const handleCloseInfo = () => {
    setOpenInfo(false);
  };
  const handleOpenPlayers = () => {
    getPlayers();
    getRequests();
    getGM();
    setOpenPlayers(true);
  };

  const handleClosePlayers = () => {
    setOpenPlayers(false);
  };
  const handleOpenSession = () => {
    setOpenSession(true);
  };

  const handleCloseSession = () => {
    setOpenSession(false);
  };

  const handleAddGame = async () => {
    try {
      const userID = localStorage.getItem("user");
      const groupID = group.group_id;
      const body = {
        userID,
        groupID,
      };

      const response = await fetch("http://localhost:5000/requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response) {
        setAddGame(true);
        setToast({
          isOpen: true,
          message: "Request has been made succesfully.",
        });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleAcceptRequest = async (userID) => {
    try {
      const groupID = group.group_id;
      const body = {
        userID,
        groupID,
      };
      const response = await fetch("http://localhost:5000/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response)
      {
        setToast({
          isOpen: true,
          message: "User has been added to the group succesfully.",
        });
      }

    } catch (err) {
      console.error(err.message);
    }
  };

  const handleRejectRequest = async (userID) => {
    try {
      const groupID = group.group_id;
      const body ={
        userID,
        groupID
      }

      const response = await fetch("http://localhost:5000/requests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response)
      {
        setToast({
          isOpen: true,
          message: "Request has been declined.",
        });
      }

    } catch (err) {
      console.error(err.message);
    }

  };

  const handleDeletePlayer = async (userID) => {

    try {
      const groupID = group.group_id;
      const body ={
        userID,
        groupID
      }

      const response = await fetch("http://localhost:5000/players", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response)
      {
        setToast({
          isOpen: true,
          message: "User has been deleted from the group.",
        });
      }

    } catch (err) {
      console.error(err.message);
    }
  }


  // const handleMaxWidthChange = (event) => {
  //   setMaxWidth(
  //     // @ts-expect-error autofill of arbitrary value is not handled.
  //     event.target.value
  //   );
  // };

  // const handleFullWidthChange = (event) => {
  //   setFullWidth(event.target.checked);
  // };

  return (
    <Card>
      <CardContent sx={{ padding: 2, backgroundColor: "#eceff4" }}>
        <Typography
          sx={{ fontSize: 14, color: "#4c566a" }}
          color="text.secondary"
          gutterBottom
        >
          {`${group.game_system} ${group.game_version}`}
        </Typography>
        <Typography variant="h6" color="#2e3440">
          {group.adventure_name}
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 1.5 }} color="#434c5e">
          {`${group.medium}(${
            group.medium === "IRL" ? group.session_location : group.platform
          })`}
          <br />
          {group.adventure_length}
        </Typography>
        <Typography variant="body2" color="#4c566a">
          {`${group.current_player_count}/${group.total_player_count}`} Players,{" "}
          {group.story_style}, {group.game_language}
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
        <CardActions>
          {props.page === "search" || props.type === "request" ? null : (
            <Button
              size="small"
              // edge='start'
              color="grey"
              variant="contained"
              onClick={handleOpenPlayers}
              sx={{
                fontWeight: "bold",
                // width: "0.2",,
                color: "#d8dee9",
                backgroundColor: "#4c566a",
              }}
            >
              <GroupIcon />
            </Button>
          )}
          <Button
            size="small"
            variant="contained"
            color="grey"
            sx={{
              fontWeight: "bold",
              color: "#d8dee9",
              backgroundColor: "#4c566a",
            }}
            onClick={handleClickOpenInfo}
          >
            {props.page === "search" ? "Learn More" : "Details"}
          </Button>
          {props.page === "search" || props.type === "request" ? null : (
            <Button
              size="small"
              // edge='end'
              color="grey"
              variant="contained"
              onClick={handleOpenSession}
              sx={{
                fontWeight: "bold",
                color: "#d8dee9",
                backgroundColor: "#4c566a",
              }}
            >
              <WatchLaterIcon />
            </Button>
          )}

          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={openPlayers}
            onClose={handleClosePlayers}
            PaperProps={{
              style: {
                backgroundColor: "#eceff4",
              },
            }}
          >
            <DialogContent>
              <Box sx={{ m: 2 }}>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "500" }}
                  color="#434c5e"
                  variant="body1"
                >
                  GM
                </Typography>
              </Box>
              <Divider variant="middle" />
              <Box sx={{ m: 2 }}>
                <List
                  sx={{
                    width: "100%",
                    // maxWidth: 360,
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar sx={{ backgroundColor: "#4c566a" }}>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={gm.username} />
                  </ListItem>
                </List>
              </Box>

              <Box sx={{ m: 2 }}>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "500" }}
                  color="#434c5e"
                  variant="body1"
                >
                  Players
                </Typography>
              </Box>
              <Divider variant="middle" />
              <Box sx={{ m: 2 }}>
                <List
                  sx={{
                    width: "100%",
                    // maxWidth: 360,
                  }}
                >
                  {players.map((player) => (
                    <ListItem
                  key={player.user_id}
                      secondaryAction={
                        props.type === "gm" ? (
                          <IconButton onClick={() => handleDeletePlayer(player.user_id)} edge="end" aria-label="delete">
                            <DeleteIcon sx={{ color: "#4c566a" }} />
                          </IconButton>
                        ) : null
                      }
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: "#4c566a" }}>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={player.username} />
                    </ListItem>
                  ))}
                </List>
              </Box>

              <Box sx={{ m: 2 }}>
                <Typography
                  gutterBottom
                  sx={{ fontWeight: "500" }}
                  color="#434c5e"
                  variant="body1"
                >
                  Requests
                </Typography>
              </Box>
              <Divider variant="middle" />

              <Box sx={{ m: 2 }}>
                <List
                  sx={{
                    width: "100%",
                    // maxWidth: 360,
                  }}
                >
                  {requests.map((request) => (
                    <ListItem
                  key={request.user_id}
                      secondaryAction={
                        props.type === "gm" ? (
                          <>
                            <IconButton
                              edge="end"
                              aria-label="accept"
                              sx={{ marginRight: 0.5 }}
                              onClick={() => handleAcceptRequest(request.user_id)}
                            >
                              <CheckIcon  sx={{ color: "#4c566a" }} />
                            </IconButton>

                            <IconButton
                              edge="end"
                              onClick={() => handleRejectRequest(request.user_id)}
                              aria-label="reject"
                            >
                              <CloseIcon sx={{ color: "#4c566a" }} />
                            </IconButton>
                          </>
                        ) : null
                      }
                    >
                      <ListItemAvatar>
                        <Avatar sx={{ backgroundColor: "#4c566a" }}>
                          <PersonIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={request.username} />
                    </ListItem>
                  ))}
                </List>
              </Box>
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
                onClick={handleClosePlayers}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            open={openSession}
            onClose={handleCloseSession}
            PaperProps={{
              style: {
                backgroundColor: "#eceff4",
              },
            }}
          >
            <DialogContent>
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
                onClick={handleCloseSession}
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>

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
                      {group.adventure_name}
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
                    ) : (
                      <IconButton
                        size="large"
                        // disabled={addGame}
                        sx={{ color: "#4c566a", marginBottom: 1 }}
                        // onClick={handleAddGame}
                      >
                        <EditIcon className="addBoxIcon" />
                      </IconButton>
                    )}
                  </Grid>
                </Grid>

                <Typography color="#4c566a" variant="body2">
                  {group.primer}
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
                  {`${group.game_system} ${group.game_version}`},{" "}
                  {group.adventure_length}, {group.game_language}, Prewritten
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
                  {`${group.current_player_count}/${group.total_player_count}`}{" "}
                  Players
                  {group.player_experience_level
                    ? `, ${getExp(group.player_experience_level)}`
                    : null}
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
                  {group.medium}
                  {group.medium !== "IRL"
                    ? `, ${group.platform}, ${group.communication_method}`
                    : `, ${group.session_location}, ${group.hosting}`}
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
                  1 Session per {group.session_frequency} days,{" "}
                  {group.session_length} Hours,{" "}
                  {group.gm_timezone > -1
                    ? "UTC +" + group.gm_timezone
                    : "UTC " + group.gm_timezone}
                  , {group.session_day},{" "}
                  {group.session_time
                    ? group.session_time.substring(0, 5)
                    : null}
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
                  {group.player_style}, {group.gm_style},{" "}
                  {group.adventure_style}, {group.gm_experience_level},{" "}
                  {group.story_genre}
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

      <div>
        <Snackbar
          open={toast.isOpen}
          autoHideDuration={4000}
          onClose={closeToast}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          TransitionComponent={Slide}
          message={toast.message}
          action={[
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={closeToast}
            >
              <CloseIcon fontSize="small" />
            </IconButton>,
          ]}
        />
      </div>
    </Card>
  );
}

export default GameCard;
