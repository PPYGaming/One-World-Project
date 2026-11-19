## Latest testing beta: 1.3.48 / code70

Station crafting, 200-slot/999-stack inventory and reusable waterskins. See docs/QA-1.3.48.md for scope and test limits.

# One World Project

Development source for the modified One World Android beta. Historical 1.3.29 notes follow; the current prepared source is 1.3.49 (versionCode 71). Cumulative reviewed poses, distinct skin options and matched preview lighting, native sensor-only wallpaper movement, head-safe wallpaper framing, uninterrupted pregame-panel music, studio/tap/loading/home flow and own-brand About card. See CHANGELOG.md for test scope and unresolved device issues.

This is a testing beta, not a stable release. Original game by Smiley, used and modified with permission. Preserve the asset and third-party notices in `web/assets/licenses/` and the music provenance in `web/assets/music/PROVENANCE.txt`. This repository does not grant a blanket license over all game code or the AI-generated track.

## Source layout

- `web/`: complete bundled HTML, game JavaScript, licensed models/textures/UI/audio and notices.
- `android/src/`: Android host, verified updater, asset range handling and APK provider.
- `android/res/`, `android/AndroidManifest.xml`: original app icons/resources and package configuration.
- `scripts/build-unsigned.py`: Android API 36 / Java 17 build without signing credentials.

The existing One-World-Beta repository remains the app's update origin. Do not rename it, move the updater endpoint, change the package `com.oneword.forest.beta`, change the saved-world keys or replace published release files as part of ordinary development.

## Local preview

Run `python3 -m http.server 8080 --directory web` and open localhost port 8080 in a browser. The browser preview has no Android update/install bridge. Phone behavior must be tested separately.

## Android build

Install Java 17 and Android SDK platform 36 plus build-tools 36.0.0. Set `ANDROID_SDK_ROOT` and run `python3 scripts/build-unsigned.py`. The result is `build/one-world-unsigned.apk`. Signing is a separate owner-controlled step. An unsigned or differently signed test APK cannot upgrade the existing beta.

## Current baseline and pending requests

The original face/body/upper dress/model files, icon, package, save schema and native updater origin are preserved. Pending larger work includes hair qualification, skirt, contextual pickup, survival progression, seven-stat progression and further world work. Intermittent startup crackle and recording autocut cause remain unresolved. Loading pauses are intentionally gradual at the owner's request; an actual failure or hang is distinct. Local browser and compile checks do not prove Android physical motion, playback or performance.

## Testing releases

This public development repository is https://github.com/PPYGaming/One-World-Project. The existing public update origin remains https://github.com/PPYGaming/One-World-Beta. Latest published baseline checked during preparation:1.3.37(59). Candidate1.3.38(60) adds incremental continuous terrain, original-tree LOD and legacy harvested-save compatibility. See docs/QA-1.3.38.md for verification and limits. Physical phone performance and exact reference cliffs remain unverified. Preview screenshots are in `docs/screenshots/1.3.24/`. Future collaborator access and enforced release automation are not configured yet.

Staged next testing beta: 1.3.43 (65), saved-avatar menu and safe entry/reset flow. See docs/QA-1.3.43.md, docs/QA-MENU-PRIVATE.md and docs/QA-1.3.42.md for scope, checks and unresolved phone limits.
