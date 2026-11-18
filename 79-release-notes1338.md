# 1.3.38 (versionCode 60) - Map2 terrain and resource compatibility

Incremental Map2 terrain update, not a full reconstruction of the reference image.

- Continuous rendered terrain with adaptive coast/site detail and stitched edges; player, water depth and object placement use the same rendered surface.
- Varied taller original trees, close full geometry and distant rendered impostors, reduced distant undergrowth cost; original creature animation geometry retained with rigid-piece batching.
- Swamp mud, sand and sparse forest-floor patches; estimated interior relief. Map image, geography bounds, north/grid/bed markers and Map1 remain unchanged.
- Failed shore animal spawn sampling defers the spawn instead of putting creatures at the player's feet. Map2 water glare reduced.
- Existing saves retain the37 tree identity generator and harvested strings. They retain37's quality-dependent tree population. Trees newly below water or on unsafe steep slopes are hidden at their original seed locations, not moved or given another tree's key. Explicit new games use stable candidate identities across quality settings. No default reset, harvested record deletion or ambiguous conversion.

## Local verification
- Map1 cumulative110 checks pass; no failed requests.
- Actual37 runtime harvested six trees and saved. Exact save in38 retained all six records; none reappeared and no visible key changed X/Z across low/medium/high. Copied37 generator matched83 actual37 loaded cells.
-54,510 terrain cell-edge samples: maximum difference across0.00002m distance0.0000691m.
-238m walk across3 cells: no missing chunks; maximum ground step0.0184m.
-2,601 shoreline water samples match rendered ground exactly; repeated five-location shore spawn test found no visible unsafe dry-land creatures.
- Synthetic37 save preserves name, girl selection, inventory, coordinates, bed, campfire, marks and harvest arrays. Map1 save unchanged.
- Actual screenshots inspected at beach, swamp, snow edge, forest, desert, lab and flagged shoreline.

## Limits and exclusions
No physical Android FPS/touch/audio validation. Coast edges can remain angular. Desert cliffs, waterfalls and exact reference-image landform correspondence are not complete. No external replacement tree/animal asset pack, Bilal settings patch, hair redesign or new peer animation patch included. This is a beta, not a stable release. No performance claim from software-rendered desktop timings.
