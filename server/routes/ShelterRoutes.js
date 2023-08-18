const express = require('express');
const router = express.Router();
const Shelter = require('../models/Shelter');
import convertAddressToCoords from '../utils/LocationService';

// Get all shelters
router.get('/', async (req, res) => {
  try {
    const shelters = await Shelter.find();
    res.json(shelters);
  } catch (err) {
    res.json({ error: 'Failed to get all shelter', originalError: err.message });
  }
});

// Get a singular shelter
router.get('/:id', async (req, res) => {
  try {
    const shelter = await Shelter.findById(req.params.id);
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
    // Created shelter
    const coordinates = await convertAddressToCoords(address);
    const shelter = new Shelter({ name, email, address, coordinates });
    const newShelter = await shelter.save();
    // TODO: Add shelter to email list
    res.status(201).json(newShelter);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create a new shelter', originalError: err.message });
  }
});

// Update a shelter
router.patch('/:id', async (req, res) => {
  try {
    const shelter = await Shelter.findById(req.params.id);
    if (shelter == null) {
      return res.json({ message: 'Cannot find Shelter' });
    }
    if (req.body.name != null) {
      shelter.name = req.body.name;
    }
    if (req.body.location != null) {
      shelter.location = req.body.location;
    }
    if (req.body.email != null) {
      shelter.email = req.body.email;
    }
    const coordinates = await convertAddressToCoords(req.body.address);
    shelter.coordinates = coordinates;
    const updatedShelter = await shelter.save();
    res.status(200).json(updatedShelter);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update a shelter', originalError: err.message });
  }
});

// Delete a shelter
router.delete('/:id', async (req, res) => {
  try {
    const shelter = await Shelter.findById(req.params.id);
    if (shelter == null) {
      return res.json({ message: 'Cannot find Shelter' });
    }
    await shelter.remove();
    res.json({ message: 'Deleted Shelter' });
  } catch (err) {
    res.json({ error: 'Failed to delete a shelter', originalError: err.message });  }
});

module.exports = router;