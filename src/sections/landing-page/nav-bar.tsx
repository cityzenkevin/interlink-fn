import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../hooks/useAuth";
import { useAppDispatch } from "../../redux/hook";
import { logout as logoutAction } from "../../redux/features/auth.feature";

export default function NavBar() {
  const user = JSON.parse(localStorage.getItem("auth") || "{}");
  const dispatch = useAppDispatch();
  const { logout } = useContext(UserContext);

  const handleClick = () => {
    dispatch(logoutAction());
    logout();
  };

  return (
    <header className="absolute bg-primary top-0 left-0 w-full z-50 px-4 sm:px-8 lg:px-16 xl:px-40 2xl:px-64">
      <div className="flex flex-wrap items-center justify-between py-6">
        <div className="w-1/2 md:w-auto">
          <Link to="/" className="text-white font-bold text-2xl">
            Internship Offer Management System
          </Link>
        </div>

        <label className="pointer-cursor md:hidden block">
          <svg
            className="fill-current text-white"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
          </svg>
        </label>

        <input className="hidden" type="checkbox" id="menu-toggle" />

        <div className="hidden md:block w-full md:w-auto" id="menu">
          <nav className="w-full bg-white md:bg-transparent rounded shadow-lg px-6 py-4 mt-4 text-center md:p-0 md:mt-0 md:shadow-none">
            <ul className="md:flex items-center">
              <li>
                <a
                  className="py-2 inline-block md:text-white md:hidden lg:block font-semibold"
                  href="/#about"
                >
                  About Us
                </a>
              </li>
              <li className="md:ml-4">
                <a
                  className="py-2 inline-block md:text-white md:px-2 font-semibold"
                  href="/#internships"
                >
                  Internships
                </a>
              </li>

              <li className="md:ml-4">
                <a
                  className="py-2 inline-block md:text-white md:px-2 font-semibold"
                  href="/#contact"
                >
                  Contact Us
                </a>
              </li>
              <li className="md:ml-6 mt-3 md:mt-0">
                {user?.id ? (
                  <Link
                    className="inline-block font-semibold px-4 py-2 text-white bg-primary md:bg-transparent border rounded"
                    to="/dashboard"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <Link
                    className="inline-block font-semibold px-4 py-2 text-white bg-primary md:bg-transparent border rounded"
                    to="/login"
                  >
                    Login
                  </Link>
                )}
              </li>
              {user?.id ? (
                <li className="md:ml-6 mt-3 md:mt-0">
                  <button
                    className="inline-block font-semibold px-4 py-2 border  border-red-700 text-white bg-red-700 hover:bg-red-500  rounded"
                    onClick={handleClick}
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li className="md:ml-6 mt-3 md:mt-0">
                  <Link
                    className="inline-block font-semibold px-4 py-2 text-white bg-primary md:bg-transparent border rounded"
                    to="/signup"
                  >
                    Sign Up
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
