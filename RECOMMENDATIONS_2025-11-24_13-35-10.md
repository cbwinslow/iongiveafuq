## 2025-11-24 13:35 UTC
- Wire the cart to backend pricing/tax APIs and persist to localStorage to keep items across sessions.
- Add real download handlers for wallpapers/comics and integrate a CMS-backed asset manifest so catalog.ts stays in sync with uploads.
- Replace placeholder AI endpoint variables with provider-specific adapters (Veo/Wan/Sora) and add smoke tests that run the batch generator in dry-run mode during CI.
- Add a responsive mega-menu or drawer for mobile navigation to handle the increased number of sections without wrapping.
