import React from 'react';
import { MapContainer as LeafletMap, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import './MapContainer.css';

// Fix default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

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

function MapContainer({ center, pois, radius, onMapClick, selectedPOI }) {
  const mapRef = React.useRef();

  const handleMapClick = (e) => {
    const { lat, lng } = e.latlng;
    onMapClick([lat, lng]);
  };

  const getIcon = (type) => {
    const color = POI_COLORS[type] || POI_COLORS.other;
    return L.divIcon({
      className: 'custom-marker',
      html: `<div style="background-color: ${color};" class="marker-dot"></div>`,
      iconSize: [16, 16],
    });
  };

  return (
    <div className="map-container">
      <LeafletMap
        center={center}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        onClick={handleMapClick}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User location marker */}
        <Marker position={center} icon={L.divIcon({
          className: 'custom-marker-center',
          html: '<div class="marker-center"></div>',
          iconSize: [20, 20],
        })}>
          <Popup>Your location</Popup>
        </Marker>

        {/* Search radius circle */}
        <Circle
          center={center}
          radius={radius}
          pathOptions={{
            color: '#667eea',
            fillColor: '#667eea',
            fillOpacity: 0.1,
            weight: 2,
            dashArray: '5, 5',
          }}
        />

        {/* POI markers */}
        {pois.map((poi) => (
          <Marker
            key={poi.id}
            position={[poi.lat, poi.lon]}
            icon={getIcon(poi.type)}
            className={selectedPOI?.id === poi.id ? 'selected' : ''}
          >
            <Popup>
              <div className="poi-popup">
                <h3>{poi.name}</h3>
                <p><strong>Type:</strong> {poi.type}</p>
                <p><strong>Distance:</strong> {poi.distance}m</p>
              </div>
            </Popup>
          </Marker>
        ))}
      </LeafletMap>
    </div>
  );
}

export default MapContainer;
