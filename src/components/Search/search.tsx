import { SearchOff, SearchRounded } from "@mui/icons-material";
import React from "react";

interface Props {}

function Search({}: Props) {
  return (
    <div>
      <form
        style={{
          borderBottom: "1px solid white",
          width: "90%",
          margin: "0 auto",
          height: "44px",
          backgroundColor: "#1C1C1C",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px 5px 0px 0px",
        }}
      >
        <input
          style={{
            backgroundColor: "transparent",
            border: "none",
            width: "85%",
            height: "100%",
          }}
          type="text"
          placeholder="Keywords"
        />
        <SearchRounded sx={{ color: "white" }} />
      </form>
    </div>
  );
}

export default Search;
