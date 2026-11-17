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
