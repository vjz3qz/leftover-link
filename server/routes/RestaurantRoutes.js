const express = require('express');
const router = express.Router();
const RestaurantController = require('../controllers/RestaurantController');

// Login route
router.post('/login', RestaurantController.restaurantLogin);

// Create a new restaurant with coordinates and register the user
router.post('/register', RestaurantController.restaurantRegister);

// Logout route
router.post('/logout', RestaurantController.restaurantLogout);

// Get all restaurants
router.get('/', RestaurantController.getAllRestaurants);

// Get restaurants with expiring food within 3 days
router.get('/expiring-food', RestaurantController.getRestaurantsWithExpiringFoodWithErrorHandling);

// Get a specific restaurant by ID
router.get('/by-id/:id', RestaurantController.getRestaurantById);

// Get a specific restaurant by username
router.get('/by-username/:username', RestaurantController.getRestaurantByUsername);

// Update a restaurant by ID
router.patch('/by-id/:id', RestaurantController.updateRestaurantById);

//Update a restaurant by ID by adding a food
router.patch('/by-id/add-food/:id', RestaurantController.addFoodById);

//Update a restaurant by username by adding a food
router.patch('/by-username/add-food/:username', RestaurantController.addFoodByUsername);

//Update a restaurant by ID by deleting a food
router.patch('/by-id/delete-food/:id', RestaurantController.deleteFoodById);

//Update a restaurant by username by deleting a food
router.patch('/delete-food/:username', RestaurantController.deleteFoodByUsername);

// Delete a restaurant by ID
router.delete('/by-id/:id', RestaurantController.deleteRestaurant);

// Get all foods from a specific restaurant
router.get('/by-username/:username/get-all-food', RestaurantController.getAllFoodByUsername);

// Get all foods from a specific restaurant
router.get('/by-id/:id/get-all-food', RestaurantController.getAllFoodById);

module.exports = router;