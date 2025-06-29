# RECOMMENDATIONS log started
## 2025-06-17 12:34:58 UTC
- [x] Integrate Postgres as a dedicated service for artwork metadata.
- [x] Store image files under artwork/ with clear naming.
- [x] Provide search API to query by tags.
- [x] Use TypeScript for new viewer components.

### Storage Evaluation
- **Filesystem**: simple, cheap, and easy to serve via static middleware; good for large binaries.
- **Database (BLOB)**: centralized but increases DB size and backup complexity; slower to serve.
- **Object storage (e.g., S3)** could offload static files but requires additional service.

Chosen approach: keep artwork images in the repository/filesystem and store metadata (title, tags, filename) in Postgres. This keeps the DB lean while enabling search by tags.
