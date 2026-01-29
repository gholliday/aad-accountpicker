// Service worker - responds to content script requests for profile email
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getProfileEmail') {
    chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, (info) => {
      sendResponse({ email: info?.email || null });
    });
    return true;
  }
  
  if (request.action === 'incrementClickCount') {
    chrome.storage.local.get(['clickCount', 'trackingSince'], (data) => {
      const newCount = (data.clickCount || 0) + 1;
      const trackingSince = data.trackingSince || new Date().toISOString();
      chrome.storage.local.set({ clickCount: newCount, trackingSince }, () => {
        sendResponse({ clickCount: newCount, trackingSince });
      });
    });
    return true;
  }
  
  if (request.action === 'getClickStats') {
    chrome.storage.local.get(['clickCount', 'trackingSince'], (data) => {
      sendResponse({
        clickCount: data.clickCount || 0,
        trackingSince: data.trackingSince || null
      });
    });
    return true;
  }
});
