import React from "react";

interface AuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
}

const AuthButton: React.FC<AuthButtonProps> = ({ label, className = "", ...props }) => (
  <button
    {...props}
    className={`
      w-[216px]
      h-[46px]
      rounded-[30px]
      bg-[#d72828]
      text-white
      text-[14px]
      font-semibold
      hover:opacity-90
      transition
      flex
      items-center
      justify-center
      hover:cursor-pointer
      ${className}
    `}
  >
    {label}
  </button>
);


export default AuthButton;
