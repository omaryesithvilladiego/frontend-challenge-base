"use client";
import { Stack } from "@mui/material";
import React, { useRef, useEffect, useContext, useState } from "react";
import { UserContext } from "@/context/user";
import GridMoviesComponent from "../MoviesGrid/moviesGrid";

export default function GridMovies() {
  const { movies, popularMovies, topRated, favorites, upcoming } =
    useContext(UserContext);

  const containerRefPopular = useRef<HTMLDivElement | null>(null);
  const containerRefNowPlaying = useRef<HTMLDivElement | null>(null);
  const containerRefUpcoming = useRef<HTMLDivElement | null>(null);
  const containerRefTopRated = useRef<HTMLDivElement | null>(null);
  const containerRefFavorites = useRef<HTMLDivElement | null>(null);

  const handleWheel = (
    event: WheelEvent,
    container: React.RefObject<HTMLDivElement>,
  ) => {
    if (container.current) {
      container.current.scrollLeft += event.deltaY;
      window.document.body.style.overflow = "hidden";
    }
  };

  const handleMouseLeave = () => {
    window.document.body.style.overflow = "scroll";
  };

  useEffect(() => {
    const containers = [
      containerRefPopular,
      containerRefNowPlaying,
      containerRefUpcoming,
      containerRefTopRated,
      containerRefFavorites,
    ];

    containers.forEach((container) => {
      if (container.current) {
        container.current.addEventListener("wheel", (event) =>
          handleWheel(event, container),
        );
        container.current.addEventListener("mouseleave", handleMouseLeave);
      }
    });

    return () => {
      containers.forEach((container) => {
        if (container.current) {
          container.current.removeEventListener("wheel", (event) =>
            handleWheel(event, container),
          );
          container.current.removeEventListener("mouseleave", handleMouseLeave);
        }
      });
    };
  }, [movies, popularMovies, topRated, favorites, upcoming]);

  if (!movies || !popularMovies || !upcoming || !topRated || !favorites)
    return <>No hay películas</>;

  return (
    <div>
      <GridMoviesComponent
        tittle="Popular"
        containerRef={containerRefPopular}
        movies={popularMovies}
      />
      <GridMoviesComponent
        tittle="Now Playing"
        containerRef={containerRefNowPlaying}
        movies={movies}
      />
      <GridMoviesComponent
        tittle="Upcoming"
        containerRef={containerRefUpcoming}
        movies={upcoming}
      />
      <GridMoviesComponent
        tittle="Top Rated"
        containerRef={containerRefTopRated}
        movies={topRated}
      />
      <GridMoviesComponent
        tittle="Favorites"
        containerRef={containerRefFavorites}
        movies={favorites}
      />
    </div>
  );
}
