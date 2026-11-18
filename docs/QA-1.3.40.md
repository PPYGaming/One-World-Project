# 1.3.40 (versionCode 62) - Water and swimming

Incremental testing beta, not a stable release. Preserves the cumulative 1.3.39 game and save/update continuity.

- Shallow clear water with visible sand transitions into deeper blue, with animated ripple shading. Beach sand has original grain/ripple detail; rocks share grain and a rougher finish but remain faceted.
- Upright chest-depth rest float with arms extended sideways; moving swimming uses a head-raised stroke and kick. Removes the repeated whole-body bob while swimming.
- A modest ocean grid improves water/body depth intersection without changing the ocean height, coverage, shoreline or terrain.
- Joystick input avoids repeated layout reads and duplicate painting while preserving the existing controls.

Unchanged: existing stationary stamina recovery (+12/sec) and moving stamina cost (-5/sec), shallow wading, saved worlds, map geography, background/restart policy and camera pitch range. No underwater-camera restriction was added.

Local checks: both avatars inspected across idle/moving/rest animation phases, stamina samples, 110 Map 1 regression checks and Map 2 inventory/crafting/background-simulation/menu/death/respawn checks. Android compilation and package/signature/content checks are separate from physical-device testing.

Limits: recording-associated restart/lag is NOT fixed or claimed fixed. Underwater camera can still cross the one-sided water surface. Phone FPS, recording behavior, GPU cost and all-device Android 10-16 compatibility need physical testing. Rocks are not a high-detail model replacement.
