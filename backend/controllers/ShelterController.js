const Shelter = require("../models/Shelter");
const { convertAddressToCoords } = require("../utils/CoordinatesConverter");

// Get all shelters
async function getAllShelters(req, res) {
    try {
      const shelters = await Shelter.find({});
      res.json(shelters);
    } catch (err) {
      res.json({ error: 'Failed to get all shelter', originalError: err.message });
    }
}

// Get a singular shelter
async function getShelterById(req, res) {
    try {
      const shelter = await Shelter.findById(req.params.id);
      if (shelter == null) {
        return res.json({ message: 'Cannot find Shelter' });
      }
      res.json(shelter);
    } catch (err) {
      res.json({ error: 'Failed to get a shelter', originalError: err.message });
    }
  }

// Create a new shelter
async function createShelter(req, res) {
    const { name, address, email } = req.body;
    try {
        // Created shelter    
        // const coordinates = await convertAddressToCoords(address);
        const coordinates = [0.0, 0.0];
        const shelter = new Shelter({ name, email, address, coordinates });
        const newShelter = await shelter.save();
      res.status(201).json(newShelter);
    } catch (err) {
      res.status(400).json({ error: 'Failed to create a new shelter', originalError: err.message });
    }
  }

// Update a shelter
async function updateShelter(req, res) {
    const { id, name, address, email } = req.body;
    try {
        const shelter = await Shelter.findById(id);
        if (shelter == null) {
            return res.status(404).json({ message: 'Cannot find shelter' }); // Added status code
        }
        if (name != null) {
            shelter.name = name;
        }
        if (email != null) {
            shelter.email = email;
        }
        if (address != null) {
            shelter.address = address;
        }
        // const coordinates = await convertAddressToCoords(address);
        const coordinates = [0.0, 0.0];
        shelter.coordinates = coordinates;
        const updatedShelter = await shelter.save();
        res.status(200).json(updatedShelter);
    } catch (err) {
      res.status(500).json({ error: 'Failed to update a shelter', originalError: err.message });
    }
}

// Delete a shelter
async function deleteShelter(req, res) {
    try {
      const shelter = await Shelter.findById(req.params.id);
      if (shelter == null) {
        return res.status(400).json({ message: 'Cannot find Shelter' });
      }
      await Shelter.findByIdAndDelete(req.params.id); // Added actual deletion
      res.status(200).json({ message: 'Deleted Shelter' });
    } catch (err) {
      res.status(500).json({ error: 'Failed to delete a shelter', originalError: err.message });  }
  }

module.exports = {
    getAllShelters,
    getShelterById,
    createShelter,
    updateShelter,
    deleteShelter,
};