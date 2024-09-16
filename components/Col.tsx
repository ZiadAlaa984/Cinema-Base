import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const Col: React.FC<any> = ({
  kind,
  src,
  name,
  date,
  known,
  star,
  id,
}) => {
  // Determine the dynamic link path based on the `kind` prop
  const linkPath =
    kind === "tv"
      ? `/seriesDetails/${id}`
      : kind === "celebritie"
      ? `/celebritiesDetalis/${id}`
      : `/details/${id}`;

  return (
    <>
      {src && (
        <div key={id} className="col-span-1  cursor-pointer">
          <Link href={linkPath} passHref>
            <div className="inner p-2 xl:p-4 border rounded-xl bg-transparent backdrop-blur-3xl drop-shadow-xl overflow-hidden border-white/35">

              <Image
                src={`https://image.tmdb.org/t/p/w500/${src}`}
                alt={name}
                className="w-full min-h-[200px] md:min-h-[300px] object-cover rounded-xl group-hover/card:shadow-xl"
              />


              <div className="flex flex-col mt-2">
                <h5 className="font-semibold text-white text-[10px] md:text-lg">
                  {name}
                </h5>

                <div className="flex flex-row md:text-sm text-[8px] text-white items-center mt-1">

                  {star !== undefined && (
                    <>
                      <Star className="h-3 md:h-4 text-yellow-400 fill-yellow-400" />
                      <span className="mr-1">{star}</span> 
                      <span> { "  |  "}</span>
                    </>
                  )}
                  

                  <span className="ms-1"> {  known ? known : date}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
};

export default Col;
