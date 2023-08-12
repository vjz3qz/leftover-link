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
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      {/* {userInfo ? (
        <div className="add-food-container flex flex-row">
          <FoodForm />
          <Inventory />
        </div>
      ) : (
        <Navigate to={"/login"} />
      )} */}
      <div className="add-food-container flex flex-row">
          <FoodForm />
          <Inventory />
        </div>

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
  );
};

export default FoodTracker;
