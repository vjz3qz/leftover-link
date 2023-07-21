// restaurants schema
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  },
  foods: [{
    type: mongoose.Schema.Types.ObjectId,//linking food and restaurant together
    ref: 'Food'
  }]
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
