# 1.3.51: offline security repair, cumulative Second Map

- Removed the native APK downloader, installer provider and installation permission. Updates are optional through an explicit external-browser GitHub Releases button; there is no startup update lock.
- Restricted the local WebView resource boundary and added a script/resource policy that blocks unauthorized inline scripts, remote requests and frames while keeping local model-image decoding.
- Fixed local recovery-archive validation/readback/retry and stopped world/profile writes when that archive cannot be kept. Existing worlds, identity, storage keys and app origin are preserved.
- Retains the complete cumulative game and 1.3.50 Second Map terrain, biomes, mountains, coasts, trees, models, textures, sounds and beta inspection flight inside one complete APK. No data patch or manual assembly is needed by players. The retired First Map is not restored.

Verification: compiled permission/provider/installer inspection;13 backup failure/retry/preservation checks;6 local gameplay/profile/flight checks; exact packaged-HTML startup and security-policy probes. Fresh empty-storage50 and51 load the same1617 sampled geography points, horizon geometry and9859 distant canopy positions. All175 packaged asset paths retained;173 identical to50, with only the entry and renderer-recovery HTML changed.

Testing beta only. Android device installation, native external-browser behavior, installed save migration and Play Protect classification remain unverified. This release does not claim that Google's warning is cleared. Do not bypass a security warning. Uninstalling or clearing app data can erase player progress; it is not needed for this update. Base geography is bundled game content and regenerates without previous app storage.

Android10/API29 minimum; package com.oneword.forest.beta; versionCode73. Same original development signing certificate. Original game by Smiley, modified with permission. Third-party notices are retained in assets/licenses and music provenance.
