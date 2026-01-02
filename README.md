# Meme Repo

A small static repository for storing and browsing meme images (GIFs and other image formats) with a simple client-side search UI.

## Purpose
This project provides a lightweight, static demo of a searchable meme gallery. It includes:

- `index.html` — search screen with live suggestions and theming.
- `results.html` — results view (now redirected to the single-page app at `index.html`).
- `meta-data.json` — metadata (Name, Keywords, File) used for search and suggestions.
- `memes/` — directory containing the image files referenced by the metadata.

The site is intended for local testing, demos, and as an example for building simple static search UIs; it is not a hosting service for copyrighted material.

## Usage
Run a local server and open the site in your browser:

```bash
python -m http.server 8000
# then open http://localhost:8000/index.html
```

## Disclaimer & Removal Policy
None of the memes or media in this repository are claimed as being owned by the project maintainers. If you believe you own the copyright to an item in this repository and would like it removed, please open an issue on this repository with the following information:

- The file path of the meme (e.g., `memes/example.gif`) or a clear description identifying the content.
- Proof of ownership (for example a link to the original source or other documentation).

Once provided, we will review the request and remove the content promptly if appropriate.

