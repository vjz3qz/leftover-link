//Shetler Collection
const mongoose = require('mongoose');

const shelterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, 
    location: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
    type: String,
    required: true
    },
    //Add phone number
});

const Shelter = mongoose.model('Shelter', shelterSchema);

module.exports = Shelter;
