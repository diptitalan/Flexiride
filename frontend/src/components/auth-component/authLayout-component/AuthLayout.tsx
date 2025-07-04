import React, { ReactNode } from "react";
import carImage from "../../../assets/images/bg-car.png";

interface AuthLayoutProps {
  children: ReactNode;
  imageVisibleOnDesktop?: boolean;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  imageVisibleOnDesktop = true,
}) => {
  return (
    <div className="flex h-screen overflow-hidden bg-[#fff8f1]">
      {imageVisibleOnDesktop && (
        <div className="hidden md:flex flex-1">
          <img src={carImage} alt="Car" className="w-full h-full object-cover" />
        </div>
      )}
      <div className="flex flex-1 items-center justify-center p-10 md:p-16 bg-[#fff8f1]">
        <div className="w-full flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
