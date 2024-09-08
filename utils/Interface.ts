export interface Genre  {
    id: number;
    name: string;
}

export interface Movie {
    backdrop_path: string;
    poster_path: string;
    name?: string;
    title: string;
    id: number;
    tagline?: string;
    release_date?: string;
    first_air_date?: string;
    genres: Genre[];
    status?: string;
    origin_country?: string[];
    original_language?: string;
    vote_average: number;
}
export interface MovieDetailsType {
  backdrop_path: string;
  // Add other properties if needed
}

export interface RecommendationType {
  id: number;
  release_date: string;
  vote_average: number;
  poster_path: string;
  title: string;
}

export interface ImageLogoType {
  logos: { iso_639_1: string; file_path: string }[];
}

export interface Item {
    id: number;
    title: string;
    poster_path: string;
    media_type: string;
    vote_average?: number;
    release_date?: string;
    first_air_date?: string;
}

export interface ChooseYourTypeProps {
  kind?: string; // Optional, if this is a TV-specific parameter
}
export interface ApiResponse {
    results: Item[];
}
export interface MovieDetails {
      name?: string;

  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  tagline?: string;
  release_date?: string;
  first_air_date?: string;
  genres: { id: number; name: string }[];
  status?: string;
  origin_country?: string[];
  original_language?: string;
  vote_average?: number;
  production_countries?: { iso_3166_1: any }[];
  production_companies?: { id: number; logo_path?: string }[];
  logo_path?: any;
    kind?: string;
  budget?: number;
}
export interface Recommends {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  vote_average: any;
  release_date: string;
  first_air_date?: string; // Use optional if it might not be available
  name: string;
}
export interface Actor {
  id: number;
  profile_path: string | null;
  name: string;
  character: string;
}

export interface MovieCastResponse  {
  cast: Actor[];
}
export interface MovieApiResponse {
    results: Movie[];
    page: number;
    total_pages: number;
}
