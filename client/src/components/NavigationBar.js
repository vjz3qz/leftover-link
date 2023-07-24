import React from "react";
import { Link } from "react-scroll";

function NavigationBar() {
  return (
    <div>
      <nav class="bg-yellow-50 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="home"
            class="flex items-center"
            smooth={true}
            duration={1000}
          >
            {/* <img src={logo} alt="Logo"  class="h-8" /> */}

            <span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Leftover Link 🍣
            </span>
          </Link>
          <div class="flex md:order-2">
            <button
              type="button"
              class="text-white bg-sunset_orange hover:bg-another_sunset focus:ring-4 focus:outline-none focus:bg-another_sunset font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
            >
              Login
            </button>
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
  class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1 bg-yellow-50"
  id="navbar-sticky"
>
  <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
    <li>
      <div class="bg-yellow-50">
        <Link
          to="about"
          smooth={true}
          duration={1000}
          class="block py-2 pl-3 pr-4 bg-yellow-50 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-another_sunset md:p-0 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        >
          About
        </Link>
      </div>
    </li>
    <li>
      <div class="bg-yellow-50">
        <Link
          to="mission"
          smooth={true}
          duration={1000}
          class="block py-2 pl-3 pr-4 bg-yellow-50 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-another_sunset md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        >
          Mission
        </Link>
      </div>
    </li>
    <li>
      <div class="bg-yellow-50">
        <Link
          to="contact"
          smooth={true}
          duration={1000}
          class="block py-2 pl-3 pr-4 bg-yellow-50 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-another_sunset md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
        >
          Contact
        </Link>
      </div>
    </li>
  </ul>
</div>
        </div>
      </nav>
    </div>
  );
}

export default NavigationBar;
