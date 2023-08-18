import { get } from 'axios';
require('dotenv').config();
const apiKey = process.env.REACT_APP_API_KEY;

// Helper function to convert address to coordinates
const convertAddressToCoords = async (address) => {
    try {
      const geocodingEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
      const response = await get(geocodingEndpoint);
      if (response.data.status === 'OK' && response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        return [lat, lng];
      } else {
        throw new Error('Failed to convert address to coordinates. Status: ${response.data.status}');
      }
    } catch (err) {
      throw new Error('Failed to convert address to coordinates');
    }
  };

module.exports = convertAddressToCoords;