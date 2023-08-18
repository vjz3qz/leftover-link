const express = require('express');
const router = express.Router();
const Shelter = require('../models/Shelter');

// Get all shelters
router.get('/', async (req, res) => {
  try {
    const shelters = await Shelter.find();
    res.json(shelters);
  } catch (err) {
    res.json({ message: err.message });
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
    res.json({ message: err.message });
  }
});

// Create a new shelter
router.post('/', async (req, res) => {
  const shelter = new Shelter({
    name: req.body.name,
    address: req.body.address,
    email: req.body.email
  });
  try {
    const newShelter = await shelter.save();
    res.json(newShelter);
  } catch (err) {
    res.json({ message: err.message });
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
    if (req.body.address != null) {
      shelter.address = req.body.address;
    }
    if (req.body.email != null) {
      shelter.email = req.body.email;
    }
    const updatedShelter = await shelter.save();
    res.json(updatedShelter);
  } catch (err) {
    res.json({ message: err.message });
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
    res.json({ message: err.message });
  }
});

module.exports = router;

