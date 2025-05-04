import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

/**
 * Navigation bar component for the restaurant website
 * Uses Tailwind CSS for inline styling
 *
 * @returns {JSX.Element} Rendered Navbar component
 */
const Navbar = () => {
  const location = useLocation();
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  // Toggle mobile navigation menu
  const handleNavCollapse = () => {
    setIsNavCollapsed(!isNavCollapsed);
  };

  // Check if the link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header>
      <nav className="bg-red-600 fixed w-full top-0 left-0 z-50 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link
              className="flex items-center py-3 text-white font-bold"
              to="/"
            >
              <img
                src="/assets/myotherimages/sff-logo.webp"
                alt="Street Food Fighter Logo"
                className="w-15 h-8 mr-2"
              />
              <span>The Street Food Fighter</span>
            </Link>

            <button
              className="md:hidden p-2 text-white focus:outline-none"
              onClick={handleNavCollapse}
              aria-expanded={!isNavCollapsed}
              aria-label="Toggle navigation"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </button>

            <div
              className={`${
                isNavCollapsed ? "hidden" : "block"
              } w-full md:block md:w-auto`}
            >
              <ul className="flex flex-col md:flex-row md:space-x-4 mt-4 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <Link
                    className={`block py-2 px-3 md:p-0 ${
                      isActive("/")
                        ? "text-white font-bold"
                        : "text-white/90 hover:text-white"
                    }`}
                    to="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block py-2 px-3 md:p-0 ${
                      isActive("/menu")
                        ? "text-white font-bold"
                        : "text-white/90 hover:text-white"
                    }`}
                    to="/menu"
                  >
                    Menu
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block py-2 px-3 md:p-0 ${
                      isActive("/about")
                        ? "text-white font-bold"
                        : "text-white/90 hover:text-white"
                    }`}
                    to="/about"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block py-2 px-3 md:p-0 ${
                      isActive("/team")
                        ? "text-white font-bold"
                        : "text-white/90 hover:text-white"
                    }`}
                    to="/team"
                  >
                    Team
                  </Link>
                </li>
                <li>
                  <Link
                    className={`block py-2 px-3 md:p-0 ${
                      isActive("/admin")
                        ? "text-white font-bold"
                        : "text-white/90 hover:text-white"
                    }`}
                    to="/admin"
                  >
                    Admin
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
