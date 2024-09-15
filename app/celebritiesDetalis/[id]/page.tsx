"use client";
import { useParams } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { ApiContext } from "@/Context/ApiContext";
import ContainerWidth from "@/components/ContainerWidth";
import Detail from "@/components/Detail";
import Heading from "@/components/Heading";
import SliderCast from "@/components/Sliders/SliderCast/SliderCast";
import Loading from "@/components/loading/page";
import SliderMovie from "@/components/Sliders/SliderMovie/SliderMovie";

export default function CelebritiesDetails() {
  const { id } = useParams<{ id: string }>();
  const { CelebritieDetails }: any = useContext(ApiContext);

  const [celebrityDet, setCelebrityDet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async (id: string) => {
      setLoading(true);
      setError(null);

      try {
        if (CelebritieDetails) {
          const celebrityDetails = await CelebritieDetails(id);
          setCelebrityDet(celebrityDetails);
        } else {
          throw new Error("CelebritieDetails function not provided");
        }
      } catch (error: any) {
        setError(`Error fetching details: ${error.message || "Unknown error"}`);
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData(id);
    } else {
      setError("No celebrity ID provided");
      setLoading(false);
    }
  }, [CelebritieDetails, id]);

  if (loading) return <Loading />;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!celebrityDet) return <div>No data available</div>;

  const {
    profile_path,
    biography,
    known_for_department,
    birthday,
    name,
    gender,
    known_credits = 46,
  } = celebrityDet;

  return (
    <div className="pt-20">
      <ContainerWidth>
        <Heading text="Known as" />
        <div className="grid grid-cols-4 text-white gap-6">
          <div className="md:col-span-3 col-span-4 flex flex-col gap-3">
            <h2 className="text-3xl font-bold">{name}</h2>
            <div>
              <h3 className="text-xl font-medium">Biography</h3>
              <p className="mt-1">{biography || "Biography not available."}</p>
            </div>
            <h4 className="text-xl font-bold">Personal Info</h4>
            <div className="flex flex-wrap gap-3">
              <p className="text-[12px] bg-transparent text-2xl backdrop-blur-3xl border border-white/30 px-4 py-1 lg:text-sm mBlur borderGlass rounded-3xl inline-block font-medium">
                Known For : {known_for_department || "Acting"}
              </p>
              <p className="text-[12px] bg-transparent text-2xl backdrop-blur-3xl border border-white/30 px-4 py-1 lg:text-sm mBlur borderGlass rounded-3xl inline-block font-medium">
                Known Credits : {known_credits}
              </p>
              <p className="text-[12px] bg-transparent text-2xl backdrop-blur-3xl border border-white/30 px-4 py-1 lg:text-sm mBlur borderGlass rounded-3xl inline-block font-medium">
                Gender : {gender === 1 ? "Female" : "Male"}
              </p>
              <p className="text-[12px] bg-transparent text-2xl backdrop-blur-3xl border border-white/30 px-4 py-1 lg:text-sm mBlur borderGlass rounded-3xl inline-block font-medium">
                Birthday : {birthday || "Unknown"}
              </p>
            </div>
          </div>
          <div className="md:col-span-1  flex-1 col-span-4 flex md:justify-end justify-center">
            <div className="bg-transparent h-fit w-2/3 flex flex-col rounded-2xl gap-6 backdrop-blur-xl p-4">
              <img
                src={
                  profile_path
                    ? `https://image.tmdb.org/t/p/w500${profile_path}`
                    : ""
                }
                alt={name}
                className="w-full rounded-2xl"
              />
            </div>
          </div>
        </div>
        <div className="py-20 ">
              <SliderMovie id={id} />
               </div>
      </ContainerWidth>
    </div>
  );
}
