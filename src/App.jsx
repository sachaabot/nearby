import React, { useState, useEffect } from 'react';
import MapContainer from './components/MapContainer';
import SearchBar from './components/SearchBar';
import POIList from './components/POIList';
import './App.css';

function App() {
  const [mapCenter, setMapCenter] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [pois, setPois] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchRadius, setSearchRadius] = useState(1000); // Start with 1km
  const [selectedPOI, setSelectedPOI] = useState(null);

  // Get user's geolocation on mount
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const loc = [latitude, longitude];
          setUserLocation(loc);
          setMapCenter(loc);
          fetchNearbyPOIs(loc, searchRadius);
        },
        (error) => {
          console.error('Geolocation error:', error);
          // Default to San Francisco
          const defaultLoc = [37.7749, -122.4194];
          setMapCenter(defaultLoc);
          setUserLocation(defaultLoc);
          fetchNearbyPOIs(defaultLoc, searchRadius);
        }
      );
    }
  }, []);

  const fetchNearbyPOIs = async (coords, radius) => {
    setLoading(true);
    try {
      const [lat, lon] = coords;
      // Using Overpass API to fetch nearby POIs
      const query = `
        [out:json];
        (
          node["amenity"="restaurant"](${lat - radius/111000},${lon - radius/111000},${lat + radius/111000},${lon + radius/111000});
          node["amenity"="pharmacy"](${lat - radius/111000},${lon - radius/111000},${lat + radius/111000},${lon + radius/111000});
          node["shop"="supermarket"](${lat - radius/111000},${lon - radius/111000},${lat + radius/111000},${lon + radius/111000});
          node["amenity"="cafe"](${lat - radius/111000},${lon - radius/111000},${lat + radius/111000},${lon + radius/111000});
          node["amenity"="bar"](${lat - radius/111000},${lon - radius/111000},${lat + radius/111000},${lon + radius/111000});
          node["tourism"="attraction"](${lat - radius/111000},${lon - radius/111000},${lat + radius/111000},${lon + radius/111000});
          node["amenity"="hospital"](${lat - radius/111000},${lon - radius/111000},${lat + radius/111000},${lon + radius/111000});
          node["amenity"="parking"](${lat - radius/111000},${lon - radius/111000},${lat + radius/111000},${lon + radius/111000});
        );
        out center;
      `;

      const response = await fetch('https://overpass-api.de/api/interpreter', {
        method: 'POST',
        body: query,
      });

      if (!response.ok) throw new Error('Overpass API error');
      const data = await response.json();
      
      const poiList = (data.elements || [])
        .filter(el => el.lat && el.lon && el.tags && el.tags.name)
        .map(el => ({
          id: el.id,
          name: el.tags.name,
          lat: el.lat,
          lon: el.lon,
          type: el.tags.amenity || el.tags.shop || el.tags.tourism || 'other',
          distance: calculateDistance([lat, lon], [el.lat, el.lon]),
        }))
        .sort((a, b) => a.distance - b.distance);

      setPois(poiList);
      
      // If few results and radius is still small, expand search
      if (poiList.length < 5 && radius < 5000) {
        setSearchRadius(radius * 1.5);
        setTimeout(() => fetchNearbyPOIs(coords, radius * 1.5), 500);
      }
    } catch (error) {
      console.error('Error fetching POIs:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateDistance = (coord1, coord2) => {
    const [lat1, lon1] = coord1;
    const [lat2, lon2] = coord2;
    const R = 6371; // Earth's radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c * 1000).toFixed(0); // Return in meters
  };

  const handleSearch = (searchLocation) => {
    setMapCenter(searchLocation);
    setSearchRadius(1000); // Reset radius for new search
    fetchNearbyPOIs(searchLocation, 1000);
  };

  const handleMapClick = (coords) => {
    setMapCenter(coords);
    setSearchRadius(1000); // Reset radius for new search
    fetchNearbyPOIs(coords, 1000);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>📍 Nearby</h1>
        <p>Discover points of interest around you</p>
      </header>

      <SearchBar onSearch={handleSearch} />

      <div className="container">
        <div className="map-section">
          {mapCenter && (
            <MapContainer
              center={mapCenter}
              pois={pois}
              radius={searchRadius}
              onMapClick={handleMapClick}
              selectedPOI={selectedPOI}
            />
          )}
        </div>

        <div className="sidebar">
          <POIList
            pois={pois}
            loading={loading}
            radius={searchRadius}
            selectedPOI={selectedPOI}
            onSelectPOI={setSelectedPOI}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
