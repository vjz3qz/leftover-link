import React, { useContext } from "react";

import { UserContext } from "../contexts/UserContext";
import FoodForm from "../components/FoodForm";
import Inventory from "../components/Inventory";
import { Navigate, useNavigate } from "react-router-dom";

const FoodTracker = () => {
  const navigate = useNavigate(); // call the useNavigate hook here
  const { restaurantInfo } = useContext(UserContext);

  const goToHome = () => {
    navigate("/");
  };
  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      {restaurantInfo && Object.keys(restaurantInfo).length > 0 ? (
        <div className="add-food-container flex flex-row">
          <FoodForm />
          <Inventory />
        </div>
      ) : (
        //<Navigate to={"/login"} /> // this is the production way to redirect
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center">
            You must be logged in to view this page.
          </h1>
          <button
            type="button"
            onClick={goToLogin}
            className={`
            rounded-2xl border-1 border-black
            bg-sunset_orange
            px-6 py-3
            font-semibold uppercase text-white
            hover:rounded-md
            hover:bg-another_sunset
            transition-all durtation-300
          `}
          >
            Login
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={goToHome}
        className={`
            rounded-2xl border-1 border-black
            bg-sunset_orange
            px-6 py-3
            font-semibold uppercase text-white
            hover:rounded-md
            hover:bg-another_sunset
            transition-all durtation-300
          `}
      >
        Back to Home
      </button>
    </div>
  );
};

export default FoodTracker;
