import Image from "next/image";
import bg from "../../public/bg.png";
import HomeSlider from "../Sliders/HomeSlider";

export default function MainSlider() {
  return (
    <section className="relative  w-full h-[65vh] ">
      <Image
        src={bg}
        alt="Background Image"
        layout="fill"
        className="absolute md:object-cover object-contain opacity-25 inset-0"
      />
      <div className="absolute inset-0 w-full  overflow-hidden    bg-opacity-50 flex items-center justify-center">
          <HomeSlider />
      </div>
    </section>
  );
}
