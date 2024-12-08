"use client";
import React, { useContext, useEffect, useState } from "react";
import styles from "../../styles/hero/hero.module.css";
import styled from "styled-components";
import { Stack, useMediaQuery } from "@mui/material";
import Image from "next/image";
import { IMovie } from "@/interfaces/interfaces";
import { UserContext } from "@/context/user";
import ProgressMovie from "../ProgressStatus/progressMovie";
import Cookies from "js-cookie";
import BasicModal from "../ModalLogin/modalLogin";

export default function Hero(): JSX.Element {
  const matches = useMediaQuery("(max-width:1000px)");
  const { movies, popularMovies } = useContext(UserContext);
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

  useEffect(() => {
    const popularity = movies.map((movie) => movie.popularity);
    const maxPopularity = Math.max(...popularity);
    setPopularityMax(maxPopularity);
  }, [movies, popularMovies]);

  return (
    <HeroWraper className={styles.hero}>
      <BasicModal
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />
      {movies.slice(0, 1).map((movie) => {
        return (
          <ContentHero key={movie.id}>
            <Stack
              flexDirection={"column"}
              justifyContent={"end"}
              style={{
                background: `linear-gradient(0.87deg, #000 19.08%, rgba(102, 102, 102, 0)), url(https://image.tmdb.org/t/p/w1280${movie.backdrop_path})`,
                height: !matches ? "436px" : "600px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
                padding: "60px",
                boxShadow: "0px 3px 5px -1px rgba(0,0,0,0.45)",
              }}
            >
              <Stack>
                <Stack
                  flexDirection={matches ? "column" : "row"}
                  justifyContent={"space-between"}
                  position={"relative"}
                  gap={!matches ? "290px" : "0px"}
                  height={"100%"}
                >
                  <Stack gap={"15px"}>
                    <HeadingTittle> {movie.title} </HeadingTittle>
                    <ParagraphTittle
                      style={{ fontSize: !matches ? "20px" : "12px" }}
                    >
                      {movie.overview}
                    </ParagraphTittle>
                  </Stack>

                  <Stack
                    flexDirection={"row-reverse"}
                    justifyContent={!matches ? "right" : "center"}
                    alignItems={"center"}
                    gap={"49px"}
                  >
                    <ProgressMovie
                      popularityMax={popularityMax}
                      size={150}
                      popularity={movie.popularity}
                    />

                    <Image
                      style={{ cursor: "pointer" }}
                      onClick={handleClickLike}
                      alt=""
                      src={"/Heart.svg"}
                      width={25}
                      height={25}
                    />
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </ContentHero>
        );
      })}
    </HeroWraper>
  );
}

const HeroWraper = styled.div``;

const ContentHero = styled.div``;

const ParagraphTittle = styled.p`
  line-height: 24px;
  font-family: "IBM Plex Sans";
  color: #fff;
  text-align: left;
  align-items: center;
`;

const HeadingTittle = styled.h1`
  font-size: 35px;
  line-height: 39px;
  font-family: "IBM Plex Sans";
  color: #fff;
  text-align: left;
  align-items: center;
`;
