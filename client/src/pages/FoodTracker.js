import React from "react";
import FoodForm from "../components/FoodForm";
import Inventory from "../components/Inventory";
import { Navigate, useNavigate } from "react-router-dom";

const FoodTracker = () => {
  const navigate = useNavigate(); // call the useNavigate hook here

  const goToHome = () => {
    navigate("/");
  };

  return (
    <div>
      <div className="add-food-container flex flex-row">
        <FoodForm />
        <Inventory />
      </div>

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
