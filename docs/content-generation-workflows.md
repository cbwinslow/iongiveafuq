# Content generation workflows (comics, pictures, videos, wallpapers)

This playbook standardizes how to prototype characters across Google Veo 3, Wan 2.2, Sora, and any HTTP-compatible image/video generator. It also includes batching steps for initial visual exploration.

## Quickstart scripts

* `scripts/asset_generation/generate_variations.js` — batches prompts across all mascots and saves images (or JSON stubs) to `artwork/renders/`. Set `GEN_API_URL`, `GEN_API_KEY`, and optionally `GEN_MODEL` (e.g., `wan-2.2`, `veo-3`, `sora-video`).
* `artwork/` — target folder for renders. The script auto-creates `artwork/renders` when run.

Run in dry-run mode to preview payloads without credentials:

```bash
GEN_MODEL=wan-2.2 node scripts/asset_generation/generate_variations.js
```

Run against a real endpoint (example shape for Wan/Veo/Sora-style POST APIs):

```bash
GEN_API_URL="https://api.your-provider.com/v1/generate" \
GEN_API_KEY="sk-..." \
GEN_MODEL="veo-3" \
node scripts/asset_generation/generate_variations.js
```

The script sends JSON like:

```json
{
  "model": "veo-3",
  "prompt": "Dumbo hero shot, synthwave neon, volumetric lighting, crisp details, 4k",
  "seed": 101,
  "output_format": "png",
  "aspect_ratio": "16:9"
}
```

If the API returns binary image/video data, it is written directly to `artwork/renders/{character}_{style}_seed-{seed}.png`. If credentials are missing, the script writes `.json` stubs showing the exact payload for review.

## Workflow: initial character exploration (images)

1. Update prompt sets in `scripts/asset_generation/generate_variations.js` (characters, styles, seeds).
2. Run in dry-run mode to review payload JSON stubs.
3. Point `GEN_API_URL`/`GEN_API_KEY` to a provider (Veo 3, Wan 2.2, Sora image endpoint, or a free service).
4. Inspect generated files in `artwork/renders/` and pick 3–5 favorites per character.
5. Add notes on palettes, silhouettes, and props to `docs/artwork-prompts.md` or a new prompt file.

## Workflow: storyboard + video beats

1. Reuse the same prompt lists but set `GEN_MODEL=sora-video` (or your provider’s video-capable model name).
2. Change `output_format` in the script to `mp4` when supported.
3. For each character, request 3 short clips: idle, action loop, and dramatic close-up.
4. Save clips to `artwork/renders/animatics/` (create the folder as needed).
5. Capture thumbnails and link them inside `docs/COMICS_AND_ANIMATION_GUIDE.md` for quick review.

## Workflow: comics and wallpaper packs

* **Comics**: Use `comicIssues` data in `frontend/src/data/catalog.ts` to keep track of issue summaries and focus characters. When panels are approved, drop the images into `frontend/public/comics/{issue}` and link them in `frontend/src/pages/Comics.tsx`.
* **Wallpapers**: Renders tagged in `catalog.ts` surface automatically on the `/wallpapers` page. Add new entries with resolution + description and redeploy.

## Quality gates and approvals

1. Dry-run payload review (no API keys) → confirm prompts, seeds, aspect ratio.
2. Low-res batch generation (512–768px) for fast iteration.
3. High-res rerun for shortlisted prompts.
4. Add chosen renders to wallpapers or store print products.
5. Mark final picks in `RECOMMENDATIONS_*.md` with rationale and follow-up tasks.

## Free platform options

* **Hugging Face Inference Endpoints** (Stable Diffusion variants) — swap `GEN_API_URL` for your endpoint URL.
* **Fal.ai / Replicate** — adapt payload shape; keep headers and file writes identical.
* **Local WebUI / ComfyUI** — expose a POST endpoint locally and run the same script against `http://localhost:port`.

These workflows ensure every character gets multiple visual variations across images, video tests, wallpapers, and comics before locking the final art direction.
