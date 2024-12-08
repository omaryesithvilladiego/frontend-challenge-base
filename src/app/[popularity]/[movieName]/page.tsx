"use client";
import { genres } from "@/components/GenresOptions/genresOptions";
import BasicModal from "@/components/ModalLogin/modalLogin";
import GridMoviesComponent from "@/components/MoviesGrid/moviesGrid";
import ProgressMovie from "@/components/ProgressStatus/progressMovie";
import Tittle from "@/components/Tittle/tittle";
import { UserContext } from "@/context/user";
import { IMovie } from "@/interfaces/interfaces";
import { ArrowBack, PlayArrow, PlayArrowOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";
import Cookies from "js-cookie";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const MovieDetail = () => {
  const { getMovieByName, movies, getMovies } = useContext(UserContext);
  const [movie, setMovie] = useState<IMovie>();
  const [genresMovie, setGenresMovie] = useState<any>([]);
  const [popularityMax, setPopularityMax] = useState<number>(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClickLike = () => {
    const token = Cookies.get("token");
    console.log(token);

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
      {movie?.backdrop_path && (
        <Stack
          flexDirection={"row"}
          style={{
            background: `linear-gradient(0.87deg, #000 19.08%, rgba(102, 102, 102, 0)), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "white",
            padding: "60px",
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
            width={"30%"}
          >
            {movie?.poster_path && (
              <Image
                alt="image"
                src={
                  `https://image.tmdb.org/t/p/w500${movie?.poster_path}` as string
                }
                width={305}
                height={395}
              />
            )}
            <button
              style={{
                backgroundColor: "rgba(240, 185, 11, 1)",
                height: "46px",
                width: "305px",
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

          <Stack gap={"2rem"} width={"70%"}>
            <h1 style={{ fontSize: "35px", fontWeight: "bold" }}>
              {" "}
              {movie.title}{" "}
            </h1>
            <div
              style={{
                width: "30%",
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <p>{movie.release_date} </p>
              <p> 2h 10min </p>
            </div>
            <div style={{ width: "80%" }}>
              {" "}
              <h2 style={{ fontSize: "40px", fontWeight: "bold" }}>
                {" "}
                Overview:{" "}
              </h2>
              <p> {movie.overview} </p>
            </div>

            <div
              style={{
                display: "flex",
                width: "80%",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ProgressMovie
                popularity={movie.popularity}
                popularityMax={Number(popularity)}
                size={150}
              />{" "}
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
                width: "80%",
                gap: "37px",
              }}
            >
              {genresMovie.map((genre: any) => {
                return (
                  <div
                    key={genre.id}
                    style={{
                      border: "1px solid rgba(241, 203, 81, 1)",
                      borderRadius: "5px",
                    }}
                  >
                    {" "}
                    <div
                      style={{
                        width: "80",
                        height: "23",
                        padding: "1rem",
                        color: "rgba(241, 203, 81, 1)",
                      }}
                    >
                      {genre.name}
                    </div>{" "}
                  </div>
                );
              })}
            </div>
          </Stack>
        </Stack>
      )}{" "}
      <GridMoviesComponent movies={movies} tittle="Recomendations" />
    </>
  );
};

export default MovieDetail;