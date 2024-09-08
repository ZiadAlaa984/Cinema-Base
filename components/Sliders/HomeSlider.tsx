"use client";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./HomeSlider.css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { IoIosStar } from "react-icons/io";
import { Autoplay, EffectCoverflow, Pagination } from "swiper/modules";

import { ApiContext } from "@/Context/ApiContext";
import ContainerWidth from "../ContainerWidth";
import { Item } from "@/utils/Interface";
import Loading from "../loading/page";

function HomeSlider() {
  const { TopRated }: any = useContext(ApiContext);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [swiperInitialized, setSwiperInitialized] = useState<boolean>(false);

  useEffect(() => {
    async function fetchData() {
      if (TopRated) {
        try {
          const res = await TopRated();
          setItems(res.results);
          setLoading(false); // Data fetching completed
        } catch (error) {
          console.error("Error fetching top-rated movies:", error);
          setLoading(false); // Data fetching completed with error
        }
      } else {
        console.error("ApiContext or TopRated function is not defined.");
        setLoading(false); // Data fetching completed with no TopRated
      }
    }
    fetchData();
  }, [TopRated]);

  useEffect(() => {
    if (items.length > 0) {
      setSwiperInitialized(true);
    }
  }, [items]);

  if (loading) {
    return <Loading />;
  }

  return (
    <ContainerWidth>
      <div className="relative max-w-screen-lg md:max-w-screen-2xl mx-auto flex flex-col justify-center items-center h-[30vh]">
        <div className="w-full">
          {swiperInitialized && items.length > 0 ? (
            <Swiper
              effect={"coverflow"}
              centeredSlides={true}
              slidesPerView={"auto"}
              initialSlide={20}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 250,
                scale: 1,
                modifier: 1.5,
                slideShadows: true,
              }}
              pagination={{
                clickable: true,
              }}
              autoplay={{
                delay: 4000,
              }}
              modules={[EffectCoverflow, Pagination, Autoplay]}
              className="padding"
            >
              {items.map((item) => (
                <SwiperSlide key={item.id}>
                  {({ isActive }) => (
                    <Link href={`/details/${item.id}`}>
                      <div className="cursor-pointer">
                        <div className="relative">
                          <img
                            width={250}
                            height={250}
                            src={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}
                            alt={item.title}
                            className="md:max-w-[250px] md:max-h-[350px] rounded-2xl"
                          />
                        </div>
                        {isActive && (
                          <div>
                            <h3 className="mt-3 ml-3 text-start text-white font-medium lg:text-base text-sm">
                              {item.title || "No Title"}
                            </h3>
                            <div className="flex gap-x-1 ml-3 mt-2">
                              <IoIosStar className="text-yellow-400 text-xl mb-2" />
                              <p className="text-white text-sm font-medium">
                                {item.vote_average?.toFixed(1) || "N/A"}
                              </p>
                              <p className="text-white text-sm font-medium">
                                | {item.release_date?.slice(0, 4) || "N/A"}
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </Link>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : null}
        </div>
      </div>
    </ContainerWidth>
  );
}

export default HomeSlider;
