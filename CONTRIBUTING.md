# Contributing

Thanks for considering contributing! This file explains where to add memes and how to update the metadata, plus how to request removal if you own the content.

## Adding memes
- Put image files under the `memes/` directory. Supported types: `.gif`, `.png`, `.jpg`, `.jpeg`, `.webp`.
- Prefer short filenames without spaces (e.g., `funny-cat.gif`).
- Commit the image file and add an entry to `meta-data.json` describing the item.

## Metadata structure (`meta-data.json`)
The metadata is a JSON array of objects. Each object should have at minimum these fields:

```json
{
  "Name": "Funny Cat",
  "File": "funny-cat.gif",
  "Keywords": ["cat", "funny", "meme"]
}
```

- `Name` (string): Display name for the meme.
- `File` (string): Filename under `memes/` referencing the image file.
- `Keywords` (array of strings): Terms used by the search engine for matching.
- You may add optional fields (e.g., `Source`, `Description`) but they are ignored by the simple client-side search.

After updating `meta-data.json`, ensure it stays valid JSON (no trailing commas) and that the `File` entry exactly matches the filename in `memes/`.

## Code contributions
Contributions to application code (features, bugfixes, accessibility improvements) are very welcome.

- How to run locally:

```bash
python -m http.server 8000
# open http://localhost:8000/index.html
```

- Please open a Pull Request with a clear description and testing notes. If the change affects visuals, include screenshots or short notes on how to test.

## Removal requests (copyright / takedown)
If you believe you own the copyright to an item in this repository and want it removed, please open a **Removal request** issue (we've provided a template for this in `.github/ISSUE_TEMPLATE/remove-meme.md`). Include:

- The file path to the meme (e.g. `memes/funny-cat.gif`) or a clear identifying description.
- Proof of ownership (link to source, or documentation demonstrating ownership).
- Any contact details you'd like to provide (email or GitHub handle).

We will review removal requests and promptly remove content where appropriate.

---

If you want, I can add an issue template for feature requests or a CONTRIBUTING checklist — would you like that?