"use client";
import {
  getMovieByNameFetch,
  getMoviesFetch,
  getPopularMoviesFetch,
} from "@/fetch/movieFetch";
import { loginFetch, signupFetch } from "@/fetch/userFetch";
import { IMovie, IOptionsFilter, IUserContext } from "@/interfaces/interfaces";
import React, { createContext, useState } from "react";

export const UserContext = createContext<IUserContext>({
  movies: [],
  popularMovies: [],
  getMovies: async () => null,
  getPopularMovies: async () => null,
  getMovieByName: async () => null,
  login: async () => null,
  signup: async () => null,
  isLogin: false,
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [movies, setMovies] = useState<Array<IMovie>>([]);
  const [popularMovies, setPopularMovies] = useState<Array<IMovie>>([]);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  async function getMovies(options: IOptionsFilter) {
    try {
      const response = await getMoviesFetch(options);
      console.log(response);
      setMovies(response.results);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function getPopularMovies(options: IOptionsFilter) {
    try {
      const response = await getPopularMoviesFetch(options);
      console.log(response);
      setPopularMovies(response.results);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function getMovieByName(name: string) {
    try {
      return await getMovieByNameFetch(name);
    } catch (error) {
      throw error;
    }
  }
  async function login(email: string, password: string) {
    try {
      const response = await loginFetch(email, password);

      if (response) {
        setIsLogin(true);

        return response;
      }
    } catch (error) {
      throw error;
    }
  }
  async function signup(email: string, password: string) {
    try {
      const response = await signupFetch(email, password);

      if (response) return response;
    } catch (error) {
      throw error;
    }
  }

  return (
    <UserContext.Provider
      value={{
        movies,
        getMovies,
        popularMovies,
        getPopularMovies,
        getMovieByName,
        login,
        signup,
        isLogin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
