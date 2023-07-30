// restaurants schema
const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
    
  },
  password: {
    type: String,
    required: true
  },
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

restaurantSchema.index({ username: 1 }, { unique: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;
