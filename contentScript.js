// Request profile email and config from background service worker
chrome.runtime.sendMessage({ action: 'getProfileEmail' }, (response) => {
  const email = response?.email;
  
  // InPrivate or not signed in - do nothing
  if (!email) return;

  // Get delay setting
  chrome.storage.local.get(['delayEnabled'], (config) => {
    const delayMs = config.delayEnabled ? 3000 : 0;

    // Wait for tiles to load, then find and click matching account
    const tryClick = () => {
      const tile = document.querySelector(`[data-test-id="${email}"]`);
      if (tile) {
        // Increment counter then show notification with count
        chrome.runtime.sendMessage({ action: 'incrementClickCount' }, (stats) => {
          showNotification(email, stats?.clickCount || 1, delayMs);
        });
        setTimeout(() => tile.click(), delayMs);
        return true;
      }
      return false;
    };

    // Try immediately, then retry with observer if tiles not loaded yet
    if (!tryClick()) {
      const observer = new MutationObserver(() => {
        if (tryClick()) observer.disconnect();
      });
      observer.observe(document.body, { childList: true, subtree: true });
      
      // Give up after 5 seconds
      setTimeout(() => observer.disconnect(), 5000);
    }
  });
});

function showNotification(email, clickCount, delayMs) {
  const popup = document.createElement('div');
  const delayText = delayMs > 0 ? `<div style="font-size: 12px; margin-top: 8px;">Clicking in ${delayMs / 1000}s...</div>` : '';
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
