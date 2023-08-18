const Shelter = require("../models/Shelter");
const { convertAddressToCoords } = require("../utils/CoordinatesConverter");

// Get all shelters
async function getAllShelters() {
    try {
        const shelters = await Shelter.find({});
        return shelters;
    } catch (err) {
        throw new Error("Failed to get all shelters");
    }
}

// Get a singular shelter
async function getShelterById(id) {
    try {
        const shelter = await Shelter.findById(id);
        return shelter;
    } catch (err) {
        throw new Error("Failed to get a shelter");
    }
}

// Create a new shelter
async function createShelter(name, email, address) {
    try {
        // Created shelter    
        // const coordinates = await convertAddressToCoords(address);
        const coordinates = [0.0, 0.0];
        const shelter = new Shelter({ name, email, address, coordinates });
        const newShelter = await shelter.save();
        return newShelter;
    } catch (err) {
        throw new Error("Failed to create a new shelter");
    }
}

// Update a shelter
async function updateShelter(id, name, email, address) {
    try {
        const shelter = await Shelter.findById(id);
        if (shelter == null) {
            return null;
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
        const coordinates = await convertAddressToCoords(address);
        shelter.coordinates = coordinates;
        const updatedShelter = await shelter.save();
        return updatedShelter;
    } catch (err) {
        throw new Error("Failed to update a shelter");
    }
}

// Delete a shelter
async function deleteShelter(id) {
    try {
        const shelter = await Shelter.findById(id);
        if (shelter == null) {
            return null;
        }
        await shelter.remove();
        return shelter;
    } catch (err) {
        throw new Error("Failed to delete a shelter");
    }
}

module.exports = {
    getAllShelters,
    getShelterById,
    createShelter,
    updateShelter,
    deleteShelter,
};