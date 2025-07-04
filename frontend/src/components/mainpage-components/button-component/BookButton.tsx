import React from 'react';

interface BookButtonProps {
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

const BookButton: React.FC<BookButtonProps> = ({ onClick, children = "Book the Car" ,  className = ''}) => {
  return (
    <button
      onClick={onClick}
      className={`w-full py-2 border border-black rounded-full font-medium text-black hover:bg-red-700 transition-colors duration-200 ${className}`}
    >
      {children}
    </button>
  );
};

export default BookButton;
