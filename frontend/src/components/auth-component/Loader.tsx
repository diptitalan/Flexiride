import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#CC1D1D] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
