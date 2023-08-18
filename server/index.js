const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
const restaurantRoutes = require('./routes/RestaurantRoutes');
const foodRoutes = require('./routes/FoodRoutes');
const shelterRoutes = require('./routes/ShelterRoutes');
require('./services/NotificationService');

const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const url = process.env.DB_URL;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB successfully');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  }
);

app.use(express.json());
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/shelters', shelterRoutes);

app.listen(1234, (req, res) => {
  console.log("server hosted on port 1234")
});
