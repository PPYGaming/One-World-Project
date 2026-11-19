# One World Beta 1.3.49 (71)

Testing beta, not a stable release. Update over the existing beta without uninstalling or clearing app data.

- First-time setup requires an explicit Boy or Girl choice and survivor name. Done opens the menu, not the world. Existing saved characters are retained.
- The small + below the menu profile adds another local profile, with separate per-map world saves. Tap the profile name to choose an existing profile.
- A small lower-left Motion Blur checkbox replaces the large motion button. It starts unchecked. It controls the existing phone-driven menu motion, not post-processing blur.
- Title and loading artwork keep the character head visible on wide phones.
- World entry prepares the selected graphics preset's nearby terrain, materials and first render before dismissing loading. Fresh installs start on the existing Low preset; saved graphics choices are preserved. The hidden character-preview graphics context is released during gameplay and rebuilt when needed.
- Only the existing cumulative Second Map is playable. A stale First/Original selection no longer sends players to the retired map. Its local save is left untouched for recovery, not merged or erased. The published Second Map assets, beach, trees, beacons, fireplace, crafting and settings are retained.
- Previous-session events are retained in Diagnostics to help investigate an unexpected app exit.

Important: the reported Android crash to the phone home screen and phone heating have NOT been confirmed fixed. Browser state, movement and bounded real-render checks passed on the Second Map; these are not physical-phone, temperature or sustained-performance tests. Do not repeatedly launch the game while the phone is hot. Let it cool. No excessive artificial world-entry wait was added.

Inventory/station/waterskin behavior from 1.3.48 is preserved. No progression proposal, map geography, new model, HP or audio changes. Original game by Smiley, used and modified with permission. Retain bundled credits and third-party notices.
