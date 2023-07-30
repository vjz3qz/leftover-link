import React from "react";
import FoodForm from "../components/FoodForm";

const FoodTracker = ({ restaurantId }) => {

  

  return (
    <div className="add-food-container">
      <FoodForm restaurantId={restaurantId} />
    </div>
  );
};

export default FoodTracker;
