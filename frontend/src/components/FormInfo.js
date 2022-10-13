import React from "react";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

function FormInfo(props) {
  return (
    <div>
      <Box sx={{ my: 4 }}>
        <Grid container alignItems="center">
          <Grid item xs>
            <Typography
              gutterBottom
              variant={props.type === "title" ? "h3" : "h4"}
              component="div"
              sx={{
                flexGrow: 1,
                color: "#4c566a",
                fontWeight: props.type === "title" ? "500" : "400",
              }}
            >
              {props.title}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs>
          <Typography
            color="text.secondary"
            variant="subtitle1"
            sx={{ flexGrow: 1, mx: 3, color: "#434c5e" }}
          >
            {props.subtitle}
          </Typography>
        </Grid>
      </Box>
    </div>
  );
}

export default FormInfo;
