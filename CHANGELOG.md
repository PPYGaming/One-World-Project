# 1.3.50 (beta, code 72)

- Complete-world terrain integration with connected regional landforms and distant forest canopy.
- Beta-only inspection flight in Help & Beta, with safe return and saved-location protection.
- Automatic pre-update world/profile archive without clearing progress.
- Default Boy and required name, two-profile creation cap with existing profiles retained, direct inline profile switching.
- Local checks only; Android crash/performance resolution not claimed.

# One World Beta 1.3.49 (71)

Testing beta, not a stable release. Update over the existing beta without uninstalling or clearing app data.

- First-time setup requires an explicit Boy or Girl choice and survivor name. Done opens the menu, not the world. Existing saved characters are retained.
- The small + below the menu profile adds another local profile, with separate per-map world saves. Tap the profile name to choose an existing profile.
- A small lower-left Motion Blur checkbox replaces the large motion button. It starts unchecked. It controls the existing phone-driven menu motion, not post-processing blur.
- Title and loading artwork keep the character head visible on wide phones.
- World entry prepares the selected graphics preset's nearby terrain, materials and first render before dismissing loading. Fresh installs start on the existing Low preset; saved graphics choices are preserved. The hidden character-preview graphics context is released during gameplay and rebuilt when needed.
- Previous-session events are retained in Diagnostics to help investigate an unexpected app exit.

Important: the reported Android crash to the phone home screen and phone heating have NOT been confirmed fixed. Browser state, movement and bounded real-render checks passed on both maps; these are not physical-phone, temperature or sustained-performance tests. Do not repeatedly launch the game while the phone is hot. Let it cool. No excessive artificial world-entry wait was added.

Inventory/station/waterskin behavior from 1.3.48 is preserved. No progression proposal, map geography, new model, HP or audio changes. Original game by Smiley, used and modified with permission. Retain bundled credits and third-party notices.

# One World Beta 1.3.48 (70)

Testing beta, not a stable release. Install over the existing beta without uninstalling or clearing data.

- Image-led glass crafting screen with separate Handcraft entry and a view-only recipe book.
- Place workbenches, furnaces and anvils. Craft at the appropriate nearby station; queue ingredients up front and collect completed output there. Campfires now cook through the same explicit queue rather than automatically consuming meat.
- Inventory capacity increased to 200 occupied slots, with up to 999 per ordinary item stack. Completed crafting stays at the station if the bag cannot hold it.
- Reusable waterskins: make one from pelts, refill while standing in water, drink to restore water to the current maximum of 100, then refill the same empty skin. Each skin uses one slot.
- Illustrated icons for inventory items, recipes, ingredients and stations.

Existing saved worlds, original signing certificate, app identity, updater origin and optional menu motion are preserved. New queues and placed stations save with the selected world. Craft timers advance during active game time, including while viewing the bag, and pause with the game; there is no offline catch-up.

Verification: Android build/package checks; 42 integrated checks per world on extracted APK assets; 18 menu preservation checks per world. These are desktop browser and build checks, not physical Android testing. Device performance, recording interruptions, startup audio crackle and loading delays are not claimed fixed. Level-100 progression proposals, target HP/audio work and map changes are excluded.

Original game by Smiley, used and modified with permission. Keep bundled credits and third-party notices.


## 1.3.47 (code 69)
- Optional phone-driven illustrated menu background and independent character turn, controlled together by a small default-OFF toggle. Turning OFF immediately centers both.
- Relative-orientation input with the existing touch, focus and menu guards. Device feel and performance still require handset testing.
- Smaller 56px author logo and one compact row of Website, YouTube, Instagram and TikTok links.
- No new 3D forest, gameplay map, HP indicator, sound contribution or recorder-restart fix.

# One World Beta 1.3.46 (68)

- Manual crafting no longer spends materials when its result cannot fit in the bag. A consumed whole material stack can free a result slot, and existing result stacks can be used.
- Campfire cooking no longer spends raw meat when cooked meat cannot fit. The raw ingredient is retained until room is available. Existing nearby eight-second cooking remains, this is not the future station-output system.
- Resource insertion no longer clips the incoming quantity at the first partly filled stack when the full quantity can fit across existing stacks or empty slots.

Scope limit: when a pickup's full quantity cannot fit anywhere, the old pickup/source behavior remains. This update does not add retained ground drops, 200 bag slots, 999 stacks, timed crafting queues, station-held output/claim, a reusable waterskin or a target HP bar. Inventory remains 12 slots and 10 per stack. Do not treat the legacy direct-to-bag crafting flow as the requested final station design.

