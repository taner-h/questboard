import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React from "react";
import FormInfo from "./FormInfo";

export default function Basics({
  handleChange,
  languages,
  setValues,
  values,
  options,
}) {
  return (
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
          sx={{
            minWidth: 250,
            marginX: 2,
            marginY: 2,
          }}
        >
          <InputLabel>Game System</InputLabel>
          <Select
            id="game-system-select"
            value={values.gameSystem} // variant="filled"
            label="Game System"
            sx={{
              color: "#2e3440",
            }}
            onChange={handleChange("gameSystem")}
          >
            {options.map((i) => {
              return <MenuItem value={i.system}>{i.system}</MenuItem>;
            })}
          </Select>
        </FormControl>

        <FormControl
          required
          sx={{
            minWidth: 250,
            marginX: 2,
            marginY: 2,
          }}
        >
          <InputLabel>Game Version</InputLabel>
          <Select
            disabled={values.gameSystem === ""}
            id="game-version-select"
            value={values.gameVersion} // variant="filled"
            label="Game Version"
            sx={{
              minWidth: 250,
            }}
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
          sx={{
            minWidth: 250,
            marginX: 2,
            marginY: 2,
          }}
        >
          <TextField
            id="filled-basic"
            label={
              values.storyStyle === "Prewritten"
                ? "Prewritten Adventure Name *"
                : "Adventure Name *"
            }
            value={values.adventureName} //   variant="filled"
            onChange={handleChange("adventureName")}
          />
        </FormControl>
      </div>
      <div>
        <FormControl
          required
          sx={{
            minWidth: 250,
            marginX: 2,
            marginY: 2,
          }}
        >
          <InputLabel>Adventure Length</InputLabel>
          <Select
            required
            id="adventure-length-select"
            value={values.adventureLength} // variant="filled"
            label="Adventure Length"
            sx={{
              minWidth: 250,
            }}
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

        <FormControl
          required
          sx={{
            minWidth: 250,
            marginX: 2,
            marginY: 2,
          }}
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
            sx={{
              justifyContent: "center",
            }}
            onChange={handleChange("storyStyle")}
            name="story-style-radio"
          >
            <FormControlLabel
              value="Homebrew"
              sx={{
                mx: 2,
              }}
              control={<Radio color="default" />}
              label="Homebrew"
            />
            <FormControlLabel
              sx={{
                mx: 2,
              }}
              value="Prewritten"
              control={<Radio color="default" />}
              label="Prewritten"
            />
          </RadioGroup>
        </FormControl>
      </div>
    </Container>
  );
}
