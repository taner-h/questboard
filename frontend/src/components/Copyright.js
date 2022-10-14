import React from "react";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

export default function Copyright(props) {
  return (
    <Typography variant="body2" color="#d8dee9" align="center" {...props}>
      {"Copyright © "}
      <Link style={{ textDecoration: "none", color: "#d8dee9" }} to="/">
        questboard
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
