const express = require('express');
const router = express.Router();
const Restaurant = require('../models/Restaurant');
const axios = require('axios');
const Food = require('../models/Food');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { convertAddressToCoords } = require('../utils/LocationService');

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

// Create a new restaurant with coordinates and register the user
router.post('/register', async (req, res) => {
  const { username, password, name, address, email } = req.body;
  try {
    // Check if the username already exists in the database
    const existingRestaurant = await Restaurant.findOne({ username });
    if (existingRestaurant) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    // Create a new restaurant document with the provided details
    // const coordinates = await convertAddressToCoords(address);
    const coordinates = [0.0, 0.0];
    const restaurant = new Restaurant({
      name,
      email,
      address,
      coordinates,
      username,
      password: bcrypt.hashSync(password, 10)
    });
    const newRestaurant = await restaurant.save();

    // the restaurant document is created and saved in the database.
    // add any additional logic or validation you require for the user registration process.

    // Respond with a success message, including the created restaurant document or any other relevant data
    res.status(201).json({
      id: newRestaurant._id,
      username: newRestaurant.username,
      message: 'Registration successful'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to register restaurant', originalError: err.message });
  }
});

// Logout route
router.post('/logout', (req, res) => {
  // Clear the JWT token from the client-side (browser) by setting an empty token
  res.clearCookie('token').status(200).json({ message: 'Logout successful' });
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
    getRestaurant();
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve restaurant by ID' });
  }
});

// Get a specific restaurant by username
router.get('/:username', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne(req.params.username);
    getRestaurant(restaurant);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve restaurant by username' });
  }
});

const getRestaurant =  (restaurant) => {
  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }
  res.json(restaurant);
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
    const coordinates = await convertAddressToCoords(req.body.address);
    restaurant.coordinates = coordinates;
    const updatedRestaurant = await restaurant.save();
    res.status(200).json(updatedRestaurant);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update restaurant' });
  }
});

//Update a restaurant by ID by adding a food
router.patch('/add-food/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ _id: req.params.id });
    await addFood(restaurant, req, res);
  } catch (err) {
    res.status(500).json({ originalError: err, error: 'Failed to add food to restaurant' });
  }
});

//Update a restaurant by username by adding a food
router.patch('/add-food/:username', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ username: req.params.username });
    await addFood(restaurant, req, res);
  } catch (err) {
    res.status(500).json({ originalError: err, error: 'Failed to add food to restaurant!' });
  }
});

const addFood = async (restaurant, req, res) => {
  if (!restaurant) {
    return res.status(404).json({ error: 'Restaurant not found' });
  }
  try {
    const { name, unit, quantity, expirationDate } = req.body;
    const food = new Food({ name, unit, quantity, expirationDate, restaurant: restaurant._id });
    const newFood = await food.save();
    restaurant.foods.push(newFood);
    const updatedRestaurant = await restaurant.save();
    res.json(updatedRestaurant);
  } catch (error) {
    console.error(error); // Log the actual error for debugging
    res.status(500).json({ originalError: error, error: 'Failed to save the food and update the restaurant' });
  }
};

//Update a restaurant by ID by deleting a food
router.patch('/delete-food/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    await deleteFood(restaurant);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete food from restaurant', originalError: err.message });
  }
});

//Update a restaurant by username by deleting a food
router.patch('/delete-food/:username', async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne(req.params.username);
    await deleteFood(restaurant);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete food from restaurant', originalError: err.message });
  }
});

const deleteFood = async (restaurant) => {
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
};

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

// Get all foods from a specific restaurant
router.get('by-username/:username/get-all-food', async (req, res) => {
  try {
    const restaurantUsername = req.params.username;
    const restaurant = await Restaurant.findOne({ username: restaurantUsername });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    const foods = await Food.find({ restaurant: restaurant._id });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all foods from a specific restaurant
router.get('/by-id/:id/get-all-food', async (req, res) => {
  try {
    const restaurantId = req.params.id;
    const restaurant = await Restaurant.findOne({ _id: restaurantId });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    const foods = await Food.find({ restaurant: restaurant._id });
    res.json(foods);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;