import React, { useState, useEffect } from 'react';

const Inventory = () => {
  const [inventoryItems, setInventoryItems] = useState([]);

  useEffect(() => {
    // Fetch the restaurant data and its inventory items from your API
    const fetchInventoryData = async () => {
      try {
        const response = await fetch('/api/restaurants/:username/inventory');
        if (response.ok) {
          const data = await response.json();
          setInventoryItems(data.inventoryItems);
        } else {
          console.log('Failed to fetch inventory data');
        }
      } catch (error) {
        console.error('Error fetching inventory data:', error);
      }
    };

    fetchInventoryData();
  }, []);

  return (
    <section id="inventory" className="p-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl lg:text-4xl font-bold mb-4 text-center">Inventory</h1>
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
              <tr key={item.id}>
                <td className="border px-4 py-2">{item.foodName}</td>
                <td className="border px-4 py-2">{item.unit}</td>
                <td className="border px-4 py-2">{item.quantity}</td>
                <td className="border px-4 py-2">{item.expirationDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Inventory;