Testing: 121 host assertions across all 10 recipes and insertion/cooking edge cases; 11 browser assertions in each saved-world mode, including real manual-craft UI clicks, helper-bound cooking and stack checks, save/restore and untouched other-world save. Inline scripts parse. Browser tests do not establish physical Android performance, notification/recorder coexistence or a phone-hang fix. Install in place, do not uninstall or clear data. Do not repeat crash stress tests.

No new UI layout, geography, models, animation or audio asset changes. The existing full-bag warning is used; all other requested visual features remain preview-gated.


# One World Beta 1.3.45 (67)

- Compact approved lobby buttons, inline survivor name/level and QUIT at the end of Settings. The old map selector is hidden as requested; both saved worlds and the previously selected world remain intact. No migration or world deletion.
- Restore the original girl artwork and approved wide landscape startup framing with large logo. Startup art motion is bounded to prevent edge gaps. Original clothing and images retained, no replacement artwork.
- Stop rendering/input on window focus loss, resume soft focus safely, retain save-before-title behavior for real background transitions. Rendering workload capped at 30 frames per second.
- Replace player-following fireflies with at most 2 low-quality / 4 other-quality sparse swamp-plant points and update active bounds.

This is a testing beta, not a confirmed fix for whole-phone hangs. Physical Android notification/recorder coexistence, GPU/thermal pressure and native restart are not verified. Do not repeat a crash stress test. Install in place; do not uninstall or clear data.

Browser checks: both world entry flows; 31 lifecycle/input/save assertions per world; 14 host lifecycle assertions; six viewport hit checks. Final game-settings screenshot capture timed out after state checks, not a complete clean test exit. Counter-based scheduling checks are not physical GPU FPS tests. Portrait and world-entry wallpaper layout remain baseline and are not a new approved redesign.

Not included: terrain experiments, weather scheduler, running/swim drafts, profile migration, new clothing artwork or separate image requests.

# 1.3.44

One World Beta 1.3.44 (66) - Fullscreen loading wallpaper and stronger background motion

Testing beta, not stable. Install over the existing beta. Do not uninstall or clear app data.

- Tap, startup loading and world-loading wallpaper now covers the full viewport, including portrait. Removed the loading image top offset and portrait partial-height artwork. Lower portrait shading is translucent so the wallpaper remains visible.
- Native phone-tilt background movement now operates on tap/loading/menu screens with the existing 3x bridge gain, up to 24px. Logo, progress text and controls stay fixed. Loading motion is intentional following the owner's correction.
- Fixed an observer/class-update loop when motion was paused. Touch hold/rebaseline, reduced motion, hidden/background state and Settings/Profile/confirmation/update overlays still suppress movement.

Preserved: both worlds, geography, save keys/format, existing avatars/Walk, inventory behavior and original signing identity. No installed-save migration.

Not included: second-profile creation/switching and shared-world save ownership (awaiting owner decision), swimming-sound candidate (awaiting audition), pending animation revisions or world-graphics changes. This is a narrow fullscreen/motion increment, not completion of the full menu plan.

Local desktop checks: 28 real viewport motion/loading checks (portrait and landscape), 110 Map1, 25 Settings, 23 extracted motion/reset safety checks and Map2 menu/reset smoke. No physical phone motion/FPS/system-inset/crash test is claimed. The CSS strip is corrected locally; any separate device/system-bar issue still needs phone confirmation.

#1.3.43

One World Beta 1.3.43 (65) - Saved-avatar menu and clearer tilt

Testing beta, not stable. Install over the existing beta; do not uninstall or clear app data.

- Main menu now shows the selected saved survivor, equipped armor, name and existing level. Existing Profile/Settings work; Start/Continue and confirmed Restart are separate. Restart protects a local recovery copy and waits at Create New World. Both original worlds remain accessible and unchanged.
- New anime forest menu art with subtle idle breathing, light drift and more visible horizontal tilt. Logo/buttons stay steady. Loading uses the previous menu art and remains static. Reduced motion, touch interaction, overlays and background lifecycle suppress motion.
- Existing1.3.42 inventory/input safety and hydration fixes retained.

