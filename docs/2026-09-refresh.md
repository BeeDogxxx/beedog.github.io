# BeeDog exploration outpost — September 2026

The homepage is now an explorable space outpost, with four destinations for work, writing, offline life, and profile. All existing page URLs remain available. Interior pages share a dark teal and honey-yellow theme.

## Interaction and accessibility

- Four map points and matching destination buttons open native modal dialogs.
- Keys 1–4 select a destination; Escape closes the dialog. Focus returns to the trigger.
- Exploration progress is stored only in the current browser. Missing, malformed, or blocked local storage does not prevent exploration.
- Motion respects the system reduced-motion setting. The page also offers a motion toggle.
- Direct portfolio/contact links remain visible. A noscript navigation list covers every destination.
- Interior mobile navigation uses real buttons and updates its expanded state.

## Content changes

The homepage introduction and NOW page describe the current focus on customer-service AI applications and cross-team collaboration in Chengdu. The NOW date is fixed to the actual edit date. A subsequent content revision aligned the homepage, profile, NOW page and portfolio with the user-provided September resume. It retains the subsidiary employment qualifier, separates individual responsibilities from system outcomes, corrects employment dates, and removes metrics absent from the current resume. These are resume-sourced statements, not independently audited business measurements.

The contact form opens a populated email draft; it does not claim to send messages. Visitors confirm sending in their email application. The guestbook retains its existing browser-only storage behavior.

## Validation

- All 16 HTML pages: local link and asset existence checks passed.
- All 5 inline script blocks plus shared JavaScript: syntax checks passed.
- DOM simulation: zone content/destination routing, open/close/focus behavior, keyboard activation, progress persistence, reduced-motion initial state, malformed and blocked storage passed.
- Local HTTP homepage returned 200.
- No browser rendering or interaction test was performed in this revision.

## Original scene asset

File: `images/world/beedog-outpost.jpg`, 1672 × 941, approximately 381 KB. Generated once with the built-in image_gen tool and encoded as JPEG for web use. This is original decorative concept art, not a photograph of a real workplace.

Prompt:

> Use case: stylized-concept. One original full-bleed landscape hero image for a BeeDog personal portfolio immersive explorable space-base homepage. Cinematic premium indie game concept art of a monumental floating dark basalt planetoid bearing a small futuristic research outpost. Deep black teal starfield, sparse stars, floating rock fragments, subtle volumetric cosmic dust. Honey-yellow glowing glass observatory dome and thin glowing orbital machinery at center-right, dark graphite outpost buildings, tiny landing pad, antenna, subtle cyan details. Distribute the cohesive outpost modules approximately at image coordinates 55% across / 52% down for research, 80% across / 40% down for an archive tower, 72% across / 77% down for landing area, and 48% across / 78% down for a small garden platform. These modules belong to a single natural sculptural landscape, never separate icons. Tactile highly detailed 3D miniature with isometric perspective, sophisticated mature art direction, carefully modeled basalt geology and industrial architecture, cinematic quality. Wide 16:9 landscape. All detailed world occupies the right 65% of the frame; left 35% is mostly very dark uncluttered negative space suitable for large HTML intro copy added later. Monumental and immersive with a clear world silhouette. Dramatic honey-yellow rim light, warm glowing dome, restrained cyan accents, volumetric dust, mysterious and welcoming atmosphere. Exactly one image. No borders, no dog character, no other characters, no text, no typography, no logos, no UI, no watermarks. Not cartoon illustration.
