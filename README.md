# One World Project

Development source for Karthi's modified One World Android beta. Current source baseline: **1.3.25 (versionCode 47)**, character lighting/sole support, original anime entry art, transparent controls and mandatory online update gate.

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

1.3.24 changes only Settings layout and Android version metadata relative to 1.3.23. Native updater code and bundled game assets are unchanged. The new referenced island, saved-world strategy and possible removal of SAVE & CLOSE are not implemented here. Published package checks do not prove every phone graphics mode, FPS, audio lifecycle or update/download/install behavior.

## Testing releases

This public development repository is https://github.com/PPYGaming/One-World-Project. The existing public update origin remains https://github.com/PPYGaming/One-World-Beta. Current numbered release: 1.3.24 (46), mirrored without rebuilding or changing its signature. Preview screenshots are in `docs/screenshots/1.3.24/`. Future collaborator access and enforced release automation are not configured yet.
