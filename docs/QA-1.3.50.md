# One World Beta 1.3.50 / code 72

This is an owner-requested testing beta, not a stable launch.

- Cumulative Second Map only; same world and resource identity. No save deletion, recreated world, or First Map routing.
- Broad connected alpine ridges, terraced desert highland, wooded central ridges, dispersed swamp crags. Heights and occluded shapes are interpretations of the supplied illustration.
- Terrain render and ground queries share the horizon mesh surface. More geometry is allocated to the biome landforms.
- Existing harvestable game trees retained; lightweight distant canopy fills the landscape outside the local streamed radius.
- Beta-only inspection flight: Settings > Help & Beta. Touch UP/DOWN, joystick travel, RETURN. Keyboard Q/E changes height. Flight does not change the saved ground location; stopping returns to the anchor. Survival drain and attacks are held during inspection.
- Pre-update local world/profile bytes archived once in oneworld-pre1350-backup-v1. Saving is paused if that archive cannot be stored. Existing progress, resources, station state, profiles and inventory are not reset.
- Profiles: default Boy; required name; two-profile creation cap; existing larger registries preserved; direct inline switching without popup.

Local tests cover entry readiness, flight movement/save/return, menu/settings/campfire regression, profile switching/limits, terrain finite values, actual biome screenshots and package contents. Physical Android FPS, thermal behavior, long-session memory and the previously reported app exit remain unverified. Install over the existing beta without clearing data. The owner will inspect the world after installation.

AI assistance produced draft geometry ideas, not finished model assets. The shipped landform height functions were independently revised; crude draft trees were not adopted. Claude said it could not see its attached image, so its contribution is description-based only. Three.js/Quaternius/VRoid/Poly Haven and original-game notices remain bundled.