Not included: extra-character plus/switching, shared-world profile migration, world-graphics overhaul, new armor/pets, Smiley pending animation revisions/Punch, generic quickslot food/bottle use, reusable waterskin, timed stations, weight/level100 expansion, respawn changes, or swimming-sound correction. Old Leather Armor appearance is unchanged. Phone43 tilt/FPS/crash/audio behavior is not verified; local WebGL/native-bridge tests are not phone proof.

Local checks:110 original-world,25Settings,15packaged-menu checks;12model/UI-state checks (GPU draws bypassed after initial render),23extracted motion/reset contracts. All packaged web files matched source. Same package and original signing certificate; no geography/save-format migration.

# One World Beta 1.3.42

Incremental testing beta, not a stable release.

- Camera-screen taps and cancelled touches no longer attack. The dedicated attack button and keyboard attack still work.
- Inventory avatar previews release their clone-owned graphics resources even after a render/readback error. Shared source geometry/materials/textures are preserved. Preview target dimensions now follow display-density changes. This addresses measured allocation growth, not a confirmed realme crash cause.
- Duplicate SELECT/CRAFT tabs removed from both inventory and crafting. Use the existing bag and hammer buttons to open the corresponding view. Short-screen inventory content and lower close button remain reachable by scrolling.
- Standing in an existing water volume now fills hydration completely, without filling stamina. No fresh/salt distinction, oxygen system, underwater gameplay or map changes added.

Generic food/water quickslots, equipped food/water hand meshes, direct-inventory eating removal, reusable waterskin/refill state and timed station crafting are NOT included. Existing bottle and inventory consumption behavior remains for now. No weights, slot limits, progression, respawn, save-format migration or Map1 deletion changes.

Desktop checks: 110 Map1 regressions, 25 Settings checks, focused touch/preview error and retry checks, repeated boy/girl preview allocation checks, original-map river/sea/dry and current-map sea/swamp/dry hydration checks, 888x400/640x360/390x844 scroll reachability. Actual WebGL context-loss recovery preserves exact saved state. A separate river was not located in the sampled current-map region; that test is not claimed there. GPU readback stalls can still occur.

No physical Android-phone install/performance/crash certification. Realme sudden exit remains unresolved pending device diagnostics. Original signing certificate retained. Update over the existing beta; do not uninstall or clear data.

# One World Beta 1.3.41

Small incremental testing beta, not a stable release.

- Distant trees now receive world lighting instead of remaining unlit and bright at night. Tree identities, positions and density are unchanged.
- Ore-node private material clones are disposed when their chunk unloads. Shared materials are not disposed. This addresses an observed resource-growth path, not a confirmed cause of the realme whole-app exit.
- Owner-supplied transparent One World logo, with short entrance motion and reduced-motion support. Existing lobby/map/profile behavior remains unchanged.

Realme sudden Android-home exit remains unconfirmed pending device/exit diagnostics. No physical-phone performance or crash fix guarantee. No new tree pack, inventory/weight, resource respawn, progression, animation, water-death/loot, profile migration or Map1 deletion is included.

Regression:110 Map1/save checks,25 Settings checks,Low/Medium/High owner shoreline and actual WebGL context-loss recovery with exact saved-state preservation. Desktop software-rendering tests are not device certification. Original Android signing certificate retained. Install over the existing beta; do not uninstall or clear data.

# 1.3.40 (versionCode 62) - Water and swimming

Incremental testing beta, not a stable release. Preserves the cumulative 1.3.39 game and save/update continuity.

- Shallow clear water with visible sand transitions into deeper blue, with animated ripple shading. Beach sand has original grain/ripple detail; rocks share grain and a rougher finish but remain faceted.
- Upright chest-depth rest float with arms extended sideways; moving swimming uses a head-raised stroke and kick. Removes the repeated whole-body bob while swimming.
- A modest ocean grid improves water/body depth intersection without changing the ocean height, coverage, shoreline or terrain.
- Joystick input avoids repeated layout reads and duplicate painting while preserving the existing controls.

Unchanged: existing stationary stamina recovery (+12/sec) and moving stamina cost (-5/sec), shallow wading, saved worlds, map geography, background/restart policy and camera pitch range. No underwater-camera restriction was added.

Local checks: both avatars inspected across idle/moving/rest animation phases, stamina samples, 110 Map 1 regression checks and Map 2 inventory/crafting/background-simulation/menu/death/respawn checks. Android compilation and package/signature/content checks are separate from physical-device testing.

Limits: recording-associated restart/lag is NOT fixed or claimed fixed. Underwater camera can still cross the one-sided water surface. Phone FPS, recording behavior, GPU cost and all-device Android 10-16 compatibility need physical testing. Rocks are not a high-detail model replacement.

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


