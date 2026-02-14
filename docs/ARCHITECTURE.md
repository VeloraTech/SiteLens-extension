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
   - Injected into active tab (fallback injection if missing, v0.2.0)
   - Collects DOM elements
   - Applies rule engine (v0.1.0: alt, H1, meta, viewport)
   - Responds to scan requests and returns H1 results (v0.2.0)

2. **popup.js**
   - Handles button click
   - Sends message to content.js
   - Fallback: injects content.js if not present (v0.2.0)
   - Shows loading spinner while scanning (v0.2.0)
   - Renders results in popup
   - Displays friendly message if no H1 tags found (v0.2.0)

3. **popup.html & styles.css**
   - Responsive popup UI (v0.2.0)
   - Loading spinner and improved layout (v0.2.0)
   - Basic UI for MVP
   - Will evolve with UX improvements

---

## Rules & Versioning

- Each release tagged in Git: `vX.Y.Z`
- Rules added in feature branches → merged into dev → main
- Only tested and stable rules reach main
