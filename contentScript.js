// Request profile email from background service worker
chrome.runtime.sendMessage({ action: 'getProfileEmail' }, (response) => {
  const email = response?.email;
  
  // InPrivate or not signed in - do nothing
  if (!email) return;

  // Wait for tiles to load, then find and click matching account
  const tryClick = () => {
    const tile = document.querySelector(`[data-test-id="${email}"]`);
    if (tile) {
      showNotification(email);
      tile.click();
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

function showNotification(email) {
  const popup = document.createElement('div');
  popup.textContent = `AAD Account Picker selected ${email}`;
  Object.assign(popup.style, {
    position: 'fixed',
    top: '20px',
    left: '20px',
    padding: '10px 20px',
    backgroundColor: '#f00',
    color: '#fff',
    borderRadius: '5px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
    zIndex: '10000',
    fontSize: '14px',
    fontFamily: 'Arial, sans-serif'
  });
  document.body.appendChild(popup);
}
