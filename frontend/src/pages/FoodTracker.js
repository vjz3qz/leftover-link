import React, { useContext } from "react";

import { UserContext } from "../contexts/UserContext";
import FoodForm from "../components/FoodForm";
import Inventory from "../components/Inventory";
import { Navigate, useNavigate } from "react-router-dom";

const FoodTracker = () => {
  const navigate = useNavigate(); // call the useNavigate hook here
  const { userInfo } = useContext(UserContext);

  const goToHome = () => {
    navigate("/");
  };

  return (
    <section className="p-8 dark:bg-gray-800 flex items-center justify-center min-h-screen">

<div className="max-w-3xl mx-auto">
      {userInfo ? (
      <div>
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center dark:text-white">
        {"Hello, " + userInfo?.username + "!"}
        </h1>
      <div className="add-food-container flex flex-row">
          <FoodForm />
          <Inventory />
        </div>
      </div>
      ) : (
        <Navigate to={"/login"} />
      )}
      <button
        type="button"
        onClick={goToHome}
        className={`
              rounded-2xl border-1 border-black 
  bg-sunset_orange px-6 py-3 mx-2
  font-semibold uppercase text-white
  hover:rounded-md hover:bg-another_sunset
  focus:ring-4 focus:outline-none focus:bg-another_sunset 
  dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:bg-gray-600 
  transition-all duration-300
            `}
      >
        Back to Home
      </button>
    </div>
    </section>

  );
};

export default FoodTracker;
