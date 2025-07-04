import React from "react";
import {FeedbackData} from "../../../store/FeedbackData";
 
import car1 from '../../../assets/images/car1.jpg';
import RatingStars from "../../star-rating-component/RatingStars";
 
interface FeedbackCardProps {
  data: FeedbackData;
}
 
const FeedbackCard: React.FC<FeedbackCardProps> = ({ data }) => {
  return (
    <div className="flex flex-col sm:flex-row border rounded-md w-full h-full p-4 gap-4 shadow-sm font-sans bg-[#fffbf3] min-h-[250px]">
      {/* Image */}
      <div className="w-full sm:w-[100px] h-[180px] sm:h-[100px] flex-shrink-0">
        <img
          src={car1}
          alt={data.carModel}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
 
      {/* Text Details */}
      <div className="flex flex-col justify-between flex-grow text-sm space-y-2 overflow-hidden">
        <div>
          <h3 className="text-base font-semibold">{data.carModel}</h3>
          <p className="text-xs text-gray-500">Order history: {data.orderHistory}</p>
        </div>
 
        {/* <div className="flex gap-1 text-yellow-500 text-xs">
          {[...Array(data.rating)].map((_, i) => (
            <Star key={i} size={14} fill="currentColor" stroke="none" />
          ))}
        </div> */}
        <RatingStars rating={data.rating} />
 
        <p className="text-sm text-gray-700 line-clamp-3">{data.feedbackText}</p>
 
        <div className="flex justify-between text-xs text-gray-600">
          <span>{data.author}, {data.location}</span>
          <span>{data.date}</span>
        </div>
      </div>
    </div>
  );
};
 
export default FeedbackCard;