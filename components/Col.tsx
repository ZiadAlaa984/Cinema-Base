import { Star } from "lucide-react";
import Link from "next/link";


const Col: React.FC<any> = ({
  kind,
  src,
  name,
  date,
  star,
  id,
}) => {
  return (
    <>
      {src && (
        <div key={id} className="col-span-1 cursor-pointer">
          <Link href={`/${kind === 'tv' ? 'seriesDetails' : 'details'}/${id}`} passHref>
            <div className="inner p-2 xl:p-4 border rounded-xl bg-transparent backdrop-blur-3xl drop-shadow-xl overflow-hidden border-white/35">
              <img
                src={`https://image.tmdb.org/t/p/w500/${src}`}
                alt={name}
                className="w-full min-h-[200px] md:min-h-[300px] lg:min-h-[400px] object-cover rounded-xl group-hover/card:shadow-xl"
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
                      {date && "  |  "}
                    </>
                  )}
                  <span className="ms-1">{date}</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      )}
    </>
  );
}

export default Col;
