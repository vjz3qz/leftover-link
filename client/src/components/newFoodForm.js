import React, { useState } from 'react';

const NewFoodForm = ({ restaurantId }) => {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');

  const handleAddFood = async () => {
    try {
      const newFood = {
        name,
        unit,
        quantity,
        expirationDate,
      };

      const response = await fetch(`/api/restaurants/add-food/${restaurantId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFood),
      });

      if (response.ok) {
        console.log('Food added successfully');
        setName('');
        setUnit('');
        setQuantity('');
        setExpirationDate('');
      } else {
        console.log('Failed to add food');
      }
    } catch (error) {
      console.error('Error adding food:', error);
    }
  };

  return (
    <div>
      <h2>Add Food</h2>
      <form>
        {/* Input fields */}
        <button type="button" onClick={handleAddFood}>
          Add Food
        </button>
      </form>
    </div>
  );
};

export default NewFoodForm;