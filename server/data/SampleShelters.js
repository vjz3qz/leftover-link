const mongoose = require('mongoose');
const Shelter = require('../models/shelter');

mongoose.connect('mongodb://localhost:27017/LeftoverLoveDB', { useNewUrlParser: true });

const sampleRestaurants = [
    {
        name: 'The Haven at First and Market',
        location: '112 W Market St, Charlottesville, VA 22902',
        email:'smt3ft@virginia.edu',
    }
];

async function insertSampleShelters() {
    try {
        await Shelter.deleteMany(); // Remove all existing restaurants from the database
        const insertedShelters = await Shelter.insertMany(sampleShelters); // Insert the sample restaurants
        console.log(`Inserted ${insertedShelters.length} sample shelters.`);
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close(); // Close the database connection
    }
}
    
insertSampleShelters();