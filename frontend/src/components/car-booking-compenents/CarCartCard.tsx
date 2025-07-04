import React, { use } from "react";
import audiImage from "../../assets/images/audi.jpg";
import { useEffect } from "react";
const booking = {
  pickupLocation: "Kyiv Hayatt Hotel",
  dropoffLocation: "Kyiv Hayatt Hotel",
  pickupDate: "November 11 | 10:00",
  dropoffDate: "November 16 | 16:00",
  car: {
    name: "Audi A6 Quattro 2023",
    location: "Ukraine, Kyiv",
    image: audiImage,
    total: 900,
    deposit: 2000,
  },
  orderId: "32457 081124",
};
interface selectedCarInfo {
  selectedCarId: string | number;
  carName: string;
  carLocation: string;
  carImage: string;
  carPrice: number;
  carDeposit: number;
}
interface CarCartCardProps {
  data: selectedCarInfo;
  handleConfirmFun: () => void;
  totalPrice?: number;
}
const CarCartCard: React.FC<CarCartCardProps> = ({
  data,
  handleConfirmFun,
  totalPrice,
}) => {
  return (
    <>
      <div className="flex flex-col justify-start pt-10">
        <div className="max-w-sm w-full bg-white rounded-xl shadow-md overflow-hidden p-4">
          <img
            src={data.carImage}
            alt={data.carName}
            className="w-full h-40 object-cover rounded-lg"
          />
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900">
              {data.carName}
            </h3>
            <p className="text-sm text-gray-500">{data.carLocation}</p>
          </div>

          <div className="flex justify-between items-center mt-4 border-t pt-3">
            <div>
              <p className="text-sm font-semibold text-gray-900">Total</p>
              <p className="text-xs text-gray-400">
                Deposit: ${data.carDeposit}
              </p>
            </div>
            <p className="text-lg font-semibold text-gray-900">${data.carPrice}</p>
          </div>

          <button
            onClick={handleConfirmFun}
            className="mt-4 w-full bg-red-600 text-white text-sm font-semibold py-2.5 rounded-full hover:bg-red-700 transition-all"
            // disabled={}
          >
            Confirm reservation
          </button>
        </div>
      </div>
    </>
  );
};
export default CarCartCard;
