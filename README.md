# 😂 Meme Repo
![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Deployed-brightgreen)
![Website](https://img.shields.io/website?url=https://sriharshabammidi.github.io/meme-repo)
[![Live Demo](https://img.shields.io/badge/Live%20Demo-Open-blue)](https://sriharshabammidi.github.io/meme-repo)
![Stars](https://img.shields.io/github/stars/sriharshabammidi/meme-repo?style=flat)
![Forks](https://img.shields.io/github/forks/sriharshabammidi/meme-repo?style=flat)
![Last Commit](https://img.shields.io/github/last-commit/sriharshabammidi/meme-repo)
![Assets Repo](https://img.shields.io/badge/Assets-meme--images-orange)

A lightweight client-side meme browser built using plain HTML, CSS, and JavaScript.

This repository manages **only the application code** (UI, search, rendering).  
All meme images and metadata are maintained in a separate [meme-images repository](https://github.com/sriharshabammidi/meme-images) and served via GitHub Pages.

---

## 🧩 Repository Structure

This project is intentionally split into two repositories for better maintainability.

### 1. meme-repo (this repository)
Responsible for:
- UI pages
- Search logic
- Rendering memes
- Styling
- Configuration

### 2. [meme-images](https://github.com/sriharshabammidi/meme-images)
Responsible for:
- Meme images
- `meta-data.json`
- Hosting assets using GitHub Pages

---

## 🗂️ Data Flow
```
meme-repo (UI & logic)
        |
        | fetch()
        v
meme-images (GitHub Pages)
  ├── meta-data.json
  └── meme images
```
Meme metadata is fetched dynamically from `meta-data.json`

Meme images are rendered using the base URL defined in `js/config.js`

## 🚀 Running Locally
This is a static project and needs a local web server.

### Option 1: Python
```bash
python -m http.server 8000
# open http://localhost:8000/index.html
```
### Option 2: VS Code Live Server
- Install the Live Server extension

- Open index.html using Live Server

> Opening files directly using `file://` may break fetch calls due to browser restrictions.
---
## 🌐 Hosting
This project works seamlessly with GitHub Pages.

- `meme-repo` hosts the UI and logic

- `meme-images` hosts meme assets

The asset base URL can be replaced with:

- Any GitHub Pages site

- Cloudflare Pages

- AWS S3 or any CDN
---
## 🤝 Contribution Guidelines
- Keep all UI and logic changes in `meme-repo`

- Keep all images and metadata in `meme-images`

- Ensure configuration changes go through config.js

- Read more on [CONTRIBUTING.md](/CONTRIBUTING.md)
---
## 📄 License
MIT License

Use it freely, modify it, and share it.