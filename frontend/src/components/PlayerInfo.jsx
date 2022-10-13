import React from "react";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Slider from "@mui/material/Slider";
import TextField from "@mui/material/TextField";
import FormInfo from "./FormInfo";

export default function PlayerInfo({
  handleChange,
  valueLabelFormat,
  values,
  marks,
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
        title="Player Info"
        subtitle="Now, let's continue with some key information about your players. "
      ></FormInfo>

      <div>
        <FormControl
          required
          sx={{
            maxWidth: 250,
            marginX: 2,
            marginY: 1,
          }}
        >
          <TextField
            id="total-player-count"
            label="Total Player Count *"
            type="number"
            value={values.totalPlayerCount}
            onChange={handleChange("totalPlayerCount")}
          />
        </FormControl>
        <FormControl
          required
          sx={{
            maxWidth: 250,
            marginX: 2,
            marginY: 1,
          }}
        >
          <TextField
            id="current-player-count"
            label="Current Player Count *"
            type="number"
            value={values.currentPlayerCount}
            onChange={handleChange("currentPlayerCount")}
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
          <Slider
            aria-label="Restricted values"
            defaultValue={null}
            value={values.playerExpLevel}
            onChange={handleChange("playerExpLevel")}
            valueLabelFormat={valueLabelFormat}
            step={null}
            sx={{
              color: "#4c566a",
            }}
            valueLabelDisplay="auto"
            marks={marks}
          />
        </FormControl>
      </div>
    </Container>
  );
}
