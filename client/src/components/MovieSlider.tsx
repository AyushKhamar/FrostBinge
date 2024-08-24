import { useEffect, useRef, useState } from "react";
import { useContentStore } from "../store/content.ts";
import axios from "axios";
import { Link } from "react-router-dom";
import { SMALL_IMAGE_BASE_URL } from "../utils/constants.ts";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface MovieSliderProps {
  category: string;
}
export const MovieSlider = ({ category }: MovieSliderProps) => {
  const [content, setContent] = useState([]);
  const { contentType } = useContentStore();
  const formattedContentType = contentType === "movie" ? "Movies" : "Tv Shows";
  const formattedCategoryName =
    category.replace(/_/g, " ")[0].toUpperCase() +
    category.replace(/_/g, " ").slice(1);
  const [showArrows, setShowArrows] = useState(false);
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const scrollLeft = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };
  const scrollRight = () => {
    if (sliderRef.current)
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: "smooth",
      });
  };
  useEffect(() => {
    const getContent = async () => {
      const res = await axios.get(`/api/v1/${contentType}/${category}`);
      setContent(res.data.content);
    };

    getContent();
  }, [contentType, category]);
  return (
    <div
      className="text-white bg-black relative px-5 md:px-20"
      onMouseEnter={() => {
        setShowArrows(true);
      }}
      onMouseLeave={() => {
        setShowArrows(false);
      }}
    >
      <h2 className="mb-4 text-2xl font-bold">
        {formattedCategoryName} {formattedContentType}
      </h2>
      <div
        className="flex space-x-4 overflow-x-scroll scrollbar-hide"
        ref={sliderRef}
      >
        {content.map((item: any) => {
          return (
            <Link
              to={`/watch/${item.id}`}
              className="min-w-[250px] relative group"
              key={item.id}
            >
              <div className="rounded-lg overflow-hidden">
                <img
                  src={SMALL_IMAGE_BASE_URL + item.backdrop_path}
                  alt="movie image"
                  className="transition-transform duration-300 ease-in-out group-hover:scale-125"
                />
                <p className="mt-2 text-center">{item.title || item.name}</p>
              </div>
            </Link>
          );
        })}
      </div>
      {showArrows && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-5 md:left-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            "
            onClick={scrollLeft}
          >
            <ChevronLeft size={24} />
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 right-5 md:right-24 flex items-center justify-center
            size-12 rounded-full bg-black bg-opacity-50 hover:bg-opacity-75 text-white z-10
            "
            onClick={scrollRight}
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}
    </div>
  );
};
