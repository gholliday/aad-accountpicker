// Service worker - responds to content script requests for profile email
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getProfileEmail') {
    chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, (info) => {
      sendResponse({ email: info?.email || null });
    });
    return true;
  }
  
  if (request.action === 'incrementClickCount') {
    const clickType = request.clickType || 'unknown';
    chrome.storage.local.get(['clickCounts', 'trackingSince'], (data) => {
      const clickCounts = data.clickCounts || {};
      clickCounts[clickType] = (clickCounts[clickType] || 0) + 1;
      const total = Object.values(clickCounts).reduce((a, b) => a + b, 0);
      const trackingSince = data.trackingSince || new Date().toISOString();
      chrome.storage.local.set({ clickCounts, trackingSince }, () => {
        sendResponse({ clickCount: total, clickCounts, trackingSince });
      });
    });
    return true;
  }
  
  if (request.action === 'getClickStats') {
    chrome.storage.local.get(['clickCounts', 'trackingSince'], (data) => {
      const clickCounts = data.clickCounts || {};
      const total = Object.values(clickCounts).reduce((a, b) => a + b, 0);
      sendResponse({
        clickCount: total,
        clickCounts,
        trackingSince: data.trackingSince || null
      });
    });
    return true;
  }
});
