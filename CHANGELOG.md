# Changelog

## v0.4 - 2026-01-29

### Added
- Support for GitHub Enterprise SSO pages (auto-clicks "Continue" button)

## v0.3 - 2026-01-29

### Added
- Support for SAML login pages (`/saml2*` URLs)
- Auto-fill email on "Enter your email" pages (pre-populates from Edge profile)
- Optional auto-submit after 4 seconds when filling email (disabled by default)

### Changed
- Account picker behavior unchanged (still auto-clicks matching tile)

## v0.2 - 2026-01-29

### Added
- Click counter tracking how many times the extension has auto-selected an account
- "Since" date to track when counting started (useful if browser data is cleared)
- Red notification popup now displays the click count in large font
- Extension icon popup showing total clicks saved and tracking start date
- Optional 3-second delay before clicking (configurable in popup)

## v0.1 - Initial Release

### Added
- Auto-selects matching account on Microsoft login pages based on Edge profile email
- Red notification popup showing which account was selected
