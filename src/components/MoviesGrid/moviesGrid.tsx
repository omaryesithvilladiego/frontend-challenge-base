"use client";
import { IMovie } from "@/interfaces/interfaces";
import { Stack } from "@mui/material";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef } from "react";

import ProgressMovie from "../ProgressStatus/progressMovie";
import Tittle from "../Tittle/tittle";
import BasicModal from "../ModalLogin/modalLogin";

interface Props {
  movies: IMovie[];
  tittle: string;
  containerRef?: any;
}

export default function GridMoviesComponent({
  movies,
  tittle,
  containerRef,
}: Props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const router = useRouter();

  const handleClickLike = () => {
    const token = Cookies.get("token");
    if (!token) {
      handleOpen();
    }
  };

  // Calcular la popularidad máxima entre todas las películas
  const popularityMax = Math.max(...movies.map((movie) => movie.popularity));

  return (
    <div>
      <BasicModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
      <Tittle content={tittle} />
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
          scrollbarWidth: "none",
        }}
      >
        {movies.map((movie) => (
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
                onClick={() => router.push(`/${JSON.stringify(movie.title)}`)}
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
                  {movie.release_date}
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
                    <ProgressMovie size={45} popularity={movie.popularity} />
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
        ))}
      </Stack>
    </div>
  );
}
