import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode } from "swiper/modules";
import { ApiContext } from "@/Context/ApiContext";
import "../SliderCast/styles.css";
import Link from "next/link";
import Image from "next/image";

export default function SliderMovie({ id }: { id: string }) {
  const { MovieCelebritie }: any = useContext(ApiContext);
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async (id: string) => {
      setLoading(true);
      setError(null);
      try {
        if (MovieCelebritie) {
          const movieCelebritieData: any = await MovieCelebritie(id);
          console.log(movieCelebritieData.cast); // Log data to check structure
          setMovies(movieCelebritieData.cast || []); // Ensure that cast exists
        }
      } catch (error: any) {
        console.error(error);
        setError(
          "Error fetching movie data: " + (error.message || "Unknown error")
        );
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMovies(id);
    } else {
      setLoading(false);
    }
  }, [id, MovieCelebritie]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <Swiper
      slidesPerView={10}
      spaceBetween={20}
      freeMode={true}
      modules={[FreeMode]}
      className="mySwiper"
      breakpoints={{
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 15,
        },
        768: {
          slidesPerView: 5,
          spaceBetween: 20,
        },
        1024: {
          slidesPerView: 7,
          spaceBetween: 30,
        },
      }}
    >
      {movies.length > 0 ? (
        movies.map(
          (movie) =>
            movie.poster_path && ( // Use `poster_path` consistently
              <SwiperSlide
                key={movie.id}
                className="rounded-lg overflow-hidden text-[12px] bg-transparent text-2xl backdrop-blur-3xl border border-white/30 lg:text-sm mBlur borderGlass inline-block text-white font-medium"
              >
                <Link href={`/details/${movie.id}`}>
                  <div className="cast-member">
                    <Image
                      src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`} // Use `poster_path` for image
                      alt={movie.title || "No title"} // Fallback in case of missing title
                      className="cast-img h-[40px] object-contain"
                    />
                    <p className="cast-name text-sm mt-1">
                      {movie.title ? movie.title.split(" ")[0] : "No title"}
                    </p>
                  </div>
                </Link>
              </SwiperSlide>
            )
        )
      ) : (
        <h3 className="text-white font-bold text-center text-3xl">
          No movies available
        </h3>
      )}
    </Swiper>
  );
}
