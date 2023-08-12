import { connect, connection } from 'mongoose';
import { deleteMany, insertMany } from '../models/Restaurant';

connect('mongodb://localhost:27017/LeftoverLoveDB', { useNewUrlParser: true });

const sampleRestaurants = [
    {
        name: 'Panera Bread',
        location: '1121 Emmet St N, Charlottesville, VA 22903',
        email:'email@domain.com',
    },
    {
        name: 'Asados',
        location: '1327 W Main St, Charlottesville, VA 22903',
        email: 'email@domain.com',
    },
    {
        name: 'Bodos',
        location: '1609 University Ave, Charlottesville, VA 22903',
        email: 'email@domain.com'
    }
];

async function insertSampleRestaurants() {
    try {
        await deleteMany(); // Remove all existing restaurants from the database
        const insertedRestaurants = await insertMany(sampleRestaurants); // Insert the sample restaurants
        console.log(`Inserted ${insertedRestaurants.length} sample restaurants.`);
    } catch (err) {
        console.error(err);
    } finally {
        connection.close(); // Close the database connection
    }
}
    
insertSampleRestaurants();