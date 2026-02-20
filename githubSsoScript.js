// Auto-click Continue on GitHub Enterprise SSO page
chrome.storage.local.get(['delayEnabled'], (config) => {
  const delayMs = config.delayEnabled ? 3000 : 0;

  const tryClickContinue = () => {
    const continueButton = document.querySelector('form[action*="/saml/initiate"] button[type="submit"], form[action*="/oidc/initiate"] button[type="submit"]');
    if (continueButton) {
      incrementAndNotify('GitHub SSO', delayMs, 'Clicking', 'github-sso');
      setTimeout(() => continueButton.click(), delayMs);
      return true;
    }
    return false;
  };

  waitForElement(tryClickContinue);
});
