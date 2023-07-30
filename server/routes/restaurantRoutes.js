const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const axios = require('axios');
const Food = require('../models/Food');
require('dotenv').config();
const apiKey = process.env.REACT_APP_API_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


// TODO: update all error messages and returns
// TODO: test all requests

const secret = '1234567890asdfghjkl'; // Replace 'your_secret_key_here' with a strong secret key

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const restaurant = await Restaurant.findOne({ username });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    const isPasswordValid = bcrypt.compareSync(password, restaurant.password);

    if (isPasswordValid) {
      const token = jwt.sign({ id: restaurant._id }, secret, { expiresIn: '1h' });
      res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }).json({
        id: restaurant._id,
        username: restaurant.username,
        message: 'Login successful'
      });
    } else {
      res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to login', originalError: err.message });
  }
});

// Register route
router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingRestaurant = await Restaurant.findOne({ username });
    if (existingRestaurant) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newRestaurant = await Restaurant.create({ username, password: hashedPassword });

    res.status(201).json({
      id: newRestaurant._id,
      username: newRestaurant.username,
      message: 'Registration successful'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register restaurant', originalError: err.message });
  }
});


// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find({});
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve restaurants' });
  }
});

// Get restaurants with expiring food within 3 days
router.get('/expiring-food', async (req, res) => {
  try {
    const restaurants = await Restaurant.aggregate([
      {
        $lookup: {
          from: 'foods',
          localField: 'foods',
          foreignField: '_id',
          as: 'foodObjects'
        }
      },
      {
        $unwind: '$foodObjects'
      },
      {
        $match: {
          'foodObjects.expirationDate': {
            $lte: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
          }
        }
      },
      {
        $group: {
          _id: '$_id',
          name: { $first: '$name' },
          location: { $first: '$location' },
          email: { $first: '$email' },
          foods: { $push: '$foodObjects' }
        }
      }
    ]);
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve restaurants with expiring food' });
  }
});

// Get a specific restaurant by ID
router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve restaurant by ID' });
  }
});

// Helper function to convert address to coordinates
const convertAddressToCoords = async (address) => {
  try {
    const geocodingEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    const response = await axios.get(geocodingEndpoint);
    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const { lat, lng } = response.data.results[0].geometry.location;
      return [lat, lng];
    } else {
      throw new Error('Failed to convert address to coordinates. Status: ${response.data.status}');
    }
  } catch (err) {
    throw new Error('Failed to convert address to coordinates');
  }
};

// Create a new restaurant with coordinates
router.post('/', async (req, res) => {
  const { name, address, email } = req.body;
  try {
    const coordinates = await convertAddressToCoords(address);
    const restaurant = new Restaurant({ name, email, address, coordinates, foods: [] });
    const newRestaurant = await restaurant.save();
    res.status(201).json(newRestaurant); // TODO: send an OK status
  } catch (err) {
    res.status(400).json({ error: 'Failed to create a new restaurant', originalError: err.message });
  }
});

// Update a restaurant by ID
router.patch('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    if (req.body.name) {
      restaurant.name = req.body.name;
    }
    if (req.body.location) {
      restaurant.location = req.body.location;
    }
    if (req.body.email) {
      restaurant.email = req.body.email;
    }
    const updatedRestaurant = await restaurant.save();
    res.json(updatedRestaurant);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update restaurant' });
  }
});

//Update a restaurant by ID by adding a food
router.patch('/add-food/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    const { name, unit, quantity, expirationDate } = req.body;
    const food = new Food({ name, unit, quantity, expirationDate, restaurant: restaurant._id });
    const newFood = await food.save();
    restaurant.foods.push(newFood);
    const updatedRestaurant = await restaurant.save();
    res.json(updatedRestaurant);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add food to restaurant' });
  }
});

//Update a restaurant by ID by deleting a food
router.patch('/delete-food/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    const foodId = req.body.foodId;
    const index = restaurant.foods.findIndex((food) => food.toString() === foodId);//find food in array that is in restaurant
    if (index === -1) {//not found in array then return an error
      return res.status(404).json({ error: 'Food not found in the restaurant' });
    }
    restaurant.foods.splice(index, 1);//remove it from the array
    await Food.findByIdAndRemove(foodId);
    const updatedRestaurant = await restaurant.save();//update the restaurant then
    res.json(updatedRestaurant);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete food from restaurant', originalError: err.message });
  }
});

// Delete a restaurant by ID
router.delete('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }
    await restaurant.remove();
    res.json({ message: 'Deleted restaurant' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete restaurant' });
  }
});

// TODO: Delete all restaurants

module.exports = router;
