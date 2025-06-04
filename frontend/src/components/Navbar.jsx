// components/Navbar.jsx
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              ResumeWise
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:text-blue-600 transition"
              }
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:text-blue-600 transition"
              }
            >
              History
            </NavLink>
            <NavLink
              to="/pricing"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:text-blue-600 transition"
              }
            >
              Pricing
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 font-medium"
                  : "text-gray-600 hover:text-blue-600 transition"
              }
            >
              About
            </NavLink>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition">
              Sign In
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-md">
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            <NavLink
              to="/dashboard"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/history"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              History
            </NavLink>
            <NavLink
              to="/pricing"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Pricing
            </NavLink>
            <NavLink
              to="/about"
              className="block px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              About
            </NavLink>
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <button className="w-full px-4 py-2 text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition">
                Sign In
              </button>
              <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-md">
                Sign Up
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
