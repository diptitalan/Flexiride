import React, { useState } from "react";
import BookButton from "../button-component/BookButton";
import DetailsButton from "../button-component/DetailsButton";
import staticImage from "../../../assets/images/car1.jpg";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../../../store/index";
import {
  setSelectedCar,
  clearSelectedCar,
} from "../../../store/slices/carSelectionSlice";
import { useNavigate } from "react-router";

interface CardProps {
  carId: number | string;
  model: string;
  location: string;
  pricePerDay: string;
  carRating: number;
  status: string;
  imageUrl: string;
  serviceRating: number;
}

const Card: React.FC<CardProps> = ({
  carId,
  model,
  location,
  pricePerDay,
  carRating,
  imageUrl,
  status,
}) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const login = Boolean(userInfo);
  return (
    <div
      className={
        modalOpen
          ? ""
          : "transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg"
      }
    >
      <div
        key={carId}
        className="flex flex-col justify-between bg-[#F9F9F9] rounded-sm shadow-sm p-4 w-auto h-[388px]"
      >
        {/* Image */}
        <div className="relative rounded-xl overflow-hidden">
          <img
            src={imageUrl || staticImage}
            alt={model}
            className="w-full h-[200px] object-cover"
          />
          <span className="absolute top-2 left-2 bg-white text-gray-800 text-sm px-2 py-1 rounded-md shadow">
            {status}
          </span>
        </div>

        {/* Main Text */}
        <div>
          <div className=" flex justify-between">
            <div>
              <p className="text-md font-semibold text-gray-900 line-clamp-2 flex items-center">
                {model.slice(0, model.indexOf("("))}
              </p>
            </div>

            <div className="flex text-sm text-gray-600 gap-1 items-center">
              <span>{carRating}</span>
              <span className="text-yellow-500">★</span>
            </div>
          </div>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
        <div className="">
          <BookButton
            onClick={() => {
              dispatch(setSelectedCar({ selectedCarId: carId }));
              {
                login ? navigate("/cars/booking-car") : navigate("/login");
              }
            }}
            className="w-full py-2 border border-black rounded-full text-sm font-semibold hover:bg-black hover:text-white transition"
          >
            Book the car - ${pricePerDay}/day
          </BookButton>

          <div
            className="mt-2 flex justify-center"
            onClick={() => dispatch(setSelectedCar({ selectedCarId: carId }))}
          >
            <DetailsButton
              modalStateData={{ modalOpen, setModalOpen }}
              onClick={() => console.log("Details button clicked")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
