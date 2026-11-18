# 1.3.44 testing beta

One World Beta 1.3.44 (66) - Fullscreen loading wallpaper and stronger background motion

Testing beta, not stable. Install over the existing beta. Do not uninstall or clear app data.

- Tap, startup loading and world-loading wallpaper now covers the full viewport, including portrait. Removed the loading image top offset and portrait partial-height artwork. Lower portrait shading is translucent so the wallpaper remains visible.
- Native phone-tilt background movement now operates on tap/loading/menu screens with the existing 3x bridge gain, up to 24px. Logo, progress text and controls stay fixed. Loading motion is intentional following the owner's correction.
- Fixed an observer/class-update loop when motion was paused. Touch hold/rebaseline, reduced motion, hidden/background state and Settings/Profile/confirmation/update overlays still suppress movement.

Preserved: both worlds, geography, save keys/format, existing avatars/Walk, inventory behavior and original signing identity. No installed-save migration.

Not included: second-profile creation/switching and shared-world save ownership (awaiting owner decision), swimming-sound candidate (awaiting audition), pending animation revisions or world-graphics changes. This is a narrow fullscreen/motion increment, not completion of the full menu plan.

Local desktop checks: 28 real viewport motion/loading checks (portrait and landscape), 110 Map1, 25 Settings, 23 extracted motion/reset safety checks and Map2 menu/reset smoke. No physical phone motion/FPS/system-inset/crash test is claimed. The CSS strip is corrected locally; any separate device/system-bar issue still needs phone confirmation.
