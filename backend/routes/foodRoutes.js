const express = require('express');
const router = express.Router();
const Food = require('../models/Food');
const Restaurant = require('../models/Restaurant');

// Get all foods from all restaurants
router.get('/', async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.json({ message: err.message });
  }
});



// Get a specific food item
router.get('/:id', async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.json({ message: 'Cannot find food item' });
    }
    res.json(food);
  } catch (err) {
    return res.json({ message: err.message });
  }
});


// Create a new food item
router.post('/', async (req, res) => {
  try {
    const restaurantId = req.body.restaurant;
    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) {
      return res.json({ message: 'Restaurant not found' });
    }

    const food = new Food({
      name: req.body.name,
      unit: req.body.unit,
      quantity: req.body.quantity,
      expirationDate: req.body.expirationDate,
      restaurant: restaurantId
    });

    const savedFood = await food.save();
    restaurant.foods.push(savedFood._id);
    const savedRestaurant = await restaurant.save();

    res.json({ food: savedFood, restaurant: savedRestaurant });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: 'Server error' });
  }
});

// Update a food item
router.patch('/:id', getFoodById, async (req, res) => {
  if (req.body.name != null) {
    res.food.name = req.body.name;
  }
  if (req.body.unit != null) {
    res.food.unit = req.body.unit;
  }
  if (req.body.quantity != null) {
    res.food.quantity = req.body.quantity;
  }
  if (req.body.expirationDate != null) {
    res.food.expirationDate = req.body.expirationDate;
  }
  if (req.body.restaurant != null) {
    res.food.restaurant = req.body.restaurant;
  }

  try {
    const updatedFood = await res.food.save();
    res.json(updatedFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a food item
router.delete('/:id', getFoodById, async (req, res) => {
  try {
    await res.food.remove();
    res.json({ message: 'Food item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a specific food item by ID
async function getFoodById(req, res, next) {
  try {
    const food = await Food.findById(req.params.id).populate('restaurant', 'name');
    if (!food) {
      return res.status(404).json({ message: 'Cannot find food item' });
    }
    res.food = food;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;

