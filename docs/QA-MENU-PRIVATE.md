# Private menu candidate on published 1.3.42

Staged beta1.3.43/code65, not yet published.

## Implementation
- Reuses the existing bounded boy/girl character-setup preview renderer/cache. Saved selected-world character, appearance, equipped armor, name and real existing level appear in the menu. No additional-character system or dummy plus.
- Left existing profile opens/name-save writes only selected save name. Existing Settings/Quit on right. Original Map1 and Map2 remain discoverable, separate and unchanged.
- Start/Continue derives from selected save. Restart asks confirmation; Cancel leaves exact save. Confirm protects an exact local recovery copy, removes selected active save, then waits at Create New World rather than automatically joining. No recovery-management UI was added.
- New anime forest image is the earlier project-created direction candidate, not a world-graphics upgrade or a claimed new approval. Old published menu image is now startup/join loading art.
- Menu draws capped24fps and DPR1.25. Saved JSON is reparsed only when raw selected save changes. Existing setup DPR remains2. Wallpaper has separate slow drift/mist and native tilt; reduced motion, overlays and app suspension suppress it.
- Only web/index.html differs from42 existing files, plus one added optimized JPEG image. No native source, world geometry, save format, generic quickslots, progression balance, new-character storage or animation-candidate merge.

## Checked
- Actual real WebGL portrait390x844 and short landscape888x400 pixels inspected; current screenshots include saved Leather Armor, whose old geometry is deferred, not newly redesigned.
- 15 focused real-WebGL landscape checks including name/real level, both map access, profile/settings, native4px bridge->4px transform, reduced motion, reset Cancel/confirmed fixture reset/other-world exact/recovery exact,12 repeated same-avatar draws. Warm preview30geometries/68textures/23drawcalls flat across3batches.
- 12 actual-model/UI transition checks. GPU draws deliberately bypassed after initial real render for this UI-state run, not claimed as GPU/pixel proof. Start->setup->boy->Back restored same saved girl cached root/armor/canvas parent. Name-save changed only fixture name. Actual app lifecycle pause disabled wallpaper. Otherworld exact, no runtime errors.
- 22 isolated VM contracts using extracted current motion/reset code: touch freeze/rebaseline, orientation reset, overlay/lifecycle/reduced-motion/hidden disable, browser fallback, storage quota/badcopy/removeblocked reset failures and verified recovery.
- 25 existing Settings regression checks pass.
- 110 existing original-world regression checks pass, including real new-game appearance selection and persisted character/name. No failed requests.
- Expanded all-in-one portrait suite timed out after latest screenshot. Not counted complete; its UI-state checks were rerun in the separate12-check transition test.

## Limits and remaining release work
- No actual owner phone install, tilt sensor, FPS or crash proof. Native source audit shows unchanged foreground/request/sensor lifecycle and4px cap; native hardware tests not performed.
- Source remains private. Private menu test hooks removed, version/code and source inventory refreshed. Unsigned packaged15-check suite passed before the latest motion correction. Repeat packaged visual/bridge checks and signed checks plus dual publication verification before any release claim.
- Additional-character plus intentionally absent pending shared-world/per-character data rules. No tame-pet system inferred; existing code has no persisted tamed-pet ownership to display.

## Latest owner18:14 motion clarification
Original Slack1795005896.751699,fileF0CJX7CGA3T from established userU0CFUDH832M confirms42 tilt is present but too faint. Menu tilt visual gain is now3x native signal (4px->12px), global24px clamp with36px wallpaper overscan. Logo/buttons fixed. Loading static and sensor requests off there.23 extracted-code contracts pass including touch/rebaseline/reduced-motion/lifecycle/static-loading. Phone43 result not yet checked.
