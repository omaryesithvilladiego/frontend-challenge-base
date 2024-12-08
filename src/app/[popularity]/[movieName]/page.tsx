"use client";
import { genres } from "@/components/GenresOptions/genresOptions";
import BasicModal from "@/components/ModalLogin/modalLogin";
import GridMoviesComponent from "@/components/MoviesGrid/moviesGrid";
import ProgressMovie from "@/components/ProgressStatus/progressMovie";
import { UserContext } from "@/context/user";
import { IMovie } from "@/interfaces/interfaces";
import { ArrowBack, PlayArrowOutlined } from "@mui/icons-material";
import { Stack, useMediaQuery } from "@mui/material";
import Cookies from "js-cookie";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const MovieDetail = () => {
  const { getMovieByName, movies, getMovies } = useContext(UserContext);
  const [movie, setMovie] = useState<IMovie>();
  const matches = useMediaQuery("(min-width:800px)"); // Adjusted the media query format
  const [genresMovie, setGenresMovie] = useState<any>([]);
  const [popularityMax, setPopularityMax] = useState<number>(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickLike = () => {
    const token = Cookies.get("token");

    if (!token) {
      handleOpen();
    }
  };

  const { movieName, popularity } = useParams();
  const router = useRouter();

  useEffect(() => {
    const popularity = movies.map((movie) => movie.popularity);
    const maxPopularity = Math.max(...popularity);
    const maxPopularityPopular = Math.max(...popularity);
    setPopularityMax(maxPopularity);
  }, [movies]);

  useEffect(() => {
    const getMovieByNameFetch = async () => {
      const response = await getMovieByName(movieName as string);
      await getMovies({ page: 300 });
      setMovie(response.results[0]);
    };
    getMovieByNameFetch();
    if (movie) {
      const generos = movie.genre_ids
        .map((genr) => {
          return genres.filter((item) => item.id === genr);
        })
        .flat();
      setGenresMovie(generos);
    }
  }, [movie]);

  return (
    <>
      <BasicModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />

      <Stack
        flexDirection={matches ? "row" : "column"}
        style={{
          background: `linear-gradient(0.87deg, #000 19.08%, rgba(102, 102, 102, 0)), url(https://image.tmdb.org/t/p/w1280${movie?.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          padding: matches ? "60px" : "20px",
          boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.45)",
        }}
      >
        <div onClick={() => router.back()}>
          <ArrowBack style={{ cursor: "pointer" }} />
        </div>

        <Stack
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          width={matches ? "30%" : "100%"}
          marginBottom={matches ? "0" : "20px"}
        >
          {movie?.poster_path && (
            <Image
              alt="image"
              src={
                `https://image.tmdb.org/t/p/w500${movie?.poster_path}` as string
              }
              width={matches ? 305 : 200}
              height={matches ? 395 : 270}
            />
          )}
          <button
            style={{
              backgroundColor: "rgba(240, 185, 11, 1)",
              height: "46px",
              width: matches ? "305px" : "100%",
              border: "none",
              borderRadius: "4px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Official Trailer <PlayArrowOutlined />
          </button>
        </Stack>

        <Stack
          gap={"2rem"}
          width={matches ? "70%" : "100%"}
          marginLeft={matches ? "0" : "0"}
        >
          <h1
            style={{ fontSize: matches ? "35px" : "28px", fontWeight: "bold" }}
          >
            {movie?.title}
          </h1>
          <div
            style={{
              width: matches ? "30%" : "100%",
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <p>{movie?.release_date}</p>
            <p>2h 10min</p>
          </div>
          <div style={{ width: "100%" }}>
            <h2 style={{ fontSize: "40px", fontWeight: "bold" }}>Overview:</h2>
            <p>{movie?.overview}</p>
          </div>

          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <ProgressMovie
              popularity={movie?.popularity as number}
              popularityMax={Number(popularity)}
              size={matches ? 150 : 120}
            />
            <Image
              style={{ cursor: "pointer" }}
              onClick={handleClickLike}
              alt=""
              src={"/Heart.svg"}
              width={25}
              height={25}
            />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              gap: "37px",
              flexWrap: "wrap",
            }}
          >
            {genresMovie.map((genre: any) => {
              return (
                <div
                  key={genre.id}
                  style={{
                    border: "1px solid rgba(241, 203, 81, 1)",
                    borderRadius: "5px",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      width: "80",
                      height: "23",
                      padding: "1rem",
                      color: "rgba(241, 203, 81, 1)",
                    }}
                  >
                    {genre.name}
                  </div>
                </div>
              );
            })}
          </div>
        </Stack>
      </Stack>

      <GridMoviesComponent movies={movies} tittle="Recommendations" />
    </>
  );
};

export default MovieDetail;
