import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Slide from "@mui/material/Slide";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import CardActions from "@mui/material/CardActions";
import CheckIcon from "@mui/icons-material/Check";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";
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
import DeleteIcon from "@mui/icons-material/Delete";
import PersonIcon from "@mui/icons-material/Person";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import getExp from "../utils/getExp";
import getDay from "../utils/getDay";
import getNextSession from "../utils/getNextSession";

function GameCard(props) {
  const [openInfo, setOpenInfo] = useState(false);
  const [fullWidth, setFullWidth] = useState(true);
  const [addGame, setAddGame] = useState(false);
  const [maxWidth, setMaxWidth] = useState("sm");
  const [openPlayers, setOpenPlayers] = useState(false);
  const [openSession, setOpenSession] = useState(false);
  const [tags, setTags] = useState([]);
  const [players, setPlayers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [gm, setGm] = useState([]);

  const { group, groups, setGroups } = props;

  const [toast, setToast] = useState({
    isOpen: false,
    message: "",
  });

  const closeToast = (event) => {
    setToast({ ...toast, isOpen: false });
  };

  const getPlayers = async () => {
    try {
      const response = await fetch(`/players/${group.group_id}`);
      const jsonRes = await response.json();

      setPlayers(jsonRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getRequests = async () => {
    try {
      const response = await fetch(`requests/${group.group_id}`);
      const jsonRes = await response.json();

      setRequests(jsonRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getGM = async () => {
    try {
      const response = await fetch(`/creator/${group.group_id}`);
      const jsonRes = await response.json();

      setGm(jsonRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  const getTags = async () => {
    try {
      const response = await fetch(`/tags/${group.group_id}`);
      const jsonRes = await response.json();
      setTags(jsonRes);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleClickOpenInfo = () => {
    setOpenInfo(true);
    getTags();
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

      const response = await fetch("/requests", {
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
      const response = await fetch("/players", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response) {
        setToast({
          isOpen: true,
          message: "User has been added to the group succesfully.",
        });

        try {
          const userResponse = await fetch(`/player/${userID}`);
          // console.log(userResponse);
          const addedUser = await userResponse.json();
          // console.log(addedUser);

          setPlayers([...players, addedUser]);
          setRequests(
            requests.filter((request) => request.user_id !== addedUser.user_id)
          );

          let prev = [...groups];
          let index = prev.findIndex((grp) => grp.group_id === group.group_id);
          prev[index].current_player_count++;
          setGroups(prev);
        } catch (err) {
          console.error(err.message);
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleRejectRequest = async (userID) => {
    try {
      const groupID = group.group_id;
      const body = {
        userID,
        groupID,
      };

      const response = await fetch("/requests", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response) {
        setToast({
          isOpen: true,
          message: "Request has been declined.",
        });

        setRequests(requests.filter((request) => request.user_id !== userID));
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeletePlayer = async (userID) => {
    try {
      const groupID = group.group_id;
      const body = {
        userID,
        groupID,
      };

      const response = await fetch("/players", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response) {
        setToast({
          isOpen: true,
          message: "User has been deleted from the group.",
        });

        setPlayers(players.filter((player) => player.user_id !== userID));

        let prev = [...groups];
        let index = prev.findIndex((grp) => grp.group_id === group.group_id);
        prev[index].current_player_count--;
        setGroups(prev);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Card>
      <CardContent sx={{ padding: 1, backgroundColor: "#eceff4" }}>
        <Typography
          sx={{ fontSize: 14, color: "#4c566a" }}
          color="text.secondary"
          gutterBottom
        >
          {`${
            group.game_system === "Vampire: The Masquerade"
              ? "Vampire:tM"
              : group.game_system
          } ${group.game_version}`}
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
                          <IconButton
                            onClick={() => handleDeletePlayer(player.user_id)}
                            edge="end"
                            aria-label="delete"
                          >
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
                {players.length === 0 && (
                  <Typography sx={{ mb: 3, mx: 2, color: "#4c566a" }}>
                    There are no players in this group.
                  </Typography>
                )}
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
                              disabled={
                                group.current_player_count >=
                                group.total_player_count
                              }
                              edge="end"
                              aria-label="accept"
                              sx={{ marginRight: 0.5 }}
                              onClick={() =>
                                handleAcceptRequest(request.user_id)
                              }
                            >
                              <CheckIcon sx={{ color: "#4c566a" }} />
                            </IconButton>

                            <IconButton
                              edge="end"
                              onClick={() =>
                                handleRejectRequest(request.user_id)
                              }
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

                {requests.length === 0 && (
                  <Typography sx={{ mb: 3, mx: 2, color: "#4c566a" }}>
                    There are no requests for this group.
                  </Typography>
                )}
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
                  Next Session of {group.adventure_name}
                </Typography>
              </Box>

              <Divider variant="middle" />
              <Box sx={{ m: 2 }}>
                {group.session_day && (
                  <Chip
                    sx={{ m: 0.5, color: "#4C566A" }}
                    label={getNextSession(
                      getDay(group.session_day)
                    ).toLocaleDateString("en", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                    variant="outlined"
                  />
                )}
                {group.session_day && (
                  <Chip
                    sx={{ m: 0.5, color: "#4C566A" }}
                    label={group.session_day}
                    variant="outlined"
                  />
                )}
                {group.session_time && (
                  <Chip
                    sx={{ m: 0.5, color: "#4C566A" }}
                    label={group.session_time.substring(0, 5)}
                    variant="outlined"
                  />
                )}
                {group.platform && (
                  <Chip
                    sx={{ m: 0.5, color: "#4C566A" }}
                    label={group.platform}
                    variant="outlined"
                  />
                )}
                {group.communication_method && (
                  <Chip
                    sx={{ m: 0.5, color: "#4C566A" }}
                    label={group.communication_method}
                    variant="outlined"
                  />
                )}
                {group.session_location && (
                  <Chip
                    sx={{ m: 0.5, color: "#4C566A" }}
                    label={group.session_location}
                    variant="outlined"
                  />
                )}
                {group.hosting && (
                  <Chip
                    sx={{ m: 0.5, color: "#4C566A" }}
                    label={group.hosting}
                    variant="outlined"
                  />
                )}
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
                  {group.game_system && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={group.game_system}
                      variant="outlined"
                    />
                  )}
                  {group.game_version && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={group.game_version}
                      variant="outlined"
                    />
                  )}
                  {group.adventure_length && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={group.adventure_length}
                      variant="outlined"
                    />
                  )}
                  {group.game_language && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={group.game_language}
                      variant="outlined"
                    />
                  )}
                  {group.story_style && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={group.story_style}
                      variant="outlined"
                    />
                  )}
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
                  {
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={`${group.current_player_count}/${group.total_player_count} Players`}
                      variant="outlined"
                    />
                  }
                  {group.player_experience_level && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={getExp(group.player_experience_level)}
                      variant="outlined"
                    />
                  )}
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
                  {group.medium && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={group.medium}
                      variant="outlined"
                    />
                  )}
                  {group.platform && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={group.platform}
                      variant="outlined"
                    />
                  )}
                  {group.communication_method && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={group.communication_method}
                      variant="outlined"
                    />
                  )}
                  {group.session_location && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={group.session_location}
                      variant="outlined"
                    />
                  )}
                  {group.hosting && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={group.hosting}
                      variant="outlined"
                    />
                  )}
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
                  {group.session_frequency && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={`Every ${group.session_frequency} days`}
                      variant="outlined"
                    />
                  )}
                  {group.session_length && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={`${group.session_length} Hours`}
                      variant="outlined"
                    />
                  )}
                  {group.session_day && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={group.session_day}
                      variant="outlined"
                    />
                  )}
                  {group.session_time && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={group.session_time.substring(0, 5)}
                      variant="outlined"
                    />
                  )}
                  {(group.gm_timezone || group.gm_timezone === 0) && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={
                        group.gm_timezone > -1
                          ? "UTC +" + group.gm_timezone
                          : "UTC " + group.gm_timezone
                      }
                      variant="outlined"
                    />
                  )}
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
                  {group.player_style && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={group.player_style}
                      variant="outlined"
                    />
                  )}
                  {group.gm_style && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={group.gm_style}
                      variant="outlined"
                    />
                  )}
                  {group.adventure_style && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={group.adventure_style}
                      variant="outlined"
                    />
                  )}
                  {group.gm_experience_level && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={group.gm_experience_level}
                      variant="outlined"
                    />
                  )}
                  {group.story_genre && (
                    <Chip
                      sx={{ m: 0.5, color: "#4C566A" }}
                      label={group.story_genre}
                      variant="outlined"
                    />
                  )}
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
                {tags.map((tag) => (
                  <Chip
                    sx={{ m: 0.5, color: "#4C566A" }}
                    label={tag.tag}
                    variant="outlined"
                  />
                ))}
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
