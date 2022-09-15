import React, { useState } from "react";
import FormInfo from "./FormInfo";
import InputLabel from "@mui/material/InputLabel";
import Slide from "@mui/material/Slide";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
// import Card from "@mui/material/Card";
// import Paper from "@mui/material/Paper";
// import { makeStyles } from "@mui/styles";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Slider from "@mui/material/Slider";
// import Typography from "@mui/material/Typography";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import InputAdornment from "@mui/material/InputAdornment";
import RadioGroup from "@mui/material/RadioGroup";
import TimePicker from "@mui/lab/TimePicker";
import DateAdapter from "@mui/lab/AdapterDayjs";
import Divider from "@mui/material/Divider";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Snackbar from "@mui/material/Snackbar";
import Collapse from "@mui/material/Collapse";

// import Stack from "@mui/material/Stack";

function Form(props) {
  const [temptime, setTempTime] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [values, setValues] = useState({
    gameSystem: "",
    gameVersion: "",
    adventureName: "",
    adventureLength: "",
    language: "",
    totalPlayerCount: null,
    currentPlayerCount: null,
    playerExpLevel: "",
    medium: "",
    platform: "",
    communicationMethod: "",
    location: "",
    hosting: "",
    sessionFrequency: null,
    sessionLength: null,
    gmTimeZone: null,
    sessionDay: "",
    sessionHour: null,
    gameStyle: "",
    gmStyle: "",
    adventureStyle: "",
    gmExperinceLevel: "",
    storyGenre: "",
    campaignPrimer: "",
    storyStyle: "",
    tags: [],
  });

  const [toast, setToast] = React.useState({
    isOpen: false,
    message: "",
  });

  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const closeToast = (event) => {
    setToast({ ...toast, isOpen: false });
  };

  const steps = [
    "The Basics",
    "Player Info",
    "Location Details",
    "Session Details",
    "Game Style",
    "Other",
  ];

  const options = [
    // {
    //   system: "",
    //   versions: [""],
    // },
    {
      system: "Dungeons & Dragons",
      versions: [
        "Original Edition",
        "AD&D 1st Edition",
        "AD&D 2nd Edition",
        "3rd Edition",
        "Version 3.5",
        "4th Edition",
        "5th Edition",
      ],
    },
    {
      system: "Pathfinder",
      versions: ["First Edition", "Second Edition"],
    },
    {
      system: "Vampire: The Masquerade",
      versions: [
        "Original Edition",
        "Second Edition",
        "Revised Edition",
        "20th Anniversary Edition",
        "5th Edition",
      ],
    },
    {
      system: "Starfinder",
      versions: ["First Edition"],
    },
    {
      system: "Call of Cthulhu",
      versions: [
        "1st edition",
        "2nd edition",
        "3rd edition",
        "4th edition",
        "5th edition",
        "Edition 5.5",
        "20th Anniversary Edition",
        "6th edition",
        "7th edition",
      ],
    },
    {
      system: "Shadowrun",
      versions: [
        "1st edition",
        "2nd edition",
        "3rd edition",
        "4th edition",
        "5th edition",
        "6th edition",
      ],
    },
    {
      system: "FATE",
      versions: [
        "Original Edition",
        "2nd Edition",
        "3rd Edition",
        "FATE Core",
        "FATE Accelerated Edition",
      ],
    },
  ];

  const languages = [
    "Abkhaz",
    "Afar",
    "Afrikaans",
    "Akan",
    "Albanian",
    "Amharic",
    "Arabic",
    "Aragonese",
    "Armenian",
    "Assamese",
    "Avaric",
    "Avestan",
    "Aymara",
    "Azerbaijani",
    "Bambara",
    "Bashkir",
    "Basque",
    "Belarusian",
    "Bengali",
    "Bihari",
    "Bislama",
    "Bosnian",
    "Breton",
    "Bulgarian",
    "Burmese",
    "Catalan",
    "Chamorro",
    "Chechen",
    "Chichewa",
    "Chinese",
    "Chuvash",
    "Cornish",
    "Corsican",
    "Cree",
    "Croatian",
    "Czech",
    "Danish",
    "Divehi",
    "Dutch",
    "English",
    "Esperanto",
    "Estonian",
    "Ewe",
    "Faroese",
    "Fijian",
    "Finnish",
    "French",
    "Fula",
    "Galician",
    "Georgian",
    "German",
    "Greek",
    "Guaraní",
    "Gujarati",
    "Haitia",
    "Hausa",
    "Hebrew",
    "Herero",
    "Hindi",
    "Hiri Motu",
    "Hungarian",
    "Interlingua",
    "Indonesian",
    "Interlingue",
    "Irish",
    "Igbo",
    "Inupiaq",
    "Ido",
    "Icelandic",
    "Italian",
    "Inuktitut",
    "Japanese",
    "Javanese",
    "Kalaallisut",
    "Kannada",
    "Kanuri",
    "Kashmiri",
    "Kazakh",
    "Khmer",
    "Kikuyu",
    "Kinyarwanda",
    "Kirghiz",
    "Komi",
    "Kongo",
    "Korean",
    "Kurdish",
    "Kwanyama",
    "Latin",
    "Luxembourgish",
    "Luganda",
    "Limburgish",
    "Lingala",
    "Lao",
    "Lithuanian",
    "Luba-Katanga",
    "Latvian",
    "Manx",
    "Macedonian",
    "Malagasy",
    "Malay",
    "Malayalam",
    "Maltese",
    "Māori",
    "Marathi",
    "Marshallese",
    "Mongolian",
    "Nauru",
    "Navajo",
    "North Ndebele",
    "Nepali",
    "Ndonga",
    "Norwegian",
    "Nuosu",
    "South Ndebele",
    "Occitan",
    "Ojibwe",
    "Oromo",
    "Oriya",
    "Ossetian",
    "Panjabi",
    "Pāli",
    "Persian",
    "Polish",
    "Pashto",
    "Portuguese",
    "Quechua",
    "Romansh",
    "Kirundi",
    "Romanian",
    "Russian",
    "Sanskrit",
    "Sardinian",
    "Sindhi",
    "Northern Sami",
    "Samoan",
    "Sango",
    "Serbian",
    "Scottish Gaelic",
    "Shona",
    "Sinhala",
    "Slovak",
    "Slovene",
    "Somali",
    "Southern Sotho",
    "Spanish",
    "Sundanese",
    "Swahili",
    "Swati",
    "Swedish",
    "Tamil",
    "Telugu",
    "Tajik",
    "Thai",
    "Tigrinya",
    "Tibetan",
    "Turkmen",
    "Tagalog",
    "Tswana",
    "Tonga",
    "Turkish",
    "Tsonga",
    "Tatar",
    "Twi",
    "Tahitian",
    "Uighur",
    "Ukrainian",
    "Urdu",
    "Uzbek",
    "Venda",
    "Vietnamese",
    "Volapük",
    "Walloon",
    "Welsh",
    "Wolof",
    "Western Frisian",
    "Xhosa",
    "Yiddish",
    "Yoruba",
    "Zhuang",
  ];

  const tagList = [
    "Absurd",
    "Adults Only",
    "Casual",
    "Character Driven",
    "Combat-heavy",
    "Comedy",
    "Dark",
    "Dragonlance",
    "Dungeon Crawler",
    "Eberron",
    "Epic Fantasy",
    "Forgotten Realms",
    "Fun Prioritized",
    "Gothic",
    "Grim",
    "Hardcore Play",
    "Heavy Prep",
    "High Magic",
    "High Tier",
    "Homebrew",
    "Horror",
    "Improvisation",
    "Kid-friendly",
    "Low Magic",
    "Low Tier",
    "Maraton Sessions",
    "Mediaval",
    "Mid Tier",
    "Multiple GM",
    "Murderhobo",
    "New GM",
    "No Prep",
    "Old School",
    "Open-world",
    "Prewritten",
    "Railroad",
    "Realistic",
    "RP-heavy",
    "Rule of Fun",
    "Rules-heavy",
    "Sandbox",
    "Serious",
    "Solo",
    "Strategic",
    "Urban",
    "Vampire",
    "Werewolf",
    "Worldbuilding",
  ];
  const marks = [
    {
      value: 0,
      label: "Beginner",
    },
    {
      value: 25,
      label: "Novice",
    },
    {
      value: 50,
      label: "Moderate",
    },
    {
      value: 75,
      label: "Seasoned",
    },
    {
      value: 100,
      label: "Pro",
    },
  ];

  //   function valuetext(value) {
  //     return `${marks.find(i => i.value=== value).label}`;
  //   }

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value) + 1;
  }

  const handleChangeTempTime = (newValue, input) => {
    setTempTime(newValue);
    // const hour = newValue.$d.toTimeString().substring(0,5);
    // const minute = newValue.$d.getMinutes();
    // const hourMinute = minute < 10 ? hour + ':0' + minute : hour + ':' + minute;
    // console.log(hour + ':' + minute);
    // console.log(input);
    // console.log(hour);

    // setValues({ ...values, sessionHour: hourMinute});
    if (newValue)
      setValues({
        ...values,
        sessionHour: newValue.$d.toTimeString().substring(0, 5),
      });
  };
  const handleChangeGameSystem = (event) => {
    setValues({ ...values, gameSystem: event.target.value });
  };
  const handleChangeGameVersion = (event) => {
    setValues({ ...values, gameVersion: event.target.value });
  };
  const handleChangeAdventureName = (event) => {
    setValues({ ...values, adventureName: event.target.value });
  };
  const handleChangeAdventureLength = (event) => {
    setValues({ ...values, adventureLength: event.target.value });
  };
  const handleChangeTotalPlayerCount = (event) => {
    setValues({ ...values, totalPlayerCount: event.target.value });
  };
  const handleChangeCurrentPlayerCount = (event) => {
    setValues({ ...values, currentPlayerCount: event.target.value });
  };
  const handleChangePlayerExpLevel = (event) => {
    setValues({ ...values, playerExpLevel: event.target.value });
  };
  const handleChangeMedium = (event) => {
    // console.log(values.medium);
    // setValues({ ...values, medium: event.target.value });
    if (event.target.value === "Online") {
      setValues({
        ...values,
        medium: event.target.value,
        location: null,
        hosting: null,
      });
      // setValues({ ...values, hosting: "" });
    }
    if (event.target.value === "IRL") {
      setValues({
        ...values,
        platform: null,
        communicationMethod: null,
        medium: event.target.value,
      });
    }
    // setValues({ ...values, medium: event.target.value });
    if (event.target.value === "Hybrid") {
      setValues({ ...values, medium: event.target.value });
    }
    // console.log(values.medium);
  };
  const handleChangePlatform = (event) => {
    setValues({ ...values, platform: event.target.value });
  };
  const handleChangeCommunicationMethod = (event) => {
    setValues({ ...values, communicationMethod: event.target.value });
  };
  const handleChangeLocation = (event) => {
    setValues({ ...values, location: event.target.value });
  };
  const handleChangeSessionFrequency = (event) => {
    setValues({ ...values, sessionFrequency: event.target.value });
  };
  const handleChangeSessionLength = (event) => {
    setValues({ ...values, sessionLength: event.target.value });
  };
  const handleChangeGMTimeZone = (event) => {
    setValues({ ...values, gmTimeZone: event.target.value });
  };
  const handleChangeSessionDay = (event) => {
    setValues({ ...values, sessionDay: event.target.value });
  };
  const handleChangeCampaingPrimer = (event) => {
    setValues({ ...values, campaignPrimer: event.target.value });
  };
  const handleChangeGameStyle = (event) => {
    setValues({ ...values, gameStyle: event.target.value });
  };
  const handleChangeGMStyle = (event) => {
    setValues({ ...values, gmStyle: event.target.value });
  };
  const handleChangeAdventureStyle = (event) => {
    setValues({ ...values, adventureStyle: event.target.value });
  };
  const handleChangeGMExperienceLevel = (event) => {
    setValues({ ...values, gmExperinceLevel: event.target.value });
  };
  const handleChangeStoryGenre = (event) => {
    setValues({ ...values, storyGenre: event.target.value });
  };
  const handleChangeStoryStyle = (event) => {
    setValues({ ...values, storyStyle: event.target.value });
  };

  //   const handleChangeTags = (event) => {
  //     setValues({ ...values, tags: event.target.value });
  //   };

  //   const handleChangeSessionHour = (event) => {
  //     setValues({ ...values, sessionHour: event.target.value });
  //   };
  const handleChangeHosting = (event) => {
    setValues({ ...values, hosting: event.target.value });
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

  //   const handleChangeLanguage = (event) => {
  //     setValues({ ...values, language: event.target.value });
  //   };

  // console.log(values);

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

  // const useStyles = makeStyles(() => ({
  //   root: {
  //     "& .MuiStepIcon-active": { color: "red" },
  //     "& .MuiStepIcon-completed": { color: "green" },
  //     "& .Mui-disabled .MuiStepIcon-root": { color: "cyan" },
  //   },
  // }));

  // const c = useStyles();

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
                onChange={handleChangeGameSystem}
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
                onChange={handleChangeGameVersion}
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
                onChange={handleChangeAdventureName}
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
                onChange={handleChangeAdventureLength}
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
                onChange={handleChangeStoryStyle}
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
                onChange={handleChangeTotalPlayerCount}
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
                onChange={handleChangeCurrentPlayerCount}
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
                onChange={handleChangePlayerExpLevel}
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
                onChange={handleChangePlatform}
              >
                <MenuItem value="Roll20">Roll20</MenuItem>
                <MenuItem value="Foundry VTT">Foundry VTT</MenuItem>
                <MenuItem value="Fantasy Grounds">Fantasy Grounds</MenuItem>
                <MenuItem value="Tabletop Simulator">
                  Tabletop Simulator
                </MenuItem>
                <MenuItem value="Astral">Astral</MenuItem>
                <MenuItem value="TaleSpire">TaleSpire</MenuItem>
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
                onChange={handleChangeLocation}
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
                onChange={handleChangeCommunicationMethod}
              >
                <MenuItem value="Discord">Discord</MenuItem>
                <MenuItem value="Roll20">Roll20</MenuItem>
                <MenuItem value="Skype">Skype</MenuItem>
                <MenuItem value="Zoom">Zoom</MenuItem>
                <MenuItem value="TeamSpeak">TeamSpeak</MenuItem>
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
                onChange={handleChangeHosting}
              >
                <MenuItem value="GM Hosted">GM Hosted</MenuItem>
                <MenuItem value="PC Hosted">PC Hosted</MenuItem>
                <MenuItem value="Rotational">Rotational</MenuItem>
                <MenuItem value="Game Shops">Game Shops</MenuItem>
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
                onChange={handleChangeSessionFrequency}
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
                onChange={handleChangeSessionLength}
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
                onChange={handleChangeGMTimeZone}
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
                onChange={handleChangeSessionDay}
              >
                <MenuItem value="Monday">Monday</MenuItem>
                <MenuItem value="Tuesday">Tuesday</MenuItem>
                <MenuItem value="Wednesday">Wednesday</MenuItem>
                <MenuItem value="Thursday">Thursday</MenuItem>
                <MenuItem value="Friday">Friday</MenuItem>
                <MenuItem value="Saturday">Saturday</MenuItem>
                <MenuItem value="Sunday">Sunday</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ minWidth: 250, marginX: 2, marginY: 2 }}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                {/* <DesktopTimePicker
              label="Session Time"
              value={values.sessionHour}
              defaultValue=""
              sx={{ color: "blue" }}
              //   onChange={handleChangeSessionHour}
              onChange={(newValue) => {
                setValues({ ...values, sessionHour: newValue.getHours() });
              }}
              renderInput={(params) => <TextField {...params} />}
            /> */}

                {/* <InputLabel>Session Hour</InputLabel> */}
                <TimePicker
                  label="Session Hour"
                  inputFormat="HH:mm"
                  value={temptime}
                  type="time"
                  // InputProps={{step: 300}}
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
                onChange={handleChangeGameStyle}
                label="Player Game Style"
              >
                <MenuItem value="RP-heavy">RP-heavy</MenuItem>
                <MenuItem value="Old school">Old school</MenuItem>
                <MenuItem value="Tactical">Tactical</MenuItem>
                <MenuItem value="Murderhobo">Murderhobo</MenuItem>
                <MenuItem value="Min-max">Min-max</MenuItem>
                <MenuItem value="Casual">Casual</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 250, marginX: 2, marginY: 2 }}>
              <InputLabel>GM Style</InputLabel>
              <Select
                id="gm-style-select"
                label="GM Style"
                // variant="filled"
                value={values.gmStyle}
                onChange={handleChangeGMStyle}
              >
                <MenuItem value="Heavy Prep">Heavy Prep</MenuItem>
                <MenuItem value="Rule-oriented">Rule-oriented</MenuItem>
                <MenuItem value="Rules Light">Rules Light</MenuItem>
                <MenuItem value="Improvised">Improvised</MenuItem>
                <MenuItem value="Heavy worldbuilding">
                  Heavy worldbuilding
                </MenuItem>
                <MenuItem value="Low Prep">Low Prep</MenuItem>
                <MenuItem value="Dialog Heavy">Dialog Heavy</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 250, marginX: 2, marginY: 2 }}>
              <InputLabel>Adventure Style</InputLabel>
              <Select
                id="adventure-style-select"
                // variant="filled"
                label="Adventure Style"
                value={values.adventureStyle}
                onChange={handleChangeAdventureStyle}
              >
                <MenuItem value="High Magic">High Magic</MenuItem>
                <MenuItem value="Low Magic">Low Magic</MenuItem>
                <MenuItem value="Character Driven">Character Driven</MenuItem>
                <MenuItem value="Sandbox">Sandbox</MenuItem>
                <MenuItem value="Open-World">Open-World</MenuItem>
                <MenuItem value="Railroady">Railroady</MenuItem>
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
                onChange={handleChangeGMExperienceLevel}
              >
                <MenuItem value="Beginner">Beginner</MenuItem>
                <MenuItem value="Novice">Novice</MenuItem>
                <MenuItem value="Modarate">Modarate</MenuItem>
                <MenuItem value="Experienced">Experienced</MenuItem>
                <MenuItem value="Veteran">Veteran</MenuItem>
                <MenuItem value="Proffesional">Proffesional</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 250, marginX: 2, marginY: 2 }}>
              <InputLabel>Story Genre</InputLabel>
              <Select
                id="story-genre-select"
                // variant="filled"
                label="Story Genre"
                value={values.storyGenre}
                onChange={handleChangeStoryGenre}
              >
                <MenuItem value="Alternate History">Alternate History</MenuItem>
                <MenuItem value="Apocalyptic">Apocalyptic</MenuItem>
                <MenuItem value="Classic Fantasy">Classic Fantasy</MenuItem>
                <MenuItem value="Comedy">Comedy</MenuItem>
                <MenuItem value="Cyber Punk">Cyber Punk</MenuItem>
                <MenuItem value="High Fantasy">High Fantasy</MenuItem>
                <MenuItem value="Horror">Horror</MenuItem>
                <MenuItem value="Intrigue">Intrigue</MenuItem>
                <MenuItem value="Mystery">Mystery</MenuItem>
                <MenuItem value="Noir">Noir</MenuItem>
                <MenuItem value="Political">Political</MenuItem>
                <MenuItem value="Post-Apocalyptic">Post-Apocalyptic</MenuItem>
                <MenuItem value="Pulp">Pulp</MenuItem>
                <MenuItem value="Sci-fi">Sci-fi</MenuItem>
                <MenuItem value="Setting Agnostic">Setting Agnostic</MenuItem>
                <MenuItem value="Space Opera">Space Opera</MenuItem>
                <MenuItem value="Steampunk">Steampunk</MenuItem>
                <MenuItem value="Superhero">Superhero</MenuItem>
                <MenuItem value="Supernatural">Supernatural</MenuItem>
                <MenuItem value="Surreal">Surreal</MenuItem>
                <MenuItem value="Urban">Urban</MenuItem>
                <MenuItem value="War">War</MenuItem>
                <MenuItem value="Western">Western</MenuItem>
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
                onChange={handleChangeCampaingPrimer}
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
