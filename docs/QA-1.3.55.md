# One World beta 1.3.55: visible loading progress and two-artwork pacing

- Replaces the long stationary 50% milestone during terrain setup with work-based progress: terrain color rows, detail-grid work, terrain-mesh tiles and distant-forest samples. Stage labels include live work counts. These are weighted setup stages, not a time estimate or download-byte percentage.
- Initial loading uses girl artwork first and requests boy artwork at the terrain-mesh phase. Setup continues in the same world, with no restart or duplicate generation. This is a phase split, not equal elapsed halves.
- Each initial artwork has a 1.5-second minimum only when work finishes unusually fast. The clocks run alongside setup; any remaining boy minimum is covered after setup, with scene redraws. No fake percentage timer or extra per-percentage pause.
- Retains 54 loading-wallpaper tilt independently of lobby's default-OFF checkbox, top-anchored full-screen framing and 53 world-ready covered rendering for about 1.5 seconds before gameplay starts. Input/survival stay stopped while covered.

Verified locally: real displayed progress changes during animation frames, both initial artworks, exact HTML startup without JavaScript/game/CSP errors, all required nearby chunks, covered world-entry frames and unchanged player state while covered. 37 motion-contract checks retained. Fast-path pacing test confirmed 1.5 seconds per artwork while independent work continued; slow-path completed immediately without an extra wait. Terrain positions/normals/colors/indices/color texture and distant-tree instance matrices/colors hash-identical to 54.

Physical Android installation, actual phone sensor smoothness, phone startup duration/FPS and crash prevention are not verified. No claim that an added overlay wait cures lag or renderer failure. Android remains landscape; narrow portrait fallback can crop long hair outside the crown/face.

Full standalone APK and full editable source; no unrelated item/crafting changes. Android 10/API29 minimum, code77, original signing certificate. Original game by Smiley, modified with permission. Third-party notices retained. Testing beta, not stable.
