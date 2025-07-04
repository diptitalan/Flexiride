import React from 'react';
import Card from '../cars-display-component/Card';
import { Link } from 'react-router';
import {CarsDataType} from "../../../store/CarsData"

interface PopularCarsProps {
  data: CarsDataType[];
}

const PopularCars: React.FC<PopularCarsProps> = ({
  data
}) => {
  let filteredCars = data
    .filter((car) => car.carRating >= 4.5)
    .sort((a, b) => b.carRating - a.carRating);

  filteredCars = filteredCars.slice(0,4);
  return (
    <section className="px-4 py-10 bg-[#fffbf3] font-sans">
      <h2 className="text-base sm:text-lg text-[#5E5E5E] tracking-wide font-semibold mb-6 uppercase">
        Popular Cars
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredCars.map((card) => (
          <Card key={card.carId} {...card} />
        ))}
      </div>

      <div className="flex justify-center sm:justify-end mt-8">
        
          <Link to="/cars"
            className="text-base text-black underline font-bold hover:text-gray-800 transition"
          >
            View all cars
          </Link> 
      </div>
    </section>
  );
};

export default PopularCars;

