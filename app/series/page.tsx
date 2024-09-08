'use client';

import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "@/Context/ApiContext";
import ContainerWidth from "@/components/ContainerWidth";
import Filter from "@/components/LandingPage/Filter";
import Heading from "@/components/Heading";
import Col from "@/components/Col";
import Loading from "@/components/loading/page";


export default function Series() {
  const [movies, setMovies] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const { Series }: any = useContext(ApiContext);

  useEffect(() => {
    async function fetchData(page: number) {
      if (Series) {
        setLoading(true);
        setError(null);
        try {
          const res = await Series(page);
          setMovies(res.results);
          setTotalPages(res.total_pages); // Update totalPages from API response
        } catch (error: any) {
          console.error('Error fetching series data:', error);
          setError('Failed to fetch data. Please try again later.');
        } finally {
          setLoading(false);
        }
      } else {
        console.error('ApiContext or Series function is not defined.');
        setError('API context or function is not available.');
        setLoading(false);
      }
    }

    fetchData(currentPage);
  }, [currentPage, Series]);

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

  if (loading) {
    return <Loading/>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="pt-20">
        <ContainerWidth>
          <Filter kind="tv" /> 
          <Heading text="TRENDING SERIES" />
              <div className="grid md:grid-cols-3 py-6 lg:grid-cols-4  xl:grid-cols-5 grid-cols-2  gap-4 ">
            {movies.map(movie => (
              <Col
                kind={'tv'}
                key={movie.id}
                date={movie.first_air_date || 'Unknown Date'}
                id={movie.id}
                star={movie.vote_average ? movie.vote_average.toFixed(1) : 'N/A'}
                src={movie.poster_path || ''}
                name={movie.name ? movie.name.split(' ').slice(0, 3).join(' ') : movie.title || 'No Title'}
              />
            ))}
          </div>
          <div className='flex py-6 justify-center gap-6 items-center'>
            <Button
              onClick={handlePreviousPage}
              variant="outline"
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <span className='text-2xl text-white text-center font-black'>{currentPage}</span>
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
}
