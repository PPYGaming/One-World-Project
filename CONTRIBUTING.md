# Development and releases

Proposed collaboration rules, pending final access and release-role decisions. The owner has limited future access to the two One World repositories only and deferred all collaborator grants until later. The owner selected a public repository. Signing-file permission remains unresolved. No account-wide or other-repository access is authorized:

1. Work on a named feature or fix branch. Keep one change area per pull request. Record the base commit and don't overwrite another developer's unmerged work.
2. Include a plain changelog: what changed, what was tested, what remains unverified. Add actual screenshots when the change is visual; label previews and mocks.
3. Preserve package identity, saved-world compatibility, original/licensed assets, notices and user-approved UI/model restrictions. No third-party map artwork, extracted game assets or new secret is added without review.
4. Pull requests contain source changes and tests. Never commit passwords, tokens, recovery files or signing keys. No collaborator needs Karthi's GitHub token or Android signing key.
5. Recommended, not yet accepted as exclusive authority: a Karthi-side release owner reviews, merges, signs once with the existing beta certificate, then publishes the exact same signed APK and manifest to this project and the existing update repository. A version is complete only after both published copies are downloaded back and their hashes match. If publication partly fails, stop and reconcile; do not silently advance to another version.
6. Use immutable numbered version tags and changelogs, not a floating latest filename. The Android versionCode must increase. Keep prior releases for diagnosis; normal Android will not install an older version over a newer one. Recovery from a bad release should normally be a forward fix using a higher versionCode, not an uninstall that risks saved data.
7. No automatic signing or privileged release job should run code from unreviewed branches. An unsigned CI build can be added after the owner approves its permissions and cost model. Access invites, protection and CI are not established merely because this document exists.

## Version and release gate

Before preparing each release, every developer must read the latest numbered releases and manifests on GitHub, including prereleases, on BOTH repositories. Use `python3 scripts/check-next-version.py --project OWNER/ACTUAL-PROJECT-REPO` as a read-only check. It stops on drafts, inaccessible repositories, missing data or mismatched latest repository versions. Private-repository access is not handled by this public checker; do not put a token into source or command-line text to work around it.

Checking does not reserve a number. The Karthi-side release owner must serialize releases, check in-flight work, then recheck immediately before signing and publishing. Never independently publish a guessed next number. A read-only preflight script or a written policy is not an enforced lock. No release automation or collaborator access is configured yet.

GitHub Actions concurrency groups are repository-scoped, not a cross-repository transaction. If automation is later approved, use one coordinator, one release group and fail-closed version/hash checks; do not independently run a release job in each repository and call it serialized. The same signed artifact must be uploaded to both. Never add a signing key or shared long-lived token to the project, release history, screenshots or logs. Secrets remain in the owner's approved vault. Others' access is deferred until the owner explicitly resumes that setup.

## Scope still awaiting setup

The owner requested that future development access cover only the development project repository and the existing automatic-update repository, not other repositories or account-wide access. Access has been explicitly deferred. The proposal to keep release/signing under a single owner-side coordinator is a recommendation, not a user-approved limit on collaborators' two-repository scope. Before any future invitation, verify each recipient's GitHub identity and settle the actual write, merge and release powers; do not describe a personal-account collaborator as code-only, since that role can also create and edit releases.
