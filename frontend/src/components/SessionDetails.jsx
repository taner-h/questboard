import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import FormInfo from "./FormInfo";
import React from "react";

export default function SessionDetails({
  handleChange,
  DateAdapter,
  days,
  values,
  temptime,
  handleChangeTempTime,
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
        title="Sessions Details"
        subtitle="It's time for the session details."
      ></FormInfo>

      <div>
        <FormControl
          sx={{
            maxWidth: 250,
            marginX: 2,
            marginY: 2,
          }}
        >
          <TextField
            label="Session Frequency"
            id="session-frequency-input"
            type="number"
            value={values.sessionFrequency}
            onChange={handleChange("sessionFrequency")}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">1 session per</InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">days</InputAdornment>
              ),
            }}
          />
        </FormControl>
        <FormControl
          sx={{
            maxWidth: 250,
            marginX: 2,
            marginY: 2,
          }}
        >
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

        <FormControl
          sx={{
            minWidth: 250,
            marginX: 2,
            marginY: 2,
          }}
        >
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
        <FormControl
          sx={{
            minWidth: 250,
            marginX: 2,
            marginY: 2,
          }}
        >
          <InputLabel>Session Day</InputLabel>
          <Select
            id="session-day-select"
            value={values.sessionDay} // variant="filled"
            label="Session Day"
            onChange={handleChange("sessionDay")}
          >
            {days.map((day) => (
              <MenuItem value={day}>{day}</MenuItem>
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
  );
}
