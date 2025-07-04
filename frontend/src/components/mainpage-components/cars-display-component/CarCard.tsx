

import React from 'react';
import CardPagination from '../../pagination-component/CardPagination';
import {CarsDataType} from "../../../store/CarsData"

interface CarData {
  id: number;
  name: string;
  location: string;
  pricePerDay: number;
  rating: number;
  status: string;
  imageUrl: string;
}

interface CarCardProps {
  CarsData: CarsDataType[];
}

const CarCard: React.FC<CarCardProps> = ({ CarsData }) => {
  return (
    <div className="w-full bg-[#fffbf3] py-8 px-4 sm:px-6 md:px-8 font-sans">
      {/* <h2 className="text-base sm:text-lg text-[#5E5E5E] tracking-wide font-semibold mb-6 uppercase">
        All Cars
      </h2> */}
    <CardPagination data={CarsData}/>  
    </div>
  );
};

export default CarCard;

