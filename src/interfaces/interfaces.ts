import { Dispatch, SetStateAction } from "react";

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

interface IOptionsFilter {
  genres?: number[];
  keywords?: string;
  popularity?: boolean;
  page?: number;
}

interface IUserContext {
  movies: Array<IMovie>;
  getMovies: (options: IOptionsFilter) => Promise<any>;
  popularMovies: Array<IMovie>;
  getPopularMovies: (options: IOptionsFilter) => Promise<any>;
  getMovieByName: (name: string) => Promise<any>;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
  isLogin: boolean;
  upcoming: Array<IMovie>;
  getUpcoming: (options: IOptionsFilter) => Promise<any>;
  topRated: Array<IMovie>;
  getTopRated: (options: IOptionsFilter) => Promise<any>;
  favorites: Array<IMovie>;
  getFavorites: (options: IOptionsFilter) => Promise<any>;
}

export type { IUserContext, IMovie, IOptionsFilter };
