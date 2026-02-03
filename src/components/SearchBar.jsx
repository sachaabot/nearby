import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch, mapRef }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      // Check if input is coordinates (lat,lon format)
      const coordMatch = query.match(/^(-?\d+\.?\d*)\s*,\s*(-?\d+\.?\d*)$/);
      let coords;

      if (coordMatch) {
        const lat = parseFloat(coordMatch[1]);
        const lon = parseFloat(coordMatch[2]);
        if (lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180) {
          coords = [lat, lon];
        } else {
          alert('Invalid coordinates. Latitude must be -90 to 90, longitude -180 to 180.');
          setLoading(false);
          return;
        }
      } else {
        // Use Nominatim (OpenStreetMap) for geocoding - no API key required
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
            query
          )}&format=json&limit=1`,
          { headers: { 'User-Agent': 'Nearby-POI-App' } }
        );
        const data = await response.json();

        if (data.length > 0) {
          const { lat, lon } = data[0];
          coords = [parseFloat(lat), parseFloat(lon)];
        } else {
          alert('Location not found. Try another search.');
          setLoading(false);
          return;
        }
      }

      // Update map and fetch POIs
      onSearch(coords);
      
      // Pan map to new location if map ref is available
      if (mapRef && mapRef.current) {
        mapRef.current.setView(coords, 15);
      }

      setQuery('');
    } catch (error) {
      console.error('Search error:', error);
      alert('Error searching for location');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <input
            type="text"
            placeholder="Search address or coordinates (lat,lon)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            {loading ? '🔍 ...' : '🔍'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SearchBar;
