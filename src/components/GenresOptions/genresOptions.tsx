import { UserContext } from "@/context/user";
import { getMoviesFetch } from "@/fetch/movieFetch";
import { FormControl, InputLabel, Select, useMediaQuery } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";

interface Props {}

export const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

const genreNames = genres.map((genre) => genre.name);

const GenresOptions = (props: Props) => {
  const [genreSelected, setSelectedGenre] = React.useState<number[]>([]);
  const {
    getMovies,
    getPopularMovies,
    getFavorites,
    getTopRated,
    getUpcoming,
  } = useContext(UserContext);
  const matches = useMediaQuery("(min-width:800px)");

  useEffect(() => {
    const getMoviesFetchMovie = () => {
      getMovies({ genres: genreSelected, page: 1 });
      getFavorites({ genres: genreSelected });
      getTopRated({ genres: genreSelected });
      getUpcoming({ genres: genreSelected });
      getPopularMovies({ genres: genreSelected });
    };
    getMoviesFetchMovie();
  }, [genreSelected]);

  const handleGenreClick = (genreName: number) => {
    setSelectedGenre((prevSelectedGenre) => {
      if (prevSelectedGenre.includes(genreName)) {
        return prevSelectedGenre.filter((id) => id !== genreName);
      } else {
        return [...prevSelectedGenre, genreName];
      }
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <ul
        className="contenedor"
        style={{
          height: matches ? "365px" : "120px",
          width: "75%",
          margin: "0 auto",
          overflowY: "scroll",
          display: "flex",
          gap: "10px",
          flexDirection: "column",
          backgroundColor: "#1C1C1C",
          color: "white",
          padding: "20px 20px 20px 20px",
          position: "relative",
        }}
      >
        {genres.map((genre, index) => {
          return (
            <li
              style={{
                backgroundColor: genreSelected.includes(genre.id)
                  ? "#454545"
                  : "transparent",
                cursor: "pointer",
                paddingTop: "5px",
                paddingBottom: "5px",
                paddingLeft: "5px",
              }}
              onClick={() => handleGenreClick(genre.id)}
              key={String(index)}
            >
              {" "}
              {genre.name}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GenresOptions;
