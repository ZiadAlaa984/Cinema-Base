"use client";
import { Button } from "@/components/ui/button";
import { useContext, useEffect, useState } from "react";
import { ApiContext } from "@/Context/ApiContext";

import Col from "@/components/Col";
import ContainerWidth from "@/components/ContainerWidth";
import Heading from "@/components/Heading";
import Loading from "@/components/loading/page";

export default function celebrities() {
  const [celebrities, setCelebrities] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [error, setError] = useState<string | null>(null);
  const { Populars }: any = useContext(ApiContext);

  useEffect(() => {
    async function fetchData(page: number) {
      if (Populars) {
        setLoading(true);
        setError(null);
        try {
          const res = await Populars(page);
          console.log("Fetched data:", res.results);
          setCelebrities(res.results);
          setTotalPages(res.total_pages); // Update totalPages from API response
        } catch (error) {
          console.error("Error fetching popular movies:", error);
          setError("Failed to fetch data. Please try again later.");
        } finally {
          setLoading(false);
        }
      } else {
        console.error("ApiContext or PopularMovie function is not defined.");
        setError("API context or function is not available.");
        setLoading(false);
      }
    }

    fetchData(currentPage);
  }, [currentPage, Populars]); // Include PopularMovie in dependency array

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
        <Heading text="celebrities " />
        <div className="grid md:grid-cols-3 lg:grid-cols-4  xl:grid-cols-6 grid-cols-2  gap-4 ">
          {celebrities.map((celebritie) => (
            <Col
                  key={celebritie.id}
                  kind={'celebritie'}
              known={celebritie.known_for_department}
              id={celebritie.id}
              src={celebritie.profile_path}
              name={celebritie.name.split(" ").slice(0, 3).join(" ")}
            />
          ))}
        </div>
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
      </ContainerWidth>
    </div>
  );
}
