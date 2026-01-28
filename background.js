// Service worker - responds to content script requests for profile email
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getProfileEmail') {
    chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, (info) => {
      sendResponse({ email: info?.email || null });
    });
    return true; // Keep channel open for async response
  }
});
