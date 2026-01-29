chrome.runtime.sendMessage({ action: 'getClickStats' }, (stats) => {
  document.getElementById('count').textContent = stats?.clickCount || 0;
  
  if (stats?.trackingSince) {
    const date = new Date(stats.trackingSince);
    document.getElementById('since').textContent = `Since ${date.toLocaleDateString()}`;
  } else {
    document.getElementById('since').textContent = 'No clicks recorded yet';
  }
});

// Load and handle delay setting
const delayCheckbox = document.getElementById('delayEnabled');

chrome.storage.local.get(['delayEnabled'], (data) => {
  delayCheckbox.checked = data.delayEnabled || false;
});

delayCheckbox.addEventListener('change', () => {
  chrome.storage.local.set({ delayEnabled: delayCheckbox.checked });
});
