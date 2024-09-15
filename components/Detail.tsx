import React, { useContext, useEffect, useState } from "react";
import Col from "./Col";
import { Button } from "./ui/button";
import { FaHeart, FaYoutube } from "react-icons/fa";
import { ProfileContext } from "@/Context/ProfileContext"; // Ensure correct import

interface MovieDetails {
  id: number;
  title: string;
  tagline?: string;
  release_date?: string;
  first_air_date?: string;
  genres: { id: number; name: string }[];
  overview: string;
  status: string;
  original_language: string;
  budget: number;
  production_companies: { id: number; logo_path?: string }[];
  vote_average?: number;
  poster_path?: string;
}

export default function Detail({ movieDetails ,videoDetails, image , kind }: any) {
  const {
    movieId,
    RemoveWatchList,
    getSeriesWithlist,
    addToWatchList,
    getWithlist,
    addSeriesToWatchList,
    RemoveSeriesWatchList,
  }: any = useContext(ProfileContext);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [Type, setType] = useState<string>(kind); // This should be managed based on your requirements

  useEffect(() => {
    async function checkIfFavorite() {
      if (!movieDetails) return;

      try {
        const watchlist =
          Type == "tv" ? await getSeriesWithlist() : await getWithlist();

        const isFav = watchlist?.results?.some(
          (item: any) => item.id == movieDetails.id
        );

        setIsFavorite(isFav);
      } catch (error) {
        console.error("Error checking watchlist:", error);
      }
    }

    checkIfFavorite();
  }, [movieDetails, Type, getSeriesWithlist, getWithlist]);

  async function handleWatchlistToggle() {
    try {
      if (Type == "tv") {

        if (isFavorite) {
          await RemoveSeriesWatchList(movieDetails.id);
        } else {
          await addSeriesToWatchList(movieDetails.id);
        }
      } else {
        if (isFavorite) {
          await RemoveWatchList(movieDetails.id);
        } else {
          await addToWatchList(movieDetails.id);
          console.log('add');
          
        }
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error updating watchlist:", error);
    }
  }

  const posterSrc = image?.file_path
    ? `https://image.tmdb.org/t/p/w500/${image.file_path}`
    : "";

  if (!movieDetails) return <div>No movie details available.</div>;

  return (
    <div className="w-full pt-20 h-auto flex lg:flex-row gap-6 lg:gap-0 flex-col justify-center">
      <div className="flex justify-start w-full order-2 lg:w-3/4 relative items-start flex-col">
        <div className="items-center lg:items-start w-full flex flex-col my-3">
          {posterSrc ? (
            <img
              src={posterSrc}
              alt="Movie Poster"
              width={450}
              height={450}
              className="h-auto lg:w-[20%] w-[50%] lg:h-auto"
            />
          ) : (
            <p className="text-3xl lg:text-5xl pt-2 pb-4 mBlur borderGlass rounded-3xl inline-block px-3 text-white font-extrabold lg:mt-10">
              {movieDetails.title}
            </p>
          )}
        </div>
        <div className="w-full lg:w-auto mb-3 text-center lg:text-start">
          {movieDetails.tagline && (
            <p className="text-[12px] bg-transparent text-2xl backdrop-blur-3xl border border-white/30 px-4 py-1 lg:text-sm mBlur borderGlass rounded-3xl inline-block text-white font-medium">
              {movieDetails.tagline}
            </p>
          )}
        </div>
        <div className="flex gap-3 mb-2 w-full justify-center lg:justify-start flex-wrap gap-y-2">
          <p className="text-[12px] bg-transparent text-2xl backdrop-blur-3xl border border-white/30 px-4 py-1 lg:text-sm mBlur borderGlass rounded-3xl inline-block text-white font-medium">
            {movieDetails.release_date?.slice(0, 4) ||
              movieDetails.first_air_date?.slice(0, 4)}
          </p>
          {movieDetails.genres.map((item: any) => (
            <p key={item.id}>
              <span className="text-[12px] bg-transparent text-2xl backdrop-blur-3xl border border-white/30 px-4 py-1 lg:text-sm mBlur borderGlass rounded-3xl inline-block text-white font-medium">
                {item.name}
              </span>
            </p>
          ))}
        </div>

        <div className="flex gap-2 items-center lg:items-start flex-col w-full">
          <div className="lg:w-[50%] w-full mBlur borderGlass rounded-3xl ">
            <p className="bg-transparent backdrop-blur-3xl border border-white/30 px-5 py-2 lg:text-sm mBlur borderGlass rounded-3xl inline-block text-white font-medium">
              {movieDetails?.overview}
            </p>
          </div>
          <div className="flex flex-row gap-2 flex-wrap items-center xl:items-start justify-center lg:justify-start w-full">
            <p className="bg-transparent backdrop-blur-3xl border border-white/30 px-5 py-2 lg:text-sm mBlur borderGlass rounded-3xl inline-block text-white font-medium">
              Status: {movieDetails?.status}
            </p>
            <p className="bg-transparent backdrop-blur-3xl border border-white/30 px-5 py-2 lg:text-sm mBlur borderGlass rounded-3xl inline-block text-white font-medium">
              Original Language: {movieDetails.original_language}
            </p>
            <p className="bg-transparent backdrop-blur-3xl border border-white/30 px-5 py-2 lg:text-sm mBlur borderGlass rounded-3xl inline-block text-white font-medium">
              Budget:{" "}
              <span className="font-bold text-md">{movieDetails?.budget}</span>
            </p>
          </div>
          <p className="bg-transparent backdrop-blur-3xl border border-white/30 px-5 py-2 lg:text-sm mBlur borderGlass rounded-3xl inline-block text-white font-medium">
            There are no streaming services currently available for this in your
            country
          </p>
          <div className="flex flex-col lg:flex-row gap-2 items-center lg:items-start w-full">
            <div className="bg-transparent backdrop-blur-3xl border border-white/30 px-5 py-2 lg:text-sm mBlur borderGlass rounded-3xl inline-block text-white font-medium">
              <div className="flex w-full gap-2 flex-col md:flex-row items-center justify-center">
                <span>Production Companies:</span>
                <div className="flex ">
                  {movieDetails?.production_companies?.map((company: any) =>
                    company.logo_path ? (
                      <img
                        key={company.id}
                        src={`https://image.tmdb.org/t/p/w500/${company?.logo_path}`}
                        alt="company logo"
                        className="w-8 h-8 rounded-full object-cover mx-2"
                      />
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden lg:block mBlur borderGlass rounded-3xl ">
            <p className="bg-transparent text-4xl backdrop-blur-3xl border border-white/30 px-4 py-1 mBlur borderGlass rounded-3xl inline-block text-white font-bold">
              {movieDetails?.vote_average?.toFixed(1)}{" "}
              <span className="ml-[-3px] text-base font-medium">/10</span>
            </p>
          </div>
        </div>
      </div>
      <div className="flex order-3 justify-center lg:justify-end w-full lg:w-1/4 relative items-center lg:items-end">
        <div className="bg-transparent w-2/3 flex flex-col rounded-2xl gap-6 backdrop-blur-xl p-4">
          <img
            src={`https://image.tmdb.org/t/p/w500/${movieDetails?.poster_path}`}
            className="w-full h-2/3 object-cover rounded-xl group-hover/card:shadow-xl"
          />
          <div className="flex flex-col gap-6 w-full">
            <Button
              className="hover:shadow-lg font-bold hover:scale-105 transition-all items-center duration-300 text-md flex gap-2"
              variant="outline"
              onClick={handleWatchlistToggle}
            >
              {isFavorite ? "Remove from fav" : "Add to fav"}
              <FaHeart />
            </Button>
            <Button
              className="hover:shadow-lg font-bold hover:scale-105 transition-all items-center duration-300 text-md flex gap-2"
              variant="outline"
            >
              <a
                href={`https://www.youtube.com/watch?v=${videoDetails}`}
                target="_blank" // Opens in a new tab
                className="flex flex-row items-center gap-2"
              >
                Watch <FaYoutube />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
