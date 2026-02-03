# 🎯 Getting Started with Nearby

Welcome to **Nearby** — your personal POI discovery app! This guide will help you understand what this app does and how to use it.

## 📚 What is Nearby?

**Nearby** is a web application that helps you discover restaurants, pharmacies, supermarkets, and other interesting venues around any location. 

Just:
1. **Search** for a location or tap the map
2. **See** all nearby POIs on the map
3. **Browse** the organized list of results
4. **Explore** and click on specific venues for details

## 🚀 Getting Started

Choose your path:

### 👤 I Just Want to Use It

**Easiest:** Wait for deployment
- The fastest way is to have someone deploy it to Netlify (takes 2 minutes)
- Then you just visit the URL and start using it!

**Self-hosted:** Run locally
```bash
git clone https://github.com/your-username/nearby.git
cd nearby
npm install
npm run dev
```
Then open `http://localhost:5173`

See: [QUICKSTART.md](./QUICKSTART.md) for more details

### 👨‍💻 I Want to Deploy It

**Option 1: GitHub Pages** (free, simple)
```bash
./push-to-github.sh
# Follow prompts
npm install --save-dev gh-pages
npm run deploy
```
Your app lives at: `https://your-username.github.io/nearby`

**Option 2: Netlify** (recommended, easier)
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Select your `nearby` repository
4. Click Deploy
5. Done! Your app is live.

