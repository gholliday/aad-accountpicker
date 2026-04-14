// Auto-click "Skip verification" on ATP Safe Links interstitial pages
// The link starts hidden with href="/". showError() sets the real URL and
// removes atp-hidden after the reputation check XHR fails, so we wait for that.
loadConfig(['delayEnabled'], (config) => {
  if (!config.extensionEnabled) return;

  const delayMs = config.delayEnabled ? 3000 : 0;

  const tryClick = () => {
    const link = document.getElementById('skip-validation-link');
    if (!link || link.classList.contains('atp-hidden')) return false;

    const href = link.getAttribute('href');
    if (!href || href === '/') return false;

    incrementAndNotify('Skip verification', delayMs, 'Clicking', 'atp-safelinks');
    scheduleIfEnabled(delayMs, () => link.click());
    return true;
  };

  waitForElement(tryClick);
});
