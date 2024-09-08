"use client";
import { useState, useEffect, ChangeEvent, useContext } from "react";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import ContainerWidth from "./ContainerWidth";
import { ApiContext } from "@/Context/ApiContext";
import { FaBars } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
export default function Navbar() {
  const { searchSeries }: any = useContext(ApiContext);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [movies, setMovies] = useState<any[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prevState) => !prevState);
  };
  useEffect(() => {
    async function fetchData(query: string) {
      setLoading(true);
      try {
        const res = await searchSeries(query);
        setMovies(res.results);
        setError(""); // Clear previous errors
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    if (searchQuery.trim() !== "") {
      fetchData(searchQuery);
    } else {
      setMovies([]);
    }
  }, [searchQuery, searchSeries]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <nav className="md:px-8 py-4 px-4  fixed bg-transparent backdrop-blur-2xl z-50 border-b  border-gray-100/25 w-full ">
      <div className=" max-w-screen-2xl w-full  mx-auto flex justify-between items-center">
        <div className="flex   w-full justify-between items-center    text-white rounded-3xl">
          <Link href="/">
                      <h2 className="text-3xl font-bold flex ">Cinema Base</h2>
          </Link>
          <button
            className="text-2xl xl:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <FaBars />
          </button>
          <div className="xl:flex  hidden items-center gap-6">
            <ul className="flex  flex-row gap-6 justify-between items-center">
              <li>
                <Link href="/profile" className="text-xl">
                  <CgProfile />
                </Link>
              </li>
              <li>
                <Link href="/series" className="text-xl">
                  Series
                </Link>
              </li>
            </ul>
            <div className=" w-full bg-transparent backdrop-blur-3xl border border-white/30 rounded-full mt-0">
              <label className="glass borderGlass rounded-4xl flex items-center px-3 relative">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth={0}
                  viewBox="0 0 512 512"
                  className="inline text-white"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                </svg>
                <input
                  onChange={handleChange}
                  placeholder="Search Series"
                  className="p-2 bg-transparent placeholder:text-white rounded-4xl text-white text-sm placeholder:text-sm placeholder:font-semibold focus:outline-none"
                  type="text"
                />
              </label>
              {searchQuery.trim() && (
                <div className="relative z-[9999999999999999999999]">
                  <div className="absolute  z-50   top-full left-0 w-full  rounded-3xl backdrop-blur-lg mt-2 border border-[#ffffff1f]">
                    <div className="absolute top-0 left-0 w-full border-x border-[#ffffff1f] border-y-0 maxBlur rounded-b-3xl borderGlass" />
                    {loading && (
                      <p className="p-2 text-center text-white">Loading...</p>
                    )}
                    {error && (
                      <p className="p-2 text-center text-red-500">{error}</p>
                    )}
                    {!loading &&
                      !error &&
                      movies.slice(0, 3).map(
                        (movie) =>
                          movie?.poster_path && (
                            <Link
                              key={movie.id}
                              href={`/seriesDetails/${movie.id}`}
                              className="block z-[99999999999999] relative bg-transparent backdrop-blur-3xl"
                              passHref
                            >
                              <div className="flex gap-x-2 px-3 py-2 items-center rounded-b-3xl border-b border-[#ffffff1f]">
                                <img
                                  alt={movie.title}
                                  loading="lazy"
                                  width={50}
                                  height={50}
                                  className="rounded-lg"
                                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                />
                                <div className="flex flex-col justify-center items-start gap-x-2">
                                  <p className="text-white text-[12px]">
                                    {movie.name
                                      .split(" ")
                                      .slice(0, 3)
                                      .join(" ")}
                                  </p>
                                  <div className="flex items-center gap-x-1">
                                    <p className="text-white text-[12px]">
                                      <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth={0}
                                        viewBox="0 0 512 512"
                                        className="text-yellow-400 mb-1 inline"
                                        height="1em"
                                        width="1em"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M463 192H315.9L271.2 58.6C269 52.1 262.9 48 256 48s-13 4.1-15.2 10.6L196.1 192H48c-8.8 0-16 7.2-16 16 0 .9.1 1.9.3 2.7.2 3.5 1.8 7.4 6.7 11.3l120.9 85.2-46.4 134.9c-2.3 6.5 0 13.8 5.5 18 2.9 2.1 5.6 3.9 9 3.9 3.3 0 7.2-1.7 10-3.6l118-84.1 118 84.1c2.8 2 6.7 3.6 10 3.6 3.4 0 6.1-1.7 8.9-3.9 5.6-4.2 7.8-11.4 5.5-18L352 307.2l119.9-86 2.9-2.5c2.6-2.8 5.2-6.6 5.2-10.7 0-8.8-8.2-16-17-16z" />
                                      </svg>
                                      {movie.vote_average?.toFixed(1)}
                                    </p>
                                    <p className="text-white text-[12px]">
                                      | {movie.first_air_date}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          )
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div
            className={`fixed xl:hidden  inset-0 overflow-hidden ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            } z-50  bg-black/95 text-white backdrop-blur-2xl     h-screen transition-transform duration-300 ease-in-out transform xl:hidden`}
          >
              <nav className="flex flex-col items-center md:px-8 py-4 px-4  text-white justify-between gap-6">
                <button
                  className="text-white self-end h-10 w-10 flex  justify-center rounded-lg cursor-pointer"
                  onClick={toggleMenu}
                  aria-label="Close menu"
                >
                  <IoMdClose className="text-3xl" />
                </button>
                <ul className="flex  justify-between gap-6 items-center ">
                  <li>
                    <Link href="/profile" className="font-medium text-2xl ">
                      <CgProfile />
                    </Link>
                  </li>
                  <li>
                    <Link href="/series" className="font-medium  text-2xl ">
                      Series
                    </Link>
                  </li>
                </ul>
                <div className=" w-full bg-white backdrop-blur-3xl border border-white/30 rounded-full mt-0">
                  <label className="glass borderGlass rounded-4xl flex items-center px-3 relative">
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth={0}
                      viewBox="0 0 512 512"
                      className="inline text-black"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" />
                    </svg>
                    <input
                      onChange={handleChange}
                      placeholder="Search Series"
                      className="p-2 bg-transparent placeholder:text-black rounded-4xl text-black text-sm placeholder:text-sm placeholder:font-semibold focus:outline-none"
                      type="text"
                    />
                  </label>
                  {searchQuery.trim() && (
                    <div className="relative z-[9999999999999999999999]">
                      <div className="absolute  z-50   top-full left-0 w-full  rounded-3xl  bg-transparent backdrop-blur-3xl mt-2 border border-[#ffffff1f]">
                        <div className="absolute top-0 left-0 w-full border-x border-[#ffffff1f] border-y-0 maxBlur rounded-b-3xl borderGlass" />
                        {loading && (
                          <p className="p-2 text-center text-white">
                            Loading...
                          </p>
                        )}
                        {error && (
                          <p className="p-2 text-center text-red-500">
                            {error}
                          </p>
                        )}
                        {!loading &&
                          !error &&
                          movies.slice(0, 7).map(
                            (movie) =>
                              movie?.poster_path && (

                                <Link
                                  key={movie.id}
                                  href={`/seriesDetails/${movie.id}`}
                                  className="block z-[99999999999999] relative bg-transparent backdrop-blur-3xl"
                                  passHref
                                >
                                  <div className="flex gap-x-2 px-3 py-2 items-center  rounded-b-3xl border-b border-[#ffffff1f]">
                                    <img
                                      alt={movie.title}
                                      loading="lazy"
                                      width={50}
                                      height={50}
                                      className="rounded-lg"
                                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                    />
                                    <div className="flex flex-col justify-center items-start gap-x-2">
                                      <p className="text-white text-[12px]">
                                        {movie.name
                                          .split(" ")
                                          .slice(0, 3)
                                          .join(" ")}
                                      </p>
                                      <div className="flex items-center gap-x-1">
                                        <p className="text-white text-[12px]">
                                          <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth={0}
                                            viewBox="0 0 512 512"
                                            className="text-yellow-400 mb-1 inline"
                                            height="1em"
                                            width="1em"
                                            xmlns="http://www.w3.org/2000/svg"
                                          >
                                            <path d="M463 192H315.9L271.2 58.6C269 52.1 262.9 48 256 48s-13 4.1-15.2 10.6L196.1 192H48c-8.8 0-16 7.2-16 16 0 .9.1 1.9.3 2.7.2 3.5 1.8 7.4 6.7 11.3l120.9 85.2-46.4 134.9c-2.3 6.5 0 13.8 5.5 18 2.9 2.1 5.6 3.9 9 3.9 3.3 0 7.2-1.7 10-3.6l118-84.1 118 84.1c2.8 2 6.7 3.6 10 3.6 3.4 0 6.1-1.7 8.9-3.9 5.6-4.2 7.8-11.4 5.5-18L352 307.2l119.9-86 2.9-2.5c2.6-2.8 5.2-6.6 5.2-10.7 0-8.8-8.2-16-17-16z" />
                                          </svg>
                                          {movie.vote_average?.toFixed(1)}
                                        </p>
                                        <p className="text-white text-[12px]">
                                          | {movie.first_air_date}
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              )
                          )}
                      </div>
                    </div>
                  )}
                </div>
              </nav>

          </div>
        </div>
      </div>
    </nav>
  );
}
