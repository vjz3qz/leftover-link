const express = require('express');
const router = express.Router();
const ShelterController = require('../controllers/ShelterController');

// Get all shelters
router.get('/', async (req, res) => {
  try {
    const shelters = await ShelterController.getAllShelters();
    res.json(shelters);
  } catch (err) {
    res.json({ error: 'Failed to get all shelter', originalError: err.message });
  }
});

// Get a singular shelter
router.get('/:id', async (req, res) => {
  try {
    const shelter = await ShelterController.getShelterById(req.params.id);
    if (shelter == null) {
      return res.json({ message: 'Cannot find Shelter' });
    }
    res.json(shelter);
  } catch (err) {
    res.json({ error: 'Failed to get a shelter', originalError: err.message });
  }
});

// Create a new shelter and adds to email list
router.post('/subscribe', async (req, res) => {
  const { name, address, email } = req.body;
  try {
    const newShelter = await ShelterController.createShelter(name, email, address);
    res.status(201).json(newShelter);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create a new shelter', originalError: err.message });
  }
});

// Update a shelter
router.patch('/:id', async (req, res) => {
  const { id, name, address, email } = req.body;
  try {
    const updatedShelter = await ShelterController.updateShelter(id, name, email, address);
    res.status(200).json(updatedShelter);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update a shelter', originalError: err.message });
  }
});

// Delete a shelter
router.delete('/:id', async (req, res) => {
  try {
    const shelter = await ShelterController.deleteShelter(req.params.id);
    if (shelter == null) {
      return res.json({ message: 'Cannot find Shelter' });
    }
    res.json({ message: 'Deleted Shelter' });
  } catch (err) {
    res.json({ error: 'Failed to delete a shelter', originalError: err.message });  }
});

module.exports = router;