# 1.3.37 (versionCode 59) - Map navigation and bed markers

Cumulative from 1.3.36. Map 2 no longer creates or removes custom pins on a tap. Existing saved pins are hidden, not deleted. The map remains north-up and has a corner N/E/S/W compass. Top X and side Y coordinate labels match the Map 2 HUD; map Y is north-south world position, not height. Saved world X/Z coordinates and geography are unchanged. The Map 2 sun rises due east and sets due west. Map 1 retains its prior behavior.

Only player, supplied beacons, safe spawns and a placed bed are map markers. The placed bed uses a small bed symbol. When very close to the player arrow, its symbol has a short leader so both remain readable. Place a Bedroll Kit as before; press the nearby hand to pack it back into the inventory. Packing clears the physical bed, collision and marker, and persists through reload. A full bag prevents packing rather than losing the bed.

Checked locally: no tap pin changes; prior saved pins hidden; bed placement/packing/kit return/save reload; east/noon/west sun samples; compass/arrow/map visuals; 110 original Map 1 regressions. Signed package/source and live release checks are recorded separately. Phone performance, touch, audio and universal terrain correctness remain unverified.

Still prototype: forest density/variety, waterfalls, rare hidden structures, old detailed vine/glass lab and creature art. Tree respawn refinements remain pending recovery of the earlier requested timing. No world resize or new hair work is included. This is a prerelease beta, not stable.

# 1.3.36 (versionCode 58) - Map 2 first phone-feedback corrections

Cumulative from 1.3.35. Original Map 1 and independent world save keys remain unchanged.

Map 2: full-screen image map with pan, zoom, whole-island fit, faint numbered X/Z grid, current coordinates and small silver heading arrow. Place names and safe-area markers appear only on the map. Green safe-area world beams/rings are removed; the five blue travel beacons remain. Right-side world selectors have a selected outline, and the short landscape lobby keeps Quit visible when Continue is present. Nearby site supplies and berry/fibre gathering use an icon-only hand beside attack and require a press. The forest floor uses the existing earth/leaf texture. Camps have torn ridge tents and cold ash/log/stone rings. Site supports, hut roof supports and lab rubble/lintel placement were corrected. Map 2 animated feet settle against rendered ground; abrupt uphill steps are refused. Running curves have a bounded stride/knee/posture adjustment.

Checked locally: 110 Map 1 regressions; no failed asset requests. Actual hand pickup of supplies and fibre; separate Map 2 inventory/save reload and unchanged Map 1 sentinel. Actual map tap traveled from Snow to Volcano beacon. Portrait cover/fit, marking/panning and respawn controls. Both rigs sampled on steep regional terrain. All 118 packaged web files match source byte-for-byte. Waterway spot checks use the same image-to-world bounds as collision samples. These are bounded checks, not proof of every river bank, slope or terrain issue.

Still unfinished: dense varied forest, waterfalls, old vine-covered detailed lab, beds, tree respawn refinement and higher-quality creatures. Current terrain, structures and creatures remain prototype art. Real-phone FPS, touch/sensors/audio, startup sound crackle and recording interruption are not claimed fixed. Snow contact contrast is weak with real shadows disabled. Hair changes remain paused. This is a prerelease beta, not stable.

# 1.3.35 (versionCode 57) - Map 2 playable testing beta

Cumulative from 1.3.34. Map 1 remains the original world with its existing save. The lobby now offers Map 1 and Map 2. Each has its own save, inventory, marks, bed and progress. Switching worlds does not erase the other save.

Map 2 adds playable terrain guided by the supplied island reference: coast, waterways, snow, volcanic red-tree region, swamp and desert. Map shows the supplied image with player/mark/bed overlays. Five travel beacons, fourteen simple camps/ruins/huts, a hidden central research-lab blockout and original prototype mutant animals are present. Ordinary Map 2 wildlife does not attack. Mutants stay near the lab. Camps have no prebuilt fire. Site supplies give Water Bottle, Bandage and Canned Food, remembered per site and replenished after five full in-game day/night cycles. Day and night are ten minutes each in Map 2. Sleep advances the supply clock. Crystals can be mined. Small building floors support the player and block the camera. Map 1 retains its prior day cycle and hostile behavior.

