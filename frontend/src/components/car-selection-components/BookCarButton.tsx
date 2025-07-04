import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router";
// import { default_price_per_day } from "../../store/Pricing";

type BookCarButtonProps = {
  onLoginRequired?: () => void;
  pricePerDay: number | string;
};

const BookCarButton: React.FC<BookCarButtonProps> = ({
  pricePerDay,
  onLoginRequired,
}) => {
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const login = Boolean(userInfo);

  const handleClick = () => {
    if (login) {
      navigate("/cars/booking-car");
    } else {
      onLoginRequired?.();
    }
  };

  return (
    <button
      type="button"
      className="w-full bg-[#CC1D1D] text-white py-3 rounded-3xl text-lg hover:cursor-pointer hover:bg-[#b31a1a] transition-all duration-200"
      onClick={handleClick}
    >
      Book the car - ${pricePerDay}/day
    </button>
  );
};

export default BookCarButton;
