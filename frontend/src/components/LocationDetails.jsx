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

export default function LocationDetails({
  handleChangeMedium,
  handleChange,
  platforms,
  communicationMethods,
  hostings,
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
        title="Location Details"
        subtitle="Where do you plan to play your games? Please select your prefered method below."
      ></FormInfo>

      <div>
        <FormControl
          sx={{
            minWidth: 250,
            marginX: 2,
            marginY: 2,
          }}
          required
        >
          <FormLabel
            sx={{
              color: "#2e3440",
            }}
          >
            Medium
          </FormLabel>
          <RadioGroup
            row
            sx={{
              justifyContent: "center",
            }}
            aria-label="medium"
            name="row-radio-buttons-group"
            value={values.medium}
            onChange={handleChangeMedium}
          >
            <FormControlLabel
              value="Online"
              sx={{
                mx: 1,
              }}
              control={<Radio color="default" />}
              label="Online"
            />
            <FormControlLabel
              sx={{
                mx: 1,
              }}
              value="Hybrid"
              control={<Radio color="default" />}
              label="Hybrid"
            />

            <FormControlLabel
              sx={{
                mx: 1,
              }}
              value="IRL"
              control={<Radio color="default" />}
              label="IRL"
            />
          </RadioGroup>
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
          <InputLabel>Platform</InputLabel>
          <Select
            disabled={
              values.medium === "Hybrid" || values.medium === "Online"
                ? false
                : true
            }
            id="platform-select"
            value={
              values.medium === "Hybrid" || values.medium === "Online"
                ? values.platform
                : ""
            }
            label="Platform"
            sx={{
              minWidth: 250,
            }}
            onChange={handleChange("platform")}
          >
            {platforms.map((platform) => (
              <MenuItem value={platform}>{platform}</MenuItem>
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
            onChange={handleChange("location")}
          />
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
            label="Communication Method"
            sx={{
              minWidth: 250,
            }}
            onChange={handleChange("communicationMethod")}
          >
            {communicationMethods.map((communicationMethod) => (
              <MenuItem value={communicationMethod}>
                {communicationMethod}
              </MenuItem>
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
            label="Hosting"
            sx={{
              minWidth: 250,
            }}
            onChange={handleChange("hosting")}
          >
            {hostings.map((hosting) => (
              <MenuItem value={hosting}>{hosting}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </Container>
  );
}
