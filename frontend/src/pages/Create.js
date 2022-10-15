import CloseIcon from "@mui/icons-material/Close";
import DateAdapter from "@mui/lab/AdapterDayjs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Slide from "@mui/material/Slide";
import Snackbar from "@mui/material/Snackbar";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import FormInfo from "../components/FormInfo";
import React, { useState } from "react";
import Basics from "../components/Basics";
import SessionDetails from "../components/SessionDetails";
import LocationDetails from "../components/LocationDetails";
import PlayerInfo from "../components/PlayerInfo";
import Other from "../components/Other";
import GameStyle from "../components/GameStyle";
import {
  steps,
  languages,
  defaultValues,
  tagList,
  marks,
  platforms,
  options,
  communicationMethods,
  hostings,
  days,
  gameStyles,
  gmStyles,
  adventureStyles,
  gmExperinceLevels,
  genres,
} from "../data/options";

function Create(props) {
  const [temptime, setTempTime] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [values, setValues] = useState(defaultValues);
  const [activeStep, setActiveStep] = React.useState(0);
  const [tags, setTags] = useState([]);
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

  // const handleChangeTags = () => {
  //   setTags([...tags, ])
  // }

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
      tags,
    };

    try {
      const response = await fetch("/groups", {
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
      className="form-container"
      sx={{
        mt: 15,
        mx: 2,
        mb: 5,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* <Collapse in={activeStep == 0}> */}
      <FormInfo
        title="Create"
        type="title"
        subtitle="You can create a record for your roleplaying game here. You can be as precise as you wish to be with your answers. "
      ></FormInfo>
      {/* </Collapse> */}

      <Stepper
        sx={{ marginTop: 2, marginX: -2 }}
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((label, index) => (
          <Step
            sx={{
              "& .MuiStepLabel-root .Mui-completed": {
                color: "#677590",
              },
              "& .MuiStepLabel-root .Mui-active": {
                color: "#4c566a",
              },
            }}
            key={label}
          >
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <Basics
          handleChange={handleChange}
          languages={languages}
          setValues={setValues}
          values={values}
          options={options}
        />
      )}

      {activeStep === 1 && (
        <PlayerInfo
          handleChange={handleChange}
          valueLabelFormat={valueLabelFormat}
          marks={marks}
          values={values}
        />
      )}

      {activeStep === 2 && (
        <LocationDetails
          handleChangeMedium={handleChangeMedium}
          handleChange={handleChange}
          platforms={platforms}
          communicationMethods={communicationMethods}
          hostings={hostings}
          values={values}
        />
      )}

      {activeStep === 3 && (
        <SessionDetails
          handleChange={handleChange}
          DateAdapter={DateAdapter}
          temptime={temptime}
          handleChangeTempTime={handleChangeTempTime}
          days={days}
          values={values}
        />
      )}

      {activeStep === 4 && (
        <GameStyle
          handleChange={handleChange}
          gameStyles={gameStyles}
          gmStyles={gmStyles}
          adventureStyles={adventureStyles}
          gmExperinceLevels={gmExperinceLevels}
          genres={genres}
          values={values}
        />
      )}

      {activeStep === 5 && (
        <Other
          handleChange={handleChange}
          tags={tags}
          setTags={setTags}
          tagList={tagList}
          values={values}
        />
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

export default Create;
