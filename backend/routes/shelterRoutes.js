const express = require('express');
const router = express.Router();
const ShelterController = require('../controllers/ShelterController');

// Get all shelters
router.get('/', ShelterController.getAllShelters);

// Get a singular shelter
router.get('/:id', ShelterController.getShelterById);

// Create a new shelter and adds to email list
router.post('/subscribe', ShelterController.createShelter);

// Update a shelter
router.patch('/:id', ShelterController.updateShelter);

// Delete a shelter
router.delete('/:id', ShelterController.deleteShelter);

module.exports = router;