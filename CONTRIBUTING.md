# Contributing to meme-repo

Thanks for considering contributing!

This repository contains **only the application code** (UI, search logic, rendering, styling, and configuration).  
All meme images and metadata live in the **meme-images** repository.

---

## 🧠 What belongs in this repo

You can contribute to:
- UI / UX improvements
- Search and filtering logic
- Performance optimizations
- Accessibility fixes
- Refactoring and cleanup
- Configuration improvements (`js/config.js`)
- Documentation updates

❌ Do NOT add:
- Meme images
- `meta-data.json`
- Any asset files

Those belong in the **meme-images** repository.

---

## 🚀 Running the project locally

This is a static project and requires a local web server.

```bash
python -m http.server 8000
# open http://localhost:8000/index.html
```
> Opening files directly using `file://` may break fetch calls.
---
## 🔧 Configuration

- External assets are configured via `js/config.js`

- If your change affects how assets are loaded, ensure:
   - No URLs are hardcoded
  - All asset access goes through configuration
---
### 🔁 Submitting changes

- Create a feature branch

- Keep PRs focused and small

- Clearly describe:

  - What changed
  - Why it changed
  - How to test it

If your change affects visuals, screenshots or short testing notes are appreciated.

---
## 📦 Related Repository

For memes, images, and metadata contributions, see:
👉 https://github.com/sriharshabammidi/meme-images

Thanks for helping improve the codebase!