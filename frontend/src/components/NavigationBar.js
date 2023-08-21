import React, { useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import { Link as ScrollLink } from "react-scroll";
import { Link as RouterLink } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL;

function NavigationBar() {
  const { userInfo, setUserInfo } = useContext(UserContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div>
      <nav className="bg-yellow-50 dark:bg-gray-700 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <button>
          <ScrollLink
            to="home"
            className="flex items-center"
            smooth={true}
            duration={1000}
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Leftover Link 🍣
            </span>
          </ScrollLink>
          </button>
          <div className="flex md:order-2">
              
            {!userInfo ? (
              <>

        <RouterLink
            to="/subscribe"
            className="text-white bg-sunset_orange hover:rounded-md hover:bg-another_sunset focus:ring-4 focus:outline-none focus:bg-another_sunset dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 font-medium rounded-lg text-sm px-4 py-2 text-center mr-1 md:mr-2 transition-all duration-300"
        >
            Subscribe
        </RouterLink>

        <RouterLink
            to="/login"
            className="text-white bg-sunset_orange hover:rounded-md hover:bg-another_sunset focus:ring-4 focus:outline-none focus:bg-another_sunset dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 font-medium rounded-lg text-sm px-4 py-2 text-center mr-1 md:mr-2 transition-all duration-300"
        >
            Login
        </RouterLink>
              </>
            ) : (<>
              <button 
              className="text-white bg-sunset_orange hover:rounded-md hover:bg-another_sunset focus:ring-4 focus:outline-none focus:bg-another_sunset dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 font-medium rounded-lg text-sm px-4 py-2 text-center mr-1 md:mr-2 transition-all duration-300">
                {"Hello, " + userInfo?.username + "!"}
              </button>
              <button 
              onClick={() => {
                setUserInfo(null);
                try {
                  const response = fetch(`${API_URL}/api/restaurants/logout`, {
                    method: "POST",
                  });
                } catch (err) {
                  console.log(err);
                }
              }}
              className="text-white bg-sunset_orange hover:rounded-md hover:bg-another_sunset focus:ring-4 focus:outline-none focus:bg-another_sunset dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 font-medium rounded-lg text-sm px-4 py-2 text-center mr-1 md:mr-2 transition-all duration-300">
                Logout
              </button>
            </>
            )}
            <button
              onClick={toggleMenu}
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden transition-all duration-300 hover:bg-another_sunset focus:ring-4 focus:ring-gray-200 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-600 dark:focus:bg-gray-600 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div className={`${menuOpen ? 'block' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1 bg-yellow-50 dark:bg-gray-700 mt-1 md:mt-0`}
            id="navbar-sticky"
          >
            <ul className="flex justify-center items-center flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent bg-yellow-50 dark:bg-gray-700 dark:border-gray-700">
              {[
                ["Home", "home", ScrollLink],
                ["Mission", "mission", ScrollLink],
                ["About", "about", ScrollLink],
                ["Contact", "contact", ScrollLink],
                ["Food Tracker", "/food-tracker", RouterLink],
              ].map(([text, address, Link], index, arr) => {
                return (
                  (index !== arr.length - 1 ||
                    (userInfo)) && (
                    <li key={index}>
                      <button>
                        <Link
                          to={address}
                          smooth={true}
                          duration={1000}
                          offset={-70}
                          className="block py-2 pl-3 pr-4 bg-yellow-50 dark:bg-gray-700 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-another_sunset md:p-0 md:dark:hover:text-light_orange dark:text-white dark:hover:bg-gray-600 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                        >
                          {text}
                        </Link>
                      </button>
                    </li>
                  )
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavigationBar;
