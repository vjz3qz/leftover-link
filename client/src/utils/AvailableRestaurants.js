const API_URL = 'http://localhost:1234/api/restaurants-with-food';

async function fetchAvailableRestaurants() {
  const response = await fetch(API_URL);
  const data = await response.json();
  return data;
}

export { fetchAvailableRestaurants };
