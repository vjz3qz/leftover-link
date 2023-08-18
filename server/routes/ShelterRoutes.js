import { Router } from 'express';
const router = Router();
import Shelter, { find, findById } from '../models/Shelter';
import convertAddressToCoords from '../utils/LocationService';

// Get all shelters
router.get('/', async (req, res) => {
  try {
    const shelters = await find();
    res.json(shelters);
  } catch (err) {
    res.json({ error: 'Failed to get all shelter', originalError: err.message });
  }
});

// Get a singular shelter
router.get('/:id', async (req, res) => {
  try {
    const shelter = await findById(req.params.id);
    if (shelter == null) {
      return res.json({ message: 'Cannot find Shelter' });
    }
    res.json(shelter);
  } catch (err) {
    res.json({ error: 'Failed to get a shelter', originalError: err.message });
  }
});

// Create a new shelter
router.post('/', async (req, res) => {
  const { name, address, email } = req.body;
  try {
    const coordinates = await convertAddressToCoords(address);
    const shelter = new Shelter({ name, email, address, coordinates });
    const newShelter = await shelter.save();
    res.status(201).json(newShelter);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create a new shelter', originalError: err.message });
  }
});

// Update a shelter
router.patch('/:id', async (req, res) => {
  try {
    const shelter = await findById(req.params.id);
    if (!shelter) {
      return res.status(404).json({ error: 'Cannot find Shelter' });
    }
    if (req.body.name) {
      shelter.name = req.body.name;
    }
    if (req.body.address) {
      shelter.address = req.body.address;
    }
    if (req.body.email) {
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
    const shelter = await findById(req.params.id);
    if (shelter == null) {
      return res.json({ message: 'Cannot find Shelter' });
    }
    await shelter.remove();
    res.json({ message: 'Deleted Shelter' });
  } catch (err) {
    res.json({ error: 'Failed to delete a shelter', originalError: err.message });
  }
});

export default router;
