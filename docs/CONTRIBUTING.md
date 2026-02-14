# Contributing to SiteLens

Thank you for considering contributing! Please follow these guidelines:

1. **Branching**
   - Work on `feature/*` branches
   - Merge into `dev` only after testing
   - Do not merge directly into `main`

2. **Commits**
   - Use clear messages: `feat:`, `fix:`, `chore:`
   - Reference issues if available

3. **Versioning**
   - PATCH → bug fixes / UI tweaks
   - MINOR → new features / UX improvements (e.g., v0.2.0: responsive popup, spinner, fallback injection)
   - MAJOR → breaking changes / stable release

4. **Testing**
   - Ensure popup loads
   - Ensure content.js injects successfully
   - Verify rule outputs are correct

5. **Changelog**
   - Add entries to `CHANGELOG.md` with each release
   - For v0.2.0, document UI/UX improvements, fallback logic, and error handling
