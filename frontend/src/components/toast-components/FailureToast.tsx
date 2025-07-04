import { useEffect } from "react";
import { X } from "lucide-react";

interface FailureToastProps {
  message: string;
  subMessage?: string;
  isOpen: boolean;
  onClose: () => void;
  autoClose?: boolean;
  autoCloseTime?: number;
}

const FailureToast = ({
  message = "Operation failed",
  subMessage = "Something went wrong. Please try again.",
  isOpen,
  onClose,
  autoClose = true,
  autoCloseTime = 5000,
}: FailureToastProps) => {
  useEffect(() => {
    let timer: number | undefined;
    if (isOpen && autoClose) {
      timer = window.setTimeout(() => {
        onClose();
      }, autoCloseTime);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isOpen, autoClose, autoCloseTime, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md px-4 animate-fade-in">
      <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start shadow-lg">
        <div className="flex-shrink-0 mt-1">
          <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
            <X className="h-4 w-4 text-white" />
          </div>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-semibold text-red-800">{message}</h3>
          <p className="text-sm text-red-700">{subMessage}</p>
        </div>
        <div className="ml-auto pl-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex text-gray-400 hover:text-gray-600"
          >
            <span className="sr-only">Close</span>
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FailureToast;
