const Restaurant = require('../models/Restaurant');
const { convertAddressToCoords } = require('../utils/CoordinatesConverter');

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
    getRestaurantsWithExpiringFood
};