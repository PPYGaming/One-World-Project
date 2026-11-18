# One World Beta 1.3.42

Incremental testing beta, not a stable release.

- Camera-screen taps and cancelled touches no longer attack. The dedicated attack button and keyboard attack still work.
- Inventory avatar previews release their clone-owned graphics resources even after a render/readback error. Shared source geometry/materials/textures are preserved. Preview target dimensions now follow display-density changes. This addresses measured allocation growth, not a confirmed realme crash cause.
- Duplicate SELECT/CRAFT tabs removed from both inventory and crafting. Use the existing bag and hammer buttons to open the corresponding view. Short-screen inventory content and lower close button remain reachable by scrolling.
- Standing in an existing water volume now fills hydration completely, without filling stamina. No fresh/salt distinction, oxygen system, underwater gameplay or map changes added.

Generic food/water quickslots, equipped food/water hand meshes, direct-inventory eating removal, reusable waterskin/refill state and timed station crafting are NOT included. Existing bottle and inventory consumption behavior remains for now. No weights, slot limits, progression, respawn, save-format migration or Map1 deletion changes.

Desktop checks: 110 Map1 regressions, 25 Settings checks, focused touch/preview error and retry checks, repeated boy/girl preview allocation checks, original-map river/sea/dry and current-map sea/swamp/dry hydration checks, 888x400/640x360/390x844 scroll reachability. Actual WebGL context-loss recovery preserves exact saved state. A separate river was not located in the sampled current-map region; that test is not claimed there. GPU readback stalls can still occur.

No physical Android-phone install/performance/crash certification. Realme sudden exit remains unresolved pending device diagnostics. Original signing certificate retained. Update over the existing beta; do not uninstall or clear data.
