// Auto-select IcM identity provider
loadConfig(['delayEnabled'], (config) => {
  if (!config.extensionEnabled) return;

  const delayMs = config.delayEnabled ? 3000 : 0;
  const identityProvider = 'EntraID-OIDC';

  const path = window.location.pathname;
  const baseUrl = path.substring(0, Math.max(path.lastIndexOf("/"), path.lastIndexOf("\\")));
  const urlParams = new URLSearchParams(window.location.search);
  urlParams.set('identityProvider', identityProvider);

  incrementAndNotify(identityProvider, delayMs, 'Redirecting', 'icm');
  scheduleIfEnabled(delayMs, () => {
    window.location.href = `${baseUrl}?${urlParams}`;
  });
});
