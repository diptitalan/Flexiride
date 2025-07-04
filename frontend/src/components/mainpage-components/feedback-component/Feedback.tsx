import React, { useEffect, useState } from "react";
import {FeedbackData } from "../../../store/FeedbackData";
import FeedbackCard from "./FeedbackCard";
import { ArrowLeft, ArrowRight } from "lucide-react";
 
interface FeedbackProps {
  data : FeedbackData[];
}
 
const Feedback: React.FC<FeedbackProps> = ({data}) => {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
 
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1);
      else if (width < 1024) setVisibleCount(2);
      else setVisibleCount(3);
    };
 
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
 
 
  const handleNext = () => {
    setStartIndex((prev) => (prev + visibleCount) % data.length);
  };
 
  const handlePrev = () => {
    setStartIndex((prev) =>
      (prev - visibleCount + data.length) % data.length
    );
  };
 
  const visibleFeedbacks = data.slice(
    startIndex,
    startIndex + visibleCount
  );
 
  return (
    <div className="bg-[#fffbf3] px-4 md:px-6 pt-28 font-sans mt-12 ">
      <h2 className="text-xl text-gray-600 mb-6">(RECENT FEEDBACK)</h2>
      <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
        {visibleFeedbacks.map((item) => (
         
            <FeedbackCard data={item} />
         
        ))}
       
      </div>
 
      <div className="flex justify-center md:justify-end mt-6 gap-2">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-200"
          aria-label="Previous"
          type="button"
        >
          <ArrowLeft size={16} />
        </button>
        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-200"
          aria-label="Next"
          type="button"
        >
          <ArrowRight size={16} />
        </button>
      </div>
      </div>
    </div>
  );
};
 
export default Feedback;