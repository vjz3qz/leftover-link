import React, { useState, useContext } from "react";
import { UserContext } from '../contexts/UserContext';

const FoodForm = () => {
  const { userInfo } = useContext(UserContext);
  const restaurantUsername = userInfo?.username;
  const restaurantId = userInfo?.id;
  const [name, setName] = useState("");
  const [unit, setUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [error, setError] = useState("");

  async function handleAddFood(ev) {
    ev.preventDefault();
    try {
      const newFood = {
        name,
        unit,
        quantity,
        expirationDate,
      };

      const response = await fetch(
        `/api/restaurants/add-food/${restaurantId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newFood),
        }
      );

      if (response.ok) {
        alert("Food added successfully!");
        setName("");
        setUnit("");
        setQuantity("");
        setExpirationDate("");
      } else {
        console.log("Failed to add food");
        response.json().then((errorData) => {
          setError(errorData.originalError || errorData.error || "Failed to add food");
        });
      }
    } catch (error) {
      console.error("Error adding food:", error);
      setError("An error occurred while trying to connect to the server.");
    }
  };

  return (
    <section id="foodform" className="p-8 dark:bg-gray-800 flex items-center justify-center min-h-screen">
      <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center dark:text-white">
          Food Form
        </h1>
        <p className="text-lg leading-relaxed mb-6">
          Welcome to the Food Form page! Add leftover food items from your
          restaurant to our database. Together, we can make a positive impact on
          reducing food waste and connecting with those in need. Thank you for
          your contribution!
        </p>
        <form className="space-y-4" onSubmit={handleAddFood}>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
              style={{ fontSize: "20px" }}
            >
              Food Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Food Name..."
            />
          </div>
          <div>
            <label
              htmlFor="unit"
              className="block text-sm font-medium text-gray-700"
              style={{ fontSize: "20px" }}
            >
              Unit:
            </label>
            <input
              type="text"
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
              className="border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Units..."
            />
          </div>
          <div>
            <label
              htmlFor="quantity"
              className="block text-sm font-medium text-gray-700"
              style={{ fontSize: "20px" }}
            >
              Quantity:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => {
                if (e.target.value < 0) {
                  setQuantity(0);
                } else {
                  setQuantity(e.target.value);
                }
              }}
              min='0'
              required
              className="border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Quantity..."
            />
          </div>
          <div>
            <label
              htmlFor="expirationDate"
              className="block text-sm font-medium text-gray-700"
              style={{ fontSize: "20px" }}
            >
              Expiration Date:
            </label>
            <input
              type="date"
              id="expirationDate"
              value={expirationDate}
              onChange={(e) => setExpirationDate(e.target.value)}
              required
              className="border-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && (
            <div className="error text-center text-red-500 dark:text-red-400 mt-2">
              {error}
            </div>
          )}
          <button
            type="submit"
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
            Add Food
          </button>
        </form>
      </div>
    </section>
  );
};

export default FoodForm;