This is not the finished reference-quality map. The lab is sparse, buildings and mutant creatures are simple prototypes, and terrain/biome detail is much simpler than the reference. No new hair designs are included. Startup material preparation is spread across frames in local tests, but startup audio crackle, recording interruption and real-phone FPS/lag are not claimed fixed. Physical Android installation, touch/sensors/audio/performance still need phone testing. This remains a prerelease beta, not stable.

Verified locally: all five travel destinations, map marks, regional animals, walking/camera clearance, fourteen dry/flat site footprints, lab damage/leash, crystal mining, separate save roundtrips, supplies/reload/use/respawn boundary, sleep time and pause. Original Map 1 regression: 110 checks passed. Sensor-background/touch freeze, settings scrolling and character-preview rotation preservation passed. Landscape and portrait Map were inspected. Desert contrast, snow slope noise and red foliage were corrected and visually inspected. Android package/source and signed-artifact verification are recorded with the release artifacts. Local automated tests are not physical-phone proof.

# 1.3.34 (versionCode 56) - Authors logo and social profiles

Cumulative from canonical 1.3.33. This small separate update adds the owner's supplied PPY Gaming logo and YouTube, Instagram and TikTok profile buttons with their icons and account handles. The Tamil Crafters Studio website remains.

The requested female half-up ponytail/long back hair and male police cut are still being revised. Neither unfinished hairstyle is in this release. Character meshes, clothes, animations, saves, touch rules and gameplay are unchanged from 1.3.33. Existing published 1.3.33 assets are not replaced.

Verification: Android native compilation/package succeeded; all 109 packaged web files matched source. Actual game settings were checked in 800x480 landscape and 393x800 portrait, with scroll access to all profiles. Three native allowlisted link indices and exact browser fallback URLs passed. Full packaged game regression, settings scrolling, character rotation and sensor/touch preservation checks passed locally. Desktop timing assertions were corrected to await settling and compare the touch-start state, not an earlier frame. No physical phone installation, external app routing or performance claim is made.

Other pending work, including unexplained startup audio crackle, recording interruption and gameplay lag, is not claimed fixed. This remains a testing beta, not stable.

# 1.3.33 (versionCode 55) - causal touch, garment join and preview-switch corrections

Cumulative from canonical 1.3.32. Stable untouched. The owner reported that 1.3.32 did not fix the two phone-visible bugs. This build corrects the reproduced paths rather than treating earlier automated checks as phone success.

- Prevents scrolling in loading and normal lobby overlays. Oversized wallpaper pseudo-elements had made these inherited scroll containers, so touch dragging moved the entire page even with sensor motion disabled. Scoped clipping and touch rules leave settings content scrolling and survivor rotation available. Gentle untouched sensor motion remains background-only.
- Joins the girl's short central triangle to the actual generated cloth surface in XYZ with interpolated skin weights. Removes overlapping base faces beneath the attachment and closes the boundary. Preserves approved tip, width, material, shorts waist and surrounding dress. Side-view daylight gap and dark internal-face flecks addressed in exact customization lighting and rotation views.
- Keeps two bounded prepared customization previews and warms them under loading. Gender selection no longer clones and regenerates garments/hair on every click. Applies current selected colour/style when reusing previews. First use and repeated switches were measurably faster in local desktop testing; no instant-on-phone claim.

Verification: actual unsigned APK's 108 web files matched source; 110 full-game regression checks, 128 finite posed samples across 8 clips, 4 equipment/save cases, actual full-DOM touch countertests for loading/new/saved/modal, settings scrolling, customization rotation and sensor-only background continuation passed. Exact customization front, oblique and side pixels inspected. Device phone verification remains pending. Local diagnostics are not physical-phone proof.

Not included: requested additional female bun/trailing-hair style and movement, new island/lab/world work, Authors changes, crouch/jump, inventory redesign, or claims to fix unexplained audio/recording/gameplay phone performance issues. Existing saves and original character/animation assets retained.

# 1.3.32 (versionCode 54) - touch motion and garment join testing beta

Cumulative from canonical 1.3.31. Stable untouched. Narrow fixes requested after the owner sent a phone recording of 1.3.31 and explained the two issues.

- Freezes pregame wallpaper motion while a finger is down, including multi-touch and cancel, in both Android sensor delivery and the web input gate. Holds briefly after release and starts from a fresh sensor baseline rather than jumping. Untouched gentle physical movement still drives the horizontal background image only, with lower gain and a small noise deadzone. Buttons/text and survivor rotation controls are not moved by this wallpaper path.
- Extends the hidden overlap and matches local skin weights between the girl's upper base and short downward triangular extra leather layer. Preserves the owner-approved 1.3.31 visible dress shape, shorts waist, colour and tip position. Does not replace or redesign the clothing.
- Retains cumulative 1.3.31 fixes, original package/icon/saves/models and accepted Smiley animation/pose/grip code. No new map/control/inventory features.

