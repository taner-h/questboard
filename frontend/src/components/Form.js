import CloseIcon from "@mui/icons-material/Close";
import DateAdapter from "@mui/lab/AdapterDayjs";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import Slide from "@mui/material/Slide";
import Slider from "@mui/material/Slider";
import Snackbar from "@mui/material/Snackbar";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import FormInfo from "./FormInfo";
import {
  steps,
  options,
  languages,
  defaultValues,
  tagList,
  marks,
  platforms,
  communicationMethods,
  hostings,
  days,
  gameStyles,
  gmStyles,
  adventureStyles,
  gmExperinceLevels,
  genres,
} from "./options";

function Form(props) {
  const [temptime, setTempTime] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [values, setValues] = useState(defaultValues);
  const [activeStep, setActiveStep] = React.useState(0);
  const [toast, setToast] = React.useState({
    isOpen: false,
    message: "",
  });

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const closeToast = () => {
    setToast({ ...toast, isOpen: false });
  };

  const valueLabelFormat = (value) => {
    return marks.findIndex((mark) => mark.value === value) + 1;
  };

  const handleChangeTempTime = (newValue) => {
    setTempTime(newValue);
    if (newValue)
      setValues({
        ...values,
        sessionHour: newValue.$d.toTimeString().substring(0, 5),
      });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleChangeMedium = (event) => {
    if (event.target.value === "Online") {
      setValues({
        ...values,
        medium: event.target.value,
        location: null,
        hosting: null,
      });
    }
    if (event.target.value === "IRL") {
      setValues({
        ...values,
        platform: null,
        communicationMethod: null,
        medium: event.target.value,
      });
    }
    if (event.target.value === "Hybrid") {
      setValues({ ...values, medium: event.target.value });
    }
  };

  const hasEmptyRequiredValue = () => {
    if (
      !values.gameSystem ||
      !values.gameVersion ||
      !values.adventureName ||
      !values.adventureLength ||
      !values.language ||
      !values.totalPlayerCount ||
      !values.currentPlayerCount ||
      !values.medium
    )
      return true;
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!props.isAuthenticated) {
      setToast({
        isOpen: true,
        message: "Submit failed. Please log in or register first.",
      });
      return;
    }

    if (hasEmptyRequiredValue()) {
      setToast({
        isOpen: true,
        message:
          "Submit failed. Please fill in all the required fields that are marked with *.",
      });
      return;
    }

    const {
      gameSystem,
      gameVersion,
      adventureName,
      adventureLength,
      language,
      totalPlayerCount,
      currentPlayerCount,
      playerExpLevel,
      medium,
      platform,
      communicationMethod,
      location,
      hosting,
      sessionFrequency,
      sessionLength,
      gmTimeZone,
      sessionDay,
      sessionHour,
      gameStyle,
      gmStyle,
      adventureStyle,
      gmExperinceLevel,
      storyGenre,
      campaignPrimer,
      storyStyle,
    } = values;
    const userID = localStorage.getItem("user");
    const body = {
      gameSystem,
      userID,
      gameVersion,
      adventureName,
      adventureLength,
      language,
      totalPlayerCount,
      currentPlayerCount,
      playerExpLevel,
      medium,
      platform,
      communicationMethod,
      location,
      hosting,
      sessionFrequency,
      sessionLength,
      gmTimeZone,
      sessionDay,
      sessionHour,
      gameStyle,
      gmStyle,
      adventureStyle,
      gmExperinceLevel,
      storyGenre,
      campaignPrimer,
      storyStyle,
    };

    try {
      const response = await fetch("http://localhost:5000/groups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response) {
        setIsSubmitted(true);
        setToast({ isOpen: true, message: "Submitted succesfully." });
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <Box
      // component="main"
      className="form-container"
      sx={{
        mt: 15,
        mx: 2,
        mb: 5,
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#eceff4",
      }}
    >
      {/* <Collapse in={activeStep == 0}> */}
      <FormInfo
        title="Create"
        type="title"
        subtitle="You can create a record for your roleplaying game here. You can be as precise as you wish to be with your answers. "
      ></FormInfo>
      {/* </Collapse> */}

      {/* <Divider variant="middle" /> */}

      <Stepper
        sx={{ marginTop: 2, marginX: -2 }}
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((label, index) => (
          <Step
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "#677590", // circle color (COMPLETED)
              },
              "& .MuiStepLabel-root .Mui-active": {
                color: "#4c566a", // circle color (ACTIVE)
              },
            }}
            key={label}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Container
          maxWidth="lg"
          sx={{
            mt: 6,
            mb: 6,
            pt: 4,
            pb: 6,
            backgroundColor: "#eceff4",
            flexGrow: 1,
            minWidth: "fit-content",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <FormInfo
            title="The Basics"
            subtitle="Let's start with the basics. Tell us about the basics of the game you wish to run."
          ></FormInfo>

          <div>
            <FormControl
              required
              sx={{ minWidth: 250, marginX: 2, marginY: 2 }}
            >
              <InputLabel>Game System</InputLabel>
              <Select
                id="game-system-select"
                value={values.gameSystem}
                // variant="filled"
                label="Game System"
                sx={{ color: "#2e3440" }}
                onChange={handleChange("gameSystem")}
              >
                {options.map((i) => {
                  return <MenuItem value={i.system}>{i.system}</MenuItem>;
                })}
              </Select>
            </FormControl>

            <FormControl
              required
              sx={{ minWidth: 250, marginX: 2, marginY: 2 }}
            >
              <InputLabel>Game Version</InputLabel>
              <Select
                disabled={values.gameSystem === ""}
                id="game-version-select"
                value={values.gameVersion}
                // variant="filled"
                label="Game Version"
                sx={{ minWidth: 250 }}
                onChange={handleChange("gameVersion")}
              >
                {values.gameSystem !== "" &&
                  options
                    .find((i) => i.system === values.gameSystem)
                    .versions.map((j) => {
                      return <MenuItem value={j}>{j}</MenuItem>;
                    })}
              </Select>
            </FormControl>
            <FormControl
              required
              sx={{ minWidth: 250, marginX: 2, marginY: 2 }}
            >
              <TextField
                id="filled-basic"
                label={
                  values.storyStyle === "Prewritten"
                    ? "Prewritten Adventure Name *"
                    : "Adventure Name *"
                }
                value={values.adventureName}
                //   variant="filled"
                onChange={handleChange("adventureName")}
              />
            </FormControl>
          </div>
          <div>
            <FormControl
              required
              sx={{ minWidth: 250, marginX: 2, marginY: 2 }}
            >
              <InputLabel>Adventure Length</InputLabel>
              <Select
                required
                id="adventure-length-select"
                value={values.adventureLength}
                // variant="filled"
                label="Adventure Length"
                sx={{ minWidth: 250 }}
                onChange={handleChange("adventureLength")}
              >
                <MenuItem value="One-Shot">One-Shot (1 session)</MenuItem>
                <MenuItem value="Mini adventure">
                  Mini adventure (2-3 sessions)
                </MenuItem>
                <MenuItem value="Adventure">Adventure (5-8 sessions)</MenuItem>
                <MenuItem value="Long Adventure">
                  Long Adventure (10-15 sessions)
                </MenuItem>
                <MenuItem value="Campaign">Campaign (20+ sessions)</MenuItem>
              </Select>
            </FormControl>

            {/* <FormControl  sx={{minWidth:250, marginX: 3, marginY: 1}}>
                    <InputLabel>Game Language</InputLabel>
                    <Select
                        id="game-language-select"
                        value={values.language}
                        variant='filled'
                        label="Game Language"
                        sx={{minWidth:250}}
                        onChange={handleChangeLanguage}
                    >
                        {languages.map(i => {return <MenuItem value={i}>{i}</MenuItem>})} 
                    </Select>
                </FormControl> */}
            <FormControl
              required
              sx={{ minWidth: 250, marginX: 2, marginY: 2 }}
            >
              <Autocomplete
                disablePortal
                id="language-select"
                options={languages}
                value={values.language}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    label="Game Language *"
                  />
                )}
                onChange={(event, newValue) => {
                  setValues({ ...values, language: newValue });
                }}
              />
            </FormControl>
          </div>

          <div>
            <FormControl
              sx={{
                alignItems: "center",
                minWidth: 250,
                marginX: 2,
                marginY: 2,
              }}
              component="fieldset"
            >
              <FormLabel variant="default">Story Style</FormLabel>
              <RadioGroup
                row
                aria-label="story-style"
                value={values.storyStyle}
                sx={{ justifyContent: "center" }}
                onChange={handleChange("storyStyle")}
                name="story-style-radio"
              >
                <FormControlLabel
                  value="Homebrew"
                  sx={{ mx: 2 }}
                  control={<Radio color="default" />}
                  label="Homebrew"
                />
                <FormControlLabel
                  sx={{ mx: 2 }}
                  value="Prewritten"
                  control={<Radio color="default" />}
                  label="Prewritten"
                />
              </RadioGroup>
            </FormControl>
          </div>
        </Container>
      )}

      {activeStep === 1 && (
        <Container
          maxWidth="lg"
          sx={{
            mt: 6,
            mb: 6,
            pt: 4,
            pb: 6,
            backgroundColor: "#eceff4",
            flexGrow: 1,
            minWidth: "fit-content",
          }}
        >
          <FormInfo
            title="Player Info"
            subtitle="Now, let's continue with some key information about your players. "
          ></FormInfo>

          <div>
            <FormControl
              required
              sx={{ maxWidth: 250, marginX: 2, marginY: 1 }}
            >
              {/* <InputLabel>Total Player Count</InputLabel> */}
              <TextField
                id="total-player-count"
                label="Total Player Count *"
                type="number"
                value={values.totalPlayerCount}
                onChange={handleChange("totalPlayerCount")}
                // InputLabelProps={{ shrink: true }}
              />
            </FormControl>
            <FormControl
              required
              sx={{ maxWidth: 250, marginX: 2, marginY: 1 }}
            >
              {/* <InputLabel>Current Player Count{values.totalPlayerCount ? values.totalPlayerCount : ''}</InputLabel> */}
              <TextField
                id="current-player-count"
                label="Current Player Count *"
                type="number"
                value={values.currentPlayerCount}
                onChange={handleChange("currentPlayerCount")}
                // InputLabelProps={{ shrink: false }}
              />
            </FormControl>
          </div>
          <div>
            <FormControl
              sx={{
                minWidth: 250,
                width: "65%",
                maxWidth: 500,
                marginY: 2,
                marginX: 2,
              }}
            >
              <FormLabel>Player Experience Level</FormLabel>
              {/* <Typography id="input-slider" gutterBottom color='grey.700'> Player Experience Level</Typography> */}
              <Slider
                aria-label="Restricted values"
                defaultValue={null}
                value={values.playerExpLevel}
                onChange={handleChange("playerExpLevel")}
                valueLabelFormat={valueLabelFormat}
                // getAriaValueText={valuetext}
                step={null}
                sx={{ color: "#4c566a" }}
                valueLabelDisplay="auto"
                marks={marks}
              />
            </FormControl>
          </div>
        </Container>
      )}

      {activeStep === 2 && (
        <Container
          maxWidth="lg"
          sx={{
            mt: 6,
            mb: 6,
            pt: 4,
            pb: 6,
            backgroundColor: "#eceff4",
            flexGrow: 1,
            minWidth: "fit-content",
          }}
        >
          <FormInfo
            title="Location Details"
            subtitle="Where do you plan to play your games? Please select your prefered method below."
          ></FormInfo>

          <div>
            <FormControl
              sx={{ minWidth: 250, marginX: 2, marginY: 2 }}
              required
            >
              <FormLabel sx={{ color: "#2e3440" }}>Medium</FormLabel>
              <RadioGroup
                row
                sx={{ justifyContent: "center" }}
                aria-label="medium"
                name="row-radio-buttons-group"
                value={values.medium}
                onChange={handleChangeMedium}
              >
                <FormControlLabel
                  value="Online"
                  sx={{ mx: 1 }}
                  control={<Radio color="default" />}
                  label="Online"
                />
                <FormControlLabel
                  sx={{ mx: 1 }}
                  value="Hybrid"
                  control={<Radio color="default" />}
                  label="Hybrid"
                />

                <FormControlLabel
                  sx={{ mx: 1 }}
                  value="IRL"
                  control={<Radio color="default" />}
                  label="IRL"
                />
              </RadioGroup>
            </FormControl>
          </div>

          <div>
            <FormControl sx={{ minWidth: 250, marginX: 2, marginY: 2 }}>
              <InputLabel>Platform</InputLabel>
              <Select
                disabled={
                  values.medium === "Hybrid" || values.medium === "Online"
                    ? false
                    : true
                }
                id="platform-select"
                // value={values.platform}
                value={
                  values.medium === "Hybrid" || values.medium === "Online"
                    ? values.platform
                    : ""
                }
                // variant="filled"
                label="Platform"
                sx={{ minWidth: 250 }}
                onChange={handleChange("platform")}
              >
                {platforms.map((platform) => (
                  <MenuItem value={platform}>{platform}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 250, marginX: 2, marginY: 2 }}>
              <TextField
                disabled={
                  values.medium === "Hybrid" || values.medium === "IRL"
                    ? false
                    : true
                }
                id="location-input"
                label="Location"
                value={
                  values.medium === "Hybrid" || values.medium === "IRL"
                    ? values.location
                    : ""
                }
                //   variant="filled"
                onChange={handleChange("location")}
              />
            </FormControl>
          </div>

          <div>
            <FormControl sx={{ minWidth: 250, marginX: 2, marginY: 2 }}>
              <InputLabel>Communication Method</InputLabel>
              <Select
                disabled={
                  values.medium === "Hybrid" || values.medium === "Online"
                    ? false
                    : true
                }
                id="communication-method"
                value={
                  values.medium === "Hybrid" || values.medium === "Online"
                    ? values.communicationMethod
                    : ""
                }
                // variant="filled"
                label="Communication Method"
                sx={{ minWidth: 250 }}
                onChange={handleChange("communicationMethod")}
              >
                {communicationMethods.map((communicationMethod) => (
                  <MenuItem value={communicationMethod}>
                    {communicationMethod}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 250, marginX: 2, marginY: 2 }}>
              <InputLabel>Hosting</InputLabel>
              <Select
                id="hosting-select"
                disabled={
                  values.medium === "Hybrid" || values.medium === "IRL"
                    ? false
                    : true
                }
                value={
                  values.medium === "Hybrid" || values.medium === "IRL"
                    ? values.hosting
                    : ""
                }
                // variant="filled"
                label="Hosting"
                sx={{ minWidth: 250 }}
                onChange={handleChange("hosting")}
              >
                {hostings.map((hosting) => (
                  <MenuItem value={hosting}>{hosting}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Container>
      )}

      {activeStep === 3 && (
        <Container
          maxWidth="lg"
          sx={{
            mt: 6,
            mb: 6,
            pt: 4,
            pb: 6,
            backgroundColor: "#eceff4",
            flexGrow: 1,
            minWidth: "fit-content",
          }}
        >
          <FormInfo
            title="Sessions Details"
            subtitle="It's time for the session details."
          ></FormInfo>

          <div>
            <FormControl sx={{ maxWidth: 250, marginX: 2, marginY: 2 }}>
              <TextField
                label="Session Frequency"
                id="session-frequency-input"
                type="number"
                value={values.sessionFrequency}
                onChange={handleChange("sessionFrequency")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      1 session per
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">days</InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl sx={{ maxWidth: 250, marginX: 2, marginY: 2 }}>
              <TextField
                label="Session Length"
                id="session-length-input"
                type="number"
                value={values.sessionLength}
                onChange={handleChange("sessionLength")}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">hours</InputAdornment>
                  ),
                }}
              />
            </FormControl>

            <FormControl sx={{ minWidth: 250, marginX: 2, marginY: 2 }}>
              <InputLabel>GM Time Zone</InputLabel>
              <Select
                required
                label="GM Time Zone"
                id="gm-time-zone-input"
                type="number"
                value={values.gmTimeZone}
                onChange={handleChange("gmTimeZone")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">UTC</InputAdornment>
                  ),
                }}
              >
                {Array.from(new Array(25), (x, i) => i + -12).map((j) => {
                  return (
                    <MenuItem value={j}>
                      {j > -1 ? "UTC +" + j : "UTC " + j}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>

          <div>
            <FormControl sx={{ minWidth: 250, marginX: 2, marginY: 2 }}>
              <InputLabel>Session Day</InputLabel>
              <Select
                id="session-day-select"
                value={values.sessionDay}
                // variant="filled"
                label="Session Day"
                onChange={handleChange("sessionDay")}
              >
                {days.map((day) => (
                  <MenuItem value={day}>{day}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 250, marginX: 2, marginY: 2 }}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <TimePicker
                  label="Session Hour"
                  inputFormat="HH:mm"
                  value={temptime}
                  type="time"
                  onChange={handleChangeTempTime}
                  minutesStep={5}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </FormControl>
          </div>
        </Container>
      )}

      {activeStep === 4 && (
        <Container
          maxWidth="lg"
          sx={{
            mt: 6,
            mb: 6,
            pt: 4,
            pb: 6,
            backgroundColor: "#eceff4",
            flexGrow: 1,
            minWidth: "fit-content",
          }}
        >
          <FormInfo
            title="Game Style"
            subtitle="Don't forget about your game style. Not everyone enjoys the same type of gameplay."
          ></FormInfo>

          <div>
            <FormControl sx={{ minWidth: 250, marginX: 2, marginY: 2 }}>
              <InputLabel>Player Game Style</InputLabel>
              <Select
                id="player-game-style-select"
                value={values.gameStyle}
                // variant="filled"
                onChange={handleChange("gameStyle")}
                label="Player Game Style"
              >
                {gameStyles.map((gameStyle) => (
                  <MenuItem value={gameStyle}>{gameStyle}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 250, marginX: 2, marginY: 2 }}>
              <InputLabel>GM Style</InputLabel>
              <Select
                id="gm-style-select"
                label="GM Style"
                // variant="filled"
                value={values.gmStyle}
                onChange={handleChange("gmStyle")}
              >
                {gmStyles.map((gmStyle) => (
                  <MenuItem value={gmStyle}>{gmStyle}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 250, marginX: 2, marginY: 2 }}>
              <InputLabel>Adventure Style</InputLabel>
              <Select
                id="adventure-style-select"
                // variant="filled"
                label="Adventure Style"
                value={values.adventureStyle}
                onChange={handleChange("adventureStyle")}
              >
                {adventureStyles.map((adventureStyle) => (
                  <MenuItem value={adventureStyle}>{adventureStyle}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ minWidth: 250, marginX: 2, marginY: 2 }}>
              <InputLabel>GM Experience Level</InputLabel>
              <Select
                id="gm-experience-level-select"
                // variant="filled"
                label="GM Experience Level"
                value={values.gmExperinceLevel}
                onChange={handleChange("gmExperinceLevel")}
              >
                {gmExperinceLevels.map((gmExperinceLevel) => (
                  <MenuItem value={gmExperinceLevel}>
                    {gmExperinceLevel}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 250, marginX: 2, marginY: 2 }}>
              <InputLabel>Story Genre</InputLabel>
              <Select
                id="story-genre-select"
                // variant="filled"
                label="Story Genre"
                value={values.storyGenre}
                onChange={handleChange("storyGenre")}
              >
                {genres.map((genre) => (
                  <MenuItem value={genre}>{genre}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </Container>
      )}

      {activeStep === 5 && (
        <Container
          maxWidth="lg"
          sx={{
            mt: 6,
            mb: 6,
            pt: 4,
            pb: 6,
            backgroundColor: "#eceff4",
            flexGrow: 1,
            minWidth: "fit-content",
          }}
        >
          <FormInfo
            title="Other"
            subtitle="It's almost over. Don't forget to tell about your game to your potential players!"
          ></FormInfo>

          <div>
            <FormControl
              display="flex"
              sx={{
                minWidth: 250,
                width: "75%",
                maxWidth: 500,
                marginX: 2,
                marginY: 2,
              }}
            >
              <TextField
                id="campaign-primer-input"
                label="Campaign Primer"
                multiline
                minRows={4}
                maxRows={10}
                value={values.campaignPrimer}
                onChange={handleChange("campaignPrimer")}
                sx={{ color: "#4c566a" }}
                placeholder="Type anything you want to get your players' attention."
              />
            </FormControl>
          </div>

          <div>
            <FormControl
              sx={{
                minWidth: 250,
                width: "75%",
                maxWidth: 500,
                marginX: 2,
                marginY: 2,
              }}
            >
              <Autocomplete
                multiple
                id="tags-outlined"
                options={tagList}
                getOptionLabel={(option) => option}
                filterSelectedOptions
                // value={values.tags}
                // onChange={handleChangeTags}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Tags"
                    //   placeholder="Choose one or more tags"
                  />
                )}
              />
            </FormControl>
          </div>
        </Container>
      )}

      <Button
        color="grey"
        disabled={activeStep === 0}
        onClick={handleBack}
        sx={{ mr: 2, color: "#d8dee9", backgroundColor: "#4c566a" }}
        variant="contained"
      >
        Back
      </Button>

      {activeStep === steps.length - 1 ? (
        <Button
          color="grey"
          disabled={isSubmitted}
          sx={{ ml: 2, color: "#d8dee9", backgroundColor: "#4c566a" }}
          variant="contained"
          onClick={handleSubmit}
        >
          Submit
        </Button>
      ) : (
        <Button
          color="grey"
          variant="contained"
          sx={{ ml: 2, color: "#d8dee9", backgroundColor: "#4c566a" }}
          onClick={handleNext}
        >
          Next
        </Button>
      )}

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
    </Box>
  );
}

export default Form;
