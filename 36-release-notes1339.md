# 1.3.39 (versionCode 61) - SELECT/CRAFT and recovery safeguards

Incremental testing beta, not a stable release. Includes reviewed Bilal SELECT/CRAFT contribution, integrated and independently tested against cumulative 1.3.38.

- One inventory panel with SELECT default and CRAFT tabs, actual inventory actions and existing recipe consume/output rules. Existing HUD Craft opens CRAFT directly. Other gameplay HUD bindings unchanged and blocked behind the open panel.
- Inventory no longer pauses the world, as requested. Vitals and hostiles continue. Held movement/joystick/auto-run inputs clear on open; held gameplay keys cannot re-enter while browsing. Settings, map and other pause menus still pause.
- Death/respawn cleanup restores closed-HUD Craft. Preview identity tracks character and appearance; unchanged tab switches reuse the preview. Live fullscreen inventory blur removed.
- Same exact 1.3.38 terrain triangles and geography with shared vertices: terrain geometry allocation falls from 12.19 MB to 7.98 MB. Approved map, saves, legacy tree identity handling and all cumulative 1.3.38 changes retained.
- Graphics-context loss opens a recovery screen. WebView renderer-loss callback has an explicit recovery path and repeated-failure native fallback; returning to the title requires a button. No world reset or automatic reload loop. Device/previous-process exit diagnostics are shown in beta diagnostics when Android exposes them.

## Local qualification

- 110 cumulative Map1 checks pass with the inventory assertion updated to the approved no-pause behavior. Independent Map2 crafting, live simulation/vitals, input, unrelated pause menus, character/appearance, death/respawn and HUD checks pass.
- 20 alternating tabs plus 5 active SELECT clicks keep live geometry/texture/program counts bounded. Actual setup/new-world appearance reflected in inventory preview.
- Every indexed terrain triangle position, normal and color is exact; 69,905 height samples unchanged.
- Forced real WebGL context loss reaches recovery UI with saved-world bytes unchanged. Recovery landscape/portrait pixels and explicit button behavior inspected. Android compile and 14 extracted native callback host-double checks pass.

## Limits

The earlier phone exit is intermittent and its cause is unknown; this is NOT a confirmed phone-exit fix. Actual Android native renderer-gone/OS-exit callback and fallback paths, physical touch/multi-touch, FPS and audio remain unverified. Browser/software GL is not a phone benchmark. Actual preview redraws after changed character/equipment can still allocate additional resources, an existing lifetime limitation; unchanged tab amplification is fixed. Existing coast angularity, sparse beach, unfinished reference cliffs/waterfalls and old-save quality-dependent resource population remain. Shore shading preview is excluded pending approval. No save reset, key sharing or stable release.
