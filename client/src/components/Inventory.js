import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../contexts/UserContext'; // Import the UserContext if not already imported

const Inventory = () => {
    const { userInfo } = useContext(UserContext);
  const restaurantUsername = userInfo?.username;
  const restaurantId = userInfo?.id;
  const [inventoryItems, setInventoryItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch the restaurant data and its inventory items from your API
    const fetchInventoryData = async () => {
      try {
        const response = await fetch(`/api/restaurants/by-id/${restaurantId}/get-all-food`);
        if (response.ok) {
          const data = await response.json();
          setInventoryItems(data); // Update the inventoryItems state with the received data
        } else {
          console.log('Failed to fetch inventory data');
          response.json().then((errorData) => {
            setError(errorData.originalError || errorData.error || 'Failed to fetch inventory data');
          });
        }
      } catch (error) {
        console.error('Error fetching inventory data:', error);
        setError('An error occurred while trying to connect to the server.', error);
      }
    };

    fetchInventoryData();
  }, [restaurantId]); // Add restaurantId as a dependency to useEffect so it runs when id changes

  return (
    <section id="inventory" className="p-8 dark:bg-gray-800 flex items-center justify-center min-h-screen">
      <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center dark:text-white">
        Inventory</h1>
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
                  <td className="border px-4 py-2">{(() => {
                    const date = new Date(item.expirationDate);
                    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                  })()}</td> {/* Display the expiration date */}
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
