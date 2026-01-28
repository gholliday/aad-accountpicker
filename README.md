# AAD Account Picker

A minimal Edge/Chrome extension that automatically selects your account on Microsoft Azure AD login pages based on your browser profile.

## The Problem

When using Edge with multiple Azure AD accounts, the Microsoft login page *always* shows an account picker - even when using separate Edge profiles. 😕

You'd think separate profiles would mean separate identities, but apparently that was too simple.

There's a setting in Edge that claims to fix this ("Automatically sign in to sites with your current work or school account"). It doesn't work. Nobody knows why. 🤷‍♂️

## The Solution

This extension does what Edge should do:

1. Detects which account is signed into your current Edge profile
2. Automatically clicks the matching account tile on the "Pick an account" page
3. Shows a brief red notification so you know it's working

In InPrivate mode, the extension does nothing (no profile identity available).

## Installation

1. Clone or download this repository and extract it to a folder on your disk
2. Open Edge and navigate to `edge://extensions`
3. Enable **Developer mode** (toggle in left sidebar)
4. Click **Load unpacked** and select the extension folder

## Permissions

This extension uses minimal permissions:

- `identity` / `identity.email` - To detect the signed-in Edge profile email
- Host permission for `login.microsoftonline.com` - To run on AAD login pages only

## How It Works

- A background service worker provides the profile email via `chrome.identity.getProfileUserInfo()`
- A content script runs on `/oauth2/authorize` and `/oauth2/v2.0/authorize` pages
- The script finds the account tile matching your profile email using the `data-test-id` attribute
- If found, it clicks the tile automatically

## Privacy

This extension:

- Does not collect or transmit any data
- Only reads your Edge profile email locally
- Only activates on Microsoft login pages

## License

MIT
