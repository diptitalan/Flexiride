import React, { useState } from "react";
import BookCarButton from "./BookCarButton";
import DateRangeSelector from "./DateRangeSelector";
import { useNavigate } from "react-router";
// import { useSelector } from "react-redux";
// import { RootState } from "../../store";
import AuthModal from "../car-selection-components/AuthModal";
import { SelectedCarType} from "../../types/SelectedCarType";

interface DisplayCarCharacteristicsProps {
  carDetails : SelectedCarType
}
 
const DisplayCarCharacteristics: React.FC<DisplayCarCharacteristicsProps> = ({carDetails}) => {
 
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
 
  const handleLogin = () => {
    setShowModal(false);
    navigate("/login");
  };
 
  return (
    <div className="lg:w-[40%] flex-1 flex flex-col p-4 bg-[#F0F0F0] rounded-lg min-w-0">
    {/* // <div className="lg:w-[40%] flex-1 flex flex-col p-4 bg-[#F0F0F0] rounded-lg min-w-0 w-full"> */}
      {/* Car Info */}
      <div className="mb-4 flex items-start justify-between flex-wrap">
      {/* <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"> */}
        <div className="flex flex-col">
          <div className="flex items-center gap-2 justify-between">
            <h2 className="text-2xl">{carDetails.model}</h2>
          </div>
          <p className="text-gray-500">{carDetails.location}</p>
        </div>
        <div className="flex items-center gap-1">
        {/* <div className="flex items-center gap-1 mt-2 sm:mt-0"> */}
          <span className="text-gray-500 text-sm py-2">{carDetails.carRating}</span>
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            xmlns="http://www.w3.org/2000/svg"
            className="w-2.5 h-2.5"
          >
            <path
              d="M4.04895 0.926638C4.34833 0.00537562 5.65167 0.0053761 5.95105 0.926639L6.34722 2.14577C6.4811 2.55776 6.86502 2.8367 7.29822 2.83672L8.58011 2.83676C9.5488 2.8368 9.95155 4.07635 9.16789 4.64576L8.13085 5.39927C7.78039 5.65391 7.63375 6.10525 7.7676 6.51725L8.16367 7.73641C8.46298 8.65769 7.40855 9.42378 6.62485 8.85443L5.58775 8.10099C5.23728 7.84638 4.76272 7.84638 4.41225 8.10099L3.37515 8.85443C2.59144 9.42378 1.53702 8.65769 1.83633 7.73641L2.23241 6.51725C2.36626 6.10525 2.21961 5.65391 1.86915 5.39927L0.832114 4.64576C0.0484526 4.07635 0.451207 2.8368 1.41989 2.83676L2.70178 2.83672C3.13498 2.8367 3.5189 2.55776 3.65278 2.14577L4.04895 0.926638Z"
              fill="#F8B334"
            />
          </svg>
        </div>
      </div>
 
      <hr className="border-t border-gray-300 mb-6" />
 
      {/* Characteristics */}
      <div className="flex justify-between gap-4">
        {/* Left Side */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 8C4.46957 8 3.96086 7.78929 3.58579 7.41421C3.21071 7.03914 3 6.53043 3 6C3 5.46957 3.21071 4.96086 3.58579 4.58579C3.96086 4.21071 4.46957 4 5 4C5.53043 4 6.03914 4.21071 6.41421 4.58579C6.78929 4.96086 7 5.46957 7 6C7 6.53043 6.78929 7.03914 6.41421 7.41421C6.03914 7.78929 5.53043 8 5 8ZM5 8V16M12 8C11.4696 8 10.9609 7.78929 10.5858 7.41421C10.2107 7.03914 10 6.53043 10 6C10 5.46957 10.2107 4.96086 10.5858 4.58579C10.9609 4.21071 11.4696 4 12 4C12.5304 4 13.0391 4.21071 13.4142 4.58579C13.7893 4.96086 14 5.46957 14 6C14 6.53043 13.7893 7.03914 13.4142 7.41421C13.0391 7.78929 12.5304 8 12 8ZM12 8V16M5 16C5.53043 16 6.03914 16.2107 6.41421 16.5858C6.78929 16.9609 7 17.4696 7 18C7 18.5304 6.78929 19.0391 6.41421 19.4142C6.03914 19.7893 5.53043 20 5 20C4.46957 20 3.96086 19.7893 3.58579 19.4142C3.21071 19.0391 3 18.5304 3 18C3 17.4696 3.21071 16.9609 3.58579 16.5858C3.96086 16.2107 4.46957 16 5 16ZM12 16C12.5304 16 13.0391 16.2107 13.4142 16.5858C13.7893 16.9609 14 17.4696 14 18C14 18.5304 13.7893 19.0391 13.4142 19.4142C13.0391 19.7893 12.5304 20 12 20C11.4696 20 10.9609 19.7893 10.5858 19.4142C10.2107 19.0391 10 18.5304 10 18C10 17.4696 10.2107 16.9609 10.5858 16.5858C10.9609 16.2107 11.4696 16 12 16ZM17 6C17 6.53043 17.2107 7.03914 17.5858 7.41421C17.9609 7.78929 18.4696 8 19 8C19.5304 8 20.0391 7.78929 20.4142 7.41421C20.7893 7.03914 21 6.53043 21 6C21 5.46957 20.7893 4.96086 20.4142 4.58579C20.0391 4.21071 19.5304 4 19 4C18.4696 4 17.9609 4.21071 17.5858 4.58579C17.2107 4.96086 17 5.46957 17 6Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M19 8V10C19 10.5304 18.7893 11.0391 18.4142 11.4142C18.0391 11.7893 17.5304 12 17 12H5"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-sm">{carDetails.gearBoxType}</p>
          </div>
 
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 11H15C15.5304 11 16.0391 11.2107 16.4142 11.5858C16.7893 11.9609 17 12.4696 17 13V16C17 16.3978 17.158 16.7794 17.4393 17.0607C17.7206 17.342 18.1022 17.5 18.5 17.5C18.8978 17.5 19.2794 17.342 19.5607 17.0607C19.842 16.7794 20 16.3978 20 16V9L17 6M4 20V6C4 5.46957 4.21071 4.96086 4.58579 4.58579C4.96086 4.21071 5.46957 4 6 4H12C12.5304 4 13.0391 4.21071 13.4142 4.58579C13.7893 4.96086 14 5.46957 14 6V20M3 20H15"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M18 7V8C18 8.26522 18.1054 8.51957 18.2929 8.70711C18.4804 8.89464 18.7348 9 19 9H20M4 11H14"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-sm">{carDetails.fuelType}</p>
          </div>
 
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5.636 19.3639C4.37734 18.1052 3.52019 16.5016 3.17293 14.7558C2.82567 13.0099 3.00391 11.2004 3.6851 9.55582C4.36629 7.9113 5.51984 6.50569 6.99988 5.51677C8.47992 4.52784 10.22 4 12 4C13.78 4 15.5201 4.52784 17.0001 5.51677C18.4802 6.50569 19.6337 7.9113 20.3149 9.55582C20.9961 11.2004 21.1743 13.0099 20.8271 14.7558C20.4798 16.5016 19.6227 18.1052 18.364 19.3639M16 8.99992L12 12.9999"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-sm">{carDetails.fuelConsumption}</p>
          </div>
        </div>
 
        {/* Right Side */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 10V16M12 5V8M10 5H14M5 13H3M6 10H8L10 8H13.382C13.5677 8.0001 13.7496 8.05188 13.9075 8.14955C14.0654 8.24722 14.193 8.38692 14.276 8.553L15.724 11.447C15.807 11.6131 15.9346 11.7528 16.0925 11.8504C16.2504 11.9481 16.4323 11.9999 16.618 12H18V10H20C20.2652 10 20.5196 10.1054 20.7071 10.2929C20.8946 10.4804 21 10.7348 21 11V17C21 17.2652 20.8946 17.5196 20.7071 17.7071C20.5196 17.8946 20.2652 18 20 18H18V16H15V18C15 18.2652 14.8946 18.5196 14.7071 18.7071C14.5196 18.8946 14.2652 19 14 19H10.535C10.3704 19 10.2084 18.9594 10.0632 18.8818C9.91808 18.8042 9.79435 18.6919 9.703 18.555L8 16H6V10Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-sm">{carDetails.engineCapacity}</p>
          </div>
 
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10 16V21M10 16H14M10 16L9 9M14 16V21M14 16L15 9M9 9H15M9 9C7.66667 9 6.33333 9.66667 5 11M15 9C16.3333 9 17.6667 9.66667 19 11M10 4C10 4.53043 10.2107 5.03914 10.5858 5.41421C10.9609 5.78929 11.4696 6 12 6C12.5304 6 13.0391 5.78929 13.4142 5.41421C13.7893 5.03914 14 4.53043 14 4C14 3.46957 13.7893 2.96086 13.4142 2.58579C13.0391 2.21071 12.5304 2 12 2C11.4696 2 10.9609 2.21071 10.5858 2.58579C10.2107 2.96086 10 3.46957 10 4Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-sm">{carDetails.passengerCapacity}</p>
          </div>
 
          <div className="flex items-center gap-2">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 12V3L16.912 4.914C17.1919 5.02302 17.438 5.20427 17.625 5.4393C17.8121 5.67432 17.9336 5.95472 17.9771 6.25196C18.0206 6.5492 17.9846 6.85265 17.8727 7.13143C17.7607 7.4102 17.5769 7.65435 17.34 7.839L12 12ZM12 12H21L19.086 16.912C18.977 17.1919 18.7957 17.438 18.5607 17.625C18.3257 17.8121 18.0453 17.9336 17.748 17.9771C17.4508 18.0206 17.1473 17.9846 16.8686 17.8727C16.5898 17.7607 16.3457 17.5769 16.161 17.34L12 12ZM12 12H3L4.914 7.088C5.02302 6.80808 5.20427 6.56205 5.4393 6.37495C5.67432 6.18785 5.95472 6.06638 6.25196 6.02288C6.5492 5.97939 6.85265 6.01544 7.13143 6.12735C7.4102 6.23927 7.65435 6.42305 7.839 6.66L12 12ZM12 12V21L7.088 19.086C6.80808 18.977 6.56205 18.7957 6.37495 18.5607C6.18785 18.3257 6.06638 18.0453 6.02288 17.748C5.97939 17.4508 6.01544 17.1473 6.12735 16.8686C6.23927 16.5898 6.42305 16.3457 6.66 16.161L12 12Z"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            <p className="text-sm">{carDetails.climateControlOption}</p>
          </div>
        </div>
      </div>
 
      {/* Date Picker */}
      <div className="mt-2">
        <DateRangeSelector />
      </div>
 
      {/* Book Button */}
      <div className="mt-2">
        <BookCarButton pricePerDay={carDetails.pricePerDay} onLoginRequired={() => setShowModal(true)} />
      </div>
 
      {/* Modal */}
      <AuthModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onLogin={handleLogin}
      />
    </div>
  );
};
 
export default DisplayCarCharacteristics;
 
 
