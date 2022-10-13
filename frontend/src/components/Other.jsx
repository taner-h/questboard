import Autocomplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormInfo from "./FormInfo";
import React from "react";

export default function Other({ handleChange, tagList, values }) {
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
            sx={{
              color: "#4c566a",
            }}
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
            filterSelectedOptions // value={values.tags}
            // onChange={handleChangeTags}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags" //   placeholder="Choose one or more tags"
              />
            )}
          />
        </FormControl>
      </div>
    </Container>
  );
}
