#!/bin/bash

# Color codes
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}📍 Nearby - GitHub Setup Script${NC}\n"

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${RED}❌ Error: Not a git repository!${NC}"
    echo "Run: git init"
    exit 1
fi

# Get username
read -p "Enter your GitHub username: " USERNAME
if [ -z "$USERNAME" ]; then
    echo -e "${RED}❌ Username cannot be empty!${NC}"
    exit 1
fi

# Confirm repository name
read -p "Repository name (default: nearby): " REPO_NAME
REPO_NAME=${REPO_NAME:-nearby}

# Build the repository URL
REPO_URL="https://github.com/${USERNAME}/${REPO_NAME}.git"

echo ""
echo -e "${YELLOW}Configuration:${NC}"
echo "GitHub Username: $USERNAME"
echo "Repository: $REPO_NAME"
echo "URL: $REPO_URL"
echo ""

# Confirm
read -p "Continue with this configuration? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Cancelled."
    exit 1
fi

echo ""
echo -e "${YELLOW}Setting up git configuration...${NC}"

# Configure git if needed
if [ -z "$(git config user.name)" ]; then
    git config user.name "Nearby Developer"
    echo -e "${GREEN}✓ Set git user.name${NC}"
fi

if [ -z "$(git config user.email)" ]; then
    git config user.email "dev@nearby.local"
    echo -e "${GREEN}✓ Set git user.email${NC}"
fi

# Check if remote exists
if git remote get-url origin &>/dev/null; then
    echo -e "${YELLOW}Remote 'origin' already exists.${NC}"
    EXISTING_URL=$(git remote get-url origin)
    echo "Current: $EXISTING_URL"
    
    if [ "$EXISTING_URL" != "$REPO_URL" ]; then
        read -p "Replace with new URL? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            git remote remove origin
            git remote add origin "$REPO_URL"
            echo -e "${GREEN}✓ Updated remote origin${NC}"
        fi
    fi
else
    git remote add origin "$REPO_URL"
    echo -e "${GREEN}✓ Added remote origin${NC}"
fi

# Rename master to main
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" = "master" ]; then
    read -p "Rename 'master' branch to 'main'? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        git branch -m main
        CURRENT_BRANCH="main"
        echo -e "${GREEN}✓ Renamed to 'main'${NC}"
    fi
fi

echo ""
echo -e "${YELLOW}Pushing to GitHub...${NC}"
echo "Branch: $CURRENT_BRANCH"
echo "Remote: $REPO_URL"
echo ""

# Try to push
if git push -u origin "$CURRENT_BRANCH"; then
    echo ""
    echo -e "${GREEN}✅ Successfully pushed to GitHub!${NC}"
    echo ""
    echo -e "${YELLOW}📌 Next steps:${NC}"
    echo "1. Visit: https://github.com/${USERNAME}/${REPO_NAME}"
    echo "2. For deployment, see: ./SETUP.md"
    echo "3. For development, see: ./DEVELOPMENT.md"
    echo ""
    echo -e "${YELLOW}🚀 Deploy options:${NC}"
    echo "   - GitHub Pages (free)"
    echo "   - Netlify (recommended)"
    echo "   - Vercel"
    echo "   - Self-hosted"
    echo ""
    echo "Read SETUP.md for detailed instructions."
else
    echo ""
    echo -e "${RED}❌ Push failed!${NC}"
    echo "Make sure:"
    echo "  1. Repository exists at $REPO_URL"
    echo "  2. You have push access"
    echo "  3. You're authenticated (check SSH keys or personal access token)"
    exit 1
fi
