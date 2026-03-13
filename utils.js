// Shared utilities for content scripts

function showNotification(label, clickCount, delayMs, actionText = 'Selected') {
  const popup = document.createElement('div');
  const delayText = delayMs > 0 
    ? `<div style="font-size: 12px; margin-top: 8px;">${actionText} in ${delayMs / 1000}s...</div>` 
    : '';
  popup.innerHTML = `
    <div style="font-size: 48px; font-weight: bold; text-align: center;">${clickCount}</div>
    <div style="font-size: 12px; text-align: center;">clicks saved</div>
    <div style="font-size: 14px; margin-top: 8px;">${actionText}${delayMs > 0 ? '' : ' ' + label}</div>
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

function isExtensionEnabled(config) {
  return config.extensionEnabled !== false;
}

function loadConfig(keys, callback) {
  const requestedKeys = [...new Set([...keys, 'extensionEnabled'])];
  chrome.storage.local.get(requestedKeys, (config) => {
    callback({
      ...config,
      extensionEnabled: isExtensionEnabled(config)
    });
  });
}

function waitForElement(tryAction, timeoutMs = 5000) {
  if (tryAction()) return;

  const observer = new MutationObserver(() => {
    if (tryAction()) cleanup();
  });

  const handleStorageChange = (changes, areaName) => {
    if (areaName === 'local' && changes.extensionEnabled?.newValue === false) {
      cleanup();
    }
  };

  const cleanup = () => {
    observer.disconnect();
    chrome.storage.onChanged.removeListener(handleStorageChange);
    clearTimeout(timeoutId);
  };

  chrome.storage.onChanged.addListener(handleStorageChange);
  observer.observe(document.body, { childList: true, subtree: true });
  const timeoutId = setTimeout(cleanup, timeoutMs);
}

function scheduleIfEnabled(delayMs, action) {
  setTimeout(() => {
    chrome.storage.local.get(['extensionEnabled'], (config) => {
      if (!isExtensionEnabled(config)) return;
      action();
    });
  }, delayMs);
}

function incrementAndNotify(label, delayMs, actionText, clickType) {
  chrome.runtime.sendMessage({ action: 'incrementClickCount', clickType }, (stats) => {
    showNotification(label, stats?.clickCount || 1, delayMs, actionText);
  });
}
