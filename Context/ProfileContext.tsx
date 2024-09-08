'use client';

import React, { createContext, ReactNode, useState, FC, useEffect } from 'react';

// Define the shape of the context value
interface ProfileContextType {
    movieId: number | null;
    addToWatchList: (movieId: number) => Promise<any>;
    RemoveWatchList: (movieId: number) => Promise<any>;
    addSeriesToWatchList: (movieId: number) => Promise<any>;
    RemoveSeriesWatchList: (movieId: number) => Promise<any>;
    getWithlist: (page:number) => Promise<any>;
    getSeriesWithlist: (page:number) => Promise<any>;

    setMovieId: (id: number | null) => void;
}

// Create the context with a default value
export const ProfileContext = createContext<ProfileContextType | undefined>(undefined);


// Define the props for the provider component
interface ProfileContextProviderProps {
    children: ReactNode;
}

export const ProfileContextProvider: FC<ProfileContextProviderProps> = ({ children }) => {
    const [movieId, setMovieId] = useState<number | null>(null);

    const getWithlist = async (page = 1) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcyNDQxMzU3OS43MzM5OSwic3ViIjoiNjY2NmU3YzUyMGM2NDRkMDJmMTVjZmM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.40IR6QAdpPMB6U0y6Kjl6yh3NTboIcpU8xs1vqX70jQ'
            }
        };

        try {
            const response = await fetch(`https://api.themoviedb.org/3/account/21320283/watchlist/movies?language=en-US&page=${page}&sort_by=created_at.asc`, options);
            const responseData = await response.json();
            return responseData;
        } catch (err) {
            console.error('Error fetching watchlist:', err);
            throw err;
        }
    }
    const getSeriesWithlist = async (page = 1) => {
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcyNDQxMzU3OS43MzM5OSwic3ViIjoiNjY2NmU3YzUyMGM2NDRkMDJmMTVjZmM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.40IR6QAdpPMB6U0y6Kjl6yh3NTboIcpU8xs1vqX70jQ'
            }
        };

        try {
            const response = await fetch(`https://api.themoviedb.org/3/account/21320283/watchlist/tv?language=en-US&page=${page}&sort_by=created_at.asc`, options);
            const responseData = await response.json();
            return responseData;
        } catch (err) {
            console.error('Error fetching watchlist:', err);
            throw err;
        }
    }

    const addToWatchList = async (movieId: number) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                media_type: 'movie',
                media_id: movieId,
                watchlist: true
            }),
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcyNDQxMzU3OS43MzM5OSwic3ViIjoiNjY2NmU3YzUyMGM2NDRkMDJmMTVjZmM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.40IR6QAdpPMB6U0y6Kjl6yh3NTboIcpU8xs1vqX70jQ'
            }
        };

        try {
            const response = await fetch('https://api.themoviedb.org/3/account/21320283/watchlist', options);
            const responseData = await response.json();

            return responseData;
        } catch (err) {
            console.error('Error adding to watchlist:', err);
            throw err;
        }
    }
    const addSeriesToWatchList = async (movieId: number) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                media_type: 'tv',
                media_id: movieId,
                watchlist: true
            }),
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcyNDQxMzU3OS43MzM5OSwic3ViIjoiNjY2NmU3YzUyMGM2NDRkMDJmMTVjZmM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.40IR6QAdpPMB6U0y6Kjl6yh3NTboIcpU8xs1vqX70jQ'
            }
        };

        try {
            const response = await fetch('https://api.themoviedb.org/3/account/21320283/watchlist', options);
            const responseData = await response.json();

            return responseData;
        } catch (err) {
            console.error('Error adding to watchlist:', err);
            throw err;
        }
    }
    const RemoveWatchList = async (movieId: number) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                media_type: 'movie',
                media_id: movieId,
                watchlist: false
            }),
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcyNDQxMzU3OS43MzM5OSwic3ViIjoiNjY2NmU3YzUyMGM2NDRkMDJmMTVjZmM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.40IR6QAdpPMB6U0y6Kjl6yh3NTboIcpU8xs1vqX70jQ'
            }
        };

        try {
            const response = await fetch('https://api.themoviedb.org/3/account/21320283/watchlist', options);
            const responseData = await response.json();

            return responseData;
        } catch (err) {

            throw err;
        }
    }
    const RemoveSeriesWatchList = async (movieId: number) => {
        const options = {
            method: 'POST',
            body: JSON.stringify({
                media_type: 'tv',
                media_id: movieId,
                watchlist: false
            }),
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YWVhZDJmMzk3NTQ0OGEzMzFkMzYxY2FiMDM0ZGM1MCIsIm5iZiI6MTcyNDQxMzU3OS43MzM5OSwic3ViIjoiNjY2NmU3YzUyMGM2NDRkMDJmMTVjZmM2Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.40IR6QAdpPMB6U0y6Kjl6yh3NTboIcpU8xs1vqX70jQ'
            }
        };

        try {
            const response = await fetch('https://api.themoviedb.org/3/account/21320283/watchlist', options);
            const responseData = await response.json();

            return responseData;
        } catch (err) {
            console.error('Error adding to watchlist:', err);
            throw err;
        }
    }

    return (
        <ProfileContext.Provider value={{ movieId, setMovieId, addToWatchList, addSeriesToWatchList,getWithlist , RemoveSeriesWatchList,getSeriesWithlist,RemoveWatchList }}>
            {children}
        </ProfileContext.Provider>
    );
};
