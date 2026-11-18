# One World Beta 1.3.45 (67)

- Compact approved lobby buttons, inline survivor name/level and QUIT at the end of Settings. The old map selector is hidden as requested; both saved worlds and the previously selected world remain intact. No migration or world deletion.
- Restore the original girl artwork and approved wide landscape startup framing with large logo. Startup art motion is bounded to prevent edge gaps. Original clothing and images retained, no replacement artwork.
- Stop rendering/input on window focus loss, resume soft focus safely, retain save-before-title behavior for real background transitions. Rendering workload capped at 30 frames per second.
- Replace player-following fireflies with at most 2 low-quality / 4 other-quality sparse swamp-plant points and update active bounds.

This is a testing beta, not a confirmed fix for whole-phone hangs. Physical Android notification/recorder coexistence, GPU/thermal pressure and native restart are not verified. Do not repeat a crash stress test. Install in place; do not uninstall or clear data.

Browser checks: both world entry flows; 31 lifecycle/input/save assertions per world; 14 host lifecycle assertions; six viewport hit checks. Final game-settings screenshot capture timed out after state checks, not a complete clean test exit. Counter-based scheduling checks are not physical GPU FPS tests. Portrait and world-entry wallpaper layout remain baseline and are not a new approved redesign.

Not included: terrain experiments, weather scheduler, running/swim drafts, profile migration, new clothing artwork or separate image requests.
