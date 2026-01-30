const typeLabels = {
  'entra-tile': 'Entra (tile click)',
  'entra-email': 'Entra (fill email)',
  'github-sso': 'GitHub SSO',
  'icm': 'IcM'
};

chrome.runtime.sendMessage({ action: 'getClickStats' }, (stats) => {
  document.getElementById('count').textContent = stats?.clickCount || 0;
  
  const breakdown = document.getElementById('breakdown');
  if (stats?.clickCounts && Object.keys(stats.clickCounts).length > 0) {
    breakdown.innerHTML = Object.entries(stats.clickCounts)
      .map(([type, count]) => `<div class="breakdown-item"><span>${typeLabels[type] || type}</span><span>${count}</span></div>`)
      .join('');
  }
  
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

// Reset button
document.getElementById('resetButton').addEventListener('click', (e) => {
  const button = e.target;
  if (button.dataset.confirm) {
    chrome.storage.local.clear(() => {
      document.getElementById('count').textContent = '0';
      document.getElementById('breakdown').innerHTML = '';
      document.getElementById('since').textContent = 'No clicks recorded yet';
      delayCheckbox.checked = false;
      emailAutoSubmitCheckbox.checked = false;
      button.textContent = '✓ Cleared';
      button.style.backgroundColor = '#4a4';
      button.style.color = '#fff';
      delete button.dataset.confirm;
      setTimeout(() => {
        button.textContent = 'Reset All Data';
        button.style.backgroundColor = '';
        button.style.color = '';
      }, 1500);
    });
  } else {
    button.textContent = 'Click again to confirm';
    button.dataset.confirm = 'true';
    setTimeout(() => {
      button.textContent = 'Reset All Data';
      delete button.dataset.confirm;
    }, 3000);
  }
});