Verified locally: actual-source native touch/sensor host doubles 11 checks, actual wallpaper-script native/fallback input 14 checks, upper 128 finite poses across 8 implemented clips plus 4 tool equip/save checks, actual Idle/Run front/side/rear pixels, native unsigned compile, exact 108 packaged web files and 110 gameplay checks against extracted APK payload. Simulated signals and native host doubles are not a physical-phone result.

Phone evidence: the supplied recording shows 1.3.31 launched to menu/settings/survivor rotation. It does not prove the install/update route or gameplay FPS. The owner reports touch-related shaking and a small garment join gap; this release addresses those paths, with real-phone confirmation still pending. Startup crackle, recording autocut and phone lag causes remain unestablished; old hair/new-world work remains excluded. No save-schema change or signing secrets bundled.

# 1.3.31 (versionCode 53) - clothing correction testing beta

Cumulative from canonical 1.3.30. Stable untouched. Owner approved the final close-fit dressing preview.

- Lowers the girl's shorts waist, especially in front, retaining the exposed midriff gap and small-shorts silhouette. This corrects the waist request previously misread as a leg-hem change in 1.3.30.
- Keeps the base upper leather fitted and covered at the sides, bridges the front center without a broad projecting shelf, and adds a short downward center triangular leather layer. The extra layer does not replace the base or cover the waist. Warm brown material, separate closed-thickness skinned geometry, not texture-painted clothing.
- Preserves original face/body/model assets, boy appearance, saves, package, icon, all accepted Smiley poses/grips/animation code and cumulative 1.3.30 startup, lifecycle, updater, music and control fixes. Only the isolated garment helper changes gameplay source apart from version metadata.

Verified locally: 128 finite upper poses across Idle/Walk/Run/Punch/Slash/Chop/Swim/Death, 4 tool equip/save checks, previously qualified unchanged shorts waist geometry, actual Idle/Run front/side/rear pixels, unsigned native compile, exact 108 packaged web files and 110 gameplay checks against the final extracted unsigned APK payload. Skinning is not simulated cloth physics. Visual review is not physical-device proof.

Known limits remain: physical Android installation/update, OEM gesture bars/Game Assistant, sensors, audio, FPS and recording have not been tested on the phone. Startup crackle/recording autocut and actual phone lag causes are not established. Old hair work and new world/control/inventory features are excluded. No save-schema change or signing secrets bundled.

# 1.3.30 (versionCode 52) - bug-fix testing beta

Cumulative from canonical 1.3.29. Stable untouched. Prepared for the signed testing-beta release.

- Requests immersive Android system bars and declares the standard game category. Realme OEM Game Assistant recognition is not proven.
- Saves and pauses on background. Ordinary return restarts at title. Save failure retains in-memory state and previous save, with retry. Update permission/installer handoffs preserve the required update. Midjoin cancellation retains old saves.
- Keeps verified newer update offers even if an older release record fails. Distinguishes unresolved checks from current. About shows installed version/check diagnostics and safe restart-to-check.
- Replaces rigid girl skirt with the owner's conditional fitted, thicker shorts fallback. Separate 3D geometry, closed cut edges, original smooth normals and rig weights. Final light-brown cloth has subtle edge detail and an even, lower leg hem around front, side and rear; the hem follows each thigh during movement. Upper garment is now a separate fitted, contoured light-brown cloth band with a narrower back, as requested in the latest front/side/rear reference. Body, face and model files unchanged. No cloth solver or per-frame shorts loop.
- Posed version of the original anime girl/forest illustration for Tap screen, no boxed button, whole-screen or keyboard start, visible Preparing feedback, then loading. Replaces rejected mutant illustration. Loading/menu illustration remains unchanged.
- Honest staged 10/20/50/80/90/100 loading with intentional minimum presentation holds. Update checking still starts during loading. Fixed root viewport and portrait loading-title overlap.
- Preserves cumulative 29 skin, inventory light, Smiley animation/grip, menu music, horizontal-only background sensor and framing fixes. Existing in-world control editor remains; quickslot geometry repair retained. Menu control-customizer extension is parked.

