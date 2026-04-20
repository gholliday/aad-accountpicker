# Changelog

## v0.13 - 2026-04-20

### Added
- Auto-click SSO "Continue" on `msft.ghe.com` (in addition to `microsoft.ghe.com`)

## v0.12 - 2026-04-14

### Added
- Auto-click "Skip verification" on Microsoft ATP Safe Links interstitial pages

## v0.11 - 2026-03-13

### Added
- Popup button to disable or re-enable the extension without uninstalling it

### Changed
- Automation now respects the popup enable/disable state across Entra, GitHub SSO, and IcM flows, including delayed actions

## v0.10 - 2026-03-03

### Added
- Support for `github.com/AzureAD/*` SSO prompts (e.g. microsoft-authentication-cli releases)

## v0.9 - 2026-02-23

### Fixed
- Expanded GitHub SSO matching to include `github.com/Azure/*` pages so "Continue" is auto-clicked on org SSO prompts.

## v0.8 - 2026-02-20

### Added
- Support for GitHub Enterprise Server SSO on `microsoft.ghe.com`
- Support for OIDC-based SSO initiation (in addition to SAML)

## v0.7 - 2026-02-04

### Added
- Support for GitHub business SSO panels on `github.com/microsoft/*` repos

## v0.6 - 2026-02-03

### Added
- Support for WS-Federation login pages (`/wsfed*` URLs)

## v0.5 - 2026-01-30

### Added
- Support for IcM identity provider selection (auto-selects EntraID-OIDC)
- Click tracking by type (Entra tile, Entra email, GitHub SSO, IcM)
- Reset button to clear all data


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
