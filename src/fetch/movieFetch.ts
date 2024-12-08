import { IMovie, IOptionsFilter } from "@/interfaces/interfaces";
const urlBack = "http://localhost:3001/";

export const getMoviesFetch = async (options: IOptionsFilter): Promise<any> => {
  let { genres, popularity, keywords, page } = options;

  let genresFilter = genres?.toString();
  if (genresFilter === undefined) {
    genresFilter = "";
  }
  if (popularity === undefined) {
    popularity = false;
  }
  if (keywords === undefined) keywords = "";

  const response = await fetch(
    `${urlBack}movies?genres=${genresFilter}&popularity=${popularity}&keywords=${keywords}&page=${page}`,
    {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    },
  );

  const data = await response.json();

  return data;
};

export const getPopularMoviesFetch = async (
  options: IOptionsFilter,
): Promise<any> => {
  let { genres, popularity, keywords } = options;

  let genresFilter = genres?.toString();
  if (genresFilter === undefined) {
    genresFilter = "";
  }
  if (popularity === undefined) {
    popularity = false;
  }
  if (keywords === undefined) keywords = "";

  const response = await fetch(
    `${urlBack}movies?genres=${genresFilter}&popularity=${popularity}&keywords=${keywords}&page=2`,
    {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    },
  );

  const data = await response.json();

  return data;
};

export const getMovieByNameFetch = async (name: string) => {
  const response = await fetch(`${urlBack}movies/${name}`, {
    headers: { "Content-Type": "application/json" },
    method: "GET",
  });

  const data = await response.json();

  return data;
};
