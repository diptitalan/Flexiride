import React from "react";
import { Booking } from "../../types/BookingInfo";

type Props = {
  booking: Booking;
  rating: number;
  comment: string;
  onClose: () => void;
  onSubmit: () => void;
  setRating: (r: number) => void;
  setComment: (c: string) => void;
};

const FeedbackModal: React.FC<Props> = ({
  booking,
  rating,
  comment,
  onClose,
  onSubmit,
  setRating,
  setComment,
}) => (
  <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/10 backdrop-blur-sm">
    <div className="bg-white p-6 rounded-md shadow-lg w-[400px] animate-fade">
      <h2 className="text-xl font-semibold mb-2">
        {booking.feedback ? "Your feedback" : "Leave feedback"}
      </h2>
      <p className="text-sm mb-4">{booking.car}</p>

      <div className="flex gap-1 mt-1">
        {[1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            type="button"
            onClick={() => !booking.feedback && setRating(num)}
            className="text-2xl focus:outline-none"
          >
            <span
              className={num <= rating ? "text-yellow-400" : "text-gray-300"}
            >
              ★
            </span>
          </button>
        ))}
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium">Review</label>
        {booking.feedback ? (
          <div className="w-full border mt-1 p-2 rounded bg-gray-100 text-gray-600">
            {comment || "No comment"}
          </div>
        ) : (
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add your comment"
            className="w-full border mt-1 p-2 rounded resize-none h-20"
          />
        )}
      </div>

      <div className="flex justify-end gap-4">
        <button
          onClick={onClose}
          className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
        >
          {booking.feedback ? "Close" : "Cancel"}
        </button>
        {!booking.feedback && (
          <button
            onClick={onSubmit}
            disabled={rating === 0 || comment.trim() === ""}
            className={`px-4 py-2 rounded ${
              rating === 0 || comment.trim() === ""
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-red-600 text-white hover:bg-red-700"
            }`}
          >
            Submit
          </button>
        )}
      </div>
    </div>
  </div>
);

export default FeedbackModal;
