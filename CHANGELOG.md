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
