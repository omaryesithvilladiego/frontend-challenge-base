import React from "react";
import Tittle from "../Tittle/tittle";
import GenresOptions from "../GenresOptions/genresOptions";
import Search from "../Search/search";
import { useMediaQuery } from "@mui/material";
import { match } from "assert";

interface Props {}

export default function Sidebar({}: Props) {
  const matches = useMediaQuery("(min-width:800px)");

  return (
    <div
      style={{
        width: "100%",
        backgroundColor: "#262626",
        height: matches ? "2000vh" : "20vh",
        overflow: "hidden",
        display: !matches ? "flex" : "block",
      }}
    >
      <div style={{ width: !matches ? "50%" : "100%" }}>
        <Tittle content="Search" />
        <Search />
      </div>
      <div style={{ width: !matches ? "50%" : "100%" }}>
        {" "}
        <Tittle content="Genres" />
        <GenresOptions />
      </div>
    </div>
  );
}
