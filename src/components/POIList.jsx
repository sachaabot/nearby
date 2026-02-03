import React from 'react';
import './POIList.css';

const POI_COLORS = {
  restaurant: '#FF6B6B',
  pharmacy: '#4ECDC4',
  supermarket: '#45B7D1',
  cafe: '#FFA07A',
  bar: '#9D84B7',
  attraction: '#FFD93D',
  hospital: '#FF6B9D',
  parking: '#95E1D3',
  other: '#667eea',
};

const POI_ICONS = {
  restaurant: '🍽️',
  pharmacy: '💊',
  supermarket: '🛒',
  cafe: '☕',
  bar: '🍷',
  attraction: '✨',
  hospital: '🏥',
  parking: '🅿️',
  other: '📍',
};

function POIList({ pois, loading, radius, selectedPOI, onSelectPOI }) {
  const groupedPOIs = pois.reduce((acc, poi) => {
    if (!acc[poi.type]) {
      acc[poi.type] = [];
    }
    acc[poi.type].push(poi);
    return acc;
  }, {});

  return (
    <div className="poi-list">
      <div className="poi-header">
        <h2>Points of Interest</h2>
        <div className="poi-stats">
          <span className="stat-item">
            Found: <strong>{pois.length}</strong>
          </span>
          <span className="stat-item">
            Radius: <strong>{(radius / 1000).toFixed(1)}km</strong>
          </span>
        </div>
      </div>

      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Searching nearby...</p>
        </div>
      )}

      {!loading && pois.length === 0 && (
        <div className="empty-state">
          <p>No POIs found in this area</p>
          <small>Try searching in a different location</small>
        </div>
      )}

      {!loading && pois.length > 0 && (
        <div className="poi-groups">
          {Object.entries(groupedPOIs)
            .sort(([typeA], [typeB]) => {
              const order = ['restaurant', 'cafe', 'bar', 'supermarket', 'pharmacy', 'hospital', 'attraction', 'parking'];
              return (order.indexOf(typeA) || 999) - (order.indexOf(typeB) || 999);
            })
            .map(([type, items]) => (
              <div key={type} className="poi-group">
                <h3 className="group-title">
                  <span className="icon">{POI_ICONS[type] || '📍'}</span>
                  <span>{type}</span>
                  <span className="count">({items.length})</span>
                </h3>
                <ul className="poi-items">
                  {items.map((poi) => (
                    <li
                      key={poi.id}
                      className={`poi-item ${selectedPOI?.id === poi.id ? 'selected' : ''}`}
                      onClick={() => onSelectPOI(poi)}
                      style={{ borderLeftColor: POI_COLORS[type] || POI_COLORS.other }}
                    >
                      <div className="poi-content">
                        <h4>{poi.name}</h4>
                        <p className="poi-distance">{poi.distance}m away</p>
                      </div>
                      <div className="poi-arrow">→</div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default POIList;
