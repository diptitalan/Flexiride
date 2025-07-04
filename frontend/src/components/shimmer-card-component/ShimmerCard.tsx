// src/components/loading-components/ShimmerCard.tsx
import React from 'react';

const ShimmerCard: React.FC = () => {
  return (
    <div className="animate-pulse bg-gray-200 rounded-md p-4">
      <div className="h-[180px] bg-gray-300 rounded-md mb-4" />
      <div className="h-4 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-300 rounded w-1/2 mb-2" />
      <div className="h-3 bg-gray-300 rounded w-1/4 mb-4" />
      <div className="h-10 bg-gray-300 rounded w-full mb-2" />
      <div className="h-8 bg-gray-300 rounded w-1/2 mx-auto" />
    </div>
  );
};

export default ShimmerCard;
