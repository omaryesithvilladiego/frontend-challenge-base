import { Typography } from "@mui/material";
import React from "react";

interface Props {
  content: string;
}

function Tittle({ content }: Props) {
  return (
    <Typography
      width={"224px"}
      fontSize={"24px"}
      color="white"
      fontFamily={"IBM Plex Sans"}
      margin={"23px 0px 15px 24px"}
      component={"div"}
    >
      {" "}
      {content}{" "}
    </Typography>
  );
}

export default Tittle;
