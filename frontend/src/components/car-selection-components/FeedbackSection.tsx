import React from "react";
import "../../styles/FeedbackSection.css";
import { CarFeedback } from "../../types/CarFeedback";

interface FeedbackProps {
  feedbacks: CarFeedback[];
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  sortOption: string;
  setSortOption: (value: string) => void;
}

const FeedbackSection: React.FC<FeedbackProps> = ({
  feedbacks,
  currentPage,
  totalPages,
  setCurrentPage,
  sortOption,
  setSortOption,
}) => {
  return (
    <div className="bg-[#F0F0F0] mx-4 sm:mx-12 my-4 p-4 rounded-lg">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Feedback</h2>
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:ml-4 sm:justify-end mt-4 sm:mt-0">
          <p className="text-sm text-gray-600">Sort by</p>
          <select
          typeof="button"
            aria-label="Sort options"
            className="rounded px-2 py-1 text-sm"
            value={sortOption}
            onChange={(e) => {
              setSortOption(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="DATE-DESC">The newest</option>
            <option value="DATE-ASC">The oldest</option>
            <option value="RATING-ASC">Rating: low to high</option>
            <option value="RATING-DESC">Rating: high to low</option>
          </select>
        </div>
      </div>

      <hr className="border-t border-gray-300 mb-6" />

      {/* Feedback List */}
      <div className="space-y-6">
        {feedbacks.map((feedback, i) => (
          <div key={i} className="feedback-item">
            <div className="feedback-profile">
              <img
                src={feedback.authorImageUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover mb-1"
              />
              <span className="font-medium text-sm break-all text-center w-full sm:w-auto sm:text-left">
                {feedback.author}
              </span>
            </div>

            <div className="feedback-content">
              <div className="flex items-center gap-1 mb-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="10" height="10" viewBox="0 0 10 10">
                    <path
                      d="M4.04895 0.926638C4.34833 0.00537562 5.65167 0.0053761 5.95105 0.926639L6.34722 2.14577C6.4811 2.55776 6.86502 2.8367 7.29822 2.83672L8.58011 2.83676C9.5488 2.8368 9.95155 4.07635 9.16789 4.64576L8.13085 5.39927C7.78039 5.65391 7.63375 6.10525 7.7676 6.51725L8.16367 7.73641C8.46298 8.65769 7.40855 9.42378 6.62485 8.85443L5.58775 8.10099C5.23728 7.84638 4.76272 7.84638 4.41225 8.10099L3.37515 8.85443C2.59144 9.42378 1.53702 8.65769 1.83633 7.73641L2.23241 6.51725C2.36626 6.10525 2.21961 5.65391 1.86915 5.39927L0.832114 4.64576C0.0484526 4.07635 0.451207 2.8368 1.41989 2.83676L2.70178 2.83672C3.13498 2.8367 3.5189 2.55776 3.65278 2.14577L4.04895 0.926638Z"
                      fill={i < feedback.rentalExperience ? "#F8B334" : "#F0F0F0"}
                      stroke="#F8B334"
                      strokeWidth="0.5"
                    />
                  </svg>
                ))}
              </div>
              <p className="text-sm">{feedback.text}</p>
            </div>

            <div className="feedback-date" id="date">{feedback.date}</div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 pt-4">
        {currentPage > 1 && (
          <button
          type="button"
          aria-label="Previous"
            onClick={() => setCurrentPage(currentPage - 1)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.66667 16H25.3333M6.66667 16L12 10.6667M6.66667 16L12 21.3333"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}

        {Array.from({ length: totalPages }, (_, i) => (
          <button
          type="button"
          aria-label="Page number"
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-8 h-8 px-3 py-1 text-sm rounded-full transition-colors ${
              currentPage === i + 1
                ? "bg-black text-white"
                : "text-black hover:bg-gray-200"
            }`}
          >
            {i + 1}
          </button>
        ))}

        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200"
            type="button"
            aria-label="Next"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25.3333 16.0013H6.66663M25.3333 16.0013L20 21.3346M25.3333 16.0013L20 10.668"
                stroke="black"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default FeedbackSection;