Verified locally: unsigned native compile; exact packaged payload 110 gameplay, 114 updater, 32 actual HTML audio/panel, 13 save/lifecycle checks; title UI 9 actual-page checks; 128 finite shorts poses and 128 finite upper-cloth poses across all 8 implemented clips, 96 rendered multi-angle captures and selected visual pages inspected; 4 tools equip plus save. Garment triangle counts are recorded in the final clothing QA. Not a physical phone performance test.

Still unresolved: old hair final work; startup crackle and recording autocut causes; actual phone lag/low-end FPS; exact cause of the user's prior update-discovery failure. Injected older-record failure reproduced and corrected, not proven as that phone cause. Physical Android install/update, gesture bars, OEM game recognition, sensors and sound need device confirmation. No crouch/jump actions exist or were tested. Intentional loading pauses are not bugs.

Excluded: new island/lab/loot/day-night/survival expansion, new crouch/jump/strafe/control/inventory redesign, header collaboration, mutant wallpaper, menu editor extension, save-schema changes. No stable mutation, signing keys or secrets included.

# 1.3.29 (versionCode 51)

Cumulative testing beta prepared from both canonical 1.3.28 source trees.

- Integrates Smiley's reviewed running/walking and forward attack poses, grip and upright torch changes.
- Distinguishes the saved Light warm skin option from Original, preserves saved identifiers, regenerates all ten skin thumbnails and reduces setup/inventory preview over-lighting. Original face, body, upper dress and model files stay unchanged.
- Menu music continues through Settings, Customize, Beta, erase confirmation and player setup, stopping only on actual world entry or app background/close.
- Preserves studio logo, then Tap to Start, loading and home order. Native update checking starts after loading is painted and before entering home.
- Adds a foreground-only native gravity/accelerometer wallpaper bridge. Only loading/menu background images move gently left/right, bounded to eight pixels. UI stays fixed. Image framing keeps heads visible at checked wide, tablet and portrait sizes.
- Adds Settings > About > Authors with PPYGaming and the verified Tamil Crafters Studio website. Optional unverified YouTube and pending collaborator profile details are omitted; existing legal and original-game credits remain separate.

Verified locally: 110 gameplay checks; real HTML audio panel/lifecycle checks; startup/update-order and About navigation checks; injected native wallpaper callback checks; sampled run/attack/equipment/save/terrain checks; unsigned Android compilation. These do not prove physical phone motion, Android playback or phone performance.

Known unresolved: intermittent startup crackle cause, phone 98% first-frame delay and screen-recording autocut cause. New boy hair is a separate unqualified prototype; skirt, survival expansion, new island and collaborator inventory header work are not included. No stable update, signing secrets, new model geometry or changed save schema.

# 1.3.28 (versionCode 50)

Music-first Android correction. Native intercepted OGG streams now account for WebView applying its own requested seek, rather than skipping an already sliced range twice. The original bundled track, volume preferences, package, saved-world keys and update routes are unchanged.

The manual Retry Music button is removed. Loading/menu music loops automatically; errors have at most two delayed recovery attempts per menu/resume lifecycle and stop when gameplay starts, the app is paused or the app closes. Music does not run during gameplay. Muting is retained.

Verified locally: Java native-seek simulation using the exact bundled OGG reproduces the old tail-range failure and checks corrected bytes for full, nonzero, bounded and suffix ranges; unsigned Android compilation, automatic recovery/mute/lifecycle mocks, and browser playback/UI checks. Browser playback is not phone proof. The user's phone audible playback, install and WebView behavior still require device verification. No claim that every possible playback cause is fixed.

This focused batch retains all published27 controls/map/update changes. It does not include the pending avatar poses, hairstyles, inventory/armor or new island. Background motion responsiveness is still separate work. No new music, third-party code or model assets; no signing keys or secrets included. Testing beta, not stable.

# 1.3.27 (versionCode 49)

- Smaller free-look eye with bounded visual drag feedback and release centering.
- Default-left Map/Crafting remain movable; saved custom layouts keep their entries.
- Monochrome vector control icons, including Settings and outlined hand actions.
- Fullscreen opaque map for current island. This is not the new island.
- Compact mandatory update card retains loading wallpaper and existing verified update policy.
- Music status and manual retry expose playback failures without changing saved volume or gameplay-only silence.

Known limits: user's phone loading/menu silence is not reproduced or claimed fixed. Android install/update/audio/touch/performance remain device-unverified. Avatar poses are a separate collaborator task; inventory/equip/armor/new island are not in this build. No stable update.

