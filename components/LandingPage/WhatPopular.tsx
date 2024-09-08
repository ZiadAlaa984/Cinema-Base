"use client";
import React, { useContext, useEffect, useState } from "react";
import Heading from "../Heading";
import Link from "next/link";
import { ApiContext } from "@/Context/ApiContext";
import Col from "../Col";
import { Button } from "../ui/button";
import { Movie } from "@/utils/Interface";
import Loading from "../loading/page"; // Import your loading component

const WhatPopular: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { PopularMovie }: any = useContext(ApiContext);

  useEffect(() => {
    async function fetchData() {
      if (PopularMovie) {
        try {
          const res = await PopularMovie();
          setMovies(res.results);
        } catch (error) {
          console.error("Error fetching popular movies:", error);
        } finally {
          setLoading(false); // Data fetching completed
        }
      } else {
        console.error("ApiContext or PopularMovie function is not defined.");
        setLoading(false); // Data fetching completed with no PopularMovie
      }
    }
    fetchData();
  }, [PopularMovie]);

  if (loading) {
    return <Loading />; // Show the loading component while data is being fetched
  }

  return (
    <section>
      <Heading text="WHAT'S POPULAR" />
      <div className="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 gap-4">
        {movies.map((movie) => (
          <Col
            key={movie.id} // Ensure to add a unique key prop for each item
            date={movie.release_date}
            id={movie.id}
            star={movie.vote_average.toFixed(1)}
            src={movie.poster_path}
            name={movie.title.split(" ").slice(0, 3).join(" ")}
          />
        ))}
      </div>
      <div className="flex mt-6 justify-center items-center">
        <Link href="/popular">
          <Button
            variant="outline"
            className="px-12 py-4 text-md hover:scale-x-110 transition-all duration-300 rounded-full"
          >
            All Popular Movies
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default WhatPopular;
