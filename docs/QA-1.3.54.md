# One World beta 1.3.54: loading wallpaper tilt

- Restores phone-driven lateral motion on the tap screen and both loading wallpapers, independently of the lobby checkbox. The lobby Motion Blur checkbox still starts OFF and controls lobby motion only.
- Full +/-12px travel, with 16px side overscan and top-anchored artwork, keeps the loading wallpapers full-screen without exposing a top strip or clipping the head crown. No new vertical sensor behavior.
- Touch, focus, modal and reduced-motion guards retained. Native sensor bridge unchanged.
- No changes to the 50% startup workload, milestone timing, terrain, forest, gameplay, saves or assets. The 1.5-second post-ready covered world rendering from 53 remains unchanged.

Verified locally: 37 motion-contract checks using actual motion code and simulated native callbacks; five viewport sizes and both tilt extremes; full candidate startup with 9/9 required chunks, 0 missing, 1509ms covered interval and 16 real scene frames; player position, health and stamina unchanged while covered. No JavaScript/game errors or CSP violations.

The initial 50% display is a milestone spanning world preparation, not a measured half-complete download. A test-only profile found terrain horizon setup dominated that interval on this software-render run. It was investigated only, not optimized or retimed.

Not verified on a physical Android phone: actual sensor smoothness, installation, phone frame rate or crash prevention. Android remains landscape. Portrait fallback fills the screen and preserves crown/face, but long hair can extend beyond its narrower crop.

Complete standalone APK and editable source. Android 10/API29 minimum, code76, original signing certificate. Original game by Smiley, modified with permission. Third-party notices retained. Testing beta, not stable.
