# SiteLens

SiteLens is an **offline-first Chrome extension** for auditing websites.  
It scans the current tab's DOM and reports **accessibility, SEO, and semantic issues**.

---

## Features (v0.1.0)

- Scan active tab only
- Detect missing alt attributes
- Detect multiple H1 tags
- Detect missing meta description
- Detect missing viewport meta
- Display results in popup

> Future versions will include:

- Rule expansion
- UX improvements (loading spinner, animated background)
- Save and export scan results
- AI suggestions

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/sitelens-extension.git
cd sitelens-extension
```

2. Load the extension in Chrome:

- Go to `chrome://extensions`
- Enable Developer Mode
- Click "Load unpacked" and select the folder
- Click the extension icon → Click "Scan Page"

## Usage

- Open the website you want to scan.
- Click the SiteLens icon.
- Click "Scan Page".
- See results in popup.

## Branching & Versioning

- `main` → production-ready
- `dev` → integration branch
- `feature/<feature-name>`\* → individual feature branches
- Versioning follows SemVer:
- `PATCH` → bug fixes or UI tweaks
- `MINOR` → new feature or UX upgrade
- `MAJOR` → stable, production-ready release

## Roadmap

| Version | Feature                                 |
| ------- | --------------------------------------- |
| v0.1.0  | MVP: 4 basic rules, active tab scanning |
| v0.2.0  | UI & UX improvements (spinner, layout)  |
| v0.3.0  | Rule expansion                          |
| v0.4.0  | Save and recent scan feature            |
| v0.5.0  | Export reports (JSON/HTML)              |
| v1.0.0  | Stable release                          |

## License

`MIT`
