"use client";
import { Stack } from "@mui/material";
import Image from "next/image";
import React, { useRef, useEffect, useContext, useState } from "react";
import Tittle from "../Tittle/tittle";
import { UserContext } from "@/context/user";
import ProgressMovie from "../ProgressStatus/progressMovie";
import Cookies from "js-cookie";
import BasicModal from "../ModalLogin/modalLogin";
import { useRouter } from "next/navigation";

export default function GridMovies() {
  const { movies, popularMovies } = useContext(UserContext);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [popularityMax, setPopularityMax] = useState<number>(0);
  const [popularityMaxPopular, setPopularityMaxPopular] = useState<number>(0);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  const handleClickLike = () => {
    const token = Cookies.get("token");
    console.log(token);

    if (!token) {
      handleOpen();
    }
  };

  useEffect(() => {
    const popularity = movies.map((movie) => movie.popularity);
    const popularityPopular = popularMovies.map((movie) => movie.popularity);
    const maxPopularity = Math.max(...popularity);
    const maxPopularityPopular = Math.max(...popularity);
    setPopularityMax(maxPopularity);
    setPopularityMaxPopular(maxPopularityPopular);
  }, [movies, popularMovies]);

  const handleWheel = (event: WheelEvent) => {
    if (containerRef.current) {
      containerRef.current.scrollLeft += event.deltaY;
      window.document.body.style.maxHeight = "100vh";
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel);
      container.addEventListener("mouseleave", () => {
        window.document.body.style.maxHeight = "";
        window.document.body.style.overflow = "scroll";
      });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
    };
  }, [movies]);

  return (
    <div>
      <BasicModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
      <Tittle content="Popular" />

      <Stack
        ref={containerRef}
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
                        onClick={handleClickLike}
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

      <Tittle content="Now Paying" />

      <Stack
        ref={containerRef}
        sx={{
          // paddingLeft: '24px',
          // paddingTop: '69px',
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
        {popularMovies.map((movie) => {
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
                onClick={() => router.push(JSON.stringify(movie.title))}
              >
                <Image
                  alt={movie.title}
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  width={200}
                  height={300}
                  style={{
                    borderRadius: "8px 8px 0 0",
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
                        popularityMax={popularityMaxPopular}
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
                        onClick={handleClickLike}
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
    </div>
  );
}
