# Comic UI details — 2026-09-08

Three original imagegen assets form the shared ink layer: a sweeping energy slash, an asymmetric impact spark, and fine paper grain. Exact prompts and dimensions are in `comic-ui-assets.json`. Web files are resized with sips; transparent PNGs retain alpha and the opaque grain is JPEG. Total new raster weight is approximately 280 KB.

`css/comic-details.css` extends the existing print palette across all 16 pages through `scripts/sync-site-shell.py`. Marks are confined to chapter openings, card margins, selected navigation, the project case caption, and action feedback. Long-form body text stays clear. The ACE feedback diagram remains the case-specific visual; the homepage illustration is not repeated in projects.

Artwork uses noninteractive CSS backgrounds. Hover/focus effects honor the existing motion toggle and reduced-motion preference. Mobile styles reduce edge ornaments and retain full-width controls; no new functionality or resume claims are introduced.

Validation: all local HTML/CSS references and inline script syntax pass; existing menu, chapter, keyboard, storage and motion behavior checks pass. Browser visual testing was not requested.
