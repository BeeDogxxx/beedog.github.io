# BeeDog — ONE MORE / 2026-09-08

This revision follows the user's selected Ticking Away / ONE MORE reference direction. It replaces the space outpost and etched-console treatment with an original illustrated comic cover and a shared publication system.

## Visual language

- Ink purple `#211c38`, warm paper `#f3efde`, yellow `#f2ef77`, orange red `#ef6448`.
- Angular illustrated action, hard offset shadows, thick ink borders, limited halftone accents, oversized italic cover type.
- Homepage: homepage-exclusive cover illustration, personal introduction, four navigable chapters. Native dialogs retain chapter navigation, keyboard shortcuts, focus restoration, local progress and reduced-motion preferences.
- Project page: numbered dark chapter headers, ACE project-specific four-step feedback diagram, responsibility and outcome blocks, numbered method panels. Resume facts and the distinction between personal responsibilities and system outcomes are preserved.
- All 16 routes receive the same masthead, footer, theme tokens, buttons and reading surfaces. Existing archive/game/map/guestbook functionality remains.

## Source responsibilities

- `css/site-system.css`: shared palette, masthead/footer, archive/reading components and project layout; replaces the former global theme.
- `css/comic-home.css`: cover, chapter tiles and native chapter dialog. Homepage no longer loads `world.css`.
- `js/world.js`: chapter controller; chapter names updated, existing interactions retained.
- `scripts/sync-site-shell.py`: idempotent shared shell and asset version references.
- `images/comic/one-more.jpg`: original generated artwork, 1536 × 1024. See `comic-art.md` for provenance and prompt.

## Validation

- Static checks: all 16 HTML pages, local references, duplicate IDs, five inline scripts, JavaScript syntax and CSS local asset references.
- Simulated DOM regression: four chapter contents and links, open/close and focus flow, progress persistence, keyboard shortcuts, motion preference, malformed/blocked storage, navigation toggle, Escape and outside/link closing.
- Responsive source rules: navigation at 1100 px; cover, dialogs, project panels and archives at 760 px. Reduced motion disables presentation animation and transitions without pausing game logic.
- No browser screenshot or interaction QA performed in this pass. The local preview is provided for the user to review the visual direction.
