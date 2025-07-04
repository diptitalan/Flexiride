import React from "react";

type Props = {
  onConfirm: () => void;
  onClose: () => void;
};

const CancelModal: React.FC<Props> = ({ onConfirm, onClose }) => (
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
          onClick={onConfirm}
          className="flex-1 py-2 border border-gray-300 rounded-full text-gray-800"
        >
          Cancel booking
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-2 bg-red-600 text-white rounded-full"
        >
          Resume booking
        </button>
      </div>
    </div>
  </div>
);

export default CancelModal;
