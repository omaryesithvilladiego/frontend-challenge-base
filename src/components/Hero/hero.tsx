"use client";
import React, { useEffect } from "react";
import styles from "../../styles/hero/hero.module.css";
import styled from "styled-components";
import { Stack, useMediaQuery } from "@mui/material";
import Image from "next/image";

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export default function Hero(): JSX.Element {
  const matches = useMediaQuery("(max-width:1000px)");

  useEffect(() => {}, []);

  const movies: Array<IMovie> = [
    {
      adult: false,
      backdrop_path: "/AhBxEuJsd4n4FLCebPzLq0IMjrp.jpg",
      genre_ids: [18, 9648, 28],
      id: 1316205,
      original_language: "zh",
      original_title: "狄仁杰·通天人偶",
      overview:
        "After occurrences of a bizarre fire in Luoyang palace, incredible puppetry skills, the Kunlun sacred tree that has been frozen for a thousand years, a shocking bloodthirsty murder case, Wu Zetian's mysterious Plum Blossom Shadow Guard... suddenly two Wu Zetians appear in the world at the same time, and a series of unsolved and intertwined cases emerge. Watch how Di Renjie peels off the layers to uncover the hidden shocking conspiracy.",
      popularity: 18.5,
      poster_path: "/5kdQMjPzUaH3Q3T00MUEaGAzzaG.jpg",
      release_date: "2024-07-13",
      title: "The Mystery of Humanoid Puppet",
      video: false,
      vote_average: 0,
      vote_count: 0,
    },
  ];

  return (
    <HeroWraper className={styles.hero}>
      {movies.map((movie) => {
        return (
          <ContentHero key={movie.id}>
            <Stack
              flexDirection={"column"}
              justifyContent={"end"}
              style={{
                background: `linear-gradient(0.87deg, #000 19.08%, rgba(102, 102, 102, 0)), url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})`,
                height: !matches ? "436px" : "600px",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                color: "white",
                padding: "60px",
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
                      {" "}
                      {movie.overview}{" "}
                    </ParagraphTittle>
                  </Stack>

                  <Stack
                    flexDirection={"row-reverse"}
                    justifyContent={!matches ? "right" : "center"}
                    alignItems={"center"}
                  >
                    <div className="rating">
                      <svg width="150" height="150" viewBox="0 0 250 250">
                        <circle
                          className="bg"
                          cx="125"
                          cy="125"
                          r="92"
                          fill="transparent"
                          stroke="#4da14e64"
                          stroke-width="10"
                        ></circle>
                        <circle
                          className="fg"
                          cx="125"
                          cy="125"
                          r="92"
                          fill="transparent"
                          stroke=" #4da14f"
                          stroke-width="10"
                          stroke-dasharray="600"
                          stroke-dashoffset={
                            600 - (600 * movie.popularity) / 100
                          }
                          transform="rotate(-90, 125, 125)"
                        ></circle>
                        <text
                          fill="white"
                          x="125"
                          y="125"
                          alignmentBaseline="middle"
                          textAnchor="middle"
                          style={{ fontSize: "28px" }}
                        >
                          {Math.round(movie.popularity)}%
                        </text>
                      </svg>
                    </div>

                    <Image alt="" src={"/Heart.svg"} width={25} height={25} />
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