# 1.3.26 (versionCode 48)

Testing beta, not stable. Same package and original signing certificate. Install over the existing beta without uninstalling or clearing app data.

- Startup order corrected: studio logo, decoded loading wallpaper, actual asset/preparation progress, update readiness, then menu. Heavy asset work starts after loading has painted. Preparation yields between stages. Progress does not run backwards and 100 means preparation and entry check are complete.
- Settings: Save & Close removed. Save & Lobby is the sole in-game footer action at the right. Survivor/SOS and session save actions are hidden in menu Settings; Profile remains available.
- Audio: separate persistent Background music and Sound effects volume controls. Music controls the bundled menu track; all existing synthesized game effects pass through the SFX master gain, including wood/stone, steps, water, breath, hit/hurt, thunder, eating/cooking and death effects. No new sound library added.
- Existing update gate, offline startup rules, saved-world keys, original character geometry, upper dress and app icon retained. Stable app unchanged.

Verified: unsigned/signed Android build, original certificate and package/code48, extracted-payload checks; 110 gameplay regression checks, 114 updater UI checks, 25 Settings/audio functional checks, 20 viewport previews, master-gain routing/mute and monotonic progress instrumentation. Actual browser-captured frames show loading before preload and the 98% preparation frame before first rendering. These are browser previews, not phone proof.
Remaining limitation: first render is still synchronous. Software-render tests paused about 2 seconds without capture and about 7 seconds while screen capture was active; this is not proof of device lag being cured. The supplied Android recording proved the old25 startup defect, not this26 fix. Android install/update, startup timing, touch, sensor motion, sound and performance of26 still need actual device verification. Android requires normal install approval.

Full editable source and prior numbered history retained. Original game by Smiley, modified with permission. Retain bundled third-party notices and music provenance. No blanket license is granted over all code/assets. No signing keys or secrets included.


# 1.3.25 (versionCode 47)

Testing beta, not stable. Same package and original signing certificate. Install over the existing beta without uninstalling or clearing app data.

- Original character geometry and texture detail retained, with softer neutral skin lighting that dims at night; animated sole support follows the actual terrain surface.
- Original anime loading/menu wallpaper, background-only motion, real work progress line and TC studio intro.
- Transparent silver outline controls and neutral game Settings; Tamil Crafters Studio main credit with Smiley and third-party notices retained.
- Quiet update checking. A verified newer update gates entry online with retry rather than skip. Fresh offline launch remains allowed. Android still requires normal install approval.
- Existing world/save keys, upper dress geometry, app icon and Settings Save & Close behavior preserved.

Verified: unsigned/signed Android package, original certificate, extracted web payload checks; 110 browser regression checks, 114 updater UI checks, 26 Settings checks and 16 Settings viewport checks. Native host-double tests passed 71 dispatcher and 11 lifecycle checks. Animated-foot geometry checked in 1800 poses/positions. Browser screenshots are previews, not phone proof.
Not verified on an Android phone: installer/update roundtrip, device-sensor motion, low-end FPS, final phone graphics/audio/touch. No automatic-install or guaranteed-performance claim.

Full editable source is attached. Original game by Smiley, modified with permission. Retain bundled third-party notices and music provenance. No blanket license is granted over all code/assets. No signing keys or secrets are included. Stable app unchanged.


# Changelog

## 1.3.24 (46)

- Fullscreen game-style Settings with left category navigation, right scrolling options, top close and fixed save actions.
- Retains actual existing preferences and tools; no default quality or performance-setting change.
- Keeps the first-loading updater from 1.3.23.
- Baseline package QA: 27 Settings functional checks including simulated touch swipe, 16 category/viewport checks, 110 regression checks, 12 startup checks and 12 OGG checks. Android API 29-36 static signature checks passed. Phone 1.3.24 install/layout/touch/updater results remain unconfirmed.

## 1.3.23 (45)

- First-loading update check before lobby/character/world, minimal game-themed update panel, no world-entry check.
- Android settings and installer remain system UI.
- User reported that the app opened, menu music played and the world was playable without a black screen. This is not full graphics-mode, FPS, audio-lifecycle or updater proof.

## 1.3.22 (44)

- Pregame menu music, High-only sun shadows with corrected dimensions, original Low tree geometry with painted foliage, lower particle budgets, separate Crafting button and static glass controls.
- Published files remain unchanged. The user skipped this version.
