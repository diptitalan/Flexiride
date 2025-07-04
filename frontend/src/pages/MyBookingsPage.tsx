import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../components/header-component/Header";
import Footer from "../components/footer-component/Footer";
import { BookingInfo } from "../types/BookingInfo";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import carImage from "../assets/images/car1.jpg";
import ShimmerCard from "../components/shimmer-card-component/ShimmerCard";
import SuccessToast from "../components/toast-components/SuccessToast";
import FailureToast from "../components/toast-components/FailureToast";
import { setSelectedCar } from "../store/slices/carSelectionSlice";

const ShimerPage: React.FC = () => (
  <>
    <ShimmerCard />
    <ShimmerCard />
    <ShimmerCard />
    <ShimmerCard />
  </>
);

const tabs = [
  "All bookings",
  "Reserved",
  "Reserved by SA",
  "Service started",
  "Service provided",
  "Booking finished",
  "Canceled",
];

const MyBookingsPage = () => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [bookings, setBookings] = useState<BookingInfo[]>([]);
  const [cancelModal, setCancelModal] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<BookingInfo | null>(
    null
  );
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrors] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [successToast, setSuccessToast] = useState(false);
  const [failureToast, setFailureToast] = useState(false);

  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const userId = userInfo?.userId;

  const fetchBookingInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get<{
        data: { content: BookingInfo[] };
      }>(
        `https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/bookings/${userId}`
      );
      setBookings(response.data.data.content);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching booking data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo) fetchBookingInfo();
  }, [userInfo]);

  const filtered =
    activeTab === "All bookings"
      ? bookings
      : bookings.filter(
          (b) => b.bookingStatus.toLowerCase() === activeTab.toLowerCase()
        );

  const handleCancelClick = (bookingId: string) => {
    const booking = bookings.find((b) => b.bookingId === bookingId) || null;
    setSelectedBooking(booking);
    setCancelModal(true);
  };

  const handleCancelConfirm = async () => {
    setSuccessMessage("");
    const url =
      "https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/bookings/cancel";
    try {
      const response = await axios.delete(url, {
        data: {
          bookingId: selectedBooking?.bookingId,
        },
        headers: {
          Authorization: `Bearer ${userInfo?.idToken}`,
        },
      });

      if (response.status !== 200) {
        setErrors(response.data.message);
        setFailureToast(true);
        setCancelModal(false);
      } else {
        setSuccessMessage(response.data.message);
        setSuccessToast(true);
        setCancelModal(false);
        await fetchBookingInfo(); // Refresh data
      }
    } catch (err: any) {
      console.error("Error cancelling booking:", err);
      setErrors(err.response?.data?.message || "Error cancelling booking");
      setFailureToast(true);
      setCancelModal(false);
    }
  };

  const handleCancelClose = () => {
    setSelectedBooking(null);
    setCancelModal(false);
  };
  const handleEditClick = (carId: string) => {
    console.log("Edit carId:", carId);
    dispatch(setSelectedCar({ selectedCarId: carId }));
  };

  const handleFeedbackClick = (bookingId: string) => {
    const booking = bookings.find((b) => b.bookingId === bookingId) || null;
    setSelectedBooking(booking);
    if (booking?.feedback) {
      setRating(booking.feedback.rating);
      setComment(booking.feedback.comment);
    } else {
      setRating(0);
      setComment("");
    }
    setFeedbackModal(true);
  };

  const handleFeedbackSubmit = async () => {
    if (!rating || !comment || !selectedBooking) return;

    const feedbackPayload = {
      bookingId: selectedBooking.bookingId,
      carId: selectedBooking.carId,
      clientId: userId,
      feedbackText: comment,
      rating: rating.toFixed(1),
    };

    try {
      const response = await axios.post(
        "https://o8zynirqvc.execute-api.ap-northeast-3.amazonaws.com/dev/feedbacks",
        feedbackPayload,
        {
          headers: {
            Authorization: `Bearer ${userInfo?.idToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      setBookings((prev) =>
        prev.map((b) =>
          b.bookingId === selectedBooking.bookingId
            ? {
                ...b,
                feedback: { rating, comment },
              }
            : b
        )
      );

      setSuccessMessage(response.data.data.systemMessage);
      setSuccessToast(true);
      setFeedbackModal(false);
      setSelectedBooking(null);
      setRating(0);
      setComment("");
      await fetchBookingInfo(); // Refresh data
    } catch (err: any) {
      setErrors(err.response?.data?.message || "Error submitting feedback");
      setFailureToast(true);
    }
  };

  return (
    <div className="bg-[#FFFCF7] min-h-screen flex flex-col text-sm">
      <Header />
      <main className="flex-grow w-full px-8 py-6">
        <h1 className="text-4xl font-bold mb-6">My bookings</h1>

        {successToast && (
          <SuccessToast
            message={successMessage}
            subMessage=""
            isOpen={successToast}
            onClose={() => setSuccessToast(false)}
            autoClose
            autoCloseTime={4000}
          />
        )}
        {failureToast && (
          <FailureToast
            message={errorMessage}
            subMessage="Please try again."
            isOpen={failureToast}
            onClose={() => setFailureToast(false)}
            autoClose
            autoCloseTime={4000}
          />
        )}

        {/* Tabs */}
        <div className="flex gap-6 text-sm mb-6 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-1 whitespace-nowrap ${
                activeTab === tab
                  ? "text-gray-900 font-semibold border-b-2 border-red-600"
                  : "text-gray-500"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Booking Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <ShimerPage />
          ) : (
            filtered.map((b) => (
              <div
                key={b.bookingId}
                className="bg-[#F7F5F0] rounded-lg shadow-sm p-4 flex flex-col relative"
              >
                <span
                  className={`absolute top-2 left-2 text-xs font-semibold px-2 py-0.5 rounded-sm border bg-white ${
                    b.bookingStatus === "CANCELED"
                      ? "border-red-600 text-red-600"
                      : b.bookingStatus === "Service started"
                      ? "border-blue-600 text-blue-600"
                      : b.bookingStatus === "Booking finished"
                      ? "border-yellow-600 text-yellow-600"
                      : "border-green-600 text-green-600"
                  }`}
                >
                  {b.bookingStatus}
                </span>

                <img
                  src={carImage}
                  alt={b.carModel}
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-semibold mb-1">{b.carModel}</h3>
                  <p className="text-xs text-gray-500 mb-4">{b.orderDetails}</p>
                </div>

                <div className="flex gap-2 mb-4">
                  {(b.bookingStatus === "RESERVED" ||
                    b.bookingStatus === "RESERVED BY SA") && (
                    <>
                      <button
                        onClick={() => handleCancelClick(b.bookingId)}
                        className="flex-1 text-sm py-2 rounded-full border border-gray-300 text-gray-700"
                      >
                        Cancel
                      </button>
                      <Link
                        to={`/modify-booking/${b.bookingId}`}
                        className="flex-1"
                      >
                        <button
                          className="w-full text-sm py-2 bg-red-600 text-white rounded-full"
                          onClick={() => handleEditClick(b.carId)}
                        >
                          Edit
                        </button>
                      </Link>
                    </>
                  )}

                  {b.bookingStatus === "SERVICE STARTED" && (
                    <Link
                      to={`/modify-booking/${b.bookingId}`}
                      className="w-full"
                    >
                      <button
                        className="text-sm py-2 bg-red-600 text-white rounded-full w-full"
                        onClick={() => handleEditClick(b.carId)}
                      >
                        Edit
                      </button>
                    </Link>
                  )}

                  {(b.bookingStatus === "SERVICE PROVIDED" ||
                    b.bookingStatus === "BOOKING FINISHED") && (
                    <button
                      onClick={() => handleFeedbackClick(b.bookingId)}
                      className={`w-full text-sm py-2 rounded-full ${
                        b.feedback
                          ? "border border-gray-400 text-gray-600 bg-transparent"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {b.feedback ? "View feedback" : "Leave feedback"}
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
            ))
          )}
        </div>
      </main>

      <Footer />

      {/* Cancel Modal */}
      {cancelModal && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/10 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-md shadow-lg w-[350px] text-center space-y-4">
            <h2 className="text-lg font-semibold">Cancel booking?</h2>
            <p className="text-sm text-gray-600">
              You are about to cancel your booking.
              <br />
              Are you sure you want to proceed?
            </p>
            <div className="flex justify-between gap-3 pt-2">
              <button
                onClick={handleCancelConfirm}
                className="flex-1 py-2 border border-gray-300 rounded-full text-gray-800"
              >
                Cancel booking
              </button>
              <button
                onClick={handleCancelClose}
                className="flex-1 py-2 bg-red-600 text-white rounded-full"
              >
                Resume booking
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Feedback Modal */}
      {feedbackModal && selectedBooking && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/10 backdrop-blur-sm">
          <div className="bg-white p-6 rounded-md shadow-lg w-[400px] animate-fade">
            <h2 className="text-xl font-semibold mb-2">
              {selectedBooking.feedback ? "Your feedback" : "Leave feedback"}
            </h2>
            <p className="text-sm mb-4">{selectedBooking.carModel}</p>

            <div className="flex gap-1 mt-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => {
                    if (!selectedBooking.feedback) setRating(num);
                  }}
                  className="text-2xl focus:outline-none"
                >
                  <span
                    className={
                      num <= rating ? "text-yellow-400" : "text-gray-300"
                    }
                  >
                    ★
                  </span>
                </button>
              ))}
            </div>

            <div className="mb-4">
              <label className="text-sm font-medium">Review</label>
              {selectedBooking.feedback ? (
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
                onClick={() => setFeedbackModal(false)}
                className="border border-gray-300 px-4 py-2 rounded hover:bg-gray-100"
              >
                {selectedBooking.feedback ? "Close" : "Cancel"}
              </button>
              {!selectedBooking.feedback && (
                <button
                  onClick={handleFeedbackSubmit}
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
      )}
    </div>
  );
};

export default MyBookingsPage;
