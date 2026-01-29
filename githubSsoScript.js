// Auto-click Continue on GitHub Enterprise SSO page
chrome.storage.local.get(['delayEnabled'], (config) => {
  const delayMs = config.delayEnabled ? 3000 : 0;

  const tryClickContinue = () => {
    const continueButton = document.querySelector('form[action*="/saml/initiate"] button[type="submit"]');
    if (continueButton) {
      chrome.runtime.sendMessage({ action: 'incrementClickCount' }, (stats) => {
        showNotification('GitHub SSO', stats?.clickCount || 1, delayMs);
      });
      setTimeout(() => continueButton.click(), delayMs);
      return true;
    }
    return false;
  };

  if (!tryClickContinue()) {
    const observer = new MutationObserver(() => {
      if (tryClickContinue()) observer.disconnect();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 5000);
  }
});

function showNotification(label, clickCount, delayMs) {
  const popup = document.createElement('div');
  const delayText = delayMs > 0 ? `<div style="font-size: 12px; margin-top: 8px;">Clicking in ${delayMs / 1000}s...</div>` : '';
  popup.innerHTML = `
    <div style="font-size: 48px; font-weight: bold; text-align: center;">${clickCount}</div>
    <div style="font-size: 12px; text-align: center;">clicks saved</div>
    <div style="font-size: 14px; margin-top: 8px;">Auto-clicking ${label}</div>
    ${delayText}
  `;
  Object.assign(popup.style, {
    position: 'fixed',
    top: '20px',
    left: '20px',
    padding: '15px 25px',
    backgroundColor: '#f00',
    color: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    zIndex: '10000',
    fontFamily: 'Arial, sans-serif'
  });
  document.body.appendChild(popup);
}
