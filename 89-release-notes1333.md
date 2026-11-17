# 1.3.33 (versionCode 55) - causal touch, garment join and preview-switch corrections

Cumulative from canonical 1.3.32. Stable untouched. The owner reported that 1.3.32 did not fix the two phone-visible bugs. This build corrects the reproduced paths rather than treating earlier automated checks as phone success.

- Prevents scrolling in loading and normal lobby overlays. Oversized wallpaper pseudo-elements had made these inherited scroll containers, so touch dragging moved the entire page even with sensor motion disabled. Scoped clipping and touch rules leave settings content scrolling and survivor rotation available. Gentle untouched sensor motion remains background-only.
- Joins the girl's short central triangle to the actual generated cloth surface in XYZ with interpolated skin weights. Removes overlapping base faces beneath the attachment and closes the boundary. Preserves approved tip, width, material, shorts waist and surrounding dress. Side-view daylight gap and dark internal-face flecks addressed in exact customization lighting and rotation views.
- Keeps two bounded prepared customization previews and warms them under loading. Gender selection no longer clones and regenerates garments/hair on every click. Applies current selected colour/style when reusing previews. First use and repeated switches were measurably faster in local desktop testing; no instant-on-phone claim.

Verification: actual unsigned APK's 108 web files matched source; 110 full-game regression checks, 128 finite posed samples across 8 clips, 4 equipment/save cases, actual full-DOM touch countertests for loading/new/saved/modal, settings scrolling, customization rotation and sensor-only background continuation passed. Exact customization front, oblique and side pixels inspected. Device phone verification remains pending. Local diagnostics are not physical-phone proof.

Not included: requested additional female bun/trailing-hair style and movement, new island/lab/world work, Authors changes, crouch/jump, inventory redesign, or claims to fix unexplained audio/recording/gameplay phone performance issues. Existing saves and original character/animation assets retained.

