"use client";
import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "@/Context/ProfileContext";
import { Button } from "@/components/ui/button";
import { FaHeart } from "react-icons/fa";
import Heading from "@/components/Heading";
import Col from "@/components/Col";
import Loading from "@/components/loading/page";
import { Movie } from "@/utils/Interface";
import Link from "next/link";

export default function Fav_movie() {
  const { getWithlist, RemoveWatchList }: any =
    useContext(ProfileContext) || {};

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData(currentPage: number) {
      setLoading(true);
      setError(null);

      try {
        const res = await getWithlist(currentPage);
        if (res?.results) {
          setMovies(res.results);
          setTotalPages(res.total_pages || 1); // Ensure totalPages is set
        } else {
          setMovies([]); // Handle cases where results are undefined
        }
      } catch (err) {
        console.error("Error fetching watchlist:", err);
        setError("Failed to load watchlist.");
      } finally {
        setLoading(false);
      }
    }
    fetchData(currentPage);
  }, [getWithlist, currentPage]); // Fetch data when currentPage changes

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  async function RemoveCard(id: number) {
    try {
      await RemoveWatchList(id);
      const res = await getWithlist(currentPage); // Fetch data again after removal
      if (res?.results) {
        setMovies(res.results);
        setTotalPages(res.total_pages || 1);
      }
    } catch (err) {
      console.error("Error removing from watchlist:", err);
    }
  }

  return (
    <div>
      <Heading text="MOVIES" />
      {error && <div className="error-message text-red-500">{error}</div>}
      {loading ? (
        <Loading />
      ) : (
        <>
          {movies.length === 0 ? (
            <div className="text-center min-h-[250px]  text-white">
              <p>
                No favorite movies found. Please add some movies to your
                favorites.
              </p>
              <Button className="mt-4 hover:bg-white bg-white text-black">
                <Link  href='/'>
                  Go to Add Movies
                </Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 py-6 lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 gap-4">
              {movies.map((movie) => (
                <div className="flex flex-col gap-4" key={movie.id}>
                  <Col
                    date={movie.release_date}
                    id={movie.id}
                    star={movie.vote_average.toFixed(1)}
                    src={movie.poster_path}
                    name={movie.title.split(" ").slice(0, 3).join(" ")}
                  />
                  <Button
                    className="hover:shadow-lg hover:scale-105 transition-all items-center duration-300 text-xl flex gap-2"
                    variant="outline"
                    onClick={() => RemoveCard(movie.id)}
                  >
                    Remove from fav
                    <FaHeart />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
      <div className="flex py-6 justify-center gap-6 items-center">
        <Button
          onClick={handlePreviousPage}
          variant="outline"
          disabled={currentPage === 1} // Disable Previous button if on the first page
        >
          Previous
        </Button>
        <span className="text-2xl text-white text-center font-black">
          {currentPage}
        </span>
        <Button
          onClick={handleNextPage}
          variant="outline"
          disabled={currentPage === totalPages} // Disable Next button if on the last page
        >
          Next
        </Button>
      </div>
    </div>
  );
}
