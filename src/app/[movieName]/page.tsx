"use client";
import { genres } from "@/components/GenresOptions/genresOptions";
import ProgressMovie from "@/components/ProgressStatus/progressMovie";
import Tittle from "@/components/Tittle/tittle";
import { UserContext } from "@/context/user";
import { IMovie } from "@/interfaces/interfaces";
import { ArrowBack, PlayArrow, PlayArrowOutlined } from "@mui/icons-material";
import { Stack } from "@mui/material";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const MovieDetail = () => {
  const { getMovieByName, movies } = useContext(UserContext);
  const [movie, setMovie] = useState<IMovie>();
  const [genresMovie, setGenresMovie] = useState<any>([]);
  const [popularityMax, setPopularityMax] = useState<number>(0);

  const params = useParams();
  const { movieName } = params;
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
                popularityMax={500}
                size={150}
              />{" "}
              <Image
                style={{ cursor: "pointer" }}
                // onClick={handleClickLike}
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
      <Tittle content="Recomendations" />{" "}
      <Stack
        sx={{
          overflowX: "auto",
          overflowY: "hidden",
          flexDirection: "row",
          scrollBehavior: "smooth",

          "&::-webkit-scrollbar": {
            height: "0px",
            width: "0px",
          },
          scrollbarWidth: "none", // Para Firefox
        }}
      >
        {movies.map((movie) => {
          return (
            <div
              style={{
                marginLeft: "24px",
                backgroundColor: "#262626",
                borderRadius: "8px",
                height: "370px",
              }}
              key={movie.id}
            >
              <div
                style={{
                  height: "230px",
                  width: "200px",
                  overflow: "hidden",
                  borderRadius: "8px 8px 0 0",
                }}
              >
                <Image
                  alt={movie.title}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  width={200}
                  height={300}
                  onClick={() => router.push(JSON.stringify(movie.title))}
                  style={{
                    borderRadius: "8px 8px 0 0",
                    cursor: "pointer",
                  }}
                />
              </div>
              <Stack height={"6rem"}>
                <div
                  style={{
                    padding: "8px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: ".5rem",
                  }}
                  className="contentCard"
                >
                  <h3
                    style={{
                      color: "white",
                      width: "150px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {movie.title}
                  </h3>

                  <p style={{ color: "white", fontSize: "9px" }}>
                    {" "}
                    {movie.release_date}{" "}
                  </p>

                  <Stack
                    color={"white"}
                    flexDirection={"row"}
                    justifyContent={"center"}
                    alignItems={"center"}
                  >
                    <Stack
                      width={"4rem"}
                      height={"4rem"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <p style={{ fontSize: ".8rem" }}>Rating</p>
                      <ProgressMovie
                        popularityMax={popularityMax}
                        size={45}
                        popularity={movie.popularity}
                      />
                    </Stack>
                    <Stack
                      width={"4rem"}
                      height={"4rem"}
                      justifyContent={"space-between"}
                      alignItems={"center"}
                    >
                      <p style={{ fontSize: ".8rem" }}>Favorites</p>
                      <Image
                        style={{ cursor: "pointer" }}
                        // onClick={handleClickLike}
                        alt=""
                        src={"/Heart.svg"}
                        width={35}
                        height={40}
                      />
                    </Stack>
                  </Stack>
                </div>
              </Stack>
            </div>
          );
        })}
      </Stack>
    </>
  );
};

export default MovieDetail;
