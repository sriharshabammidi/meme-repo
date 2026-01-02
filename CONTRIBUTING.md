# Contributing

Thanks for considering contributing! This file explains where to add memes and how to update the metadata, plus how to request removal if you own the content.

## Adding memes
- Put image files under the `images/` directory in [meme-images repository](https://github.com/sriharshabammidi/meme-images). Supported types: `.gif`, `.png`, `.jpg`, `.jpeg`, `.webp`.
- Prefer short filenames without spaces (e.g., `funny-cat.gif`).
- Commit the image file and add an entry to `meta-data.json` describing the item.

## Metadata structure (`meta-data.json`)
The metadata is a JSON array of objects. Each object should have at minimum these fields:

```json
{
  "Id": "01234567-89ab-cdef-0123-456789abcdef",
  "Name": "Funny Cat",
  "File": "funny-cat.gif",
  "Keywords": ["cat", "funny", "meme"]
}
```

- `Id` (string): Required GUID identifier for the item (e.g., `01234567-89ab-cdef-0123-456789abcdef`). Must be unique.
- `Name` (string): Display name for the meme.
- `File` (string): Filename under `images/` directory in [meme-images repository](https://github.com/sriharshabammidi/meme-images) referencing the image file.
- `Keywords` (array of strings): Terms used by the search engine for matching.
- You may add optional fields (e.g., `Source`, `Description`) but they are ignored by the simple client-side search.

After updating `meta-data.json`, ensure it stays valid JSON (no trailing commas), that the `File` entry exactly matches the filename in `images/` directory in [meme-images repo](https://github.com/sriharshabammidi/meme-images), and that the `Id` is present and unique.

## Code contributions
Contributions to application code (features, bugfixes, accessibility improvements) are very welcome.

- How to run locally:

```bash
python -m http.server 8000
# open http://localhost:8000/index.html
```

- Please open a Pull Request with a clear description and testing notes. If the change affects visuals, include screenshots or short notes on how to test.

## Removal requests (copyright / takedown)
If you believe you own the copyright to an item in this repository or [meme-images repository](https://github.com/sriharshabammidi/meme-images) and want it removed, please open a **Removal request** issue (we've provided a template for this in `.github/ISSUE_TEMPLATE/remove-meme.md`). Include:

- The file path to the meme (e.g. `images/funny-cat.gif`) or a clear identifying description.
- Proof of ownership (link to source, or documentation demonstrating ownership).
- Any contact details you'd like to provide (email or GitHub handle).

We will review removal requests and promptly remove content where appropriate.