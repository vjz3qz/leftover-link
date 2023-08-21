const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FoodSchema = new Schema({
  name: { 
    type: String, 
    required: true 
  },
  unit: { 
    type: String, 
    required: true 
  },
  quantity: { 
    type: String, 
    required: true 
  },
  expirationDate: { 
    type: Date, 
    required: true 
  },
  restaurant: { 
    type: mongoose.Schema.Types.ObjectId, //linking food with restaurant together
    ref: 'Restaurant' 
  },
});

module.exports = mongoose.model('Food', FoodSchema);
