import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';

const FoodForm = () => {
  const [name, setName] = useState('');
  const [unit, setUnit] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [restaurant, setRestaurant] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  

  // Fetch the list of restaurants on component mount
  useEffect(() => {
    fetch('http://localhost:1234/api/restaurants')
      .then(response => response.json())
      .then(data => setRestaurants(data))
      .catch(error => console.error(error));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      unit,
      quantity,
      expirationDate,
      restaurant,
    };
    const response = await fetch('http://localhost:1234/api/food', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
        const data = await response.json();
        setName('');
        setUnit('');
        setQuantity('');
        setExpirationDate('');
        setRestaurant('');
        alert('Food added successfully!');
        console.log(data);
        console.log(data.food); // log the saved food object
        console.log(data.restaurant); // log the saved restaurant object
      console.log(response);
    } else {
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <Form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }} onSubmit={handleSubmit}>
      <h2 style={{ textAlign: 'center' }}>Add Food Item</h2>
      <Form.Group controlId="formName">
        <Form.Label style={{paddingLeft: "17px", paddingRight: "px", textAlign: "left", fontSize: "17px"}}>
          Name
        </Form.Label>
        <Form.Control type="text" placeholder="Bread" value={name} onChange={(e) => setName(e.target.value)} required 
        style={{width:"150px"}}/>
      </Form.Group>

      <Form.Group controlId="formUnit">
        <Form.Label style={{paddingLeft: "2px", paddingRight: "8px", textAlign: "left", fontSize: "17px"}}>
          Unit
        </Form.Label>
        <Form.Control type="text" placeholder="Loafs" value={unit} onChange={(e) => setUnit(e.target.value)} required style={{width:"150px"}}/>
      </Form.Group>

      <Form.Group controlId="formQuantity">
        <Form.Label style={{paddingLeft: "35px", paddingRight: "8px", textAlign: "left", fontSize: "17px"}}>
          Quantity
        </Form.Label>
        <Form.Control type="text" placeholder="8" value={quantity} onChange={(e) => setQuantity(e.target.value)} required style={{width:"150px"}}/>
      </Form.Group>

      <Form.Group controlId="formExpirationDate">
        <Form.Label style={{paddingLeft: "33px",paddingRight: "8px", textAlign: "left", fontSize: "17px"}}>
          Expiration Date
        </Form.Label>
        <Form.Control type="date" placeholder="Enter expiration date" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} required />
      </Form.Group>

      <Form.Group controlId="formRestaurant">
        <Form.Label style={{paddingTop:"200px", paddingLeft: "25px", paddingRight: "8px", textAlign: "left", fontSize: "17px"}}>
          Restaurant
        </Form.Label>
        <Form.Control as="select" value={restaurant} onChange={(e) => setRestaurant(e.target.value)} required>
          <option value=""> Select a restaurant </option>
          {restaurants.map(restaurant => <option key={restaurant._id} value={restaurant._id}>{restaurant.name}</option>)}
        </Form.Control>
      </Form.Group>
      <h style={{paddingTop:"4px", fontSize:"200px"}}>
      </h>
      <Button variant="primary" type="submit" style={{ display: 'block', margin: 'auto',}}>
        Submit
      </Button>
    </Form>
  );
};

export default FoodForm;