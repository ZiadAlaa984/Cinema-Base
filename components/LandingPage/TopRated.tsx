"use client";
import  { useContext, useEffect, useState } from "react";
import Heading from "../Heading";
import Link from "next/link";
import { ApiContext } from "@/Context/ApiContext";
import Col from "../Col";
import { Button } from "../ui/button";
import { Movie } from "@/utils/interface";

const TopRated: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { TopRated }: any = useContext(ApiContext);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      if (TopRated) {
        try {
          const res = await TopRated();
          setMovies(res.results);
        } catch (error) {
          console.error("Error fetching top-rated movies:", error);
        }
      } else {
        console.error("ApiContext or TopRated function is not defined.");
      }
    }

    fetchData();
  }, []);

  return (

      <section>
        <Heading text="TOP RATED" />
        <div className="grid md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-5 grid-cols-2  gap-4 ">
          {movies.map((movie) => (
            <Col
              date={movie.release_date}
              id={movie.id}
              star={movie.vote_average.toFixed(1)}
              src={movie.poster_path}
              name={movie.title.split(" ").slice(0, 2).join(" ")}
            />
          ))}
        </div>
        <div className="flex mt-6 justify-center items-center">
          <Link href="/topRated">
            <Button
              variant="outline"
              className="px-12 py-4 text-md hover:scale-x-110 transition-all duration-300  rounded-full"
            >
              All Top Rated
            </Button>
          </Link>
        </div>
      </section>

  );
};

export default TopRated;
