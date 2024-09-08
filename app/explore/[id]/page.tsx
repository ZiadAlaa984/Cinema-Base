"use client";

import React, { useContext, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ApiContext } from "@/Context/ApiContext";
import ContainerWidth from "@/components/ContainerWidth";
import Heading from "@/components/Heading";
import Col from "@/components/Col";
import { Selector } from "@/components/ui/Selector";
import { Button } from "@/components/ui/button";
import Loading from "@/components/loading/page";

// Define the component
const Explore: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [genre, setGenre] = useState<string>(id.split("-")[0] || "");
  const [value, setValue] = useState<string>(id.split("-")[1] || "");
  const [Type, setType] = useState<string>(id.split("-")[2] || "movie");
  const { SearchByType }: any = useContext(ApiContext);

  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData(page: number, value: string, Type: string) {
      setLoading(true);
      setError(null);

      try {
        if (SearchByType) {
          const movieData = await SearchByType(page, value, Type);
          setMovies(movieData.results);
          // console.log(movieData);

          setTotalPages(movieData.total_pages || 1);
        } else {
          throw new Error("SearchByType function not provided");
        }
      } catch (error: any) {
        setError(
          "Error fetching movie details: " + (error.message || "Unknown error")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchData(currentPage, value, Type);
  }, [currentPage, value, Type, SearchByType]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleGenreChange = (selectedValue: string) => {
    const [newGenre, newValue] = selectedValue.split("-");
    setGenre(newGenre);
    setValue(newValue);
  };

  return (
    <div >
      <ContainerWidth>
        <div className="flex justify-between  pt-20 items-center w-full">
          <Heading text={genre || "Explore"} />
          <Selector  onSelect={handleGenreChange} />
        </div>
        {error && <div className="error-message text-red-500">{error}</div>}
              <div className="grid py-6 md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 grid-cols-2  gap-4 ">
          {loading ? (
            <Loading/>
          ) : (
            movies.map((movie) => (
              <Col
                key={movie.id}
                kind={Type == "tv" ? "tv" : "movie"}
                date={
                  Type == "tv"
                    ? movie.first_air_date || "Unknown Date"
                    : movie.release_date || "Unknown Date"
                }
                id={movie.id}
                star={
                  movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"
                }
                src={movie.poster_path || ""}
                name={
                  Type === "tv"
                    ? movie.name.split(' ').slice(0, 3).join(' ') || "No Title"
                    : movie.title.split(' ').slice(0, 3).join(' ') || "No Title"
                }
              />
            ))
          )}
        </div>
        <div className="flex py-6 justify-center gap-6 items-center">
          <Button
            onClick={handlePreviousPage}
            variant="outline"
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <span className="text-2xl text-white text-center font-black">
            {currentPage}
          </span>
          <Button
            onClick={handleNextPage}
            variant="outline"
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </ContainerWidth>
    </div>
  );
};

export default Explore;
