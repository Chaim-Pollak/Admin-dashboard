import { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo/Brand */}
          <div className="flex-shrink-0 w-44">
            <NavLink
              to={"/"}
              className="text-2xl font-bold text-amber-700 w-44 "
            >
              <img
                src="https://res.cloudinary.com/dp08vd3cy/image/upload/v1733785970/logo_lhjqzl.jpg"
                alt="image logo"
              />
            </NavLink>
          </div>

          {/* Center - Navigation Links */}
          <div className="hidden md:flex items-center justify-center space-x-12">
            <NavLink
              to={"/LeadershipTeam"}
              className="text-amber-900 hover:bg-amber-50 px-3 py-2 rounded-lg text-xl font-medium transition-colors duration-200"
            >
              Owners
            </NavLink>
            <NavLink
              to={"/AboutPage"}
              className="text-amber-900 hover:bg-amber-50 px-3 py-2 rounded-lg text-xl font-medium transition-colors duration-200"
            >
              About
            </NavLink>
            <NavLink
              to={"/ContactPage"}
              className="text-amber-900 hover:bg-amber-50 px-3 py-2 rounded-lg text-xl font-medium transition-colors duration-200"
            >
              Contact Us
            </NavLink>
          </div>

          {/* Right side - Login Button */}
          <div className="flex items-center">
            <button className="bg-amber-600 text-white px-6 py-2 rounded-xl hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition-colors duration-200 font-medium">
              <NavLink to={"/login"}>Login</NavLink>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-amber-700 hover:text-amber-900 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`} // Show/hide menu based on state
        >
          <div className="flex flex-col items-center space-y-4 p-4">
            <NavLink
              to={"/LeadershipTeam"}
              className="text-amber-900 hover:bg-amber-50 px-3 py-2 rounded-lg text-xl font-medium transition-colors duration-200"
            >
              Owners
            </NavLink>
            <NavLink
              to={"/AboutPage"}
              className="text-amber-900 hover:bg-amber-50 px-3 py-2 rounded-lg text-xl font-medium transition-colors duration-200"
            >
              About
            </NavLink>
            <NavLink
              to={"/ContactPage"}
              className="text-amber-900 hover:bg-amber-50 px-3 py-2 rounded-lg text-xl font-medium transition-colors duration-200"
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
