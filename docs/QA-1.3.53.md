# One World beta1.3.53: loading artwork and covered world reveal

- Both loading wallpapers fill the display from the top edge with no12px dark strip. Head crowns remain visible. Vertical wallpaper motion is removed from these two layers; horizontal motion has edge overscan.
- World initialization, terrain preparation, material compilation and first scene render run before the settling interval. Once ready, real scene frames continue behind the overlay for at least1.5seconds before gameplay reveals. Controls and survival stay stopped while covered.
- Retains52 cumulative Second Map, flight, foliage, shadows, assets, saves and security boundaries. No unrelated item/crafting changes.

Verified locally: exact candidate HTML/CSP startup,9/9 required chunks,0 missing;1518ms covered interval with19 actual scene frames; unchanged player position/health/stamina; no JS/game errors or CSP violations. Both artworks inspected at1595x720,1428x644,640x360,390x844 and320x720, both horizontal motion extremes. Android remains landscape. Portrait fallback fills screen and keeps crowns/faces visible; long hair may extend outside its narrower crop.

Not verified: physical Android install, phone frame rate, native lifecycle behavior or crash prevention. The short settling interval is not a lag or crash cure.

Full standalone APK and complete editable source. Android10/API29 minimum; code75; original certificate. Original game by Smiley, modified with permission; third-party notices retained. Testing beta, not stable.
