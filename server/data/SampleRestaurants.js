const mongoose = require('mongoose');
const Restaurant = require('../models/Restaurant');

mongoose.connect('mongodb://localhost:27017/LeftoverLoveDB', { useNewUrlParser: true });

const sampleRestaurants = [
    {
        name: 'Panera Bread',
        location: '1121 Emmet St N, Charlottesville, VA 22903',
        email:'fcj9vk@virginia.edu',
    },
    {
        name: 'Asados',
        location: '1327 W Main St, Charlottesville, VA 22903',
        email: 'smt3ft@virginia.edu',
    },
    {
        name: 'Bodos',
        location: '1609 University Ave, Charlottesville, VA 22903',
        email: 'vjz3qz.virgina.edu'
    }
];

async function insertSampleRestaurants() {
    try {
        await Restaurant.deleteMany(); // Remove all existing restaurants from the database
        const insertedRestaurants = await Restaurant.insertMany(sampleRestaurants); // Insert the sample restaurants
        console.log(`Inserted ${insertedRestaurants.length} sample restaurants.`);
    } catch (err) {
        console.error(err);
    } finally {
        mongoose.connection.close(); // Close the database connection
    }
}
    
insertSampleRestaurants();