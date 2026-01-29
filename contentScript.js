// Request profile email and config from background service worker
chrome.runtime.sendMessage({ action: 'getProfileEmail' }, (response) => {
  const email = response?.email;
  
  // InPrivate or not signed in - do nothing
  if (!email) return;

  // Get delay setting
  chrome.storage.local.get(['delayEnabled', 'emailAutoSubmit'], (config) => {
    const delayMs = config.delayEnabled ? 3000 : 0;

    // Try to click account tile (account picker page)
    const tryClickTile = () => {
      const tile = document.querySelector(`[data-test-id="${email}"]`);
      if (tile) {
        chrome.runtime.sendMessage({ action: 'incrementClickCount' }, (stats) => {
          showNotification(email, stats?.clickCount || 1, delayMs);
        });
        setTimeout(() => tile.click(), delayMs);
        return true;
      }
      return false;
    };

    // Try to fill email input (enter email page)
    const tryFillEmail = () => {
      const emailInput = document.querySelector('input#i0116[name="loginfmt"]');
      const nextButton = document.querySelector('input#idSIButton9[type="submit"]');
      if (emailInput && nextButton && !emailInput.value) {
        emailInput.value = email;
        emailInput.dispatchEvent(new Event('input', { bubbles: true }));
        chrome.runtime.sendMessage({ action: 'incrementClickCount' }, (stats) => {
          const autoSubmit = config.emailAutoSubmit;
          showNotification(email, stats?.clickCount || 1, autoSubmit ? 4000 : 0, autoSubmit);
          if (autoSubmit) {
            setTimeout(() => nextButton.click(), 4000);
          }
        });
        return true;
      }
      return false;
    };

    // Try both approaches
    const tryInteract = () => tryClickTile() || tryFillEmail();

    // Try immediately, then retry with observer if not ready yet
    if (!tryInteract()) {
      const observer = new MutationObserver(() => {
        if (tryInteract()) observer.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
      
      // Give up after 5 seconds
      setTimeout(() => observer.disconnect(), 5000);
    }
  });
});

function showNotification(email, clickCount, delayMs, isAutoSubmit = false) {
  const popup = document.createElement('div');
  const delayText = delayMs > 0 ? `<div style="font-size: 12px; margin-top: 8px;">${isAutoSubmit ? 'Submitting' : 'Clicking'} in ${delayMs / 1000}s...</div>` : '';
  popup.innerHTML = `
    <div style="font-size: 48px; font-weight: bold; text-align: center;">${clickCount}</div>
    <div style="font-size: 12px; text-align: center;">clicks saved</div>
    <div style="font-size: 14px; margin-top: 8px;">Selected ${email}</div>
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
