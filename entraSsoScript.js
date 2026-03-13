// Request profile email and config from background service worker
chrome.runtime.sendMessage({ action: 'getProfileEmail' }, (response) => {
  const email = response?.email;
  if (!email) return; // InPrivate or not signed in

  loadConfig(['delayEnabled', 'emailAutoSubmit'], (config) => {
    if (!config.extensionEnabled) return;

    const delayMs = config.delayEnabled ? 3000 : 0;

    const tryClickTile = () => {
      const tile = document.querySelector(`[data-test-id="${email}"]`);
      if (tile) {
        incrementAndNotify(email, delayMs, 'Clicking', 'entra-tile');
        scheduleIfEnabled(delayMs, () => tile.click());
        return true;
      }
      return false;
    };

    const tryFillEmail = () => {
      const emailInput = document.querySelector('input#i0116[name="loginfmt"]');
      const nextButton = document.querySelector('input#idSIButton9[type="submit"]');
      if (emailInput && nextButton && !emailInput.value) {
        emailInput.value = email;
        emailInput.dispatchEvent(new Event('input', { bubbles: true }));
        const autoSubmit = config.emailAutoSubmit;
        incrementAndNotify(email, autoSubmit ? 4000 : 0, autoSubmit ? 'Submitting' : 'Selected', 'entra-email');
        if (autoSubmit) {
          scheduleIfEnabled(4000, () => nextButton.click());
        }
        return true;
      }
      return false;
    };

    waitForElement(() => tryClickTile() || tryFillEmail());
  });
});
