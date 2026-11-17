# 1.3.28 (versionCode 50)

Music-first Android correction. Native intercepted OGG streams now account for WebView applying its own requested seek, rather than skipping an already sliced range twice. The original bundled track, volume preferences, package, saved-world keys and update routes are unchanged.

The manual Retry Music button is removed. Loading/menu music loops automatically; errors have at most two delayed recovery attempts per menu/resume lifecycle and stop when gameplay starts, the app is paused or the app closes. Music does not run during gameplay. Muting is retained.

Verified locally: Java native-seek simulation using the exact bundled OGG reproduces the old tail-range failure and checks corrected bytes for full, nonzero, bounded and suffix ranges; unsigned Android compilation, automatic recovery/mute/lifecycle mocks, and browser playback/UI checks. Browser playback is not phone proof. The user's phone audible playback, install and WebView behavior still require device verification. No claim that every possible playback cause is fixed.

This focused batch retains all published27 controls/map/update changes. It does not include the pending avatar poses, hairstyles, inventory/armor or new island. Background motion responsiveness is still separate work. No new music, third-party code or model assets; no signing keys or secrets included. Testing beta, not stable.

