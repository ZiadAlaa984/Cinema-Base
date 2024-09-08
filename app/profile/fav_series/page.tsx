"use client";
import React, { useContext, useEffect, useState } from "react";
import { ProfileContext } from "@/Context/ProfileContext";
import { Button } from "@/components/ui/button";
import Heading from "@/components/Heading";
import Col from "@/components/Col";
import { FaHeart } from "react-icons/fa";
import Loading from "@/components/loading/page";
import Link from "next/link";

const Fav_series: React.FC = () => {
  const { getSeriesWithlist, RemoveSeriesWatchList }: any = useContext(ProfileContext) || {};

  const [series, setSeries] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData(currentPage: number) {
      setLoading(true);
      setError(null);

      try {
        const res = await getSeriesWithlist(currentPage);
        console.log(res);

        if (res?.results) {
          setSeries(res.results);
          setTotalPages(res.total_pages || 1); // Ensure totalPages is set
        } else {
          setSeries([]); // Handle cases where results are undefined
        }
      } catch (err) {
        console.error("Error fetching watchlist:", err);
        setError("Failed to load watchlist.");
      } finally {
        setLoading(false);
      }
    }
    fetchData(currentPage);
  }, [getSeriesWithlist, currentPage]); // Fetch data when currentPage changes

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  async function RemoveCard(id: number) {
    try {
      await RemoveSeriesWatchList(id);
      const res = await getSeriesWithlist(currentPage); // Fetch data again after removal
      if (res?.results) {
        setSeries(res.results);
        setTotalPages(res.total_pages || 1);
      }
    } catch (err) {
      console.error("Error removing from watchlist:", err);
    }
  }

  return (
    <div>
      <Heading text="Series" />
      {error && <div className="error-message text-red-500">{error}</div>}
      {loading ? (
        <Loading />
      ) : (
        <>
          {series.length === 0 ? (
            <div className="text-center min-h-[250px] text-white">
              <p>No favorite series found. Please add some series to your favorites.</p>
              <Button
                className="mt-4 hover:bg-white bg-white text-black"
              >
                <Link href="/series">Go to Add Series</Link>
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 py-6 lg:grid-cols-4 xl:grid-cols-5 grid-cols-2 gap-4">
              {series.map((seriesItem) => (
                <div className="flex flex-col gap-4" key={seriesItem.id}>
                  <Col
                    kind="tv"
                    date={seriesItem.first_air_date || "Unknown Date"}
                    id={seriesItem.id}
                    star={seriesItem.vote_average ? seriesItem.vote_average.toFixed(1) : "N/A"}
                    src={seriesItem.poster_path || ""}
                    name={seriesItem.name ? seriesItem.name.split(" ").slice(0, 3).join(" ") : "No Title"}
                  />
                  <Button
                    className="hover:shadow-lg hover:scale-105 transition-all items-center duration-300 xl:text-xl text-sm flex gap-2"
                    variant="outline"
                    onClick={() => RemoveCard(seriesItem.id)}
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
};

export default Fav_series;
