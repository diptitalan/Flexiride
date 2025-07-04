import React, { useState, useEffect, useRef } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import Logo from "../logo-component/Logo";
import Bellicon from "../../assets/icons/Bellicon";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import profile from "../../assets/images/profile.jpg";
import { clearUserInfo } from "../../store/slices/userSlice";

const Header: React.FC = () => {
  const userInfo = useSelector((state: RootState) => state.user.userInfo);
  const login = Boolean(userInfo);
  const role = userInfo?.role;
  const username = userInfo?.username;
  const userImgURL = userInfo?.userImageUrl || profile;

  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleLanguageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLanguage(e.target.value);
  };

  const handleLogout = () => {
    dispatch(clearUserInfo());
    setDropdownOpen(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-black  font-normal relative pb-[2px] hover:opacity-80 ${
      isActive
        ? "after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-[#cc0000] after:rounded"
        : ""
    }`;

  return (
    <header className="bg-[#fffbf3] font-sans w-full border-b border-gray-300 relative z-50">
      <div className="flex justify-between items-center h-[50px] px-4">
        {/* Left: Logo */}
        <div className="flex items-center gap-4 flex-shrink-0 min-w-[100px]">
          <Logo />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-8 flex-shrink-0">
          {role === "Admin" ? (
            <NavLink to="/admin" className={navLinkClass}>
              Dashboard
            </NavLink>
          ) : (
            <>
              {role === "Client" && (
                <NavLink to="/" className={navLinkClass}>
                  Home
                </NavLink>
              )}
              {role === "Support" && (
                <NavLink to="/bookings" className={navLinkClass}>
                  Bookings
                </NavLink>
              )}
              {
                <NavLink to="/cars" className={navLinkClass}>
                  Cars
                </NavLink>
              }
              {role === "Client" && login && (
                <NavLink to="/mybookings" className={navLinkClass}>
                  My Bookings
                </NavLink>
              )}
              {role === "Support" && login && (
                <NavLink to="/clients" className={navLinkClass}>
                  Clients
                </NavLink>
              )}
            </>
          )}
        </nav>

        {/* Right Side: Profile/Login/Language */}
        <div className="flex items-center gap-4 text-sm whitespace-nowrap">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-sm px-3 py-1 rounded hover:bg-gray-100"
          >
            <FaBars />
          </button>

          {/* Desktop User Info */}
          {!login ? (
            <Link
              to="/login"
              className="hidden md:block text-black hover:underline"
            >
              Log in
            </Link>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <img
                src={userImgURL}
                alt="user"
                className="w-[28px] h-[28px] rounded-full object-cover"
              />
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1 hover:text-[#CC1D1D]"
                >
                  Hello, {username} ({role})
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 py-2 bg-[#FFFBF3] border border-gray-200 rounded-sm shadow-lg z-50 w-40">
                    <div className="px-2">
                      <Link
                        to="/dashboard"
                        className="block px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-black hover:text-white"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                    </div>

                    <div className="px-2">
                      <Link
                        to="/my-profile"
                        className="block px-4 py-2 rounded-lg text-sm text-gray-700 hover:bg-black hover:text-white"
                        onClick={() => setDropdownOpen(false)}
                      >
                        My Profile
                      </Link>
                    </div>
                    {/* <Link
                      to="/myprofile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-black hover:text-white"
                      onClick={() => setDropdownOpen(false)}
                    >
                      My Profile
                    </Link> */}
                    <div className="px-2">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 rounded-lg text-sm text-red-600 hover:bg-[#CC1D1D] hover:text-white"
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <Bellicon className="w-[20px] h-[20px] text-gray-700" />
            </div>
          )}

          {/* Language Selector */}
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="text-black border border-white px-2 py-1 text-sm bg-transparent"
          >
            <option value="en">EN</option>
            <option value="es">ES</option>
            <option value="fr">FR</option>
          </select>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-[52px] right-0 w-auto bg-[#fffbf3] border-t border-gray-300 shadow-md px-4 py-4 flex flex-col gap-4 justify-end rounded-b-lg ">
          {!login ? (
            <Link to="/login" className="text-black hover:underline">
              Log in
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <img
                src={userImgURL}
                alt="user"
                className="w-[30px] h-[30px] rounded-full object-cover"
              />
              <div>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center gap-1 hover:text-[#CC1D1D]"
                >
                  Hello,
                  {username} ({role})
                </button>
              </div>
              <Bellicon className="w-[20px] h-[20px] text-gray-700 " />
            </div>
          )}

          {role === "Support" ? (
            <NavLink
              to="/bookings"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Bookings
            </NavLink>
          ) : (
            <NavLink
              to="/"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
          )}
          <NavLink
            to="/cars"
            className={navLinkClass}
            onClick={() => setMenuOpen(false)}
          >
            Cars
          </NavLink>
          {login && role === "Client" && (
            <NavLink
              to="/mybookings"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              My Bookings
            </NavLink>
          )}
          {login && role === "Support" && (
            <NavLink
              to="/clients"
              className={navLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              Clients
            </NavLink>
          )}

          {login && (
            <>
              <Link
                to="/dashboard"
                className="text-black hover:underline"
                onClick={() => {
                  setDropdownOpen(false);
                  setMenuOpen(false);
                }}
              >
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="text-left  hover:bg-[#CC1D1D] hover:text-white  py-2 rounded"
              >
                Log out
              </button>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
