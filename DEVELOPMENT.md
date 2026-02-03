# 🛠️ Development Guide

## Project Structure

```
nearby/
├── src/
│   ├── components/              # Reusable React components
│   │   ├── MapContainer.jsx    # Leaflet map wrapper
│   │   ├── SearchBar.jsx       # Search input & geocoding
│   │   └── POIList.jsx         # POI sidebar display
│   ├── App.jsx                 # Main app component & logic
│   ├── main.jsx                # React entry point
│   └── index.css               # Global styles
├── public/                      # Static assets
├── index.html                  # HTML template
├── package.json                # Dependencies & scripts
├── vite.config.js              # Vite configuration
└── README.md                   # User documentation
```

## Available Scripts

```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code (ESLint)
npm run lint
```

## Key Components

### App.jsx (Main Logic)

- **State Management**:
  - `mapCenter`: Current map center coordinates
  - `userLocation`: User's geolocation
  - `pois`: Array of discovered points of interest
  - `searchRadius`: Current search radius (1km - 5km)
  - `selectedPOI`: Currently highlighted POI

- **Main Functions**:
  - `fetchNearbyPOIs()`: Queries Overpass API for POIs
  - `calculateDistance()`: Haversine formula for distance
  - `handleSearch()`: Geocodes search queries
  - `handleMapClick()`: Handles map clicks for new searches

### MapContainer.jsx

- Uses React-Leaflet components
- Displays OpenStreetMap tiles
- Shows user location with animated marker
- Renders search radius circle
- Displays POI markers with custom colors
- Handles marker popups

### SearchBar.jsx

- Geocoding via Nominatim API
- Supports addresses and coordinates (lat,lon format)
- Provides visual feedback (loading state)

### POIList.jsx

- Groups POIs by type
- Sorts by distance
- Click to select/highlight on map
- Shows count and current search radius

## Adding Features

### Add a New POI Type

1. **In `App.jsx`**, update the Overpass API query:
```javascript
const query = `
  [out:json];
  (
    // ... existing types ...
    node["amenity"="library"](${lat - radius/111000},${lon - radius/111000},${lat + radius/111000},${lon + radius/111000});
  );
  out center;
`;
```

2. **In `MapContainer.jsx` and `POIList.jsx`**, add color and icon:
```javascript
const POI_COLORS = {
  // ... existing ...
  library: '#FF69B4',
};

const POI_ICONS = {
  // ... existing ...
  library: '📚',
};
```

### Customize Search Radius

In `App.jsx`, modify these values:
```javascript
const [searchRadius, setSearchRadius] = useState(2000); // Start with 2km
```

In `fetchNearbyPOIs()`, change expansion logic:
```javascript
if (poiList.length < 10 && radius < 10000) {
  setSearchRadius(radius * 1.5);
  // ...
}
```

### Add Geolocation Polling

Track user's moving location:
```javascript
useEffect(() => {
  const watchId = navigator.geolocation.watchPosition((position) => {
    const { latitude, longitude } = position.coords;
    setUserLocation([latitude, longitude]);
    setMapCenter([latitude, longitude]);
  });
  
  return () => navigator.geolocation.clearWatch(watchId);
}, []);
```

### Add Offline Support

Add Service Worker for offline caching:
```javascript
// In main.jsx
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js');
  });
}
```

### Add Dark Mode

Toggle CSS classes:
```javascript
const [darkMode, setDarkMode] = useState(false);

// In App.jsx
<div className={`app ${darkMode ? 'dark' : ''}`}>
```

Then add dark mode CSS in `App.css`.

## Performance Optimization

### Current Optimizations

✅ React 18 with automatic batching
✅ Memoized components (POI types)
✅ CSS transitions instead of animations
✅ Lazy loading of map tiles
✅ Efficient distance calculations
✅ Minimal re-renders

### Further Optimizations

- Add React.memo to components
- Implement windowing for large POI lists
- Cache API responses
- Lazy load components with React.lazy()
- Debounce search input
- Use Web Workers for distance calculations

## API Documentation

### Nominatim (Geocoding)

```javascript
const response = await fetch(
  `https://nominatim.openstreetmap.org/search?q=<query>&format=json`
);
const data = await response.json();
// Returns: [{ lat, lon, address, ... }]
```

### Overpass QL (POI Data)

Query format:
```
[out:json];
(
  node["key"="value"](bbox);
  way["key"="value"](bbox);
  relation["key"="value"](bbox);
);
out center;
```

Common tags:
- `amenity=restaurant`, `pharmacy`, `cafe`, `bar`, `hospital`
- `shop=supermarket`, `bakery`, `clothing`
- `tourism=attraction`, `museum`, `hotel`
- `leisure=park`, `playground`

## Styling Guide

### Color Palette

- Primary: #667eea (Purple-blue)
- Secondary: #764ba2 (Deep purple)
- Success: #4ECDC4 (Teal)
- Danger: #FF6B6B (Red)
- Warning: #FFD93D (Yellow)
- Background: #f5f5f5
- Text: #333
- Light gray: #e0e0e0

### Responsive Breakpoints

```css
/* Desktop */
@media (min-width: 1024px) { }

/* Tablet */
@media (max-width: 768px) { }

/* Mobile */
@media (max-width: 480px) { }
```

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- iOS Safari: ✅ Full support (geolocation may require HTTPS)
- Android Chrome: ✅ Full support

## Testing

### Manual Testing Checklist

- [ ] Geolocation works on desktop
- [ ] Geolocation works on mobile
- [ ] Search by address works
- [ ] Search by coordinates works
- [ ] Map markers display correctly
- [ ] Clicking map triggers search
- [ ] POI list populates
- [ ] Clicking POI highlights on map
- [ ] Search radius expands when needed
- [ ] Responsive design works on mobile
- [ ] Performance is smooth (no lag)

### Common Issues

**Map not rendering**: Check Leaflet CSS import in `main.jsx`

**Markers not showing**: Verify marker icon URLs are accessible

**Geolocation blocked**: Test on HTTPS or localhost

**API rate limiting**: Space out requests or reduce query frequency

## Deployment Checklist

Before deploying:

- [ ] npm run build completes without errors
- [ ] No console warnings or errors
- [ ] Tested on mobile browsers
- [ ] All features work in production build
- [ ] HTTPS configured (for geolocation)
- [ ] Performance acceptable (<2s first load)
- [ ] APIs accessible from production domain

## Debugging Tips

### Enable verbose logging

Add to `App.jsx`:
```javascript
const DEBUG = true;

const log = (msg, data) => {
  if (DEBUG) console.log(msg, data);
};
```

### Check API responses

Browser DevTools → Network tab → Check API calls:
- Nominatim responses
- Overpass API responses
- Tile requests

### Monitor component renders

Use React DevTools browser extension:
- Check for unnecessary re-renders
- Verify props changes
- Profile performance

### Mobile debugging

```bash
# Android: Chrome DevTools via USB
# iOS: Safari DevTools (Mac only)
# All: Use ngrok to expose localhost over internet
ngrok http 5173
```

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make changes
4. Test thoroughly
5. Commit: `git commit -m "Add: my feature"`
6. Push: `git push origin feature/my-feature`
7. Create Pull Request

## Resources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [Leaflet Docs](https://leafletjs.com)
- [Overpass API](https://wiki.openstreetmap.org/wiki/Overpass_API)
- [Nominatim](https://nominatim.org/release-docs/latest/api/Overview/)

---

Happy hacking! 🚀
