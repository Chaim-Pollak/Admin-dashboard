import { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { ActionContext } from "../contexts/ActionContext";

function NavAdmin() {
  const { handleLogout } = useContext(AuthContext);
  const { man, handleEditManager } = useContext(ActionContext);
  const { user } = useContext(AuthContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      const dropdown = document.getElementById("userDropdown");
      if (
        !dropdown.contains(event.target) &&
        !dropdown.classList.contains("hidden")
      ) {
        dropdown.classList.add("hidden");
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!user) {
    console.error("User object is undefined");
    return <div>Access Denied</div>;
  }

  if (!user.permission) {
    console.error("Permission is not defined for the user");
    return <div>Access Denied</div>;
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo - Left Side */}
          <NavLink to={"/"} className="text-2xl font-bold text-amber-700 w-44">
            <img
              src="https://res.cloudinary.com/dp08vd3cy/image/upload/v1733785970/logo_lhjqzl.jpg"
              alt="image logo"
            />
          </NavLink>

          {/* Navigation Links - Center */}
          <div className="space-x-8 hidden md:flex">
            <NavLink
              className="text-amber-900 hover:bg-amber-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              to={"Professions"}
            >
              Professions Management
            </NavLink>
            <NavLink
              className="text-amber-900 hover:bg-amber-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              to={"allissues"}
            >
              Issues Management
            </NavLink>
            <NavLink
              className="text-amber-900 hover:bg-amber-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              to={"issueshistory"}
            >
              Issues History
            </NavLink>
            <NavLink
              className="text-amber-900 hover:bg-amber-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              to={"allemployees"}
            >
              Employee Management
            </NavLink>
            {user.permission === "Admin" && (
              <NavLink
                to={"allmanagers"}
                className="text-amber-900 hover:bg-amber-50 px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Manager Management
              </NavLink>
            )}
          </div>

          {/* User Icon with Dropdown - Right Side */}
          <div className="flex items-center">
            <div className="relative">
              <button
                className="flex items-center space-x-3 text-amber-900 hover:bg-amber-50 px-3 py-2 rounded-lg transition-colors duration-200"
                onClick={() => {
                  const dropdown = document.getElementById("userDropdown");
                  dropdown.classList.toggle("hidden");
                }}
              >
                <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                  <svg
                    className="h-5 w-5 text-amber-700"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <span className="font-medium text-sm">{user.manager_name}</span>
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div
                id="userDropdown"
                className="z-50 hidden absolute transform -translate-x-1/2 left-1/2 mt-2 w-40 bg-white rounded-xl shadow-lg py-1 ring-1 ring-black ring-opacity-5"
              >
                <a
                  href="#"
                  className="block px-3 py-2 text-sm text-amber-900 hover:bg-amber-50 transition-colors duration-200"
                >
                  <div
                    onClick={() => handleEditManager(user)}
                    className="flex items-center space-x-2"
                  >
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    <span>Profile</span>
                  </div>
                </a>
                <a
                  href="#"
                  className="block px-3 py-2 text-sm text-amber-900 hover:bg-amber-50 transition-colors duration-200"
                >
                  <div
                    onClick={() => handleLogout()}
                    className="flex items-center space-x-2"
                  >
                    <svg
                      className="w-4 h-4 flex-shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    <span>Logout</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-amber-700 hover:text-amber-900 hover:bg-amber-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-amber-500"
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
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Show/Hide */}
      <div
        className={`md:hidden ${
          isMobileMenuOpen ? "block" : "hidden"
        } bg-white shadow-lg p-4`}
      >
        <div className="flex flex-col items-center space-y-4 p-4">
          <NavLink
            className="text-amber-900 hover:bg-amber-50 px-3 py-2 rounded-lg text-lg font-medium transition-colors duration-200"
            to={"Professions"}
          >
            Professions Management
          </NavLink>
          <NavLink
            className="text-amber-900 hover:bg-amber-50 px-3 py-2 rounded-lg text-lg font-medium transition-colors duration-200"
            to={"allissues"}
          >
            Issues Management
          </NavLink>
          <NavLink
            className="text-amber-900 hover:bg-amber-50 px-3 py-2 rounded-lg text-lg font-medium transition-colors duration-200"
            to={"issueshistory"}
          >
            Issues History
          </NavLink>
          <NavLink
            className="text-amber-900 hover:bg-amber-50 px-3 py-2 rounded-lg text-lg font-medium transition-colors duration-200"
            to={"allemployees"}
          >
            Employee Management
          </NavLink>
          {user.permission === "Admin" && (
            <NavLink
              to={"allmanagers"}
              className="text-amber-900 hover:bg-amber-50 px-3 py-2 rounded-lg text-lg font-medium transition-colors duration-200"
            >
              Manager Management
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavAdmin;
