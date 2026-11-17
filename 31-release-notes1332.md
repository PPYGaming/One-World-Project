# 1.3.32 (versionCode 54) - touch motion and garment join testing beta

Cumulative from canonical 1.3.31. Stable untouched. Narrow fixes requested after the owner sent a phone recording of 1.3.31 and explained the two issues.

- Freezes pregame wallpaper motion while a finger is down, including multi-touch and cancel, in both Android sensor delivery and the web input gate. Holds briefly after release and starts from a fresh sensor baseline rather than jumping. Untouched gentle physical movement still drives the horizontal background image only, with lower gain and a small noise deadzone. Buttons/text and survivor rotation controls are not moved by this wallpaper path.
- Extends the hidden overlap and matches local skin weights between the girl's upper base and short downward triangular extra leather layer. Preserves the owner-approved 1.3.31 visible dress shape, shorts waist, colour and tip position. Does not replace or redesign the clothing.
- Retains cumulative 1.3.31 fixes, original package/icon/saves/models and accepted Smiley animation/pose/grip code. No new map/control/inventory features.

Verified locally: actual-source native touch/sensor host doubles 11 checks, actual wallpaper-script native/fallback input 14 checks, upper 128 finite poses across 8 implemented clips plus 4 tool equip/save checks, actual Idle/Run front/side/rear pixels, native unsigned compile, exact 108 packaged web files and 110 gameplay checks against extracted APK payload. Simulated signals and native host doubles are not a physical-phone result.

Phone evidence: the supplied recording shows 1.3.31 launched to menu/settings/survivor rotation. It does not prove the install/update route or gameplay FPS. The owner reports touch-related shaking and a small garment join gap; this release addresses those paths, with real-phone confirmation still pending. Startup crackle, recording autocut and phone lag causes remain unestablished; old hair/new-world work remains excluded. No save-schema change or signing secrets bundled.

