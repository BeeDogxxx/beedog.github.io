# Editorial type and motion — 2026-09-08

The shared comic system now separates condensed italic display lettering, Chinese heading weights, body copy and metadata. Barlow Condensed ExtraBold Italic supplies display lettering; Noto Sans SC supplies heading weights 600–900. Body copy retains the local system sans stack. Both modified fonts have unique internal family names and are hosted as WOFF2, approximately 241 KB combined, with `font-display: swap` and system fallbacks.

Sources (Google Fonts):
- https://github.com/google/fonts/tree/main/ofl/barlowcondensed
- https://github.com/google/fonts/tree/main/ofl/notosanssc

Original OFL licenses and copyright notices are retained in `fonts/`. `scripts/subset-heading-fonts.py` builds the web files from the source TTFs using fonttools[woff]. It collects current static headings and runtime heading characters. New characters fall back to system fonts; rerun the subset script when substantially expanding the heading corpus. Chinese variable fonts are subset before limiting their weight axis.

UI changes refine heading spacing, line height, reading width, card borders and shadows, navigation weight, metadata and mobile spacing. Generated art from the previous pass is reused.

`js/editorial-motion.js` applies a brief entrance once per section; content is visible without JavaScript or IntersectionObserver. An initial stamp and chapter ink accent complete the motion system. The shared motion toggle, system reduced-motion preference and page exit stop optional entrances. No game targets, timers or input handling are animated by this controller. Sections are unobserved after entrance; no continuous scroll handler or animation loop is added.

Validation: font cmap and variable weight range checks; HTML/CSS resource checks; editorial entrance once/fallback/cancellation tests; existing navigation, chapter and game behavior suites. No browser automation was requested or used.
