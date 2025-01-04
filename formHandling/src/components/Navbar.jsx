import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { IoMdMenu, IoMdCloseCircle } from "react-icons/io";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { dark, toggleTheme } = useTheme();

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev); // Toggle the menu state
  };

  return (
    <nav
      className={`relative flex w-full justify-between items-center p-6 shadow-lg ${
        dark ? "bg-gray-900 text-white" : "bg-slate-500 text-black"
      }`}
    >
      {/* Logo / Brand Name */}
      <div className="text-xl font-bold">
        <Link to="/">Brand</Link>
      </div>

      {/* Hamburger Icon for Small Screens */}
      <div className="md:hidden flex items-center">
        <button
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          className="focus:outline-none text-3xl"
        >
          {isMenuOpen ? (
            <IoMdCloseCircle className={`${dark ? "text-white" : "text-black"}`} />
          ) : (
            <IoMdMenu className={`${dark ? "text-white" : "text-black"}`} />
          )}
        </button>
      </div>

      {/* Navigation Links (Desktop) */}
      <div className="hidden md:flex space-x-8 text-lg font-medium">
        <Link
          to="/"
          className={`hover:text-gray-400 transition duration-300 ${
            dark ? "text-gray-200" : "text-white"
          }`}
        >
          Home
        </Link>
        <Link
          to="/create"
          className={`hover:text-gray-400 transition duration-300 ${
            dark ? "text-gray-200" : "text-white"
          }`}
        >
          Create
        </Link>
        <Link
          to="/forms"
          className={`hover:text-gray-400 transition duration-300 ${
            dark ? "text-gray-200" : "text-white"
          }`}
        >
          View
        </Link>
      </div>

      {/* Navigation Links (Mobile) */}
      {isMenuOpen && (
        <div
          className={`absolute top-full left-0  w-full z-50 bg-gray-700 ${
            dark ? "text-white" : "text-black"
          } flex flex-col space-y-4 text-center py-4 shadow-lg md:hidden`}
        >
          <Link
            to="/"
            className="hover:bg-gray-600 transition duration-300 p-2"
            onClick={() => setIsMenuOpen(false)} // Close menu on link click
          >
            Home
          </Link>
          <Link
            to="/create"
            className="hover:bg-gray-600 transition duration-300 p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            Create
          </Link>
          <Link
            to="/forms"
            className="hover:bg-gray-600 transition duration-300 p-2"
            onClick={() => setIsMenuOpen(false)}
          >
            View
          </Link>

          {/* Theme Toggle for Small Screens */}
          <button
            onClick={toggleTheme}
            className={`relative w-12 h-6 rounded-full shadow-md focus:outline-none mx-auto transition duration-300 ${
              dark ? "bg-gray-700" : "bg-gray-300"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ${
                dark ? "translate-x-6" : "translate-x-0"
              }`}
            ></span>
          </button>
        </div>
      )}

      {/* Theme Toggle Switch (Desktop) */}
      <div className="hidden md:flex items-center space-x-4">
        <button
          onClick={toggleTheme}
          className={`relative w-12 h-6 rounded-full shadow-md focus:outline-none transition duration-300 ${
            dark ? "bg-gray-700" : "bg-gray-300"
          }`}
        >
          <span
            className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow transform transition-transform duration-300 ${
              dark ? "translate-x-6" : "translate-x-0"
            }`}
          ></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
