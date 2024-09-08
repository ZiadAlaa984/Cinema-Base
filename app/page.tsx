import ContainerWidth from "@/components/ContainerWidth";
import Footer from "@/components/Footer";
import Filter from "@/components/LandingPage/Filter";
import MainSlider from "@/components/LandingPage/MainSlider";
import Title from "@/components/LandingPage/Title";
import TopRated from "@/components/LandingPage/TopRated";
import WhatPopular from "@/components/LandingPage/WhatPopular";
import Loading from "@/components/loading/page";
import Image from "next/image";

export default function Home() {
  return (
    <>

      <ContainerWidth>
        <Title />
      </ContainerWidth>
      <MainSlider />
      <ContainerWidth>
        <Filter />
        <WhatPopular />
        <TopRated />
         <Footer/>
      </ContainerWidth>

    </>
  );
}
