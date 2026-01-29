chrome.runtime.sendMessage({ action: 'getClickStats' }, (stats) => {
  document.getElementById('count').textContent = stats?.clickCount || 0;
  
  if (stats?.trackingSince) {
    const date = new Date(stats.trackingSince);
    document.getElementById('since').textContent = `Since ${date.toLocaleDateString()}`;
  } else {
    document.getElementById('since').textContent = 'No clicks recorded yet';
  }
});

// Load and handle settings
const delayCheckbox = document.getElementById('delayEnabled');
const emailAutoSubmitCheckbox = document.getElementById('emailAutoSubmit');

chrome.storage.local.get(['delayEnabled', 'emailAutoSubmit'], (data) => {
  delayCheckbox.checked = data.delayEnabled || false;
  emailAutoSubmitCheckbox.checked = data.emailAutoSubmit || false;
});

delayCheckbox.addEventListener('change', () => {
  chrome.storage.local.set({ delayEnabled: delayCheckbox.checked });
});

emailAutoSubmitCheckbox.addEventListener('change', () => {
  chrome.storage.local.set({ emailAutoSubmit: emailAutoSubmitCheckbox.checked });
});
