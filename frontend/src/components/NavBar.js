import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
// import Container from "@mui/material/Container";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import MenuIcon from "@mui/icons-material/Menu";
import Dialog from "@mui/material/Dialog";
import Input from "@mui/material/Input";
import Snackbar from "@mui/material/Snackbar";
// import CloseIcon from "@mui/icons-material/Close";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ManageIcon from "@mui/icons-material/ManageAccounts";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import CreateIcon from "@mui/icons-material/Create";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Lock from "@mui/icons-material/Lock";
import Logo from "../img/dice.svg";
import { Link } from "react-router-dom";
import { AlternateEmail } from "@material-ui/icons";

function NavBar(props) {
  const [openLogin, setOpenLogin] = React.useState(false);
  const [openRegister, setOpenRegister] = React.useState(false);
  const [drawer, setDrawer] = React.useState(false);
  const [values, setValues] = React.useState({
    password: "",
    username: "",
    tempPassword: "",
    email: "",
    showPassword: false,
  });

  const [toast, setToast] = React.useState({
    isOpen: false,
    message: "",
  });

  const closeToast = (event) => {
    setToast({ ...toast, isOpen: false });
  };

  const { password, email, username } = values;

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawer({ ...drawer, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link
          to="/"
          style={{
            fontWeight: "bold",
            color: "#2e3440",
            textDecoration: "none",
          }}
        >
          <ListItem button key={"home"}>
            <ListItemIcon>
              <HomeIcon sx={{ color: "#4c566a" }} />
            </ListItemIcon>
            <ListItemText primary={"home"} />
          </ListItem>
        </Link>
        <Link
          to="/create"
          style={{
            fontWeight: "bold",
            color: "#2e3440",
            textDecoration: "none",
          }}
        >
          <ListItem button key={"create"}>
            <ListItemIcon>
              <CreateIcon sx={{ color: "#4c566a" }} />
            </ListItemIcon>
            <ListItemText primary={"create"} />
          </ListItem>
        </Link>
        <Link
          to="/search"
          style={{
            fontWeight: "bold",
            color: "#2e3440",
            textDecoration: "none",
          }}
        >
          <ListItem button key={"search"}>
            <ListItemIcon>
              <SearchIcon sx={{ color: "#4c566a" }} />
            </ListItemIcon>
            <ListItemText primary={"search"} />
          </ListItem>
        </Link>
        {props.isAuthenticated && (
          <Link
            to="/manage"
            style={{
              fontWeight: "bold",
              color: "#2e3440",
              textDecoration: "none",
            }}
          >
            <ListItem button key={"manage"}>
              <ListItemIcon>
                <ManageIcon sx={{ color: "#4c566a" }} />
              </ListItemIcon>
              <ListItemText primary={"manage"} />
            </ListItem>
          </Link>
        )}

        {!props.isAuthenticated ? (
          <ListItem button key={"login"} onClick={handleClickOpenLogin}>
            <ListItemIcon>
              <LoginIcon sx={{ color: "#4c566a" }} />
            </ListItemIcon>
            <ListItemText primary={"login"} />
          </ListItem>
        ) : (
          <ListItem button key={"logout"} onClick={handleLogout}>
            <ListItemIcon>
              <LoginIcon sx={{ color: "#4c566a" }} />
            </ListItemIcon>
            <ListItemText primary={"logout"} />
          </ListItem>
        )}
      </List>
    </Box>
  );

  const clearTextInput = () => {
    setValues({ password: "", username: "", email: "", tempPassword: "" });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickOpenLogin = () => {
    setOpenRegister(false);
    setOpenLogin(true);
  };

  // const actionToastSuccess = (
  //   <React.Fragment>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"
  //       onClick={handleCloseToastSuccess}
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </React.Fragment>
  // );
  // const actionToastFail = (
  //   <React.Fragment>
  //     <IconButton
  //       size="small"
  //       aria-label="close"
  //       color="inherit"
  //       onClick={handleCloseToastFail}
  //     >
  //       <CloseIcon fontSize="small" />
  //     </IconButton>
  //   </React.Fragment>
  // );

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    const body = { email, password };

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
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
        setToast({ isOpen: true, message: "Login succesful." });
        // handleChangeToast("loginSuccess", true);
        // try {
        //   const response2 = await fetch(
        //     `http://localhost:5000/users/${email}`,
        //     {
        //       method: "GET",
        //       headers: { "Content-Type": "application/json" },
        //     }
        //   );
        //   const result = await response2.json();
        //   if (result) {
        //     localStorage.setItem("user_id", result.user_id);
        //   }
        // } catch (err) {
        //   console.error(err.message);
        // }
      } else {
        // setOpenToastFail(true);
        setToast({ isOpen: true, message: "Incorrect email or password." });
        props.handleAuthChange(false);
      }
      // console.log(parseRes);
    } catch (err) {
      console.error(err.message);
    }

    setOpenLogin(false);
    clearTextInput();
  };
  const handleClickOpenRegister = () => {
    setOpenLogin(false);
    setOpenRegister(true);
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    const body = { email, password, username };

    try {
      const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();
      if (parseRes) {
        localStorage.setItem("token", parseRes.token);
        localStorage.setItem("user", parseRes.userID);
        props.handleAuthChange(true);
        setToast({
          isOpen: true,
          message: "Registered and logged in succesfully.",
        });

        // handleChangeToast("registerSuccess", true);

        // try {
        //   const response2 = await fetch(
        //     `http://localhost:5000/users/${email}`,
        //     {
        //       method: "GET",
        //       headers: { "Content-Type": "application/json" },
        //     }
        //   );
        //   const result = await response2.json();
        //   if (result) {
        //     localStorage.setItem("user_id", result.user_id);
        //   }
        // } catch (err) {
        //   console.error(err.message);
        // }
      } else {
        setToast({ isOpen: true, message: "Register failed." });
        props.handleAuthChange(false);
      }
    } catch (err) {
      console.error(err.message);
    }

    setOpenRegister(false);
    clearTextInput();
  };

  const handleLogout = (event) => {
    event.preventDefault();
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    props.handleAuthChange(false);
    setToast({ isOpen: true, message: "Logged out succesfully." });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          justifyContent: "center",
          // paddingX: 1,
          minHeight: 66,
          backgroundColor: "#2e3440",
          // width: `calc(100% - 240px)`, ml: `240px`
          // zIndex: (theme) => theme.zIndex.drawer + 1
        }}
      >
        <Toolbar>
          <img
            src={Logo}
            alt="questboardLogo"
            style={{ marginRight: 10 }}
            height={32}
            align="left"
          />
          <Typography
            variant="h6"
            component="div"
            edge="start"
            sx={{
              flexGrow: 1,
              color: "#d8dee9",
              ml: { xs: 1, sm: 0 },
              justifyContent: "center",
              alignItems: "center",
            }}
            align="left"
          >
            <Link className="text-link" to="/">
              questboard
            </Link>
          </Typography>

          <Stack
            direction="row"
            spacing={1.5}
            sx={{ display: { xs: "none", sm: "block" } }}
          >
            <Link className="text-link" to="/">
              <Button
                variant="text"
                color="primary"
                sx={{ textTransform: "lowercase", color: "#d8dee9" }}
              >
                home
              </Button>
            </Link>
            <Link className="text-link" to="/create">
              <Button
                variant="text"
                color="primary"
                sx={{ textTransform: "lowercase", color: "#d8dee9" }}
              >
                create
              </Button>
            </Link>
            <Link className="text-link" to="/search">
              <Button
                variant="text"
                color="primary"
                sx={{ textTransform: "lowercase", color: "#d8dee9" }}
              >
                search
              </Button>
            </Link>
            {props.isAuthenticated && (
              <Link className="text-link" to="/manage">
                <Button
                  variant="text"
                  color="primary"
                  sx={{ textTransform: "lowercase", color: "#d8dee9" }}
                >
                  manage
                </Button>
              </Link>
            )}

            {!props.isAuthenticated ? (
              <Button
                variant="contained"
                color="grey"
                onClick={handleClickOpenLogin}
                sx={{
                  fontWeight: "bold",
                  color: "#4c566a",
                  backgroundColor: "#d8dee9",
                }}
              >
                Login
              </Button>
            ) : (
              <Button
                variant="contained"
                color="grey"
                onClick={handleLogout}
                sx={{
                  fontWeight: "bold",
                  color: "#4c566a",
                  backgroundColor: "#d8dee9",
                }}
              >
                LOGOUT
              </Button>
            )}
          </Stack>
          <React.Fragment key={"right"}>
            <IconButton
              size="large"
              onClick={toggleDrawer("right", true)}
              edge="end"
              aria-label="menu"
              sx={{ display: { sm: "none" }, color: "#d8dee9" }}
            >
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor={"right"}
              open={drawer["right"]}
              PaperProps={{
                style: {
                  backgroundColor: "#eceff4",
                },
              }}
              onClose={toggleDrawer("right", false)}
            >
              {list("right")}
            </Drawer>
          </React.Fragment>
          <Dialog
            open={openLogin}
            // onClose={handleSubmitLogin}
            PaperProps={{
              style: {
                backgroundColor: "#eceff4",
              },
            }}
          >
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
              <Stack spacing={3}>
                <TextField
                  id="input-with-icon-textfield"
                  label="Email"
                  value={values.email}
                  type="text"
                  onChange={handleChange("email")}
                  sx={{ width: "250" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmail />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />

                <FormControl sx={{ width: "250" }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    startAdornment={
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button
                sx={{ color: "#2e3440" }}
                onClick={handleClickOpenRegister}
              >
                Register
              </Button>
              <Button sx={{ color: "#2e3440" }} onClick={handleSubmitLogin}>
                Login
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={openRegister}
            onClose={handleSubmitRegister}
            PaperProps={{
              style: {
                backgroundColor: "#eceff4",
              },
            }}
          >
            <DialogTitle>Register</DialogTitle>
            <DialogContent>
              <Stack spacing={3}>
                <TextField
                  id="input-with-icon-textfield"
                  label="Username"
                  value={values.username}
                  onChange={handleChange("username")}
                  type="text"
                  sx={{ width: "250" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AccountCircle />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />
                <TextField
                  id="input-with-icon-textfield"
                  label="Email"
                  onChange={handleChange("email")}
                  value={values.email}
                  type="email"
                  sx={{ width: "250" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AlternateEmail />
                      </InputAdornment>
                    ),
                  }}
                  variant="standard"
                />

                <FormControl sx={{ width: "250" }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.password}
                    onChange={handleChange("password")}
                    startAdornment={
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <FormControl sx={{ width: "250" }} variant="standard">
                  <InputLabel htmlFor="standard-adornment-password">
                    Confirm Password
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={values.showPassword ? "text" : "password"}
                    value={values.tempPassword}
                    onChange={handleChange("tempPassword")}
                    startAdornment={
                      <InputAdornment position="start">
                        <Lock />
                      </InputAdornment>
                    }
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {values.showPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
              </Stack>
            </DialogContent>
            <DialogActions>
              <Button sx={{ color: "#2e3440" }} onClick={handleClickOpenLogin}>
                Login
              </Button>
              <Button sx={{ color: "#2e3440" }} onClick={handleSubmitRegister}>
                Register
              </Button>
            </DialogActions>
          </Dialog>

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
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default NavBar;
