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
import GridMoviesComponent from "../MoviesGrid/moviesGrid";

export default function GridMovies() {
  const { movies, popularMovies, getMovies, upcoming, favorites, topRated } =
    useContext(UserContext);
  const containerRef = useRef<HTMLDivElement | null>(null);

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
  }, [movies, popularMovies]);

  if (!movies || !popularMovies) return <>No hay movies</>;

  return (
    <div>
      <GridMoviesComponent tittle="Popular" movies={popularMovies} />
      <GridMoviesComponent tittle="Now paying" movies={movies} />
      <GridMoviesComponent tittle="Upcoming" movies={upcoming} />
      <GridMoviesComponent tittle="Top Rated" movies={topRated} />
      <GridMoviesComponent tittle="Favorites" movies={favorites} />
    </div>
  );
}
