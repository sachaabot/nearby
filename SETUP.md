# 🚀 Setup Guide - From Local to GitHub

This guide will help you deploy the Nearby app to GitHub and share it with others.

## Step 1: Create a GitHub Repository

### Option A: Using GitHub Web Interface (Easiest)

1. Go to [github.com/new](https://github.com/new)
2. **Repository name**: `nearby`
3. **Description**: "📍 Discover points of interest around any location"
4. Choose **Public** (so anyone can see it)
5. Do NOT initialize with README (we already have one)
6. Click **Create repository**

### Option B: Using GitHub CLI

```bash
# Install GitHub CLI if you don't have it
brew install gh

# Login to GitHub
gh auth login

# Create repository
gh repo create nearby --public --source=. --remote=origin --push
```

## Step 2: Push to GitHub

After creating the repo, GitHub will show you commands. Run these:

```bash
cd /Users/clawdbot/clawd/nearby

# Add the remote repository
git remote add origin https://github.com/YOUR_USERNAME/nearby.git

# Rename branch to main (optional but recommended)
git branch -m master main

# Push to GitHub
git push -u origin main
```

**Replace `YOUR_USERNAME` with your actual GitHub username.**

## Step 3: Verify Success

Visit `https://github.com/YOUR_USERNAME/nearby` - you should see:
- All your code files
- README.md with instructions
- All commits

## Deployment Options

### Option 1: GitHub Pages (Free, Static)

Perfect for this app since it's a React SPA.

```bash
# 1. Update package.json homepage
# Add this line to package.json:
# "homepage": "https://YOUR_USERNAME.github.io/nearby"

# 2. Install gh-pages
npm install --save-dev gh-pages

# 3. Add deploy scripts to package.json:
# "deploy": "npm run build && gh-pages -d dist"
# "predeploy": "npm run build"

# 4. Deploy
npm run deploy
```

Then enable GitHub Pages in repo settings:
- Go to Settings → Pages
- Select "Deploy from a branch"
- Branch: `gh-pages`, Folder: `/ (root)`
- Visit `https://YOUR_USERNAME.github.io/nearby`

### Option 2: Netlify (Recommended)

Super easy and has better features.

1. Go to [netlify.com](https://netlify.com)
2. Sign up with GitHub
3. Click "New site from Git"
4. Select your `nearby` repository
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click Deploy
8. Your site is live! (auto-generated URL or custom domain)

### Option 3: Vercel

Also very simple.

1. Go to [vercel.com](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New..." → "Project"
4. Select your `nearby` repository
5. Click Deploy
6. Done! Your site is live at `nearby-[random].vercel.app`

### Option 4: Self-Hosted

Build and deploy to your own server:

```bash
# Build
npm run build

# Upload the `dist/` folder to your web server
# Configure your server to serve index.html for all routes (SPA routing)
```

## Sharing the Project

Once deployed, share any of these URLs:

- **GitHub**: `https://github.com/YOUR_USERNAME/nearby`
- **Live Demo**: `https://YOUR_USERNAME.github.io/nearby` (or your chosen host)
- **Clone & Run Locally**: 
  ```bash
  git clone https://github.com/YOUR_USERNAME/nearby.git
  cd nearby
  npm install
  npm run dev
  ```

## Collaboration

To collaborate with others:

1. They fork the repo
2. Clone their fork
3. Create feature branches
4. Submit pull requests
5. You review and merge

## Environment Variables (Optional)

If you add API keys in the future, use a `.env` file:

```bash
# Create .env file
echo "VITE_API_KEY=your_key_here" > .env
```

Then in your code:
```javascript
const apiKey = import.meta.env.VITE_API_KEY;
```

Add `.env` to `.gitignore` to keep secrets safe.

## Troubleshooting

### "fatal: not a git repository"
Run: `git init` in the project folder

### "remote already exists"
Run: `git remote remove origin` then add origin again

### "Permission denied (publickey)"
Set up SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

### Build fails on deployment
- Check Node version (needs 14+)
- Try: `npm ci` instead of `npm install`
- Check for environment variables needed in build

## Next Steps

1. ✅ Push to GitHub
2. ✅ Deploy to hosting
3. 🎯 Share with friends!
4. 🚀 Add more features:
   - Save favorite locations
   - Filter by POI type
   - Route directions
   - User reviews/ratings
   - Dark mode

---

Happy coding! 🎉
