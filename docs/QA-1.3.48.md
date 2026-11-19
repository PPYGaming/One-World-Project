# One World Beta 1.3.48 (70)

Testing beta, not a stable release. Install over the existing beta without uninstalling or clearing data.

- Image-led glass crafting screen with separate Handcraft entry and a view-only recipe book.
- Place workbenches, furnaces and anvils. Craft at the appropriate nearby station; queue ingredients up front and collect completed output there. Campfires now cook through the same explicit queue rather than automatically consuming meat.
- Inventory capacity increased to 200 occupied slots, with up to 999 per ordinary item stack. Completed crafting stays at the station if the bag cannot hold it.
- Reusable waterskins: make one from pelts, refill while standing in water, drink to restore water to the current maximum of 100, then refill the same empty skin. Each skin uses one slot.
- Illustrated icons for inventory items, recipes, ingredients and stations.

Existing saved worlds, original signing certificate, app identity, updater origin and optional menu motion are preserved. New queues and placed stations save with the selected world. Craft timers advance during active game time, including while viewing the bag, and pause with the game; there is no offline catch-up.

Verification: Android build/package checks; 42 integrated checks per world on extracted APK assets; 18 menu preservation checks per world. These are desktop browser and build checks, not physical Android testing. Device performance, recording interruptions, startup audio crackle and loading delays are not claimed fixed. Level-100 progression proposals, target HP/audio work and map changes are excluded.

Original game by Smiley, used and modified with permission. Keep bundled credits and third-party notices.


Save-failure injection covered queue, claim, station placement and waterskin transitions. Both-world tests covered view-only browsing, bootstrap handcraft, physical placement/range, campfire and furnace queues, output conservation/full-bag behavior, water refill and old bottle preservation, paused timing, 999-stack boundaries, 200-full-slot rejection, real queue/collect clicks, and world save restoration. No progression save migration is applied.
