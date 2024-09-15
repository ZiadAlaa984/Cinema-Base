'use client'
import React, { createContext, ReactNode, FC, useState, useContext } from 'react';

// Define the shape of the context value
interface ApiContextType {
    searchMovie: (query: string) => Promise<any>;
    searchSeries: (query: string) => Promise<any>;
    TopRated: (page?: number) => Promise<any>; 
    Series: (page?: number) => Promise<any>; 
    TypeMovie: () => Promise<any>;
    PopularMovie: (page?: number) => Promise<any>;
    Populars: (page?: number) => Promise<any>;
    RecommendedMovies: (id: string) => Promise<any>;
    SearchByType: (page: number ,value: string ,Type:string) => Promise<any>;
    MovieDetails: (id: string) => Promise<any>;
    ImageLogo: (id: string) => Promise<any>;
    MovieCast: (id: string) => Promise<any>;
    MovieVideo: (id: string) => Promise<any>;
    CelebritieDetails: (id: string) => Promise<any>;
    MovieCelebritie: (id: string) => Promise<any>;
    ImageLogoSeries: (id: string) => Promise<any>;
    SeriesDetails: (id: string) => Promise<any>;
    SeriesCast: (id: string) => Promise<any>;
    SeriesVideos: (id: string) => Promise<any>;
    RecommendedSeries: (id: string) => Promise<any>;
    setvideoDetails: React.Dispatch<React.SetStateAction<any[]>>;
    videoDetails: any[];
}

// Create the context with a default value of undefined
export const ApiContext = createContext<ApiContextType | undefined>(undefined);

// Define the props for the provider component
interface ApiContextProviderProps {
    children: ReactNode;
}

const fetchFromApi = async (endpoint: string) => {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcyNDQxMzU3OS43MzM5OSwic3ViIjoiNjY2NmU3YzUyMGM2NDRkMDJmMTVjZmM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.40IR6QAdpPMB6U0y6Kjl6yh3NTboIcpU8xs1vqX70jQ'
        }
    };
    try {
        const response = await fetch(endpoint, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (err) {
        console.error('Error fetching data:', err);
        throw err;
    }
};

export const ApiContextProvider: FC<ApiContextProviderProps> = ({ children }) => {
    const [videoDetails, setvideoDetails] = useState<any[]>([]);

    // Movie-related functions
    const searchMovie = async (query: string) => {
        return fetchFromApi(`https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`);
    };
    const Populars = async (page = 1) => {
        return fetchFromApi(`https://api.themoviedb.org/3/trending/person/day?language=en-US&page=${page}`);
    };
    
    const searchSeries = async (query: string) => {
        return fetchFromApi(`https://api.themoviedb.org/3/search/tv?query=${query}&include_adult=false&language=en-US&page=1`);
    };

    const TopRated = async (page = 1) => {
        return fetchFromApi(`https://api.themoviedb.org/3/movie/top_rated?page=${page}`);
    };
    
    const PopularMovie = async (page = 1) => {
        return fetchFromApi(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`);
    };

    const RecommendedMovies = async (id: string) => {
        return fetchFromApi(`https://api.themoviedb.org/3/movie/${id}/recommendations`);
    };

    const MovieDetails = async (id: string) => {
        return fetchFromApi(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
    };

    const ImageLogo = async (id: string) => {
        return fetchFromApi(`https://api.themoviedb.org/3/movie/${id}/images`);
    };

    const MovieCast = async (id: string) => {
        return fetchFromApi(`https://api.themoviedb.org/3/movie/${id}/credits`);
    };

    const MovieVideo = async (id: string) => {
        return fetchFromApi(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
    };

    const Series = async (page = 1) => { 
        return fetchFromApi(`https://api.themoviedb.org/3/trending/tv/day?language=en-US&page=${page}`);
    };

    const ImageLogoSeries = async (id: string) => {
        return fetchFromApi(`https://api.themoviedb.org/3/tv/${id}/images`);
    };

    const SeriesDetails = async (id: string) => {
        return fetchFromApi(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
    };
    const CelebritieDetails = async (id: string) => {
        return fetchFromApi(`https://api.themoviedb.org/3/person/${id}`);
    };

    const RecommendedSeries = async (id: string) => {
        return fetchFromApi(`https://api.themoviedb.org/3/tv/${id}/recommendations`);
    };

    const SeriesCast = async (id: string) => {
        return fetchFromApi(`https://api.themoviedb.org/3/tv/${id}/credits`);
    };
    const MovieCelebritie = async (id: string) => {
        return fetchFromApi(`https://api.themoviedb.org/3/person/${id}/movie_credits
`);
    };

    const SeriesVideos = async (id: string) => {
        return fetchFromApi(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
    };

    const SearchByType = async (page: number ,value: string ,Type: string = 'movie') => {
        return fetchFromApi(`https://api.themoviedb.org/3/discover/${Type}?with_genres=${value}&include_adult=false&language=en-US&page=${page}&sort_by=popularity.desc`);
    };

    const TypeMovie = async (kind: string = 'movie') => {
        return fetchFromApi(`https://api.themoviedb.org/3/genre/${kind}/list?language=en`);
    };

    return (
        <ApiContext.Provider value={{ 
            searchMovie, TopRated, Series, TypeMovie, PopularMovie, 
            RecommendedMovies, MovieDetails, ImageLogo, MovieCast, Populars ,MovieCelebritie ,  
            MovieVideo, SeriesDetails, SeriesCast, SeriesVideos, searchSeries,CelebritieDetails,
            setvideoDetails, videoDetails, RecommendedSeries, ImageLogoSeries, SearchByType
        }}>
            {children}
        </ApiContext.Provider>
    );
};

// Custom hook to use the ApiContext
export const useApiContext = () => {
    const context = useContext(ApiContext);
    if (context === undefined) {
        throw new Error('useApiContext must be used within an ApiContextProvider');
    }
    return context;
};
