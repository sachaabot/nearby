import React, { useState } from 'react';
import './SearchBar.css';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    try {
      // Use Nominatim (OpenStreetMap) for geocoding - no API key required
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          query
        )}&format=json&limit=1`
      );
      const data = await response.json();

      if (data.length > 0) {
        const { lat, lon } = data[0];
        onSearch([parseFloat(lat), parseFloat(lon)]);
        setQuery('');
      } else {
        alert('Location not found. Try another search.');
      }
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
