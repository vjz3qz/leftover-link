const Restaurant = require('../models/Restaurant');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { convertAddressToCoords } = require('../utils/CoordinatesConverter');

const secret = process.env.JWT_SECRET;

// Login
async function restaurantLogin(req, res) {
  const { username, password } = req.body;
  try {
    const restaurant = await Restaurant.findOne({ username });

    if (!restaurant) {
      return res.status(404).json({ error: 'Restaurant not found' });
    }

    const isPasswordValid = bcrypt.compareSync(password, restaurant.password);

    if (isPasswordValid) {
      const token = jwt.sign({ id: restaurant._id }, secret, { expiresIn: '1h' });
      return res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }).json({
        id: restaurant._id,
        username: restaurant.username,
        message: 'Login successful'
      });
    } else {
      return res.status(401).json({ error: 'Invalid username or password' });
    }
  } catch (err) {
    return res.status(500).json({ error: 'Failed to login', originalError: err.message });
  }
};



// Get restaurants with expiring food within 3 days
async function getRestaurantsWithExpiringFood() {
    try {
        const restaurants = await Restaurant.aggregate([
          {
            $lookup: {
              from: 'foods',
              localField: 'foods',
              foreignField: '_id',
              as: 'foodObjects'
            }
          },
          {
            $unwind: '$foodObjects'
          },
          {
            $match: {
              'foodObjects.expirationDate': {
                $lte: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
              }
            }
          },
          {
            $group: {
              _id: '$_id',
              name: { $first: '$name' },
              location: { $first: '$location' },
              email: { $first: '$email' },
              foods: { $push: '$foodObjects' }
            }
          }
        ]);
        return restaurants;
    } catch (err) {
        throw new Error('Failed to get restaurants with expiring food');
    }
}

module.exports = {
    restaurantLogin,
    getRestaurantsWithExpiringFood
};