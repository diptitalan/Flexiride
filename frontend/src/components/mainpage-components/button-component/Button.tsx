import React from "react";

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
 
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
    
  return (
    <button
      onClick={onClick}
      className="bg-red-700 hover:bg-red-800 text-white font-semibold text-sm md:text-base rounded-full h-[42px] md:h-[42px] px-6 w-full md:w-full md:ml-2 ml-0 self-end md:self-end mt-4 md:mt-0 transition-colors duration-200 ease-in-out"
      // className="bg-red-700 hover:bg-red-800 text-white font-semibold text-sm md:text-base rounded-full h-[42px] px-6 transition-colors duration-200 ease-in-out"

    >
      {children}
    </button>
  );
};

export default Button;
