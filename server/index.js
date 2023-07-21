const express = require('express');
const mongoose = require('mongoose');
const Restaurant = require('./models/Restaurant');
const restaurantRoutes = require('./routes/restaurantRoutes');
const foodRoutes = require('./routes/foodRoutes');
const shelterRoutes = require('./routes/shelterRoutes');
const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
const username = process.env.USERNAME;
const password = process.env.PASSWORD;
const host = process.env.HOST;
const port = process.env.PORT;
const databaseName = process.env.DBNAME;

const url = `mongodb://${username}:${password}@${host}:${port}/${databaseName}`;

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
