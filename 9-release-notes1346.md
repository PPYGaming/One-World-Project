# One World Beta 1.3.46 (68)

- Manual crafting no longer spends materials when its result cannot fit in the bag. A consumed whole material stack can free a result slot, and existing result stacks can be used.
- Campfire cooking no longer spends raw meat when cooked meat cannot fit. The raw ingredient is retained until room is available. Existing nearby eight-second cooking remains, this is not the future station-output system.
- Resource insertion no longer clips the incoming quantity at the first partly filled stack when the full quantity can fit across existing stacks or empty slots.

Scope limit: when a pickup's full quantity cannot fit anywhere, the old pickup/source behavior remains. This update does not add retained ground drops, 200 bag slots, 999 stacks, timed crafting queues, station-held output/claim, a reusable waterskin or a target HP bar. Inventory remains 12 slots and 10 per stack. Do not treat the legacy direct-to-bag crafting flow as the requested final station design.

Testing: 121 host assertions across all 10 recipes and insertion/cooking edge cases; 11 browser assertions in each saved-world mode, including real manual-craft UI clicks, helper-bound cooking and stack checks, save/restore and untouched other-world save. Inline scripts parse. Browser tests do not establish physical Android performance, notification/recorder coexistence or a phone-hang fix. Install in place, do not uninstall or clear data. Do not repeat crash stress tests.

No new UI layout, geography, models, animation or audio asset changes. The existing full-bag warning is used; all other requested visual features remain preview-gated.
