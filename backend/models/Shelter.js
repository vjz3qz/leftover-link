//Shetler Collection
const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema({
    
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
  }
});

const Shelter = mongoose.model('Shelter', shelterSchema);

module.exports = Shelter;
