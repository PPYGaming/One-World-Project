#1.3.43 staged testing beta

One World Beta 1.3.43 (65) - Saved-avatar menu and clearer tilt

Testing beta, not stable. Install over the existing beta; do not uninstall or clear app data.

- Main menu now shows the selected saved survivor, equipped armor, name and existing level. Existing Profile/Settings work; Start/Continue and confirmed Restart are separate. Restart protects a local recovery copy and waits at Create New World. Both original worlds remain accessible and unchanged.
- New anime forest menu art with subtle idle breathing, light drift and more visible horizontal tilt. Logo/buttons stay steady. Loading uses the previous menu art and remains static. Reduced motion, touch interaction, overlays and background lifecycle suppress motion.
- Existing1.3.42 inventory/input safety and hydration fixes retained.

Not included: extra-character plus/switching, shared-world profile migration, world-graphics overhaul, new armor/pets, Smiley pending animation revisions/Punch, generic quickslot food/bottle use, reusable waterskin, timed stations, weight/level100 expansion, respawn changes, or swimming-sound correction. Old Leather Armor appearance is unchanged. Phone43 tilt/FPS/crash/audio behavior is not verified; local WebGL/native-bridge tests are not phone proof.

Local checks:110 original-world,25Settings,15packaged-menu checks;12model/UI-state checks (GPU draws bypassed after initial render),23extracted motion/reset contracts. All packaged web files matched source. Same package and original signing certificate; no geography/save-format migration.

Detailed local limits: QA-MENU-PRIVATE.md.
