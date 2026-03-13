// Auto-click Continue on GitHub Enterprise SSO page
loadConfig(['delayEnabled'], (config) => {
  if (!config.extensionEnabled) return;

  const delayMs = config.delayEnabled ? 3000 : 0;

  const tryClickContinue = () => {
    const continueButton = document.querySelector('form[action*="/saml/initiate"] button[type="submit"], form[action*="/oidc/initiate"] button[type="submit"]');
    if (continueButton) {
      incrementAndNotify('GitHub SSO', delayMs, 'Clicking', 'github-sso');
      scheduleIfEnabled(delayMs, () => continueButton.click());
      return true;
    }
    return false;
  };

  waitForElement(tryClickContinue);
});
