import { Star } from "lucide-react";
import React from "react";

interface RatingStarsProps {
  rating?: number;
}
 
const RatingStars: React.FC<RatingStarsProps> = ({ rating = 0}) => {
  const roundedRating = Math.max(0, Math.min(5, Math.round(rating)));  // round to nearest integer
  const fullStars = roundedRating;
  const emptyStars = 5 - fullStars;

  return (
    <div className="flex gap-1 text-yellow-500 text-xs">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} size={14} fill="currentColor" stroke="none" />
      ))}
      {[...Array(emptyStars)].map((_, i) => (
        <Star
          key={`empty-${i}`}
          size={14}
          fill="none"
          stroke="currentColor"
          className="text-yellow-500"
        />
      ))}
    </div>
  );
};

export default RatingStars;
