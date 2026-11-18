# 1.3.37 (versionCode 59) - Map navigation and bed markers

Cumulative from 1.3.36. Map 2 no longer creates or removes custom pins on a tap. Existing saved pins are hidden, not deleted. The map remains north-up and has a corner N/E/S/W compass. Top X and side Y coordinate labels match the Map 2 HUD; map Y is north-south world position, not height. Saved world X/Z coordinates and geography are unchanged. The Map 2 sun rises due east and sets due west. Map 1 retains its prior behavior.

Only player, supplied beacons, safe spawns and a placed bed are map markers. The placed bed uses a small bed symbol. When very close to the player arrow, its symbol has a short leader so both remain readable. Place a Bedroll Kit as before; press the nearby hand to pack it back into the inventory. Packing clears the physical bed, collision and marker, and persists through reload. A full bag prevents packing rather than losing the bed.

Checked locally: no tap pin changes; prior saved pins hidden; bed placement/packing/kit return/save reload; east/noon/west sun samples; compass/arrow/map visuals; 110 original Map 1 regressions. Signed package/source and live release checks are recorded separately. Phone performance, touch, audio and universal terrain correctness remain unverified.

Still prototype: forest density/variety, waterfalls, rare hidden structures, old detailed vine/glass lab and creature art. Tree respawn refinements remain pending recovery of the earlier requested timing. No world resize or new hair work is included. This is a prerelease beta, not stable.