**Option 3: Vercel** (also great)
1. Go to [vercel.com](https://vercel.com)
2. "Add New" → "Project"
3. Select `nearby` repo
4. Click Deploy

See: [SETUP.md](./SETUP.md) for step-by-step instructions

### 🔧 I Want to Develop/Customize It

Start here: [DEVELOPMENT.md](./DEVELOPMENT.md)

**Quick start:**
```bash
# Clone and install
git clone https://github.com/your-username/nearby.git
cd nearby
npm install

# Start coding
npm run dev

# Build for production
npm run build
```

**Want to modify?**
- Add new POI types
- Change colors/styling
- Customize search radius
- Add new features

All documented in [DEVELOPMENT.md](./DEVELOPMENT.md)

---

## 📁 Documentation Files

| File | For | Read When |
|------|-----|-----------|
| [README.md](./README.md) | Everyone | You want complete documentation |
| [QUICKSTART.md](./QUICKSTART.md) | Users & Developers | You want to get running fast |
| [SETUP.md](./SETUP.md) | Deployers | You want to deploy to GitHub/Netlify/Vercel |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | Developers | You want to customize/extend the app |
| [GETTING_STARTED.md](./GETTING_STARTED.md) | First-time visitors | You're reading this now! 👋 |

---

## 🎯 Quick Decision Tree

```
Start Here
    ↓
"I want to USE the app"
    ├─→ Deploy it → Go to SETUP.md
    └─→ Run locally → Go to QUICKSTART.md
        
"I want to DEVELOP the app"
    ├─→ Set up dev environment → Go to QUICKSTART.md
    ├─→ Understand the code → Go to DEVELOPMENT.md
    └─→ Deploy my changes → Go to SETUP.md

"I want MORE DETAILS"
    └─→ Read README.md
```

---

## ✨ Features at a Glance

🗺️ **Interactive Map**
- Click anywhere to search
- See search radius circle
- Tap markers for details

🔍 **Smart Search**
- Search by address
- Search by coordinates
- Auto-expand if few results

📍 **POI Discovery**
- Restaurants 🍽️
- Pharmacies 💊
- Supermarkets 🛒
- Cafes ☕
- Bars 🍷
- Attractions ✨
- Hospitals 🏥
- Parking 🅿️

📱 **Responsive Design**
- Desktop: Side-by-side map and list
- Tablet: Stacked layout
- Mobile: Optimized for small screens

⚡ **Fast & Lightweight**
- No heavy frameworks
- Free APIs (no keys required)
- Builds in seconds
- ~130KB gzipped

---

## 🎮 How to Use (User Guide)

### 1. Get Started

When you open the app:
- ✅ **Allow** location permission
- 🗺️ Map centers on your location
- 📍 POIs load automatically

### 2. Search

**By address:**
```
"Times Square, New York"
"Eiffel Tower, Paris"
"1600 Pennsylvania Ave, DC"
```

**By coordinates:**
```
"40.7580,-73.9855"
"48.8584,2.2945"
"38.8951,-77.0369"
```

### 3. Explore

- 👆 Tap anywhere on map → finds POIs there
- 🔍 Click on a venue → highlights on map
- 📏 Radius expands if needed
- 🎨 Colors show different types

### 4. Interact

- **Click markers** on map → see popup
- **Tap POI list** → highlight on map
- **Scroll list** → see all results
- **Search again** → new location

---

## 🏗️ Project Structure

```
nearby/                          # Your app folder
├── src/
│   ├── App.jsx                 # Main application
│   ├── components/
│   │   ├── MapContainer.jsx   # Map display
│   │   ├── SearchBar.jsx      # Search input
│   │   └── POIList.jsx        # Results list
│   ├── App.css, *.css         # Styling
│   └── main.jsx               # React entry
├── dist/                       # Production build (after npm run build)
├── public/                     # Static files
├── README.md                   # Full docs
├── QUICKSTART.md              # Quick start
├── SETUP.md                   # Deployment
├── DEVELOPMENT.md             # Dev guide
└── package.json               # Dependencies
```

---

## 🛠️ Tech Stack (What's Under the Hood)

**Frontend:**
- **React 19** - UI library
- **Vite** - Build tool (super fast)
- **Leaflet** - Interactive map library
- **React-Leaflet** - React wrapper for Leaflet

**Data Sources:**
- **OpenStreetMap** - Map tiles (free)
- **Nominatim** - Geocoding/address search (free)
- **Overpass API** - POI data (free)

**No APIs needed!** Everything uses free public APIs with no rate limiting concerns for normal use.

---

## ❓ Common Questions

### Q: Do I need API keys?
**A:** No! The app uses free public APIs that don't require keys.

### Q: Does geolocation work everywhere?
**A:** It requires HTTPS on production (or localhost for dev). Browsers block it on HTTP for privacy/security.

### Q: Can I add/remove POI types?
**A:** Yes! Edit the Overpass API query in `App.jsx` and add colors in the constants. See [DEVELOPMENT.md](./DEVELOPMENT.md).

### Q: How do I deploy it?
**A:** Netlify (2 clicks) or GitHub Pages (5 mins). See [SETUP.md](./SETUP.md).

### Q: Can I run it offline?
**A:** Partially — tiles cache, but POI searches need internet. Add Service Workers for full offline support (see [DEVELOPMENT.md](./DEVELOPMENT.md)).

### Q: Is it mobile-friendly?
**A:** Yes! Fully responsive. Works great on phones, tablets, and desktop.

### Q: Can I customize the colors/design?
**A:** Absolutely! Edit CSS files or modify `POI_COLORS` in components. See [DEVELOPMENT.md](./DEVELOPMENT.md).

---

## 📋 Next Steps

**Choose based on what you want to do:**

1. **🎯 Use the app**
   - → Go to [QUICKSTART.md](./QUICKSTART.md)

2. **📤 Deploy it**
   - → Go to [SETUP.md](./SETUP.md)
   - → Choose Netlify (easiest!)

3. **🔧 Develop/Customize**
   - → Go to [DEVELOPMENT.md](./DEVELOPMENT.md)
   - → See component structure
   - → Modify as needed

4. **📚 Learn everything**
   - → Read [README.md](./README.md)
   - → Complete reference documentation

---

## 🆘 Stuck? Common Issues

| Issue | Fix |
|-------|-----|
| Map not showing | Clear browser cache, try incognito |
| Geolocation not working | Make sure it's HTTPS or localhost |
| No POIs found | Try a different location (city center works best) |
| App won't start | Run `npm install` again |
| Port 5173 in use | Run `npm run dev -- --port 5174` |

More help in [README.md](./README.md) "Troubleshooting" section.

---

## 🎉 You're Ready!

Pick your path above and get started. The app is designed to be simple and intuitive — you'll figure it out quickly!

### Quick Links
- 💨 **Fast path**: [QUICKSTART.md](./QUICKSTART.md)
- 🚀 **Deploy**: [SETUP.md](./SETUP.md)
- 🛠️ **Develop**: [DEVELOPMENT.md](./DEVELOPMENT.md)
- 📖 **Full docs**: [README.md](./README.md)

---

**Questions?** Check [README.md](./README.md) or create a GitHub issue.

**Happy exploring! 🗺️✨**
