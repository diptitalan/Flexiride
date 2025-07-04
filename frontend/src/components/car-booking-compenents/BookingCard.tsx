import React from "react";
import { Link } from "react-router-dom";
import { Booking } from "../../types/BookingInfo";

type Props = {
  booking: Booking;
  onCancel: (id: number) => void;
  onFeedback: (id: number) => void;
};

const BookingCard: React.FC<Props> = ({ booking, onCancel, onFeedback }) => (
  <div className="bg-[#F7F5F0] rounded-lg shadow-sm p-4 flex flex-col relative">
    <span
      className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-sm border bg-white ${
        booking.status === "Cancelled"
          ? "border-red-600 text-red-600"
          : booking.status === "Service started"
          ? "border-blue-600 text-blue-600"
          : booking.status === "Booking finished"
          ? "border-yellow-600 text-yellow-600"
          : "border-green-600 text-green-600"
      }`}
    >
      {booking.status}
    </span>

    <img
      src={booking.image}
      alt={booking.car}
      className="w-full h-40 object-cover rounded-md mb-4"
    />
    <div className="flex-1">
      <h3 className="text-lg font-semibold mb-1">{booking.car}</h3>
      <p className="text-xs text-gray-500 mb-4">
        Order: {booking.order} ({booking.date})
      </p>
    </div>

    <div className="flex gap-2 mb-4">
      {(booking.status === "Reserved" ||
        booking.status === "Reserved by SA") && (
        <>
          <button
            onClick={() => onCancel(booking.id)}
            className="flex-1 text-sm py-2 rounded-full border border-gray-300 text-gray-700"
          >
            Cancel
          </button>
          <Link to={`/bookingCarPage`} className="flex-1">
            <button className="w-full text-sm py-2 bg-red-600 text-white rounded-full">
              Edit
            </button>
          </Link>
        </>
      )}

      {booking.status === "Service started" && (
        <Link to={`/modify-booking/${booking.id}`} className="w-full">
          <button className="text-sm py-2 bg-red-600 text-white rounded-full w-full">
            Edit
          </button>
        </Link>
      )}

      {(booking.status === "Service provided" ||
        booking.status === "Booking finished") && (
        <button
          onClick={() => onFeedback(booking.id)}
          className={`w-full text-sm py-2 rounded-full ${
            booking.feedback
              ? "border border-gray-400 text-gray-600 bg-transparent"
              : "bg-red-600 text-white"
          }`}
        >
          {booking.feedback ? "View feedback" : "Leave feedback"}
        </button>
      )}
    </div>

    <p className="text-xs text-gray-500 mt-auto">
      Have any questions?{" "}
      <Link to="#" className="underline">
        Support chat
      </Link>
    </p>
  </div>
);

export default BookingCard;
