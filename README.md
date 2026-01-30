# Click Curmudgeon

A grumpy Edge/Chrome extension that auto-clicks login pages so you don't have to.

## What It Does

Automatically handles tedious login clicks across:

- **Microsoft/Entra ID** - Clicks your account tile or fills your email
- **GitHub Enterprise SSO** - Clicks the "Continue" button
- **IcM Portal** - Selects the EntraID-OIDC identity provider

Shows a red notification with a running count of clicks saved.

## The Problem

Login flows are full of unnecessary clicks:

- Account pickers that show one option
- SSO pages with a single "Continue" button
- Identity provider selections with obvious defaults

Edge has a setting that claims to fix some of this. It doesn't work. 🤷‍♂️

## Installation

1. Clone or download this repository
2. Extract it to a folder on your disk
3. Open Edge and navigate to `edge://extensions`
4. Enable **Developer mode** (toggle in left sidebar)
5. Click **Load unpacked** and select the extension folder

## Options

Click the extension icon to access settings:

- **Delay 3s before picking account** - Adds a delay so you can see what's happening
- **Auto-submit email after 4s** - Automatically clicks "Next" after filling email
- **Reset All Data** - Clears click counts and settings

## Permissions

- `identity` / `identity.email` - Reads your Edge profile email for matching
- `storage` - Saves settings and click counts locally

See [privacy.md](privacy.md) for details.

## License

MIT
