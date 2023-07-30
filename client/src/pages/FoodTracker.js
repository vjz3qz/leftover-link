import React from "react";
import FoodForm from "../components/FoodForm";

const FoodTracker = ({ username }) => {

  

  return (
    <div className="add-food-container">
      <FoodForm restaurantUsername={username} />
    </div>
  );
};

export default FoodTracker;
