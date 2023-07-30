import React from "react";
import FoodForm from "../components/FoodForm";
import Inventory from "../components/Inventory";

const FoodTracker = () => {

  

  return (
    <div className="add-food-container flex flex-row">
      <FoodForm />
      <Inventory />
    </div>
  );
};

export default FoodTracker;
