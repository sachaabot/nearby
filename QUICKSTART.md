# ⚡ Quick Start

Get the **Nearby** app running in 2 minutes!

## For Users (Using the App)

### Option 1: Open Online Demo
Visit the deployed version (once deployed):
- GitHub Pages: `https://your-github-username.github.io/nearby`
- Or Netlify/Vercel URL

### Option 2: Run Locally

```bash
# Clone the repository
git clone https://github.com/your-username/nearby.git
cd nearby

# Install dependencies (one-time)
npm install

# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

**On first load:**
1. Browser will ask for location permission - click "Allow"
2. Map centers on your location
3. POIs load automatically
4. Explore! 🗺️

### Tips
- 🔍 Search for addresses or coordinates
- 📍 Click anywhere on map to find POIs there
- 👆 Tap POI name to highlight on map
- 🔄 Radius expands if few results found
- 📱 Works great on mobile!

---

## For Developers (Setting Up)

### 1. Clone & Setup

```bash
git clone https://github.com/your-username/nearby.git
cd nearby
npm install
```

### 2. Development

```bash
# Start dev server with hot reload
npm run dev

# Open http://localhost:5173
```

### 3. Make Changes

Edit files in `src/` and changes appear instantly.

**Key files:**
- `src/App.jsx` - Main logic
- `src/components/` - React components
- `src/App.css` - Styling

### 4. Build for Production

```bash
npm run build
# Creates optimized `dist/` folder
```

### 5. Deploy

Choose one:

**GitHub Pages:**
```bash
npm install --save-dev gh-pages
# Update package.json homepage URL
npm run deploy
```

**Netlify:**
- Connect GitHub repo → auto-deploys on push

**Vercel:**
- Connect GitHub repo → auto-deploys on push

---

## Project Structure (Quick Reference)

```
nearby/
├── src/
│   ├── App.jsx                    # Main app
│   ├── components/                # React components
│   │   ├── MapContainer.jsx      # Map display
│   │   ├── SearchBar.jsx         # Search box
│   │   └── POIList.jsx           # POI list
│   └── *.css                     # Styling
├── public/                        # Static files
├── package.json                   # Dependencies
├── vite.config.js                # Build config
├── README.md                      # User guide
├── SETUP.md                       # Deployment guide
├── DEVELOPMENT.md                 # Dev guide
└── push-to-github.sh              # GitHub setup script
```

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| "Module not found" | Run `npm install` |
| "Port 5173 already in use" | Run `npm run dev -- --port 5174` |
| "Geolocation not working" | Needs HTTPS or localhost (works in dev) |
| "POIs not showing" | Check internet, try different location |
| "Map not loading" | Clear cache, try incognito mode |

---

## Common Commands

```bash
# Development
npm run dev              # Start dev server
npm run build           # Create production build
npm run preview         # Preview production build
npm run lint            # Check code quality

# GitHub
git add -A              # Stage all changes
git commit -m "msg"     # Commit changes
git push origin main    # Push to GitHub
```

---

## Learning Resources

- **React**: [react.dev](https://react.dev) - Official docs
- **Vite**: [vitejs.dev](https://vitejs.dev) - Build tool docs
- **Leaflet**: [leafletjs.com](https://leafletjs.com) - Map library
- **OpenStreetMap**: [osm.org](https://osm.org) - Map data

---

## What's Next?

✅ **Just want to use it?**
- Deploy to Netlify (easiest)
- Share the link with friends!

🛠️ **Want to develop?**
- Read DEVELOPMENT.md for architecture
- Check GitHub issues for feature ideas
- Create a branch and start coding!

📚 **Want to learn more?**
- Read SETUP.md for deployment details
- Explore the components in `src/components/`
- Read inline comments in the code

---

## Quick Links

| Link | Purpose |
|------|---------|
| [SETUP.md](./SETUP.md) | Deploy to GitHub/Netlify/Vercel |
| [DEVELOPMENT.md](./DEVELOPMENT.md) | Dev guide & customization |
| [README.md](./README.md) | Full documentation |
| [push-to-github.sh](./push-to-github.sh) | Automated GitHub setup |

---

**Happy exploring! 🎉**

Questions? Check the full [README.md](./README.md) or [DEVELOPMENT.md](./DEVELOPMENT.md)
