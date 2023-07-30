import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext'; // Import the UserContext if not already imported

const Inventory = () => {
  const { restaurantInfo } = useContext(UserContext);
  const restaurantUsername = restaurantInfo.username;
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    // Fetch the restaurant data and its inventory items from your API
    const fetchInventoryData = async () => {
      try {
        const response = await fetch(`/api/restaurants/${restaurantUsername}/get-all-food`);
        if (response.ok) {
          const data = await response.json();
          setInventoryItems(data); // Update the inventoryItems state with the received data
        } else {
          console.log('Failed to fetch inventory data');
        }
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

    fetchInventoryData();
  }, [restaurantUsername]); // Add restaurantUsername as a dependency to useEffect so it runs when username changes

  return (
    <section id="inventory" className="p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center">Inventory</h1>
        <div className="h-96 overflow-auto"> {/* Set the height and overflow for the scrollable window */}
          <table className="w-full border-collapse table-auto">
            <thead>
              <tr>
                <th className="border px-4 py-2">Food Name</th>
                <th className="border px-4 py-2">Unit</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Expiration Date</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => (
                <tr key={item._id}> {/* Use a unique key for the table rows, such as item._id */}
                  <td className="border px-4 py-2">{item.name}</td> {/* Display the food name */}
                  <td className="border px-4 py-2">{item.unit}</td> {/* Display the unit */}
                  <td className="border px-4 py-2">{item.quantity}</td> {/* Display the quantity */}
                  <td className="border px-4 py-2">{item.expirationDate}</td> {/* Display the expiration date */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default Inventory;
