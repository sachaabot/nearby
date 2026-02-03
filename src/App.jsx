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
      
      // Categories to search with increased timeout tolerance
      const categories = [
        { tag: 'amenity', value: 'restaurant', label: 'Restaurant' },
        { tag: 'amenity', value: 'pharmacy', label: 'Pharmacy' },
        { tag: 'shop', value: 'supermarket', label: 'Supermarket' },
        { tag: 'amenity', value: 'cafe', label: 'Cafe' },
        { tag: 'amenity', value: 'bar', label: 'Bar' },
        { tag: 'tourism', value: 'attraction', label: 'Attraction' },
        { tag: 'amenity', value: 'hospital', label: 'Hospital' },
        { tag: 'amenity', value: 'parking', label: 'Parking' },
      ];

      const allPOIs = [];
      const radiusKm = radius / 1000;
      const radiusDegrees = radiusKm / 111; // rough conversion

      for (const cat of categories) {
        try {
          // Build query for each category with timeout
          const query = `
            [out:json][timeout:10];
            (
              node["${cat.tag}"="${cat.value}"](${lat - radiusDegrees},${lon - radiusDegrees},${lat + radiusDegrees},${lon + radiusDegrees});
              way["${cat.tag}"="${cat.value}"](${lat - radiusDegrees},${lon - radiusDegrees},${lat + radiusDegrees},${lon + radiusDegrees});
            );
            out center;
          `;

          const response = await fetch('https://overpass-api.de/api/interpreter', {
            method: 'POST',
            body: query,
            signal: AbortSignal.timeout(15000),
          });

          if (response.ok) {
            const data = await response.json();
            const categoryPOIs = (data.elements || [])
              .filter(el => el.lat && el.lon && el.tags && el.tags.name)
              .map(el => ({
                id: el.id,
                name: el.tags.name,
                lat: el.lat,
                lon: el.lon,
                type: cat.label,
                distance: calculateDistance([lat, lon], [el.lat, el.lon]),
              }));
            allPOIs.push(...categoryPOIs);
          }
        } catch (err) {
          console.warn(`Category ${cat.value} fetch failed:`, err);
          // Continue with next category
        }
      }

      // Deduplicate by name and location, sort by distance
      const uniquePOIs = Array.from(
        new Map(
          allPOIs.map(poi => [
            `${Math.round(poi.lat * 10000)},${Math.round(poi.lon * 10000)}`,
            poi
          ])
        ).values()
      ).sort((a, b) => a.distance - b.distance);

      setPois(uniquePOIs);
      
      // If few results and radius is still small, expand search
      if (uniquePOIs.length < 5 && radius < 5000) {
        setSearchRadius(radius * 1.5);
        setTimeout(() => fetchNearbyPOIs(coords, radius * 1.5), 1000);
      }
    } catch (error) {
      console.error('Error fetching POIs:', error);
      setPois([]); // Clear on error
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
