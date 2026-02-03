# 📍 Nearby - Discover Points of Interest

A fast, minimalistic React web app that helps you discover restaurants, pharmacies, supermarkets, attractions, and other points of interest around any location. Perfect for exploring new neighborhoods or finding services quickly!

## ✨ Features

- **Interactive Map** - Drop a pin anywhere on the map or search for addresses
- **Smart Search** - Find locations by address or coordinates (lat,lon)
- **POI Discovery** - Automatically finds nearby restaurants, pharmacies, supermarkets, cafes, bars, attractions, hospitals, and parking
- **Dynamic Radius Expansion** - If few POIs are found, the search radius automatically expands to find more
- **Responsive Design** - Optimized for mobile, tablet, and desktop
- **Fast & Lightweight** - Minimal dependencies, uses free APIs (no API keys required)
- **Beautiful UI** - Modern gradient design with smooth interactions
- **Geolocation** - Request your current location to start exploring immediately

## 🎯 Tech Stack

- **Frontend**: React 18 + Vite
- **Mapping**: Leaflet + React-Leaflet
- **Map Tiles**: OpenStreetMap (free)
- **Geocoding**: Nominatim (free, no API key)
- **POI Data**: Overpass API (free, no API key)
- **Styling**: Pure CSS (no frameworks)

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/nearby.git
cd nearby

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:5173`

### Building for Production

```bash
npm run build

# Preview production build
npm run preview
```

## 📱 How to Use

1. **Get Started**
   - Allow geolocation to start at your current location
   - Or search for an address/coordinates in the search bar

2. **Explore the Map**
   - Click anywhere on the map to search POIs around that location
   - The blue circle shows your search radius
   - Markers show different POI types with color coding

3. **Browse POIs**
   - See all discovered locations in the sidebar
   - Click on any POI to highlight it on the map
   - Distance is shown in meters

4. **Search Tips**
   - Enter addresses: "Times Square, New York"
   - Enter coordinates: "40.7580,-73.9855"
   - Tap markers on the map for more details

## 🎨 POI Types & Colors

| Type | Icon | Color |
|------|------|-------|
| Restaurant | 🍽️ | Red (#FF6B6B) |
| Pharmacy | 💊 | Teal (#4ECDC4) |
| Supermarket | 🛒 | Blue (#45B7D1) |
| Cafe | ☕ | Coral (#FFA07A) |
| Bar | 🍷 | Purple (#9D84B7) |
| Attraction | ✨ | Yellow (#FFD93D) |
| Hospital | 🏥 | Pink (#FF6B9D) |
| Parking | 🅿️ | Mint (#95E1D3) |

## 📋 Project Structure

```
nearby/
├── src/
│   ├── components/
│   │   ├── MapContainer.jsx       # Leaflet map component
│   │   ├── MapContainer.css
│   │   ├── SearchBar.jsx          # Search input & geocoding
│   │   ├── SearchBar.css
│   │   ├── POIList.jsx            # POI sidebar list
│   │   └── POIList.css
│   ├── App.jsx                    # Main app logic
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── public/
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🔧 Configuration

The app is configured to work out-of-the-box with free APIs. No configuration needed!

### Optional Customizations

In `App.jsx`, you can modify:
- **Initial search radius**: Change `searchRadius` state (default: 1000m)
- **Max expansion radius**: Modify the condition in `fetchNearbyPOIs` (currently 5000m)
- **Default location**: Update the fallback in `useEffect`
- **POI types**: Edit the Overpass API query to add/remove categories

## 🌐 API Information

### Nominatim (Geocoding)
- **URL**: https://nominatim.openstreetmap.org
- **Rate limit**: 1 request per second
- **No API key required**
- Converts addresses to coordinates

### Overpass API (POI Data)
- **URL**: https://overpass-api.de/api/interpreter
- **Rate limit**: Reasonable use encouraged
- **No API key required**
- Returns point of interest data from OpenStreetMap

### OpenStreetMap Tiles
- **URL**: https://tile.openstreetmap.org
- **No API key required**
- Map background data

## 📱 Mobile Optimization

- Responsive layout switches to vertical stack on small screens
- Touch-friendly buttons and interactions
- Prevents iOS zoom on input focus (16px font size)
- Optimized scrolling performance
- Works offline after initial load (with cached tiles)

## 🐛 Troubleshooting

### "Geolocation not available"
- Ensure you allow location access when prompted
- The app falls back to San Francisco if geolocation fails
- Search manually using the search bar

### "No POIs found"
- Try searching in a populated area (city center)
- The app automatically expands radius if needed
- Some areas may have limited POI data in OpenStreetMap

### Map not loading
- Check your internet connection
- OpenStreetMap tiles may be slow on first load
- Try refreshing the page

### Search not working
- Ensure the address is specific enough
- Try using city/country in the search
- Try coordinates format: "40.7580,-73.9855"

## 🚀 Performance Tips

- Searches are cached in the browser (session storage)
- Map tiles are cached by the browser
- Minimal re-renders with React optimization
- No heavy dependencies or frameworks

## 📄 License

MIT License - Feel free to use and modify!

## 🙋 Support

Found a bug or have a feature request? Feel free to open an issue on GitHub!

---

**Built with ❤️ for explorers and travelers**
