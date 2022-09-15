import React from "react";
import { Typography, Box } from "@mui/material";

export default function () {
  return (
    <Box
      sx={{ flexGrow: 1, mt: 25, paddingX: { xs: 4, sm: 6, md: 8, lg: 12 } }}
    >
      <Typography
        variant="h1"
        sx={{
          flexGrow: 1,
          color: "#4c566a",
          fontWeight: "700",
        }}
      >
        404
      </Typography>
      <Typography
        variant="h3"
        sx={{
          flexGrow: 1,
          color: "#4c566a",
          fontWeight: "500",
        }}
      >
        Not Found
      </Typography>
      <Typography
        variant="h6"
        sx={{
          marginTop: 4,
          flexGrow: 1,
          color: "#4c566a",
          fontWeight: "400",
        }}
      >
        Woops! Looks like this page doesn't exist.
      </Typography>
    </Box>
  );
}
