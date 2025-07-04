// import React from "react";
// import Card from "../../components/mainpage-components/cars-display-component/Card";
// import { CarsDataType } from "../../store/CarsData";

// interface CardPaginationProps {
//   data: CarsDataType[];
//   currentPage: number;
//   totalPages: number;
//   onPageChange: (page: number) => void;
// }

// const CardPagination: React.FC<CardPaginationProps> = ({
//   data,
//   currentPage,
//   totalPages,
//   onPageChange,
// }) => {
//   return (
//     <div className="px-4 py-8 bg-[#fffbf3] font-sans">
//       {/* Cards Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {data.map((car) => (
//           <Card key={car.carId} {...car} />
//         ))}
//       </div>

//       {/* Pagination Controls */}
//       <div className="flex justify-center items-center gap-2 pt-8 flex-wrap">
//         {/* Left Arrow */}
//         <button
//           onClick={() => onPageChange(currentPage - 1)}
//           disabled={currentPage === 1}
//           className="w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50 hover:bg-gray-200"
//         >
//           &larr;
//         </button>

//         {/* Page Numbers */}
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button
//             key={i}
//             onClick={() => onPageChange(i + 1)}
//             className={`w-8 h-8 text-sm rounded-full flex items-center justify-center transition-colors ${
//               currentPage === i + 1
//                 ? "bg-black text-white"
//                 : "text-black hover:bg-gray-200"
//             }`}
//           >
//             {i + 1}
//           </button>
//         ))}

//         {/* Right Arrow */}
//         <button
//           onClick={() => onPageChange(currentPage + 1)}
//           disabled={currentPage === totalPages}
//           className="w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50 hover:bg-gray-200"
//         >
//           &rarr;
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CardPagination;

// src/components/pagination-component/CardPagination.tsx
import React from "react";
import Card from "../../components/mainpage-components/cars-display-component/Card";
import ShimmerCard from "../shimmer-card-component/ShimmerCard";
import { CarsDataType } from "../../store/CarsData";

interface CardPaginationProps {
  data: CarsDataType[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}

const CardPagination: React.FC<CardPaginationProps> = ({
  data,
  currentPage,
  totalPages,
  onPageChange,
  loading,
}) => {
  return (
    <div className="px-4 py-8 bg-[#fffbf3] font-sans">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => <ShimmerCard key={i} />)
          : data.map((car) => <Card key={car.carId} {...car} />)}
      </div>

      {/* Pagination Controls */}
      {!loading && (
        <div className="flex justify-center items-center gap-2 pt-8 flex-wrap">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50 hover:bg-gray-200"
          >
            &larr;
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => onPageChange(i + 1)}
              className={`w-8 h-8 text-sm rounded-full flex items-center justify-center transition-colors ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "text-black hover:bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="w-8 h-8 flex items-center justify-center rounded-full disabled:opacity-50 hover:bg-gray-200"
          >
            &rarr;
          </button>
        </div>
      )}
    </div>
  );
};

export default CardPagination;


