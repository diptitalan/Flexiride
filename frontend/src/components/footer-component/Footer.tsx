import React from "react";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import Logo from "../logo-component/Logo";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Footer: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const isLogin: boolean = Boolean(userInfo?.idToken);
  const role = userInfo?.role;

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-black font-medium relative pb-[4px] hover:opacity-80 text-lg md:text-base sm:text-sm ${
      isActive
        ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-[#cc0000] after:rounded"
        : ""
    }`;

  return (
    <footer className="bg-[#fdf8f1] py-6 px-4 border-t font-sans mt-6">
      <div className="w-full flex flex-col md:flex-row items-center md:items-start text-gray-700 gap-6 md:gap-0">
        {/* Left - Logo */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-start items-center">
          <Logo />
        </div>

        {/* Center - Links */}
        <div className="w-full md:w-1/3 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-6 text-black">
          {role === "Admin" ? (
            <NavLink to="/admin" className={navLinkClass}>
              Dashboard
            </NavLink>
          ) : (
            <>
              {role === "Support" ? (
                <NavLink to="/bookings" className={navLinkClass}>
                  Bookings
                </NavLink>
              ) : (
                <NavLink to="/" className={navLinkClass}>
                  Home
                </NavLink>
              )}
              <NavLink to="/cars" className={navLinkClass}>
                Cars
              </NavLink>
              {isLogin && role === "Client" && (
                <NavLink to="/mybookings" className={navLinkClass}>
                  My Bookings
                </NavLink>
              )}
              {isLogin && role === "Support" && (
                <NavLink to="/clients" className={navLinkClass}>
                  Clients
                </NavLink>
              )}
            </>
          )}
        </div>

        {/* Right - Social Icons */}
        <div className="w-full md:w-1/3 flex justify-center md:justify-end gap-4 text-black text-lg">
          <a href="#" aria-label="Facebook">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="X">
            <FaXTwitter />
          </a>
        </div>
      </div>

      {/* Bottom - Copyright */}
      <div className="text-center text-gray-500 text-xs mt-6">
        ©2025 FlexiRide
      </div>
    </footer>
  );
};

export default Footer;
