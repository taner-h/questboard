import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormInfo from "./FormInfo";
import React from "react";

export default function GameStyle({
  handleChange,
  gameStyles,
  gmStyles,
  adventureStyles,
  gmExperinceLevels,
  genres,
  values,
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
      }}
    >
      <FormInfo
        title="Game Style"
        subtitle="Don't forget about your game style. Not everyone enjoys the same type of gameplay."
      ></FormInfo>

      <div>
        <FormControl
          sx={{
            minWidth: 250,
            marginX: 2,
            marginY: 2,
          }}
        >
          <InputLabel>Player Game Style</InputLabel>
          <Select
            id="player-game-style-select"
            value={values.gameStyle}
            onChange={handleChange("gameStyle")}
            label="Player Game Style"
          >
            {gameStyles.map((gameStyle) => (
              <MenuItem value={gameStyle}>{gameStyle}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            minWidth: 250,
            marginX: 2,
            marginY: 2,
          }}
        >
          <InputLabel>GM Style</InputLabel>
          <Select
            id="gm-style-select"
            label="GM Style"
            value={values.gmStyle}
            onChange={handleChange("gmStyle")}
          >
            {gmStyles.map((gmStyle) => (
              <MenuItem value={gmStyle}>{gmStyle}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            minWidth: 250,
            marginX: 2,
            marginY: 2,
          }}
        >
          <InputLabel>Adventure Style</InputLabel>
          <Select
            id="adventure-style-select"
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
        <FormControl
          sx={{
            minWidth: 250,
            marginX: 2,
            marginY: 2,
          }}
        >
          <InputLabel>GM Experience Level</InputLabel>
          <Select
            id="gm-experience-level-select"
            label="GM Experience Level"
            value={values.gmExperinceLevel}
            onChange={handleChange("gmExperinceLevel")}
          >
            {gmExperinceLevels.map((gmExperinceLevel) => (
              <MenuItem value={gmExperinceLevel}>{gmExperinceLevel}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          sx={{
            minWidth: 250,
            marginX: 2,
            marginY: 2,
          }}
        >
          <InputLabel>Story Genre</InputLabel>
          <Select
            id="story-genre-select"
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
  );
}
