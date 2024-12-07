import { Stack, useMediaQuery } from "@mui/material";
import React from "react";
import Sidebar from "../Sidebar/sidebar";
import GridMovies from "../GridMovies/gridMovies";

interface Props {}

const MainContent = (props: Props) => {
  const matches = useMediaQuery("(min-width:800px)");
  return (
    <Stack
      width={"100%"}
      sx={{ backgroundColor: "#454545" }}
      flexDirection={matches ? "row" : "column"}
    >
      <Stack width={matches ? "18%" : "100%"}>
        <Sidebar />
      </Stack>
      <Stack width={matches ? "82%" : "100%"}>
        <GridMovies />
      </Stack>
    </Stack>
  );
};

export default MainContent;
