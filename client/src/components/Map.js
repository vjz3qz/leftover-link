import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const Map = () => {
  const defaultProps = {
    center: {
      lat: 38.0355514,
      lng: -78.5060009
    },
    zoom: 8
  };

  const [markers, setMarkers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExpiredRestaurants = async () => {
      try {
        const response = await axios.get('/api/restaurants/');
        const expiredRestaurants = response.data;
        const restaurantMarkers = expiredRestaurants.map(restaurant => ({
          lat: restaurant.coordinates[0],
          lng: restaurant.coordinates[1],
          title: restaurant.name
        }));
        setMarkers(restaurantMarkers);
        setLoading(false);
        console.log(restaurantMarkers)
      } catch (error) {
        console.error('Failed to fetch expired restaurants:', error);
      }
    };

    fetchExpiredRestaurants();
  }, []);

  const addMarkers = (map, maps) => {
    markers.forEach(marker => {
      new maps.Marker({
        position: { lat: marker.lat, lng: marker.lng },
        map: map,
        title: marker.title
      });
    });
  };

  const handleApiLoaded = (map, maps) => {
    addMarkers(map, maps);
  };
  
  return (
    //loading ? <div>Loading...</div> :
    <div className="w-full h-full flex-1 border-4 border-gray-500 rounded-lg overflow-hidden">
    <GoogleMapReact
      bootstrapURLKeys={{ key: api_key }}
      defaultCenter={defaultProps.center}
      defaultZoom={defaultProps.zoom}
      onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      yesIWantToUseGoogleMapApiInternals
    />
  </div>
  );
};

export default Map;
