# SiteLens Architecture

## Project Structure

```bash
sitelens-extension/
├── manifest.json # Extension manifest (MV3)
├── popup.html # Popup interface
├── popup.js # Handles UI interactions
├── content.js # DOM analysis logic
├── styles.css # Popup styling
├── README.md
├──────docs/
        ├────ARCHITECTURE.md
        ├────CHANGELOG.md
        ├────CONTRIBUTION.md

```

## Modules

1. **content.js**
   - Injected into active tab
   - Collects DOM elements
   - Applies rule engine (v0.1.0: alt, H1, meta, viewport)

2. **popup.js**
   - Handles button click
   - Sends message to content.js
   - Renders results in popup

3. **popup.html & styles.css**
   - Basic UI for MVP
   - Will evolve with UX improvements

---

## Rules & Versioning

- Each release tagged in Git: `vX.Y.Z`
- Rules added in feature branches → merged into dev → main
- Only tested and stable rules reach main
